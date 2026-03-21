---
title: Navigation Modes
---

**This Wiki page needs updating in regards to renamed CLI variables.**

This page lists and explains all the different navigational flight modes of iNav:

- [NAV ALTHOLD - Altitude hold](#althold---altitude-hold)
- [NAV POSHOLD - Horizontal position hold](#nav-poshold---position-hold)
- [NAV COURSE HOLD - Fixed Wing Heading Hold](#althold---altitude-hold)
- [NAV CRUISE - Fixed Wing Heading + Altitude Hold](#althold---altitude-hold)
- [NAV RTH - Return to home](#rth---return-to-home)
- [NAV WP - Autonomous waypoint mission](#wp---autonomous-waypoint-mission)
- [WP PLANNER - On the fly waypoint mission planner](#wp-planner---on-the-fly-waypoint-mission-planner)
- [GCS NAV - Ground control station](#gcs_nav---ground-control-station)

For safety reasons, INAV’s navigation modes can be activated only if:

- ACC and MAG (multirotor only) are [calibrated](../quickstart/Sensor-calibration.md) properly
- a valid 3D GPS fix is available
- a valid altitude source is available
- the FC is armed

This applies to enabling the navigation modes in the Configurator as well as at the flying field.
(For bench tests without(!) propellers you may change “set nav_extra_arming_safety = ON” to “ALLOW_BYPASS” in CLI. Then use yaw right when arming to bypass the checks.)

- Flightmodes are self contained. For example: with RTH and WP (Waypoints) it's not necessary to enable angle, althold or mag, it enables what it needs. Read more below in POSHOLD section.
- On fixed wing aircraft, enabling CRUISE, RTH, WP or POSHOLD also enables TURN ASSIST. TURN ASSIST applies elevator and rudder input when the airplane is banked to obtain a coordinated turn.

|             | COURSE HOLD | CRUISE | POSHOLD | WAYPOINT | RTH | ALTHOLD |
| ----------- | ----------- | ------ | ------- | -------- | --- | ------- |
| ANGLE       | X           | X      | X       | X        | X   |         |
| ALTHOLD     |             | X      | X       | X        | X   |         |
| TURN ASSIST | X           | X      | X       | X        | X   |         |
| MAG         |             |        |         | X        | X   |         |
| BARO        |             |        |         | X        | X   | X       |

:::note
**Prior to version 2.6 on a fixed wing the motor will stop in all Nav modes except Nav RTH and Nav WP if the throttle is reduced below the Min_Check setting. From version 2.6 this behaviour is controlled using the nav_overrides_motor_stop setting which by default keeps the motor running in all Nav modes.**
:::

- There is a companion [[wiki page further describing way point missions, tools and telemetry options|iNavFlight Missions]].

Note: All INAV parameters for distance, velocity, and acceleration are input in cm, cm/s and cm/s^2.

Let's have a look at each mode of operation in detail.

## ALTHOLD - Altitude hold

When activated, the aircraft maintains its actual altitude unless changed by manual throttle input.
Throttle input indicates climb or sink up to a predetermined maximum rate (see CLI variables). Using ALTHOLD with a multicopter, you need a barometer. **Please see the platform specific notes for ALTHOLD below.**

SONAR: Altitude hold code will use sonar automatically on low altitudes (< 3m) if hardware is available.
Using ALTHOLD with a plane (fixed wing: fw) with GPS: Since INAV 1.5 it's recommended to keep baro enabled, and for INAV 1.6 the plan is to rely even less on GPS altitude when baro is enabled.

**In general you shouldn't use ALTHOLD with ACRO/HORIZON: ALTHOLD doesn't account for extreme acro manoeuvres.**

Activate ALTHOLD by **ALTHOLD** flight mode.
Altitude, as calculated by INAV's position estimator, is recorded to BLACKBOX as navPos[2].

### a) Using ALTHOLD with a multicopter (mc):

Activate AIRMODE to keep the copter stable in fast descent - now you can do the whole flight in altitude hold - from take-off to landing.

Climb rate in ALTHOLD mode:
"set nav_max_climb_rate = 500" and "set nav_manual_climb_rate = 200" define the maximum climb and decent rate in autonomous/manual flight modes.
The neutral position of the throttle stick to hold current altitude is defined by

- “set nav_use_midthr_for_althold=ON”: use mid position of throttle stick as neutral. By default the mid position value is typically 1500us as set in the "Receiver" tab.
- “set nav_use_midthr_for_althold =OFF”: use current stick position (i.e. when activating ALTHOLD) as neutral. [Yet, if "nav_use_midthr_for_althold=OFF”, and you enable ALTHOLD with throttle stick too low (like on the ground) INAV will take “thr_mid” as a safe default for neutral. “thr_mid” is defined in the “Receiver” tab and should be set to hover throttle.]

In the moment you engage ALTHOLD, INAV always sends “nav_mc_hover_thr” to the motors as the starting value of the altitude control loop. You should configure this to your copter's hover setting, if your copter doesn't hover close to the default value of 1500us. Otherwise your copter will begin ALTHOLD with a jump or drop.

Example: Let's assume "nav_mc_hover_thr” is already set correctly to your copter's hover throttle and “set nav_use_midthr_for_althold =OFF”. Let's say you have your throttle stick at 30%, and you enter ALTHOLD, your copter will maintain hover at this 30%. If throttle is increased up to 40% it will start to climb. (Even if your copter needs 60% throttle to actually climb up in normal flight without ALTHOLD.)

It's important to note that when the battery is full, "nav_mc_hover_thr” could be a lower value than when the battery is weaker. With a weaker battery more throttle will be needed to maintain a hover. A practical way to establish an approximate valid value is to use the INAV OSD screen to test values real-time when in the field. Once an approximate "nav_mc_hover_thr” has been established, then adjust the PIDs as described in the "PIDs for altitude hold" section below.

"set alt_hold_deadband = 50": You have to change throttle command (e.g. move throttle stick) by at least this amount to make the copter climb or descend and change target altitude for ALTHOLD.
If ALTHOLD is activated at zero throttle INAV will account for deadband and move the neutral "zero climb rate" position a little bit up to make sure you are able to descend.

PIDs for altitude hold:
_**The following values can be accessed using INAV OSD when configured for FPV from the "ALT MAG" screen within the "PIDS" section. Alternatively, the comparable variable, in parenthesis (), can be entered in the CLI of INAV Configurator.**_

- ALT P (nav_mc_pos_z_p) - defines how fast copter will attempt to compensate for altitude error (converts alt error to desired climb rate)
- ALT I (nav_auto_climb_rate) - defines how fast copter will accelerate to reach desired climb rate
- VEL P (nav_mc_vel_z_p) - defines how much throttle copter will add to achieve desired acceleration
- VEL I (nav_mc_vel_z_i)- controls compensation for hover throttle (and vertical air movement, thermals). This can essentially be zero if hover throttle is precisely 1500us. Too much "VEL I" will lead to vertical oscillations, too low "VEL I" will cause drops or jumps when ALTHOLD is switched on.
- VEL D (nav_mc_vel_z_d)- acts as a dampener for VEL P and VEL I, will slower the response and reduce oscillations from too high VEL P and VEL I
- If ALT P (nav_mc_pos_z_p) and ALT I (nav_auto_climb_rate) have been set to zero (0) during the PID adjustments, setting ALT P (nav_mc_pos_z_p) to a non-zero value (100?), will have the effect of changing the ALTHOLD altitude using the throttle. Once again, the easiest trial and error testing is done through the INAV OSD while in the field.

Inability to maintain altitude can be caused by a number of reasons:

1. insufficient ALT_P and/or ALT_I
2. non-functional baro (please go to "Sensors" tab in Configurator and verify that baro graph changes as you move the quad up and down
3. seriously underpowered quad (ALTHOLD is able to compensate only to some degree. If your quad hovers at 1700 linear throttle without any expo, ALTHOLD might fail to compensate)
4. Gaining altitude during fast flight is likely due to increased air pressure and that is treated as going down in altitude - try covering your baro with (more) foam.

ALT+VEL PID Tuning
Let's make a small experiment: Make sure baro is well isolated. You may also want to reduce baro weight:

- "set inav*w_z_baro_p = 0.5" and "set ALT P(nav_mc_pos_z_p) = 0" and try flying. This way the controller will attempt to keep zero climb rate without any reference to altitude. The quad should slowly drift either up or down. If it would be jumping up and down, your "VEL \* (nav_mc_vel_z*\*)" gains are too high.

- As a second step you can try zeroing out "VEL P (nav_mc_vel_z_p)" and "VEL I (nav_mc_vel_z_i)" and "set VEL D (nav_mc_vel_z_d) = 100". Now the quad should be drifting up/down even slower. Raise "VEL D (nav_mc_vel_z_d)" to the edge of oscillations.

- Now raise "VEL P (nav_mc_vel_z_p)" to the edge of oscillations. Now ALTHOLD should be almost perfect.

- And finally "set nav_mc_hover_thr" slightly (50-100) higher/lower than your actual hover throttle and tune "VEL I (nav_mc_vel_z_i)" until the quad is able to compensate.

Keep in mind that no tuning can fix bad baro isolation issue.

If quad is buzzing while ALTHOLD is activated try lowering "VEL P (nav_mc_vel_z_p)" a bit.

What is the trick with "VEL I (nav_mc_vel_z_i)"?
"VEL I (nav_mc_vel_z_i)" is used to compensate for "nav_mc_hover_thr" (hover throttle) being set to a slightly incorrect value. You can't set hover throttle to an exact value, there is always influence from thermals, battery charge level etc. Too much "VEL I (nav_mc_vel_z_i)" will lead to vertical oscillations, too low "VEL I (nav_mc_vel_z_i)" will cause drops or jumps when ALTHOLD is enabled, very low "VEL I (nav_mc_vel_z_i)" can result in total inability to maintain altitude.

To deal with oscillations you can try lowering your "ALT P (nav_mc_alt_p)", "VEL P (nav_mc_vel_p)", "ALT I (nav_auto_climb_rate)", and "nav_manual_climb_rate".

Climb rate is calculated from the readings of the accelerometer, barometer and – if available – from GPS (“set inav_use_gps_velned = ON”). How strongly the averages of these noisy signals are taken into account in the estimation of altitude change by INAV is controlled by

- set inav_w_z_baro_p = 0.350
- set inav_w_z_gps_p = 0.200
  for vertical position (z) and
- set inav_w_z_gps_v = 0.500
  for vertical velocity. Too high “inav_w_z_baro_p” will make ALTHOLD nervous, and too low will make it drift so you risk running into the ground when cruising around. Using GPS readings for vertical velocity allows for a lower weight for baro to make ALTHOLD smoother without making it less accurate.

// : explain remaining relevant settings

### b) Using ALTHOLD with an airplane (fixed wing, FW):

With Fixed Wing models, INAV is not intended to use ALTHOLD controller in anything but ANGLE mode.
INAV controls pitch angle and throttle. It assumes that altitude is held (roughly) when pitch angle is zero. If plane has to climb, INAV will also increase throttle. If plane has to dive, INAV will reduce throttle and glide. The strength of this mixing is controlled by “nav_fw_pitch2thr”.
Set board alignment in such a way that your plane is flying level both in "MANUAL" and in "ANGLE", when you don't touch the sticks.

INAV’s parameters for fixed wing:

- set nav_fw_cruise_thr = 1400 # cruise throttle
- set nav_fw_min_thr = 1200 # minimum throttle
- set nav_fw_max_thr = 1700 # maximum throttle
- set nav_fw_bank_angle = 20
- set nav_fw_climb_angle = 20
- set nav_fw_dive_angle = 15
- set nav_fw_pitch2thr = 10 # pitch to throttle
- set nav_fw_loiter_radius = 5000

## NAV POSHOLD - Position hold

MULTIROTOR

For multirotors it will hold 3D position, throttle is automatic (AH).
You can use your roll and pitch stick to move around. The POSHOLD will be resumed when you center the roll/pitch stick again. HEADING HOLD is now included automatically to achieve 3D stability and it is therefore unwise to add it yourself as well. It is adjustable in the CLI via the parameter 'heading_hold_rate_limit'. The default at the time of writing is heading_hold_rate_limit = 90.

POSHOLD permits smooth controlled flight and can be modified via the ADVANCED TUNING TAB under the heading Multirotor Navigation Settings

The User Control Mode can be either ATTI or CRUISE:

- ATTI The Pitch/Roll stick behaves in a similar way to ANGLE
- CRUISE The Pitch/Roll stick behaves in a similar way to HORIZON (Recommended for smooth video work)

A number of other parameters can also be set:

- Default navigation speed
- Max. navigation speed
- Max. CRUISE speed
- Multirotor max. banking angle
- Use mid. throttle for ALTHOLD
- Hover throttle

FIXED WING

For fixed wing it will loiter in circles which radius is defined by the `nav_fw_loiter_radius` variable. The throttle is automatic. The altitude is controlled with the pitch stick (AH).

Always check POSHOLD is working correctly, before you use RTH or start a WP mission.

Hints for safe operation:

- Activate without props installed to check for reasonable operation.
- When misconfigured, this mode can result in dramatic failure to hold position. Attitude (yaw & motion) inputs can/will result in rapid and unexpected motion.

## NAV COURSE HOLD - Course Hold

Course hold is only available for multirotor from INAV 7.0.

When enabled the craft will try to maintain the current course and compensate for any external disturbances (2D CRUISE). Control behaviour is different for fixed wing and multirotor as follows:

**Fixed wing**  
The flight direction is controlled directly with ROLL stick as usual or with the YAW stick which provides a smoother way to adjust the flight direction.

**Multirotor**  
The heading is adjusted using the YAW stick or the ROLL stick (ROLL stick behaves exactly the same as the YAW stick). Cruise speed is increased by raising the pitch stick with the speed set in proportion to stick deflection up to a maximum limit of `nav_manual_speed`. This speed is maintained after the stick returns to centre. If the multirotor is already moving when Course Hold is selected the current speed will be maintained up to the `nav_manual_speed` limit. Speed is decreased by lowering the pitch stick with the rate of reduction proportional to stick position such that at maximum deflection it should take around 2s to slow to a stop. Position is held when the speed drops below 0.5m/s.

`nav_cruise_yaw_rate` sets the yaw rate at full stick deflection (only applicable for YAW stick control on fixed wing).

If the mode is enabled in conjunction with NAV ALTHOLD the current altitude will also be maintained (CRUISE). Altitude can be adjusted, as usual, via the pitch stick for fixed wing or the throttle stick for multirotor. ANGLE mode is active so the craft will auto level and heading hold is active on a multirotor.

## NAV CRUISE - Course Hold + Altitude Hold

Equivalent to the combination of NAV COURSE HOLD and NAV ALTHOLD described above.

## RTH - Return to home

RTH will attempt to bring copter/plane to launch position. Launch position is defined as a point where aircraft was armed. RTH will control both position and altitude. You will have to manually control altitude if your aircraft does not have an altitude sensor (barometer).

With default settings RTH will land immediately if you are closer than 5 meters from launch position. If further away it will make sure to have at least 10 meters of altitude, then start going home at 3m/s, and land. It will disarm itself if so configured, otherwise you will have to manually disarm once on the ground.

There are many different modes for Altitude, see the [RTH mode page](../features/Navigation-Mode-Return-to-Home.md) for details.

Activated by **RTH** flight mode.

## WP - Autonomous waypoint mission

Autonomous waypoint missions allow the craft to fly a predefined sequence of mission waypoints. The mission waypoints include information about the type of waypoint, latitude, longitude, height and speed between the waypoints as well as other settings that control the behaviour during a mission. GUIs such as INAV Configurator Mission Control, [MWP Tools](https://github.com/stronnag/mwptools), EZ-GUI, Mission Planner for INAV, Mobile Flight and can be used to set the waypoints and upload the mission as well as store missions locally for reuse. Uploaded missions are saved in FC volatile memory until a reboot or a new uploaded mission overwrites the old one. Missions can also be saved to EEPROM non volatile memory which retains the mission after power off/reboot.

When waypoint mode is activated (using a switch as other modes), the quad/plane will start to fly the waypoint mission following the waypoints in numerical order. Waypoint missions can be interrupted during a mission by switching NAV WP off (Manual mode on a fixed wing or RTH will also interrupt a WP mission). Up to INAV 4.0 WP missions always start from the first WP. From INAV 4.0 it is possible to resume an interrupted mission from an intermediate WP using the [nav_wp_mission_restart](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_wp_mission_restart) setting.

Up to 30 waypoints can be set on F1 boards. On F3 boards and better 60 waypoints are available. This is increased to 120 waypoints from INAV 4.0.

There is an additional [[wiki page further describing way point missions, tools and telemetry options|iNavFlight Missions]].

The [MSP navigation message protocol documentation](../advanced/MSP-Navigation-Messages.md) describes optional parameters affecting WP behaviour.

### Fixed Wing Waypoint Tracking Accuracy and Turn Smoothing

Waypoint tracking accuracy forces the craft to quickly head toward and track along the waypoint course line as closely as possible. 2 settings control the alignment behaviour. [nav_fw_wp_tracking_accuracy](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_wp_tracking_accuracy) adjusts the stability of the alignment. Higher values dampen the response reducing possible overshoot and oscillation. [nav_fw_wp_tracking_max_angle](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_wp_tracking_max_angle)
sets the maximum alignment convergence angle to the waypoint course line (see below). This is the maximum angle allowed during alignment and in reality will only be acheived when some distance away from the course line with the angle reducing as the craft gets closer to alignment. Lower values result in smoother alignment with the course line but a greater distance along the course line will be required until this is achieved.

Turn Smoothing helps to smooth turns during WP missions by switching to a loiter turn at waypoints with the turn initiated slightly before the waypoint is actually reached. This helps to avoid the overshoot often seen on tighter turns. The [nav_fw_wp_turn_smoothing](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_fw_wp_turn_smoothing) setting provides 2 options as shown below.

(Available from INAV 6.0)

![](https://user-images.githubusercontent.com/56191411/216628721-034b4864-212d-47c7-89dd-c0f4c012cb0f.png)

### Multi-Missions

Multi-missions allows up to 9 missions to be stored in the FC at the same time. It works with missions saved to and loaded from EEPROM rather than missions loaded into the FC by other means. It requires the OSD `MISSION INFO` field be enabled in order to select loaded missions.

Multi-missions can be planned in Configurator Mission Control or MWP Tools and saved to/loaded from the FC as normal. It is also possible to load them into the FC [using the CLI.](https://github.com/iNavFlight/inav/blob/master/docs/Navigation.md#cli-command-wp-to-manage-waypoints)

The OSD `MISSION INFO` field will display the total number of missions loaded on power up. The required mission can be selected either by using the CMS MISSIONS menu or by using the roll stick to change the mission number in the `MISSION INFO` field. `MISSION INFO` will display the mission waypoint count if the current mission number is loaded or 'LOAD' if it isn't. To load a mission use the Mission load stick command. It is also possible to change missions in flight using adjustment function `Multi mission Index Adjustment` or by selecting `MISSION CHANGE` mode. The mission index is changed in `MISSION CHANGE` mode using the WP mode switch to cycle through the available missions. The newly selected mission becomes active when either the adjustment function or `MISSION CHANGE` mode is deselected.

Selecting mission numbers 1 to 9 will load missions saved in EEPROM. Mission selection behaviour changed slightly with INAV 6.0 as follows:

**Pre INAV 6.0**  
It is possible to select Mission number 0 which appears in the `MISSION INFO` field as "WP CNT". This shows the current active WP count loaded in FC volatile memory and changes depending on the Arm state. When disarmed with a mission loaded it shows the total number of WPs for all missions stored in EEPROM. After arming and until another mission is loaded on disarm it displays the number of WPs in the loaded mission. "WP CNT" will also display the waypoint count for missions loaded to the FC from a source other than EEPROM, e.g. via telemetry. When less than 2 missions are loaded in the FC EEPROM mission numbers can only be selected using the CMS MISSIONS menu.

**From INAV 6.0**  
Only mission numbers 1 - 9 can be selected and "WP CNT" only appears if a mission has been loaded from a source other than EEPROM. Also waypoint count now only shows the number of WPs in the selected mission.

The only limitation with multi missions relates to single WP RTH missions. There seems little purpose in such a mission but if used it must be saved as mission number 1 (if saved at any other position it will truncate loading of other missions beyond that number).

## WP PLANNER - On the fly waypoint mission planner

WP PLANNER mode allows a mission to be planned "on the fly" simply by moving the craft to a required location and saving a waypoint at that point then repeating for further waypoints until the mission is complete.

The OSD `MISSION INFO` field must be enabled and WP mode must be off before WP PLANNER mode can be used. With the mode selected the `MISSION INFO` field will display SAVE. To save a waypoint at the current location just operate the WP Mode switch. `MISSION INFO` will display OK if the waypoint was saved and the WP count will increment up. WP Mode must be selected off before another waypoint can be saved (OK will change back to SAVE). `MISSION INFO` will show WAIT if position data isn't valid, e.g. no GPS lock, or FULL if all available waypoints have been used.

The mission can be run at any time by turning WP PLANNER mode off and selecting WP mode as usual. In this case the `MISSION INFO` field will display PLAN indicating a WP PLANNER mission is currently active.

The mission can be reset if `nav_mission_planner_reset` is ON and the WP PLANNER Mode switch toggled ON-OFF-ON (resets WP count to 0). It is possible to save the mission to the FC EEPROM on disarm in the usual way, e.g. by using the Save WP Mission stick command.

It should be noted that unlike other Nav modes WP PLANNER will work when disarmed. It should also be noted that it saves the WP altitude using the sea level datum so if a WP is set with the craft on the ground it will use ground level as the WP altitude setting regardless of the subsequent takeoff location.

## GCS_NAV - Ground control station

This mode is just an permission for GCS to change position hold coordinates and the altitude.
So it's not a flight mode itself, and needs to be combined with other flight modes.

In order to let the GCS have full control over the aircraft, e.g. 'follow me', the following modes must be activated: `NAV POSHOLD` with `GCS_NAV`. In order to update the home position, no other mode is required.

For more [detail](../advanced/INAV-remote-management-control-and-telemetry.md).

## GPS loss during navigation

Loss of GPS during navigation will have the following affect on the different modes:

- RTH and WP: Emergency landing triggered. Switching the modes off will stop the emergency landing allowing the craft to be flown manually.
- CRUISE/COURSE HOLD: Heading hold no longer maintained (Altitude hold only maintained during CRUISE if ALTHOLD mode set independently).
- POSHOLD: Falls back to forced ANGLE mode.

ALTHOLD mode should still work normally if a barometer is available.

## Mode switch diagram

A diagram to indicate flight modes relation to navigation modes and illustrate sensor requirements:

![Nav modes](/img/content/nav_modes_diagram.jpg)
