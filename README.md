# Poland Car Market

**Poland Car Market (PCM)** is a modern web application inspired by popular automotive classified services. The project aims to create a functional and intuitive platform that allows users to sell, buy, and browse vehicle advertisements in a clear and user-friendly way. PCM is designed to compete with existing solutions on the market through high quality, security, and a rich set of features.

## **🧑‍💻 Author**

### Hubert Szydłowski

## 🛠️ Technologies

- **Java 17**
- **Spring Boot** – backend architecture
- **Spring Security + JWT** – secure authorization and authentication
- **Spring Data JPA (Hibernate)** – database access
- **PostgreSQL** – relational database
- **Maven** – project management
- **Mockito & MockMVC** *(planned implementation)* – unit and integration testing
- **Postman** *(planned to be replaced)* – endpoint testing
- **OpenAPI** – API documentation
- **Lombok** – reduces boilerplate code
- **React** – frontend framework
- **HTML, CSS, JavaScript** – frontend technologies
- **IntelliJ IDEA** – IDE
- **Git** – version control

## ✨ Current Features

The project is in an advanced stage of backend development and is ready for the next phases. All essential features related to managing advertisements, vehicles, and users have already been implemented. The backend currently supports full CRUD operations and other key functionalities such as advanced search, filtering, and user authorization. The next step is to implement unit and integration tests using Mockito & MockMVC, followed by frontend development. The application currently includes the following features:

### 1. Basic CRUD Features

- Manage data related to vehicles and users:
  - **Add new records** to the database.
  - **Retrieve data** by unique ID.
  - **Retrieve all data**.
  - **Update existing records**.
  - **Delete records** from the database.
- Support for a relational database using **Spring Data JPA** and **Hibernate**.
- Store vehicle photos on the local disk:
  - **File upload mechanism** on the server.
  - Only **file paths** are stored in the database.

### 2. Pagination, Sorting, and Advanced Search

- Mechanisms to handle large datasets efficiently:
  - **Sorting** by key attributes such as:
    - **Vehicle price**
    - **Mileage**
  - **Pagination** to divide results into pages, improving performance with large datasets.
- Advanced **filtering** based on selected criteria:
  - **Fuel type** (e.g., Diesel, Petrol, Hybrid)
  - **Vehicle condition** (e.g., New, Used, Damaged)
  - **Number of seats**
  - **Engine power**
  - And more
- Queries are generated **dynamically** based on the provided search criteria, ensuring **precise results**.

### 3. User System and Authorization

- **User roles** implemented using **Spring Security** and **JWT**:
  - **Administrator**: full access to edit and remove advertisements.
  - **Registered user**: manage their own advertisements.
  - **Guest**: browse advertisements only.
- JWT-based authorization provides **secure access** to application resources.
- Passwords secured with **Bcrypt**.
- **Refresh and Access Tokens** stored in **cookies**, allowing for **automatic login** and **session refresh**.
- **Email verification** during account registration.
- **Password recovery** via email.

### 4. Admin/User Panel and Reporting

- **Admin panel**:
  - **Moderate Advertisements** (remove rule-violating posts).
  - **Manage users**.
- **User panel**:
  - **My Advertisements** section with preview and editing.
  - **Favorites list**.
- **Reporting and Analytics**:
  - **For users**:
    - **View statistics** of their own **Advertisements**.
    - **Vehicle price statistics** based on criteria.
  - **For administrators**:
    - **Technical statistics** on app operation.
    - **User and vehicle statistics**.

## 🚀 Development Plan

### Backend:

1. **Implementation of unit and integration tests (Mockito & MockMVC)**  
   Add unit and integration tests using Mockito and MockMVC to ensure reliability and facilitate error detection during development.

2. **API optimization and frontend compatibility**  
   Optimize existing API endpoints to ensure smooth interaction with the frontend, enabling seamless data exchange between backend and UI.

### Frontend:

1. **React integration**  
   Develop a dynamic user interface using React to enable efficient state management and responsive rendering based on data changes.

2. **Responsive form design**  
   Ensure responsive design for forms, making the application convenient to use on both desktops and mobile devices.

3. **Google Maps API integration for vehicle location visualization**  
   Integration with Google Maps API will allow users to visualize vehicle locations on a map, making it easier to find **Advertisements** in specific geographic areas.

