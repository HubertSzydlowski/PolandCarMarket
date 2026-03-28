# UserPageControllerApi

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


<a name="addToFavorites1"></a>
# **addToFavorites1**
> String addToFavorites1(advertisementId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long advertisementId = 56L; // Long | 
    try {
      String result = apiInstance.addToFavorites1(advertisementId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#addToFavorites1");
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
 **advertisementId** | **Long**|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="createUserAdvertisement"></a>
# **createUserAdvertisement**
> AdvertisementDto createUserAdvertisement(advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      AdvertisementDto result = apiInstance.createUserAdvertisement(advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#createUserAdvertisement");
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

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="createUserVehicle"></a>
# **createUserVehicle**
> VehicleDto createUserVehicle(vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.createUserVehicle(vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#createUserVehicle");
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

<a name="deleteUserAdvertisement"></a>
# **deleteUserAdvertisement**
> deleteUserAdvertisement(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteUserAdvertisement(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#deleteUserAdvertisement");
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

<a name="deleteUserVehicle"></a>
# **deleteUserVehicle**
> deleteUserVehicle(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteUserVehicle(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#deleteUserVehicle");
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

<a name="deleteVehiclePhoto"></a>
# **deleteVehiclePhoto**
> deleteVehiclePhoto(photoId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long photoId = 56L; // Long | 
    try {
      apiInstance.deleteVehiclePhoto(photoId);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#deleteVehiclePhoto");
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
 **photoId** | **Long**|  |

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

<a name="getAllUserPhotos"></a>
# **getAllUserPhotos**
> List&lt;VehiclePhotoDto&gt; getAllUserPhotos()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    try {
      List<VehiclePhotoDto> result = apiInstance.getAllUserPhotos();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getAllUserPhotos");
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

<a name="getFavorites1"></a>
# **getFavorites1**
> List&lt;Long&gt; getFavorites1()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    try {
      List<Long> result = apiInstance.getFavorites1();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getFavorites1");
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

**List&lt;Long&gt;**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getUserAdvertisementById"></a>
# **getUserAdvertisementById**
> AdvertisementDto getUserAdvertisementById(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      AdvertisementDto result = apiInstance.getUserAdvertisementById(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getUserAdvertisementById");
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

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getUserAdvertisements"></a>
# **getUserAdvertisements**
> PageAdvertisementDto getUserAdvertisements(page, size)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Integer page = 0; // Integer | 
    Integer size = 50; // Integer | 
    try {
      PageAdvertisementDto result = apiInstance.getUserAdvertisements(page, size);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getUserAdvertisements");
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
 **page** | **Integer**|  | [optional] [default to 0]
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

<a name="getUserDashboard"></a>
# **getUserDashboard**
> UserPageDto getUserDashboard()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    try {
      UserPageDto result = apiInstance.getUserDashboard();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getUserDashboard");
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

[**UserPageDto**](UserPageDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getUserVehicleById"></a>
# **getUserVehicleById**
> VehicleDto getUserVehicleById(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      VehicleDto result = apiInstance.getUserVehicleById(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getUserVehicleById");
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

<a name="getUserVehicles"></a>
# **getUserVehicles**
> List&lt;VehicleDto&gt; getUserVehicles()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    try {
      List<VehicleDto> result = apiInstance.getUserVehicles();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getUserVehicles");
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

<a name="getVehiclePhotos"></a>
# **getVehiclePhotos**
> List&lt;VehiclePhotoDto&gt; getVehiclePhotos(vehicleId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long vehicleId = 56L; // Long | 
    try {
      List<VehiclePhotoDto> result = apiInstance.getVehiclePhotos(vehicleId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#getVehiclePhotos");
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

<a name="removeFromFavorites1"></a>
# **removeFromFavorites1**
> String removeFromFavorites1(advertisementId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long advertisementId = 56L; // Long | 
    try {
      String result = apiInstance.removeFromFavorites1(advertisementId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#removeFromFavorites1");
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
 **advertisementId** | **Long**|  |

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="updateUserAdvertisement"></a>
# **updateUserAdvertisement**
> AdvertisementDto updateUserAdvertisement(id, advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      AdvertisementDto result = apiInstance.updateUserAdvertisement(id, advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#updateUserAdvertisement");
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

[**AdvertisementDto**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="updateUserVehicle"></a>
# **updateUserVehicle**
> VehicleDto updateUserVehicle(id, vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.updateUserVehicle(id, vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#updateUserVehicle");
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

<a name="uploadPhotoToVehicle"></a>
# **uploadPhotoToVehicle**
> VehiclePhotoDto uploadPhotoToVehicle(vehicleId, isMain, inlineObject1)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.UserPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    UserPageControllerApi apiInstance = new UserPageControllerApi(defaultClient);
    Long vehicleId = 56L; // Long | 
    Boolean isMain = false; // Boolean | 
    InlineObject1 inlineObject1 = new InlineObject1(); // InlineObject1 | 
    try {
      VehiclePhotoDto result = apiInstance.uploadPhotoToVehicle(vehicleId, isMain, inlineObject1);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling UserPageControllerApi#uploadPhotoToVehicle");
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
 **isMain** | **Boolean**|  | [optional] [default to false]
 **inlineObject1** | [**InlineObject1**](InlineObject1.md)|  | [optional]

### Return type

[**VehiclePhotoDto**](VehiclePhotoDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

