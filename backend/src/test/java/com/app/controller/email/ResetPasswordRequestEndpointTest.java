package com.app.controller.email;

import com.app.controller.EmailController;
import com.app.model.User;
import com.app.repository.UserRepository;
import com.app.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class ResetPasswordRequestEndpointTest {

    // MockMvc instance to simulate HTTP requests
    private MockMvc mockMvc;

    // Mocked dependencies
    private EmailService emailServiceMock;
    private UserRepository userRepositoryMock;

    // Controller under test
    private EmailController emailController;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mocks for EmailService and UserRepository.
         * These mocks simulate the behavior of actual services and repository.
         */
        emailServiceMock = Mockito.mock(EmailService.class);
        userRepositoryMock = Mockito.mock(UserRepository.class);

        /*
         * Create EmailController instance with EmailService injected via constructor.
         * ReflectionTestUtils is used to inject userRepository if it's an @Autowired field.
         */
        emailController = new EmailController(emailServiceMock);
        ReflectionTestUtils.setField(emailController, "userRepository", userRepositoryMock);

        /*
         * Build MockMvc in standalone mode for controller testing without starting the full Spring context.
         */
        mockMvc = MockMvcBuilders.standaloneSetup(emailController).build();
    }

    @Test
    void resetPasswordRequest_existingEmail_shouldSendResetLinkAndReturnMessage() throws Exception {
        /**
         * Test scenario: Request password reset for an existing email
         *
         * Steps:
         * 1. Mock UserRepository to return a User object when the email exists.
         * 2. Send POST request to /api/email/reset-password-request with email JSON payload.
         * 3. Expect HTTP status 200 OK.
         * 4. Expect response body to contain success message.
         * 5. Verify that EmailService.sendResetPasswordEmail was called with the mocked user.
         *
         * Expected outcome:
         * - HTTP status 200
         * - Response body contains "Password reset link has been sent to your email."
         * - Service method sendResetPasswordEmail invoked once
         */
        User userMock = Mockito.mock(User.class);
        Mockito.when(userRepositoryMock.findByEmail(anyString())).thenReturn(Optional.of(userMock));

        String body = """
                {
                  "email": "someone@example.com"
                }
                """;

        mockMvc.perform(post("/api/email/reset-password-request")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(body))
                .andExpect(status().isOk())
                .andExpect(content().string("Password reset link has been sent to your email."));

        verify(emailServiceMock).sendResetPasswordEmail(userMock);
    }

    @Test
    void resetPasswordRequest_nonExistingEmail_shouldReturnError() throws Exception {
        /**
         * Test scenario: Request password reset for a non-existing email
         *
         * Steps:
         * 1. Do not mock UserRepository (returns empty).
         * 2. Send POST request to /reset-password with non-existing email.
         * 3. Expect HTTP 4xx client error.
         *
         * Expected outcome:
         * - HTTP status 4xx (e.g., 404 or 400)
         * - No email is sent because user does not exist
         */
        mockMvc.perform(post("/reset-password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"nonexistent@example.com\"}"))
                .andExpect(status().is4xxClientError());
    }
}