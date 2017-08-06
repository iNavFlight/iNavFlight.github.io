---
layout: post
title:  "Setting up INAV 1.7.2 on CONNEX FALCORE drone"
date:   2017-08-01
categories: [drafts]
hidden: true
---

Since [Version 1.7.2](https://github.com/iNavFlight/inav/releases/tag/1.7.2) INAV firmware supports [CONNEX FALCORE drone](http://www.amimon.com/fpv-market/falcore-product-page/) out of the box.

![](/assets/2017-08-01/falcore.png)

This article will guide you through the setup process.

<!--more-->

### Modding the hardware 

FALCORE drone by default does not come equipped with GPS - you need to purchase one and connect it to your FALCORE drone. I recommend purchasing [this GPS module](https://www.banggood.com/Ublox-NEO-M8N-Flight-Controller-GPS-with-Protective-Shell-for-PIX-PX4-Pixhawk-p-1005394.html) - it was proven to be working reliably.

When you got your GPS module you'll need to open it's case and figure out what wire colors correspond to 6 signals. We'll have to rearrange wires to fit FALCORE Auxiliary connector.

When you open your GPS module you should see something like this:

![](/assets/2017-08-01/gps.jpg)

Note the wire colors and signal names (VCC, GND, TXD, RXD, SCL, SDA).

Disassemble your FALCORE. Consult this video:

<iframe width="560" height="315" src="https://www.youtube.com/embed/yqH9uUqAXRY" frameborder="0" allowfullscreen></iframe>

Use sharp paper knife to carefully remove individual wires from two GPS connectors and re-arrange them into one connector to match the picture.

![](/assets/2017-08-01/connector.jpg)

Make sure wire order on the connector match wire order on GPS module. Double check that you got this step done correctly, otherwise GPS module and/or FALCORE drone may be damaged.

Assemble the FALCORE drone back together. Use double-sided tape to attach GPS module on the front of the drone (just behind the plastic camera cover).

### Flashing the firmware

 1. First of all you need to make sure that you have installed Falcore drivers. Download drivers from [CONNEX Support page](https://connexuav.zendesk.com/hc/en-us/articles/115000851263-Falcore-USB-Drivers).
 2. Then you'll need INAV Configurator which is available from [Chrome Web Store](https://chrome.google.com/webstore/detail/inav-configurator/fmaidjmgkdkpafmbnmigkpdnpdhopgel?hl=en).
 3. Open the USB cap (1) in the flight controller cover.
 4. Connect the USB cable to the drone socket (2) and to your computer.

![](/assets/2017-08-01/P23_FC_USB_cap.png)

 5. Launch the INAV Configurator software.
 6. Select the **Firmware Flasher tab** on the left side of the screen.
 7. Chose "FALCORE" and "1.7.2 - FALCORE" from drop-down lists

![](/assets/2017-08-01/flashing1.png)

 7. Click the **Load Firmware (online)** button and wait until firmware gets loaded from online repository
 8. Click the **Flash Firmware** button. A progress bar is displayed. If the flashing fails or does not start, disconnect the USB cable from the PC, wait a few seconds, reconnect and press “Flash Firmware” again.

![](/assets/2017-08-01/flashing2.png)

Now you should have you FLACORE drone flashed with INAV firmware.

### Calibrating the accelerometer

INAV requires you to follow the accelerometer calibration steps below. It's vitally important for good performance.

To perform the Falcore 6 point accelerometer calibration:

1. Select the Setup Tab. The Setup screen is displayed.
2. Place the drone leveled on a solid surface.
3. Click the Calibrate Accelerometer button once, do not move drone. The Calibration Finished message is displayed when the calibration is complete.
4. Repeat the calibration procedure for the following 5 positions:
 * leveled upside-down
 * on its right side (90 degrees right roll)
 * nose up
 * on its left side (90 degrees left roll)
 * nose down

![](/assets/2017-08-01/acc-calibration-positions.jpg)

### Calibrating the compass sensor

Accurately setting up the compass is vital because it is the primary source of heading information.

Without an accurate heading the drone will not move in the correct direction in autopilot modes (POSHOLD, RTH, Waypoint). This can lead to circling (aka “toilet-bowling”) or even fly-aways.

Calibrate with flight battery powering up the aircraft:

1. Press "Calibrate Magnetometer" button.
2. You have 30 seconds to hold the copter in the air and rotate it so that each side (front, back, left, right, top and bottom) points down towards the earth. However the algorithm is smart enough to calculate the proper calibration values even if you simply wave the copter in the air for 30 seconds after pressing "Calibrate Magnetometer" button.

After that you need to verify that compass is calibrated correctly:

Connect the FALCORE drone to INAV Configurator and observe the attitude values on the "Setup" screen (values of Heading, Pitch and Roll). 

Point your FALCORE's nose North and verify that heading is reading 0 deg. Tilt the copter 30 degrees forward, right, left and back while observing the Heading value. Value of 0 deg shouldn't change more than 3-5 degrees. Repeat the process with models nose pointing East (heading=90 deg), South (heading=180 deg), West (heading=270 deg).

If you are not able to get the compass to pass the verification - DO NOT FLY the drone!

### Test-flying the drone

TODO