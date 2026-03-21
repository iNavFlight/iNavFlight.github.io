---
title: Automatic Antenna Tracker
---

## Introduction

Since release 3.0, iNav directly supports embedded video telemetry data to drive the VirtualPilot Sentinel antenna tracker.

This enables the use of directional higher gain antennas to maintain higher quality video in all directions, provide the ability to use lower video transmission power or increase the maximum reception distance over traditional omnidirectional antennas. The AAT provides the benefit of maintaining a more accurate direction over manually mounted antennas without the concern of the aircraft moving outside of the antenna’s dominant reception area. 

***
## Configuring - iNAV 3.0 onwards (embedded support) 
* Requires minimum of iNav 3.0 and fonts installed
* Enable AAT telemetry in the cli: set osd_telemetry = ON

## Configuring - iNAV earlier versions
* Check content at the link here: [iNAV AAT for earlier versions](https://github.com/aat-sentinel/Documentation/blob/main/Sentinel%20AAT%20lite%20User%20Guide.pdf)

## Testing 
As telemetry data is not normally visible, the telemetry data can be viewed on the OSD using a cli command:
* Enable AAT telemetry with second test line in the cli: set osd_telemetry = TEST
* Remember to change it back when finished: set osd_telemetry = ON (FC restart required)

***
## Description of operation 
* iNAV knows its home launch position, current position and altitude
* iNAV can calculate the pan and tilt information required by the antenna tracker
* The data is sent using video telemetry over an analogue signal
* The video telemetry is sent on OSD row 0 with only pixel line 0 used
* 30 bits of information are sent in each video frame which includes tilt angle, pan angle and error validation check
* Two font characters are used to represent a binary 0 or 1

Positives of using this telemetry method:
* Simple and reliable
* No hardware modules or extra wiring on aircraft
* Supports all RC TX - not limited to TX with telemetry
* Does not require unreliable bluetooth / wifi connections to tracker
* Not impacted by 2.4G RC /Video 
* Ultra-fast position updating – up to 30 hz
* Low size packet means higher tracking success rate in poor signal conditions

Negatives of using this telemetry method:
* Tracking data may be recorded by some DVR. Not usually visible in goggles / monitor
* The first row of OSD display becomes unavailable for OSD. However, this row is not usually fully visible
* This does not use tracker GPS location – so cannot be used in a moving vehicle

In the visualisation video below, you can see how the telemetry data is sent. This is a test mode as it is not usually visible in FPV goggles / recordings, however notice how the real telemetry line on pixel row zero is not visible.

[![Telemetry visualisation capture](https://img.youtube.com/vi/FMLUvc-tX4E/0.jpg)](https://youtu.be/FMLUvc-tX4E?t=20)

***
## Sentinel AAT for use with iNAV 
Further information on the Sentinel AAT is available by clicking on the image:

[![Sentinel AAT](https://static.rcgroups.net/forums/attachments/2/6/9/6/2/5/a14859253-253-TrackersRCG.png)](https://www.rcgroups.com/forums/showthread.php?3815901-New-product-low-cost-antenna-tracker-for-iNav-Betaflight-Ardupilot-KISS-etc)