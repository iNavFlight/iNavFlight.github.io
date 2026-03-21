---
title: Blinking Lights
---

Why does my Flight Controller blink/beep lots of times when powering up ?

_Stolen (only call it research) wholesale from the betaflight wiki ...._

5 short blink/beeps followed by any number of long blinks/beeps indicates an error code.
Number of long blinks indicates the following error:

1. ***FAILURE_DEVELOPER***: External interrupt of sensor failed to initialize.
2. ***FAILURE_MISSING_ACC***: Accelerometer/gyro sensor is missing
3. ***FAILURE_ACC_INIT***: Accelerometer/gyro sensor failed to initialize
4. ***FAILURE_ACC_INCOMPATIBLE***: The found accelerometer/gyro sensor is not compatible/not the expected one
5. ***FAILURE_INVALID_EEPROM_CONTENTS***: EEPROM/FLASH configuration content is invalid
6. ***FAILURE_FLASH_WRITE_FAILED***: Write of configuration to EEPROM/FLASH failed
7. ***FAILURE_GYRO_INIT_FAILED***: Gyro initialization of SPI MPU6000 accelerometer/gyro failed

The most common one seem to be error 2 where the accelerometer/gyro sensor can't be found, this is caused by a bad sensor or bad connections to the sensor, could happen because of a bad crash. On most boards gyro and accelerometer is the same chip so acro flying isn't possible when the accelerometer isn't found, it's not just the accelerometer that's bad but the whole chip.

Error 3, 4 and 7 could also be caused by a bad accelerometer/gyro sensor. 
Error 5 and 6 indicates memory read/write problem of the MCU (main processor).
In most cases a new flight controller board will be needed if the user isn't for example able to re-solder the sensor.  

Above are Hard Faults the Processor detects upon boot-up and initialization. Additional reasons for flashing LED and/or beeping are:  
  No signal from RX. This could be simply the TX is off or the wrong Model/binding selected or a hard fault of the RX like no power or bad cable.  
  Accelerometer Not calibrated if the ACC is enabled (check the CLI). If acc is enabled then it must be cal'ed once and typically done in the config GUI.  
  Copter titled too far if the Acc is enabled. 


