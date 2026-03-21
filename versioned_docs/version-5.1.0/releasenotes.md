---
title: Release Notes
sidebar_position: 2
---

![INAV Banner](/img/inav_banner.png)

## Hello and welcome to INAV 5.1 "Ballistic Buzzard"

Please carefully read all of this document for the best possible experience and safety.

<!-- truncate -->

## Important Notes

### Config wipe mitigation

INAV 5.1 lowers the probablity of a full config wipe on reboot. Bear in mind, technically it's not a bug. When FC is disconnected during EEPROM write, checksum will not updated and INAV will erase flash on next boot as a safety measure. To prevent this from happening, always wait until INAV fully reboots before disconnecting the flight controller.

### Mamba H743 and ZEEZF7 V2 external flash

INAV 5.1 supports 128Mbit W25N01G flash memory that can be found on Mamba H743 and ZEEZF7 V2.

### Horizon Drift mitigation

To improve AHI drift on fixed wings, apply following settings via CLI:

#### For airplanes without a tail (wings, delta, etc)
```
set imu_acc_ignore_rate = 9
set imu_acc_ignore_slope = 5
set nav_fw_pos_z_p = 35
set nav_fw_pos_z_i = 5
set nav_fw_pos_z_d = 10
set nav_fw_pos_xy_p = 70
set imu_dcm_kp = 1000
set imu_dcm_ki = 0
```

#### For airplanes with a tail (dedicated elevator)
```
set imu_acc_ignore_rate = 7
set imu_acc_ignore_slope = 4
set nav_fw_pos_z_p = 25
set nav_fw_pos_z_i = 5
set nav_fw_pos_z_d = 7
set nav_fw_pos_xy_p = 55
set imu_dcm_kp = 1000
set imu_dcm_ki = 0
```

## Upgrading from a previous release

### Upgrading from INAV 5

0. Download and install the new [configurator](https://github.com/iNavFlight/inav-configurator/releases)
1. Save to a file the current _diff all_ from the CLI.
2. Upgrade to INAV 5.1 using the Full Erase option in the configurator.
3. Upload your OSD font of choice from the OSD tab.
4. Go to the CLI again and paste the above-described contents from the file you previously created and write _save_ , press ENTER.
6. You should be ready, explore new 5.1 features, and enjoy!

### Upgrading from older versions

Please follow the instructions on [this](https://github.com/iNavFlight/inav/wiki/Upgrading-from-an-older-version-of-INAV-to-the-current-version) page.

## Important changes

## New targets

* SpeedyBee F7 V3
* AtomRC F405 NAVI
* iFlight JB F7 Pro
* iFlight Blitz F7 Pro

## CLI

### New Settings

* `nav_fw_launch_abort_deadband` Launch abort stick deadband in [r/c points], applied after r/c deadband and expo. The Roll/Pitch stick needs to be deflected beyond this deadband to abort the launch.

### What's Changed
* Do not automatically persist the gyro calibration by @DzikuVx in https://github.com/iNavFlight/inav/pull/8216
* Add PINIO support to Matek F405 SE by @MrD-RC in https://github.com/iNavFlight/inav/pull/8256
* Make programming framework CLI safe by @MrD-RC in https://github.com/iNavFlight/inav/pull/8266
* Fix esc temperature sensor maxing out by @MrD-RC in https://github.com/iNavFlight/inav/pull/8299
* Speedybee F7 V3 by @DzikuVx in https://github.com/iNavFlight/inav/pull/8317
* AtomRC F405 NAVI target by @DzikuVx in https://github.com/iNavFlight/inav/pull/8321
* iFlight BLITZF7PRO target by @nmaggioni in https://github.com/iNavFlight/inav/pull/8335
* iFlight JBF7PRO target by @nmaggioni in https://github.com/iNavFlight/inav/pull/8334


**Full Changelog**: https://github.com/iNavFlight/inav/compare/5.0.0...5.1.0

The full list of changes is available [here](https://github.com/iNavFlight/inav/pulls?q=is%3Apr+milestone%3A5.1+is%3Aclosed)

The full list of INAV Configurator changes is available [here](https://github.com/iNavFlight/inav-configurator/pulls?q=is%3Apr+milestone%3A5.1+is%3Aclosed)