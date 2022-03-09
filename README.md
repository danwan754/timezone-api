# timezone-api

Get timezone and time offsets for a given lat/lng coordinates. Data is obtained from Google Timezone API.

\
API is live at:
https://rapidapi.com/NovusAPI/api/timezone-by-coordinates

\
Request query parameters:
|Parameter||Description|Example|
|-|-|-|-|
|**lat**|*required*|Latitude|49.282409|
|**lng**|*required*|Longitude|-123.045868|
|**timestamp**|*required*| The desired time as seconds since midnight, January 1, 1970 UTC. The timestamp determines whether or not Daylight Savings should be applied, based on the time zone of the location.|1646179205|

\
Response data object properties:
|Property|Description|Example|
|-|-|-|
|**dstOffset**| Daylight Savings Time offset in **seconds**. This will be zero if the time zone is not in Daylight Savings Time during the specified timestamp.|0|
|**rawOffset**| The offset from UTC in **seconds** for the given location. This does not take into effect daylight savings.|-28800|
|**timeZoneId**| A string containing the ID of the time zone, such as “America/Los_Angeles”. When a timezone has several IDs, the canonical one is returned. For example, “Asia/Calcutta” is returned, not “Asia/Kolkata”.|"America/Vancouver"|
|**timeZoneName**| The long form name of the time zone. This field will be localized if the language parameter is set. eg. Pacific Daylight Time.|"Pacific Standard Time"|
