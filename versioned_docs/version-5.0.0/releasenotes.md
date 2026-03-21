---
title: Release Notes
sidebar_position: 2
---

![INAV Banner](/img/inav_banner.png)

## Hello and welcome to INAV 5.0 "Ballistic Buzzard"

Please carefully read all of this document for the best possible experience and safety.

<!-- truncate -->

## Important Notes

### PCA9685 PWM driver no longer supported

The I2C PCA9685 servo driver is no longer supported as obsolete and not widely adopted. All PCA9685 setups are advised to upgrade to **SBUS** output and `SBUS to PWM` decoders

### Gyro and Acc alignment settings removed

The `align_acc` and `align_gyro` settings are removed. Gyro/Acc orientation should always be set with `align_board_yaw`

### GPS Glitch Detection

The `NAV_GPS_GLITCH_DETECTION` was removed as not suitable for modern aircraft. There is no user action required

### Removal of depreciated MSP frames

INAV 5 removed the support for the following MSP frames:
* `MSP_IDENT`
* `MSP_PID`
* `MSP_PID_CONTROLLER`
* `MSP_BF_CONFIG`
* `MSP_BF_BUILD_INFO`
* `MSP_SET_PID_CONTROLLER`
* `MSP_SET_PID`
* `MSP_SET_BF_CONFIG`
* `MSP_CF_SERIAL_CONFIG`
* `MSP_SET_CF_SERIAL_CONFIG`

No user action is required in the case of the INAV Configurator or mwptools (mwp etc.). In the case of 3rd party INAV configuration apps, this change might break the compatibility if the app was using any of those frames. `SpeedyBee` developers have been notified, other apps have to adjust accordingly.

### Strict MSP payload length checking

In order to help mitigate the "randomly changed settings" bug, strict MSP payload length checking has been implemented. Fixed size MSP frames that do not specify the correct payload size will be rejected.  The INAV Configurator and mwptools (mwp etc.) are compliant. In the case of 3rd party INAV configuration / mission planning / monitoring apps, this change might break interoperability if the app was not correctly setting the payload size. `SpeedyBee` developers have been notified, other apps may have to adjust accordingly.

## Upgrading from a previous release

### Upgrading from INAV 4 and 4.1

