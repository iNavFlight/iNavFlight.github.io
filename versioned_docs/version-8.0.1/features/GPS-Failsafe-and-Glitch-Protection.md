---
title: GPS Failsafe and Glitch Protection
---

## Overview

GPS Systems can occasionally drop the signal (lose FIX) or provide significantly inaccurate position information (glitch). While errors are more likely in conditions where the GPS signal can bounce off multiple paths before reaching the receiver (multipathing), errors can occasionally occur even with clear sky.

Without updates from GPS System, the inertial position estimation allow approximately 1.5 seconds of position information but after this the horizontal position drift becomes so large that the horizontal position cannot be maintained at all. At this point the position estimator will report invalid position to the navigation core. If you still have RC radio control it is recommended to take back control using ANGLE, HORIZON, ALTHOLD or ACRO as soon as possible.

Action taken on invalid position is dependent on current flight mode.

## GPS glitch protection

Prior to INAV 5.0, INAV implemented "GPS glitch protection"; this was based on the performance characteristics of c. 2016 multi-rotors and Neo6M GPS and was deemed inappropriate for modern aircraft, as it resulted in numerous "false positives" with modern GPS and aircraft performance. Glitch protection was removed in INAV 5.0. The following paragraphs describe the historical implementation:

> Sometimes GPS provides very inaccurate position information despite having the fix and the good satellite count. This event is usually called a "GPS glitch". INAV has logic to detect and ignore inaccurate/inconsistent GPS position updates. Glitches are detected by comparing the new position update received from the GPS unit with a position projected out from the previous update's position and velocity.
>
> The new GPS position is accepted as “good” if:
>
> 1. the two positions are within the hard coded INAV_GPS_GLITCH_RADIUS (currently 2.5m)
> 1. the new position is within a radius that is 10m/s/s (INAV_GPS_GLITCH_ACCEL) * dt * dt.  Where “dt” is the time difference between the two GPS samples.
>
> GPS glitches are treated by the position estimator in the same way as losing GPS fix.
>
> **At the moment the code is experimental and "glitched" GPS positions are not ignored.**

## Action taken on invalid position event

### ANGLE, HORIZON, ACRO, ALTHOLD mode
These modes are not GPS-dependent, nothing will happen but you will be unable to switch into an autopilot flight mode (POSHOLD, RTH, WP) until the failure clears.

### POSHOLD mode
The copter will be forced into ANGLE mode, pilot will have complete control over copter attitude. If ALTHOLD mode was selected it will remain active. When failure clears POSHOLD more will resume.

### RTH and WP modes (including failsafe RTH)
RTH and WP are considered full-auto modes. It is assumed that pilot might have no control over the copter so the safest action in case of invalid position is landing the machine. Copter will enter Emergency Landing state if failure is consistent for over 2 seconds.

### Emergency Landing

 **Receiver failsafe**

If the radio control signal is lost and the sensor data is still active. (GPS and barometer)

* The multicopter will enter emergency landing, and descend via the use of altitude and position data. It will descend at a controlled rate according to your _automatic landing settings_ in the _Advanced tuning tab_, and then disarm.
If `failsafe_procedure = LAND` is selected, in place of `RTH`. It will still make a controller descent. But it will land at the location the failsafe occurred. Instead of returning to home.

* A fixedwing will enter a slow descending spiral if `failsafe_procedure = LAND`. But if `RTH` is selected, and [fixedwing auto landing](https://github.com/iNavFlight/inav/blob/master/docs/Fixed%20Wing%20Landing.md) is set up by the user. The airplane will land at your designated landing coordinates.

 **Hardware failure**

In case of critical failure **e.g.** Hardware, electrical or microwave jammer interference. The Emergency Landing state will force the aircraft into ANGLE mode.

* The multicoter will center ROLL and PITCH inputs to maintain level as the copter enters a controlled descent, based on your failsafe landing presets. Which are `failsafe_throttle` and `failsafe_off_delay`. Once the timer has expired the motors will be shut off..
**Note** : _These presets are set to zero by default. You should always tune them according to your multicopters requirements. Or the system will revert to `failsafe_procedure = DROP`._ Which will damage your copter.

* The fixedwing will enter a slow descending spiral until it touches down, according to the _automatic landing settings_ in the _Advanced tuning tab_.. It will also disarm.


## Tips to improve GPS reception and avoid GPS outages and glitches

1. Place the GPS module on the outside of your vehicle (in an elevated position or on a mast if appropriate) with a clear view of the sky.
1. If GPS module is combined with a compass sensor, place it as far as possible from the motors, ESCs and power wires (at lest 10 cm)
1. 1.2-1.3 GHz FPV video transmitters are know to be interfering with GPS reception. If you use such transmitter place it as far as possible from GPS module and expect some degradation in GPS quality
1. Select a GPS module with biggest GPS antenna. Bigger GPS antenna - better reception.
1. Use a two-system receiver is possible. For example uBlox NEO-M8N is GPS/GLONASS capable receiver. More systems means better noise resistance, more satellites, better accuracy.
