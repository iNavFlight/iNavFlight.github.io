---
title: Sensor Calibration
---

:::info
**Important:** INAV requires you to follow the accelerometer calibration steps below. These steps are different to Cleanflight & Betaflight. So don't skip reading this section, **it's vitally important**.
:::

Modern accelerometer sensors are precise, but they require calibration if we want accurate measurements.

The sensors on your flight controller might be biased and gains on different axes might be different. INAV uses an advanced 6-point calibration to take care of all irregularities your flight controller sensors might have.

## Accelerometer calibration steps

Unlike the simple level calibration used in cleanflight & betaflight INAV uses a "6 point accelerometer calibration" process.

You may find this easier to do more accurately prior to installing the flight controller in your model and this procedure MUST be done referenced to the marked orientation on the board.

See "calibration procedure" below:

**Note:** If the flight controller is mounted in another angle or upside down, do the calibration steps with the flight controller pointing as shown in the pictures, not based on the orientation of the quad or fixed wing model itself, otherwise calibration won´t work.

0. Connect the model to the "Configurator" software, select the "Setup" tab.

1. Place the model level (_position 1 as shown in the picture_) and press the "Calibrate Accelerometer" button. Advanced calibration has been activated and has recorded the first data point.

2. Place model on all sides in sequence (_positions 2 to 6_): on its back, right side, nose up, left side, nose down. Press "Calibrate Accelerometer" button for in each position. The advanced calibration algorithm will record 2nd to 6th data points.

3. After all 6 positions have been recorded advanced calibration will calculate offsets and gains, then store them in the flight controllers EEPROM. Accelerometer calibration complete (YAY!).

4. Use the CLI tab to verify that **accgain_x**, **accgain_y** and **accgain_z** parameters are **NOT 4096**. If they are, algorithm failed to converge, calibration failed and needs to be repeated. In addition, **acczero_x**, **acczero_y**, **acczero_z**, should **not be 0** any more.

There is no need to place the model perfectly aligned, the algorithm does not care about exact positions as long as they are close to 90 degree apart and copter is stationary in every position.

## Board Orientation and Level Calibration

If you have your board rotated in any way, change board alignment to match (_see the configuration tab in the INAV configurator_).

You can verify the correct board orientation by banking your your aircraft left and right, forward and back and rotate left and right. In all examples the 3D model image in configurator **must** move accordingly.

Accelerometer calibration **does not** record a leveled model.

For level flight and navigation features to work you need to trim the firmware to level flight using "Board Alignment" on the "Configuration" tab. The readings should show close to 0.0 on all axis when the aircraft is laying flat.

To trim out unleveled flight / drift using stick commands is really useful.

**Note:** If using CLI to set up board alignment unlike Cleanflight firmware board alignment angles are set in degrees\*10, so if you need to trim your board 1.5 degrees you should enter "15".

## Compass Calibration

Accurately setting up the compass is vital because it is the primary source of heading information.

Without an accurate heading the drone will not move in the correct direction in autopilot modes (POSHOLD, RTH, Waypoint). This can lead to circling (aka “toilet-bowling”) or even fly-aways.

The magnetometer (_basically a compass_) measures magnetic field strength so it should be placed a**way from any sources of magnetic interference** - power wires, ESCs, motors, beepers, metal parts of the frame, video transmitters, Llamas & so on...

The best way is to place the compass on a mast along with GPS module. When an external compass is used remember to set correct "align_mag", see the [INAV CLI variables](https://github.com/iNavFlight/inav/blob/master/docs/Cli.md) for more information. Compass must be mounted parallel to f/c. If not please follow the guide in [setting-up-the-compass-alignment](../quickstart/GPS--and-Compass-setup.md).

When using an external magnetometer 9/10 times you need to physically remove (_remove chip from board or cut a trace_) the internal one if you have on.

You can't use two identical chips/magnetometers on the same I2C bus. The 1/10 time you dont need to physically remove your internal mag is when you have different magnetometers on the flight controller and the external one. Example you cannot use two HMC5883L magnetometers.

### Performing the Calibration

Calibrate with flight battery powering up the aircraft.

Press "Calibrate Magnetometer" button.

You have 30 seconds to hold the copter in the air and rotate it so that each side (front, back, left, right, top and bottom) points down towards the earth. However the algorithm is smart enough to calculate the proper calibration values even if you simply wave the copter in the air for 30 seconds after pressing "Calibrate Magnetometer" button.

### Compass calibration using stick functions

Calibrating Mag/Compass without the need to be connected to a computer can extremely convenient while out in the field. The [Controls.md](https://github.com/iNavFlight/inav/blob/master/docs/Controls.md) wiki describes the various capabilities of adjusting the craft's controls using the TX sticks. As described in this document, calibrate the compass by moving the left stick up and to the right while at the same time, move the right stick down and to the center. The flight controller will sound two quick beeps indicating the start of the calibration. Move the craft as indicated in the paragraph above. After 30 seconds, the flight controller will sound a single beep indicating the completion of the process.

### Verifying that compass is calibrated properly

0. Use the CLI to verify that **magzero_x**, **magzero_y** and **magzero_z** parameters are **NOT 0** any more. If they are, algorithm failed to converge, calibration failed and needs to be repeated.
1. Connect the copter to iNAV Configurator and observe the attitude values on the "Setup" screen (values of Heading, Pitch and Roll). Point your models nose North and verify that heading is reading 0 deg. Tilt the copter 30 degrees forward, right, left and back while observing the Heading value. Value of 0 deg shouldn't change more than several degrees. Repeat the process with models nose pointing East (heading=90 deg), South (heading=180 deg), West (heading=270 deg).

If the value is incorrect when copter is level, you likely don't have **align_mag** CLI variable set to proper compass alignment value. If heading value is correct when copter is level but drifts when you tilt the model, then your should re-calibrate the compass.

2. Also, remember to set magnetic declination to a proper value on the "Configuration" screen.
   The magnetic declination of your specific location can be found here: [magnetic-declination.com](http://magnetic-declination.com).

If your magnetic declination readings are e.g. +3° 34' , the value entered in the INAV configurator is 3.34 (_3,34 in some locales_). In the CLI, the same effect would be `set mag_declination = 334`. For west declination, use a minus value, e.g. for 1° 32' W, `set mag_declination = -132`. In all cases (both CLI and GUI), the least significant digits are **minutes**, not decimal degrees.

Since INAV 1.2, on non-F1 targets, one can use an automatic declination setting, which is more than accurate enough for INAV. `set inav_auto_mag_decl = ON`.

## Gyroscope Calibration

Gyroscope calibration, or rather bias recording, is performed on every startup. **Your model should be stationary while powering up. **

With most models, connecting batteries while keeping the craft still can be difficult, simply ensure the craft is placed on the ground (or somewhere solid and still) for 5 seconds as soon as possible after powering up. Gyro auto calibration will only run when no motion is detected

**Note:** Under normal conditions there is no need for a manual calibration procedure, but if required this can be performed via stick commands.

## Backup and Restore the Settings

To avoid going through full calibration after resetting the configuration new CLI settings are introduced to get and set accelerometer offsets and gains: **acczero_x**, **acczero_y**, **acczero_z**, **accgain_x**, **accgain_y**, **accgain_z**. The same applies to **magzero_x**, **magzero_y** and **magzero_z**.
