---
title: Introduction
---

# Introduction
This document aims at documenting the INAV's team recommendations for hardware manufacturers looking to create a new Flight Control board to run INAV.

INAV is similar in architecture to Betaflight and runs on a subset of Betaflight supported MCUs, so a lot of the [Betaflight Manufacturer Design Guidelines](https://betaflight.com/docs/development/manufacturer/manufacturer-design-guidelines) and the [Betaflight Connector Standard](https://betaflight.com/docs/development/manufacturer/connector-standard) also apply to INAV designs and we will highlight a few points where INAV differs from their recommendations.

# Supported MCUs

| MCU | Flash Size | Remarks |
| ---- | ---- | --- |
| STM32H743 | 2M | 
| STM32F7x5 | 1M-2M |
| STM32F405 | 1M | Requires extra hardware for SBUS port |
| AT32F435  | 1M | Requires extra hardware for SBUS port |
| STM32F7x2 | 512K | Reduced feature set. Not recommended for new designs. First in line for deprecation. |


# Recommended sensors and ports

All INAV flight controllers should include:

* Supported IMU
* Supported Barometer
* I2C pads (used for magnetometer, pitot tubes, temperature sensors, etc...)
  * If the FC supports, we recommend using a separate I2C bus for the onboard peripherals and the external port.
* At least 3 UARTS broken out. (RX, Digital VTX and GPS)
  * Always expose RX and TX pins
* USB Powered 4v5 lines for RX and GPS


# Timer allocation recommendations

The supported MCU architectures timers group multiple pins on the same timer (up to 4 pins on one timer), and different protocols require different timer settings (Servo PWM, DShot, Addressable LEDs, etc...), so the different functions can't share the same timer.
Based on this limitation, INAV mixer resource allocation algorithm will assign timers for motor usage in the order they appear on your ```target.c``` file, so having consecutive timer assignments is preferred over reusing the same timer a few outputs down the line.

## Avoid what was done in TIMER2 in this example
![image](https://github.com/user-attachments/assets/a196e079-98f4-4d41-8562-3fb4788afb92)

In this example, TIMER2 was used for S3, S4 and S9. This causes S9 to not be usable as servo, if you are using S3 and S4 as motors. In extreme scenarios this will result in the loss of flexibility or even making it impossible to use servos and S1-S4 as motors, unless you set the LED output as a servo output.

## Better allocation example
![image](https://github.com/user-attachments/assets/87bc867f-bdd8-4e0b-b960-b01bea27c94b)

In this example, the timer allocations are on consecutive outputs, and the first 4 outputs are on separate timers, which gives the most flexibility between fixed wing and quad flight controllers/

# Fixed wing flight controllers vs Quad flight controllers

## Timer allocations
The current Betaflight recommendation for TIMERS is to use the same timer on S1-S4. Given airplanes with 1 or 2 motors are the most common setup and INAV's resource allocation. INAV's recommendation is to Have the S1-S2 on one TIMER, and S2-S3 on a different timer. This is not a hard requirements, but provides fixed wing users with the best experience out of the box, and may still give flexibility to maximize PWM outputs.

### Common fixed wing motor vs servo mix
|Platform|Motors|Servos|
| ---- | ---- | ---- |
|Airplane | 1-2 | 2-6+ |
| Y-Vtol | 3 | 6+ |
| H-Vtol | 5+ | 2-6+ |

# Servo Power
Most of Betaflight power delivery recommendations match INAV's, but servos are a lot more common on INAV than Betaflight, so it is worth mentioning our recommendations here.

* Servos should have its own BEC, not shared with other sensors or the main MCU.
* Servo BECs should support configurable voltage 5V, 6V, 7.2-8.4V(2S) are common servo voltages, but ship as 5V by default.
* Servo power traces on the PCB should be sized according to BEC rating/Servo power requirements.
* Disabling the onboard BEC and providing power directly to the servo rail should be an option. (2S flight pack, or ESC BEC)

# Current sensor
Include a current sensor in your FC to measure total system current consumption. Quad FCs usually include the current sensor in the 4-in-1 BEC.

# Connector, Soldering PADs, Silkscreen

We understand there are often space constraints on selecting what MCU pins gets broken out to connectors, PADs or both. We are going to add our general recommendations here.

* Wing flight controllers should use standard Servo connectors for all servo outputs. LED output should also use the same pinout/connector, so it can easily be reassigned as motor/servo
* Break out connector pins in PADs as an option. (Eg.: Have a Digital VTX connector, but also break out SBUS, VTX Power, GND and OSD Uart on pads).
* Follow the Betaflight Connector Standard
* Don't push the limit of your silk screen resolution. Too small or blurry silkscreen labels will be unreadable.
* Label your connectors
* Label your solder pads / configuration jumpers





