---
layout: post
title:  "Upcoming INAV 1.4-RC1"
date:   2016-11-14
categories: [news]
---

A small teaser for those who are interested in what's going to be included in INAV 1.4.

 * Better compass/GPS co-existence on fixed-wing UAVs
 * Better PID scaling for fixed-wing UAVs for more stable flight at any throttle value
 * Launch mode for fixed-wing UAVs to help you launch your airplane
 * Airbot F4 / Flip F4 board support
 * Asynchronous Gyro/PID update - better performance on racing drones
 * Safety feature to disable motor/servo outputs until you explicitly enable them - to prevent damage to servos when flashing with erase

<!--more-->

### Better compass/GPS co-existence on fixed-wing UAVs

This feature allows the airplane to use both GPS and compass to determine airplane heading - it's useful when GPS speed is low and 
GPS course over ground is reported incorrectly.

### Better PID scaling for fixed-wing UAVs

Initial TPA (Throttle PID Attenuation) code was designed for multirotors and worked pretty well for them. Airplanes are different from multirotors as 
PID gains should be attenuated according to airspeed, not throttle. However, until airspeed sensor support is introduced it's safe to assume that speed 
is directly proportional to throttle.

For airplanes TPA now works in a different way - it's not only attenuating PID gains at high throttle but also boosts them at low throttle allowing better 
control when gliding at low speeds with no throttle at all or slow flying with minimal throttle. TPA is expressed as a curve that boosts PIDs below TPA 
breakpoint and attenuates them above the breakpoint.

Example of TPA curve for airplanes:
![](/assets/2016-11-14/tpa_airplane.png)

### Launch mode for fixed-wing UAVs

This is a very cool feature to make launching easier. It limits stabilisation and keeps motor stopped until you throw the airplane.
Sequence of steps to launch:

 1. Set the switch to LAUNCH mode
 1. Arm the UAV
 1. Raise throttle to a value to use *after* launch sequence is finished (also note that motor will not respond to throttle stick for your safety and to confirm that launch mode is actually active)
 1. Throw the airplane as usual
 1. INAV will throttle up automatically
 1. Launch sequence is finished after a timeout (10s) or after pilot moves the right stick to control the aircraft

Here's the video of me launching the plane with INAV's assistance:
<iframe width="560" height="315" src="https://www.youtube.com/embed/GQvJ77PhbSw" frameborder="0"></iframe>

### Asynchronous Gyro/PID update

When it comes to mini-quad racing there is Betaflight, long long gap, and then it's everything else including Cleanflight, INAV etc.

There was some effort in improving mini-quads and acro performance in INAV, but until recently INAV on a miniquad was flying like crap. You could tune it (I did) but it 
required a lot of effort and didn't guarantee good results.

Recently a huge bunch of code by a developer **DzikuVx** got merged into INAV. This is a big catch up with Betaflight and actually quite a big change in INAV. Now
it can fly a racing quad with Betaflight-comparable performance. It's not as good as Betaflight but you now need to be a really skilled pilot to notice.
