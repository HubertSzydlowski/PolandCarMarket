# Poland Car Market

**Poland Car Market (PCM)** is a professional, full-stack web application designed as a comprehensive automotive marketplace. The platform enables users to add, manage, and browse vehicle advertisements with a focus on intuitive UI, robust security, and advanced data analysis. Inspired by industry leaders, PCM provides a secure and scalable environment for both individual sellers and professional car dealers.

## 🧑‍💻 Author

### Hubert Szydłowski

## 🛠️ Technologies

- **Java 17**
- **Spring Boot** – backend architecture
- **Spring Security + JWT** – secure authorization and authentication
- **Spring Data JPA (Hibernate)** – database access
- **PostgreSQL** – relational database
- **Maven** – project management
- **Mockito & MockMVC** * – automated unit and integration testing
- **Postman** – endpoint testing
- **OpenAPI** – API documentation
- **Lombok** – reduces boilerplate code
- **React** – frontend framework
- **HTML, CSS, JavaScript** – frontend technologies
- **IntelliJ IDEA** – IDE
- **Git** – version control

## ✨ Key Features

The application provides a complete set of features for three distinct user roles: Guest, Registered User, and Administrator.

### 1. Advanced Search & Discovery
* **Multi-criteria Filtering**: Users can narrow down results using a wide range of parameters: brand, model, fuel type, price range, mileage, power, year of production, and even the number of seats.
* **Dynamic Sorting**: Results can be ordered by price or mileage (ascending/descending) to find the best deals quickly.
* **Server-side Pagination**: High performance is maintained even with large datasets by processing pages on the backend.
* **Interactive Location**: Integration with Google Maps API allows for precise visualization of the vehicle's location.

### 2. Professional User & Ad Management
* **Full Ad Lifecycle**: Registered users can create, edit, and delete their own advertisements, ensuring all technical data is up to date.
* **Smart Media Gallery**: Support for multiple high-quality photos per vehicle with a dedicated "Main Photo" selector for the search list.
* **Favorites System**: A "Saved Ads" feature allows users to keep track of interesting offers across sessions.
* **Automated Email Communication**: Built-in mailer for account activation (verification links) and secure password recovery.

### 3. Business Intelligence & Analytics
The system features a dedicated analytical engine that processes data for both users and administrators:
* **User Statistics**: Sellers can track the effectiveness of their ads and view price/mileage trends for their vehicles.
* **Global Market Reports**: Administrators have access to aggregated reports on top-selling brands, most popular fuel types, and engine power distribution.
* **Admin Dashboard**: Advanced monitoring of active users, total advertisements, and overall system health.

### 4. Enterprise-Grade Security
* **Stateless Auth (JWT)**: Secure sessions using a double-token approach: short-lived Access Tokens and HttpOnly Refresh Tokens to prevent XSS and session hijacking.
* **Role-Based Access Control (RBAC)**: Fine-grained permissions managed by Spring Security.
* **Data Protection**: All sensitive user information is encrypted using the BCrypt hashing algorithm.
* **Centralized Exception Handling**: A dedicated module translates technical errors into user-friendly HTTP responses, ensuring a stable API.

## 🖼️ Interface Preview

<img width="1920" height="826" alt="screencapture-localhost-3000-2025-11-18-08_18_56" src="https://github.com/user-attachments/assets/d50f040d-1675-4e31-a2a8-505afd09adbf" />
<img width="1920" height="1562" alt="screencapture-localhost-3000-offers-2025-11-18-08_24_36" src="https://github.com/user-attachments/assets/f2eaa35c-ae6d-4245-85b4-fc4a7c365964" />
<img width="1920" height="1377" alt="screencapture-localhost-3000-offers-149-2025-11-18-08_23_34" src="https://github.com/user-attachments/assets/eeb59779-f8c4-4f23-89d0-86af5c35a36a" />
<img width="1920" height="1948" alt="screencapture-localhost-3000-user-offers-150-edit-2025-11-18-08_26_23" src="https://github.com/user-attachments/assets/64351f73-86f6-49b5-b613-93e3d03ad99e" />
<img width="1920" height="2950" alt="screencapture-localhost-3000-user-dashboard-2025-11-18-08_25_08" src="https://github.com/user-attachments/assets/91f7a7c7-d537-486a-bec9-fe39918cdb0a" />


## ☕ Backend Structure

