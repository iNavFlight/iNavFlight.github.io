---
title: Lightweight Telemetry (LTM)
---

LTM was defined by "KipK" for the Ghetto Station antenna tracking project and originally implemented in Taulabs and Baseflight. It was adopted by INAV due to its excellent characteristics for low data rate / high update rate telemetry.

Since its introduction to INAV, a number of extension have been added; these are documented below, in addition to the original frames.

## Protocol Definition

### Overview

The LTM protocol starts with "$T", followed by a function byte, the payload and a simple CRC checksum. Its weakness is that there is no length parameter (so the receiver needs to know, apriori,the length for each function), and the single byte checksum is not as robust as the multi-byte checksum in for example the ublox GPS protocol. However, the high data rate ensures that good data should be delivered over occasional transmission errors. In practice, LTM is an excellent light weight telemetry solution. 

| Position | Byte |
| -------- | ---- |
|   0      |   $  |
|   1      |   T  |
|   2      |   G/A/S/O/N/X/T |
|   3..n   | n bytes payload |
|   n + 3  | CRC |

LTM telemetry can be read by [Ghettostation](https://github.com/KipK/Ghettostation),  [LTM Telemetry OLED ](https://github.com/sppnk/LTM-Telemetry-OLED) , [EZGUI](http://ez-gui.com/) , [MwpTools](https://github.com/stronnag/mwptools) and others.

LTM can provide good telemetry down to 2400 (5Hz attitude updates). Due to restrictions in INAV 1.2 and earlier, 9600 was the lowest baud rate supported, which gives 10Hz attitude and 5Hz GPS data. More recently (INAV 1.7.0), LTM is available from 1200 baud and higher; the data transmission frequency is automatically determined from the baud rate, but can be overridden by the user where the baud rate can support the required update frequency. See the  [INAV Telemetry documentation](./iNav-Telemetry.md) and [below](#inav-cli-support) for CLI settings.

The function consists of a single ASCII character, described below. Data is binary, little endian. The checksum is an XOR of the payload bytes.

The follow telemetry frames are supported:

| Function Byte | Usage | Frequency |
| ------------- | ----- | ---- | 
| G | GPS Frame | 5Hhz at > 2400 baud |
| A | Attitude Frame | 10 Hz at > 2400 baud |
| S | Status Frame | 5Hhz at > 2400 baud | 
| O | Origin Frame | 1 Hz rate | 
| N | Navigation Frame (iNav extension) | ~4 Hz rate |
| X | GPS eXended data (iNav extension) | 1 Hz rate |

In addition, LTM is used by NRF24L01 / deviationtx iNav protocol, which defines an additional frame for in-TX tuning. This frame is not transmitted for telemetry.

| Function Byte | Usage |
| ------------- | ----- |
| T | Tuning frame (iNav extension) |

### GPS Frame (G)

The payload is 14 bytes. 

| Data | Format |
| ----- | ------- |
| Latitude | int32 decimal degrees * 10,000,000 (1E7) |
| Longitude | int32 decimal degrees * 10,000,000 (1E7) |
| Ground Speed |  uchar m/s |
| Altitude | (u)int32, cm (m / 100). In the original specification, this was unsigned. In iNav it is signed and should be so interpreted by consumers |
| Sats | uchar. bits 0-1 : fix ; bits 2-7 : number of satellites |

### Attitide Frame (A)

The payload is 6 bytes

| Data | Format |
| ---- | ---- |
| Pitch | int16, degrees |
| Roll | int16, degrees |
| Heading | int16, degrees. Course over ground |

### Status Frame (S)

The payload is 7 bytes

| Data | Format |
| ---- | ---- |
| Vbat | uint16, mV |
| Battery Consumption | uint16, mAh |
| RSSI | uchar |
| Airspeed | uchar, m/s |
| Status | uchar |

Airspeed (vice GPS ground speed in the G-frame) requires INAV 1.7.2 or later, with `PITOT` defined at build time, and a detected pitot sensor.  

The status byte is used as

| Bit | Usage |
| ---- | ---- |
| 0 | armed |
| 1 | failsafe |
| 2 - 7 | status, as (shifted value): |
| |  Manual (0) |
| | Rate (1) |
| | Angle (2) |
| | Horizon (3) |
| | Acro (4) | 
| | Stabilised1 (5) |
| | Stabilised2 (6) |
| | Stabilised3 (7) |
| | Altitude Hold (8) |
| | GPS Hold (9) |
| | Waypoints (10) |
| | Head free (11) |
| | Circle (12) |
| | RTH (13) |
| | Follow me (14) |
| | Land (15) |
| | Fly by wire A (16) |
| | Fly by wire B (17) |
| | Cruise (18) |
| | Unknown (19) |
| | Launch (20*) |
| | Autotune (21*) |

As a general purpose protocol, not all status can be mapped to INAV modes.

(*) indicates iNav extension, post 2019-02-28

### Origin Frame (O)

The payload is 14 bytes

| Data | Usage |
| ---- | ---- |
| Latitude | int32 decimal degrees * 10,000,000 (1E7) |
| Longitude | int32 decimal degrees * 10,000,000 (1E7) |
| Altitude | uint32, cm (m / 100) [always 0 in iNav] |
| OSD on | uchar (always 1) |
| Fix | uchar, home fix status (0 == no fix) |

### Navigation Frame (N)

The payload is 6 bytes. Note that this frame largely mirrors the Multiwii-nav `MSP_NAV_STATUS` message and this contains redundancies and values that are not used in INAV. 

| Data | Usage |
| ---- | ---- |
| GPS mode | uchar |
| Nav mode | uchar |
| Nav Action | uchar (not all used in inav) |
| Waypoint number | uchar, target waypoint |
| Nav Error | uchar |
| Flags | uchar (to be defined) |

where:

| GPS mode |  Enumeration |
| ----------- | -------- |
| 0 | None |
| 1 | PosHold |
| 2 | RTH |
| 3 | Mission |

| Nav mode  |  Enumeration |
| ----------- | -------- |
| 0 | None |
| 1 | RTH Start |
| 2 | RTH Enroute | 
| 3 | PosHold infinite |
| 4 | PosHold timed |
| 5 | WP Enroute |
| 6 | Process next |
| 7 | Jump |
| 8 | Start Land |
| 9 | Landing in Progress |
| 10 | Landed |
| 11 | Settling before landing |
| 12 | Start descent |
| 13 | Hover above home (iNav only) |
| 14 | Emergency landing (iNav only) |
| 15 | Critical GPS failure (yes 15, you never want to see this) |

Note that these values were defined by Multiwii-nav and not all are applicable to INAV.

| Nav Action |  Enumeration |
| ----------- | -------- |
| 0 | UNASSIGNED |
| 1 | WAYPOINT |
| 2 | POSHOLD_UNLIM |
| 3 | POSHOLD_TIME |
| 4 | RTH |
| 5 | SET_POI |
| 6 | JUMP |
| 7 | SET_HEAD |
| 8 | LAND |

| Nav Error |  Enumeration |
| ----------- | -------- |
| 0 | Navigation system is working |
| 1 | Next waypoint distance is more than the safety limit, aborting mission |
| 2 | GPS reception is compromised - pausing mission |
| 3 | Error while reading next waypoint from memory, aborting mission |
| 4 | Mission Finished |
| 5 | Waiting for timed position hold |
| 6 | Invalid Jump target detected, aborting mission |
| 7 | Invalid Mission Step Action code detected, aborting mission |
| 8 | Waiting to reach return to home altitude |
| 9 | GPS fix lost, mission aborted |
| 10 | Disarmed, navigation engine disabled |
| 11 | Landing is in progress, check attitude |

### GPS Extra Frame (X)

The payload is 6 bytes. 

| Data | Usage |
| ---- | ---- |
| HDOP | uint16 HDOP * 100 |
| hw status | uint8 |
| LTM_X_counter | uint8 |
| Disarm Reason | uint8 |
| (unused) | 1 byte | 

Note that hw status (hardware sensor status) is INAV 1.5 and later. If the value is non-zero, then a sensor has failed. 
A complementary update has been made to [MSP_STATUS](../advanced/INAV-MSP-frames-changelog.md).
Thus, on disarming, the sensor status may be evinced from the MSP_STATUS/sensor field.

The sensor hardware failure indication is backwards compatible with versions prior to 1.5 (and other Multiwii / Cleanflight derivatives).

The LTM_X_counter value is incremented each transmission and rolls over (modulo 256). It is intended to enable consumers to estimate packet loss.

## iNav CLI Support

LTM is transmit only, and can work at any supported baud rate. It was designed to operate over 2400 baud and does not benefit from (much) higher rates. It is thus usable on soft serial. The extra frames later introduced by INAV means that 4800 baud is required for the highest update rate.

A CLI variable `ltm_update_rate` may be used to configure the update rate and hence band-width used by LTM, with the following enumerations:

* NORMAL: Legacy rate, currently 303 bytes/second (requires 4800 bps)
* MEDIUM: 164 bytes/second (requires 2400 bps)
* SLOW: 105 bytes/second (requires 1200 bps)

For many telemetry devices, there is direction correlation between the air-speed of the radio link and range; thus a lower value may facilitate longer range links.

## Sample Data

A couple of data samples are available from the [mwptools](https://github.com/stronnag/mwptools) project. [Sample1](https://raw.githubusercontent.com/wiki/stronnag/mwptools/data/ltm_2015-11-08.tar.gz) and [Sample2](https://raw.githubusercontent.com/wiki/stronnag/mwptools/data/mwp_2015-12-12-LTM.tar.gz) include raw dumps, structured data logs and READMEs explaining usage.  

## Other 

### Tuning Frame (T)

The payload is 12 bytes. This frame is not transmitted by iNav telemetry.

| Data | Format |
| ---- | ---- |
| P-roll | uint8 |
| I-roll | uint8 |
| D-roll | uint8 |
| P-pitch | uint8 |
| P-pitch | uint8 |
| I-pitch | uint8 |
| D-yaw | uint8 |
| I-yaw | uint8 |
| rates-roll | uint8 |
| rates-pitch | uint8 |
| rates-yaw | uint8 |

### Checksum Calculation

To calculate the checksum of the payload bytes, use the following example (Python):

```
def checksum(payload):
    value = 0
    for d in payload:
        value ^= d
    return value
```
 
