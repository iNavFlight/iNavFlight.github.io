---
title: INAV Remote Management, Control and Telemetry
---

# INAV Remote Management, Control and Telemetry

## Introduction

This article discusses INAV's APIs for remote control and telemetry. It _does not_ discuss internal programming APIs (e.g. "how to interface a new sensor directly on the FC"), nor does it discuss the [programmable logic conditions](https://github.com/iNavFlight/inav/blob/master/docs/Programming%20Framework.md).

This article does not discuss radio control protocols, unless they also provide facilities for management or telemetry.

Note also that INAV's primary remote API is [MultiWii Serial Protocol](#multiwii-serial-protocol) and this is the main object of discussion. Other protocols are also available and are also discussed.

## Definitions

For the purpose of this article, the following definitions are used:

* **Remote Management**: Methods to get and set internal parameters and data from and to the flight controller. This may be considered to be a super-set of the information that can be shown / updated from the [INAV Configurator](https://github.com/iNavFlight/inav-configurator). It should be noted that setting / using much of this information requires saving to EEPROM and thus cannot (safely) be used when the vehicle is armed.

* **Remote Control:** Methods to alter the behaviour of the vehicle when armed. This includes overriding or replacing the radio TX "stick commands" and "follow me" functionality.

* **Telemetry**: Methods to receive status and geospatial data from the vehicle. This is typically sent unsolicited (e.g. once telemetry is configured it will be sent without further action from the receiver / consumer).

All of the above are message based, requiring a **communications channel**, which may be considered to be a combination of:

* A hardware device. Usually a serial UART on the FC, and another device on the consumer, whose end point may also be a serial device, or be encapsulated in some other form, for example a WiFi access point or Bluetooth.

* A physical transport. This could be a cable (USB, 4 wire serial) or a radio link (either a RC radio or a dedicated radio link using technologies such as LoRa, HC-12 or "3DR / SiK").

* A protocol. The protocol defines how the data is serialised for transmission over the physical transport; examples discussed include [MSP](#multiwii-serial-protocol) and [LTM](#lightweight-telemetry).

Note that as far as the INAV firmware is concerned, we are discussing "serial" transmission / reception regardless of the physical transport between the vehicle and consumer.

## Use cases

The following use cases are pertinent to the technologies and techniques discussed below:

* Configuration of the flight controller
* A Mission Planner
* Ground station
* Co-processor on the vehicle for applications such as obstacle avoidance

## INAV Considerations, Restrictions and Recommendations

INAV places a number of restrictions on the number of channels available and their usage:

* There can be up to three MSP channels
* A MSP channel can be shared with a telemetry channel such that the channel is available for MSP (request-response, solicited) communications when unarmed and the unsolicited telemetry when armed. The most common use case for this is MSP (unarmed) and LTM or MAVLink (armed). The consumer has to be able to handle the transition (the arming  MSP -> LTM / MAVLink transition is easy, the consumer can recognise the protocol has changed, the disarm LTM / MAVLink -> MSP transition can only be handled via a timeout in message reception).
* There can be multiple telemetry protocols active at the same time (on different channels).
* In particular, MSP is a request-response protocol.
  - Do NOT spam the FC with a rapid, timer based stream of messages; the FC has limited buffering and processing capability and messages may be lost.
  - Check MSP responses, both the message ID is that expected and the response code indicates the message was correctly processed by the FC (see [below](#multiwii-serial-protocol)).
  - Implement a timeout mechanism to deal with lost messages and retry.
  - Set the MSP payload length correctly, it is validated by the FC (5.0 and later).
* Verify the checksum available in all the protocols. Discard corrupt messages

## Protocols

### High level overview

#### Remote Management

[MSP (MultiWii Serial Protocol)](#multiwii-serial-protocol) is only protocol that provides for remote management and provides comprehensive coverage of the facilities and functions of INAV. MSP is (largely) a request / response protocol; typically the consumer requests data from the FC, which the FC provides. There are a small number of specialised cases where MSP is provided unsolicited (for example INAV radar).

#### Remote Control

[MSP (MultiWii Serial Protocol)](#multiwii-serial-protocol) and [MAVLink](#mavlink) can be used for remote control.

#### Telemetry

[LTM (Lightweight Telemetry)](#lightweight-telemetry), [MAVLink](#mavlink) and various RC radio protocols (e.g. [Smartport](#smartport), [Crossfire (CRSF)](#crossfire), [FlySky](#flysky--ibus) provide essentially unsolicited telemetry.

### MultiWii Serial Protocol

Multiwii Serial Protocol originated on the MultiWii Flight controller around 2010. The original documention is available in the [Multiwii wiki](http://www.multiwii.com/wiki/index.php?title=Multiwii_Serial_Protocol); the details should not be relied upon for INAV / Betaflight implementations (or even 2.4 MultiWii).

INAV supports the following variations:

* MSPv1: This is considered obsolescent; it is limited to a 255 byte payload, 255 message IDs (commands) and has a weak checksum. It is not recommended from new implementations; as far as INAV is concerned it is deprecated and likely to be removed from a future release.
* MSPv1 + Jumbo frames: An extension to MSPv1 to support frames larger than 255 bytes.
* MSPV2: Recommended version. Addresses the weakness of prior versions, 16bit message ID, 16bit payload length and stronger CRC.

#### MSP References

[INAV Wiki MSPV2 definition](https://github.com/iNavFlight/inav/wiki/MSP-V2).

[INAV Wiki MSP Navigation Messages](../advanced/MSP-Navigation-Messages.md). Detailed explanation of the usage of INAV / MSP Way point definitions.

For INAV the normative reference for MSP is the source code:

* [Message IDs](https://github.com/iNavFlight/inav/tree/master/src/main/msp)
* [Message Handling](https://github.com/iNavFlight/inav/blob/master/src/main/fc/fc_msp.c) and related source files (`fc_msp*.*`) in the same directory for specific detail.
* [RC Control](https://github.com/iNavFlight/inav/blob/master/src/main/rx/msp.c) and related `*msp*.*` files in the same directory.

There are numerous open source implementations (libraries and application modules); in addition to the INAV FC source:

* INAV Configurator
* Numerous libraries for various platforms (Arduino, generic computer) in numerous languages (e.g. C, C++, Python, Rust). Google is your friend here.
* Application implementations (mwptools, BulletGCSS, Mobile Flight). Again, Google is your friend here.

There is also a long abandoned (alas) [changelog](../advanced/INAV-MSP-frames-changelog.md) of historic interest only.

Note that the INAV developers take backwards compatibility seriously; changing a payload is usually not permitted (however, extending it is OK); this is why there are a number of variations on the same basic request (`MSP_STATUS`, `MSP_STATUS_EX`, `MSP2_INAV_STATUS`) as the size of the internal status structure has changed.

### MAVLink

* [MAVlink developer info](https://mavlink.io/en/). Note that INAV supports a small subset of the MAVLink message set (some unsolicited telemetry and remote control). INAV supports MAVLink V1 and V2.
* There is a application in the [mwptools repository, mavtest](https://github.com/stronnag/mwptools/tree/master/src/samples/mavtest) that summarises / validates the MAVLink messages supported by INAV.
* INAV source code.
  - [Telemetry](https://github.com/iNavFlight/inav/blob/master/src/main/telemetry/mavlink.c)
  - [RC Control](https://github.com/iNavFlight/inav/blob/master/src/main/rx/mavlink.c)

### Lightweight Telemetry

LTM offers low data rate / low band width / high update rate telemetry.
Since its introduction to INAV, a number of extension have been added; these, and the original frames, are [documented in the wiki](https://github.com/iNavFlight/inav/wiki/Lightweight-Telemetry-(LTM)), in detail.

* INAV source code. [Telemetry](https://github.com/iNavFlight/inav/blob/master/src/main/telemetry/ltm.c).

INAV compatible LTM is implemented by [Ghettostation](https://github.com/KipK/Ghettostation), [LTM Telemetry OLED ](https://github.com/sppnk/LTM-Telemetry-OLED) , [EZGUI](http://ez-gui.com/) and [mwptools](https://github.com/stronnag/mwptools) at least.

### RC Protocols

Note:

* This section describes the telemetry aspects only. If you wish to investigate the control aspects, see the INAV [protocol specific source files](https://github.com/iNavFlight/inav/blob/master/src/main/rx/).
* There are various implementations / initiatives to provide MSP over an RC Link. This topic is currently beyond the scope of this article.
* Typically this data is sent over the RC Control (TX/RX) radio link. Radio specific hardware / transport may be required (serial inverter, Bluetooth, WiFi etc.) may be required to access the data.

#### Smartport

* INAV source code. [Telemetry](https://github.com/iNavFlight/inav/blob/master/src/main/telemetry/smartport.c).
* Other Example. Parser / decoder / replay tools. [mwptools example](https://github.com/stronnag/mwptools/tree/master/src/samples/frsky).

#### Crossfire

* INAV source code. [Telemetry](https://github.com/iNavFlight/inav/blob/master/src/main/telemetry/crsf.c)
* Other Example. [mwptools example](https://github.com/stronnag/mwptools/tree/master/src/samples/crsf). Protocol description, example parser, links to other information sources.

#### Flysky / IBUS

* INAV source code. [Telemetry](https://github.com/iNavFlight/inav/blob/master/src/main/telemetry/ibus.c).
* Other Example. [mwptools example](https://github.com/stronnag/mwptools/tree/master/src/samples/mpm-telemetry). This example uses the OpenTX/EdgeTX MPM (Multi-Protocol Module) to access IBUS / Flysky AA telemetry data and provides a link to the original MPM definition and requires the INAV CLI setting `set ibus_telemetry_type = 0`

## Specific Use Cases

(**work in progress**)

### Remote Control using MSP / MAVLink

The MSP messages `MSP_SET_RAW_RC` / `MSP_RC` can be used to implement remote control via MSP (i.e. 16 channel control, stick commands).

There is a [sample application](https://github.com/stronnag/msp_set_rx) that describes the requirements / restrictions / idiosyncrasies involved using the MSP interface.

Likewise, the MAVLink `RC_CHANNELS_OVERRIDE`, `RC_CHANNELS_OVERRIDE_RAW`, `RC_CHANNELS`. See, inter alia,  [INAV #8282](https://github.com/iNavFlight/inav/pull/8282) and [INAV #8132](https://github.com/iNavFlight/inav/issues/8132) and [INAV #8173](https://github.com/iNavFlight/inav/pull/8273) for limitation / caveats / current implementation status.

### Follow Me (`GCS NAV`).

INAV has provided a "follow me" implementation via MSP since v1.2/1.3  (2016). This allows the user to direct the vehicle to fly to a specific location. This was intended for mobile ground station (specifically the obsolete Android application "EZGUI") to instruct the vehicle to follow a GPS equipped target (often the pilot). [mwp](https://github.com/stronnag/mwptools) supports `GCS NAV`, allowing in flight selection of a "follow me" point on the map, which is then transmitted to the vehicle.

* The FC is placed in `POSHOLD` and `GCS NAV` modes.
* The consumer updates 'special' `WP#255` (holds the requested `POSHOLD` location) using `MSP_SET_WP` messages.
* See [INAV source](https://github.com/iNavFlight/inav/blob/master/src/main/navigation/navigation.c), `setWaypoint()` function.

With `GCS NAV`, is also possible to update the home position via WP#0

#### Querying locations

The following 'special' WPs can be interrogated with the `MSP_WP` message:

* `WP#0` returns the home position
* `WP#254` returns the desired position, i.e. that set by `MSP_SET_WP` / `WP#255`
* `WP#255` returns the current position.

### The "Obstacle Avoidance" problem

Ever so often, someone asks on Discord / Telegram / chat platform du jour how to do "Obstacle Avoidance" on INAV, often with some assumptions that:

* There is a relatively powerful (compared to the FC) co-processor (Rpi, Jetson Nano) with sensors and the CPU power to detect / classify obstacles from its on board sensors.
* The range, azimuth and elevation (at least relative to the vehicle) of the obstacle is known via the co-processor / sensors.

If would seem that there are at least two options using the remote control / management (MSP) API.

#### Use remote control to pilot the vehicle

The vehicle is commanded via Remote Control (MSP or MAVLink) to fly around the obstacle by providing inputs to the Roll, Pitch, Yaw and Throttle channels. The co-processor would compute the channel values required to manoeuvre the vehicle, based on some internal model of the vehicle physics. This seems to be a complex approach, particularly the computation of channel values required, which have to be continually updated (5Hz for MSP).

#### The vehicle's navigation engine is used

* The obstacle's location in known from the sensors with reference to the vehicle (range, azimuth, elevation).
* The vehicle's location is known in geospatial coordinates (latitude, longitude, altitude) as well as the speed and heading, (`MSP_RAW_GPS`, `MSP_ATTITUDE` etc.).
* A safe location can be calculated based on the vehicle's location and the relative location of the obstacle.
* The vehicle can be commanded using `MSP_SET_WP` for `WP#255` to use its navigation system to avoid the obstacle (with `POSHOLD` and `NAV GCS` modes activated).

Potentially a less complex solution, as the piloting of the vehicle is done by the well proven flight controller firmware.

## Further Considerations

### Partial Automation

It is possible to combine manual control with some channel automation.

* Compile the firmware with `USE_MSP_RC_OVERRIDE` defined (e.g. in `src/main/target/common.h`).
* Use the CLI `msp_override_channels` to define the channels to be automated.
* Ensure the channel(s) are refreshed at a minimum of 5Hz to avoid fail-safe.

### Control by stick commands

In a cruise mode (e.g. POSHOLD/CRUISE for multi-rotor), it will be possible to fly the craft using A,E,R stick emulation, with minimal concern for flight physics.

### Useful / relevant MSP stanzas and application

The following `MSP` stanzas may be useful for remote control / automation applications.

#### Pre-flight setup

Prior to arming the craft, an automation application can be made "target agnostic" by requesting data from the FC. A specific application may need some or all of:

* `MSP_FC_VARIANT` : Validate that you're running on INAV.
* `MSP_API_VERSION`, `MSP_FC_VERSION` : Validate that the firmware is sufficiently capable for your application.
* `MSP_RX_MAP` : Obtain channel map for subsequent `MSP_SET_RAW_RC`.
* `MSP2_COMMON_SETTING` / `nav_extra_arming_safety` : Checking arming requirement and whether you can bypass it
* `MSP_MODE_RANGES`: Determine the configured switches, functions and ranges.
* `MSP_BOXNAMES` : Determine the modes available to the craft (e.g. for mode validation via `MSP2_INAV_STATUS`).
* `MSP2_COMMON_SERIAL_CONFIG` : Determine serial channel functions.
* `MSP_RX_CONFIG` : Determine the RX type.
* `MSP2_INAV_STATUS` : Determining various status items (arming status, mode status etc.)
* `MSP2_INAV_MIXER` : Get vehicle type (e.g. to avoid MR only actions on FW).

#### Flight (and some pre-flight)

* `MSP_SET_RAW_RC` : Set RC channel values (PWM values), both for "stick" and "switch" channels.
* `MSP2_INAV_STATUS` : Determining various status items (arming status, mode status etc.)
* `MSP_RAW_GPS` : Get GPS data (fix, number of satellites, location)
* `MSP_SET_WP` : Set Waypoint (either for mission for "follow me").
* `MSP_WP` : Get Waypoint (e.g. to cache home location).
* `MSP2_INAV_ANALOG` : Battery status
* `MSP_ATTITUDE` : Vehicle attitude
* `MSP_ALTITUDE` : Vehicle altitude / vario
* `MSP_NAV_STATUS` : Navigation status

Note. These may not be comprehensive lists, but they are a start.

### Notional Usage

The following may cover a number of "home work" / "undergraduate project" use cases:

#### Notional Requirement

Fully automated, using a co-processor for target detection and flight management

* Once powered on, the craft shall arm automatically.
* Once armed, the craft shall take off and loiter in a 'safe' location.
* The craft shall determine (by some 'magic' means, beyond the scope of this article), the 'target location')
* The craft shall fly to the target location (which may move as long as the vehicle is more than 50m from the target).
* Once the target is assumed stationary the vehicle shall land as close as possible to the target and disarm.
* If it unsafe to continue (e.g. low battery), the craft shall return to the launch location and land and disarm.

#### Notional Solution

Assumptions.

* Required modes are configured (`RTH`, `POSHOLD`, `GCS NAV`, `WP`).
* Configured for land / disarm on RTH.
* Co-processor / 'magic' sensor can determine target (relative) location.

Using the MSP outlined above:

* Determine vehicle characteristics. Stop now if not capable of mission.
* Monitor status and location until arming is possible (e.g. GPS fix).
* Using the 'magic' sensor / AI etc., determine a safe loiter location.
* Generate and upload a 1 WP mission to the safe location (the craft will automatically loiter there when completed). Ideally elevation will be double vertical range to avoid tip over on take off.
* Arm the craft, (optionally) apply a little throttle, and immediately engage WP mode. The craft will take off and start the mission.
* Continually monitor location, battery and status.
* Once the craft reaches the loiter location, engage POSHOLD and disengage WP mode.
* Using the `magic` sensor, determine the target location. Assuming this is available as range and bearing (absolute or relative), calculate the geographic location of the target. Enable `GCS NAV` mode and update `WP#255` to fly the craft to the target.
* Repeat the above until target is determined to be the landing position (e.g. within 50m in the notional requirement).
* Cache launch position (i.e. read `WP#0`). Set the target position as `WP#0` (home), engage `RTH`.
* Craft will land at target location.
* If an unsafe condition is detected (low battery etc.), restore any cached home location and engage `RTH`.

Note: you could do most or all of the above just with `MSP_SET_RAW_RC` rather than with the navigation engine, but that might increase the co-processor computation / monitoring requirement and implementation risk. However, if you're using `MSP_SET_RAW_RC` for anything you need to comply with its minimum update rate.

#### Implementation examples

NOTE: If you have a better example (or additional examples), please augment or replace the following paragraphs.

The [flightlog2kml](https://github.com/stronnag/bbl2kml) project contains a tool [fl2sitl](https://github.com/stronnag/bbl2kml/wiki/fl2sitl) that replays a blackbox log using the [INAV SITL](https://github.com/iNavFlight/inav/blob/master/docs/SITL/SITL.md). Specifically, this uses MSP and MSP_SET_RAW_RC to establish vehicle characteristics, monitor the vehicle status, arm the vehicle and set RC values for AETR and switches during log replay simulation to effectively "fly" the SITL for the recorded flight.

The MSP initialisation, MSP status monitoring and MSP RC management code is in [msp.go](https://github.com/stronnag/bbl2kml/blob/master/pkg/sitlgen/msp.go), specifically the `init()` and `run()` functions. Arming / disarming in [sitlgen.go](https://github.com/stronnag/bbl2kml/blob/master/pkg/sitlgen/sitlgen.go), `arm_action()` function.

The [msp_set_rx](https://github.com/stronnag/msp_set_rx) project exercises `MSP_SET_RAW_RC`.

The [inav-follow-me](https://github.com/stronnag/inav-follow-me) project provides a Rpi Pico based project implementing "follow-me" using `GCS NAV`.

The [msp_override](https://codeberg.org/stronnag/msp_override) projects provides a simple example of using `MSP SET_RAW_RC` with `USE_MSP_RC_OVERRIDE` (and a physical RX/TX).

## Other References

* [Building custom INAV](../advanced/Building-custom-firmware.md).
* [Developer Info / Navigation internals](../advanced/Developer-info.md)