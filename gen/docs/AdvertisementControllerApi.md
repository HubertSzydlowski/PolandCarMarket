# AdvertisementControllerApi

All URIs are relative to *http://localhost:8080*

Method | HTTP request | Description
------------- | ------------- | -------------
[**createAdvertisement**](AdvertisementControllerApi.md#createAdvertisement) | **POST** /advertisements | 
[**deleteAdvertisement**](AdvertisementControllerApi.md#deleteAdvertisement) | **DELETE** /advertisements/{id} | 
[**getAdvertisementById**](AdvertisementControllerApi.md#getAdvertisementById) | **GET** /advertisements/{id} | 
[**getAdvertisements**](AdvertisementControllerApi.md#getAdvertisements) | **GET** /advertisements | 
[**updateAdvertisement**](AdvertisementControllerApi.md#updateAdvertisement) | **PUT** /advertisements/{id} | 


<a name="createAdvertisement"></a>
# **createAdvertisement**
> Advertisement createAdvertisement(advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdvertisementControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdvertisementControllerApi apiInstance = new AdvertisementControllerApi(defaultClient);
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      Advertisement result = apiInstance.createAdvertisement(advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdvertisementControllerApi#createAdvertisement");
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
 **advertisementDto** | [**AdvertisementDto**](AdvertisementDto.md)|  |

### Return type

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="deleteAdvertisement"></a>
# **deleteAdvertisement**
> deleteAdvertisement(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdvertisementControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdvertisementControllerApi apiInstance = new AdvertisementControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteAdvertisement(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdvertisementControllerApi#deleteAdvertisement");
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

<a name="getAdvertisementById"></a>
# **getAdvertisementById**
> Advertisement getAdvertisementById(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdvertisementControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdvertisementControllerApi apiInstance = new AdvertisementControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      Advertisement result = apiInstance.getAdvertisementById(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdvertisementControllerApi#getAdvertisementById");
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

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getAdvertisements"></a>
# **getAdvertisements**
> PageAdvertisementDto getAdvertisements(page, size)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdvertisementControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdvertisementControllerApi apiInstance = new AdvertisementControllerApi(defaultClient);
    Integer page = 56; // Integer | 
    Integer size = 50; // Integer | 
    try {
      PageAdvertisementDto result = apiInstance.getAdvertisements(page, size);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdvertisementControllerApi#getAdvertisements");
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
 **page** | **Integer**|  |
 **size** | **Integer**|  | [optional] [default to 50]

### Return type

[**PageAdvertisementDto**](PageAdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="updateAdvertisement"></a>
# **updateAdvertisement**
> Advertisement updateAdvertisement(id, advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdvertisementControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdvertisementControllerApi apiInstance = new AdvertisementControllerApi(defaultClient);
    Long id = 56L; // Long | 
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      Advertisement result = apiInstance.updateAdvertisement(id, advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdvertisementControllerApi#updateAdvertisement");
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
 **advertisementDto** | [**AdvertisementDto**](AdvertisementDto.md)|  |

### Return type

[**Advertisement**](Advertisement.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

