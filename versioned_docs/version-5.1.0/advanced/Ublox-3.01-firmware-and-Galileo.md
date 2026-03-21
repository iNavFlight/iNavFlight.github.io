---
title: Ublox 3.01 Firmware and Galileo
---

## Introduction

Ublox firmware 3.01 supports the European Galileo satellites. This can provide increased satellite coverage particularly in Northern and Western Europe.

A number of UBLOX configuration items can be used to check and configure Galileo capability, either using the UBLOX Windows application 'u-center' (which works on Linux using 'Wine'), or the Linux/mwptools 'ublox-cli' tool.

## Firmware and settings

It is necessary for your device to be a M8N or later to use v3.01 firmware (necessary for Galileo) and to have 1M of flash. Some of the popular Beitian BN880 devices only have 512k of flash and cannot be upgraded. Older (prior to spring 2016) and new devices (spring 2017) are reported as being upgradable.

The firmware version / capability is available from the UBX-MON-VER ublox command. A Galileo capable device shows something like:

```
SW: EXT CORE 3.01 (107900) HW: 00080000 80000
ExtVer:  ROM BASE 2.01 (75331)
ExtVer:  FWVER=SPG 3.01
ExtVer:  PROTVER=18.00
ExtVer:  FIS=0xEF4015 (100111)
ExtVer:  GPS;GLO;GAL;BDS
ExtVer:  SBAS;IMES;QZSS
```

The FIS value indicates it is upgradable. In u-center:

![](https://static.rcgroups.net/forums/attachments/6/1/2/8/7/5/a10080926-121-BN-880.png)

### Device Status

Devices manufactured in 2018 and later are likely to be firmware 3.01 or later as purchased. This is certainly the case for the popular (and well suited to INAV) Beitian BN-880.

### iNav Configuration

For INAV 1.9.0 and later, it is not necessary to manually configure the GPS in u-center; it can be enabled using the INAV CLI:

```
set gps_ublox_use_galileo = ON
```

This setting implements the manual settings below.

Note that if you do not enable Galileo in inav, then the default / user configured setting of the GPS device are used, so you can prefer other regional GNSS such as BeiDou.

### Manual Configuration (GPS device)

For older firmware (prior to 1.9.0), if your devices comes with 3.01 firmware, or you flash it, then to enable Galileo, you need to assign some channels for Galileo; typically steal from some channels from a GNSS that you are unlikely to use (maybe QZSS, BeiDou in Western Europe). Save this in the default configuration. BN-880 can use upto 3 GNSS (plus SBAS) simultaneously. In u-center:

![](https://static.rcgroups.net/forums/attachments/9/3/9/2/a10081487-180-Galileo_2.JPG)  
![](https://static.rcgroups.net/forums/attachments/9/3/9/2/a10081488-165-Galileo_1.JPG)

Using the UBLOX SVINFO command (either u-center or ublox-cli) will show if you have any Galileo satellites, which have an ID in the range E1-E36. Below, E11, E12 and E24 are Galileo satellites contributing to the overall GPS fix solution.

```
SVINFO: Channels 30
21     G7 - - 4
 6     G8 Y - 6
 7    G10 Y - 6
 0    G16 Y - 6
 4    G18 Y - 6
15    G20 Y - 6
 1    G21 Y - 6
 2    G26 Y - 6
 3    G27 Y - 6
22    G29 Y - 6
23  SBAS1 - - 1
24  SBAS4 - - 7
 8 SBAS17 - - 7
12     E2 - - 7
26     E7 - - 1
10    E11 Y - 7
 9    E12 Y - 7
28    E14 - - 7
25    E19 - - 1
11    E24 Y - 7
19     R5 - - 1
18     R6 - - 4
20     R7 - - 3
27    R11 - - 4
14    R12 Y - 6
 5    R13 Y - 7
29    R14 - - 1
17    R21 Y - 7
13    R22 Y - 7
16    R23 Y - 7

```

The M8N (even with v2.01 firmware) is capable of doing PVT (single Position,Velocity,Time stanza) and 10Hz update rates (note the reported timestamps at 0.1s intervals):

```
PVT: lat: 50.910534 lon: -1.535244 elev: 17.39 acc(h/v): 0.6/0.7
sats: 17, fix 3
2017-04-22 13:05:47.400
Data size 92b (1 7)
PVT: lat: 50.910534 lon: -1.535244 elev: 17.39 acc(h/v): 0.6/0.7
sats: 17, fix 3
2017-04-22 13:05:47.500
Data size 92b (1 7)
PVT: lat: 50.910534 lon: -1.535244 elev: 17.40 acc(h/v): 0.6/0.7
sats: 17, fix 3
2017-04-22 13:05:47.600
```

For INAV firmware prior to 1.7.1, it is necessary to compile custom firmware with `-D GPS_PROTO_UBLOX_NEO7PLUS=1`. For INAV 1.7.1 firmware and later, PVT/10Hz updates can be enabled just by configuration:

```
set gps_provider = UBLOX7
```
