---
title: INAV MSP Frame Changelog
---

## MSP API Version 2.3

### MSP2_INAV_MC_BRAKING / MSP2_INAV_SET_MC_BRAKING

New MSP frames used to setup mixer properties.

Frame IDs:

* MSP2_INAV_MC_BRAKING, Frame ID _0x200B_
* MSP2_INAV_SET_MC_BRAKING, Frame ID _0x200C_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 2 | `nav_mc_braking_speed_threshold` | |
| 2 | `nav_mc_braking_disengage_speed` | |
| 2 | `nav_mc_braking_timeout` | |
| 1 | `nav_mc_braking_boost_factor` | |
| 2 | `nav_mc_braking_boost_timeout` | |
| 2 | `nav_mc_braking_boost_speed_threshold` | |
| 2 | `nav_mc_braking_boost_disengage_speed` | |
| 1 | `nav_mc_braking_bank_angle` | |


## MSP API Version 2.2

Since `mixerMode` is no longer used, legacy MSP frames will return always **mixer mode** *3 (QuadX)* and attempt to set mixer mode via MSP will be ignored. This affects following MSP frames:

1. MSP_IDENT
1. MSP_MIXER
1. MSP_BF_CONFIG
1. MSP_SET_MIXER
1. MSP_SET_BF_CONFIG 

### MSP2_INAV_MIXER / MSP2_INAV_SET_MIXER

New MSP frames used to setup mixer properties.

Frame IDs:

* MSP2_INAV_MIXER, Frame ID _0x2010_
* MSP2_INAV_SET_MIXER, Frame ID _0x2011_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 1 | `yaw_motor_direction` | |
| 2 | `yaw_jump_prevention_limit` | |
| 1 | `platform_type` | |
| 1 | `has_flaps` | |

## INAV 1.9 MSP Version 2.1

### MSP2_COMMON_MOTOR_MIXER / MSP2_COMMON_SET_MOTOR_MIXER

Frame IDs:

* MMSP2_COMMON_MOTOR_MIXER, Frame ID _0x1005_
* MSP2_COMMON_SET_MOTOR_MIXER, Frame ID _0x1006_

## INAV 1.7.1 MSP API Version 1.26

### MSP_FW_CONFIG / MSP_SET_FW_CONFIG

Get and set Fixed Wing options 

Frame IDs:

* MSP_FW_CONFIG, Frame ID _23_
* MSP_SET_FW_CONFIG, Frame ID _24_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 2 | `nav_fw_cruise_thr` | |
| 2 | `nav_fw_min_thr` | |
| 2 | `nav_fw_max_thr` | |
| 1 | `nav_fw_bank_angle` | |
| 1 | `nav_fw_climb_angle` | |
| 1 | `nav_fw_dive_angle` | |
| 1 | `nav_fw_pitch2thr` | |
| 2 | `nav_fw_loiter_radius` | |

### MSP_RTH_AND_LAND_CONFIG / MSP_SET_RTH_AND_LAND_CONFIG

Get and set Return-To-Home and Land options 

Frame IDs:

* MSP_RTH_AND_LAND_CONFIG, Frame ID _21_
* MSP_SET_RTH_AND_LAND_CONFIG, Frame ID _22_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 2             | `nav_min_rth_distance`             |         |
| 1             | `nav_rth_climb_first`             | _boolean_    |
| 1             | `nav_rth_climb_ignore_emerg`             |  _boolean_       |
| 1             | `nav_rth_tail_first`             | _boolean_         |
| 1             | `nav_rth_allow_landing`             | _boolean_        |
| 1             | `nav_rth_alt_mode`             | _dictionary_        |
| 2             | `nav_rth_abort_threshold`             |         |
| 2             | `nav_rth_altitude`             |         |
| 2             | `nav_landing_speed`             |         |
| 2             | `nav_land_slowdown_minalt`             |         |
| 2             | `nav_land_slowdown_maxalt`             |         |
| 2             | `nav_emerg_landing_speed`            |         |

## INAV 1.6 MSP API Version 1.24

### MSP_WP_MISSION_LOAD / MSP_WP_MISSION_SAVE

Load/save waypoint mission to non-volatile storage

Frame IDs:

