---
title: Firmware Recovery with Dfu‐util
---

# Firmware Recovery

## Overview

It is possible to recover firmware from a flight controller using the open source [dfu-util](https://sourceforge.net/projects/dfu-util/) application. This is available via the package manager for most Linux distros / FreeBSD and from the quoted URI for other platforms.

Note that you will need to either set device permission or run `dfu-util` as root on POSIX platforms. On Linux systems with `systemd`, the following `udev` rule may help:

```
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0483", ATTRS{idProduct}=="df11", MODE="0660", TAG+="uaccess"
```

Note: It is also necessary to set the FC into `dfu` (aka bootloader) mode before running `dfu-util`.

## Hex and Bin files

The INAV build process typically generates `hex` files (these are encoded ASCII text), whereas `dfu-util` requires binary (`bin`) files. The `gcc` tool `objcopy` can convert between `hex` and `bin` if required.

```
# hex to bin
objcopy -I ihex file.hex -O binary file.bin
# bin to hex
objcopy -I binary file.bin -O ihex file.hex
```

Note: You can build `bin` files directly from source `ninja TARGET.bin` (vice `ninja TARGET` for a `hex` file).

### Recovering flash

In order to recover FC flash, you need to know the firmware `bin` file size. There is no penalty for specifying to large a size (within the flash capacity), so using the known flash size or the extant INAV firmware `bin` size (with some overhead) will work.

### Recovery Example

To recover the factory firmware from a F722. The physical flash size is 512KB and the INAV 8 firmware for this (out of tree) device is `499479` bytes:
```
$ ls -l /tmp/inav_8.0.0_WARPF7.bin
-rw-r--r-- 1 jrh jrh 499479 Nov 17 19:48 /tmp/inav_8.0.0_WARPF7.bin
```
So I'll use 512000 bytes in the example, as that should be safe; replace `512000` with the size your device requires:
```
#
# First, but the device in DFU Mode (button, cli command)
# then
$ dfu-util  -a 0 -s 0x08000000:512000 -U /tmp/oldflash.bin
dfu-util 0.11

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2021 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

Opening DFU capable USB device...
Device ID 0483:df11
Device DFU version 011a
Claiming USB DFU Interface...
Setting Alternate Interface #0 ...
Determining device status...
DFU state(2) = dfuIDLE, status(0) = No error condition is present
DFU mode device DFU version 011a
Device returned transfer size 2048
DfuSe interface name: "Internal Flash  "
Upload    [=========================] 100%       512000 bytes
Upload done.
```

### Reinstall the recovered firmware

Having got the firmware `/tmp/oldflash.bin`, it is possible to reflash this recovered firmware.

```
#
# First, but the device in DFU Mode (button, cli command)
# then
$ dfu-util -d 0483:df11 --alt 0 -s 0x08000000:force:leave -D /tmp/oldflash.bin
dfu-util 0.11

Copyright 2005-2009 Weston Schmidt, Harald Welte and OpenMoko Inc.
Copyright 2010-2021 Tormod Volden and Stefan Schmidt
This program is Free Software and has ABSOLUTELY NO WARRANTY
Please report bugs to http://sourceforge.net/p/dfu-util/tickets/

dfu-util: Warning: Invalid DFU suffix signature
dfu-util: A valid DFU suffix will be required in a future dfu-util release
Opening DFU capable USB device...
Device ID 0483:df11
Device DFU version 011a
Claiming USB DFU Interface...
Setting Alternate Interface #0 ...
Determining device status...
DFU state(2) = dfuIDLE, status(0) = No error condition is present
DFU mode device DFU version 011a
Device returned transfer size 2048
DfuSe interface name: "Internal Flash  "
Downloading element to address = 0x08000000, size = 512000
Erase       [=========================] 100%       512000 bytes
Erase    done.
Download    [=========================] 100%       512000 bytes
Download done.
File downloaded successfully
Submitting leave request...
Transitioning to dfuMANIFEST state
```

When the FC has rebooted, let's see (you can just as easily use `INAV Configurator` or `mwp` or other tool), here I use mwp's `cliterm` as it's quick and easy:

```
$ cliterm
2024-11-17T19:58:47+0000 Registered serial device: /dev/ttyACM0 [0483:5740], Vendor: INAV, Model: STM32_Virtual_ComPort_in_FS_Mode, Serial: 2065345E4847, Driver: cdc_acm
opening  /dev/ttyACM0 ...

Entering CLI Mode, type 'exit' to return, or 'help'

# version
# INAV/WARPF7 8.0.0 Nov 16 2024 / 18:35:05 (7c0fe517)
# GCC-14.1.0
```

Looks like that worked.
