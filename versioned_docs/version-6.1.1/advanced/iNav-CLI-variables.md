---
title: iNAV CLI variables related to navigation features
---  

:::note
iNAV CLI variables related to navigation features
:::  

All iNAV calculations are done in cm, cm/s and cm/s^2.  
  
_As for CLI, here are some useful commands:_  
 _"help" will list available commands._  
 _"dump" will list all settings and what value you have._  
 _"diff" will list all settings that are changed compared to default values. (Recommend to use this for backing up user data and when sharing configurations online._  
  _"get rth" will list all settings with the word "rth" in them._  
 _"set nav_rth_altitude = 300" to change this setting to 300 (centimeters)._  
 _"save" to save it permanently and reboot your flight controller, remember to do this or your setting changes will be lost!_  

The INAV CLI variables are explained in the [INAV cli variables documentation](https://github.com/iNavFlight/inav/blob/master/docs/Cli.md). 

To see new CLI values for release candidates or other pre release you have to change to the appropriate branch, example [development](https://github.com/iNavFlight/inav/blob/development/docs/Cli.md). 