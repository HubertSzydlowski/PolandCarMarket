# OpenApiDefinition.EmailControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**resetPassword**](EmailControllerApi.md#resetPassword) | **POST** /api/email/reset-password | 
[**resetPasswordRequest**](EmailControllerApi.md#resetPasswordRequest) | **POST** /api/email/reset-password-request | 
[**verifyEmail**](EmailControllerApi.md#verifyEmail) | **GET** /api/email/verify | 



## resetPassword

> String resetPassword(emailDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.EmailControllerApi();
let emailDto = new OpenApiDefinition.EmailDto(); // EmailDto | 
apiInstance.resetPassword(emailDto, (error, data, response) => {
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
 **emailDto** | [**EmailDto**](EmailDto.md)|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## resetPasswordRequest

> String resetPasswordRequest(emailDto)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.EmailControllerApi();
let emailDto = new OpenApiDefinition.EmailDto(); // EmailDto | 
apiInstance.resetPasswordRequest(emailDto, (error, data, response) => {
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
 **emailDto** | [**EmailDto**](EmailDto.md)|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: */*


## verifyEmail

> String verifyEmail(token)



### Example

```javascript
import OpenApiDefinition from 'open_api_definition';

let apiInstance = new OpenApiDefinition.EmailControllerApi();
let token = "token_example"; // String | 
apiInstance.verifyEmail(token, (error, data, response) => {
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
 **token** | **String**|  | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: */*

