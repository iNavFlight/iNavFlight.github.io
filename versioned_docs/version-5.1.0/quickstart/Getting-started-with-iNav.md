---
title: Getting Started
slug: getstarted
sidebar_position: 1
---

# Getting started

## Where to download?!
Install the latest version of [INAV Configurator](https://github.com/iNavFlight/inav-configurator/releases) and use it to download and flash the firmware. Note that the Chrome app is no longer supported by Google.

Be aware on the first boot after a reflash, or clean erase, iNAV tries to auto detect MAG, BARO, and SPEED (Pitot-tube).  If none of them are detected, it will indicate this with red icons on the sensor bar.  It will also fail on `Hardware health` on the Pre-arming checks. To fix this, reboot the controller and it should be fine.

Go through the index on the right side to find useful information.

### Hardware needed for GPS assisted modes.

* Multirotors: GPS, magnetometer, barometer.
* Fixed wings: GPS. (Can also use magnetometer and barometer but not needed.)

[Video showing how to edit and tailor INAV for you needs.](https://youtu.be/n3Z1fOQJAg8)

## GPS
INAV supports Ublox, DJI NAZA, NMEA, multiwii's i2c-nav board and MultiWiiCopter's i2c-gps modules.

M8N versions ( example [Ublox NEO-M8N](https://inavflight.com/shop/s/bg/1005394) and [Beitian BN-880](https://inavflight.com/shop/p/BN880) ) have been tested and are recommended, but both M6N and M7N should work.

With the default INAV settings, INAV will configure the ublox GPS for you. There is no need to use software like u-center.

Also be aware that some of our flight controllers can cause interference with the GPS, causing low satellites, or even no satellites at all. Keep the GPS as far away from the flight controller as possible. Either shield your GPS, or flight controller from any equipment that could cause interference.

You can learn how to setup your GPS unit for use with INAV on [on this page](./GPS--and-Compass-setup.md).

## Notes / Common issues

* Old version of INAV configurator, verify that your on the latest version see [link](https://chrome.google.com/webstore/detail/inav-configurator/fmaidjmgkdkpafmbnmigkpdnpdhopgel). If it has failed to update, simply uninstall and re-install the configurator.

* Unable to enable NAV related modes, see [Navigation-modes](../features/Navigation-modes.md) for possible reasons for why.

* INAV does not show "GPS Signal Strength" for each satellite in the Cleanflight configurator. Instead, only the first one is used to show [HDOP](https://en.wikipedia.org/wiki/Dilution_of_precision_%28GPS%29)

* INAV has only one PID controller called fp-pid.

* INAV has an extra safety feature that prevents you from arming your aircraft if certain conditions are met, or not met. This is controlled by the CLI variable "Nav_extra_arming_safety", which is turned on by default.

1. No valid GPS lock (needs 3d lock and more satelites than inav_gps_min_sats).
1. Navigation modes are turned on while trying to arm.


* INAV has GPS modes that differ from Cleanflight, or names them differently. Read [this wiki page](../features/Navigation-modes.md) for how to use them, and combine them, to get the wanted position hold.

* If your copter is toilet-bowling, which means, in the beginning it holds its position and then starts to make bigger and bigger circles, you probably have your magnetometer calibrated incorrectly, or it’s seeing the magnetic field of power lines or the beeper.  
If you are using your FC onboard mag, try to place the the FC as far away as possible from the parts causing magnetic interference e.g. mounting it on/under the top plate on small racers.

* No GPS lock after setting it up, and the GPS icon lights up green, are often due to electric noise from the flight controller or other equipment such as 1.2ghz video TX. Try putting the GPS on a mast. You can also shield the GPS or FC using aluminum foil or copper foil.

* Barometer is held at 0 meter until the first time you arm. This is to ensure that it starts at 0 meter instead of 10 meters because of temperature drift (this is why raising your flight controller while connected to configurator shows increasing altitude, but then is dragged to 0 meter).

* When installing or upgrading INAV on a board with OSD, always load one OSD font from the configurator OSD tab. iNAV uses its own OSD fonts and usually every release adds new characters or icons.

* Do not use Serial RX over a software serial. It cannot reliably handle SBUS or IBUS for instance. 

**Checklist if you're having an issue with something:**
1. Join our Telegram group following this [link](https://t.me/INAVFlight)
2. Try and look through the wiki regarding the issue you have. You can also search the Wiki.
3. Read the first post at [rcgroups Cleanflight INAV thread](http://www.rcgroups.com/forums/showthread.php?t=2495732). Also read the last 5 pages in the thread to see if someone else has already mentioned it. Also try and search in the thread.
4. Explain your issue, include CLI dump and blackbox log if you have a logger. Mention what you have tried, and also if it's working as intended in stock Cleanflight / Earlier versions of INAV
5. [Template for asking for help](http://www.rcgroups.com/forums/showpost.php?p=35637535&postcount=7930)