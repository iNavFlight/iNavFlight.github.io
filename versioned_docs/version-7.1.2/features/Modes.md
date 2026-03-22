---
title: Modes
---

## Introduction
Flight Modes in INAV can be categorized into two groups:
* **Navigation-Modes** which involve GPS and other positional sensors. Refer to the [Navigation-Modes](./Navigation-modes.md) page for more information.
* **Non-Navigation-Modes** perform actions that may rely on a sensor like the gyro or no sensor at all. See the mode descriptions below.

Some modes are only available to certain craft types. This is indicated by:
* **FW** = Fixed Wing
* **MC** = Multi-Copter

Scroll down to the [AUXILIARY CONFIGURATION](#AUXILIARY-CONFIGURATION) section for how Modes are assigned to channels on your radio.

## Non-Navigation Modes Index:

- [ACRO MODE](#acro-mode) (default mode)
- [AIR MODE](#air-mode)
- [ANGLE](#angle)
- [ANGLE HOLD](#angle-hold-fw) **FW** (7.1 and later)
- [ARM](#arm)
- [ALTHOLD](#althold)
- [AUTO LEVEL TRIM](#auto-level-trim-fw) **FW**
- [AUTOTUNE](#autotune-fw) **FW**
- [BEEPER](#BEEPER)
- [BEEPER MUTE](#BEEPER-MUTE)
- [BLACKBOX](#blackbox)
- [CAMERA CONTROL](#camera-control)
- [CAMSTAB](#CAMSTAB)
- [FAILSAFE](#failsafe)
- [FLAPERON](#flaperon-fw) **FW**
- [FPV ANGLE MIX](#FPV-ANGLE-MIX-mc) **MC**
- [HEADADJ](#headadj-mc) **MC**
- [HEADFREE](#headfree-mc) **MC**
- [HEADING HOLD](#heading-hold)
- [HOME RESET](#home-reset)
- [HORIZON](#horizon)
- [KILLSWITCH](#killswitch)
- [LEDLOW](#ledlow)
- [LOITER CHANGE](#loiter-change-fw) **FW**
- [MANUAL](#manual-fw) **FW** (PASSTHROUGH v1.8.1 & earlier)
- [MC BRAKING](#mc-braking-mc) **MC**
- [MIXER PROFILE 2](#mixer-profile-2)
- [MIXER TRANSITION](#mixer-transition)
- [MSP RC OVERRIDE](#msp-rc-override)
- [MULTI FUNCTION](#multi-function)
- [NAV LAUNCH](#nav-launch-fw) **FW**
- [OSD ALT](#osd-alt)
- [OSD SW](#osd-sw)
- [PREARM](#prearm)
- [SERVO AUTOTRIM](#servo-autotrim-fw) **FW**
- [SOARING](#soaring-fw) **FW**
- [SURFACE](#surface)
- [TELEMETRY](#telemetry)
- [TURN ASSIST](#turn-assist)
- [TURTLE](#turtle-mc) **MC**
- [USER1 & USER2 & USER3 & USER4](#USER)  (aka PinIO)
- [WAYPOINT PLANNER](#WP-Planner)

### ACRO MODE
NOTE: This is **default** flight mode. It is only active when no other mode is active. There is no mode selection for ACRO in the configurator, only an ACRO box that highlights when no other mode is active.

This default flight mode does not self level the aircraft around the roll and the pitch axes. That is, the aircraft does not level on its own if you center the pitch and roll sticks on the radio. Rather, they work just like the yaw axis: the rate of rotation of each axis is controlled directly by the related stick on the radio, and by leaving them centered the flight controller will just try to keep the aircraft in whatever orientation it's in. This default mode is called "Acro" mode (from "acrobatic", shown in the OSD as `ACRO`). It is also sometimes called "rate" mode because the sticks control the rates of rotation of the aircraft around each of the three axes. "Acro" mode is active whenever auto-leveled mode is enabled.

### AIR MODE

In the standard mixer / mode, when the roll, pitch and yaw gets calculated and saturates a motor, all motors
will be reduced equally. When motor goes below minimum it gets clipped off.
Say you had your throttle just above minimum and tried to pull a quick roll - since two motors can't go
any lower, you essentially get half the power (half of your PID gain).
If your inputs would asked for more than 100% difference between the high and low motors, the low motors
would get clipped, breaking the symmetry of the motor balance by unevenly reducing the gain.
Airmode will enable full PID correction during zero throttle and give you ability for nice zero throttle
gliding and aerobatics. But also the cornering / turns will be much tighter now as there is always maximum
possible correction performed. Airmode can also be enabled to work at all times by always putting it on the
same switch like your arm switch or you can enable/disable it in air. Additional things and benefits: Airmode
will additionally fully enable Iterm at zero throttle. Note that there is still some protection on the ground
when throttle zeroed (below min_check) and roll/pitch sticks centered. This is a basic protection to limit
motors spooling up on the ground. Also the Iterm will be reset above 70% of stick input in acro mode to prevent
quick i-term windups during finishes of rolls and flips, which will provide much cleaner and more natural stops
of flips and rolls what again opens the ability to have higher I gains for some.

### ANGLE

In this auto-leveled mode the roll and pitch channels control the angle between the relevant axis and the vertical, achieving leveled flight just by leaving the sticks centered.
Maximum banking angle is limited by `max_angle_inclination_rll` and `max_angle_inclination_pit`

### ANGLE HOLD (FW)

This mode is a simple version of an attitude lock stabilizer. But its not designed for 3D aerobatic use.
It behaves more like Acro mode, in the way the desired flight attitude is achieved by stick deflection, and you release the stick to center. But the difference is, ANGLE HOLD will attempt to _hold or lock_ the pitch or roll attitude the airplane was commanded, when the stick is released back to center. Thus resisting any long term change to the flight attitude caused by the effects of wind...
Returning the airplane to level flight is done the same as when flying in Acro or Manual modes.

This flight mode has angle constraints set by the navigation angle limits - `nav_fw_climb_angle`, `nav_fw_dive_angle` and `nav_fw_bank_angle`. Which may also make it feel a little like ANGLE mode, with its bank limits.

It was designed to work with a flight mode and a modifier - `COURSE HOLD` or `ALT HOLD`. Although both **can not** be selected for use with ANGLE HOLD at the same time.

* ANGLE HOLD + COURSE HOLD - Will maintain a constant heading and climb angle over a long distance. e.g. Up or Down the side of a long mountain range.
* ANGLE HOLD + ALT HOLD - Will allow the airplane to make a long banking turn, without losing altitude in the turn.


**Use caution! - If the pilot requests the airplane to hold a high climb angle. The pilot MUST provide adequate throttle (motor thrust) to maintain airspeed or the airplane will stall.**

### ARM
Activates the flight controller to be ready for flight.

### ALTHOLD

Maintain the altitude of the aircraft a the moment you activate this mode is fixed. Find more information [here](./Navigation-modes.md#althold---altitude-hold).

### AUTO LEVEL TRIM (FW)
_Tuning mode_

AUTO LEVEL TRIM will attempt to automatically tune the pitch offset (`fw_level_pitch_trim`) a fixed-wing airplane needs to not lose altitude when flying straight in a self levelling flight mode. To use AUTO LEVEL you should first be in a self levelling flight mode which does _not_ use ALTHOLD. ANGLE, HORIZON, and COURSE HOLD are all fine. Once in that mode, enable AUTO LEVEL and do not make corrections. AUTO LEVEL will attempt to tune the correct Angle of Attack for your current speed. You can see how level the craft is flying with the numerical variometer element on the OSD. +/- 0.3° is an acceptable tolerance. Once flying level, you can disable AUTO LEVEL. From INAV 6.0, a system message is shown when AUTO LEVEL is active. The trimming speed and accuracy can also be adjusted via [fw_level_pitch_gain](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#fw_level_pitch_gain).

The new value isn't saved to EEPROM, you have to save it manually using either the configurator or a [stick combo](https://github.com/iNavFlight/inav/blob/master/docs/Controls.md). However, if you have a feature enabled which saves on disarm, such as Continuous Servo Trim or [Stats](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#stats). The new `fw_level_pitch_trim` will be saved.

Pre INAV 7.0, this tuning mode was called AUTO LEVEL

### AUTOTUNE (FW)
_Tuning mode_

For detailed description go to https://github.com/iNavFlight/inav/wiki/Tune-INAV-PIFF-controller-for-fixedwing

AUTOTUNE will attempt to tune roll and pitch P, I and FF gains on a fixed-wing airplane.

Autotune will monitor behavior of the airplane when you fly it and adjust P, I and FF gains to reach optimal performance.

How to use:

Take off. Any manual flight mode will do, ACRO is the best option. Enable AUTOTUNE mode. Do hard maneuvers on each axis separately. For roll - bank hard left/hard right. For pitch - fast climb, steep dive. Initially you probably will notice very soft response - make sure your flying field is big enough for slow turns.

The more maneuvers you will do - the better results AUTOTUNE will be able to reach.

AUTOTUNE will adjust gains constantly but it will take a snapshot of current gains every 5 seconds. When you disable AUTOTUNE gains from last snapshot will be restored. If you turn AUTOTUNE on and off before 5 seconds elapse - PIFF gains won't be changed.

Currently AUTOTUNE don't save gains to EEPROM - you have to save manually, using a [stick combo](https://github.com/iNavFlight/inav/blob/master/docs/Controls.md).

### BEEPER

Make the beeper connected to the FC beep (lost model finder).

### BEEPER MUTE

Allows the flight controller beeper to be muted by a switch. To provide some peace and quiet during setup.

### BLACKBOX

If you're recording to an onboard flash chip, you probably want to disable Blackbox recording when not required in order to save storage space. To do this, you can add a Blackbox flight mode to one of your AUX channels on the Configurator's modes tab. Once you've added a mode, Blackbox will only log flight data when the mode is active.

A log header will always be recorded at arming time, even if logging is paused. You can freely pause and resume logging while in flight.

See [`BLACKBOX`](https://github.com/iNavFlight/inav/blob/master/docs/Blackbox.md) for more information

### CAMERA CONTROL

Camera control 1, 2 & 3 are used to adjust settings from your RC transmitter, when analogue/HD camera's like the _Runcam Hybrid_ or _Split_ are used.
Available function control is -
1) WiFi - App connection
2) Power - Start/Stop record
3) Mode change - Alter analogue and HD image settings.

### CAMSTAB

Allows a Pan, Tilt or Roll servo's to be used as an actively stabilized gimbal. The dedicated axis for each servo is selected in the mixer tab.

### FAILSAFE

Lets you activate flight controller failsafe with an aux channel. This mode is primarily designed to manually test if failsafe will work when required.
Read [Failsafe page](./Failsafe.md) for more info.

### FLAPERON (FW)

Activating it moves both ailerons down (or up) by predefined offset.

Configuration besides activating FLAPERON mode is pretty simple, and consists of just one CLI variable:
- `flaperon_throw_offset` defines throw range in us for both ailerons that will be applied when FLAPERON mode is activated. By default it 250 with max at 400.

Flaperon offset is by default is applied as a servo mixer input with ID=14 so using custom servo mixing you can configure FLAPERON mode to deflect any servos you need (including dedicated flaps).

### FPV ANGLE MIX (MC)

This mode mixes in Pitch with a commanded ROLL stick input. Or mixes in Pitch with a commanded YAW stick input. To overcome the sweeping or arching effect that is seen via the FPV view, based on the camera's up-tilt angle. This provides a more visually appealing (true to axis) freestyle or cinematic experience.
Simply set `fpv_mix_degrees = X°` , to the up-tilt angle your camera is set. Then enable it together with ACRO mode.

### HEADADJ (MC)

It allows you to set a new yaw origin for HEADFREE mode.

### HEADFREE (MC)

In this mode, the "head" of the multicopter is always pointing to the same direction as when the feature was activated. This means that when the multicopter rotates around the Z axis (yaw), the controls will always respond according the same "head" direction.

With this mode it is easier to control the multicopter, even fly it with the physical head towards you since the controls always respond the same. This is a friendly mode to new users of multicopters and can prevent losing the control when you don't know the head direction.

### HEADING HOLD

This flight mode affects only yaw axis and can be enabled together with any other flight mode.
It helps to maintain current heading without pilots input and can be used with and without magnetometer support. When yaw stick is neutral position, Heading Hold mode tries to keep heading (azimuth if compass sensor is available) at a defined direction. When pilot moves yaw stick, Heading Hold is temporary disabled and is waiting for a new setpoint.

Heading hold only uses yaw control (rudder) so it won't work on a flying wing which has no rudder, unless it has twin motor yaw stabilization active.

### HOME RESET

This mode provides a means to reset the home location or arming coordinates the model will return to. This is beneficial if you choose to launch or takeoff before the model has a GPS fix.. By using this mode, you can fly past your launch site later in the flight, once a GPS fix is established.  And momentarily activate the feature.. **Ideally, it is better to place this mode on a Pot or multi-position button, so it doesn't get unintentionally bumped.**

### HORIZON

This hybrid mode works exactly like the previous ANGLE mode with centered roll and pitch sticks (thus enabling auto-leveled flight), then gradually behaves more and more like the default RATE mode as the sticks are moved away from the center position. Which means it has no limitation on banking angle and can do flips.

### KILLSWITCH

Allows the flight controller to be instantly disarmed and locked out, regardless of other Settings, Saves or Checks. As with the disarm switch.

### LEDLOW

Turns off the RGB LEDs

### LOITER CHANGE (FW)

Reverses set loiter direction when mode selected.

### MANUAL (FW)

Direct servo control in fixed-wing. This mode was called PASSTHROUGH mode up to version 1.8.1.

In this mode there is no stabilization. Please note that MANUAL mode also overrides nav modes except RTH. To switch to a nav mode such as POSHOLD from MANUAL, MANUAL needs to be turned off first.

What FC does in MANUAL mode is: Motor mixing, Servo Mixing, Expo settings, Throws limiting (see the `manual_*_rate` settings). Note that Failsafe is still active in this mode and can override the controls.

### MC BRAKING (MC)

This mode provides faster manual braking when the pitch stick is released. If the multirotor is being flown around in POSHOLD flight mode.
For this mode to work. It requires `nav_user_control_mode = CRUISE` to be enabled.
**Use with caution**. This mode can cause temporary runaway with some settings and under some conditions.

### MIXER PROFILE 2

This mode is primarily used to activate Mixer profile 2, which contains multirotor control and PID settings for VTOL models.

### MIXER TRANSITION

Used to transition VTOL aircraft from the _multirotor control profile_ to the _fixedwing control profile_ and back again. This is useful for allowing a VTOL to increase forward airspeed, before entering full fixedwing flight. So as not to stall or lose altitude in the transition process. Or it can also be used to slow the aircraft in fixedwing flight, for braking and better control stability before it enters the multirotor (VTOL) state.

### MSP RC OVERRIDE

Allows defined RC channels to be overridden by MSP `MSP_SET_RAW_RC` messages. The channels to be overridden are defined by the CLI setting `msp_override_channels`. There is a [code example](https://codeberg.org/stronnag/msp_override) that provides further information and a sample application illustrating the use of MSP RC OVERRIDE.

### MULTI FUNCTION

This function use a single mode to select between different functions based on feedback provided by the Multi Function OSD field. Functions are selected by briefly toggling the mode ON/OFF with this sequence, repeating until the required function is displayed in the OSD. The function is then triggered by activating the mode for > 3s. Deactivating the mode for > 3s resets everything leaving the OSD field blank. Ideally a momentary switch should be used to operate the mode although it should also work with a normal switch. Current functions include -
* Re-displaying any warnings
* Emergency landing activation
* Safehome suspend
* Trackback suspend
* Turtle mode activation
* Emergency arming function

It also provides warnings that are displayed for 10s when first triggered after which the warning disappears to be replaced with an alert symbol with a number showing the active warning total. Active warnings are then re-displayed for 5s on a rolling 30s cycle. The field is blank if there are no warnings. Current Warnings are provided for -
* Battery state
* Vibration level
* GPS Fix or Failure
* RTH Sanity (>200m heading in wrong direction)
* Altitude Sanity (difference between estimated and GPS altitude > 20m)
* Compass failure
* Ground Test mode

### NAV LAUNCH (FW)

Airplane launch assistant

This flight mode is intended to provide assistance for launching the fixed-wing UAVs. Launch detection works by monitoring airplane acceleration - once it breaches the threshold for a certain amount of time launch sequence is started.

Gliders have different needs than motorized planes.  See below for note on glider launch setup.

The entire time `NAV LAUNCH` mode it will try and stabilize plane, it will target zero roll, zero yaw and predefined climb angle. The I-gain of the PIFF regulator is also disabled to prevent I-gain growing during launch until motor is started. When successful launch is detected it waits for preconfigured amount of time before starting motor.

`NAV LAUNCH` is automatically aborted after 5 seconds or by any pilot input on PITCH/ROLL stick. When it has aborted it goes to whichever selected mode, which can be Angle, Rate, Horizon, RTH or a waypoint mission (if no other mode is selected it will go to Rate mode).

It's safe to keep it activated the `NAV LAUNCH` mode during flight after the launch has being completed. Keep in mind that if you accidentally disarm while flying you need to disable `NAV LAUNCH` mode to being able to control the model again.

See INAV CLI for all available adjustable parameters, they start with `nav_fw_launch_`

Sequence for launching airplane using `NAV LAUNCH` mode looks like this:

1. Set switch to `NAV LAUNCH` mode prior to arming (note that it won't actually enable until arming)
1. ARM the plane. Motor should start spinning at min_throttle (if `MOTOR_STOP` is active, motor won't spin)
1. Put throttle stick to desired throttle value to be set **after** launch is finished. Motor should start spinning with  `nav_fw_launch_idle_thr`. Default is 1000 so it will respect `MOTOR_STOP` if active. Verify that motor doesn't respond to throttle stick motion. Don't touch the pitch/roll stick! From version 3.0 `nav_fw_launch_idle_motor_delay` can be set to delay the motor starting at idle (useful for launching large aircraft). When idle motor delay is used the launch beep sound changes a few seconds before the motor is about to start as a warning to the pilot (beep becomes more rapid).
1. Throw the airplane.  It must be thrown leveled, or thrown by slinging it by wingtip.
1. Motors will start at pre-configured `nav_fw_launch_thr` (default 1700) after `nav_fw_launch_motor_delay` (500ms)
1. Launch sequence will finish when pilot switch off the NAV LAUNCH mode or move the sticks.

If it won't detect launch it's possible that you need to lower your threshold. Look at the CLI variables.

CAUTION: Motors will spin if you unset `NAV LAUNCH` mode after arming.

From version 1.9 `NAV LAUNCH` can be permanently enabled via the configurator or the CLI using `feature FW_LAUNCH` in this case `NAV LAUNCH` doesn't need to be enabled via a transmitter switch prior to arming.
If you want to launch the plane manually just move pitch/roll stick after you have armed the plane and you have back throttle control.
If you inadvertently disarm mid-air before raising the throttle again (you should lower the throttle to arm again) move pitch/roll stick and you will have throttle control back.

**MANUAL THROTTLE LAUNCH**

From INAV 6.0.0 it is possible to use NAV Launch with manual throttle control. This is really intended as a more controllable alternative to the shake to start motor and throw method of launching. When enabled using setting [nav_fw_launch_manual_throttle](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_manual_throttle) the throttle is controlled manually throughout the launch using the throttle stick. There is no motor idle or detection used to start the motor, motor control is entirely manual and active via the throttle stick once armed. INAV only controls roll and pitch attitude during the launch climb out.
**NOTE:** If this option is used with no GPS fix available it is recommended to throw the plane as soon as the throttle is raised in order to avoid possible degraded control issues and premature end of the launch timeout (moving the throttle stick back to idle will reset the affected launch parameters if required).

**GLIDER / SLOPER SETUP**

For obtaining launch assistance for hand-thrown gliders, it's a bit tricky.  One possible solution is to setup the throttle as in input for switching modes.  At lowest throttle setting, disarm and enter passthru.  Just above minimal throttle, turn on Nav Launch, then just above that, Arm and activate Angle - all simultaneously "on" for launch.

This will allow the FC to reset the launch sequence and be ready for toss with Angle activated after launch.

Setup launch parameters appropriately:

`nav_fw_launch_climb_angle = XX 45?`

(Climb angle for launch sequence (degrees), is also restrained by global max_angle_inclination_pit)

`set nav_fw_launch_thr = 1700`

^^this command for a glider can be problematic.  Not obvious, since Airplanes change PID values for throttle based on `set tpa_rate = XXX` and `set tpa_breakpoint = XXXX`  (adjust accordingly).  Also, not well documented but PIDs are boosted at low throttles by 1.5X!!  Can cause unexplained behavior at launch.  For some gliders - having PID gains reduced for toss is beneficial (DLG launch may be fastest speed the glider travels)

`nav_fw_launch_velocity = XXX 300?`

(Forward velocity threshold for swing-launch detection [cm/s])

One option is to add Horizon mode at very top end of throttle, to enable acro flying with ability to drop back to angle mode for emergency recovery.

### OSD ALT

Switches to the different alternative OSD displays ALT1, ALT2 or ALT3. The default OSD is shown when none of these are selected.

### OSD SW

Switches off the OSD.

### PREARM

When PREARM is assigned a range, INAV then prevents Arming until the PREARM condition is met and will raise a prearm error if Arming is attempted. After the craft is armed, then INAV stops monitoring the PREARM condition.

### SERVO AUTOTRIM (FW)
_Tuning mode_

In flight adjustment of servo midpoint for straight flight

This was changed in 3.0. Only servos with a "stabilized" rule on the INC Servo Mixer are trimmed.  Also note that the automatic version of this introduced in 3.0 requires a GPS and detectable motion in order to work.

_The purpose of this mode is to set new midpoints for servos 2 to 5. Makes sure you assign these servo numbers to your control surfaces or they will not be trimmed. If you have another servo (e.g. a servo gimbal) assigned to to servos 2 to 5, then this servo _will_ be trimmed._

This is so when switching into manual mode the plane will fly straight, its also to help the PIFF controller know where the plane is expected to fly straight.

How to use:

1. This is intended to use in air.
2. Fly straight, choose what mode that suites you best. (`manual`, `angle` or `acro`)
3. Enable `SERVO AUTOTRIM` mode, and keep flying straight for 2 seconds. After 2 seconds it will set new midpoints based on average servo position during those 2 seconds.
4. If you're are NOT happy with new midpoints disable `SERVO AUTOTRIM` mode and it will revert back to old settings. If you want to keep new midpoints keep `SERVO AUTOTRIM` turned on, land aircraft and disarm. New midpoints will be saved.

You may want to inspect your new midpoints after landing, if the servo offset is a lot you may alter your linkage mechanically and redo servo midpoint.

This is not to be confused with tuning your aircraft for leveled flight in `ANGLE` mode, to do this you need to adjust your board alignment so straight flight for that aircraft is show the board being level ( 0 pitch and 0 roll ).

### SOARING (FW)

Fixed wing mode for soaring flight with motor off so intended for sailplanes or motor gliders. Mode becomes active only when Position Hold or Cruise/Course Hold modes are also selected providing semi-autonomous soaring whilst circling or flying straight with heading hold.

When mode is active altitude control is disabled and Angle mode allowed to free float (disabled) within the pitch range set by `nav_fw_soaring_pitch_deadband` (float pitch angle either side of level). The motor can be stopped by setting `nav_fw_soaring_motor_stop`.

### SURFACE

Enable terrain following when you have a rangefinder enabled

### TELEMETRY

### TURN ASSIST

Normally YAW stick makes a turn around a vertical axis of the craft - this is why when you fly forward in RATE and do a 180-deg turn using only YAW you'll end up looking upwards and flying backwards. In ANGLE mode this also causes an effect known as a pirouetting where turn is not smooth the horizon line is not maintained.

In RATE mode pilot compensated for this effect by using both ROLL and YAW sticks to coordinate the rotation and keep attitude (horizon line).

TURN ASSISTANT mode calculates this additional ROLL command required to maintain a coordinated YAW turn effectively making YAW stick turn the aircraft around vertical axis relative to the ground.

In RATE mode it allows one to makes a perfect yaw-stick only turn without changing attitude of the machine. There might be slight drift due to not instant response of PID control, but still much easier to pilot for a RATE-mode beginners.

In ANGLE mode it also makes yaw turns smoother and completely pirouette-less. This is because TURN ASSIST introduces feed-forward control in pitch/roll and maintains attitude naturally and without delay.

From INAV 1.7 turn assist will work one planes, copy paste from pull request:

This extends TURN_ASSIST flight mode on airplanes - when doing a turn on an airplane it will calculate required yaw and pitch rate to keep airplane pointed at horizon.

TAS (from airspeed sensor) will be used for calculation if available - otherwise code will use cruise airspeed defined by fw_reference_airspeed.

### TURTLE (MC)

Provides a means of flipping over a multicopter that has crash landed upside down, by using the roll or pitch sticks.

### USER
These are shown as USER1 & USER2 & USER3 & USER4 and also known as `PinIO` , when broken out on many flight controllers.
The four USER selections are generic in nature. But are often used for certain functions, depending on what the flight controller manufacturer decides to place on that mode.

**e.g.**
- Some FC manufactures have `USER 1` as a VTX power switch. Which includes the electronic hardware, to power ON and OFF your HD or Analogue VTX.
- They may also add the flight controller hardware to allow for analogue dual camera switching on `USER 2`.
- While it is common to see `USER 3` selected to turn ON or OFF the power to a free standing HD camera.
- And `USER 4` to allow for the remote Start/Stop recording of a free standing HD camera.

**Note:** This should not be taken as a set order. Always read the hardware definition in FC manufacturers manual.

### WP Planner

This is a Navigation-Mode that allows you to plot a waypoint mission as you fly. See more [details](./Navigation-modes.md#wp-planner---on-the-fly-waypoint-mission-planner)

## AUXILIARY CONFIGURATION

Spare auxiliary receiver channels can be used to enable/disable modes.  Some modes can only be enabled this way.

Configure your transmitter so that switches or dials (potentiometers) send channel data on channels 5 and upwards (the first 4 channels are usually occupied by the throttle, aileron, rudder, and elevator channels).

_e.g. You can configure a 3 position switch to send 1000 when the switch is low, 1500 when the switch is in the middle and 2000 when the switch is high._

Configure your TX/RX channel limits to use values between 1000 and 2000.  The range used by mode ranges is fixed to 900 to 2100.

When a channel is within a specified range the corresponding mode is enabled.

Use the GUI configuration tool to allow easy configuration when channel.

### CLI

There is a CLI command, `aux` that allows auxiliary configuration.  It takes 5 arguments as follows:

* AUD range slot number (0 - 39)
* mode id (see mode list below)
* AUX channel index (AUX1 = 0, AUX2 = 1,... etc)
* low position, from 900 to 2100. Should be a multiple of 25.
* high position, from 900 to 2100. Should be a multiple of 25.

If the low and high position are the same then the values are ignored.

e.g.

Configure AUX range slot 0 to enable ARM when AUX1 is within 1700 and 2100.

```
aux 0 0 0 1700 2100
```

You can display the AUX configuration by using the `aux` command with no arguments.

### Mode ID List
*  "ARM"	0
*  "ANGLE"	1
*  "HORIZON"	2
*  "NAV ALTHOLD"	3
*  "HEADING HOLD"	5
*  "HEADFREE"	6
*  "HEADADJ"	7
*  "CAMSTAB"	8
*  "NAV RTH"	10
*  "NAV POSHOLD"	11
*  "MANUAL"	12
*  "BEEPER"	13
*  "LEDS OFF"	15
*  "LIGHTS"	16
*  "OSD OFF"	19
*  "TELEMETRY"	20
*  "AUTO TUNE"	21
*  "BLACKBOX"	26
*  "FAILSAFE"	27
*  "NAV WP"	28
*  "AIR MODE"	29
*  "HOME RESET"	30
*  "GCS NAV"	31
*  "FPV ANGLE MIX"	32
*  "SURFACE"	33
*  "FLAPERON"	34
*  "TURN ASSIST"	35
*  "NAV LAUNCH"	36
*  "SERVO AUTOTRIM"	37
*  "KILLSWITCH"	38
*  "CAMERA CONTROL 1"	39
*  "CAMERA CONTROL 2"	40
*  "CAMERA CONTROL 3"	41
*  "OSD ALT 1"	42
*  "OSD ALT 2"	43
*  "OSD ALT 3"	44
*  "NAV COURSE HOLD"	45
*  "MC BRAKING"	46
*  "USER1"	47
*  "USER2"	48
*  "LOITER CHANGE"	49
*  "MSP RC OVERRIDE"	50
*  "PREARM"	51
*  "TURTLE"	52
*  "NAV CRUISE"	53
*  "AUTO LEVEL"	54
*  "WP PLANNER"	55
*  "SOARING"	56
