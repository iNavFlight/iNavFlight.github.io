---
title: INAV For Betaflight Users
---

Do you already know how to setup and fly a BetaFlight multirotor, and now is willing to try INAV?

**Good**! You are on the right place.

INAV and BetaFlight are forks from CleanFlight, but nowadays they are all very different from each other.

While BetaFlight evolved to provide good flight performance for multirotors in **ACRO** mode, INAV evolved to provide flight reliability, navigation capabilities and vehicle configuration diversity.

INAV works on quadcopters like BetaFlight, but it also works on [bi|tri|hexa|octa]copters, fixed-wing aircrafts like airplanes, gliders and flying wings, rovers like cars and tanks, and boats.

Besides this big differences, INAV and BetaFlight still shares lots of features in common, and it's quite normal to see some code being ported to and from one flight controller software to another.

If you already know how to setup a BetaFlight multirotor aircraft, you already know most of what you need to setup an INAV multirotor as well. The INAV configurator and the BetaFlight configurator are very similar. You probably won’t have any problems to understand it. To flash INAV on your Flight Controller board, the process is the same: Go to Firmware Flasher tab on the INAV Configurator and select the proper TARGET.

Let's then review the differences:

* Not all Flight Controller boards has a proper target for INAV. But the most common ones do.
* After flashing, the first time you connect your FC board to INAV configurator, it'll ask you to load a preset. Do it, as it'll make things easier from now on.
* The accelerometer and gyroscope calibration is mandatory on INAV, and it’s a 6-step process (different from BetaFlight, which is an optional single-step process). Follow screen instructions and you’ll be fine.
* For a fully autonomous multirotor (with automatic navigation capabilities like RTH and WP Missions), Flight Controller board must have an onboard barometer sensor. INAV can't navigate without one (on a multirotor aircraft). 
* Also, you have to cover the barometer sensor with a small piece of non-blocking foam, because the wind affects the sensor readings. This is the most common cause of altitude holding problems.
* The GPS module must be fitted with a magnetometer sensor. GPS modules without a mag sensor do not allow INAV to navigate (on a multirotor aircraft) and will only be useful for loggin purposes.

* GPS module must be mounted on a small mast pole to avoid magnetic interference from motors on the compass. 5 or 6 centimeters above motors should be fine.

<img src="https://user-images.githubusercontent.com/17026744/68337067-7aaa7880-00be-11ea-8096-e6b9c74abb0a.jpg" width="300" alt="FPV Quadcopter with GPS mast" />

_FPV Quadcopter with GPS mast_


* INAV does NOT has the resource remapping feature, which means that **you can't change the motors order**. Be careful to wire the motors signal wires on the correct order.
* INAV supports DShot ESC protocol, but it doesn’t behave the same way as in BetaFlight. DShot 150 or 300 is more than enough for a reliable flight. Faster protocols will reduce the reliability, so avoid using them.
* INAV supports loop frequencies up to 8kHz, but flies just fine with 2kHz. There’s no real benefit to use such higher frequencies as it will only make the CPU more busy for others tasks.
* DShot telemetry is supported, but not Bi-directional single-wire telemetry.

### Most important settings you should take a look before first flight

* `set nav_mc_hover_thr = 1450` # Base throttle value that aircraft will use for altitude hold
* `set max_angle_inclination_rll = 450` # Maximum bank angle allowed in ANGLE mode, in decidegrees (for roll)
* `set max_angle_inclination_pit = 450` # Maximum bank angle allowed in ANGLE mode, in decidegrees (for pitch)
* `set nav_mc_bank_angle = 25` # Max bank angle that aircraft will do in automatic modes, in degrees (constrained by max_angle_inclination_rll and max_angle_inclination_pit)
* `set throttle_idle =  5` # Set the minimal motor speed (in percent). The default is 15, which can be high for modern ESCs.
* `set small_angle = 180` # Let aircraft arm in any angle
* `set gps_ublox_use_galileo = ON` # Let GPS module use galileo satellites if it is supported (check local regulations about it)
* `set nav_extra_arming_safety = OFF` # Let aircraft arm without GPS 3D fix (careful, navigation will not work if you do that!)
* `set nav_wp_radius = 500` # Radius in centimeters to consider a waypoint reached
* `set nav_wp_safe_distance = 20000` # If the first waypoint of a loaded mission is further than this value (in centimeters), INAV will not allow to arm.
* `set nav_auto_speed = 1300` # Aircraft ground speed on automatic modes (in centimeters per second)
* `set nav_auto_climb_rate = 200` # Aircraft vertical speed on automatic modes (centimeters per second)
* `set nav_rth_allow_landing = FS_ONLY` # Allow aircraft to land by itself only if it’s in a Failsafe state.
* `set nav_rth_altitude = 5000` # Altitude that aircraft will try to reach when doing RTH (in centimeters)
* `set nav_rth_alt_mode = AT_LEAST_LINEAR_DESCENT` # Allow aircraft to come home descending to the RTH altitude. It saves energy by trading altitude for speed.

![](https://i.imgur.com/CPgKb4w.png)

_Linear descend demonstration graphic_