0. Download and install the new [configurator](https://github.com/iNavFlight/inav-configurator/releases)
1. Save to a file the current _diff all_ from the CLI.
2. Upgrade to INAV 5.0 using the Full Erase option in the configurator.
3. Upload your OSD font of choice from the OSD tab.
4. Go to the CLI again and paste the above-described contents from the file you previously created and write _save_ , press ENTER.
5. There are a large number of new, changed, and removed settings. Check carefully that the settings are correct and fix any unrecognized or out-of-range items from the saved configuration.
6. You should be ready, explore new 5.0 features, and enjoy!

### Upgrading from older versions

Please follow the instructions on [this](https://github.com/iNavFlight/inav/wiki/Upgrading-from-an-older-version-of-INAV-to-the-current-version) page.

## Important changes

### Configurable outputs mode

INAV allows changing the function assignment of **ALL** PWM outputs. Bear in mind, that it's not resource mapping! This function allows assigning all outputs as motors or all outputs as servos. It's driven by CLI `output_mode` setting

* `AUTO` assigns outputs according to the default mapping
* `SERVOS` assigns all outputs to servos
* `MOTORS` assigns all outputs to motors

### Improved landing detection

Updates landing detection for multirotor and add detection for fixed-wing. Detects when flying and activates landing detection from that point. Multirotor detection was added for non-autonomous landing as well as RTH. Fixed-wing detection is based on velocity, axis rates, and finally absolute movement in roll and pitch (so it probably wouldn't work if stuck in a tree being blown around by the wind). For details see https://github.com/iNavFlight/inav/pull/7270

### Add the ability to adjust LED Strip color with RC channel

LED hue can be updated with an RC channel. For example, CLI `led 7 8,10::H:6` will adjust hue of LED number 7 based on RC channel 6. For details see https://github.com/iNavFlight/inav/pull/7618 

### An option to not calibrate the gyro during boot

This feature allows to arm of INAV aircraft on a boat or any other moving vehicle, as it allows to use of stored gyro calibration value instead of calibrating on every boot.

* `init_gyro_cal` If defined to OFF, it will ignore the gyroscope calibration done at each startup. Instead, the gyroscope's last calibration from when you calibrated will be used. It also means you don't have to keep the UAV stationary during a startup.
* `gyro_zero_x` gyro X calibration stored
* `gyro_zero_y` gyro Y calibration stored
* `gyro_zero_z` gyro Z calibration stored

### WP mission waypoint enforce altitude option

Provides an option to force mission waypoint altitude to be achieved before moving on to the next waypoint. If the set altitude hasn't been achieved when the craft arrives at the waypoint it will hold and adjust the altitude as required with a target margin of 100cm. Planes use a spiral loiter whilst changing altitude. The option is set for the whole mission and applicable to basic and timed hold waypoints. For details see https://github.com/iNavFlight/inav/pull/7644

### Improved Altitude Hold controller

INAV will now use the `SQRT` controller for Altitude Control on Multirotors. No extra pilot action required. For details see https://github.com/iNavFlight/inav/pull/7845

### TBS Sixty9 SA2.1 UART Configuration

Adds the `vtx_smartaudio_stopbits` setting that when set to `1` fixes the TBS Sixty9 SmartAudio 2.1 issues.

### Rangefinder in Logic Conditions

Adds following value as Logic Conditions Operands:

* `AGL_STATUS` boolean `1` when AGL can be trusted, `0` when AGL estimate can not be trusted
* `AGL` integer Above The Groud Altitude in `cm`
* `RANGEFINDER_RAW` integer raw distance provided by the rangefinder in `cm`

### Matek 1G3SE control via IRC Tramp

To use the Matek 1G3SE with IRC Tramp. You will need to enter the CLI command set `vtx_frequency_group = FREQUENCYGROUP_1G3`. You must also make sure that the initial VTx settings in the configuration tab are in a valid range. They are:

* `vtx_band` 1 or 2
* `vtx_channel` between 1 and 9
As part of this change.

The default VTx band has been changed from 4 to 1. If you are updating, please check that the band is still correct for your setup.

For details see https://github.com/iNavFlight/inav/pull/7949

### Motor update frequency changes

`motor_pwm_rate` setting is right now used only in case on `BRUSHED` motor output. `STANDARD`, `ONESHOT125`, `MULTISHOT` and all `DSHOT` protocols use predefined update rate that can not be changed

### PWM function mapping change for some targets

`KAKUTEH7`, `MAMBAF722_2022A` and `MAMBAH743` have now 4 motor and 4 servo outputs by default. To enable `X8` mode, CLI `set output_mode=MOTORS` command has to be used.

`SPEEDYBEEF4` has now the following pin assignment in the fixed wing mode:
* S1-S4 - Servo
* S5-S6 - Motor
* S7 - Servo

## New targets

* Holybro Kakute H7 Mini **KAKUTEH7MINI**
* Diatone Mamba F405_2022A **MAMBAF405_2022A**
* Diatone Mamba F722_2022A **MAMBAF722_2022A**
* Mateksys F411TE **MATEKF411TE**
* Mateksys F405TE **MATEKF405TE** and **MATEKF405TE_SD**
* Foxeer F745 AIO **FOXEERF745AIO**
* AOCODARCF7DUAL

## CLI

### Changed settings

| Name | Values |
| ---- | ------ |
| debug_modes | New:  `LANDING` |
| servo_protocol | Removed:  `SERVO_DRIVER` |

### New Settings
| Name | Description |
| ---- | ------ |
| ground_test_mode | For developer ground test use. Disables motors, sets heading status = Trusted on FW. Default: FALSE |
| gyro_zero_x | Calculated gyro zero calibration of axis X Values: -32768 - 32767 Default: 0 |
| gyro_zero_y | Calculated gyro zero calibration of axis Y Values: -32768 - 32767 Default: 0 |
| gyro_zero_z | Calculated gyro zero calibration of axis Z Values: -32768 - 32767 Default: 0 |
| init_gyro_cal | If defined to 'OFF', it will ignore the gyroscope calibration done at each startup. Instead, the gyroscope last calibration from when you calibrated will be used. It also means you don't have to keep the UAV stationary during a startup. Default: TRUE |
| ins_gravity_cmss | Calculated 1G of Acc axis Z to use in INS Values: 0 - 2000 Default: 0.0 |
| nav_fw_auto_disarm_delay | Delay before plane disarms when `nav_disarm_on_landing` is set (ms) Values: 100 - 10000 Default: 2000 |
| nav_wp_enforce_altitude | Forces craft to achieve the set WP altitude as well as position before moving to next WP. Position is held and altitude adjusted as required before moving on. Default: FALSE |
| osd_mah_used_precision | Number of digits used to display mAh used. Values: 4 - 6 Default: 4 |
| osd_switch_indicator_one_channnel | RC Channel to use for OSD switch indicator 1. Default: 5 |
| osd_switch_indicator_one_name | Character to use for OSD switch incicator 1. Values: 0 - 5 Default: GEAR |
| osd_switch_indicator_three_channnel | RC Channel to use for OSD switch indicator 3. Default: 5 |
| osd_switch_indicator_three_name | Character to use for OSD switch incicator 3. Values: 0 - 5 Default: LIGT |
| osd_switch_indicator_two_channnel | RC Channel to use for OSD switch indicator 2. Default: 5 |
| osd_switch_indicator_two_name | Character to use for OSD switch incicator 2. Values: 0 - 5 Default: CAM |
| osd_switch_indicator_zero_channnel | RC Channel to use for OSD switch indicator 0. Default: 5 |
| osd_switch_indicator_zero_name | Character to use for OSD switch incicator 0. Values: 0 - 5 Default: FLAP |
| osd_switch_indicators_align_left | Align text to left of switch indicators Default: TRUE |
| osd_system_msg_display_time | System message display cycle time for multiple messages (milliseconds). Values: 500 - 5000 Default: 1000 |
| output_mode | Output function assignment mode. AUTO assigns outputs according to the default mapping, SERVOS assigns all outputs to servos, MOTORS assigns all outputs to motors Default: AUTO |
| vtx_frequency_group | VTx Frequency group to use. Frequency groups: FREQUENCYGROUP_5G8: 5.8GHz, FREQUENCYGROUP_2G4: 2.4GHz, FREQUENCYGROUP_1G3: 1.3GHz. Values: 0 - 2 Default: FREQUENCYGROUP_5G8 |
| vtx_smartaudio_stopbits | Set stopbit count for serial (TBS Sixty9 SmartAudio 2.1 require value of 1 bit) Values: 1 - 2 Default: 2 |
| vtx_softserial_shortstop | Enable the 3x shorter stopbit on softserial. Need for some IRC Tramp VTXes. Default: FALSE |

### Removed Items

| Name | Description |
| ---- | ------ |
| align_acc |  Use `align_board_yaw` |
| align_gyro |  Use `align_board_yaw` |

## Changelist

* Add FOXEER F745 AIO Target by @giacomo892 in https://github.com/iNavFlight/inav/pull/7764
* Update Battery.md by @MrD-RC in https://github.com/iNavFlight/inav/pull/7800
* Added some comparative operations to Programming by @MrD-RC in https://github.com/iNavFlight/inav/pull/7803
* [fc_core.c] Make use of macro US2S by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7777
* Fix compilation when USE_SECONDARY_IMU not defined by @mluessi in https://github.com/iNavFlight/inav/pull/7770
* Change Power to Square by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7727
* Mode availability improvements by @breadoven in https://github.com/iNavFlight/inav/pull/7694
* Battery cells in logic condition by @kernel-machine in https://github.com/iNavFlight/inav/pull/7814
* Add macros to multicopter land detector by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7768
* [maths.h] Add Macro to convert Celsius to Kelvin by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7767
* Remove duplicate semicolon by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7806
* Release 4.1 by @DzikuVx in https://github.com/iNavFlight/inav/pull/7681
* Reversible ESC's for rovers: Don't start motor with high throttle in the mid of the stick by @yajo10 in https://github.com/iNavFlight/inav/pull/7714
* [cli.c] Fix external Flash Memory by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7695
* System message variable display time + setting option by @breadoven in https://github.com/iNavFlight/inav/pull/6850
* [gyro.c] An option to not calibrate the gyro during boot by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7624
* WP mission waypoint enforce altitude option by @breadoven in https://github.com/iNavFlight/inav/pull/7644
* SpeedyBeeF7 No led strip #7234 by @andreapede in https://github.com/iNavFlight/inav/pull/7753
* Crsf power states redo by @OptimusTi in https://github.com/iNavFlight/inav/pull/7811
* Docker build script shebang fix and extended usage notes by @krasiyan in https://github.com/iNavFlight/inav/pull/7793
* Add ADC3 support on H7 by @dawr68 in https://github.com/iNavFlight/inav/pull/7824
* Add support for Omron 2SMPB-02B barometer by @mluessi in https://github.com/iNavFlight/inav/pull/7755
* Omnibus F7.md - mention OMNIBUSF7NXT by @MorrisR2 in https://github.com/iNavFlight/inav/pull/7751
* [maths.c] Add 2D and 3D Pythagorean functions by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7746
* Dzikuvx depreciated MSP frames by @DzikuVx in https://github.com/iNavFlight/inav/pull/7854
* Update AUTHORS by @MrD-RC in https://github.com/iNavFlight/inav/pull/7848
* Add ability to adjust LED Strip color with RC channel by @jeffhendrix in https://github.com/iNavFlight/inav/pull/7618
* Drop MSP_CF_SERIAL_CONFIG and MSP_SET_CF_SERIAL_CONFIG frames by @DzikuVx in https://github.com/iNavFlight/inav/pull/7852
* Add macros to active box and reset boxes count by @DzikuVx in https://github.com/iNavFlight/inav/pull/7844
* Fix ins_gravity_cmss out of range error by @DzikuVx in https://github.com/iNavFlight/inav/pull/7859
* [navigation for multirotor] Sqrt Controller for Alt-Hold and improvements by @DzikuVx in https://github.com/iNavFlight/inav/pull/7845
* BMI270: Fix acc alignment by @mluessi in https://github.com/iNavFlight/inav/pull/7769
* update Cli.md for 4.1/5.0 usage by @stronnag in https://github.com/iNavFlight/inav/pull/7870
* [navigation.c] Replace the position estimate check by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7698
* Nav launch abort improvements by @breadoven in https://github.com/iNavFlight/inav/pull/7642
* Landing detection revamp by @breadoven in https://github.com/iNavFlight/inav/pull/7270
* apply stricter payload size checks by @stronnag in https://github.com/iNavFlight/inav/pull/7891
* Adjust CMS and statistics page layout for HD OSD by @geoffsim in https://github.com/iNavFlight/inav/pull/7871
* Blackbox fields selection on GUI by @kernel-machine in https://github.com/iNavFlight/inav/pull/7896
* Add support to BMI270 for IFLIGHT BLITZ F722 by @Guidus93 in https://github.com/iNavFlight/inav/pull/7890
* Update to the Telemetry.md docs by @DzikuVx in https://github.com/iNavFlight/inav/pull/7903
* Remove "USE_NAV" define by @breadoven in https://github.com/iNavFlight/inav/pull/7909
* remove NAV_GPS_GLITCH_DETECTION by @stronnag in https://github.com/iNavFlight/inav/pull/7907
* Add LANDING debug by @breadoven in https://github.com/iNavFlight/inav/pull/7904
* update target hardware platforms for 4.1 by @stronnag in https://github.com/iNavFlight/inav/pull/7912
* RTH sanity checking emergency landing fix by @breadoven in https://github.com/iNavFlight/inav/pull/7790
* Replace Sqrt Initialization by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/7925
* Add BMI270 to HGLRCF722 by @DzikuVx in https://github.com/iNavFlight/inav/pull/7939
* Configurable outputs mode by @DzikuVx in https://github.com/iNavFlight/inav/pull/7928
* document use of `ninja` as build manager by @stronnag in https://github.com/iNavFlight/inav/pull/7942
* Update Blackbox.md by @Dope-johnny in https://github.com/iNavFlight/inav/pull/7943
* serial: fix compile error when both GPS_UART and SMARTAUDIO_UART are defined by @snaewe in https://github.com/iNavFlight/inav/pull/7911
* Hardware Debugging from VSCode and WSL manual by @erstec in https://github.com/iNavFlight/inav/pull/7945
* Update Windows 11 - VS Code - WSL2 - Hardware Debugging.md by @erstec in https://github.com/iNavFlight/inav/pull/7946
* Update of project files by @erstec in https://github.com/iNavFlight/inav/pull/7951
* Ground test mode by @breadoven in https://github.com/iNavFlight/inav/pull/7921
* RTH sanity checking safehome fix by @breadoven in https://github.com/iNavFlight/inav/pull/7917
* Hardware Debugging in Visual Studio Code and WSL (Method 2) by @Scavanger in https://github.com/iNavFlight/inav/pull/7950
* BLE Support  by @Scavanger in https://github.com/iNavFlight/inav/pull/7931
* Added missing notes by @MrD-RC in https://github.com/iNavFlight/inav/pull/7966
* Enable MPU6500 on MambaF722_I2C by @DzikuVx in https://github.com/iNavFlight/inav/pull/7965
* Re-fix for up/down arrows of the relative altitude (ESP32 radar) by @OlivierC-FR in https://github.com/iNavFlight/inav/pull/7914
* MAMBAF722_2022A target by @DzikuVx in https://github.com/iNavFlight/inav/pull/7968
* MAMBAF405_2022A target by @DzikuVx in https://github.com/iNavFlight/inav/pull/7970
* Allow Flight Axis stabilization targets from Logic Conditions  by @DzikuVx in https://github.com/iNavFlight/inav/pull/7964
* Add switch position indicators to the OSD by @MrD-RC in https://github.com/iNavFlight/inav/pull/7734
* Add MatekF411TE Target by @MATEKSYS in https://github.com/iNavFlight/inav/pull/7947
* Add MatekF405TE and MatekF405TE_SD Targets by @MATEKSYS in https://github.com/iNavFlight/inav/pull/7924
* Fixing the missing commands to ESC by @Odin263 in https://github.com/iNavFlight/inav/pull/7733
* Add ICM42688p in MatekH743 by @MATEKSYS in https://github.com/iNavFlight/inav/pull/7974
* update Telemetry.md by @stronnag in https://github.com/iNavFlight/inav/pull/7978
* Update Programming Framework.md by @Jullibach in https://github.com/iNavFlight/inav/pull/7980
* Fix for MambaH743 DMA assignment by @DzikuVx in https://github.com/iNavFlight/inav/pull/7989
* Fix KakuteH7 DMA ADC/LED Conflict by @DzikuVx in https://github.com/iNavFlight/inav/pull/7990
* TMOTORF7V2 BlackBox fix by @erstec in https://github.com/iNavFlight/inav/pull/7955
* VTX SoftSerial StopBit Time by @erstec in https://github.com/iNavFlight/inav/pull/7969
* Change fallback ESC protocol to Multishot when DSHOT is not available by @DzikuVx in https://github.com/iNavFlight/inav/pull/7977
* Docs update by @DzikuVx in https://github.com/iNavFlight/inav/pull/7992
* Failsafe RC adjustment bug fix by @breadoven in https://github.com/iNavFlight/inav/pull/7829
* Target output mapping update by @DzikuVx in https://github.com/iNavFlight/inav/pull/7993
* [DOC] update Development.md building / running unit tests by @stronnag in https://github.com/iNavFlight/inav/pull/7997
* Add new target AOCODARCF7DUAL by @dlt2018 in https://github.com/iNavFlight/inav/pull/7994
* Matek 1G3SE control via IRC Tramp by @MrD-RC in https://github.com/iNavFlight/inav/pull/7949
* ESP32 Radar: Added support for missing OSD unit types by @MrD-RC in https://github.com/iNavFlight/inav/pull/7972
* Enhance mAh Used OSD Element by @MrD-RC in https://github.com/iNavFlight/inav/pull/7868
* New target JHEMCU GH743AIO / iFlight Beast H7 55A AIO by @dawr68 in https://github.com/iNavFlight/inav/pull/7889
* iFlight Beast H7 V2 I2C2 on UART 3 by @ltwin8 in https://github.com/iNavFlight/inav/pull/7962
* Dzikuvx add rangefinder to logic conditions by @DzikuVx in https://github.com/iNavFlight/inav/pull/7984
* Docs update by @DzikuVx in https://github.com/iNavFlight/inav/pull/8013
* Pitot Tube:Add, Move and Rename macros by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/8011
* Drop gyro and acc alignment settings by @DzikuVx in https://github.com/iNavFlight/inav/pull/8016
* TBS Sixty9 SA2.1 UART Configuration by @erstec in https://github.com/iNavFlight/inav/pull/7985
* Increase Logic Conditions to 64 by @MrD-RC in https://github.com/iNavFlight/inav/pull/8022
* Added Fixed Wing TPA Time Constant to in flight adjustments by @MrD-RC in https://github.com/iNavFlight/inav/pull/8023
* Update dynamic_gyro_notch_min_hz range by @DzikuVx in https://github.com/iNavFlight/inav/pull/8021
* Update VTx.md by @erstec in https://github.com/iNavFlight/inav/pull/8030
* Drop PCA9685 support by @DzikuVx in https://github.com/iNavFlight/inav/pull/8032
* Added FW level trim to in flight adjustments by @MrD-RC in https://github.com/iNavFlight/inav/pull/8028
* Kakute H7 Mini target by @DzikuVx in https://github.com/iNavFlight/inav/pull/8033
* Add Pos Control Jerk Limit Macro by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/8038
* Update PG version for logic conditions by @MrD-RC in https://github.com/iNavFlight/inav/pull/8039
* [DOC] minor updates to Blackbox.md by @stronnag in https://github.com/iNavFlight/inav/pull/8040
* Add detail to airspeed sensor data by @MrD-RC in https://github.com/iNavFlight/inav/pull/8043
* Fix RTH Climb First enum ambiguity by @breadoven in https://github.com/iNavFlight/inav/pull/8069
* Refactor u-blox hardware version detection; Add support for u-blox 10 series [#8058](https://github.com/iNavFlight/inav/pull/8058)
* short_stop bit misassignment fix by @erstec in https://github.com/iNavFlight/inav/pull/8091
* Fix issue with MSP Baro (Box enum only) by @JulioCesarMatias in https://github.com/iNavFlight/inav/pull/8083
* BMI270 Gyro added for target SKYSTARSF405HD by @erstec in https://github.com/iNavFlight/inav/pull/8087
* SpeedyBee F4 output mapping change by @DzikuVx in https://github.com/iNavFlight/inav/pull/8100
* Refactor ESC refresh rate by @DzikuVx in https://github.com/iNavFlight/inav/pull/8099

## New Contributors
* @yajo10 made their first contribution in https://github.com/iNavFlight/inav/pull/7714
* @andreapede made their first contribution in https://github.com/iNavFlight/inav/pull/7753
* @krasiyan made their first contribution in https://github.com/iNavFlight/inav/pull/7793
* @dawr68 made their first contribution in https://github.com/iNavFlight/inav/pull/7824
* @Guidus93 made their first contribution in https://github.com/iNavFlight/inav/pull/7890
* @Dope-johnny made their first contribution in https://github.com/iNavFlight/inav/pull/7943
* @Odin263 made their first contribution in https://github.com/iNavFlight/inav/pull/7733
* @Jullibach made their first contribution in https://github.com/iNavFlight/inav/pull/7980
* @dlt2018 made their first contribution in https://github.com/iNavFlight/inav/pull/7994
* @ltwin8 made their first contribution in https://github.com/iNavFlight/inav/pull/7962

The full list of changes is available [here](https://github.com/iNavFlight/inav/pulls?q=is%3Apr+milestone%3A5.0+is%3Aclosed)
The full list of INAV Configurator changes is available [here](https://github.com/iNavFlight/inav-configurator/pulls?q=is%3Apr+milestone%3A5.0+is%3Aclosed)