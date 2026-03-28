package com.app.service;

import com.app.dto.VehicleDto;
import com.app.model.Advertisement;
import com.app.model.Vehicle;
import com.app.repository.AdvertisementRepository;
import com.app.repository.VehicleRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Data
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository; // Injected repository for interacting with Vehicle data

    @Autowired
    private AdvertisementRepository advertisementRepository; // Injected repository for interacting with Advertisement data

    // Method to get all vehicle with optional filters and sorted
    public List<VehicleDto> getVehicles(
            String brand,
            String model,
            Integer year,
            Double minPrice,
            Double maxPrice,
            Integer minMileage,
            Integer maxMileage,
            String fuelType,
            String transmission,
            String sortBy,
            String order
    ) {
        Specification<Vehicle> specification = Specification.where(null);

        if (brand != null) {
            try {
                Vehicle.Brand brandEnum = Vehicle.Brand.valueOf(brand.toUpperCase());
                specification = specification.and((root, query, cb) ->
                        cb.equal(root.get("brand"), brandEnum));
            } catch (IllegalArgumentException e) {
                // Brand not valid - ignore filter or handle accordingly
                // Here: ignore filter
            }
        }
        if (model != null) {
            try {
                Vehicle.Model modelEnum = Vehicle.Model.valueOf(model.toUpperCase());
                specification = specification.and((root, query, cb) ->
                        cb.equal(root.get("model"), modelEnum));
            } catch (IllegalArgumentException e) {
                // Model not valid - ignore filter or handle accordingly
            }
        }
        if (year != null) {
            specification = specification.and((root, query, cb) ->
                    cb.equal(root.get("year"), year));
        }
        if (minPrice != null) {
            specification = specification.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), minPrice));
        }
        if (maxPrice != null) {
            specification = specification.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), maxPrice));
        }
        if (minMileage != null) {
            specification = specification.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("mileage"), minMileage));
        }
        if (maxMileage != null) {
            specification = specification.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("mileage"), maxMileage));
        }
        if (fuelType != null) {
            try {
                Vehicle.FuelType fuelTypeEnum = Vehicle.FuelType.valueOf(fuelType.toUpperCase());
                specification = specification.and((root, query, cb) ->
                        cb.equal(root.get("fuelType"), fuelTypeEnum));
            } catch (IllegalArgumentException e) {
                // ignore invalid fuelType
            }
        }
        if (transmission != null) {
            try {
                Vehicle.TransmissionType transmissionEnum = Vehicle.TransmissionType.valueOf(transmission.toUpperCase());
                specification = specification.and((root, query, cb) ->
                        cb.equal(root.get("transmission"), transmissionEnum));
            } catch (IllegalArgumentException e) {
                // ignore invalid transmission
            }
        }

        Sort sort = Sort.unsorted();

        if (sortBy != null && !sortBy.isBlank()) {
            Sort.Direction direction = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
            if ("price".equalsIgnoreCase(sortBy) || "mileage".equalsIgnoreCase(sortBy) || "year".equalsIgnoreCase(sortBy)) {
                sort = Sort.by(direction, sortBy);
            }
        }

        List<Vehicle> vehicles = vehicleRepository.findAll(specification, sort);

        return vehicles.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public VehicleDto getVehicleById(Long id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle.map(this::convertToDto).orElse(null);
    }

    public VehicleDto createVehicle(VehicleDto vehicleDto) {
        Advertisement advertisement = advertisementRepository.findById(vehicleDto.getAdvertisementId())
                .orElseThrow(() -> new RuntimeException("Advertisement not found"));

        boolean advertisementHasVehicle = vehicleRepository.existsByAdvertisement_Id(vehicleDto.getAdvertisementId());
        if (advertisementHasVehicle) {
            throw new RuntimeException("A vehicle is already assigned to this advertisement ID");
        }

        Vehicle vehicle = convertToEntity(vehicleDto);
        vehicle.setAdvertisement(advertisement);

        Vehicle savedVehicle = vehicleRepository.save(vehicle);
        return convertToDto(savedVehicle);
    }

    public VehicleDto updateVehicle(Long id, VehicleDto vehicleDto) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        Advertisement advertisement = advertisementRepository.findById(vehicleDto.getAdvertisementId())
                .orElseThrow(() -> new RuntimeException("Advertisement not found"));

        Optional<Vehicle> existingVehicle = vehicleRepository.findByAdvertisement_Id(vehicleDto.getAdvertisementId());
        if (existingVehicle.isPresent() && !existingVehicle.get().getId().equals(id)) {
            throw new RuntimeException("Another vehicle is already assigned to this advertisement ID");
        }

        vehicle.setBrand(vehicleDto.getBrand());
        vehicle.setModel(vehicleDto.getModel());
        vehicle.setYear(vehicleDto.getYear());
        vehicle.setPrice(vehicleDto.getPrice());
        vehicle.setFuelType(vehicleDto.getFuelType());
        vehicle.setTransmission(vehicleDto.getTransmission());
        vehicle.setColor(vehicleDto.getColor());
        vehicle.setMileage(vehicleDto.getMileage());
        vehicle.setPower(vehicleDto.getPower());
        vehicle.setSeats(vehicleDto.getSeats());
        vehicle.setDescription(vehicleDto.getDescription());
        vehicle.setVin(vehicleDto.getVin());
        vehicle.setHasWarranty(vehicleDto.getHasWarranty());
        vehicle.setCondition(vehicleDto.getCondition());
        vehicle.setAdvertisement(advertisement);

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return convertToDto(updatedVehicle);
    }

    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }

    private VehicleDto convertToDto(Vehicle vehicle) {
        return new VehicleDto(
                vehicle.getId(),
                vehicle.getBrand(),
                vehicle.getModel(),
                vehicle.getYear(),
                vehicle.getPrice(),
                vehicle.getFuelType(),
                vehicle.getTransmission(),
                vehicle.getColor(),
                vehicle.getMileage(),
                vehicle.getPower(),
                vehicle.getSeats(),
                vehicle.getDescription(),
                vehicle.getVin(),
                vehicle.getCondition(),
                vehicle.getHasWarranty(),
                vehicle.getAdvertisement().getId()
        );
    }

    private Vehicle convertToEntity(VehicleDto vehicleDto) {
        return new Vehicle(
                vehicleDto.getBrand(),
                vehicleDto.getModel(),
                vehicleDto.getYear(),
                vehicleDto.getPrice(),
                vehicleDto.getFuelType(),
                vehicleDto.getTransmission(),
                vehicleDto.getColor(),
                vehicleDto.getMileage(),
                vehicleDto.getPower(),
                vehicleDto.getSeats(),
                vehicleDto.getDescription(),
                vehicleDto.getVin(),
                vehicleDto.getCondition(),
                vehicleDto.getHasWarranty()
        );
    }

    public List<VehicleDto> getVehiclesByUser(Long userId) {
        List<Advertisement> userAds = advertisementRepository.findByUserId(userId);
        List<Long> adIds = userAds.stream().map(Advertisement::getId).collect(Collectors.toList());

        return vehicleRepository.findAll().stream()
                .filter(vehicle -> adIds.contains(vehicle.getAdvertisement().getId()))
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public VehicleDto getVehicleByAdvertisementId(Long advertisementId) {
        Vehicle vehicle = vehicleRepository.findByAdvertisement_Id(advertisementId)
                .orElseThrow(() -> new RuntimeException("Vehicle not found for advertisementId: " + advertisementId));
        return convertToDto(vehicle);
    }

}