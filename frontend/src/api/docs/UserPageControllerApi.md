# OpenApiDefinition.UserPageControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addToFavorites1**](UserPageControllerApi.md#addToFavorites1) | **POST** /user-page/favorites/{advertisementId} | 
[**createUserAdvertisement**](UserPageControllerApi.md#createUserAdvertisement) | **POST** /user-page/advertisements | 
[**createUserVehicle**](UserPageControllerApi.md#createUserVehicle) | **POST** /user-page/vehicles | 
[**deleteUserAdvertisement**](UserPageControllerApi.md#deleteUserAdvertisement) | **DELETE** /user-page/advertisements/{id} | 
[**deleteUserVehicle**](UserPageControllerApi.md#deleteUserVehicle) | **DELETE** /user-page/vehicles/{id} | 
[**deleteVehiclePhoto**](UserPageControllerApi.md#deleteVehiclePhoto) | **DELETE** /user-page/photos/{photoId} | 
[**getAllUserPhotos**](UserPageControllerApi.md#getAllUserPhotos) | **GET** /user-page/photos | 
[**getFavorites1**](UserPageControllerApi.md#getFavorites1) | **GET** /user-page/favorites | 
[**getUserAdvertisementById**](UserPageControllerApi.md#getUserAdvertisementById) | **GET** /user-page/advertisements/{id} | 
[**getUserAdvertisements**](UserPageControllerApi.md#getUserAdvertisements) | **GET** /user-page/advertisements | 
[**getUserDashboard**](UserPageControllerApi.md#getUserDashboard) | **GET** /user-page/dashboard | 
[**getUserVehicleById**](UserPageControllerApi.md#getUserVehicleById) | **GET** /user-page/vehicles/{id} | 
[**getUserVehicles**](UserPageControllerApi.md#getUserVehicles) | **GET** /user-page/vehicles | 
[**getVehiclePhotos**](UserPageControllerApi.md#getVehiclePhotos) | **GET** /user-page/vehicles/{vehicleId}/photos | 
[**removeFromFavorites1**](UserPageControllerApi.md#removeFromFavorites1) | **DELETE** /user-page/favorites/{advertisementId} | 
[**updateUserAdvertisement**](UserPageControllerApi.md#updateUserAdvertisement) | **PUT** /user-page/advertisements/{id} | 
[**updateUserVehicle**](UserPageControllerApi.md#updateUserVehicle) | **PUT** /user-page/vehicles/{id} | 
[**uploadPhotoToVehicle**](UserPageControllerApi.md#uploadPhotoToVehicle) | **POST** /user-page/vehicles/{vehicleId}/photos | 



## addToFavorites1

> String addToFavorites1(advertisementId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let advertisementId = 789; // Number | 
apiInstance.addToFavorites1(advertisementId, (error, data, response) => {
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
 **advertisementId** | **Number**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## createUserAdvertisement

> AdvertisementDto createUserAdvertisement(advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.createUserAdvertisement(advertisementDto, (error, data, response) => {
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


## createUserVehicle

> VehicleDto createUserVehicle(vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.createUserVehicle(vehicleDto, (error, data, response) => {
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


## deleteUserAdvertisement

> deleteUserAdvertisement(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
apiInstance.deleteUserAdvertisement(id, (error, data, response) => {
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


## deleteUserVehicle

> deleteUserVehicle(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
apiInstance.deleteUserVehicle(id, (error, data, response) => {
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


## deleteVehiclePhoto

> deleteVehiclePhoto(photoId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let photoId = 789; // Number | 
apiInstance.deleteVehiclePhoto(photoId, (error, data, response) => {
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
 **photoId** | **Number**|  | 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: Not defined


## getAllUserPhotos

> [VehiclePhotoDto] getAllUserPhotos()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
apiInstance.getAllUserPhotos((error, data, response) => {
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


## getFavorites1

> [Number] getFavorites1()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
apiInstance.getFavorites1((error, data, response) => {
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

**[Number]**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUserAdvertisementById

> AdvertisementDto getUserAdvertisementById(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
apiInstance.getUserAdvertisementById(id, (error, data, response) => {
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


## getUserAdvertisements

> PageAdvertisementDto getUserAdvertisements(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let opts = {
  'page': 0, // Number | 
  'size': 50 // Number | 
};
apiInstance.getUserAdvertisements(opts, (error, data, response) => {
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
 **page** | **Number**|  | [optional] [default to 0]
 **size** | **Number**|  | [optional] [default to 50]

### Return type

[**PageAdvertisementDto**](PageAdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUserDashboard

> UserPageDto getUserDashboard()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
apiInstance.getUserDashboard((error, data, response) => {
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

[**UserPageDto**](UserPageDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getUserVehicleById

> VehicleDto getUserVehicleById(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
apiInstance.getUserVehicleById(id, (error, data, response) => {
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


## getUserVehicles

> [VehicleDto] getUserVehicles()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
apiInstance.getUserVehicles((error, data, response) => {
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


## getVehiclePhotos

> [VehiclePhotoDto] getVehiclePhotos(vehicleId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let vehicleId = 789; // Number | 
apiInstance.getVehiclePhotos(vehicleId, (error, data, response) => {
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

### Return type

[**[VehiclePhotoDto]**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## removeFromFavorites1

> String removeFromFavorites1(advertisementId)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let advertisementId = 789; // Number | 
apiInstance.removeFromFavorites1(advertisementId, (error, data, response) => {
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
 **advertisementId** | **Number**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateUserAdvertisement

> AdvertisementDto updateUserAdvertisement(id, advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.updateUserAdvertisement(id, advertisementDto, (error, data, response) => {
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


## updateUserVehicle

> VehicleDto updateUserVehicle(id, vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let id = 789; // Number | 
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.updateUserVehicle(id, vehicleDto, (error, data, response) => {
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


## uploadPhotoToVehicle

> VehiclePhotoDto uploadPhotoToVehicle(vehicleId, opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.UserPageControllerApi();
let vehicleId = 789; // Number | 
let opts = {
  'isMain': false, // Boolean | 
  'addPhotoToVehicleRequest': new OpenApiDefinition.AddPhotoToVehicleRequest() // AddPhotoToVehicleRequest | 
};
apiInstance.uploadPhotoToVehicle(vehicleId, opts, (error, data, response) => {
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
 **isMain** | **Boolean**|  | [optional] [default to false]
 **addPhotoToVehicleRequest** | [**AddPhotoToVehicleRequest**](AddPhotoToVehicleRequest.md)|  | [optional] 

### Return type

[**VehiclePhotoDto**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

