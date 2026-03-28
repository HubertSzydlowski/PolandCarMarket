

# User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Long** |  |  [optional]
**advertisements** | [**List&lt;Advertisement&gt;**](Advertisement.md) |  |  [optional]
**username** | **String** |  |  [optional]
**email** | **String** |  |  [optional]
**password** | **String** |  |  [optional]
**role** | [**RoleEnum**](#RoleEnum) |  |  [optional]
**enabled** | **Boolean** |  |  [optional]
**favorites** | **List&lt;Long&gt;** |  |  [optional]
**authorities** | [**List&lt;GrantedAuthority&gt;**](GrantedAuthority.md) |  |  [optional]
**accountNonExpired** | **Boolean** |  |  [optional]
**accountNonLocked** | **Boolean** |  |  [optional]
**credentialsNonExpired** | **Boolean** |  |  [optional]



## Enum: RoleEnum

Name | Value
---- | -----
ADMIN | &quot;ADMIN&quot;
USER | &quot;USER&quot;
GUEST | &quot;GUEST&quot;



