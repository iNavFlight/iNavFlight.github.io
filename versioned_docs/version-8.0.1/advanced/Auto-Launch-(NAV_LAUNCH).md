---
title: Airplane launch assistant
---

# Airplane launch assistant

INAV's auto launch is intended to provide assistance for launching the fixed-wing UAVs. Launch detection works by monitoring airplane acceleration - once it breaches the threshold for a certain amount of time launch sequence is started. This detection should happen due to a thrown release or a launch system, such as a bungee launch. Do not fake throw, or "shake and bake", your airplane to start the motor prematurely. If powered assistance is needed. Use the idle idle throttle settings to assist.

`NAV LAUNCH` mode is based on `Angle` mode. So it will try and stabilise plane. It will target zero roll, zero yaw and the predefined climb angle. The I-gain of the PIFF regulator is also disabled to prevent I-gain growing during launch until motor is started. When successful launch is detected it waits for preconfigured amount of time before starting motor.

`NAV LAUNCH` is automatically aborted after a timeout in seconds (default of 5 seconds), by exceeding an altitude (default to off), or by any pilot input on PITCH/ROLL stick. When it has aborted it goes to whichever mode is selected. This can be Angle, Acro, Horizon, RTH or a waypoint mission (if no other mode is selected it will go to Acro mode).

It's safe to keep `NAV LAUNCH` activated during flight, after the launch has being completed. But, keep in mind that if you accidentally disarm while flying. You need to disable `NAV LAUNCH` mode to being able to control the model again.

