package com.app.controller.email;

import com.app.controller.EmailController;
import com.app.dto.EmailDto;
import com.app.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class ResetPasswordEndpointTest {

    // MockMvc instance to simulate HTTP requests
    private MockMvc mockMvc;

    // Mocked EmailService
    private EmailService emailServiceMock;

    // Controller under test
    private EmailController emailController;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mock for EmailService.
         * Create EmailController instance with mock injected via constructor.
         * Build MockMvc in standalone mode for isolated controller testing.
         */
        emailServiceMock = Mockito.mock(EmailService.class);
        emailController = new EmailController(emailServiceMock);
        mockMvc = MockMvcBuilders.standaloneSetup(emailController).build();
    }

    @Test
    void resetPassword_withValidToken_shouldReturnChangedMessage() throws Exception {
        /**
         * Test scenario: Reset password using a valid token
         *
         * Steps:
         * 1. Mock EmailService.resetPassword to return true for valid token.
         * 2. Send POST request to /api/email/reset-password with token and new password in JSON body.
         * 3. Expect HTTP 200 OK.
         * 4. Expect response body to contain confirmation message "Password has been changed!".
         *
         * Expected outcome:
         * - HTTP status 200
         * - Response body contains success message
         */
        Mockito.when(emailServiceMock.resetPassword(any(EmailDto.class))).thenReturn(true);

        String body = """
                {
                  "token": "5e662f26-e3da-4aaa-a7c3-45aea615bea0",
                  "newPassword": "securepassword1600"
                }
                """;

        mockMvc.perform(post("/api/email/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(content().string("Password has been changed!"));
    }

    @Test
    void resetPassword_withInvalidToken_shouldReturnFailureMessage() throws Exception {
        /**
         * Test scenario: Reset password using an invalid token
         *
         * Steps:
         * 1. Mock EmailService.resetPassword to return false for invalid token.
         * 2. Send POST request to /api/email/reset-password with invalid token and new password.
         * 3. Expect HTTP 200 OK (controller handles invalid token gracefully).
         * 4. Expect response body to contain error message "Invalid token!".
         *
         * Expected outcome:
         * - HTTP status 200
         * - Response body indicates failure due to invalid token
         */
        Mockito.when(emailServiceMock.resetPassword(any(EmailDto.class))).thenReturn(false);

        String body = """
            {
              "token": "invalid-token-123",
              "newPassword": "password123"
            }
            """;

        mockMvc.perform(post("/api/email/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(content().string("Invalid token!"));
    }
}