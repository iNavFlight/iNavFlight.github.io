---
title: Fixed Wing Guide
sidebar_position: 2
---

## The Basics of Getting iNav Working on an Airplane

### Flight controllers designed for fixed wing

Any flight controller can be used for fixed wing builds, however flight controllers specifically designed for this purpose will make the build simpler and require less additional components. For example, using a flight controller designed for multi rotors on a fixed wing setup usually requires an additional 5V regulator or a BEC for powering the servos, while flight controllers designed for planes will provide an independent 5V line to feed the servos.

Some of the most popular flight controllers for fixed wing are:

- [Matek F405-WING](https://inavflight.com/shop/s/bg/1292190) (target F405SE)
- [Matek F722-WING](https://inavflight.com/shop/s/bg/1408793)
- [Matek F411-WING](https://inavflight.com/shop/s/bg/1323063)
- [FuriousFPV F-35](https://inavflight.com/shop/s/bg/1278861)

### Suggested GPS Units

- [Beitian BN220](https://inavflight.com/shop/p/BN220)
- [Beitian BN180](https://inavflight.com/shop/p/BN180)
- [Matek M8Q](https://inavflight.com/shop/s/bg/1337287)

### Step 1: Getting Your Flight Controller Ready.

* Flash the latest version of iNav using the [iNav Configurator](https://github.com/iNavFlight/inav-configurator/releases)

* Do an entire [sensor calibration](./Sensor-calibration.md). Level should be the angle of the plane itself when flying straight. **Do not skip this step**.

* Select a preset from the iNav presets tab that fits your aircraft the best, then press "Save & Reboot"

### Step 2: Hooking Everything Up.

The image below shows the standard wiring for both a flying wing and for a normal fixed wing model with ailerons, elevator & rudder. You connect each servo to the corresponding PWM output on your flight controller.

**Note:** If you are using iNav with a Mini Talon you'll need a [Custom Mix](../advanced/Custom-mixes-for-exotic-setups.md) so that the servos move correctly or if using a Skyhunter (Nano, Micro, Mini & full sized) then there is also a custom mix available [here](../advanced/Custom-mixes-for-exotic-setups.md#skyhunter-nano-no-rudder---172-onwards).

![Mixes airplane](/img/content/mixes_airplane.png)

* Servo and ESC/MOTOR. ( Keep in mind servos positive wire **should** go to an independent BEC instead of connecting to the flight controller itself. )

    * Airplane
        * Output 1 - Motor/ESC
        * Output 2 - Empty / Or 2. motor
        * Output 3 - Elevator
        * Output 4 - Aileron
        * Output 5 - Aileron
        * Output 6 - Rudder

    * Flying Wing
        * Output 1 - Motor/ESC
        * Output 2 - Empty / Or 2. motor
        * Output 3 - Port Elevon
        * Output 4 - Starboard Elevon

An example if using SpracingF3:
 
* If using GPS connect it to UART 2.
* If using GPS setup UART2 for GPS at baud 57600 and enable GPS in configurations (if that doesn't work, try 115200).
* If using Sbus connect it to UART 3 / or the uart which are dedicated for sbus on your board.
* If using regular PPM connect it to IO 1 pin 1.
* If using telemetry connect it with softserial. ( If using Smartport read [this](https://github.com/iNavFlight/inav/blob/master/docs/Telemetry.md) )

### Step 3: Set up Your Receiver

Go to the Configuration tab and select your "Receiver Mode" for the receiver you have.

If you are using a serial based receiver (like SBUS), go to the ports tab and and turn on "Serial RX" for the port that you connected it to. Other receiver types like MSP require other port setups.

### Step 4: Setting up Your Remote, Endpoints and Reversing of Servos.

Your transmitter should use **NO mixing at all** (so separate channels for Thr, Ail, Rud, Ele). 

Check that when moving the sticks, the right channels moves in the receiver window. Also everything should be centered at 1500us, and full stick movement should be 1000-2000us. Use sub trim and travel range on your TX to set this up. 

The correct way is:

* Throttle stick push away - increased value
* Yaw (Rudder) stick right - increased value
* Pitch (Elevator) stick push away - increased value
* Roll (Ailerons) stick right - increased value

Next is checking that your servo moves as expected:

1. Servo goes the right way when moving sticks. [Youtube help video](https://www.youtube.com/watch?v=Gf74geZyKYk&t=1s)
1. The servo movement does not exceed wanted maximum deflection of control surfaces.
1. The servo midpoint has control surfaces perfectly at center.

**Note:** Check the following in Manual mode (formerly passthrough mode). In the other modes you won't see full deflection on the bench. If you don't know how to set up Manual mode, see https://www.youtube.com/watch?v=oJTPuEUZOAE

In the "Output" Tab:  

* If they go reverse, turn on the "Reverse" switch.
* If they exceed maximum wanted deflection reduce min/max  
* If control surfaces is not perfectly centered adjust servo midpoint. (This is after setting them up as close as possible mechanically )  

**Note:** You can change the servo mapping in the mixer tab.

At this point everything should work as expected.  

1: When moving sticks on TX the control surfaces should move correctly, do an [High Five](https://www.youtube.com/watch?v=Gf74geZyKYk) test  
2: When moving the airplane in the air in angle mode control surfaces should counter-act movement correctly. The controls surfaces needs to move the same way as the airplane is moved to counteract and stabilize the airplane. You may need to **temporarily** triple the amount on P-gain on Roll, Pitch and Yaw axis in the "PID tuning" tab. (So its easy to see movement.)      

### Step 5, Replace Default Values

* Type this and save in CLI to set the max roll and pitch angle in `ANGLE` mode to 60°:  
``set max_angle_inclination_rll = 600``    
``set max_angle_inclination_pit = 600``  

* Increase small angle (so INAV will let you arm in any position) type this and save in CLI:
``set small_angle = 180`` 

* If you wish for your fixed wing model to loiter instead of attempting a landing after RTH mode is selected & the model returning home, you can set the model to loiter by typing this and saving in CLI:
``set nav_rth_allow_landing = NEVER``

* In INAV when the RTH mode is enabled, the model will climb FIRST then return home. If you set this value below, the model will **turn and then climb** on it's way back to the home position:
``set nav_rth_climb_first = OFF`` 
(Generally the default would be more useful than possibly turning back into any scenery that caused the RTH)

* In INAV the default RTH height is 10 metres (approx 32') which might be too low for flying sites with trees. You can change this to 70 metres (approx 230') by setting this value in the CLI tab and typing save afterwards:
``set nav_rth_altitude = 7000``

* If you intend to glide for more than 10 seconds it's suggested that you also set this value, so that the model doesn't "failsafe" by itself when using zero throttle during a glide: ``set failsafe_throttle_low_delay = 0`` 
(This will only stop the low throttle "timed" safety Guard Failsafe and an RC Loss could still result in a DISARM when at low throttle) Stay current with latest iNAV FS options. 

* Setup `failsafe` mode. If you select your receiver to go to RTH mode in modes tab, it will not control throttle if throttle is zero.

* Setup the right failsafe action. For most users it is advised to use ``set failsafe_procedure = RTH``.

* Take a few minutes to read through how the different [Flight Modes](../features/Modes.md) affect the model in the air.

* Have `manual` mode configured so if it happens anything with gyro / accelerometer in the air you can use manual control. This includes if your flight controller resets during flight because of example an brownout.  

* Read through the INAV [CLI commands](https://github.com/iNavFlight/inav/blob/master/docs/Cli.md), especially ALL marked with "**fw_ **" This will give you hints how the modes for fixed wings work.  

### Step 6: Optional, but Recommended:

* [Tune your PIFF controller](../advanced/Tune-INAV-PIFF-controller-for-fixedwing.md) ( iNav versions 1.6 & later )

* To make altitude hold smoother you can adjust ``set nav_fw_pos_z_p`` , ``set nav_fw_pos_z_i`` and ``set nav_fw_pos_z_d``. Good values to start are 30/10/10.

* Use Airmode mode to get full stabilization and servo throw with no throttle applied.

* [Setting up failsafe with return to home.](../features/Failsafe.md)

* If your compass is not 100% properly setup just disable it instead. **A calibrated compass can cause orientation drift during flight that may not show up in the configurator** (especially built-in ones on your FC). Really consider disabling it unless you need it. INAV uses GPS heading normally, Only on ground before GPS speed has been high enough or if error between GPS heading and compass heading exceed 60deg will it use compass heading

* Use ``feature MOTOR_STOP`` for more safety. Motor will not spin if just armed.

* Use ``set tpa_rate`` and ``set tpa_breakpoint`` to optimise your PIFF for higher speeds. Good value to start is 40% at your cruise throttle position as breakpoint.

* Servo speed limits the control rate of your FC. You can lower ``set gyro_hardware_lpf`` to 20

* Adjust ``set roll_rate`` and ``set pitch_rate`` to the flight characteristics of your plane. For a race wing values like ``set roll_rate = 36`` and ``set pitch_rate = 18`` are a good starting point.

* Set your [RTH mode](../features/Navigation-Mode-Return-to-Home.md) to your liking

* Increase ``set nav_fw_bank_angle`` for tighter turns.

* ``set inav_reset_home = FIRST_ARM`` Unless you want your home position to be reset during mid air re-armings.

### Last Step, a Test Flight!:

* Double check following again:
    * 3d model in configurator moves correctly when moving airplane by hand. And that the aircraft is showing leveled when your holding the aircraft leveled in air.
    * Do the [High Five](https://youtu.be/Gf74geZyKYk) test in manual mode, verify everything is moving as expected.
    * Enable `Angle` / `Horizon` mode and verify the control surfaces moves correctly when moving aircraft by hand and by sticks on TX

* Arm and launch your aircraft using prefered mode, example `manual` for the maiden flight launch.
    * If airplane is not flying leveled when in self leveling mode like `Horizon` you need to trim your [board aligment](../quickstart/Sensor-calibration.md#board-orientation-and-level-calibration)
    * If airplane flies leveled, do an [Servo Autotrim](../features/Modes.md#servo-autotrim-fw)
    * Tune your PIFF values, either manually or with [AUTOTUNE](../features/Modes.md#autotune-fw) 

* For GPS features
    * Test `NAV ALTHOLD` and see that it holds altitude.
    * Test `NAV ALTHOLD` and `NAV POSHOLD` combined
    * Test `RTH` flight mode
    * Test [failsafe](../features/Failsafe.md)


### Optional / Guides related to Fixed Wing:

* Using a seperate BEC for servos to prevent the FC from restarting due to brownouts or interferences of the servos. [Example](http://www.rcgroups.com/forums/showpost.php?p=34254665&postcount=4006) INAV will not be able to function after an brownout, Pilot must switch into manual mode and fly manually and land the airplane.

* [Using a minimosd](./Howto:-CC3D-flight-controller,-minimOSD,-GPS-and-LTM-telemetry-for-fixed-wing.md#osd-setup)

* Howto in flight trim servos. [Aileron example at rcgroups.com](http://www.rcgroups.com/forums/showpost.php?p=35059861&postcount=6741) [Fixed wing example](https://www.rcgroups.com/forums/showpost.php?p=36039077&postcount=8732)

* Prefer using digital servos to analog ones. Digital servos are much faster. [Explanation](https://www.rcgroups.com/forums/showpost.php?p=36649528&postcount=10480)

* Add an capacitor on the +5v powering servos to avoid issues. ( Especially with digital servos ) [Link explanation](http://www.vstabi.info/en/node/1422) [Example to buy](http://www.multiwiicopter.com/products/c1-anti-brownout-cap-for-rc-drone-servos)

* [Why do I have limited servo throw-in-my airplane](../quickstart/Why-do-I-have-limited-servo-throw-in-my-airplane.md)