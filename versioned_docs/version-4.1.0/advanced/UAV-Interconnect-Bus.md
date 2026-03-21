---
title: UAV Interconnect Bus
---

INAV implements universal interconnect bus for various types of sensors and executable devices.

It's compatible with all existing controllers that have a spare UART and designed to be able to connect multiple sensors to one shared bus. Devices on the bus can be daisy-chained together for neater wiring.

## Physical layer
### Option 1: Differential signalling

This option is taken from automotive applications and uses CAN bus transceivers (MCP2551 or SN65HVD232) to convert between twisted pair and UART. A special converter is required between each device and a bus. While this option is more expensive it's also very reliable.

Advantages: high reliability, long wires possible.

### Option 2: Shared wire

This option is designed for tight spaces or very cost-sensitive solutions. Wiring should follow Siemens Application Node AP2921: On-Board Communication via CAN without Transceiver (https://www.mikrocontroller.net/attachment/28831/siemens_AP2921.pdf)

Advantages: low price, low wire count

### Data format on the wire

From data format point of view it's plain asynchronous serial with following parameters: 
```
115200,8,n,1
```
**FIXME: Chose a baud rate that has high reliability across multiple MCUs **

### Notes

Both differential signalling and shared wire connection options are verified to work.

## Device addressing

Each slave device on a bus has a unique **DevID** which defines device functionality (GPS, Optical flow, RC receiver etc). **DevID** is one byte and also serves as a device priority - master controller will favor devices with lower **DevID**

During discovery phase on the bus each device is assigned a **SlotID** which it must use for communicating with the master. **DevID** is only used during discovery phase.

## Device capabilities

During discovery each device must report capability flags (16-bit field, see IDENTIFY command).

| Flag mask | Name         | Description |
|-----------|--------------|-------------|
| 0x01      | HAS_READ     | Indicates that device supports READ command and should be polled periodically |
| 0x02      | HAS_WRITE    | Indicates that device supports WRITE command and can accept data |

## Transactions on a bus

Everything on a bus is coordinated by a master device (flight controller) and all transactions are organised in **slots**. There are at most 32 slots (active devices) possible on a single bus.

Master begins transaction with one byte. Highest 3 bits indicate a **command**, while lower 5 bits indicate a **SlotID**. The rest of transaction depends on which command is being executed.

A 2ms guard interval is mandatory between transactions and is used by all devices to reset internal state. First byte after guard interval is assumed to be a command from master device.

### Data integrity

Each transaction on a bus ends with a 1-byte CRC calculated by CRC-8/DVB-S2 algorithm. 
CRC is calculated over all transaction bytes starting with command byte. 
CRC is calculated by the data originator and verified by the master.

## Commands on a bus

| Hex  | Binary  | Name       | Description |
|------|---------|------------|-------------|
| 0x00 | 000xxxx | IDENTIFY   | Performs device identification and slot assignment |
| 0x20 | 001xxxx | NOTIFY     | Notifies a device about assigned (or re-assigned) slot |
| 0x40 | 010xxxx | READ       | Performs a read transaction from a slot |
| 0x60 | 011xxxx | WRITE      | Performs a write transaction on the bus |
| 0x80 | 100xxxx | reserved   | Not used |
| 0xA0 | 101xxxx | reserved   | Not used |
| 0xC0 | 110xxxx | reserved   | Not used |
| 0xE0 | 111xxxx | reserved   | Not used |

### IDENTIFY (0x00)

| Byte | Originator | Description |
|------|------------|-------------|
| 0    | Master     | Value of (0x00 + SlotID)  |
| 1    | Master     | DevID of requested device |
| 2    | Master     | UIB Protocol version (0x00) |
| 3    | Master     | CRC1 (over bytes 0-1)     |
| 4    | Slave      | Poll interval (low byte) |
| 5    | Slave      | Poll interval (high byte)  |
| 6    | Slave      | Device flags (low byte)  |
| 7    | Slave      | Device flags (high byte)   |
| 8    | Slave      | Device parameters [0]     |
| 9    | Slave      | Device parameters [1]     |
| 10   | Slave      | Device parameters [2]     |
| 11   | Slave      | Device parameters [3]     |
| 12   | Slave      | CRC2 (over bytes 0-10)    |

During discovery phase master sends *IDENTIFY* commands for each supported **DevID**.
Device with corresponding **DevID** must respond with desired poll interval (in milliseconds) and flag field.
Master will send it's protocol version in *IDENTIFY* request. Slave device should respond only if it's able to talk this protocol version.
Also, device which has detected it's **DevID** must remember the **SlotID** of the transaction - this will be the **SlotID** assigned to the device; it should also remember the protocol version it should be using to communicate.

Device parameters field (4 bytes) is device-specific and may be used to pass extended capabilities or non-standard flags to the host driver.

### NOTIFY (0x20)

| Byte | Originator | Description |
|------|------------|-------------|
| 0    | Master     | Value of (0x20 + SlotID)   |
| 1    | Master     | DevID of requested device  |
| 2    | Master     | UIB Protocol version (0x00) |
| 3    | Master     | CRC1 (over bytes 0-1)      |

Used to assign a slot to a device. Device shouldn't respond, but only keep record of assigned **SlotID**.

### READ (0x40)

| Byte | Originator | Description |
|------|------------|-------------|
| 0    | Master     | Value of (0x40 + SlotID)  |
| 1    | Master     | CRC1 (over byte 0)        |
| 2    | Slave      | Data payload length (may be zero) |
| 3... | Slave      | Data packet (up to 32 bytes)    |
| last | Slave      | CRC2 (from start of packet)    |

Device with **SlotID** that was assigned to it during discovery phase must respond to this command with a variable-length data packet. If device has no new data available it should respond with zero payload length.

### WRITE (0x60)

| Byte | Originator | Description |
|------|------------|-------------|
| 0    | Master     | Value of (0x80 + SlotID)  |
| 1    | Slave      | Data payload length (may be zero) |
| 2... | Master     | Data packet (up to 32 bytes)    |
| last | Slave      | CRC2 (from start of packet)    |

Device with **SlotID** that was assigned to it during discovery phase must silently accept the data. No acknowledgement it done by the device. Together with **NOTIFY** this command brings a possibility to have several devices on the same DevID/SlotID.

## Devices

It's recommended that each device use first byte of READ payload as flag field with following values:

| Bit | Mask | Description |
|-----|------|-------------|
| 0   | 0x01 | UIB_DATA_VALID - indicates data validity  |
| 1   | 0x02 | Unused, must be zero |
| 2   | 0x04 | Unused, must be zero |
| 3   | 0x08 | Unused, must be zero |
| 4   | 0x10 | Unused, must be zero |
| 5   | 0x20 | Unused, must be zero |
| 6   | 0x40 | Unused, must be zero |
| 7   | 0x80 | Unused, must be zero |

### Device ID = 0x12 : Rangefinder

Flag UIB_DATA_VALID will indicate that reading is valid (surface is in range and measurement is correct)

Recommended payload format:

```
typedef struct __attribute__((packed)) {
    uint8_t flags;
    uint16_t distanceCm;
} rangefinderData_t;
```

### Device ID = 0x13 : GPS sensor

Flag UIB_DATA_VALID will indicate that reading is valid, UIB_DATA_NEW - that data is fresh

Recommended payload format:

```
typedef struct __attribute__((packed)) {
    uint8_t fix_type;
    uint8_t sat_count
    uint8_t hdop;
    int32_t longitude;
    int32_t latitude;
    int32_t altitude_msl;
    int16_t vel_north;
    int16_t vel_east;
    int16_t vel_down;
    int16_t speed_2d;
    int16_t heading_2d;
} gpsDataPacket_t;
```

### Device ID = 0x80 : RC Receiver

Flag UIB_DATA_VALID will indicate that receiver has a valid link to transmitter. This is an **inverse** of FAILSAFE flag in common digital receivers.

Recommended payload format:

```
typedef struct __attribute__((packed)) {
    uint8_t  flags;         // UIB_DATA_VALID (0x01) - link ok
    uint8_t  rssi;
    uint8_t  sticks[4];     // Values in range [0;255], center = 127
    uint8_t  aux[8];        // Analog AUX channels - values in range [0;255], center = 127
    uint16_t reserved;      // Reserved for future use
} rcReceiverData_t;
```

Values of `sticks[]` and `aux[]` array should be in range [0;255] and will correspond to [1000;2000] values.