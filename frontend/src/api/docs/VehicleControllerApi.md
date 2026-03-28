# OpenApiDefinition.VehicleControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createVehicle**](VehicleControllerApi.md#createVehicle) | **POST** /vehicles | 
[**deleteVehicle**](VehicleControllerApi.md#deleteVehicle) | **DELETE** /vehicles/{id} | 
[**getFilteredVehicles**](VehicleControllerApi.md#getFilteredVehicles) | **GET** /vehicles/filter | 
[**getSortedVehicles**](VehicleControllerApi.md#getSortedVehicles) | **GET** /vehicles/sorted | 
[**getVehicleById**](VehicleControllerApi.md#getVehicleById) | **GET** /vehicles/{id} | 
[**getVehicles**](VehicleControllerApi.md#getVehicles) | **GET** /vehicles | 
[**updateVehicle**](VehicleControllerApi.md#updateVehicle) | **PUT** /vehicles/{id} | 



## createVehicle

> VehicleDto createVehicle(vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.createVehicle(vehicleDto, (error, data, response) => {
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


## deleteVehicle

> deleteVehicle(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
let id = 789; // Number | 
apiInstance.deleteVehicle(id, (error, data, response) => {
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


## getFilteredVehicles

> [VehicleDto] getFilteredVehicles(opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
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
apiInstance.getFilteredVehicles(opts, (error, data, response) => {
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


## getSortedVehicles

> [VehicleDto] getSortedVehicles(sortBy, order)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
let sortBy = "sortBy_example"; // String | 
let order = "order_example"; // String | 
apiInstance.getSortedVehicles(sortBy, order, (error, data, response) => {
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


## getVehicleById

> VehicleDto getVehicleById(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
let id = 789; // Number | 
apiInstance.getVehicleById(id, (error, data, response) => {
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


## getVehicles

> [VehicleDto] getVehicles()



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
apiInstance.getVehicles((error, data, response) => {
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


## updateVehicle

> VehicleDto updateVehicle(id, vehicleDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.VehicleControllerApi();
let id = 789; // Number | 
let vehicleDto = new OpenApiDefinition.VehicleDto(); // VehicleDto | 
apiInstance.updateVehicle(id, vehicleDto, (error, data, response) => {
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

