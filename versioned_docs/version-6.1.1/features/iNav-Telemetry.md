---
title: INAV Telemetry
---

## Overview

This page discusses the telemetry options available in iNav. Some of the information is expanded upon in the [Mission Panning](./iNavFlight-Missions.md) page.

## Definitions

Factually and classically, telemetry is an automated communications process by which measurements and other data are collected at remote or inaccessible points and transmitted to receiving equipment for monitoring. The word is derived from Greek roots: tele = remote, and metron = measure.

In INAV terms, it has a rather more specific meaning, describing a means by which measurement data is pushed automatically from the vehicle to another device, typically a CGS (Computer Ground Station) or OSD (On-screen Display).

It is also the case in INAV that getting data into a CGS or OSD can be achieved _without_ defining a telemetry protocol (using MSP, below).

This page attempts to disambiguate these options.

## INAV Messaging Protocols

INav supports a number of protocols for message exchange (and telemetry).

For INAV, the following rules apply:

- If a telemetry protocol is defined for a UART, without MSP, then the 'push' telemetry protocol will be sent unconditionally.
- If a UART defines both MSP and a telemetry protocol, then MSP is active when unarmed, and the push telemetry protocol is transmitted from the FC when armed.
- If _just_ MSP is enabled for a USART, it is always available (armed and unarmed).

The latter mode is preferred for use with CGS like mwp or EZ-GUI; the CGS can take advantage of the metadata available in MSP prior to arming (e.g. vehicle type, FC capabilities) and then use the efficient push telemetry when armed.

- Multiwii Serial Protocol (MSP). This is a polled protocol, and thus in INAV terms, not considered 'telemetry', even when used for remote measurement. The application (OSD, CGS) polls the flight controller "send me status data" and the FC responds, "here's the status data"; "send me the GPS data" -> "here's the GPS data". This is supported by most OSDs and CGS. It has advantages and disadvantages:
  - The remote (OSD, CGS) can determine what data it requests (+ve)
  - The configurator uses MSP to communicate with and configure the FC (+ve)
  - The remote (OSD, CGS) must maintain a timeout and retry, as data can be lost in transmission (-ve)
  - For packet radio links (3DR, HC-12), this is slow (much slower than the data rate would indicate), due the overheads on creating and tearing down the packets.

  **It is not necessary to define an "telemetry protocol" to use MSP alone.**

- Lightweight Telemetry (LTM). LTM, as its name implies, is a light-weight protocol that has been enhanced for INAV specific attributes by the INAV developers. Its attraction is its ability to send useful flight data at high rates over slow data links, for example 10Hz update of attitude is possible at 4800 baud, and 5Hz at 2400 baud. LTM is supported by [Ghettostation](https://github.com/KipK/Ghettostation), [LTM Telemetry OLED ](https://github.com/sppnk/LTM-Telemetry-OLED) , [EZGUI](http://ez-gui.com/) , [MwpTools](https://github.com/stronnag/mwptools), [LTM OSD](https://github.com/digitalentity/ltm-osd-simple), [Scarab OSD](https://github.com/ShikOfTheRa/scarab-osd) and possibly others. For more detail, see the [wiki LTM entry](../features/Lightweight-Telemetry.md)

- Mavlink. Mavlink is the telemetry protocol (and configuration protocol) of APM and other FCs. It has limited support in INAV and requires more bandwidth than the svelte LTM. It does however allow the use of other CGS and OSD. Mavlink one way telemetry is supported by [Droid Planner 2 (Android)](https://github.com/DroidPlanner/Tower/releases/download/Droidplanner_v2.8.6_RC2/Droidplanner_v2.8.6_RC2.apk)

- TX protocols. A number of TX devices (FrSky, Hott, IBUS, Smartport) can also receive telemetry.

## Example

![LTM setting](https://imgur.com/PnqqpAN.png)

In the above example, MSP is available on USART1 when unarmed, and LTM when armed (in this case used with a 3DR or HC-12 telemetry radio and the mwp groundstation). Note in particular, the baud rate is common for MSP and LTM.
