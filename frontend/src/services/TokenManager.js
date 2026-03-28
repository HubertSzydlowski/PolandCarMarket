import { jwtDecode } from 'jwt-decode';

const TokenManager = {
    /**
     * Retrieves the raw JWT from local storage and strips the "Bearer " prefix.
     * @returns {string|null} The clean JWT string or null if not found.
     */
    getAccessToken() {
        const token = localStorage.getItem('accessToken');
        return token ? token.replace('Bearer ', '') : null;
    },

    /**
     * Returns the token exactly as stored in local storage (including the "Bearer " prefix),
     * which is required for setting the HTTP Authorization header.
     * @returns {string|null} The full token string with prefix or null if missing.
     */
    getToken() {
        return localStorage.getItem('accessToken') || null;
    },

    /**
     * Saves the provided JWT string into local storage, automatically appending the standard "Bearer " prefix.
     * @param {string} token - The clean JWT string without prefix.
     */
    saveToken(token) {
        localStorage.setItem('accessToken', `Bearer ${token}`);
    },

    /**
     * Removes the access token from local storage, effectively logging the user out locally.
     */
    removeToken() {
        localStorage.removeItem('accessToken');
    },

    /**
     * Decodes the stored JWT to access its payload.
     * Returns null if the token is missing or if decoding fails (logs the error).
     * @returns {object|null} The decoded token object or null.
     */
    getDecodedToken() {
        const token = this.getAccessToken();
        if (!token) return null;

        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Błąd dekodowania tokenu:", error);
            return null;
        }
    },

    /**
     * Extracts the user's primary role from the decoded token's roles array.
     * Checks specifically for 'ROLE_ADMIN' or 'ROLE_USER'.
     * @returns {'ADMIN' | 'USER' | null} The simplified role string or null if undetermined.
     */
    getUserRole() {
        const decoded = this.getDecodedToken();
        if (!decoded || !decoded.roles) return null;

        return decoded.roles.includes('ROLE_ADMIN') ? 'ADMIN' :
            decoded.roles.includes('ROLE_USER') ? 'USER' : null;
    },

    /**
     * Retrieves the username (login) from the token's 'sub' (subject) claim.
     * @returns {string|null} The username or null.
     */
    getUsername() {
        const decoded = this.getDecodedToken();
        return decoded?.sub || null;
    },

    /**
     * Verifies if the current user has the necessary privileges (ADMIN role)
     * to access the administration dashboard.
     * @returns {boolean} true if access is allowed, false otherwise.
     */
    canAccessAdminPage() {
        return this.getUserRole() === 'ADMIN';
    },

    /**
     * Validates access to a specific user profile.
     * The user must have the USER role and their token's identity must match the requested profile username.
     * @param {string} currentUsername - The username of the profile being accessed.
     * @returns {boolean} true if access is allowed, false otherwise.
     */
    canAccessUserPage(currentUsername) {
        const role = this.getUserRole();
        const tokenUsername = this.getUsername();

        return role === 'USER' && tokenUsername === currentUsername;
    }
};

export default TokenManager;