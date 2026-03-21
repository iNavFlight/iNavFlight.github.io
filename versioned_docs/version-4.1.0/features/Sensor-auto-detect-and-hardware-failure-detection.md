---
title: Sensor Auto Detect and Hardware Failure Detection
---

## How auto detect works in iNav

On iNav when mag_hardware and baro_hardware is set to `AUTO` it tries to auto detect which sensor is connected.  
When it finds a sensor it will change the parameter to the one found, example `BMP280`. If it fails to find any sensor it will set *_hardware to `NONE`

Reason for switching from `AUTO` to the detected sensor is to make the hardware failure detection work properly.

Default value after a new firmware flash is `AUTO`, this will cause the firmware to look for sensors on first boot, and set the found sensors.

If you connect a magnetometer after first boot it will not auto-detect it, then you will have to either specify `mag_hardware` manually, or do a new `mag_hardware = AUTO` to try and auto detect mag. ( This also applies if you already have an external mag connected, but don't have it powered up on first boot )

## Hardware failure detection

Since version 1.5 INAV features hardware failure detection. At run time all sensors - GPS, BARO, MAG, ACC, GYRO, SONAR are periodically checked by a diagnostic system. There are 4 cases for each sensor:

**Case #1**: If sensor is not configured (`*_hardware` setting set to `NONE` or in case of GPS feature is not enabled) it's not monitored by diagnostic system, reported as `NOT AVAILABLE` and is not considered as a hardware failure.

If sensor is configured it's checked periodically and it's status is reported to Configurator via MSP and also used for pre-flight checks.

**Case #2**: Sensor is configured, but not detected. This can happen if you configure a sensor that is not present i.e. by accidentally setting `mag_hardware` to `MAG3110` while your compass chip is `HMC5883`. In this case sensor is reported as `NOT DETECTED` and this status is considered as a hardware failure.

**Case #3**: Sensor is configured, detected correctly, but reports inconsistent readings. This check may not be implemented for certain sensor but if it does such sensor is reported as `NOT HEALTHY` and is considered as a hardware failure.

**Case #4**: Sensor is configured, detected correctly and reports sane and consistent data. This is reported as `GOOD` status.

If any of the sensors is in `NOT DETECTED` or `NOT HEALTHY` state - the board will not ARM and `FAIL` will be indicated for `Hardware health` pre-arming check in the Configurator.

Hardware detection failure does not work while in flight. Only detection working is if iNav looses position data, and it does not have knowledge of where it is anymore, example loosing GPS lock. This will cause the machine to exit GPS modes, and if its during fail-safe RTH it will emergency land.