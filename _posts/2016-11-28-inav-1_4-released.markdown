---
layout: post
title:  "INAV 1.4 Released"
date:   2016-11-28
categories: [news]
---

I'm happy to announce official release of INAV 1.4.

Binaries available at [GitHub](https://github.com/iNavFlight/inav/releases/tag/1.4).

INAV 1.4 has some significant differences from 1.3, please read the release notes carefully and upgrade INAV Configurator available at [Chrome Store](https://chrome.google.com/webstore/detail/inav-configurator/fmaidjmgkdkpafmbnmigkpdnpdhopgel).

<!--more-->

## Motor/servo outpurs are DISABLED by default
For safety motor/servo outputs are disabled after flashing with configuration erase. After configuring motor/servo mixer you have to enable PWM outputs using CLI (`feature PWM_OUTPUT_ENABLE`) or using new Configurator.

## CC3D/NAZE target space issues
To keep CC3D/NAZE targets working with all bells and whistles we had to remove support for some SerialRX protocols that are not widely used. S.Bus, I-Bus and Spektrum are still supported on all targets.

## Asynchronous gyro/PID processing
It has been shown that it's possible to sample gyro at higher rate and process it at much lower rate without noticeable impact on flight performance. In ACRO only it's now possible to do 8kHz gyro updates on some targets. Even better racing performance now.
Please read [this article](https://github.com/iNavFlight/inav/blob/development/docs/Looptime.md) to learn how to configure this very useful feature.

## Airplane improvements

 * INAV 1.4 features new airplane launch assistant. See [INAV wiki to learn more](https://github.com/iNavFlight/inav/wiki/8.-Navigation-modes#launch---airplane-launch-assistant).
 * Better PID scaling for airplanes. Have a look at [the wiki page](https://github.com/iNavFlight/inav/wiki/PID-Attenuation-and-scaling) to see how to tune new TPA.
 * Experimental emergency landing is available to land the aircraft in a very unfortunate event of GPS loss when executing RTH or WP mission.
 * Basic pitot airspeed sensor support compatible with Pixhawk PX4 Airspeed Sensor (logging purposes only, stay tuned for airspeed control in 1.5)

## Significantly reworked position estimation code

 * It now handles GPS+BARO better on ariplanes and recovers better from GPS outages. More safety for your aircraft when in automatic modes. 
 * Better handling GPS+MAG on airplanes - now it is safe to keep MAG enabled on airplane if required. GPS heading is preferred with fallback on MAG if speed is too low or GPS heading error is too big. Note, that if you have compass close to power wires or magnetic objects it's safer to keep it disabled.
 * Better handling of pilot-engaged RTH and failsafe RTH.

## More supported targets

 * Airbot F4 / FLIP32 F4
 * Omnibus F4 (w/o OSD)
 * YuPiF4 board initial support

## Bugfixes

 * Failsafe is now safer, no more disarming in the air when loosing RC link at zero throttle.
 * Fixes for sensor detection, now INAV will retry sensor detection up to 5 times before reporting it missing.
 * Fix broken I2C on AirHeroF3 target (AIRHEROF3_QUAD flavour)
 * Fixed issue with baro on fixed-wing.
 * Lots of code cleanups and smaller improvements

Thanks to all who participated in improving the code and put their vehicles at risk testing new features! You guys are awesome!

Thanks for using INAV! Happy flying!