---
title: Ports Tab
---

## Overview

This controls the UART and USB serial ports on your flight controller (FC). These serial ports are used to communicate with devices and sensors typically soldered or connected by pins or plugs to your FC. (Other connections such as I2C, gyro, barometer, etc. are configured on the Configuration Tab)

The serial port settings are presented in a table format with each UART and USB serial port on a separate row. INAV supports a number of protocols and connection speeds. Here are some general rules:
- Do not disable the Data toggle going to the USB VCP port as this will soft brick your ability to connect to your FC over USB. There are two ways to fix this, 1) hope one of your other UARTS have MSP enabled and use a serial adapter to connect to your FC, or 2) press the DFU button and reflash your FC losing your current configuration and start from scratch.
- A serial UART allows two-way communication using a pair of wires. There is also a required ground wire and a wire for power so there is usually four wires going to a device. Some devices only need three total wires since they don't require two-way communication or they use half duplex communication so only one wire is enough. These requirements are usually listed with your device on in the wiring diagram that may have been included in the FC documentation.
- The TX pad on your FC need to be connected to the RX pad on your device, and the RX pad on your FC need to be connected to the TX pad on your device. TX -> RX and RX -> TX and getting this backwards will mean your device will not function.
- Inverted Serial protocols are a special situation that is less of an issue in modern times. But you should consider this if you are having issues.
- Your device requires a specific protocol and port speed and INAV needs to be set accurately configured for your FC to communicate with it.
- The columns represent different types or groups of communication devices and sensors.
- Remember, **only one device can be active per serial port**. Having more than one device on a port is an invalid configuration and INAV running on the FC will reject the configuration and not save the updated settings. Effectively you will lose the changes you just made. Take your time and maybe save your settings often.

## Ports

### Identifier
Lists the available ports with their labels. The UART numbers match the UART labels on your FC board. On your FC board, the labels are abbreviated to UART 1 = R1 and T1 or sometimes TX1 and RX1. You might find an inverted UART on your FC and its most times labeled as nT1 or nR1 with stands for -not-.

### Data
The MSP protocol is the native data protocol of INAV used by only specific devices.\
**Supported Devices:** INAV Radar, Formation Flight, Bluetooth or other wireless configuration connection, some RemoteID modules\
**Other Notes:** Its good practice to setup MSP on at least one UART. There is a possibility that you might break off or damage your USB port in a crash or soldering. A UART with MSP can be uses as an alternate connection method.

### Telemetry
This refers to the values and stats send from your aircraft back to your radio control (RC) transmitter (TX). This is received live by your radio and can be used to set alerts and other functions as the values change. You could have a low voltage warning as your battery gets near empty or get the current GPS coordinates to find a lost aircraft. The RC Receiver (RX) is what typically handles telemetry communication between the FC and your radio TX. Some RXs use a separate UART for telemetry and other do not.\
**Supported Devices:** See the dropdown list in the configurator\
**Notes:** The type of RC Receivers that use this port will have a separate wire for telemetry that needs to have a UART dedicated for just telemetry. A UART used for telemetry can only be used for telemetry and nothing else. It can not be the same UART as the RX, it needs its own UART. If your FC has a wiring diagram in the documentation it may help you select an acceptable pad for telemetry from your RX.\
\
**Non-Telem Port RXs:** TBS Crossfire / Tracer, ExpressLRS, Ghost, FPORT, Spektrum, and others\
**Notes:** See the RX section below for how to connection these devices.


### RX (Radio Control Receiver)
Flip this toggle for the UART that your radio control receiver is connected to. If your FC has a wiring diagram in the documentation it may help you select an acceptable pad to connect your RX to. Only the port is selected on this tab. The actual protocol used by your RX is selected on the Receiver Tab. But be sure to save your ports settings before switching to the other tab.
**Supported Devices:** All Receivers\
**Other Notes:**
- Receiver protocols like SBUS only send data and can only be connected to an inverted UART RX pad. These pads are typically marked as SBUS on the FC specifically for this purpose. A pad marked as nR1, etc. would also typically work.
- Receivers protocols that use two-way communication use a pair of wires and can typically be connected to any pair of UART pads (eg TX1 RX1)
- (Uncommon) Receivers protocols that use half-duplex communication use only one wire and can only be connected to a UART TX pad and not an RX pad. Some may also require an inverted UART TX pad. Jump into an online INAV group if you think you may be using one of these receivers for help.

### Sensors
This includes devices like a GPS and some other devices. See the GPS Tab for troubling shooting help and other GPS settings. You may need to try a lower speed to get a device to work. Start at 9600 baud and go up from there. Many devices easily handle 115200 baud.

### Peripherals
Mostly used for connecting to video transmitters (VTx). Other Vtx settings are on the OSD Tab.

**MSP DisplayPort:** The protocol used by most digital video transmission systems such as WTFOS, Walksnail, HD Zero, etc. It enables telemetry data to be shown on the goggle's onscreen display (OSD).\
**DJI FPV VTX:** (Do not confuse this with WTFOS) The protocol used by DJI for their video transmission system such as the DJI Digital FPV System, Caddx Vista, Runcam Link, and DJI O3. It enables telemetry data to be shown on the goggle's onscreen display (OSD).\
**TBS SmartAudio:** An analog video transmitter (VTx) protocol that allows you to change transmission channel and power. The pad on the VTx is sometimes labeled SA and is connected with one wire to any UART TX pad.\
**IRC Tramp:**  An analog video transmitter (VTx) protocol that allows you to change transmission channel and power. This protocol is sometimes called Tramp and is connected with one wire to any UART TX pad.\
**RunCam Device:** Used to change camera settings.

### Example

Please note that this port configuration is not directly applicable to your flight controller and aircraft.
![Ports](https://imgur.com/PnqqpAN.png)
