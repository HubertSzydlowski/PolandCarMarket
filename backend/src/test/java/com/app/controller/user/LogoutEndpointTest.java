package com.app.controller.user;

import com.app.controller.UserController;
import com.app.service.EmailService;
import com.app.service.UserService;
import com.app.repository.UserRepository;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class LogoutEndpointTest {

    // MockMvc instance to simulate HTTP requests to the controller
    private MockMvc mockMvc;

    // Controller under test
    private UserController userController;

    // Mocked dependencies
    private UserService userServiceMock;
    private UserRepository userRepositoryMock;
    private EmailService emailServiceMock;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mocks for UserService, UserRepository, and EmailService.
         * These mocks simulate the behavior of actual services/repositories.
         */
        userServiceMock = Mockito.mock(UserService.class);
        userRepositoryMock = Mockito.mock(UserRepository.class);
        emailServiceMock = Mockito.mock(EmailService.class);

        /*
         * Create an instance of UserController.
         * Inject mocks into private fields to simulate @Autowired behavior.
         */
        userController = new UserController();
        ReflectionTestUtils.setField(userController, "userService", userServiceMock);
        ReflectionTestUtils.setField(userController, "userRepository", userRepositoryMock);
        ReflectionTestUtils.setField(userController, "emailService", emailServiceMock);

        /*
         * Build MockMvc in standalone mode to send HTTP requests to the controller without loading the full Spring context.
         */
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void logout_shouldRemoveRefreshTokenCookie_andReturnOk() throws Exception {
        /**
         * Test scenario: User logout
         *
         * Steps:
         * 1. Send a POST request to /users/logout endpoint.
         * 2. Verify that the response status is 200 OK.
         * 3. Verify that the Set-Cookie header is present and contains a "refreshToken" cookie.
         * 4. Verify that the cookie has Max-Age=0 to indicate it was removed/expired.
         *
         * Expected outcome:
         * - HTTP status 200
         * - "refreshToken" cookie is cleared in response header
         */
        mockMvc.perform(post("/users/logout"))
                .andExpect(status().isOk())
                .andExpect(header().string("Set-Cookie", Matchers.any(String.class)))
                .andExpect(header().string("Set-Cookie", containsString("refreshToken")))
                .andExpect(header().string("Set-Cookie", containsString("Max-Age=0")));
    }
}