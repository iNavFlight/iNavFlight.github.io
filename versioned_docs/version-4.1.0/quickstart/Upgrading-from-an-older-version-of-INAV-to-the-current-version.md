---
title: Upgrading From An Older Version of INAV
---

![](http://static.rcgroups.net/forums/attachments/6/1/0/3/7/6/a9088858-102-inav.png)

This page is intended to make it easy for you to upgrade your INAV older version to the current INAV version. The process is straightforward as long as you follow the instructions detailed here.

**The current version of INAV is 2.6** (as the time this document was been last updated).

> Note that INAV version numbers has a pattern: There are three numbers separated by dots (2.6.0).
> - The first number is the major version. This number changes only when BIG changes are made on INAV.
> - The second number is the minor version. This number changes only when SMALL changes are made on INAV.
> - The third number is the revision number. This number changes only when some bug is fixed on INAV and no new functionality is added.
> 
> To determine the version, only the first two numbers are important.

In general, all comes to the following steps:
* Get the latest configurator.
* Get the current settings from your flight controller board
* Determine the current version and the TARGET of INAV firmware flashed to your flight controller board.
* Check which values has changed over the newer versions, and adjust your settings as necessary
* Flash the latest INAV firmware on your flight controller board
* Paste the adjusted settings on the Command Line Interface (CLI)
* Upload your preferred font to the OSD chip
* Take additional upgrading actions (if needed)

**Note about F1 and F3 microcontrollers**: Flight controller boards with STM32**F1** chips (like NAZE32 or CC3D) will only work up to the 1.7.3 version. Flight controller boards with STM32**F3** chips (like SPRACINGF3 or OMNIBUS) will only work up to the 2.6.0 version. We do recommend that you use a F4, F7 or H7 based Flight Controller board for new setups.

## Get the latest INAV configurator

Download and install (on your computer) the latest configurator at the [INAV Configurator Releases page](https://github.com/iNavFlight/inav-configurator/releases).

## Get all the current settings from your flight controller board

1. Open the configurator program on your computer.
2. Connect the flight controller board to the USB port on PC, then click connect button on the configurator.
3. Go to the CLI tab and type `diff all`. It should return a big text with all your settings. 
4. Copy this text and paste it on your favorite text editor (like Notepad), then save it as a backup.

## Determine your current INAV firmware version and target

On your settings file, just at the beginning, you should have something like this:

```
# version
# INAV/MATEKF405 2.2.1 Jul  3 2019 / 22:31:06 (a6d847482)
# GCC-8.2.1 20181213 (release) [gcc-8-branch revision 267074]
```

Take note of the TARGET which is just after the `INAV/` and VERSION number which is just after the target
(In this case, TARGET is **MATEKF405** and VERSION is **2.2.1**)

## Check which values has changed over the newer versions, and adjust as necessary

Now it's time to change your settings file so it becomes compatible with the latest INAV firmware. Follow your specific version instructions.

### From 2.5 to 2.6
* If you are using Home Offset feature (lines with `nav_rth_home_offset_`), then you should remove this lines and use the `safehome` function instead.
* If you are using Override Motor Stop feature (`nav_overrides_motor_stop` setting), you need to change the value of this setting by one of the new possible values, which are `OFF`, `AUTO_ONLY` or `ALL_NAV`.
* Remove this deprecated settings if present: `gyro_notch1_hz`, `gyro_notch2_hz`, `gyro_notch1_cutoff`, `gyro_notch2_cutoff`, `use_dterm_fir_filter`, `dterm_setpoint_weight`, `dterm_notch_hz`, `dterm_notch_cutoff`, `mc_iterm_relax_type`

### From 2.4 to 2.6
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Remove this deprecated settings if present: `dyn_notch_width_percent`, `dyn_notch_range`, `dyn_notch_q`, `dyn_notch_min_hz`, `rpm_dterm_filter_enabled`, `dterm_gyro_harmonic`, `rpm_dterm_min_hz`, `rpm_dterm_q`, `vtx_freq`, `gyro_notch1_hz`, `gyro_notch2_hz`, `gyro_notch1_cutoff`, `gyro_notch2_cutoff`, `use_dterm_fir_filter`, `dterm_setpoint_weight`, `dterm_notch_hz`, `dterm_notch_cutoff`, `mc_iterm_relax_type`
* If you are using Home Offset feature (lines with `nav_rth_home_offset_`), then you should remove this lines and use the `safehome` function instead.
* If you are using Override Motor Stop feature (`nav_overrides_motor_stop` setting), you need to change the value of this setting by one of the new possible values, which are `OFF`, `AUTO_ONLY` or `ALL_NAV`.

### From 2.2 or 2.3 to 2.6
* Find `min_throttle` line, and replace it by `throttle_idle`, setting the percentage of the idle throttle. The default is 15.
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Remove this deprecated settings if present: `dyn_notch_width_percent`, `dyn_notch_range`, `dyn_notch_q`, `dyn_notch_min_hz`, `rpm_dterm_filter_enabled`, `dterm_gyro_harmonic`, `rpm_dterm_min_hz`, `rpm_dterm_q`, `vtx_freq`, `gyro_notch1_hz`, `gyro_notch2_hz`, `gyro_notch1_cutoff`, `gyro_notch2_cutoff`, `use_dterm_fir_filter`, `dterm_setpoint_weight`, `dterm_notch_hz`, `dterm_notch_cutoff`, `mc_iterm_relax_type`

### From 2.0 or 2.1 to 2.6
* Find `min_throttle` line, and replace it by `throttle_idle`, setting the percentage of the idle throttle. The default is 15.
* If you are upgrading a multi rotor, POS XY PID I and D have now specific settings, respectively `nav_mc_pos_deceleration_time` and `nav_mc_pos_expo` . So if you don't use defaults, when restoring, move yours to the new settings.
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Remove this deprecated setting if present: `vtx_freq`, `gyro_notch1_hz`, `gyro_notch2_hz`, `gyro_notch1_cutoff`, `gyro_notch2_cutoff`, `use_dterm_fir_filter`, `dterm_setpoint_weight`, `dterm_notch_hz`, `dterm_notch_cutoff`, `mc_iterm_relax_type`

### From 1.9 to 2.6
* Find `min_throttle` line, and replace it by `throttle_idle`, setting the percentage of the idle throttle. The default is 15.
* If you are upgrading a multi rotor, POS XY PID I and D have now specific settings, respectively `nav_mc_pos_deceleration_time` and `nav_mc_pos_expo` . So if you don't use defaults, when restoring, move yours to the new settings.
* Delete all lines starting with: mixer acczero accgain magzero osd.
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Remove this deprecated setting if present: `vtx_freq`

### From 1.7 or 1.8 to 2.6
* Find `min_throttle` line, and replace it by `throttle_idle`, setting the percentage of the idle throttle. The default is 15.
* If you are upgrading a multi rotor, POS XY PID I and D have now specific settings, respectively `nav_mc_pos_deceleration_time` and `nav_mc_pos_expo` . So if you don't use defaults, when restoring, move yours to the new settings.
* Delete all lines starting with: mixer acczero accgain magzero osd.
* Find `vbat_scale`, `vbat_max_cell_voltage`, `vbat_warning_cell_voltage` and `vbat_min_cell_voltage` values on your settings, and multiply their values by 10.
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Remove this deprecated setting if present: `vtx_freq`

### From 1.6 to 2.6
* Find `min_throttle` line, and replace it by `throttle_idle`, setting the percentage of the idle throttle. The default is 15.
* If you are upgrading a multi rotor, POS XY PID I and D have now specific settings, respectively `nav_mc_pos_deceleration_time` and `nav_mc_pos_expo` . So if you don't use defaults, when restoring, move yours to the new settings.
* Delete all lines starting with: mixer acczero accgain magzero osd.
* Find `vbat_scale`, `vbat_max_cell_voltage`, `vbat_warning_cell_voltage` and `vbat_min_cell_voltage` values on your settings, and multiply their values by 10.
* Find `mag_hold_rate_limit` and replace by `heading_hold_rate_limit` (renamed parameter).
* Find `nav_max_speed` and replace by `nav_auto_speed` (renamed parameter).
* Find `nav_max_climb_rate` and replace by `nav_auto_climb_rate` (renamed parameter).
* Remove this deprecated settinsg if present: `vtx_freq`, `nav_fw_roll2pitch`
* `aux` lines needs to be changed. Use [this tool](https://box2perm.vercel.app/) to migrate your `aux` lines.
* Replace `yaw_motor_direction` by `motor_direction_inverted` if present
* Replace `telemetry_uart_unidir` by `telemetry_halfduplex` if present
* Find all lines starting with `servo`, and remove the fifth and the sixth arguments of the parameter. 

Example: `servo 3 1070 1950 1500 90 90 -80 -1`

Will become: `servo 3 1070 1950 1500 -80 -1`

### From 1.5 or earlier versions

Your version is A LOT outdated. We really recommend you to set everything up from scratch. Your current settings will not be as much as useful. But don't worry, INAV became much easier to set up since this version.

## Flash the lastest INAV firmware to your board
Now it's time to flash the lastest INAV firmware to your flight controller board..
* On INAV Configurator, go to the "Firmware Flasher" tab.
* Select the proper TARGET of the flight controller board.
* Make sure that the "Full Erase" option is ENABLED.
* Click "Load Firmware (Online)" button, and then after it loads the online firmware, click "Flash Firmware" button.
* Wait for the completion of the process.

## Paste the adjusted settings on the CLI
* Click the "Connect" button on INAV configurator.
* Go to the CLI tab.
* Copy all the settings text from your adjusted text file and paste on the CLI input text box, then press ENTER.
* Wait for all the settings to be typed on the output text box.
* If no errors occurred, Flight controller should save the settings and reboot by itself.

## Upload your preferred font to the OSD chip
The font file changes between versions! That's why you need to update the font stored on the OSD chip every time you upgrade INAV version in order to OSD work properly.
* Go to the OSD Tab on the Configurator.
* In the bottom right corner, there's a "Font" button. Click it.
* Select the font that best pleases you, and then click "Upload" button.
* Wait for the process to complete. Flight Controller will reboot automatically.

## If you are upgrading from version 2.5 or earlier
* If you have a compass, it has to be recalibrated!
* Do not migrate Multirotor PID and filter settings from previous releases of INAV. Use Multirotor default preset (3"-7") instead and make required changes on top of that

## If you are upgrading from version 1
There was a big update from 1.9 to 2.0, there's a new mixer framework, a new OSD framework and new calibration scales for accelerometer and magnetometer. For that reason, you'll need to set this up again and the previous settings will not work.

* Go to the Mixer tab and load and apply your desired mixer.
* Calibrate the accelerometer following the steps in the dedicated tab. Only first two steps need to be made in the right order.
* Calibration of the magnetometer should be done at the field. The magnetic field indoors can be distorted and led to a bad calibration.
* Restore manually your OSD layout using the screenshot and upload the font you like using the dedicated button.

## Check if everything is working as it should

* Carefully check all the configuration and check on the bench without installed propellers if everything looks good. In particular, check if the model preview behaves correctly when you are moving your model and check surfaces movements for an airplane.
* Arming with sticks command is not supported anymore, so if you were using sticks commands for arming, don't forget to add an arming switch in the Modes tab on the configurator.

## Enjoy the lastest INAV version!

If you done everything right, now your aircraft should be flying ok.

INAV adds lots of new features at every new version! This guide helped you to make your aircraft fly with the newer version as good as it was flying before, but now it's time learn all the new tricks that INAV can do! 
Check [this page](../advanced/New-features-over-versions-log.md) to see everything that the newer versions of INAV can do!

Enjoy!