```plaintext
src/
│
├── main/
│   ├── java/
│   │   └── com/app/
│   │       ├── config/
│   │       │   ├── CorsConfig.java
│   │       │   └── OpenApiConfig.java
│   │       │
│   │       ├── controller/
│   │       │   ├── AdminPageController.java
│   │       │   ├── AdvertisementController.java
│   │       │   ├── EmailController.java
│   │       │   ├── UserController.java
│   │       │   ├── UserPageController.java
│   │       │   ├── VehicleController.java
│   │       │   └── VehiclePhotoController.java
│   │       │
│   │       ├── dto/
│   │       │   ├── AdminPageDto.java
│   │       │   ├── AdvertisementDto.java
│   │       │   ├── EmailDto.java
│   │       │   ├── UserDto.java
│   │       │   ├── UserPageDto.java
│   │       │   ├── VehicleDto.java
│   │       │   └── VehiclePhotoDto.java
│   │       │
│   │       ├── exception/
│   │       │   ├── AdminPageExceptionHandler.java
│   │       │   ├── AdvertisementExceptionHandler.java
│   │       │   ├── EmailExceptionHandler.java
│   │       │   ├── GlobalExceptionHandler.java
│   │       │   ├── SecurityExceptionHandler.java
│   │       │   ├── UserExceptionHandler.java
│   │       │   ├── UserPageExceptionHandler.java
│   │       │   ├── VehicleExceptionHandler.java
│   │       │   └── VehiclePhotoExceptionHandler.java
│   │       │
│   │       ├── model/
│   │       │   ├── AdminPage.java
│   │       │   ├── Advertisement.java
│   │       │   ├── Email.java
│   │       │   ├── User.java
│   │       │   ├── UserPage.java
│   │       │   ├── Vehicle.java
│   │       │   └── VehiclePhoto.java
│   │       │
│   │       ├── repository/
│   │       │   ├── AdminPageRepository.java
│   │       │   ├── AdvertisementRepository.java
│   │       │   ├── EmailRepository.java
│   │       │   ├── UserRepository.java
│   │       │   ├── UserPageRepository.java
│   │       │   ├── VehicleRepository.java
│   │       │   └── PhotoRepository.java
│   │       │
│   │       ├── security/
│   │       │   ├── CustomUserDetailsService.java
│   │       │   ├── JWTFilter.java
│   │       │   ├── JWTUtility.java
│   │       │   └── SecurityConfig.java
│   │       │
│   │       ├── service/
│   │       │   ├── AdminPageService.java
│   │       │   ├── AdvertisementService.java
│   │       │   ├── EmailService.java
│   │       │   ├── UserService.java
│   │       │   ├── UserPageService.java
│   │       │   ├── VehicleService.java
│   │       │   └── VehiclePhotoService.java
│   │       │
│   │       ├── utils/
│   │       │   └── PasswordEncryptor.java
│   │       │
│   │       └── BackendApplication.java
│   │
│   └── resources/
│       ├── api_docs/
│       │   └── api-docs.json
│       ├── static/
│       ├── templates/
│       └── application.properties
│
└── test/
    ├── java/
    │   ├── postman_tests.json
    │   ├── PCM.postman_collection.json
    │   ├── run/
    │   │   └── BackendApplicationTests.java
    │   └── com/app/controller/
    │       ├── user/
    │       │   ├── LoginEndpointTest.java
    │       │   ├── RefreshTokenEndpointTest.java
    │       │   └── LogoutEndpointTest.java
    │       └── email/
    │           ├── VerifyEndpointTest.java
    │           ├── ResetPasswordRequestEndpointTest.java
    │           └── ResetPasswordEndpointTest.java
```

## ⚛️ Frotend Structure

