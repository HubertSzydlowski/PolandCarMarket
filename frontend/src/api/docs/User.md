# OpenApiDefinition.User

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Number** |  | [optional] 
**advertisements** | [**[Advertisement]**](Advertisement.md) |  | [optional] 
**username** | **String** |  | [optional] 
**email** | **String** |  | [optional] 
**password** | **String** |  | [optional] 
**role** | **String** |  | [optional] 
**enabled** | **Boolean** |  | [optional] 
**favorites** | **[Number]** |  | [optional] 
**authorities** | [**[GrantedAuthority]**](GrantedAuthority.md) |  | [optional] 
**accountNonExpired** | **Boolean** |  | [optional] 
**accountNonLocked** | **Boolean** |  | [optional] 
**credentialsNonExpired** | **Boolean** |  | [optional] 



## Enum: RoleEnum


* `ADMIN` (value: `"ADMIN"`)

* `USER` (value: `"USER"`)

* `GUEST` (value: `"GUEST"`)