* MSP_WP_MISSION_LOAD, Frame ID _18_
* MSP_WP_MISSION_SAVE, Frame ID _19_

| Length        | Notes                         |
| -----         | -----                         |
| 1             | Mission ID (reserved)         |


### MSP_POSITION_ESTIMATION_CONFIG

Frame IDs:

* MSP_POSITION_ESTIMATION_CONFIG, Frame ID _16_
* MSP_SET_POSITION_ESTIMATION_CONFIG, Frame ID _17_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 2             | `inav_w_z_baro_p`             | float as `value * 100`        |
| 2             | `inav_w_z_gps_p`              | float as `value * 100`        |
| 2             | `inav_w_z_gps_v`              | float as `value * 100`        |
| 2             | `inav_w_xy_gps_p`             | float as `value * 100`        |
| 2             | `inav_w_xy_gps_v`             | float as `value * 100`        |
| 1             | `inav_gps_min_sats`           | |
| 1             | `inav_use_gps_velned`         | ON/OFF |
| 6             | `reserved`                    |         |


### MSP_CALIBRATION_DATA

Sensors calibration data

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 2             | `acczero_x`                   |                               |
| 2             | `acczero_y`                   |                               |
| 2             | `acczero_z`                   |                               |
| 2             | `accgain_x`                   |                               |
| 2             | `accgain_y`                   |                               |
| 2             | `accgain_z`                   |                               |
| 2             | `magzero_x`                   |                               |
| 2             | `magzero_y`                   |                               |
| 2             | `magzero_z`                   |                               |
| 8             | _reserved_                    |                               |

Frame IDs:

* MSP_CALIBRATION_DATA, Frame ID _14_
* MSP_SET_CALIBRATION_DATA, Frame ID _15_

### MSP_NAV_POSHOLD

Basic position hold settings. Mostly, but not only, for multirotor 

Frame IDs:

* MSP_NAV_POSHOLD, Frame ID _12_
* MSP_SET_NAV_POSHOLD, Frame ID _13_

| Length        | Setting                       | Notes                         |
| -----         | -----                         | -----                         |
| 1             | `nav_user_control_mode`       | dictionary                    |
| 2             | `nav_max_speed`               |                               |
| 2             | `nav_max_climb_rate`          |                               |
| 2             | `nav_manual_speed`            |                               |
| 2             | `nav_manual_climb_rate`       |                               |
| 1             | `nav_mc_bank_angle`           |                               |
| 1             | `nav_use_midthr_for_althold`  | ON/OFF                        |
| 2             | `nav_mc_hover_thr`            |                               |
| 8             | _reserved_                    |                               |

## INAV 1.5 MSP API Version 1.23

