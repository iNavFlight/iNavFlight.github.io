---
title: Something is disabled
---

## Something is disabled

iNav may fail to perform some action as expected, typically arming or engaging waypoints. This articles documents the reasons for some of these events. 

## Arming disabled reasons

iNav will refuse to arm for the following reasons (e.g. from cli `status`):

| Reason  (CLI Mnemonic) | Bit Mask (Hex) | Explanation |
| ------ | ----- | ----------- |
| `FS` | `00000080` | The RX is not recognised as providing a valid signal |
| `ANGLE` | `00000100` |  The vehicle is not level as defined by the CLI `small_angle` setting |
| `CAL` |  `00000200` | The pre-arm sensor calibration has not completed. The barometer is somewhat susceptible to lengthy calibration, which may be mitigated by the CLI setting `baro_cal_tolerance`, e.g. `set baro_cal_tolerance = 500` (find a suitable value by experimentation). |
| `OVRLD` |  `00000400` | The CPU load is excessive. May be caused by too an aggressive loop time setting. |
| `NAV` | `00000800` | Where the CLI setting `nav_extra_arming_safety = ON` is used, this may be caused by reasons shown in the [table below](#navigation-unsafe-reasons) |
| `COMPASS` | `00001000` | The compass is not calibrated. Perform the calibration procedure |
| `ACC` | `00002000` | The accelerometer is not calibrated. Perform the 6 point calibration procedure |
| `ARMSW` | `00004000` | The arm switch was engaged as the FC booted |
| `HWFAIL` | `00008000`| A required hardware device has failed / is not recognised (e.g. GPS, Compass, Baro) |
| `BOXFS` | `00010000` | A failsafe switch is engaged |
| `KILLSW` | `00020000` | A kill switch is engaged |
| `RX` | `00040000` | The RC link is not detected (RX not detected) |
| `THR` | `00080000` | The throttle setting is not a minimum |
| `CLI` | `00100000` | The CLI is active (note: you will always /unavoidably see this when in the CLI) |
| `CMS` | `00200000` | The CMS menu is active |
| `OSD` | `00400000` | The OSD menu is active |
| `ROLL/PITCH` | `00800000` | Roll and/or pitch is not centred |
| `AUTOTRIM` | `01000000` | Servo autotrim is engaged |
| `OOM ` | `02000000` | The FC is out of memory |
| `SETTINGFAIL` | `04000000` | A CLI setting is out of range. The erroneous setting should be indicated in a CLI `dump`. If you can't then reset the offending setting, reflash with full chip erase and reapplying settings from scratch may help.|
| `PWMOUT` | `08000000` | PWM output error. Motor or servo output initialisation failed. | 
| `NOPREARM` | `10000000` | PREARM is enabled and timed out  |
| `DSHOTBEEPER` | `20000000` | DSHOTBEEPER is enabled and is active |

Note: On older processors, just the bitmask is shown, which can be decoded by the numeric values in the table. A numeric value may be a combination of conditions, for example:

```
0x184000 = 00100000 + 00080000 + 00004000 (CLI active, throttle not at minimum, arm engaged)
```
The values are correct for iNav 4.0.0 as of 2021-12.

### Navigation Unsafe reasons

Requires that a navigation mode (which includes failsafe RTH) is configured

| Navigation Unsafe |
| ------------------ |
| The GPS has insufficient satellites (this is checked even if you disable GPS, but have a NAV mode configured in Modes tab) |
| A navigation switch is engaged (e.g.PH, WP, RTH) |
| First WP distance exceeded |
| Satellite quality is unacceptable: EPH/EPV > 10m (note the limit in the CLI `inav_max_eph_epv` is in cm, default 1000) |
| The WP mission contains an invalid JUMP sequence | 
| The first waypoint is beyond the distance defined by the CLI setting `nav_wp_safe_distance`. |

*  `nav_wp_safe_distance` : The default is 100m (10000cm, as the value is entered in cm), 0 disables this check.

	```
	# get nav_wp_safe_distance
	nav_wp_safe_distance = 10000
	Allowed range: 0 - 65000
	``` 
* Invalid JUMP.
    - First item can't be JUMP (can't calculate 1st WP distance, impossible for backward jumps)
    - Can't jump to immediately adjacent WPs (pointless)
    - Can't jump beyond WP list (undefined behaviour)
    - Can only jump to geo-referenced WPs (otherwise, undefined behaviour)

## Waypoints will not execute

The pilot *thinks* that they have loaded a waypoint mission, but the mission will not execute when the assigned switch is engaged.

* No mission is actually loaded into the FC. Note that waypints have to be in volatile memory (that is cleared on powercycle), not in EEPROM. If waypoints have been saved to EEPROM it is necessary to restore the WPs to volatile memory before the mission can be executed.

* The Fixed Wing aircraft is in `MANUAL` / `PASSTHROUGH` mode.

* The craft is currently executing RTH

## RTH fails to engage

* The GPS signal is degraded (eph / epv exceed, CLI setting `inav_max_eph_epv`)

## Diagnostics

Diagnosing arming failure and WP execution failure often requires the use of a tool external to the FC; the following may help:

* The iNav configurator displays reasons for arming failure
* A blackbox log provides post event diagnostics
* The iNav CLI (available from a terminal, the configurator and many ground-stations) displays arming disabled reasons:

	```
	# status
	...
	Arming disabled flags: NAV HWFAIL RX CLI
	```
* A ground station may provide diagnostics, for example [mwp](https://github.com/stronnag/mwptools) provides an 'Arming Disabled' alert icon with 'popover' description / explanation, mission upload validation checks and 'first WP distance' exceeded warnings.
* Video explanation via https://quadmeup.com/troubleshooting-inav-why-inav-is-not-arming/
* **Your favourite diagnostic tool / technique goes here**

## Postscript

For 'Navigation is unsafe', you may, of course `set nav_extra_arming_safety = ALLOW_BYPASS`; however there is a clue is in the name. There is also `nav_extra_arming_safety = OFF`, which is not recommended. At least with `ALLOW_BYPASS` you know you've done something potentially dangerous.