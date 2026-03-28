# OpenApiDefinition.AdvertisementControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAdvertisement**](AdvertisementControllerApi.md#createAdvertisement) | **POST** /advertisements | 
[**deleteAdvertisement**](AdvertisementControllerApi.md#deleteAdvertisement) | **DELETE** /advertisements/{id} | 
[**getAdvertisementById**](AdvertisementControllerApi.md#getAdvertisementById) | **GET** /advertisements/{id} | 
[**getAdvertisements**](AdvertisementControllerApi.md#getAdvertisements) | **GET** /advertisements | 
[**updateAdvertisement**](AdvertisementControllerApi.md#updateAdvertisement) | **PUT** /advertisements/{id} | 



## createAdvertisement

> Advertisement createAdvertisement(advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdvertisementControllerApi();
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.createAdvertisement(advertisementDto, (error, data, response) => {
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

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## deleteAdvertisement

> deleteAdvertisement(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdvertisementControllerApi();
let id = 789; // Number | 
apiInstance.deleteAdvertisement(id, (error, data, response) => {
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


## getAdvertisementById

> Advertisement getAdvertisementById(id)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdvertisementControllerApi();
let id = 789; // Number | 
apiInstance.getAdvertisementById(id, (error, data, response) => {
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

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## getAdvertisements

> PageAdvertisementDto getAdvertisements(page, opts)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdvertisementControllerApi();
let page = 56; // Number | 
let opts = {
  'size': 50 // Number | 
};
apiInstance.getAdvertisements(page, opts, (error, data, response) => {
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
 **page** | **Number**|  | 
 **size** | **Number**|  | [optional] [default to 50]

### Return type

[**PageAdvertisementDto**](PageAdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*


## updateAdvertisement

> Advertisement updateAdvertisement(id, advertisementDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.AdvertisementControllerApi();
let id = 789; // Number | 
let advertisementDto = new OpenApiDefinition.AdvertisementDto(); // AdvertisementDto | 
apiInstance.updateAdvertisement(id, advertisementDto, (error, data, response) => {
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

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*