Gliders have different needs than motorised planes. See [below](#glider-and-slope-soarer-setup) for advice on a glider launch setup.

See the INAV CLI [Settings document](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md) for all available parameters, they start with `nav_fw_launch_`. The most used settings for launch mode can be found on the **Advanced Tuning** page in INAV Configurator.

## Launch sequence
The sequence for launching an airplane using `NAV LAUNCH` mode looks like this:

1. Make sure you are in a non-navigation mode (Manual, Acro, Angle, or Horizon).
2. If auto launch is not permanently enabled. Set your switch to enable NAV LAUNCH mode.
3. ARM the plane.
4. Set the flight mode to the **exit** flight mode. This will be used after the launch has completed. **Loiter** is a great choice for the exit flight mode.
5. Put throttle stick to desired throttle value to be used **after** launch is finished.
    - If [`nav_fw_launch_idle_thr`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_thr) is set. The motor could start spinning at this point. Verify that motor doesn't respond to throttle stick motion. Don't touch the pitch/roll stick! 
    - From version 3.0 [`nav_fw_launch_idle_motor_delay`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_idle_motor_delay) can be set to delay the motor starting at idle (useful for launching large aircraft). When idle motor delay is used the launch beep sound changes a few seconds before the motor is about to start as a warning to the pilot (beep becomes more rapid).
    - From version 8.0 [`nav_fw_launch_wiggle_to_wake_idle`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_wiggle_to_wake_idle) can be used to activate the idle throttle. It can be used in addition to, or instead of, [`nav_fw_launch_idle_motor_delay`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_idle_motor_delay).
6. Launch the airplane.
7. Motors will start at the pre-configured [`nav_fw_launch_idle_thr`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_thr) (default 1700) after [`nav_fw_launch_motor_delay`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_motor_delay) (500ms).
8. The launch sequence will finish when pilot switch off the `NAV LAUNCH` mode or moves the sticks, or the exit criteria has been met (timeout or altitude).

> [!CAUTION]
> Motors will spin if you disable `NAV LAUNCH` mode after arming.

## Adjustments and settings for launch

### Launch threshold detection
For most airplanes, the default settings for the launch threshold detection should work fine. However, with some larger aircraft. These settings may need adjustment. Checking and fine tuning these parameters are the only time you should jerk your airplane to "fake launch". Once set, throwing the airplane alone is all that is needed to trigger the launch.

#### Testing launch detection thresholds
To test the launch detection, prep your airplane for flight, but remove the propeller. Go through the [launch sequence](#Launch-sequence) up until task 6. If you can't arm at task 3 due to a lack of GPS fix. You can force arm with yaw right as you arm. Next, basically throw the airplane, but don't let go. This should be the same way with the same force as you would launch the airplane for real. If the motors start, great. You don't need to do anything. But if the motors don't start, you may need to adjust the threshold parameters. Again, this should only be necessary for a large or heavy airplane.

#### Threshold adjustments
There are two parameters related to the launch detection threshold:
- ['nav_fw_launch_velocity'](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_velocity)
- ['nav_fw_launch_accel'](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_accel)

You should not need to change `nav_fw_launch_velocity`. This is how fast the aircraft is moving forward. The default value is 300 cm/s, which is 10.8km/h. You should be able to throw any airplane forwards at 10.8 km/h.

`nav_fw_launch_accel` is the acceleration of the airplane in cm/s/s. With larger or heavier airplanes, you may need to reduce this slightly. The default value is 1863. If you need to reduce, go down to 1850 and try again. After that, reduce by 25 and try again until you find a setting that consistently works. Getting down near 1500 should be rare, unless it is a particularly large, heavy aircraft. If you're needing to adjust this setting for a 1.4kg AR Pro, you probably need to look elsewhere for the problem.

### Idle throttle

Idle throttle is an extremely useful setting for launch assistance. You can have idle throttle set low, to show you that your aircraft is ready to launch. Or you can set it higher to assist with the launch itself. There are often times that people have been seen jerking their airplane before launch, sometimes called a "shake and bake"; which is completely unnecessary with INAV. Even Joshua Bardwell has been guilty of this on one of his instructional videos. You're gonna learn something today. With a correctly set up launch detection and idle throttle. You **never** _need_ to shake and bake. In fact, we advise against it. Using auto launch correctly will be more consistent and safer.

[`nav_fw_launch_idle_thr`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_idle_thr) will set the throttle level for the motor when idle throttle is enabled. If you just want this as a low, visual aid for launch mode. You can set this to somewhere between 1050 and 1200. It should be high enough that the motor spins. But only just. If you want assistance in launching your aircraft. The idle throttle should be set high enough to assist with the push. But not so high that it is uncontrollable in your hands. This will very much be dependant on your aircraft, motor, prop, even how you hold it. So you will need to experiment or use the tool at the bottom of this page for an estimate. The default setting is `1000`; which is idle throttle is disabled.

If you don't change anything else. The motor will start spinning at idle throttle as soon as you raise the throttle in the [launch sequence](#Launch-sequence). But, we don't necessarily want this. Maybe you have a large model that needs two hands. So you need to pick it up after you have finished on your transmitter. There are definitely scenarios where you will want to delay the idle throttle from starting. There are a couple of way of doing this. One may suit your situation better.

#### Idle throttle delay

[`nav_fw_launch_idle_motor_delay`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_idle_motor_delay) allows you to add a time delay between raising the throttle and the motor starting at idle. The default is `0`, which means the setting is disabled. Above 0, will set the timeout in milliseconds. I know, why milliseconds!? All you need to do is multiply the number of seconds you want the delay to be by 1000 to get the right value. For example, a 5 second delay would be 5000 ms.

#### Wiggle to wake idle

[`nav_fw_launch_wiggle_to_wake_idle`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_wiggle_to_wake_idle) allows you to trigger the idle throttle by deliberately invoking a yaw _wiggle_ on the aircraft. This can be used instead of, or as well as, `nav_fw_launch_idle_motor_delay`. The default setting is `0`, which means the feature is disabled. Setting the parameter to `1` or `2` signifies 1 or 2 yaw wiggles to activate the idle throttle.
- 1 wiggle has a higher detection point, for smaller airplanes, which are easier to wiggle quickly. 
- 2 wiggles has a lower detection point, but requires the repeated action. This is intended for larger models, where you can't yaw wiggle as quickly.

The _wiggle_ needs to be a quick, deliberate action. This is so that there are no accidental starts of motors.

### Permanently enabled launch mode

From version 1.9 `NAV LAUNCH` can be permanently enabled via the configurator or the CLI using `feature FW_LAUNCH`. In this case `NAV LAUNCH` doesn't need to be enabled via a transmitter switch prior to arming. If you want to launch the plane manually just move pitch/roll stick after you have armed the plane and you have back throttle control. If you inadvertently disarm mid-air before raising the throttle again (you should lower the throttle to arm again) move pitch/roll stick and you will have throttle control back.

### Manual throttle launch

From INAV 6.0.0 it is possible to use NAV Launch with manual throttle control. This is really intended as a more controllable alternative to the shake to start motor and throw method of launching. Shaking the airplane to start the motor has never been recommended as a launch technique. When enabled using setting [`nav_fw_launch_manual_throttle`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_manual_throttle) the throttle is controlled manually throughout the launch using the throttle stick. There is no motor idle or detection used to start the motor, motor control is entirely manual and active via the throttle stick once armed. INAV only controls roll, yaw, and pitch attitude during the launch climb out.

> [!NOTE]
> If this option is used with no GPS fix available it is recommended to throw the plane as soon as the throttle is raised in order to avoid possible degraded control issues and premature end of the launch timeout (moving the throttle stick back to idle will reset the affected launch parameters if required).

## Glider and slope soarer setup

For obtaining launch assistance for hand-thrown gliders, it's a bit tricky. One possible solution is to setup the throttle as in input for switching modes. At lowest throttle setting, disarm and enter passthrough. Just above minimal throttle, turn on Nav Launch, then just above that, Arm and activate Angle - all simultaneously "on" for launch.

This will allow the FC to reset the launch sequence and be ready for toss with Angle activated after launch.

Setup launch parameters appropriately:

`set nav_fw_launch_climb_angle = XX` 45?

['nav_fw_launch_climb_angle'](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_climb_angle) is the climb angle for launch sequence (degrees), is also restrained by global [`max_angle_inclination_pit`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#max_angle_inclination_pit).

`set nav_fw_launch_thr = 1700`

The [`nav_fw_launch_idle_thr`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_thr) parameter can be problematic for a glider. Not obvious, since Airplanes change PID values for throttle based on [`set tpa_rate = XXX`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#tpa_rate) and [`set tpa_breakpoint = XXXX`](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#tpa_breakpoint) (adjust accordingly). Also, not well documented but PIDs are boosted at low throttles by 1.5X!! Can cause unexplained behaviour at launch. For some gliders - having PID gains reduced for toss is beneficial (DLG launch may be fastest speed the glider travels).

`set nav_fw_launch_velocity = XXX` 300?

['nav_fw_launch_velocity'](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_launch_velocity) is the forward velocity threshold for swing-launch detection [cm/s].

One option is to add Horizon mode at very top end of throttle, to enable acro flying with ability to drop back to angle mode for emergency recovery.

## Tools

Traditionally, to get the launch throttle. You would need to power your airplane and raise the throttle to get the hover point. This is not the safest of practices. Especially with large models. However, [this tool](https://www.mrd-rc.com/tutorials-tools-and-testing/useful-tools/inav-auto-launch-throttle-estimator/) can be used to **estimate** the launch and idle throttle for the model. Please note that it is an estimate. So test and be ready to take over the launch. However, it should give a reasonable starting point. Allowing you to raise or lower the throttle levels to suit.