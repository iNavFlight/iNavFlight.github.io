---
title: iNav for BetaFlight Users
---

Do you already know how to setup and fly a BetaFlight multirotor, and are now willing to try INAV?

**Good**! You are in the right place.

INAV and BetaFlight were forks from CleanFlight. But nowadays they are both very different from each other.

While BetaFlight evolved to provide good flight performance for multirotors in **ACRO** mode, INAV evolved to provide flight reliability, navigation capabilities and vehicle configuration diversity.

INAV works on quadcopters like BetaFlight, but it also works on [bi|tri|hexa|octa]copters, fixed-wing aircrafts like airplanes, gliders and flying wings, rovers like cars and tanks, and boats.

Besides this big differences, INAV and BetaFlight still share lots of features in common, and it's quite normal to see some code being ported to and from one flight controller software to another.

If you already know how to setup a BetaFlight multirotor aircraft, you already know most of what you need to setup an INAV multirotor as well. The INAV configurator and the BetaFlight configurator are very similar. You probably won’t have any problems understanding it. To flash INAV on your Flight Controller board, the process is the same: Go to the Firmware Flasher tab on the INAV Configurator and select the proper TARGET.

Let's then review the differences:

* Not all Flight Controller boards have a proper target for INAV. But the most common ones do.
* After flashing, the first time you connect your FC board to INAV configurator, it'll ask you to load a preset. Do it, as it'll make things easier from now on.
* The accelerometer and gyroscope calibration is mandatory on INAV, and it’s a 6-step process (different from BetaFlight, which is an optional single-step process). Follow the on-screen instructions and you’ll be fine.
* For a fully autonomous multirotor (with automatic navigation capabilities like RTH, Poshold and WP Missions). The Flight Controller board should have an onboard barometer sensor. INAV's multicopter navigation altitude precision will suffer without one.
* Also, you have to cover the barometer sensor with a small piece of open-cell foam, because the wind affects the sensor readings. This is the most common cause of altitude holding problems.
* Prior to 7.1 release. The GNSS module should be fitted with a magnetometer sensor for best navigation precision. GNSS modules without a mag sensor will work from 7.1 on-wards for copter navigation. [See requirements](../quickstart/GPS-and-Compass-setup.md)

* The GPS module should be mounted on a small mast pole to avoid magnetic interference from motors on the compass; 5 or 6 centimeters above motors should be fine.

<img src="https://user-images.githubusercontent.com/17026744/68337067-7aaa7880-00be-11ea-8096-e6b9c74abb0a.jpg" width="300" alt="FPV Quadcopter with GPS mast" />

_FPV Quadcopter with GPS mast_


* INAV does NOT have a complete resource mapping feature. But it does support timer output mapping for motors and servo's.
* INAV supports DShot ESC protocol, but not to the same level as BetaFlight. DShot 150, 300 or 600 is more than enough for a reliable flight. Faster protocols will reduce the reliability on larger copters, due to ESC signal interference on long wire runs.
* INAV supports loop frequencies up to 4kHz without i2C devices. Although, for reliable navigation performance its should be limited to 2kHz with i2C devices.
* DShot telemetry and beeper is supported, but not Bi-directional. Only single-wire telemetry.

### Most important settings you should take a look at before your first flight

* `set nav_mc_hover_thr` # Is the base throttle value your copter will use for holding altitude while hovering. Must be set for Poshold operation.
* `set max_angle_inclination_rll = 600` # Maximum bank angle allowed in ANGLE mode, in decidegrees (for roll)
* `set max_angle_inclination_pit = 450` # Maximum bank angle allowed in ANGLE mode, in decidegrees (for pitch)
* `set nav_mc_bank_angle = 27` # Max bank angle that the aircraft will command in automated or position control modes, in degrees. (constrained by max_angle_inclination_rll and max_angle_inclination_pit)
* `set throttle_idle =  5` # Set the minimal motor speed (in percent). The default is 15, which can be high for modern ESCs.
* `set small_angle = 180` # Let aircraft arm in any angle
* `set gps_ublox_use_galileo = ON` # Let GNSS module use galileo satellites if it is supported (check local constellation availability)
* `set nav_extra_arming_safety = ALLOW_BYPASS` # Let aircraft arm without GPS 3D fix (Caution: RTH position will not be recorded)
* `set nav_wp_radius = 500` # Radius in centimeters to consider a waypoint reached.
* `set nav_wp_safe_distance = 400` # If the first waypoint of a loaded mission is further than this value (in meters).
* `set nav_auto_speed = 2000` # Maximum copter ground speed in automated modes (in centimeters per second)
* `set nav_auto_climb_rate = 600` # Aircraft vertical speed on automatic modes (centimeters per second)
* `set nav_rth_allow_landing = ALWAYS` # Allow copter to land by itself after RTH or FS.
* `set nav_rth_altitude = 5000` # Altitude that aircraft will try to reach when doing RTH (in centimeters)
* `set nav_rth_alt_mode = AT_LEAST` # Allow aircraft to come home descending to the RTH altitude. It saves energy by trading altitude for speed.

![](https://i.imgur.com/CPgKb4w.png)

_Linear descend demonstration graphic_
