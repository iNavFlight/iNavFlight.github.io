---
title: New Features Over Versions
---

This document is intended to show the most relevant new features of each version of INAV.
It's also known as **INAV Version History**, or **INAV Changelog**.

Every released version of INAV brings some changes on funcionality that is already working, bug fixes and new funcionalities. This document will focus only on the major changes and will not go deep on smaller ones. To check a detailed list of changes for each version, check the release notes on that version release download page.

## New on version 1.5 (Dec 2016)

- **OSD support** - Targets with onboard OSD now work properly.
- [INAV 1.5 Release notes](https://github.com/iNavFlight/inav/releases/tag/1.5)

## New on version 1.6 (Feb 2017)

- **New PIFF controller for fixed-wing aircraft** - Introducing new Proportional + Integral + Feed Forward controller for airplanes. It's more suitable for airplanes due to the nature of control they are using. It also puts less stress on servos.
- **RTH sanity checking** - RTH sanity checking feature will notice if distance to home is increasing during RTH and once amount of increase exceeds a certain threshold defined by nav_rth_abort_threshold CLI parameter instead of continuing RTH machine will enter emergency landing, self-level and go down safely. Default threshold is set to 500m which is safe enough for both multirotor machines and airplanes.
- [INAV 1.6 Release notes](https://github.com/iNavFlight/inav/releases/tag/1.6)

## New on version 1.7 (May 2017)

- **Turn assistant** - INAV will automatically do a coordinated balanced turn with ailerons, elevator and rudder.
- **Airplane Autotune mode** - Uses changes in flight attitude input by the pilot to learn the tuning values for roll, pitch and yaw tuning.
- [INAV 1.7 Release notes](https://github.com/iNavFlight/inav/releases/tag/1.7.0)

## New on versions 1.8 to 1.9 (Mar 2018)

- Lots of small improvements on things what already existed, but fewer new features.
- Initial support for SmartAudio and IRC Tramp protocols
- Some OSD improvements, new elements, new messages
- MSP over SmartPort to allow transmitter to talk to INAV using LUA Scripts
- [INAV 1.8 Release notes](https://github.com/iNavFlight/inav/releases/tag/1.8)
- [INAV 1.9 Release notes](https://github.com/iNavFlight/inav/releases/tag/1.9.0)

## New on version 2.0 (Aug 2018)

- **New mixer and mixer GUI** - There are no predefined mixers on the firmware side. Mixers now are fully configurable.
- **Added NAV CRUISE flight mode for fixed wing** - When enabled the machine will try to maintain the current heading and compensate for any external disturbances.
- **OSD improvements** - Now it is possible to have three OSD layouts and switch between them via a RC channel. Furthermore new two modes have been added: map and radar.
- **Full VTX control via Smart Audio / TRAMP** - User can now select VTX settings from the configurator or via the OSD CMS.
- **Wind Estimation for Fixed Wing**
- **New SBUS atomic driver** - Fix a very important bug that may lead to a mid-air disarm, and also makes INAV compatible with FrSky R9 SBUS implementation.
- [INAV 2.0 Release notes](https://github.com/iNavFlight/inav/wiki/2.0.0-Release-Notes)

## New on version 2.1 (Feb 2019)

- **DSHOT Support** - A digital protocol, like what DSHOT is, can substain a certain amount of noise with no performance degradation and allows a very smooth motor output.
- **Multirotor braking mode**
- **PINIO support**
- [INAV 2.1 Release notes](https://github.com/iNavFlight/inav/wiki/2.1.0-Release-Notes)

## New on version 2.2 (Jun 2019)

- **Logic Conditions** - It's a new function framework that allows to activate and deactivate specific servo mixer rules.
- **Cellular telemetry via text messages** - Uses a SimCom SIM800 series cellular module to provide telemetry via text messages.
- **Support for INAV Radar** - Introduces the support for Radar ESP32 boards. They can be used to share information (including position) between multiple machines.
- **Added option to continue mission out of radio range**
- [INAV 2.2 Release notes](https://github.com/iNavFlight/inav/wiki/2.2.0-Release-Notes)

## New on version 2.3 (Nov 2019)

- **ESC Telemetry** - It's a feature of DSHOT ESCs to send some data back to the flight controller - voltage, current, temperature, motor RPM.
- **Dynamic Filters** - Port of Betaflight dynamic filtering.
- **Global Functions** - Global Functions (abbr. GF) are a mechanism allowing to override certain flight parameters (during flight). Global Functions are activated by Logic Conditions.
- **Pixel based OSD** - INAV now supports pixel based OSDs and includes a driver for FrSky's OSD.
- [INAV 2.3 Release notes](https://github.com/iNavFlight/inav/wiki/2.3.0-Release-Notes)

## New on version 2.4 (Feb 2020)

- **RPM Filters** - INAV can now take determine where to place notch filters based on the rotation speed of the motors to attenuate noise being fed into PID. You need to connect BlHeli telemetry on a serial port and then enable RPM Filters.
- **USB Mass Storage** - USB MSC (mass storage device class) SD card and internal flash access is enabled for F4 and F7 targets with suitable hardware. This means you can mount the FC (SD card / internal flash) as a host computer file system via USB to read BB logs (and delete them from a SD card).
- **RTH Home Offset** - Allows INAV RTH and failsafe RTH to not return the launch point but in a nearby area allowing not to violate a protected space which might be active in some flying fields.
- **Linear Climb and Dive on Waypoint Missions** - INAV will try to climb or dive to the next waypoint altitude in a linearly manner, so it'll reach the next waypoint altitude only when it's almost reaching the waypoint itself. This way aircraft will consume less energy to climb since it'll be a less steep climb or will save energy by trading altitude for speed for more time when diving.
- **Support for DJI HD FPV** - INAV is now ready to embrace HD FPV with support for the DJI HD FPV system.
- [INAV 2.4 Release notes](https://github.com/iNavFlight/inav/wiki/2.4.0-Release-Notes)

## New on version 2.5 (Jun 2020)

- **Initial Rover and Boat Support**
- **New Matrix Filters for Multirotors** - It's a dynamic notch filter that detects noise frequencies on each individual axis (X, Y and Z), resulting in a much better noise handling.
- **JUMP, HOLD and LAND Waypoint types** - Allows more complex missions to be performed.
- **HUD POI Waypoints markers on OSD** - Shows the next waypoints in the hud
- **VTX/CMS Unification** - Now CMS has one unified page for configuring VTX settings. No need to remember which protocol your VTX is talking (Tramp, S.Audio or other).
- [INAV 2.5 Release notes](https://github.com/iNavFlight/inav/wiki/2.5.0-Release-Notes)

## New on version 2.6 (Dec 2020)

- **New Unicorn Filter** - A Kalman Filter implementation that allow multirotor aircraft to fly smoother
- **Safehomes** - A feature that allows aircraft to return to a previously defined "safe" home point instead of returning to the automatically defined home point. It's useful to fly at fields with strict rules about airspace use.
- **SET_HEAD and SET_POI new Waypoint types** - Allows to program missions where a Multirotor can "look" to a specific point of interest or heading.
- **Multirotor now can navigate without a barometer** - It'll using the altitude informed by the GPS instead. Now you can use a baroless FC!
- **New FrSky F.Port2 and Spektrum SRXL2 Receiver Protocols support**
- **Baro, GPS, Pitot and Compass sensors over MSP support**
- [INAV 2.6 Release notes](https://github.com/iNavFlight/inav/wiki/2.6.0-Release-Notes)

## Enjoy the newer features!

If you have an older version of INAV on your aircraft, upgrade now and enjoy the newer features! We have a guide to help you to do that. [Check it out now](../quickstart/Upgrading-from-an-older-version-of-INAV-to-the-current-version.md)!
