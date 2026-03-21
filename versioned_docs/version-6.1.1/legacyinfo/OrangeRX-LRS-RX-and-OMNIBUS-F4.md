---
title: OrangeRX LRS and Omnibus F4
---

The OrangeRX LRS receiver is one of the more popular 433MHz options on the market.
It is sold by Hobbyking and has been around for many years.

When using this receiver with a flight controller such as Omnibus F4 there are
several options for communicating the receiver with flight controller:

## PPM

The easiest option is to use a sevo lead and connect the PWM5 (Port 6) to
receiver port on the board. There is a small issue with that approach in that
this particular receiver's PPM signal is too weak for the flight controller to
receive.

The reason for it is there are additional 1k resistors on the digital lines
leading from the MCU to pins. There are 2 options to fix it:

### Modify the receiver

The easiest and most recommended one is to bridge the resistor with a piece of
a thin wire. Soldering that is very easy. That way you can also remove the
wire if you so desire at a later time.

### Modift the flight controller

This option is pretty easy at first: on the flight controller, left to the
receiver pins there are two 0 Ohm resistors labelled SBUS and PPM. Removing the
bottom one (looking at the bord such that the USB port is pointing downwards)
will get the PPM signal too. However, that resistor is very small and in a very
tight spot so making a mistake there is really easy.

### Telemetry

When using PPM telemetry won't work. Use SUMD instead.

## SBUS

SBUS is normally inverted in hardware. That is also the case wth Omnibus F4.
To be able to connect SBUS to the OrangeRX LRS receiver you need to have
a signal inverter or use the UART1 port (available in the bottom-left corner
when the USB port is pointing downwards). This will take the unininverted
SBUS signal from UART1 TX go straight to the RX pin on the receiver.

In iNAV setup UART1 for serial receiver.

## SUMD

The last option is SUMD which is the best option if you want full 16 channels.
It also works best when used with telemetry.

To use SUMD connect UART1 RX of the flight controlller with TX pin of the receiver.

In iNAV setup UART1 for serial receiver.

If you would like to use telemetry connect UART1 TX pin of the flight controller
to RX pin of the receiver and enable telemetry on UART1 in iNAV.
