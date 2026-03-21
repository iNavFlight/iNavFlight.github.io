---
title: Release Notes
sidebar_position: 2
---

![INAV Banner](/img/inav_banner.png)

## Hello and welcome to INAV 4.0 "Red Kite"

Please carefully read all of this document for the best possible experience and safety.

Your contribution from the past month has been very welcome! Thanks!

Tested and suggested hardware can be found [here](./quickstart/Welcome-to-INAV,-useful-links-and-products.md)

# Important Notes

## PPM receivers are no longer supported
If you use a PPM receiver, these are no longer supported by iNav. We recommend that you use serial based receivers.

## F411 and F722 feature reduction
Due to the storage space on these flight controllers. Features have started to be dropped. See [PR #7297](https://github.com/iNavFlight/inav/pull/7297) for details

## Font update required
A font file update is required to use the new symbols and avoid an invalid font warning. Upload the updated font of your choosing from the OSD tab.

## INAV LUA Script
If you are using the INAV LUA script and Crossfire, you should update to the latest [INAV LUA script](https://github.com/iNavFlight/OpenTX-Telemetry-Widget/releases).

## Upgrading from a previous release


### Upgrading from INAV 3

You can copy `osd`, `led`, `servo`, `aux`, `serial`, and mixer settings, from INAV 3.0.2 _diff all_, but other settings should be tuned again.

0. Download and install the new [configurator](https://github.com/iNavFlight/inav-configurator/releases)
1. Save to a file the current _diff all_ from the CLI.
2. Upgrade to INAV 4.0 using the Full Erase option in the configurator.
3. Upload your OSD font of choice from the OSD tab.
4. Go to the CLI again and paste the above-described contents from the file you previously created and write _save_ , press ENTER.
5. There are a large number of new, changed, and removed settings. Check carefully that the settings are correct and fix any unrecognized or out-of-range items from the saved configuration.
6. You should be ready, explore new 4.0 features, and enjoy!

### Upgrading from older versions

Please follow the instructions on [this](./quickstart/Upgrading-from-an-older-version-of-INAV-to-the-current-version.md) page.

# Important changes

## Filtering changes

With INAV 4.0 there are a couple of important changes in how gyro and D-term are filtered. They mostly affect Multirotor pilots.

1. Kalman filter aka Unicorn Filter is enabled by default
1. Unicorn Filter setup is simplified: you only tune Q factor. Window size and sharpness settings are removed
1. Dynamic Notch aka Matrix Filter is enabled by default
1. Matrix filter has been reworked and simplified. Now you only set minimum frequency and Q factor
1. Matrix filter resolution is now 4 times higher than with INAV 3
1. Static gyro notch was removed
1. First D-term LPF type changed to PT2 and second D-term LPF is disabled - this gives the same filtering as previously but with less settings to worry about
1. The Alpha-Beta-Gamma filter removed
1. The Smith Predictor is enabled by default by the new Configurator defaults

## H743 support

INAV 4.0 comes with the full support of all H7 boards compatible with **MATEKH743** target. This includes the SD Card and MSC mode support. Bear in mind, CAN and UAVCAN are still not supported by INAV and currently, there are no plans to implement them.

## Blackbox improvements

Blackbox now always logs the **Control Derivative** and **Feed Forward** components, as well as rate target in degrees-per-seconds.
The latest INAV Blackbox Explorer is required to fully use those features.

New command `blackbox` allows setting which Blackbox fields are recorded to conserve space and bandwidth. Possible fields are:

* NAV_ACC - Navigation accelerometer readouts
* NAV_PID - Navigation PID debug
* NAV_POS - Current and target position and altitude
* MAG - Magnetometer raw values
* ACC - Accelerometer raw values
* ATTI - Attitude as computed by INAV position estimator
* RC_DATA - RC channels 1-4 as returned by the radio receiver
* RC_COMMAND - RC_DATA converted to [-500:500] scale with expo and headband
* MOTORS - motor output

Usage 

* `blackbox` currently enabled Blackbox fields
* `blackbox list` all available fields
* `blackbox -MOTORS` disable MOTORS logging
* `blackbox MOTOR` enable MOTORS logging

## Rate Dynamics

INAV 4.0 adds a port of the EmuFlight Rate Dynamics system. It modifies stick input to change the flight feeling. To find out more refer to:
1. [https://www.youtube.com/watch?v=8WyJx2FcLzI](https://www.youtube.com/watch?v=8WyJx2FcLzI)
1. [https://github.com/emuflight/EmuFlight/wiki/Rate-Dynamics](https://github.com/emuflight/EmuFlight/wiki/Rate-Dynamics)

Below are some presets you might want to try

### Default 
```
set rate_dynamics_center_sensitivity = 100
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 0
set rate_dynamics_end_sensitivity = 100
set rate_dynamics_end_correction = 10
set rate_dynamics_end_weight = 0
```

### Cinematic
```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 20
set rate_dynamics_center_weight = 85
set rate_dynamics_end_sensitivity = 90
set rate_dynamics_end_correction = 10
set rate_dynamics_end_weight = 50
```
### Freestyle
```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 35
set rate_dynamics_end_sensitivity = 130
set rate_dynamics_end_correction = 10 
set rate_dynamics_end_weight = 35
```
### Freestyle Less bounceback
```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 35
set rate_dynamics_end_sensitivity = 130
set rate_dynamics_end_correction = 30 
set rate_dynamics_end_weight = 35
```
### Racing 
```
set rate_dynamics_center_sensitivity = 130
set rate_dynamics_center_correction = 35
set rate_dynamics_center_weight = 30
set rate_dynamics_end_sensitivity = 115
set rate_dynamics_end_correction = 20
set rate_dynamics_end_weight = 10
```

## Battery Profiles

Some settings have moved from the `# master` section of the CLI in to `# battery profiles`. These include:
- `throttle_idle`
- `fw_min_throttle_down_pitch`
- `nav_fw_cruise_thr`
- `nav_fw_min_thr`
- `nav_fw_pitch2thr`
- `nav_fw_launch_thr`
- `nav_fw_launch_idle_thr`
- `failsafe_throttle`
- `nav_mc_hover_thr`

These settings will be automatically added to the current battery profile when importing a `diff`. You will need to replicate them on any other battery profiles you use.  

## WP Mission Enhancements

### Multi-Mission

Multiple missions may be uploaded to the flight controller and a mission selected for execution by OSD, [Stick Command](https://github.com/iNavFlight/inav/blob/release_4.0.0/docs/Controls.md#stick-positions) or Mission Planner. Multi-Mission is supported by the inav Configurator and mwp mission planners.

### Number of Waypoints

The maximum number of WPs is now 120.

### On the fly missions

Inav 4.0 adds the capability to generate an "on the fly" mission while flying using aircraft positions.

### Fly By Home Waypoints

Inav 4.0 adds Fly-by-home waypoints. This is a way point whose location is set to the home position at arm time.

## Fixed wing changes

### [Soaring mode](https://github.com/iNavFlight/inav/pull/7250)

Soaring mode comes to iNav 4.0. The addition is great for people who fly gliders. Soaring mode adds a modifier that you can use to change how Course Hold, Cruise, or Position Hold (loiter) behave. When enabled, it disables altitude control and allows Angle mode to free float in pitch, allows the plane to soar freely.

### [Two-stage climb first for RTH](https://github.com/iNavFlight/inav/pull/7323)

This change allows the climb phase of a climb first RTH to have two separate parts. This is useful for pilots who want to climb first, to clear potential obstacles. But, don't want to be wasting energy flying away from home. This allows you to set a first climb stage altitude. Once it meets or exceeds that altitude, the plane will turn to home and continue climbing to the RTH altitude. See the [iNav Wiki](https://github.com/iNavFlight/inav/wiki/Navigation-Mode:-Return-to-Home) for more information.

### [Autotune no longer tunes P and I](https://github.com/iNavFlight/inav/pull/7461)

There were often autotunes in iNav 3.0 which resulted in too high P and I. Also, D was not tuned at all. New default PIDs, that will work reasonably on all sizes of planes ([#1390](https://github.com/iNavFlight/inav-configurator/pull/1390)) have been added. This should give good results with an autotune, which can then be fine tuned to your plane.

## OSD Units

If you previously used the _UK_ units in your OSD. You will now find that your units are set to _Metric + MPH_. This is the new name for the old _UK_ units. There is also a new _UK_ units set, that better represents transportation units used in the UK. Full details can be found in the [pull release](https://github.com/iNavFlight/inav/pull/7195).

There is also a new units set aimed at _General Aviation_ pilots. This set uses Knots, Feet, Nautical Miles, 100 Feet per Minute, and Celsius for their respective values.

# Changelist

* H7: usb msc support for sdio #7572 - This enables SD card support on H7 boards
* Improve leading space handing in craft name in CLI #6056
* Ability to store multiple missions and select before arming #6765
* Unicorn Filter improvements #6819 #7132 #7523
* Rate dynamics #6823
* Mission restart option #6938 
* Other Missions improvements #6920
* On the fly WP Mission Planner #6967
* OSD Improvements #6979 #6993 #6995 #7068 #7104 #7126 #7427 #7371 #7367 #7355 #7515 #7518 #7519 #7441
* SmartSudio on SoftwareSerial fixed #6986 
* DJI FPV OSD improvements - craft name hack no longer necessary #7098 #7138
* Autotune improvements #7180 
* Don't change P, I and D during FW autotune #7461
* PT2 and PT3 Low Pass Filters for D-term #7165 #7310 
* Dboost 2 - dynamic Dterm management #7149
* Fix name clashes in FAT filesystem #7155
* Add proper % RSSI for CRSF [0..99%] #7173
* Two Stage Climb First RTH #7323
* Rangefinder cleanup #7318 #7316 #7312 
* VCM5883 magnetometer driver #7301
* Remove motor rate limiting #7296
* Cleanup not used ESC protocols #7295
* Multirotor Auto Speed Change #7293
* Add support for TOF10120 i2c rangefinder #7291
* Enable MPU6000 on kakute F4 v2 #7258
* Added General aviation OSD units - includes a fair amount of work and fixes on the OSD & Fonts #7255
* Fixed wing soaring mode #7250
* Fix i2c errors after 72 min of FC launch #7226
* Added PID Profiles to Programming framework #7432
* Add average speed to OSD stats #7428
* Emergency Landing Fix #7421
* Add 50mW CRSF tx power level #7397
* Drop PPM receivers #7393
* Decrease acc and mag P-gains in AHRS #7392
* Control Derivative improvements #7391
* Blackbox improvements #7390  #7378 #7440
* Failsafe Emergency Landing change #7376
* Add support for Bosch Sensortec BMI270 Accelerometer / Gyro #7356
* Fixed wing emergency landing vertical rate control addition #7364
* Nav Emergency landing code fixes and refactor #7339
* IMU2 BNO055 improvements #7335
* Set manual rc expo to 35% #7491
* BMI270: support for reading IMU temperature #7501
* Dynamic Notch aka Matrix Filter Improvements #7521 #7522 #7544 
* Drop ABG filtering #7524
* Fix buffer is accessed out of bounds #7545
* Drop the last static gyro notch #7560
* Fix MSC on windows with F7 and H7 #7573
* Added PINIO and USER1 mode to FLYWOOF745 and FLYWOOF745 #7574
* Remove old and unused IMU #7453
* Fix emergency landing during failsafe #7460
* Add min and max airspeed alarms #7467
* Fixed issue #7194, The DSHOT direction command not working in STM32F405 #7477
* fix array overflow with 11S-14S battery in Mavlink #7478
* Adding loiter radius to programming #7480
* WP mission RTH failsafe fix #7487
* Enable FW motors and servos on ZEEZF7V2 #7490

The full list of changes is available [here](https://github.com/iNavFlight/inav/pulls?page=1&q=is%3Apr+milestone%3A4.0+is%3Aclosed)