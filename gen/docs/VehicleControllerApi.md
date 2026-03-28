# VehicleControllerApi

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


<a name="createVehicle"></a>
# **createVehicle**
> VehicleDto createVehicle(vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.createVehicle(vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#createVehicle");
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
 **vehicleDto** | [**VehicleDto**](VehicleDto.md)|  |

### Return type

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="deleteVehicle"></a>
# **deleteVehicle**
> deleteVehicle(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteVehicle(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#deleteVehicle");
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

<a name="getFilteredVehicles"></a>
# **getFilteredVehicles**
> List&lt;VehicleDto&gt; getFilteredVehicles(brand, model, year, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    String brand = "brand_example"; // String | 
    String model = "model_example"; // String | 
    Integer year = 56; // Integer | 
    Double minPrice = 3.4D; // Double | 
    Double maxPrice = 3.4D; // Double | 
    Integer minMileage = 56; // Integer | 
    Integer maxMileage = 56; // Integer | 
    String fuelType = "fuelType_example"; // String | 
    String transmission = "transmission_example"; // String | 
    try {
      List<VehicleDto> result = apiInstance.getFilteredVehicles(brand, model, year, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#getFilteredVehicles");
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
 **brand** | **String**|  | [optional]
 **model** | **String**|  | [optional]
 **year** | **Integer**|  | [optional]
 **minPrice** | **Double**|  | [optional]
 **maxPrice** | **Double**|  | [optional]
 **minMileage** | **Integer**|  | [optional]
 **maxMileage** | **Integer**|  | [optional]
 **fuelType** | **String**|  | [optional]
 **transmission** | **String**|  | [optional]

### Return type

[**List&lt;VehicleDto&gt;**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getSortedVehicles"></a>
# **getSortedVehicles**
> List&lt;VehicleDto&gt; getSortedVehicles(sortBy, order)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    String sortBy = "sortBy_example"; // String | 
    String order = "order_example"; // String | 
    try {
      List<VehicleDto> result = apiInstance.getSortedVehicles(sortBy, order);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#getSortedVehicles");
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
 **sortBy** | **String**|  |
 **order** | **String**|  |

### Return type

[**List&lt;VehicleDto&gt;**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getVehicleById"></a>
# **getVehicleById**
> VehicleDto getVehicleById(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      VehicleDto result = apiInstance.getVehicleById(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#getVehicleById");
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

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getVehicles"></a>
# **getVehicles**
> List&lt;VehicleDto&gt; getVehicles()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    try {
      List<VehicleDto> result = apiInstance.getVehicles();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#getVehicles");
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

[**List&lt;VehicleDto&gt;**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="updateVehicle"></a>
# **updateVehicle**
> VehicleDto updateVehicle(id, vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.VehicleControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    VehicleControllerApi apiInstance = new VehicleControllerApi(defaultClient);
    Long id = 56L; // Long | 
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.updateVehicle(id, vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling VehicleControllerApi#updateVehicle");
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
 **vehicleDto** | [**VehicleDto**](VehicleDto.md)|  |

### Return type

[**VehicleDto**](VehicleDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

