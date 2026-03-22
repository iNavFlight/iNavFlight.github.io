---
title: Introduction
---

## Introduction
This guide assumes you have already [connected your Rx to a Serial UART Port on your flight controller and have set the correct port on the ports tab](https://github.com/iNavFlight/inav/wiki/Ports-Tab). The RC Receiver (Rx) in your aircraft conveys the radio control (RC) commands from your RC Transmitter and sends them to your flight controller over a wire connection using a Serial UART Port and using a particular communication protocol. This tab is where you set the protocol of your receiver and make sure it is communicating with INAV.

### Binding
Be sure to bind your Rx to your RC transmitter. This is a huge troubleshooting step that can save hours of frustration. Check and double check this. You can follow the binding process outlined in the manual for your radio equipment. It may be a blinking light pattern or an indicator on the radio, but you need some way to confirm it is bound every time you turn your radio on. If you have a Spektrum serial receiver, you might have to [set the Spektrum bind in the cli](https://github.com/iNavFlight/inav/blob/master/docs/Spektrum%20bind.md). Without a bind, you receiver may appear dead even though it is connected fine and all the INAV settings are correct.

## Receiver Mode Section
This is where you tell the FC what type of Rx you have and what protocol it speaks.

### Receiver Type
This is the first step to get INAV to talk to your receiver. The available options are:
- **Serial Receivers** - your Rx is 99% likely to be a serial receiver.\
Examples: TBS Crossfire / Tracer, ExpressLRS, Ghost, Radiomaster, FrSky, Spektrum, FlySky, Futaba, etc.
- _MSP RX (very rare)_
- _SIM SITL (for computer simulator use only)_
- _PPM Receivers (obsolete in INAV 3.x and below)_

*Warning: Do not use a Soft Serial Port to connect to your receiver. Soft Serial Ports often drop data which can cause unintentional failsafes and other unexpected behaviors.*

### Serial Receiver Provider *(Receiver Protocol)*
INAV can't talk to your receiver until the serial protocol is set. Select the Serial Receiver Provider (protocol) applicable to your receiver and press **Save and Reboot**. Once INAV Configurator reconnects, a working connection will be evidenced by moving color bars in the Channel Map. They should move when you move you sticks. These are the available protocols.
- **CRSF:** TBS Crossfire / Tracer, ExpressLRS (all frequencies) | ?? Channel Limit
- **FBUS:**
- **FPORT2:** FrSky | 16 channels | RC Control and Telemetry over one-wire connected to a TX UART
- **GHST:**
- **IBUS:** FlySky | 10 channels
- **JETIEXBUS:**
- **MAVLINK:**
- **SBUS:** FrSky, Futaba, ExpressLRS (all frequencies) | 16 channels | See SBUS labeled pad on your FC (an inverted RX UART)
- **SBUS_FAST:** DJI Digital FPV System
- **SPEK1024:** Spektrum | Spektrum DSM
- **SPEK2048:** Spektrum | Spektrum DSM2 / DSMX
- **SRXL2:** Spektrum | newer Spektrum protocol
- **SUMD:** Graupner | 16 channels

*Even if a protocol supports a large number of channels, the radio or receiver might be limited in the number of channels it utilizes. This can be frustrating.*

*Some receivers support more than one protocol or different protocol options. This is not common so don't expect it. One example is ExpressLRS where the Rx supports CRSF, inverted CRSF, SBUS, inverted SBUS, etc. Some old FrSKY receivers can be changed by flashing a different firmware while the ACCESS Rx can be either SBUS and FPort in the transmitter model setup page.*

*SRXL2 provides both RC control and telemetry over a two-wire connection to UART but requires [special cli settings](https://github.com/iNavFlight/inav/blob/master/docs/Rx.md#configuration-1).*

*IBUS RX and IBUS telemetry can be configured to both be on the same Serial UART - see [Telemetry.md](https://github.com/iNavFlight/inav/blob/master/docs/Telemetry.md)*

## RC Smoothing Section
This is used to filter out jitters in the RC values coming from the sticks on your transmitter. You should leave **RC Smoothing ON** in almost all cases. The other settings in this section can be left at their default values and should be fine for almost all cases. A higher value for *Manual LPF Hz* or *auto smoothing factor* will add delay to you controls due to the longer filter calculations. Adjust these values only if you understand what you are doing.

## Channel Map Section
The first four channels of almost all radios are dedicated to the sticks. INAV needs to know the channel order of your sticks so it can understand your inputs. This is done by mapping each stick to their matching color bar in INAV in the **Channel Map** section. The four letters **TAER** represent this mapping; **A**ilerons (Roll), **E**levator (Pitch), **T**hrottle, and **R**udder (Yaw). The drop down box has two presets and you will see one of them will have **AETR** while the other has **TAER**. Almost 99% sure one these will be the correct setting for your sticks. If you needed to, you could manually type in any arrangement of these four letters into that box for your own custom channel mapping. After selecting a channel order, press **Save and Reboot**. Once INAV Configurator reconnects, you will see the changes take effect and you can then confirm that each of the four sticks movements match the color bar labeled for that stick input (labels Roll [A], Pitch [E], Yaw [R], Throttle [T]).

Now that the receiver is talking to INAV, this is a great time to make adjustments to your radio. INAV expects the trims on your transmitter to be reset to the middle on all four sticks. You can double check this by looking at the Channel Map where the values are shown on the color bars. They should be very near 1500 (the middle). Never, never use trims on your radio when using INAV. INAV has its own trim system. This is also a good time to rerun a calibration on your radio's gimbles. Find a video on YouTube specific to your radio model.

### RSSI Channel *(Received Signal Strength Indicator)*\
Some older receivers use a radio channel to communicate the health of the radio signal to INAV. You can visually see this channel as the color bar will be jittering high and low in the Channel Map especially when you move your transmitter around. Most times it's channel 16. Modern receivers with telemetry enabled don't need this set at all and this setting should be *Disabled* in these cases.

### Advanced: RxRange
INAV expects your transmitter/receiver to send RC values (called end-points) with a range of 1000-2000. But some transmitters/receivers have a non-standard end-points (i.e. 1070-1930 as some Spektrum receivers) which can be a problem in INAV. To adjust for this, go into your transmitter settings and try to set the output end-points as close as you can to 1000-2000. If you still can't get end-points to 1000-2000 then you can go to the cli and use the command rxrange to map your non-standard range to the standard 1000-2000 in INAV.
1. If you used rxrange in the past, reset it by entering the following command into the CLI:
```
rxrange reset
save
```
2. Reconnect INAV Configurator, go to the `Receiver` tab, move one stick at a time on your transmitter to the min and max values (first 4 channels) and write these values down. *Always take care to avoid accidentally arming your craft*. Go to CLI and set the min and max values with the following cli command `rxrange <channel_number> <min> <max>` and note that Channel 1 is 0 in the cli, and 2 is 1, and 3 is 2, and 4 is 3. Here is an example.
```
rxrange 0 1070 1930
rxrange 1 1070 1930
rxrange 2 1070 1930
rxrange 3 1070 1930
save
```
You can also use rxrange to reverse the direction of an input channel, e.g. `rxrange 0 2000 1000`. But be sure to know what you are doing whenever usinf the cli.