## 🧱 Backend Structure

```plaintext
src/
 ├── main/
 │    ├── java/
 │    │    └── com.app/
 │    │            ├── config/
 │    │            │    ├── CorsConfig.java
 │    │            │    └── OpenApiConfig.java
 │    │            │
 │    │            ├── controller/
 │    │            │    ├── AdminPageController.java
 │    │            │    ├── AdvertisementController.java
 │    │            │    ├── EmailController.java
 │    │            │    ├── UserController.java
 │    │            │    ├── UserPageController.java
 │    │            │    ├── VehicleController.java
 │    │            │    └── VehiclePhotoController.java
 │    │            │
 │    │            ├── dto/
 │    │            │    ├── AdminPageDto.java
 │    │            │    ├── AdvertisementDto.java
 │    │            │    ├── EmailDto.java
 │    │            │    ├── UserDto.java
 │    │            │    ├── UserPageDto.java
 │    │            │    ├── VehicleDto.java
 │    │            │    └── VehiclePhotoDto.java
 │    │            │
 │    │            ├── exception/
 │    │            │    ├── AdminPageExceptionHandler.java
 │    │            │    ├── AdvertisementExceptionHandler.java
 │    │            │    ├── EmailExceptionHandler.java
 │    │            │    ├── GlobalExceptionHandler.java
 │    │            │    ├── SecurityExceptionHandler.java
 │    │            │    ├── UserExceptionHandler.java
 │    │            │    ├── UserPageExceptionHandler.java
 │    │            │    ├── VehicleExceptionHandler.java
 │    │            │    └── VehiclePhotoExceptionHandler.java
 │    │            │
 │    │            ├── model/
 │    │            │    ├── AdminPage.java
 │    │            │    ├── Advertisement.java
 │    │            │    ├── Email.java
 │    │            │    ├── User.java
 │    │            │    ├── UserPage.java
 │    │            │    ├── Vehicle.java
 │    │            │    └── VehiclePhoto.java
 │    │            │
 │    │            ├── repository/
 │    │            │    ├── AdminPageRepository.java
 │    │            │    ├── AdvertisementRepository.java
 │    │            │    ├── EmailRepository.java
 │    │            │    ├── UserRepository.java
 │    │            │    ├── UserPageRepository.java
 │    │            │    ├── VehicleRepository.java
 │    │            │    └── PhotoRepository.java
 │    │            │
 │    │            ├── security/
 │    │            │    ├── CustomUserDetailsService.java
 │    │            │    ├── JWTFilter.java
 │    │            │    ├── JWTUtility.java
 │    │            │    └── SecurityConfig.java
 │    │            │
 │    │            ├── service/
 │    │            │    ├── AdminPageService.java
 │    │            │    ├── AdvertisementService.java
 │    │            │    ├── EmailService.java
 │    │            │    ├── UserService.java
 │    │            │    ├── UserPageService.java
 │    │            │    ├── VehicleService.java
 │    │            │    └── VehiclePhotoService.java
 │    │            │
 │    │            ├── utils/
 │    │            │    └── PasswordEncryptor.java
 │    │            │
 │    │            └── BackendApplication.java
 │    │
 │    └── resources/
 │         ├── api_docs/
 │         		└── api-docs.json
 │         ├── diagram_database/
 │         		└── diagram_db.png
 │         ├── static/
 │         ├── templates/
 │         └── application.properties
 │
 └── test/
      ├── java/
           ├── com.app.controller/
      	   ├── postman_tests.json
      	   	   └── PCM.postman_collection.json
      	   └── run
      	   	   └── BackendApplicationTests.java
```

## 🧪 Endpoint Testing (Postman Collection)
```plaintext
└── PCM/
    ├── PHOTO/
    │   ├── POST PHOTO
    │   ├── GET PHOTO ALL
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
        │   ├── GET FAVS USER ADS SPECIFIC ADMIN
        │   ├── POST FAVS USER ADS SPECIFIC ADMIN
        │   └── DELETE FAVS USER ADS SPECIFIC ADMIN
        └── GET STATS USER
```

## 🗃️  Database Diagram

![Database Diagram](https://github.com/HubertSzydlowski/PolandCarMarket/blob/master/backend/src/main/resources/diagram_database/diagram_db.png)
