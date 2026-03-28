# OpenApiDefinition.AdminPageControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addPhotoToVehicle1**](AdminPageControllerApi.md#addPhotoToVehicle1) | **POST** /admin-page/vehicle-photos/{vehicleId} | 
[**addToFavorites2**](AdminPageControllerApi.md#addToFavorites2) | **POST** /admin-page/users/{userId}/favorites/{advertisementId} | 
[**createAdvertisement1**](AdminPageControllerApi.md#createAdvertisement1) | **POST** /admin-page/advertisements | 
[**createUser1**](AdminPageControllerApi.md#createUser1) | **POST** /admin-page/users/register | 
[**createVehicle1**](AdminPageControllerApi.md#createVehicle1) | **POST** /admin-page/vehicles | 
[**deleteAdvertisement1**](AdminPageControllerApi.md#deleteAdvertisement1) | **DELETE** /admin-page/advertisements/{id} | 
[**deletePhoto1**](AdminPageControllerApi.md#deletePhoto1) | **DELETE** /admin-page/vehicle-photos/{id} | 
[**deleteUser1**](AdminPageControllerApi.md#deleteUser1) | **DELETE** /admin-page/users/{id} | 
[**deleteVehicle1**](AdminPageControllerApi.md#deleteVehicle1) | **DELETE** /admin-page/vehicles/{id} | 
[**getAdvertisementById1**](AdminPageControllerApi.md#getAdvertisementById1) | **GET** /admin-page/advertisements/{id} | 
[**getAdvertisementsByUser**](AdminPageControllerApi.md#getAdvertisementsByUser) | **GET** /admin-page/advertisements/user/{userId} | 
[**getAllAdvertisements**](AdminPageControllerApi.md#getAllAdvertisements) | **GET** /admin-page/advertisements | 
[**getAllPhotos1**](AdminPageControllerApi.md#getAllPhotos1) | **GET** /admin-page/vehicle-photos | 
[**getAllUsers1**](AdminPageControllerApi.md#getAllUsers1) | **GET** /admin-page/users | 
[**getAllVehicles**](AdminPageControllerApi.md#getAllVehicles) | **GET** /admin-page/vehicles | 
[**getDashboard**](AdminPageControllerApi.md#getDashboard) | **GET** /admin-page/dashboard | 
[**getFavorites2**](AdminPageControllerApi.md#getFavorites2) | **GET** /admin-page/users/{userId}/favorites | 
[**getFilteredVehicles1**](AdminPageControllerApi.md#getFilteredVehicles1) | **GET** /admin-page/vehicles/filter | 
[**getPhotoById1**](AdminPageControllerApi.md#getPhotoById1) | **GET** /admin-page/vehicle-photos/{id} | 
[**getSortedVehicles1**](AdminPageControllerApi.md#getSortedVehicles1) | **GET** /admin-page/vehicles/sorted | 
[**getUserById1**](AdminPageControllerApi.md#getUserById1) | **GET** /admin-page/users/{id} | 
[**getVehicleById1**](AdminPageControllerApi.md#getVehicleById1) | **GET** /admin-page/vehicles/{id} | 
[**getVehiclesByUser**](AdminPageControllerApi.md#getVehiclesByUser) | **GET** /admin-page/vehicles/user/{userId} | 
[**removeFromFavorites2**](AdminPageControllerApi.md#removeFromFavorites2) | **DELETE** /admin-page/users/{userId}/favorites/{advertisementId} | 
[**updateAdvertisement1**](AdminPageControllerApi.md#updateAdvertisement1) | **PUT** /admin-page/advertisements/{id} | 
[**updateUser1**](AdminPageControllerApi.md#updateUser1) | **PUT** /admin-page/users/{id} | 
[**updateVehicle1**](AdminPageControllerApi.md#updateVehicle1) | **PUT** /admin-page/vehicles/{id} | 



## addPhotoToVehicle1

> VehiclePhotoDto addPhotoToVehicle1(vehicleId, isMain, opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let vehicleId = 789; // Number | 
let isMain = true; // Boolean | 
let opts = {
  'addPhotoToVehicleRequest': new OpenApiDefinition.AddPhotoToVehicleRequest() // AddPhotoToVehicleRequest | 
};
apiInstance.addPhotoToVehicle1(vehicleId, isMain, opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Number**|  | 
 **isMain** | **Boolean**|  | 
 **addPhotoToVehicleRequest** | [**AddPhotoToVehicleRequest**](AddPhotoToVehicleRequest.md)|  | [optional] 

### Return type

[**VehiclePhotoDto**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## addToFavorites2

> String addToFavorites2(userId, advertisementId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userId = 789; // Number | 
let advertisementId = 789; // Number | 
apiInstance.addToFavorites2(userId, advertisementId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 
 **advertisementId** | **Number**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## createAdvertisement1

> AdvertisementDto createAdvertisement1(advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.createAdvertisement1(advertisementDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **advertisementDto** | [**AdvertisementDto**](AdvertisementDto.md)|  | 

### Return type

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## createUser1

> UserDto createUser1(userDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userDto = new OpenApiDefinition.UserDto(); // UserDto | 
apiInstance.createUser1(userDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userDto** | [**UserDto**](UserDto.md)|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## createVehicle1

> VehicleDto createVehicle1(vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.createVehicle1(vehicleDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleDto** | [**VehicleDto**](VehicleDto.md)|  | 

### Return type

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteAdvertisement1

> deleteAdvertisement1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.deleteAdvertisement1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## deletePhoto1

> deletePhoto1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.deletePhoto1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## deleteUser1

> deleteUser1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.deleteUser1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## deleteVehicle1

> deleteVehicle1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.deleteVehicle1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getAdvertisementById1

> AdvertisementDto getAdvertisementById1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.getAdvertisementById1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAdvertisementsByUser

> [AdvertisementDto] getAdvertisementsByUser(userId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userId = 789; // Number | 
apiInstance.getAdvertisementsByUser(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 

### Return type

[**[AdvertisementDto]**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllAdvertisements

> PageAdvertisementDto getAllAdvertisements(pageable)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let pageable = new OpenApiDefinition.Pageable(); // Pageable | 
apiInstance.getAllAdvertisements(pageable, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **pageable** | [**Pageable**](.md)|  | 

### Return type

[**PageAdvertisementDto**](PageAdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllPhotos1

> [VehiclePhotoDto] getAllPhotos1()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
apiInstance.getAllPhotos1((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[VehiclePhotoDto]**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllUsers1

> [UserDto] getAllUsers1()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
apiInstance.getAllUsers1((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[UserDto]**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAllVehicles

> [VehicleDto] getAllVehicles()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
apiInstance.getAllVehicles((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[VehicleDto]**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getDashboard

> AdminPageDto getDashboard(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let opts = {
  'start': "start_example", // String | 
  'end': "end_example" // String | 
};
apiInstance.getDashboard(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **start** | **String**|  | [optional] 
 **end** | **String**|  | [optional] 

### Return type

[**AdminPageDto**](AdminPageDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getFavorites2

> [Number] getFavorites2(userId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userId = 789; // Number | 
apiInstance.getFavorites2(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 

### Return type

**[Number]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getFilteredVehicles1

> [VehicleDto] getFilteredVehicles1(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let opts = {
  'brand': "brand_example", // String | 
  'model': "model_example", // String | 
  'year': 56, // Number | 
  'minPrice': 3.4, // Number | 
  'maxPrice': 3.4, // Number | 
  'minMileage': 56, // Number | 
  'maxMileage': 56, // Number | 
  'fuelType': "fuelType_example", // String | 
  'transmission': "transmission_example" // String | 
};
apiInstance.getFilteredVehicles1(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **brand** | **String**|  | [optional] 
 **model** | **String**|  | [optional] 
 **year** | **Number**|  | [optional] 
 **minPrice** | **Number**|  | [optional] 
 **maxPrice** | **Number**|  | [optional] 
 **minMileage** | **Number**|  | [optional] 
 **maxMileage** | **Number**|  | [optional] 
 **fuelType** | **String**|  | [optional] 
 **transmission** | **String**|  | [optional] 

### Return type

[**[VehicleDto]**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getPhotoById1

> VehiclePhotoDto getPhotoById1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.getPhotoById1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**VehiclePhotoDto**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getSortedVehicles1

> [VehicleDto] getSortedVehicles1(sortBy, order)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let sortBy = "sortBy_example"; // String | 
let order = "order_example"; // String | 
apiInstance.getSortedVehicles1(sortBy, order, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **sortBy** | **String**|  | 
 **order** | **String**|  | 

### Return type

[**[VehicleDto]**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUserById1

> UserDto getUserById1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.getUserById1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehicleById1

> VehicleDto getVehicleById1(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
apiInstance.getVehicleById1(id, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 

### Return type

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getVehiclesByUser

> [VehicleDto] getVehiclesByUser(userId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userId = 789; // Number | 
apiInstance.getVehiclesByUser(userId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 

### Return type

[**[VehicleDto]**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## removeFromFavorites2

> String removeFromFavorites2(userId, advertisementId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let userId = 789; // Number | 
let advertisementId = 789; // Number | 
apiInstance.removeFromFavorites2(userId, advertisementId, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **userId** | **Number**|  | 
 **advertisementId** | **Number**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateAdvertisement1

> AdvertisementDto updateAdvertisement1(id, advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.updateAdvertisement1(id, advertisementDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **advertisementDto** | [**AdvertisementDto**](AdvertisementDto.md)|  | 

### Return type

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## updateUser1

> UserDto updateUser1(id, userDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
let userDto = new OpenApiDefinition.UserDto(); // UserDto | 
apiInstance.updateUser1(id, userDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **userDto** | [**UserDto**](UserDto.md)|  | 

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## updateVehicle1

> VehicleDto updateVehicle1(id, vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdminPageControllerApi();
let id = 789; // Number | 
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.updateVehicle1(id, vehicleDto, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Number**|  | 
 **vehicleDto** | [**VehicleDto**](VehicleDto.md)|  | 

### Return type

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