```plaintext
frontend/
│
├── public/
│   └── ...
│
└── src/
    │
    ├── api/
    │   ├── .openapi-generator/
    │   │   ├── FILES
    │   │   └── VERSION
    │   ├── docs/
    │   │   └── ...
    │   ├── src/
    │   │   ├── api/
    │   │   │   ├── AdminPageControllerApi.js
    │   │   │   ├── AdvertisementControllerApi.js
    │   │   │   ├── EmailControllerApi.js
    │   │   │   ├── UserControllerApi.js
    │   │   │   ├── UserPageControllerApi.js
    │   │   │   ├── VehicleControllerApi.js
    │   │   │   └── VehiclePhotoControllerApi.js
    │   │   ├── model/
    │   │   │   └── ...
    │   │   ├── ApiClient.js
    │   │   └── index.js
    │   ├── test/
    │   │   ├── api/
    │   │   │   ├── AdminPageControllerApi.spec.js
    │   │   │   ├── AdvertisementControllerApi.spec.js
    │   │   │   ├── EmailControllerApi.spec.js
    │   │   │   ├── UserControllerApi.spec.js
    │   │   │   ├── UserPageControllerApi.spec.js
    │   │   │   ├── VehicleControllerApi.spec.js
    │   │   │   └── VehiclePhotoControllerApi.spec.js
    │   │   └── model/
    │   │       └── ...
    │   └── ...
    │
    ├── components/
    │   ├── Approuter.js
    │   ├── CriticalError.js
    │   ├── Forbidden.js
    │   ├── MyAccount.js
    │   ├── NotFound.js
    │   ├── ServerError.js
    │   ├── WelcomePage.js
    │   │
    │   ├── UserComponent/
    │   │   ├── Auth/
    │   │   │   ├── LoginForm.js
    │   │   │   ├── LogoutButton.js
    │   │   │   └── TokenRefresher.js
    │   │   ├── Favorites/
    │   │   │   ├── UserFavorites.js
    │   │   │   ├── AddToFavoritesButton.js
    │   │   │   └── RemoveFromFavoritesButton.js
    │   │   ├── UserManagement/
    │   │   │   ├── UserList.js
    │   │   │   ├── UserDetails.js
    │   │   │   ├── UserCreateForm.js
    │   │   │   ├── UserEditForm.js
    │   │   │   └── UserDeleteButton.js
    │   │   └── structureUserComponent.md
    │   │
    │   ├── UserPageComponent/
    │   │   ├── Users/
    │   │   │   └── Favourites/
    │   │   │       ├── FavoritesList.js
    │   │   │       ├── AddToFavoritesButton.js
    │   │   │       └── RemoveFromFavoritesButton.js
    │   │   ├── Advertisments/
    │   │   │   ├── AdvertisementList.js
    │   │   │   ├── AdvertisementDetails.js
    │   │   │   ├── AdvertisementCreateForm.js
    │   │   │   ├── AdvertisementEditForm.js
    │   │   │   └── AdvertisementDeleteButton.js
    │   │   ├── Vehicles/
    │   │   │   ├── VehicleList.js
    │   │   │   ├── VehicleDetails.js
    │   │   │   ├── VehicleCreateForm.js
    │   │   │   ├── VehicleEditForm.js
    │   │   │   └── VehicleDeleteButton.js
    │   │   ├── Offers/
    │   │   │   ├── OfferCreateForm.js
    │   │   │   ├── OfferDeleteButton.js
    │   │   │   ├── OfferDetails.js
    │   │   │   ├── OfferEditForm.js
    │   │   │   └── OfferList.js
    │   │   ├── VehiclePhotos/
    │   │   │   ├── VehiclePhotoList.js
    │   │   │   ├── VehiclePhotoDetails.js
    │   │   │   ├── VehiclePhotoUploadForm.js
    │   │   │   └── VehiclePhotoDeleteButton.js
    │   │   ├── UserDashboard.js
    │   │   ├── UserMyAccount.js
    │   │   └── structureUserPageComponent.md
    │   │
    │   ├── AdminPageComponent/
    │   │   ├── Users/
    │   │   │   ├── UserList.js
    │   │   │   ├── UserDetails.js
    │   │   │   ├── UserCreateForm.js
    │   │   │   ├── UserEditForm.js
    │   │   │   ├── UserDeleteButton.js
    │   │   │   └── Favourites/
    │   │   │       ├── FavoritesList.js
    │   │   │       ├── AddToFavoritesButton.js
    │   │   │       └── RemoveFromFavoritesButton.js
    │   │   ├── Advertisments/
    │   │   │   ├── AdvertisementList.js
    │   │   │   ├── AdvertisementDetails.js
    │   │   │   ├── AdvertisementCreateForm.js
    │   │   │   ├── AdvertisementEditForm.js
    │   │   │   └── AdvertisementDeleteButton.js
    │   │   ├── Vehicles/
    │   │   │   ├── VehicleList.js
    │   │   │   ├── VehicleDetails.js
    │   │   │   ├── VehicleCreateForm.js
    │   │   │   ├── VehicleEditForm.js
    │   │   │   └── VehicleDeleteButton.js
    │   │   ├── Offers/
    │   │   │   ├── OfferCreateForm.js
    │   │   │   ├── OfferDeleteButton.js
    │   │   │   ├── OfferDetails.js
    │   │   │   ├── OfferEditForm.js
    │   │   │   └── OfferList.js
    │   │   ├── VehiclePhotos/
    │   │   │   ├── VehiclePhotoList.js
    │   │   │   ├── VehiclePhotoDetails.js
    │   │   │   ├── VehiclePhotoUploadForm.js
    │   │   │   └── VehiclePhotoDeleteButton.js
    │   │   ├── AdminDashboard.js
    │   │   ├── AdminMyAccount.js
    │   │   └── structureAdminComponent.md
    │   │
    │   ├── EmailComponent/
    │   │   ├── EmailVerificationForm.js
    │   │   ├── ResetPasswordForm.js
    │   │   ├── ResetPasswordRequestForm.js
    │   │   └── structureEmailComponent.md
    │   │
    │   ├── AdvertisementComponent/
    │   │   ├── AdvertisementCreateForm.js
    │   │   ├── AdvertisementDeleteButton.js
    │   │   ├── AdvertisementDetails.js
    │   │   ├── AdvertisementEditForm.js
    │   │   ├── AdvertisementList.js
    │   │   └── structureAdvertisementComponent.md
    │   │
    │   ├── OffersComponent/
    │   │   ├── OfferCreateForm.js
    │   │   ├── OfferDeleteButton.js
    │   │   ├── OfferDetails.js
    │   │   ├── OfferEditForm.js
    │   │   ├── OfferList.js
    │   │   └── structureOfferComponent.md
    │   │
    │   ├── VehicleComponent/
    │   │   ├── VehicleCreateForm.js
    │   │   ├── VehicleDeleteButton.js
    │   │   ├── VehicleDetails.js
    │   │   ├── VehicleEditForm.js
    │   │   ├── VehicleList.js
    │   │   └── structureVehicleComponent.md
    │   │
    │   └── VehiclePhotoComponent/
    │       ├── VehiclePhotoUploadForm.js
    │       ├── VehiclePhotoDeleteButton.js
    │       ├── VehiclePhotoDetails.js
    │       ├── VehiclePhotoList.js
    │       └── structureVehicleComponent.md
    │
    ├── services/
    │   ├── apiClientInstance.js
    │   ├── TokenManager.js
    │   ├── UserServices/
    │   │   ├── authService.js
    │   │   ├── favoritesService.js
    │   │   └── userService.js
    │   ├── EmailServices/
    │   │   └── EmailService.js
    │   ├── VehicleServices/
    │   │   └── vehicleService.js
    │   ├── OfferServices/
    │   │   └── OfferService.js
    │   ├── VehiclePhotoServices/
    │   │   └── vehiclePhotoService.js
    │   ├── AdminPageServices/
    │   │   ├── AdminPageAdvertisementsService.js
    │   │   ├── AdminPageDashboardService.js
    │   │   ├── AdminPageFavouritesService.js
    │   │   ├── AdminPageOfferService.js
    │   │   ├── AdminPageUserService.js
    │   │   ├── AdminPageVehiclePhotoService.js
    │   │   └── AdminPageVehicleService.js
    │   ├── UserPageServices/
    │   │   ├── UserPageAdvertisementsService.js
    │   │   ├── UserPageDashboardService.js
    │   │   ├── UserPageFavouritesService.js
    │   │   ├── UserPageOfferService.js
    │   │   ├── UserPageVehiclePhotoService.js
    │   │   └── UserPageVehicleService.js
    │   └── AdvertisementServices/
    │       └── advertisementService.js
    │
    └── ...
```

