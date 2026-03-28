package com.app.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vehicles") // Specifies the name of the table in the database for the Vehicle entity
@Data // Lombok annotation that generates getters, setters, toString, equals, and hashCode methods automatically
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Automatically generates a value for the primary key using the identity strategy
    private Long id; // Unique identifier for each vehicle

    @Enumerated(EnumType.STRING)
    private Brand brand; // The brand of the vehicle (e.g., Toyota, BMW, etc.)

    @Enumerated(EnumType.STRING)
    private Model model; // The model of the vehicle (e.g., Corolla, X5, etc.)

    private int year; // The year the vehicle was manufactured
    private double price; // The price of the vehicle

    @Enumerated(EnumType.STRING) // Enum value is stored as a string in the database
    private FuelType fuelType; // The type of fuel used by the vehicle (e.g., Petrol, Diesel, Electric)

    @Enumerated(EnumType.STRING) // Enum value is stored as a string in the database
    private TransmissionType transmission; // The type of transmission in the vehicle (e.g., Manual, Automatic)

    private String color; // The color of the vehicle (e.g., Red, Black, White, etc.)
    private int mileage; // The mileage of the vehicle (in kilometers or miles)
    private int power; // The power of the vehicle's engine (usually in horsepower)
    private int seats; // The number of seats in the vehicle
    private String description; // A description of the vehicle (e.g., features, condition, etc.)
    private String vin; // The Vehicle Identification Number (VIN) of the vehicle, a unique identifier for each vehicle

    @Enumerated(EnumType.STRING) // Enum value is stored as a string in the database
    private Condition condition; // The condition of the vehicle (e.g., New, Used, Damaged)

    private Boolean hasWarranty; // Indicates whether the vehicle has a warranty (true/false)

    @ManyToOne // Defines a many-to-one relationship with the Advertisement entity
    @JoinColumn(name = "advertisement_id") // Foreign key column pointing to the Advertisement entity
    private Advertisement advertisement; // The advertisement associated with the vehicle

    // Constructor with parameters
    public Vehicle(
            Brand brand, // The brand of the vehicle
            Model model, // The model of the vehicle
            Integer year, // The year of manufacture
            Double price, // The price of the vehicle
            FuelType fuelType, // The fuel type of the vehicle
            TransmissionType transmission, // The transmission type
            String color, // The color of the vehicle
            Integer mileage, // The mileage of the vehicle
            Integer power, // The engine power
            Integer seats, // The number of seats in the vehicle
            String description, // The vehicle description
            String vin, // The vehicle's VIN
            Condition condition, // The condition of the vehicle
            Boolean hasWarranty // Whether the vehicle has a warranty
    ) {
        this.brand = brand; // Set the brand of the vehicle
        this.model = model; // Set the model of the vehicle
        this.year = year; // Set the manufacturing year
        this.price = price; // Set the price
        this.fuelType = fuelType; // Set the fuel type
        this.transmission = transmission; // Set the transmission type
        this.color = color; // Set the color
        this.mileage = mileage; // Set the mileage
        this.power = power; // Set the engine power
        this.seats = seats; // Set the number of seats
        this.description = description; // Set the description
        this.vin = vin; // Set the VIN
        this.condition = condition; // Set the condition of the vehicle
        this.hasWarranty = hasWarranty; // Set the warranty status
    }

    // Enum for fuel types
    public enum FuelType {
        PETROL, // Represents a petrol (gasoline) powered vehicle
        DIESEL, // Represents a diesel powered vehicle
        LPG, // Represents a liquefied petroleum gas (LPG) powered vehicle
        ELECTRIC, // Represents an electric powered vehicle
        HYBRID // Represents a hybrid powered vehicle
    }

    // Enum for transmission types
    public enum TransmissionType {
        MANUAL, // Represents a manual transmission vehicle
        AUTOMATIC // Represents an automatic transmission vehicle
    }

    // Enum for vehicle conditions
    public enum Condition {
        NEW, // Represents a new vehicle
        USED, // Represents a used vehicle
        DAMAGED // Represents a damaged vehicle
    }

    // Enum for car brands
    public enum Brand {
        TOYOTA,
        VOLKSWAGEN,
        FORD,
        HONDA,
        CHEVROLET,
        BMW,
        MERCEDES,
        NISSAN,
        HYUNDAI,
        KIA,
        AUDI,
        RENAULT,
        PEUGEOT,
        FIAT,
        SEAT,
        SKODA,
        MAZDA,
        SUBARU,
        VOLVO,
        JEEP
    }

    // Enum for car models, each associated with a Brand
    public enum Model {
        // TOYOTA
        COROLLA(Brand.TOYOTA),
        CAMRY(Brand.TOYOTA),
        RAV4(Brand.TOYOTA),
        HILUX(Brand.TOYOTA),
        YARIS(Brand.TOYOTA),
        PRIUS(Brand.TOYOTA),
        LANDCRUISER(Brand.TOYOTA),
        AVALON(Brand.TOYOTA),
        HIGHLANDER(Brand.TOYOTA),
        SIENNA(Brand.TOYOTA),

        // VOLKSWAGEN
        GOLF(Brand.VOLKSWAGEN),
        PASSAT(Brand.VOLKSWAGEN),
        TIGUAN(Brand.VOLKSWAGEN),
        POLO(Brand.VOLKSWAGEN),
        JETTA(Brand.VOLKSWAGEN),
        ARTEON(Brand.VOLKSWAGEN),
        TOUAREG(Brand.VOLKSWAGEN),
        UP(Brand.VOLKSWAGEN),
        SCIROCCO(Brand.VOLKSWAGEN),
        BEETLE(Brand.VOLKSWAGEN),

        // FORD
        FOCUS(Brand.FORD),
        FIESTA(Brand.FORD),
        MUSTANG(Brand.FORD),
        MONDEO(Brand.FORD),
        ESCAPE(Brand.FORD),
        EXPLORER(Brand.FORD),
        RANGER(Brand.FORD),
        EDGE(Brand.FORD),
        ECOBOOST(Brand.FORD),
        EXPEDITION(Brand.FORD),

        // HONDA
        CIVIC(Brand.HONDA),
        ACCORD(Brand.HONDA),
        CRV(Brand.HONDA),
        HRV(Brand.HONDA),
        PILOT(Brand.HONDA),
        ODYSSEY(Brand.HONDA),
        FIT(Brand.HONDA),
        INSIGHT(Brand.HONDA),
        RIDGELINE(Brand.HONDA),
        ELEMENT(Brand.HONDA),

        // CHEVROLET
        SILVERADO(Brand.CHEVROLET),
        MALIBU(Brand.CHEVROLET),
        EQUINOX(Brand.CHEVROLET),
        CAMARO(Brand.CHEVROLET),
        TRAX(Brand.CHEVROLET),
        COLORADO(Brand.CHEVROLET),
        SUBURBAN(Brand.CHEVROLET),
        TAHOE(Brand.CHEVROLET),
        IMPALA(Brand.CHEVROLET),
        CORVETTE(Brand.CHEVROLET),

        // BMW
        SERIES3(Brand.BMW),
        SERIES5(Brand.BMW),
        X5(Brand.BMW),
        X3(Brand.BMW),
        SERIES7(Brand.BMW),
        X1(Brand.BMW),
        M3(Brand.BMW),
        M5(Brand.BMW),
        Z4(Brand.BMW),
        I3(Brand.BMW),

        // MERCEDES
        CCLASS(Brand.MERCEDES),
        ECLASS(Brand.MERCEDES),
        SCLASS(Brand.MERCEDES),
        GLC(Brand.MERCEDES),
        GLE(Brand.MERCEDES),
        ACLASS(Brand.MERCEDES),
        GCLASS(Brand.MERCEDES),
        CLA(Brand.MERCEDES),
        GLS(Brand.MERCEDES),
        SL(Brand.MERCEDES),

        // NISSAN
        ALTIMA(Brand.NISSAN),
        ROGUE(Brand.NISSAN),
        SENTRA(Brand.NISSAN),
        VERSA(Brand.NISSAN),
        PATHFINDER(Brand.NISSAN),
        JUKE(Brand.NISSAN),
        TITAN(Brand.NISSAN),
        LEAF(Brand.NISSAN),
        MURANO(Brand.NISSAN),
        MAXIMA(Brand.NISSAN),

        // HYUNDAI
        ELANTRA(Brand.HYUNDAI),
        SONATA(Brand.HYUNDAI),
        TUCSON(Brand.HYUNDAI),
        SANTA_FE(Brand.HYUNDAI),
        ACCENT(Brand.HYUNDAI),
        KONA(Brand.HYUNDAI),
        VENUE(Brand.HYUNDAI),
        PALISADE(Brand.HYUNDAI),
        IONIQ(Brand.HYUNDAI),
        SANTAFE(Brand.HYUNDAI),

        // KIA
        SOUL(Brand.KIA),
        SPORTAGE(Brand.KIA),
        OPTIMA(Brand.KIA),
        SORRENTO(Brand.KIA),
        RIO(Brand.KIA),
        FORTE(Brand.KIA),
        STINGER(Brand.KIA),
        NIRO(Brand.KIA),
        CADENZA(Brand.KIA),
        SELTOS(Brand.KIA),

        // AUDI
        A3(Brand.AUDI),
        A4(Brand.AUDI),
        A6(Brand.AUDI),
        Q5(Brand.AUDI),
        Q7(Brand.AUDI),
        A8(Brand.AUDI),
        Q3(Brand.AUDI),
        TT(Brand.AUDI),
        RS5(Brand.AUDI),
        R8(Brand.AUDI),

        // RENAULT
        CLIO(Brand.RENAULT),
        MEGANE(Brand.RENAULT),
        CAPTUR(Brand.RENAULT),
        SCENIC(Brand.RENAULT),
        KADJAR(Brand.RENAULT),
        TALISMAN(Brand.RENAULT),
        ZOE(Brand.RENAULT),
        KOLEOS(Brand.RENAULT),
        ESPACE(Brand.RENAULT),
        TWINGO(Brand.RENAULT),

        // PEUGEOT
        _208(Brand.PEUGEOT),
        _308(Brand.PEUGEOT),
        _3008(Brand.PEUGEOT),
        _5008(Brand.PEUGEOT),
        _2008(Brand.PEUGEOT),
        PARTNER(Brand.PEUGEOT),
        RIFTER(Brand.PEUGEOT),
        EXPERT(Brand.PEUGEOT),
        BOXER(Brand.PEUGEOT),
        _508(Brand.PEUGEOT),

        // FIAT
        PANDA(Brand.FIAT),
        TIPO(Brand.FIAT),
        _500(Brand.FIAT),
        PUNTO(Brand.FIAT),
        DOBLO(Brand.FIAT),
        QUBO(Brand.FIAT),
        SCUDO(Brand.FIAT),
        BRAVO(Brand.FIAT),
        STILO(Brand.FIAT),
        FIORINO(Brand.FIAT),

        // SEAT
        IBIZA(Brand.SEAT),
        LEON(Brand.SEAT),
        ARONA(Brand.SEAT),
        ATECA(Brand.SEAT),
        TOLEDO(Brand.SEAT),
        ALHAMBRA(Brand.SEAT),
        ALTEA(Brand.SEAT),
        EXEO(Brand.SEAT),
        MII(Brand.SEAT),
        TARRACO(Brand.SEAT),

        // SKODA
        OCTAVIA(Brand.SKODA),
        SUPERB(Brand.SKODA),
        FABIA(Brand.SKODA),
        KAROQ(Brand.SKODA),
        KODIAQ(Brand.SKODA),
        RAPID(Brand.SKODA),
        CITIGO(Brand.SKODA),
        YETI(Brand.SKODA),
        ROOMSTER(Brand.SKODA),
        ENYAQ(Brand.SKODA),

        // MAZDA
        CX5(Brand.MAZDA),
        CX3(Brand.MAZDA),
        CX9(Brand.MAZDA),
        MAZDA3(Brand.MAZDA),
        MAZDA6(Brand.MAZDA),
        MX5(Brand.MAZDA),
        BT50(Brand.MAZDA),
        RX8(Brand.MAZDA),
        CX30(Brand.MAZDA),
        MAZDASPEED3(Brand.MAZDA),

        // SUBARU
        OUTBACK(Brand.SUBARU),
        FORESTER(Brand.SUBARU),
        IMPREZA(Brand.SUBARU),
        XV(Brand.SUBARU),
        LEGACY(Brand.SUBARU),
        BRZ(Brand.SUBARU),
        WRX(Brand.SUBARU),
        ASCENT(Brand.SUBARU),
        CROSSTREK(Brand.SUBARU),
        TREZIA(Brand.SUBARU),

        // VOLVO
        XC90(Brand.VOLVO),
        XC60(Brand.VOLVO),
        XC40(Brand.VOLVO),
        S60(Brand.VOLVO),
        S90(Brand.VOLVO),
        V60(Brand.VOLVO),
        V90(Brand.VOLVO),
        V40(Brand.VOLVO),
        C40(Brand.VOLVO),
        POLSTAR2(Brand.VOLVO),

        // JEEP
        WRANGLER(Brand.JEEP),
        CHEROKEE(Brand.JEEP),
        GRANDCHEROKEE(Brand.JEEP),
        COMPASS(Brand.JEEP),
        RENEGADE(Brand.JEEP),
        GLADIATOR(Brand.JEEP),
        PATRIOT(Brand.JEEP),
        COMMANDER(Brand.JEEP),
        WAGONEER(Brand.JEEP),
        LIBERTY(Brand.JEEP);

        private final Brand brand;

        Model(Brand brand) {
            this.brand = brand;
        }

        public Brand getBrand() {
            return brand;
        }
    }
}