

# Vehicle

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **Long** |  |  [optional]
**brand** | **String** |  |  [optional]
**model** | **String** |  |  [optional]
**year** | **Integer** |  |  [optional]
**price** | **Double** |  |  [optional]
**fuelType** | [**FuelTypeEnum**](#FuelTypeEnum) |  |  [optional]
**transmission** | [**TransmissionEnum**](#TransmissionEnum) |  |  [optional]
**color** | **String** |  |  [optional]
**mileage** | **Integer** |  |  [optional]
**power** | **Integer** |  |  [optional]
**seats** | **Integer** |  |  [optional]
**description** | **String** |  |  [optional]
**vin** | **String** |  |  [optional]
**condition** | [**ConditionEnum**](#ConditionEnum) |  |  [optional]
**hasWarranty** | **Boolean** |  |  [optional]
**advertisement** | [**Advertisement**](Advertisement.md) |  |  [optional]



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



