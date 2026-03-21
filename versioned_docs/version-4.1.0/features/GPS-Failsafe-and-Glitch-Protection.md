---
title: GPS Failsafe and Glitch Protection
---

## Overview

GPS Systems can occasionally drop the signal (lose FIX) or provide significantly inaccurate position information (glitch). While errors are more likely in conditions where the GPS signal can bounce off multiple paths before reaching the receiver (multipathing), errors can occasionally occur even with clear sky.

Without updates from GPS System, the inertial position estimation allow approximately 1.5 seconds of position information but after this the horizontal position drift becomes so large that the horizontal position cannot be maintained at all. At this point the position estimator will report invalid position to the navigation core. If you still have RC radio control it is recommended to take back control using ANGLE, HORIZON, ALTHOLD or ACRO as soon as possible.

Action taken on invalid position is dependent on current flight mode.

## GPS glitch protection

Sometimes GPS provides very inaccurate position information despite having the fix and the good satellite count. This event is usually called a "GPS glitch". iNav has logic to detect and ignore inaccurate/inconsistent GPS position updates. Glitches are detected by comparing the new position update received from the GPS unit with a position projected out from the previous update's position and velocity.

The new GPS position is accepted as “good” if:

1. the two positions are within the hard coded INAV_GPS_GLITCH_RADIUS (currently 2.5m)
1. the new position is within a radius that is 10m/s/s (INAV_GPS_GLITCH_ACCEL) * dt * dt.  Where “dt” is the time difference between the two GPS samples.

GPS glitches are treated by the position estimator in the same way as losing GPS fix.

**At the moment the code is experimental and "glitched" GPS positions are not ignored.**

## Action taken on invalid position event

### ANGLE, HORIZON, ACRO, ALTHOLD mode
These modes are not GPS-dependent, nothing will happen but you will be unable to switch into an autopilot flight mode (POSHOLD, RTH, WP) until the failure clears.

### POSHOLD mode
The copter will be forced into ANGLE mode, pilot will have complete control over copter attitude. If ALTHOLD mode was selected it will remain active. When failure clears POSHOLD more will resume.

### RTH and WP modes (including failsafe RTH)
RTH and WP are considered full-auto modes. It is assumed that pilot might have no control over the copter so the safest action in case of invalid position is landing the machine. Copter will enter Emergency Landing state if failure is consistent for over 2 seconds.

## Emergency Landing
In case of critical failure, Emergency Landing is triggered. In Emergency Landing state copter is forced into ANGLE mode, ROLL and PITCH input is centered to maintain level, pilot stick input is ignored and copter enters a controlled descent.

While Emergency Landing is active pilot is unable to switch into ALTHOLD, POSHOLD, RTH or WP mode. If pilot wants to regain control of the copter he should switch to ANGLE, HORIZON or ACRO more.

## Tips to improve GPS reception and avoid GPS outages and glitches

1. Place the GPS module on the outside of your vehicle (in an elevated position or on a mast if appropriate) with a clear view of the sky. 
1. If GPS module is combined with a compass sensor, place it as far as possible from the motors, ESCs and power wires (at lest 10 cm)
1. 1.2-1.3 GHz FPV video transmitters are know to be interfering with GPS reception. If you use such transmitter place it as far as possible from GPS module and expect some degradation in GPS quality
1. Select a GPS module with biggest GPS antenna. Bigger GPS antenna - better reception.
1. Use a two-system receiver is possible. For example uBlox NEO-M8N is GPS/GLONASS capable receiver. More systems means better noise resistance, more satellites, better accuracy.