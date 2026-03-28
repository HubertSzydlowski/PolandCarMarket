| File Name                     | Description                                         | Used Endpoints                                                        |
| ----------------------------- | -------------------------------------------------- | -------------------------------------------------------------------- |
| `AdvertisementList.js`         | Displays a paginated list of advertisements.       | `getAdvertisements(page, opts)`                                      |
| `AdvertisementDetails.js`      | Details of a single advertisement.                  | `getAdvertisementById(id)`                                           |
| `AdvertisementCreateForm.js`   | Form for creating a new advertisement.              | `createAdvertisement(advertisementDto)`                              |
| `AdvertisementEditForm.js`     | Form for editing an existing advertisement.         | `getAdvertisementById(id)`, `updateAdvertisement(id, advertisementDto)` |
| `AdvertisementDeleteButton.js` | Button to delete an advertisement with confirmation.| `deleteAdvertisement(id)`                                            |
