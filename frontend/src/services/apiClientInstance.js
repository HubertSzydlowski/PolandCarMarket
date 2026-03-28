import ApiClient from '../api/src/ApiClient';
import tokenManager from './TokenManager';
const apiClient = new ApiClient();
const basePath = apiClient.basePath || '';
const originalCallApi = apiClient.callApi.bind(apiClient);

/**
 * Helper function to consistently extract the HTTP status code from various error
 * object formats returned by the generated client or underlying network libraries.
 */
function extractStatus(err) {
    if (!err) return null;
    if (typeof err.status === 'number') return err.status;
    if (typeof err.statusCode === 'number') return err.statusCode;
    if (err.response && typeof err.response.status === 'number') return err.response.status;
    if (err.statusText && typeof err.statusText === 'string') {
        const m = err.statusText.match(/\b(401|403|404|500)\b/);
        if (m) return Number(m[1]);
    }
    if (err.message && err.message.match(/\b(401|403|404|500)\b/)) {
        const m = err.message.match(/\b(401|403|404|500)\b/);
        return m ? Number(m[1]) : null;
    }
    return null;
}

/**
 * Performs a browser redirect only if the current path
 * differs from the target to prevent infinite redirect loops.
 */
function safeRedirect(path) {
    try {
        if (typeof window !== 'undefined' && window.location && window.location.pathname !== path) {
            window.location.href = path;
        }
    } catch (e) {
        console.warn('safeRedirect failed', e);
    }
}

/**
 * Wraps the callback-based OpenAPI method into a Promise
 * to enable async/await syntax while safely handling user-provided callbacks.
 */
function callApiPromisified({
                                path,
                                httpMethod,
                                pathParams,
                                queryParams,
                                headerParams,
                                formParams,
                                bodyParam,
                                authNames,
                                contentTypes,
                                accepts,
                                returnType,
                                basePathOverride,
                                userCallback
                            }) {
    return new Promise((resolve, reject) => {
        try {
            const internalCb = (err, data, response) => {
                try {
                    if (typeof userCallback === 'function') {
                        try {
                            userCallback(err, data, response);
                        } catch (cbErr) {
                            console.warn('User callback threw error:', cbErr);
                        }
                    }
                } catch (_) {}

                if (err) return reject(err);
                resolve({ data, response });
            };

            originalCallApi(
                path, httpMethod,
                pathParams, queryParams, headerParams, formParams, bodyParam,
                authNames, contentTypes, accepts, returnType, basePathOverride,
                internalCb
            );
        } catch (callErr) {
            reject(callErr);
        }
    });
}

/**
 * Overwrites the default callApi method to act as a global interceptor.
 * It handles JWT injection, automatic token refreshing on 401 errors,
 * and centralized error redirection.
 */
apiClient.callApi = async function (
    path, httpMethod,
    pathParams = {}, queryParams = {}, headerParams = {}, formParams = {}, bodyParam = null,
    authNames = [], contentTypes = [], accepts = [], returnType = null, basePathOverride = null, callback = undefined
) {
    // 1) Automatically inject the Authorization header if a valid token exists.
    headerParams = {
        ...headerParams,
        ...(tokenManager.getToken() ? { Authorization: tokenManager.getToken() } : {})
    };

    try {
        // 2) Execute the API call using the promisified wrapper.
        const { data } = await callApiPromisified({
            path,
            httpMethod,
            pathParams,
            queryParams,
            headerParams,
            formParams,
            bodyParam,
            authNames,
            contentTypes,
            accepts,
            returnType,
            basePathOverride,
            userCallback: callback
        });

        return data;
    } catch (err) {
        const status = extractStatus(err);

        // --- Standard Error Handling ---
        // Redirect to specific error pages based on HTTP status codes.
        if (status === 403) {
            safeRedirect('/forbidden');
            return Promise.reject(new Error('Handled API redirect: 403'));
        }
        if (status === 404) {
            safeRedirect('/not-found');
            return Promise.reject(new Error('Handled API redirect: 404'));
        }
        if (status === 500) {
            safeRedirect('/server-error');
            return Promise.reject(new Error('Handled API redirect: 500'));
        }

        // Handle 401: Refresh Token Flow
        // Attempt to refresh the access token using the HTTP-only cookie if the request is unauthorized.
        if (status === 401) {
            try {
                const refreshUrl = (basePathOverride || basePath) + '/users/refresh-token';
                const refreshResponse = await fetch(refreshUrl, {
                    method: 'POST',
                    credentials: 'include', // expects refresh token in cookie
                    headers: { 'Accept': 'text/plain, application/json, */*' }
                });

                if (!refreshResponse.ok) {
                    throw new Error(`Refresh failed with status ${refreshResponse.status}`);
                }

                // Parse the new token from the response (handles both JSON and plain text formats).
                let newAccessToken;
                const contentType = refreshResponse.headers.get('content-type') || '';

                if (contentType.includes('application/json')) {
                    const json = await refreshResponse.json();
                    if (typeof json === 'string') newAccessToken = json;
                    else if (json && (json.accessToken || json.token))
                        newAccessToken = json.accessToken || json.token;
                    else newAccessToken = JSON.stringify(json);
                } else {
                    newAccessToken = await refreshResponse.text();
                }

                if (!newAccessToken) throw new Error('Empty token from refresh endpoint');

                // Save the new token and retry the original request.
                tokenManager.saveToken(newAccessToken);

                headerParams = {
                    ...headerParams,
                    Authorization: tokenManager.getToken()
                };

                const { data } = await callApiPromisified({
                    path,
                    httpMethod,
                    pathParams,
                    queryParams,
                    headerParams,
                    formParams,
                    bodyParam,
                    authNames,
                    contentTypes,
                    accepts,
                    returnType,
                    basePathOverride,
                    userCallback: callback
                });

                return data;
            } catch (refreshErr) {
                // If token refresh fails, clear local storage and force a login redirect.
                console.error('Refresh token failed:', refreshErr);
                try { tokenManager.removeToken(); } catch (_) {}
                safeRedirect('/login');
                return Promise.reject(new Error('Handled API redirect: refresh failed'));
            }
        }

        // Unexpected Errors
        // Log the error and redirect to a generic critical error page for any unhandled exceptions.
        console.error('Unexpected API error:', err);
        safeRedirect('/critical-error');
        return Promise.reject(new Error('Handled API redirect: critical-error'));
    }
};

export default apiClient;