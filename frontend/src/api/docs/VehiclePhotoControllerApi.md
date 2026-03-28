# OpenApiDefinition.VehiclePhotoControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addPhotoToVehicle**](VehiclePhotoControllerApi.md#addPhotoToVehicle) | **POST** /vehicle-photos | 
[**deletePhoto**](VehiclePhotoControllerApi.md#deletePhoto) | **DELETE** /vehicle-photos/{id} | 
[**getAllPhotos**](VehiclePhotoControllerApi.md#getAllPhotos) | **GET** /vehicle-photos | 
[**getPhotoById**](VehiclePhotoControllerApi.md#getPhotoById) | **GET** /vehicle-photos/{id} | 



## addPhotoToVehicle

> VehiclePhoto addPhotoToVehicle(vehicleId, isMain, username, opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehiclePhotoControllerApi();
let vehicleId = 789; // Number | 
let isMain = true; // Boolean | 
let username = "username_example"; // String | 
let opts = {
  'addPhotoToVehicleRequest': new OpenApiDefinition.AddPhotoToVehicleRequest() // AddPhotoToVehicleRequest | 
};
apiInstance.addPhotoToVehicle(vehicleId, isMain, username, opts, (error, data, response) => {
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
 **username** | **String**|  | 
 **addPhotoToVehicleRequest** | [**AddPhotoToVehicleRequest**](AddPhotoToVehicleRequest.md)|  | [optional] 

### Return type

[**VehiclePhoto**](VehiclePhoto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deletePhoto

> deletePhoto(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehiclePhotoControllerApi();
let id = 789; // Number | 
apiInstance.deletePhoto(id, (error, data, response) => {
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


## getAllPhotos

> [VehiclePhotoDto] getAllPhotos()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehiclePhotoControllerApi();
apiInstance.getAllPhotos((error, data, response) => {
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


## getPhotoById

> VehiclePhotoDto getPhotoById(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehiclePhotoControllerApi();
let id = 789; // Number | 
apiInstance.getPhotoById(id, (error, data, response) => {
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

