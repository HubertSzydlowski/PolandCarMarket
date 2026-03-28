package com.app.controller.user;

import com.app.controller.UserController;
import com.app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import jakarta.servlet.http.Cookie;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class RefreshTokenEndpointTest {

    // MockMvc instance to simulate HTTP requests to the controller
    private MockMvc mockMvc;

    // Mocked UserService dependency
    private UserService userServiceMock;

    // Controller under test
    private UserController userController;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mock for UserService.
         * The mock will simulate the behavior of the actual service.
         */
        userServiceMock = Mockito.mock(UserService.class);

        /*
         * Create instance of UserController.
         * Inject mock using ReflectionTestUtils to simulate @Autowired behavior.
         */
        userController = new UserController();
        ReflectionTestUtils.setField(userController, "userService", userServiceMock);

        /*
         * Build MockMvc in standalone mode to test controller endpoints without starting the full Spring context.
         */
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void refreshToken_withValidCookie_shouldReturnNewAccessToken() throws Exception {
        /**
         * Test scenario: Refresh token using a valid cookie
         *
         * Steps:
         * 1. Mock the refreshAccessToken method to return a new access token for a valid refresh token.
         * 2. Create a Cookie object simulating the client's refresh token.
         * 3. Send a POST request to /users/refresh-token with the cookie.
         * 4. Verify that the response status is 200 OK.
         * 5. Verify that the response body contains the new access token.
         *
         * Expected outcome:
         * - HTTP status 200
         * - Response body contains "new-access-token-123"
         */
        Mockito.when(userServiceMock.refreshAccessToken("refresh-token-xyz"))
                .thenReturn("new-access-token-123");

        Cookie cookie = new Cookie("refreshToken", "refresh-token-xyz");

        mockMvc.perform(post("/users/refresh-token").cookie(cookie))
                .andExpect(status().isOk())
                .andExpect(content().string("new-access-token-123"));
    }

    @Test
    void refreshToken_withInvalidCookie_shouldReturnUnauthorized() throws Exception {
        /**
         * Test scenario: Refresh token using an invalid cookie
         *
         * Steps:
         * 1. Mock the refreshAccessToken method to return null for an invalid refresh token.
         * 2. Create a Cookie object with an invalid refresh token.
         * 3. Send a POST request to /users/refresh-token with the cookie.
         * 4. Verify that the response status is 401 Unauthorized.
         *
         * Expected outcome:
         * - HTTP status 401
         * - No access token is returned
         */
        Mockito.when(userServiceMock.refreshAccessToken("bad-refresh-token"))
                .thenReturn(null);

        Cookie badCookie = new Cookie("refreshToken", "bad-refresh-token");

        mockMvc.perform(post("/users/refresh-token").cookie(badCookie))
                .andExpect(status().isUnauthorized());
    }
}