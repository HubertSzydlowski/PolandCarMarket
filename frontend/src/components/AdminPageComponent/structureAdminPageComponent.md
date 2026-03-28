| File Name                      | Description                                             | Used Endpoints                                                                  |
| ------------------------------ | ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `UserDashboard.js`             | Displays the user's dashboard with stats and summaries. | `getUserDashboard()`                                                            |
| `FavoritesList.js`             | Shows a list of favorite advertisement IDs.             | `getFavorites1()`                                                               |
| `AddToFavoritesButton.js`      | Adds an advertisement to favorites.                     | `addToFavorites1(advertisementId)`                                              |
| `RemoveFromFavoritesButton.js` | Removes an advertisement from favorites.                | `removeFromFavorites1(advertisementId)`                                         |
| `AdvertisementList.js`         | Lists user-owned advertisements.                        | `getUserAdvertisements(page, size)`                                             |
| `AdvertisementDetails.js`      | Shows details of a specific user advertisement.         | `getUserAdvertisementById(id)`                                                  |
| `AdvertisementCreateForm.js`   | Form to create a new user advertisement.                | `createUserAdvertisement(advertisementDto)`                                     |
| `AdvertisementEditForm.js`     | Form to edit an existing user advertisement.            | `getUserAdvertisementById(id)`, `updateUserAdvertisement(id, advertisementDto)` |
| `AdvertisementDeleteButton.js` | Deletes a user advertisement.                           | `deleteUserAdvertisement(id)`                                                   |
| `VehicleList.js`               | Lists vehicles owned by the user.                       | `getUserVehicles()`                                                             |
| `VehicleDetails.js`            | Shows details of a specific user vehicle.               | `getUserVehicleById(id)`                                                        |
| `VehicleCreateForm.js`         | Form to create a new vehicle.                           | `createUserVehicle(vehicleDto)`                                                 |
| `VehicleEditForm.js`           | Form to edit an existing vehicle.                       | `getUserVehicleById(id)`, `updateUserVehicle(id, vehicleDto)`                   |
| `VehicleDeleteButton.js`       | Deletes a user vehicle.                                 | `deleteUserVehicle(id)`                                                         |
| `VehiclePhotoList.js`          | Lists photos for a selected vehicle.                    | `getVehiclePhotos(vehicleId)`                                                   |
| `VehiclePhotoUploadForm.js`    | Form to upload a photo to a vehicle.                    | `uploadPhotoToVehicle(vehicleId, opts)`                                         |
| `VehiclePhotoDeleteButton.js`  | Deletes a photo from a vehicle.                         | `deleteVehiclePhoto(photoId)`                                                   |
