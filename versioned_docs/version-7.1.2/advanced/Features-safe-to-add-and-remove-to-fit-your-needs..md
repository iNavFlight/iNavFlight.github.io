---
title: Features Safe to Add and Remove to Fit Your Needs.
---

## Features safe to remove

Due to flash size limitation on F1 targets it cannot include all features INAV supports at once.

Purpose of this document is to provide infomation on which features that can safely be removed and added as see fit.

## How to add and remove features.

Get your build enviroment up and running.

Generally features are defined in the common.h file for all targets, then later removed in the target.h file for each target. ( This files are inside the folder for each target, example master/src/main/target/NAZE/target.h )

To remove an feature simple find the feature name and then make a new line in target.h file with "#undef feature_name"

## GPS protocols

INAV supports 4 different GPS protocols. Default on F1 targets is only Ublox enabled.

The four protocols are defined in the common.h file inside main target folder.

define GPS_PROTO_NMEA

define GPS_PROTO_UBLOX

define GPS_PROTO_I2C_NAV

define GPS_PROTO_NAZA


You can choose to remove all expect the one you need.

## Telemetry protocols

INAV supports 4 different GPS protocols. Default on F1 targets is only LTM and FrSky telemetry.

The four protocols are defined in the common.h file inside main target folder.


define TELEMETRY_FRSKY

define TELEMETRY_HOTT

define TELEMETRY_SMARTPORT

define TELEMETRY_LTM


## Other features that can safely be removed or added
