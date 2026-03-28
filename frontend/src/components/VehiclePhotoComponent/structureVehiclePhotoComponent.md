| File name                     | Description                                                   | Used endpoints                                            |
| ----------------------------- | ------------------------------------------------------------- | --------------------------------------------------------- |
| `VehiclePhotoList.js`         | Displays a list of all photos (e.g., for admin or testing).   | `getAllPhotos()`                                          |
| `VehiclePhotoDetails.js`      | Details of a single photo (e.g., ID, URL, vehicleId, isMain). | `getPhotoById(id)`                                        |
| `VehiclePhotoUploadForm.js`   | Form to add a photo to a vehicle (file, isMain, vehicleId).   | `addPhotoToVehicle(vehicleId, isMain, username, request)` |
| `VehiclePhotoDeleteButton.js` | Button/service to delete a photo.                             | `deletePhoto(id)`                                         |