## 🧪 Endpoint Testing (Postman Collection)
```plaintext
└── PCM/
    ├── PHOTO/
    │   ├── POST PHOTO
    │   ├── GET PHOTO ALL
    │   ├── GET PHOTO BY VEHICLE
    │   ├── GET PHOTO BY ID
    │   └── DELETE PHOTO
    │
    ├── USER/
    │   ├── POST USER
    │   ├── PUT USER
    │   ├── GET USER ALL
    │   ├── GET USER BY ID
    │   ├── DELETE USER
    │   ├── GET FAVS USER ADS
    │   ├── POST FAVS USER ADS
    │   └── DELETE FAVS USER ADS
    │
    ├── USER_PAGE/
    │   ├── ADVERTISMENT MANAGEMENT
    │   │   ├── GET ADVERTISMENT ALL SPECIFIC USER
    │   │   ├── POST ADVERTISMENT SPECIFIC USER
    │   │   ├── GET ADVERTISMENT BY ID SPECIFIC USER
    │   │   ├── PUT ADVERTISMENT SPECIFIC USER
    │   │   ├── DELETE ADVERTISMENT SPECIFIC USER
    │   │   └── GET ADVERTISMENT BY USER SPECIFIC USER
    │   ├── VEHICLE MANAGEMENT
    │   │   ├── GET VEHICLE ALL SPECIFIC USER
    │   │   ├── POST VEHICLE SPECIFIC USER
    │   │   ├── PUT VEHICLE SPECIFIC USER
    │   │   ├── DELETE VEHICLE SPECIFIC USER
    │   │   ├── GET VEHICLES BY ID SPECIFIC USER
    │   │   ├── GET VEHICLE BY USER SPECIFIC USER
    │   │   ├── GET VEHICLE FILTRED SPECIFIC USER
    │   │   ├── GET VEHICLE ALL SORTED PRICE SPECIFIC USER
    │   │   └── GET VEHICLE ALL SORTED MILEAGE SPECIFIC USER
    │   ├── PHOTO MANAGEMENT
    │   │   ├── GET PHOTO ALL SPECIFIC USER
    │   │   ├── GET PHOTO BY ID SPECIFIC USER
    │   │   ├── DELETE PHOTO BY ID SPECIFIC USER
    │   │   └── POST PHOTO SPECIFIC USER
    │   ├── USER MANAGEMENT
    │   │   ├── GET FAVS USER ADS SPECIFIC USER
    │   │   ├── POST FAVS USER ADS SPECIFIC USER
    │   │   └── DELETE FAVS USER ADS SPECIFIC USER
    │   └── GET STATS USER
    │
    ├── VEHICLE/
    │   ├── POST VEHICLE
    │   ├── GET VEHICLE ALL
    │   ├── GET VEHICLE FILTRED
    │   ├── GET VEHICLE ALL SORTED PRICE
    │   ├── GET VEHICLE ALL SORTED MILEAGE
    │   ├── GET VEHICLE BY ID
    │   ├── GET VEHICLE BY USER
    │   ├── GET VEHICLE BY ADVERTISMENT
    │   ├── DELETE VEHICLE
    │   └── PUT VEHICLE
    │
    ├── ADVERTISMENT/
    │   ├── POST ADVERTISMENT
    │   ├── DELETE ADVERTISMENT
    │   ├── GET ADVERTISMENT ALL
    │   ├── GET ADVERTISMENT BY ID
    │   └── PUT ADVERTISMENT
    │
    ├── SECURITY/
    │   ├── LOGIN
    │   ├── RESET PASSWORD REQUEST
    │   ├── RESET PASSWORD
    │   ├── REFRESH ACCESS TOKEN
    │   └── LOGOUT
    │
    └── ADMIN_PAGE/
        ├── ADVERTISMENT MANAGEMENT
        │   ├── GET ADVERTISMENT ALL ADMIN
        │   ├── POST ADVERTISMENT ADMIN
        │   ├── GET ADVERTISMENT BY ID ADMIN
        │   ├── PUT ADVERTISMENT ADMIN
        │   ├── DELETE ADVERTISMENT ADMIN
        │   └── GET ADVERTISMENT BY USER ADMIN
        ├── VEHICLE MANAGEMENT
        │   ├── GET VEHICLE ALL ADMIN
        │   ├── POST VEHICLE ADMIN
        │   ├── PUT VEHICLE ADMIN
        │   ├── DELETE VEHICLE ADMIN
        │   ├── GET VEHICLES BY ID ADMIN
        │   ├── GET VEHICLE BY USER ADMIN
        │   ├── GET VEHICLE FILTRED ADMIN
        │   ├── GET VEHICLE ALL SORTED PRICE ADMIN
        │   └── GET VEHICLE ALL SORTED MILEAGE ADMIN
        ├── PHOTO MANAGEMENT
        │   ├── GET PHOTO ALL ADMIN
        │   ├── GET PHOTO BY ID ADMIN
        │   ├── DELETE PHOTO BY ID ADMIN
        │   └── POST PHOTO ADMIN
        ├── USER MANAGEMENT
        │   ├── GET USER ALL ADMIN
        │   ├── DELETE USER ADMIN
        │   ├── GET USER BY ID ADMIN
        │   ├── POST USER ADMIN
        │   ├── PUT USER ADMIN
        │   ├── GET FAVS USER ADS ADMIN
        │   ├── POST FAVS USER ADS ADMIN
        │   └── DELETE FAVS USER ADS ADMIN
        └── GET STATS USER
```

## 🗃️  Database Diagram

<img width="2028" height="2492" alt="db_diagram" src="https://github.com/user-attachments/assets/30c963c5-b50c-4d77-8908-959f6f4fb458" />
