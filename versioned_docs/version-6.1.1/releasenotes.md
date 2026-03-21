---
title: Release Notes
sidebar_position: 2
---

![INAV Banner](/img/inav_banner_hawk.png)

## Hello and welcome to INAV 6 "Horizon Hawk"

Please carefully read all of this document for the best possible experience and safety.

<!-- truncate -->

## Important Notes

- The STM32 F3 code was removed from repository, it's no longer possible to compile F3 locally

## Upgrading from a previous release

### Upgrading from INAV 5 and 5.1

0. Download and install the new [configurator](https://github.com/iNavFlight/inav-configurator/releases)
1. Save to a file the current _diff all_ from the CLI.
2. Upgrade to INAV 6 using the Full Erase option in the configurator.
3. Upload your OSD font of choice from the OSD tab.
4. Run your INAV 5.x _diff_ through [this tool](https://www.mrd-rc.com/iNav/INAV-6.0-CLI-Update.php). It will update some of the changed CLI parameters _(See these release notes)_. Please pay special attention to the `ahrs_inertia_comp_method` parameter, as this must be correct for your platform. See the release notes below.
5. Go to the CLI again and paste the above-described contents from the file you previously created and write _save_ , press ENTER.
6. There are a large number of new, changed, and removed settings. Check carefully that the settings are correct and fix any unrecognized or out-of-range items from the saved configuration.
7. You should be ready, explore new 6.0 features, and enjoy!

### Upgrading from older versions

Please follow the instructions on [this](./quickstart/Upgrading-from-an-older-version-of-INAV-to-the-current-version.md) page.

## Important changes

### **New AHRS (Attitude & Heading Reference System)**

---

INAV 6.0 includes a complete rework of the AHRS for Attitude Estimation, to make sure INAV always knows its correct attitude relative to the ground. This should once and for all fix the issue, known as "Horizon Drift" and makes any navigation mode as well as self-levelling modes like ANGLE fully reliable and allows much more precise GPS-Navigation. This affects Fixed Wing as well as Multirotor.

The best results are given if the craft is equipped with GPS and in the case of Multirotor also with a compass. But also for pure LOS Craft that have no GPS on board, the AHI stability is noticeably improved in most situations. To work best with non-GPS Fixed Wings, the Reference Airspeed has to be set according the average cruise speed of the craft.

---

#### When Updating from INAV 5.1 or older

If you load a diff file from INAV 5.1 or older, it is safe to ignore errors related to `imu_acc_ignore_rate`, `imu_acc_ignore_slope`, `imu_dcm_kp`, `imu_dcm_kp_map`, or `imu_dcm_ki_mag`. These variables behave differently in 6.0 and have been renamed. You should use the default values of the new parameter first. Below are the new parameter defaults.

```
set ahrs_acc_ignore_rate = 15
set ahrs_acc_ignore_slope = 5
set ahrs_dcm_kp = 2000
set ahrs_dcm_ki = 50
set ahrs_dcm_kp_mag = 2000
set ahrs_dcm_ki_mag = 50
```

##### ahrs_inertia_comp_method

If you have used the Feature Preview release, your diff, you may have the parameter `imu_inertia_comp_method`. If not and you are coming from INAV 5.0 or 5.1, you may need to add the new parameter shown below. Firstly, if you have `imu_inertia_comp_method` in your diff, you can remove that line.

If you are using fixed wing, you should add this new parameter to the `# master` section of your diff:

```
set ahrs_inertia_comp_method = ADAPTIVE
```

For all other platforms, you do not need to add anything. The default value of `VELNED` is correct for non-fixed wing platforms.

#### For Fixed Wing Craft with no GPS

set fw*reference_airspeed = *(set this in cm/s. Set this to airspeed at which PIDs were tuned. Usually should be set to cruise airspeed. Also used for coordinated turn calculation if airspeed sensor is not present.)\_

### HUD Offset change

The operation of `osd_horizon_offset` has been reversed, to make it more intuitive. If you have a non-zero value for `osd_horizon_offset` it will need to be inverted. For example, `osd_horizon_offset = 1` would become `osd_horizon_offset = -1`. Positive values move the HUD up, and negative values move it down. This is corrected with the CLI Update tool.

### RTH Trackback

When triggered the craft returns along the trackback route until the end is reached at which point it reverts to normal RTH heading directly home. It doesn't perform the RTH climb phase but instead uses the track point altitude but with altitude never allowed below the altitude of the start point so it can climb but never descend below the start point.

`OFF` by default, adjust `nav_rth_trackback_mode` to enable. For details see #7988

### Accelerometer calibration is optional

Accelerometer calibration is required only if any of the Accelerometer Based Flight Modes or Failsafe procedures is configured. For example, ACC calibration will be needed when Failsafe RTH is enabled, or any GPS assisted flight modes is configured. Acro only multirotor and fixed wings do not require calibration.

### nav_extra_arming_safety OFF option

The `off` option has been removed from `nav_extra_arming_safety`. Instead, the `allow_bypass` can be used for with the same effect. To allow the bypass, yaw right and arm. The extra arming safety features will be disabled until the next power cycle of the battery. Please update your diff if you use this parameter; either manually, or using [this tool](https://www.mrd-rc.com/iNav/INAV-6.0-CLI-Update.php).

### Improved fixed wing waypoint course tracking

Attempts to improve fixed wing WP course tracking accuracy by adding a couple of options:

1. Tracking accuracy option that forces craft toward the waypoint course line as quickly as possible and actively tracks the line thereafter. A single setting adjusts the strength of the tracking behaviour. Works for WP mode and RTH trackback. Option is disabled by default.

1. Turn smoothing option for waypoint turns. Sets a loiter point within the turn such that the craft follows a loiter turn path that either passes through the waypoint or cuts the turn missing the waypoint (2 settings possible). Only works for WP mode. Option is disabled by default.

See #8234 for details

### Support for Hardware In The Loop simulator in X-Plane 11

INAV flight controller can be used with X-Plane 11 flight simulator. Very useful for training, testing and debugging. Requires X-Plane 11 and HITL Plugin https://github.com/RomanLut/INAV-X-Plane-HITL

### Waypoint multi-mission in flight mission change

Allows WP multi-missions to be changed in flight using new mission change mode. With mode active the required mission index can be selected by cycling through missions using the WP mode switch. Selected mission is loaded when mission change mode is switched off. Mission index can also be changed through addition of a new Mission Index adjustment function which should be useful for DJI users unable to use the normal OSD mission related fields. See #8354 for details

### MSP DisplayPort fixes and updates

INAV has now support for various flavours of the MSP DisplayPort protocol used by HDZero, DJI Goggles 2, Walksnail Avatar or WTFOS. Based on the `osd_video_system` setting different canvas sizes and glyphs are used. Available options are:

- `AUTO` - for analogue systems only
- `PAL`
- `NTSC`
- `HDZERO`
- `DJIWTF`
- `AVATAR`
- `BF43COMPAT` - keep the compatibility with Betaflight 4.3 implementation by lowering canvas size, lowering the number of OSD glyphs and matching to Betaflight character mapping. Required for DJI MSP DisplayPort with DJI O3 Air Unit

### Enhance programming options for waypoint missions

:::info
**NOTE: Please read this section if you are using the Programming Framework (Programming tab).**
:::

The programming framework surrounding waypoints has changed. This has caused a conflict in compatibility with previous versions of INAV. If you use anything in the programming tab. Please run your diff through [this conversion tool](https://www.mrd-rc.com/iNav/INAV-6.0-CLI-Update.php), to keep your logic conditions working. Please feel free to check out the new waypoint related logical switch operands in the [Programming Framework document](https://github.com/iNavFlight/inav/blob/master/docs/Programming%20Framework.md).

### Increase nav_wp_safe_distance maximum

`nav_wp_safe_distance` has been replaced with `nav_wp_max_safe_distance`. This setting uses metres, and used to define the maximum distance away that the first waypoint can be. Please update your diff if you use this parameter; either manually, or using [this tool](https://www.mrd-rc.com/iNav/INAV-6.0-CLI-Update.php).

### Stop allowing navigation modes to be active while arming

The ability to arm the craft while in a navigation mode has been removed. The only people who this will effect are those who use permanently enabled autolaunch. Pre-6.0 you could arm while in a navigation mode. However this is dangerous, as it is easy to not realise, arm, disable the launch, then have the motor go to the cruise throttle. You will still be able to use a navigation mode as the exit mode from a launch. You just need to use the correct procedure for initiating the launch:

1. Be in a non-navigation mode
2. Arm
3. Select the flight mode that you want to use on launch exit
4. Raise the throttle to the level you want on launch exit
5. The motor will enter idle if idle throttle is used, or await being thrown
6. Throw the plane in to the air, and autolaunch will trigger

### Disarm on land by default

The disarm on landing flag is now set to `ON` by default. This means, after successful automated landing your aircraft should disarm and stop the motors automatically!

### Automated landing manual activation

Allows an emergency landing to be triggered manually as required.
Landing started or ended by rapid toggling of PosHold mode, at least 5 times at a minimum rate of 1Hz.
Emergency landing position hold added which will work for all emergency landings regardless of cause so long as a valid position is available.
Failsafe inhibited during manual emergency landing to allow landing to continue if Failsafe triggered whilst active.

### Other changes

- Gyro noise peaks are now logged into blackbox as separate fields, not debug options. [Setting documentation](https://github.com/iNavFlight/inav/blob/master/docs/Blackbox.md#configuring-the-blackbox)
- Raw gyro signal is now logged into blackbox as separate field, not debug options. [Setting documentation](https://github.com/iNavFlight/inav/blob/master/docs/Blackbox.md#configuring-the-blackbox)
- Adds auto smoothing of RC input based on RX refresh rate. Disabled by default, can be enabled with `SET rc_filter_auto=ON`
- Wind Estimator is now giving proper results
- 3D Matrix filter improves PID tuning on noisy Multirotors. See #8253
- Strobe lights support. See #8536
- Kakute H7 V2 Invert PINIO2 so VTX is ON by default See #8628

### Other removed functions

- MTK GPS protocol support
- NAZA GPS protocol support
- BNO055 Secondary IMU function
- MPU6050 gyro support
- SPI RX protocol support
- JR XBUS RX protocol support
- SUMH RX protocol support

## New targets

- Foxeer F722 V4
- Foxeer F745 AIO V3
- Kakute H7 V2
- SpeedyBee F745 AIO
- Zeez F7 V3
- Diatone Mamba F722 WING
- AocodaRC F4 V2
- HakRC F722D
- HakRC F411 AIO
- HakRC F405 DJI

## CLI

### Changed settings

Note: `nav_extra_arming_safety` The `OFF` option has been removed. `ON` and `ALLOW_BYPASS` are now the only valid options. `ALLOW_BYPASS` permits arming in "navigation unsafe" condition by temporally applying full right yaw when operating the arm switch.

| Name                    | Values                                                                                                                                                                                                                                         |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| acc_hardware            | Removed: `MPU6050`                                                                                                                                                                                                                             |
| debug_modes             | New: `POS_EST`, Removed: `GYRO`, `SBUS`, `FPORT`, `ERPM`, `RPM_FILTER`, `RPM_FREQ`, `DYNAMIC_FILTER`, `DYNAMIC_FILTER_FREQUENCY`, `IRLOCK`, `KALMAN_GAIN`, `PID_MEASUREMENT`, `SPM_CELLS`, `SPM_VS600`, `SPM_VARIO`, `IMU2`, `SMITH_PREDICTOR` |
| gps_provider            | Removed: `UNUSED`, `NAZA`, `MTK`                                                                                                                                                                                                               |
| mag_hardware            | Removed: `GPSMAG`                                                                                                                                                                                                                              |
| nav_extra_arming_safety | Removed: `OFF`                                                                                                                                                                                                                                 |
| osd_video_system        | New: `HDZERO`, `DJIWTF`, `AVATAR`, `BF43COMPAT`                                                                                                                                                                                                |
| receiver_type           | Removed: `SPI`                                                                                                                                                                                                                                 |
| serial_rx               | Removed: `SUMH`, `XB-B`, `XB-B-RJ01`                                                                                                                                                                                                           |

### New Items

| Name                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dynamic_gyro_notch_3d_q                | Q factor for 3D dynamic notches Values: 1 - 1000 Default: 200                                                                                                                                                                                                                                                                                                                                                                                      |
| dynamic_gyro_notch_mode                | Gyro dynamic notch type Default: 2D                                                                                                                                                                                                                                                                                                                                                                                                                |
| failsafe_mission_delay                 | Applies if failsafe occurs when a WP mission is in progress. Sets the time delay in seconds between failsafe occurring and the selected failsafe procedure activating. If set to -1 the failsafe procedure won't activate at all and the mission will continue until the end. Values: -1 - 600 Default: 0                                                                                                                                          |
| imu_gps_yaw_windcomp                   | Wind compensation in heading estimation from gps groundcourse(fixed wing only) Default: TRUE                                                                                                                                                                                                                                                                                                                                                       |
| imu_inertia_comp_method                | Inertia force compensation method when gps is avaliable, VELNED use the accleration from gps, TURNRATE calculates accleration by turnrate multiplied by speed, ADAPTIVE choose best result from two in each ahrs loop Default: VELNED                                                                                                                                                                                                              |
| nav_auto_disarm_delay                  | Delay before craft disarms when `nav_disarm_on_landing` is set (ms) Values: 100 - 10000 Default: 1000                                                                                                                                                                                                                                                                                                                                              |
| nav_fw_launch_abort_deadband           | Launch abort stick deadband in [r/c points], applied after r/c deadband and expo. The Roll/Pitch stick needs to be deflected beyond this deadband to abort the launch. Values: 2 - 250 Default: 100                                                                                                                                                                                                                                                |
| nav_fw_launch_manual_throttle          | Allows launch with manually controlled throttle. INAV only levels wings and controls climb pitch during launch. Throttle is controlled directly by throttle stick movement. IF USED WITHOUT A GPS LOCK plane must be launched immediately after throttle is increased to avoid issues with climb out stabilisation and the launch ending sooner than expected (launch end timer starts as soon as the throttle stick is raised). Default: FALSE    |
| nav_fw_wp_tracking_accuracy            | Waypoint tracking accuracy forces the craft to quickly head toward and track along the waypoint course line as closely as possible. Settings 1 to 10 adjust the course tracking response. Higher values dampen the response reducing possible overshoot. A value of 5 is a good starting point. Set to 0 to disable. Values: 0 - 10 Default: 0                                                                                                     |
| nav_fw_wp_tracking_max_angle           | Sets the maximum allowed alignment convergence angle to the waypoint course line when nav_fw_wp_tracking_accuracy is active [degrees]. Lower values result in smoother alignment with the course line but will take more distance until this is achieved. Values: 30 - 80 Default: 60                                                                                                                                                              |
| nav_fw_wp_turn_smoothing               | Smooths turns during WP missions by switching to a loiter turn at waypoints. When set to ON the craft will reach the waypoint during the turn. When set to ON-CUT the craft will turn inside the waypoint without actually reaching it (cuts the corner). Default: OFF                                                                                                                                                                             |
| nav_land_detect_sensitivity            | Changes sensitivity of landing detection. Higher values increase speed of detection but also increase risk of false detection. Default value should work in most cases. Values: 1 - 15 Default: 5                                                                                                                                                                                                                                                  |
| nav_rth_trackback_distance             | Maximum distance allowed for RTH trackback. Normal RTH is executed once this distance is exceeded [m]. Values: 50 - 2000 Default: 500                                                                                                                                                                                                                                                                                                              |
| nav_rth_trackback_mode                 | Useage modes for RTH Trackback. OFF = disabled, ON = Normal and Failsafe RTH, FS = Failsafe RTH only. Default: OFF                                                                                                                                                                                                                                                                                                                                 |
| nav_wp_max_safe_distance               | First waypoint in the mission should be closer than this value [m]. A value of 0 disables this check. Values: 0 - 1500 Default: 100                                                                                                                                                                                                                                                                                                                |
| osd_ahi_pitch_interval                 | Draws AHI at increments of the set pitch interval over the full pitch range. AHI line is drawn with ends offset when pitch first exceeds interval with offset increasing with increasing pitch. Offset direction changes between climb and dive. Set to 0 to disable (Not for pixel OSD) Values: 0 - 30 Default: 0                                                                                                                                 |
| osd_msp_displayport_fullframe_interval | Full Frame redraw interval for MSP DisplayPort [deciseconds]. This is how often a full frame update is sent to the DisplayPort, to cut down on OSD artifacting. The default value should be fine for most pilots. Though long range pilots may benefit from increasing the refresh time, especially near the edge of range. -1 = disabled (legacy mode) , 0 = every frame (not recommended) , default = 10 (1 second) Values: -1 - 600 Default: 10 |
| pilot_name                             | Pilot name Default:                                                                                                                                                                                                                                                                                                                                                                                                                                |
| rc_filter_auto                         | When enabled, INAV will set RC filtering based on refresh rate and smoothing factor. Default: FALSE                                                                                                                                                                                                                                                                                                                                                |
| rc_filter_lpf_hz                       | RC data biquad filter cutoff frequency. Lower cutoff frequencies result in smoother response at expense of command control delay. Practical values are 20-50. Set to zero to disable entirely and use unsmoothed RC stick values Values: 15 - 250 Default: 50                                                                                                                                                                                      |
| rc_filter_smoothing_factor             | The RC filter smoothing factor. The higher the value, the more smoothing but also the more delay in response. Value 1 sets the filter at half the refresh rate. Value 100 sets the filter to aprox. 10% of the RC refresh rate Values: 1 - 100 Default: 30                                                                                                                                                                                         |

### Removed Items

| Name                     | Description                         |
| ------------------------ | ----------------------------------- |
| baro_median_filter       |                                     |
| eleres_freq              |                                     |
| eleres_loc_delay         |                                     |
| eleres_loc_en            |                                     |
| eleres_loc_power         |                                     |
| eleres_signature         |                                     |
| eleres_telemetry_en      |                                     |
| eleres_telemetry_power   |                                     |
| failsafe_mission         | see new `failsafe_mission_delay`    |
| imu2_align_pitch         |                                     |
| imu2_align_roll          |                                     |
| imu2_align_yaw           |                                     |
| imu2_gain_acc_x          |                                     |
| imu2_gain_acc_y          |                                     |
| imu2_gain_acc_z          |                                     |
| imu2_gain_mag_x          |                                     |
| imu2_gain_mag_y          |                                     |
| imu2_gain_mag_z          |                                     |
| imu2_hardware            |                                     |
| imu2_radius_acc          |                                     |
| imu2_radius_mag          |                                     |
| imu2_use_for_osd_ahi     |                                     |
| imu2_use_for_osd_heading |                                     |
| imu2_use_for_stabilized  |                                     |
| nav_fw_auto_disarm_delay | See generic `nav_auto_disarm_delay` |
| nav_mc_auto_disarm_delay | See generic `nav_auto_disarm_delay` |
| nav_wp_safe_distance     | see `nav_wp_max_safe_distance`      |
| rc_filter_frequency      |                                     |
| rx_spi_id                |                                     |
| rx_spi_protocol          |                                     |
| rx_spi_rf_channel_count  |                                     |

## Changelist

The full list of changes is available [here](https://github.com/iNavFlight/inav/pulls?q=is%3Apr+milestone%3A6.0+is%3Aclosed)
The full list of INAV Configurator changes is available [here](https://github.com/iNavFlight/inav-configurator/pulls?q=is%3Apr+milestone%3A6.0+is%3Aclosed)
