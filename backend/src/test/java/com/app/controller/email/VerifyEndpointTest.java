package com.app.controller.email;

import com.app.controller.EmailController;
import com.app.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class VerifyEndpointTest {

    // MockMvc instance to simulate HTTP requests to the controller
    private MockMvc mockMvc;

    // Mocked EmailService dependency
    private EmailService emailServiceMock;

    // Controller under test
    private EmailController emailController;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mock for EmailService.
         * The mock will simulate behavior of the actual service.
         */
        emailServiceMock = Mockito.mock(EmailService.class);

        /*
         * Create instance of EmailController with EmailService injected via constructor.
         */
        emailController = new EmailController(emailServiceMock);

        /*
         * Build MockMvc in standalone mode to test controller endpoints
         * without starting the full Spring context.
         */
        mockMvc = MockMvcBuilders.standaloneSetup(emailController).build();
    }

    @Test
    void verify_withValidToken_shouldReturnSuccessMessage() throws Exception {
        /**
         * Test scenario: Verify email with a valid token
         *
         * Steps:
         * 1. Mock verifyEmail method to return true for a valid token.
         * 2. Send a GET request to /api/email/verify with the token parameter.
         * 3. Verify that the response status is 200 OK.
         * 4. Verify that the response body contains the success message.
         *
         * Expected outcome:
         * - HTTP status 200
         * - Response body contains "Email verified successfully! You can now log in."
         */
        Mockito.when(emailServiceMock.verifyEmail("valid-token-1")).thenReturn(true);

        mockMvc.perform(get("/api/email/verify").param("token", "valid-token-1"))
                .andExpect(status().isOk())
                .andExpect(content().string("Email verified successfully! You can now log in."));
    }

}