For INAV 1.5 and later, the MSP_STATUS/sensor field reports sensor failure. This updates MSP_SENSOR (see http://www.multiwii.com/wiki/index.php?title=Multiwii_Serial_Protocol) in a backwards compatible manner to report additional sensors and sensor health. The sensor field is reported as:

| Bit | Usage |
| ---- | ----- |
| 0 | Set if ACC present |
| 1 | Set if BARO present |
| 2 | Set if MAG present |
| 3 | Set if GPS present |
| 4 | Set if SONAR present |
| 5 | Reserved for OPFLOW (not implemented) |
| 6 | Set if PITOT present |
| 15 | Set on sensor failure |

The sensor hardware failure indication is backwards compatible with versions prior to 1.5 (and other Multiwii / Cleanflight derivatives).

### MSP_SENSOR_CONFIG

Frame IDs:

* MSP_SENSOR_CONFIG, Frame ID _96_
* MSP_SET_SENSOR_CONFIG, Frame ID _97_

| length    | setting                       | Notes                         |
| ----      | ----                          | ----                          |
| 1         | `acc_hardware`                  |                               |
| 1         | `baro_hardware`                  |                               |
| 1         | `mag_hardware`                  |                               |
| 1         | `pitot_hardware`                  |                               |
| 1         | Reserved for rangefinder      | not yet implemented |
| 1         | Reserved for OpFlow      | not yet implemented |

## INAV 1.4 MSP API Version 1.22

### MSP_INAV_PID

Frame IDs:

* MSP_INAV_PID, Frame ID _6_
* MSP_SET_INAV_PID, Frame ID _7_

| length    | setting                       | Notes                         |
| ----      | ----                          | ----                          |
| 1         | `async_mode`                  |                               |
| 2         | `acc_task_frequency`          |                               |
| 2         | `attitude_task_frequency`     |                               |
| 1         | `mag_hold_rate_limit`         |                               |
| 1         | MAG_HOLD_ERROR_LPF_FREQ       | not implemented yet as configurable     |
| 2         | `yaw_jump_prevention_limit`   |                               |
| 1         | `gyro_lpf`                    |                               |
| 1         | `acc_soft_lpf_hz`             |                               |
| 4         | _reserved_                    | reserved for further usage    |

## MSP_FILTER_CONFIG

Compatible with Betaflight

Frame IDs:

* MSP_FILTER_CONFIG Frame ID _92_
* MSP_SET_FILTER_CONFIG Frame ID _93_

| length    | setting                       | Notes                         |
| ----      | ----                          | ----                          |
| 1         | `gyro_soft_lpf_hz`            |   |
| 2         | `dterm_lpf_hz`                |   |
| 2         | `yaw_lpf_hz`                  |   |
| 2         | `gyro_soft_notch_hz_1`        | Since INAV 1.6 |
| 2         | `gyro_soft_notch_cutoff_1`    | Since INAV 1.6 |
| 2         | `dterm_soft_notch_hz`         | Since INAV 1.6 |
| 2         | `dterm_soft_notch_cutoff`     | Since INAV 1.6 |
| 2         | `gyro_soft_notch_hz_2`        | Since INAV 1.6 |
| 2         | `gyro_soft_notch_cutoff_2`    | Since INAV 1.6 |

## MSP_PID_ADVANCED

Compatible with Betaflight

Frame IDs:

* MSP_PID_ADVANCED Frame ID _94_
* MSP_SET_PID_ADVANCED Frame ID _95_

| length    | setting                       | Notes                         |
| ----      | ----                          | ----                          |
| 2         | `rollPitchItermIgnoreRate`    |                               |
| 2         | `yawItermIgnoreRate`          |                               |
| 2         | `yaw_p_limit`                 |                               |
| 1         | _not used_                    | Betaflight `deltaMethod`      |
| 1         | _not used_                    | Betaflight `vbatPidCompensation` |
| 1         | _not used_                    | Betaflight `setpointRelaxRatio`  |
| 1         | `dterm_setpoint_weight`       | Since INAV 1.6 |
| 2         | `pidsum_limit`                | Since INAV 1.6                 |
| 1         | _not used_                    | Betaflight `itermThrottleGain`    |
| 2         | `rate_accel_limit_roll_pitch` | divided by `10`    |
| 2         | `rate_accel_limit_yaw`        | divided by `10`    |

## INAV 1.3 MSP API 1.21

### case MSP_ADVANCED_CONFIG:

Frame IDs:

* MSP_ADVANCED_CONFIG, Frame ID _90_
* MSP_SET_ADVANCED_CONFIG, Frame ID _91_

| length    | setting                       | Notes               |
| ----      | ----                          | ----                |
| 1         | `gyro_sync_denom`             |                     |
| 1         | _not used_                    | Betaflight `masterConfig.pid_process_denom` |
| 1         | _not used_                    | Betaflight `masterConfig.motorConfig.useUnsyncedPwm`  |
| 1         | `motor_pwm_protocol`          | _dictionary_  |
| 2         | `motor_pwm_rate`              |   |
| 2         | `servo_pwm_rate`              |   |
| 1         | `gyro_sync`                   | _boolean_  |

##Change log:

* 2016-11-20 - scaling of `rate_accel_limit_roll_pitch` and `rate_accel_limit_yaw` in **MSP_PID_ADVANCED** changed from 1000 to 10
* 2016-12-11 - added MSP_STATUS update for INAV 1.5
* 2017-01-15 - added dterm_setpoint_weight added to MSP_PID_ADVANCED frame
* 2017-01-15 - MSP_CALIBRATION_DATA
* 2017-01-18 - `pidsum_limit` in `MSP_PID_ADVANCED`
* 2017-01-23 - MSP_POSITION_ESTIMATOR