

# VehicleDto

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Long** |  |  [optional]
**brand** | **String** |  | 
**model** | **String** |  | 
**year** | **Integer** |  | 
**price** | **Double** |  | 
**fuelType** | [**FuelTypeEnum**](#FuelTypeEnum) |  | 
**transmission** | [**TransmissionEnum**](#TransmissionEnum) |  | 
**color** | **String** |  | 
**mileage** | **Integer** |  |  [optional]
**power** | **Integer** |  |  [optional]
**seats** | **Integer** |  |  [optional]
**description** | **String** |  |  [optional]
**vin** | **String** |  | 
**condition** | [**ConditionEnum**](#ConditionEnum) |  | 
**hasWarranty** | **Boolean** |  | 
**advertisementId** | **Long** |  | 



## Enum: FuelTypeEnum

Name | Value
---- | -----
PETROL | &quot;PETROL&quot;
DIESEL | &quot;DIESEL&quot;
LPG | &quot;LPG&quot;
ELECTRIC | &quot;ELECTRIC&quot;
HYBRID | &quot;HYBRID&quot;



## Enum: TransmissionEnum

Name | Value
---- | -----
MANUAL | &quot;MANUAL&quot;
AUTOMATIC | &quot;AUTOMATIC&quot;



## Enum: ConditionEnum

Name | Value
---- | -----
NEW | &quot;NEW&quot;
USED | &quot;USED&quot;
DAMAGED | &quot;DAMAGED&quot;



