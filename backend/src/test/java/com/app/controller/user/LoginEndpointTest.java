package com.app.controller.user;

import com.app.controller.UserController;
import com.app.repository.UserRepository;
import com.app.service.EmailService;
import com.app.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.http.MediaType;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;
import java.util.Map;

import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class LoginEndpointTest {

    // MockMvc instance to simulate HTTP requests to the controller
    private MockMvc mockMvc;

    // Mock services and repository
    private UserService userServiceMock;
    private UserRepository userRepositoryMock;
    private EmailService emailServiceMock;

    // Controller under test
    private UserController userController;

    @BeforeEach
    void setUp() {

        /*
         * Initialize mocks for UserService, UserRepository, and EmailService.
         * These mocks will simulate behavior of actual service/repository layers.
         */
        userServiceMock = Mockito.mock(UserService.class);
        userRepositoryMock = Mockito.mock(UserRepository.class);
        emailServiceMock = Mockito.mock(EmailService.class);

        /*
         * Create an instance of the controller under test.
         * Using default constructor because Spring context is not used.
         */
        userController = new UserController();

        /*
         * Inject mocks into private fields of the controller.
         * This simulates @Autowired injection without starting full Spring context.
         */
        ReflectionTestUtils.setField(userController, "userService", userServiceMock);
        ReflectionTestUtils.setField(userController, "userRepository", userRepositoryMock);
        ReflectionTestUtils.setField(userController, "emailService", emailServiceMock);

        /*
         * Build MockMvc in standalone mode.
         * This allows sending HTTP requests to the controller without loading the full Spring context.
         */
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void login_success_shouldReturnTokens() throws Exception {
        /**
         * Test scenario: Successful login
         *
         * Steps:
         * 1. Mock the userService.login method to return access and refresh tokens.
         * 2. Send a POST request to /users/login with valid username and password.
         * 3. Verify the response status is 200 OK.
         * 4. Verify the response JSON contains the expected accessToken and refreshToken.
         *
         * Expected outcome:
         * - HTTP status 200
         * - JSON contains both tokens with correct values
         */
        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", "access-token-abc");
        tokens.put("refreshToken", "refresh-token-xyz");

        Mockito.when(userServiceMock.login(anyString(), anyString())).thenReturn(tokens);

        String requestJson = """
                {
                  "username": "foyiga4025@protonza.com",
                  "password": "foyiga4025@protonza.com"
                }
                """;

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("access-token-abc"))
                .andExpect(jsonPath("$.refreshToken").value("refresh-token-xyz"));
    }

    @Test
    void login_fail_shouldReturnUnauthorized() throws Exception {
        /**
         * Test scenario: Failed login
         *
         * Steps:
         * 1. Mock the userService.login method to return null for invalid credentials.
         * 2. Send a POST request to /users/login with invalid username and password.
         * 3. Verify the response status is 401 Unauthorized.
         * 4. Optionally, the response body may be empty or contain an error message.
         *
         * Expected outcome:
         * - HTTP status 401
         * - Response body is empty (no tokens returned)
         */
        Mockito.when(userServiceMock.login(anyString(), anyString())).thenReturn(null);

        String requestJson = """
            {
              "username": "wronguser@example.com",
              "password": "wrongpassword"
            }
            """;

        mockMvc.perform(post("/users/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(requestJson))
                .andExpect(status().isUnauthorized())
                .andExpect(content().string(""));
    }
}