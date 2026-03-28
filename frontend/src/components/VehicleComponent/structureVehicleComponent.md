| File Name                | Description                                                          | Used Endpoints                                                                   |
| ------------------------ | -------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `VehicleList.js`         | Displaying a list of vehicles (optionally with filters and sorting). | `getVehicles()`, `getFilteredVehicles(opts)`, `getSortedVehicles(sortBy, order)` |
| `VehicleDetails.js`      | Details of a single vehicle.                                         | `getVehicleById(id)`                                                             |
| `VehicleCreateForm.js`   | Form for creating a new vehicle.                                     | `createVehicle(vehicleDto)`                                                      |
| `VehicleEditForm.js`     | Form for editing an existing vehicle.                                | `getVehicleById(id)`, `updateVehicle(id, vehicleDto)`                            |
| `VehicleDeleteButton.js` | Button to delete a vehicle with confirmation.                        | `deleteVehicle(id)`                                                              |
