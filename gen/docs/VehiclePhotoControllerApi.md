# VehiclePhotoControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**addPhotoToVehicle**](VehiclePhotoControllerApi.md#addPhotoToVehicle) | **POST** /vehicle-photos | 
[**deletePhoto**](VehiclePhotoControllerApi.md#deletePhoto) | **DELETE** /vehicle-photos/{id} | 
[**getAllPhotos**](VehiclePhotoControllerApi.md#getAllPhotos) | **GET** /vehicle-photos | 
[**getPhotoById**](VehiclePhotoControllerApi.md#getPhotoById) | **GET** /vehicle-photos/{id} | 


<a name="addPhotoToVehicle"></a>
# **addPhotoToVehicle**
> VehiclePhoto addPhotoToVehicle(vehicleId, isMain, username, inlineObject)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehiclePhotoControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehiclePhotoControllerApi apiInstance = new VehiclePhotoControllerApi(defaultClient);
    Long vehicleId = 56L; // Long | 
    Boolean isMain = true; // Boolean | 
    String username = "username_example"; // String | 
    InlineObject inlineObject = new InlineObject(); // InlineObject | 
    try {
      VehiclePhoto result = apiInstance.addPhotoToVehicle(vehicleId, isMain, username, inlineObject);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehiclePhotoControllerApi#addPhotoToVehicle");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **vehicleId** | **Long**|  |
 **isMain** | **Boolean**|  |
 **username** | **String**|  |
 **inlineObject** | [**InlineObject**](InlineObject.md)|  | [optional]

### Return type

[**VehiclePhoto**](VehiclePhoto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="deletePhoto"></a>
# **deletePhoto**
> deletePhoto(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehiclePhotoControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehiclePhotoControllerApi apiInstance = new VehiclePhotoControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deletePhoto(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehiclePhotoControllerApi#deletePhoto");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**|  |

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getAllPhotos"></a>
# **getAllPhotos**
> List&lt;VehiclePhotoDto&gt; getAllPhotos()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehiclePhotoControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehiclePhotoControllerApi apiInstance = new VehiclePhotoControllerApi(defaultClient);
    try {
      List<VehiclePhotoDto> result = apiInstance.getAllPhotos();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehiclePhotoControllerApi#getAllPhotos");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**List&lt;VehiclePhotoDto&gt;**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getPhotoById"></a>
# **getPhotoById**
> VehiclePhotoDto getPhotoById(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehiclePhotoControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehiclePhotoControllerApi apiInstance = new VehiclePhotoControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      VehiclePhotoDto result = apiInstance.getPhotoById(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehiclePhotoControllerApi#getPhotoById");
      System.err.println("Status code: " + e.getCode());
      System.err.println("Reason: " + e.getResponseBody());
      System.err.println("Response headers: " + e.getResponseHeaders());
      e.printStackTrace();
    }
  }
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **Long**|  |

### Return type

[**VehiclePhotoDto**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

