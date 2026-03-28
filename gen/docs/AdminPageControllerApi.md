# AdminPageControllerApi

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


<a name="addPhotoToVehicle1"></a>
# **addPhotoToVehicle1**
> VehiclePhotoDto addPhotoToVehicle1(vehicleId, isMain, inlineObject2)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long vehicleId = 56L; // Long | 
    Boolean isMain = true; // Boolean | 
    InlineObject2 inlineObject2 = new InlineObject2(); // InlineObject2 | 
    try {
      VehiclePhotoDto result = apiInstance.addPhotoToVehicle1(vehicleId, isMain, inlineObject2);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#addPhotoToVehicle1");
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
 **inlineObject2** | [**InlineObject2**](InlineObject2.md)|  | [optional]

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

<a name="addToFavorites2"></a>
# **addToFavorites2**
> String addToFavorites2(userId, advertisementId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long userId = 56L; // Long | 
    Long advertisementId = 56L; // Long | 
    try {
      String result = apiInstance.addToFavorites2(userId, advertisementId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#addToFavorites2");
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
 **userId** | **Long**|  |
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

<a name="createAdvertisement1"></a>
# **createAdvertisement1**
> AdvertisementDto createAdvertisement1(advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      AdvertisementDto result = apiInstance.createAdvertisement1(advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#createAdvertisement1");
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

<a name="createUser1"></a>
# **createUser1**
> UserDto createUser1(userDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    UserDto userDto = new UserDto(); // UserDto | 
    try {
      UserDto result = apiInstance.createUser1(userDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#createUser1");
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
 **userDto** | [**UserDto**](UserDto.md)|  |

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="createVehicle1"></a>
# **createVehicle1**
> VehicleDto createVehicle1(vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.createVehicle1(vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#createVehicle1");
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

<a name="deleteAdvertisement1"></a>
# **deleteAdvertisement1**
> deleteAdvertisement1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteAdvertisement1(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#deleteAdvertisement1");
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

<a name="deletePhoto1"></a>
# **deletePhoto1**
> deletePhoto1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deletePhoto1(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#deletePhoto1");
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

<a name="deleteUser1"></a>
# **deleteUser1**
> deleteUser1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteUser1(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#deleteUser1");
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

<a name="deleteVehicle1"></a>
# **deleteVehicle1**
> deleteVehicle1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      apiInstance.deleteVehicle1(id);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#deleteVehicle1");
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

<a name="getAdvertisementById1"></a>
# **getAdvertisementById1**
> AdvertisementDto getAdvertisementById1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      AdvertisementDto result = apiInstance.getAdvertisementById1(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAdvertisementById1");
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

<a name="getAdvertisementsByUser"></a>
# **getAdvertisementsByUser**
> List&lt;AdvertisementDto&gt; getAdvertisementsByUser(userId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long userId = 56L; // Long | 
    try {
      List<AdvertisementDto> result = apiInstance.getAdvertisementsByUser(userId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAdvertisementsByUser");
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
 **userId** | **Long**|  |

### Return type

[**List&lt;AdvertisementDto&gt;**](AdvertisementDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getAllAdvertisements"></a>
# **getAllAdvertisements**
> PageAdvertisementDto getAllAdvertisements(pageable)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Pageable pageable = new Pageable(); // Pageable | 
    try {
      PageAdvertisementDto result = apiInstance.getAllAdvertisements(pageable);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAllAdvertisements");
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
 **pageable** | [**Pageable**](.md)|  |

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

<a name="getAllPhotos1"></a>
# **getAllPhotos1**
> List&lt;VehiclePhotoDto&gt; getAllPhotos1()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    try {
      List<VehiclePhotoDto> result = apiInstance.getAllPhotos1();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAllPhotos1");
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

<a name="getAllUsers1"></a>
# **getAllUsers1**
> List&lt;UserDto&gt; getAllUsers1()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    try {
      List<UserDto> result = apiInstance.getAllUsers1();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAllUsers1");
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

[**List&lt;UserDto&gt;**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getAllVehicles"></a>
# **getAllVehicles**
> List&lt;VehicleDto&gt; getAllVehicles()



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    try {
      List<VehicleDto> result = apiInstance.getAllVehicles();
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getAllVehicles");
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

<a name="getDashboard"></a>
# **getDashboard**
> AdminPageDto getDashboard(start, end)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    String start = "start_example"; // String | 
    String end = "end_example"; // String | 
    try {
      AdminPageDto result = apiInstance.getDashboard(start, end);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getDashboard");
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
 **start** | **String**|  | [optional]
 **end** | **String**|  | [optional]

### Return type

[**AdminPageDto**](AdminPageDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getFavorites2"></a>
# **getFavorites2**
> List&lt;Long&gt; getFavorites2(userId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long userId = 56L; // Long | 
    try {
      List<Long> result = apiInstance.getFavorites2(userId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getFavorites2");
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
 **userId** | **Long**|  |

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

<a name="getFilteredVehicles1"></a>
# **getFilteredVehicles1**
> List&lt;VehicleDto&gt; getFilteredVehicles1(brand, model, year, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
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
      List<VehicleDto> result = apiInstance.getFilteredVehicles1(brand, model, year, minPrice, maxPrice, minMileage, maxMileage, fuelType, transmission);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getFilteredVehicles1");
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

<a name="getPhotoById1"></a>
# **getPhotoById1**
> VehiclePhotoDto getPhotoById1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      VehiclePhotoDto result = apiInstance.getPhotoById1(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getPhotoById1");
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

<a name="getSortedVehicles1"></a>
# **getSortedVehicles1**
> List&lt;VehicleDto&gt; getSortedVehicles1(sortBy, order)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    String sortBy = "sortBy_example"; // String | 
    String order = "order_example"; // String | 
    try {
      List<VehicleDto> result = apiInstance.getSortedVehicles1(sortBy, order);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getSortedVehicles1");
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

<a name="getUserById1"></a>
# **getUserById1**
> UserDto getUserById1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      UserDto result = apiInstance.getUserById1(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getUserById1");
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

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="getVehicleById1"></a>
# **getVehicleById1**
> VehicleDto getVehicleById1(id)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    try {
      VehicleDto result = apiInstance.getVehicleById1(id);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getVehicleById1");
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

<a name="getVehiclesByUser"></a>
# **getVehiclesByUser**
> List&lt;VehicleDto&gt; getVehiclesByUser(userId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long userId = 56L; // Long | 
    try {
      List<VehicleDto> result = apiInstance.getVehiclesByUser(userId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#getVehiclesByUser");
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
 **userId** | **Long**|  |

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

<a name="removeFromFavorites2"></a>
# **removeFromFavorites2**
> String removeFromFavorites2(userId, advertisementId)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long userId = 56L; // Long | 
    Long advertisementId = 56L; // Long | 
    try {
      String result = apiInstance.removeFromFavorites2(userId, advertisementId);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#removeFromFavorites2");
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
 **userId** | **Long**|  |
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

<a name="updateAdvertisement1"></a>
# **updateAdvertisement1**
> AdvertisementDto updateAdvertisement1(id, advertisementDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    AdvertisementDto advertisementDto = new AdvertisementDto(); // AdvertisementDto | 
    try {
      AdvertisementDto result = apiInstance.updateAdvertisement1(id, advertisementDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#updateAdvertisement1");
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

<a name="updateUser1"></a>
# **updateUser1**
> UserDto updateUser1(id, userDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    UserDto userDto = new UserDto(); // UserDto | 
    try {
      UserDto result = apiInstance.updateUser1(id, userDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#updateUser1");
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
 **userDto** | [**UserDto**](UserDto.md)|  |

### Return type

[**UserDto**](UserDto.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: */*

### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
**200** | OK |  -  |

<a name="updateVehicle1"></a>
# **updateVehicle1**
> VehicleDto updateVehicle1(id, vehicleDto)



### Example
```java
// Import classes:
import org.openapitools.client.ApiClient;
import org.openapitools.client.ApiException;
import org.openapitools.client.Configuration;
import org.openapitools.client.models.*;
import org.openapitools.client.api.AdminPageControllerApi;

public class Example {
  public static void main(String[] args) {
    ApiClient defaultClient = Configuration.getDefaultApiClient();
    defaultClient.setBasePath("http://localhost:8080");

    AdminPageControllerApi apiInstance = new AdminPageControllerApi(defaultClient);
    Long id = 56L; // Long | 
    VehicleDto vehicleDto = new VehicleDto(); // VehicleDto | 
    try {
      VehicleDto result = apiInstance.updateVehicle1(id, vehicleDto);
      System.out.println(result);
    } catch (ApiException e) {
      System.err.println("Exception when calling AdminPageControllerApi#updateVehicle1");
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

