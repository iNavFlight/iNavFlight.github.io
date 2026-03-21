---
title: Bluetooth Connection to Configurator
---

You want to extend the lifetime of your micro USB and look cool on the field? Whip up your phone and setup your FC via bluetooth, this guide is for you.

![](https://i.imgur.com/HDakZPo.jpg)

## Equipment

- Flight Controller with a 3V3 pin and one free UART.
- [Bluetooth chips, 2 pieces for $8](https://www.amazon.com/gp/product/B07BRM9752/ref=oh_aui_search_asin_title?ie=UTF8&psc=1) this module is great because it's already setup optimally, baudrate at 115200 so you don't need to use an FTDI to send AT code at.
  The manual for this module is [here](https://fccid.io/2AM2YJDY-08/User-Manual/User-Manual-3511895)

## Procedure

1. Find a free UART on your FC and determine the TX and RX
2. Connect pin 03 (TX) of the module to RX on your FC
3. Connect pin 02 (RX) of the module to TX of your FC
4. Connect VCC to a 3V3 pin on your FC
5. Connect GND to any ground on your FC
6. In INAV configurator set the UART to MSP, baudrate 115200
   Save and reboot.

Now you can connect to your flight controller with the excellent Speedybee app.
