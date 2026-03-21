---
title: Tune INAV PIDFF Controller for Fixed Wing
---

### Description of PIFF controller:

The FF-gain should do most of the work steering the airplane, leaving only P and I controller to fight turbulence and drift.  

**1: Figure out the maximum rates your airplane can do for each axis (pitch, roll, and yaw)**

* Fly in `MANUAL` mode (called `PASSTHROUGH` mode up to version 1.8.1) with the `manual_roll_rate`, `manual_pitch_rate` and `manual_yaw_rate` settings set to 100%. Have some way of recording the flight: blackbox, DVR or both. Do hard rolls, hard loops and one 360° yaw turn. Use full stick deflection on all these maneuvers.
  * To calculate an axis' _(approximate)_ rate from a DVR recording you'll need to count the number of frames it took for your aircraft to do a complete maneuver (roll/flip/yaw turn), determine the average FPS of the recording, and then use this formula: `360 / (number_of_frames / FPS)`. You can take multiples samples and average them for a better accuracy.  
You can also use [a Python script](https://gist.github.com/nmaggioni/e42d3f4eb242808df751b13413ebf22c) to help automating the process.

* Note down the maximum rates. Typical values are 360°/s on roll, 100°/s on pitch and 60°/s yaw.  
Enter these values as your rates in configurator.

**2: Zero out P and I gain on Roll, Pitch and Yaw controller and set `tpa_rate` to 0. Increase FF-gain (D column in the PID tuning tab) until you get 90% of full servo throw when having sticks at full throw in `ACRO` mode (no flight mode enabled) compared to manual mode.**

* This is so the FF-gain does most of the work turning the airplane, but leaving some for the P and I gain to work with.
* For this step it is convenient to have the two modes `MANUAL` (called `PASSTHROUGH` mode up to version 1.8.1) and `ACRO` available on a switch to be able to switch easily between the two to compare the throws.
* The 90% deflection value can also be calculated by dividing 13950 by the maximum rate for the axis, e.g. 360deg/s maximum roll 13950/360=38.75 FF. For 80% deflection, divide 12400 by rate. 

Now set a little P and I gain as a starting point, for example: 10 P-gain and 15 I-gain to Roll, Pitch and Yaw axis.

**3: Go out and fly in acro mode.**

* If airplane drifts to one side or up and down add I-gain to the axis it drifts in.
* If you want more stabilization against wind try and add more P-gain.

**4: Want to calm your airplane down? Now is the time to reduce rates to fit your needs.**

* Note: It's normal to get reduced servo throw when reducing rates at this point, if you got full servo throw at this stages you would overshoot the target deg/s you wanted.

**5: Tune Angle / Horizon mode**

* Enter `Angle` mode. If your aircraft doesn't fly straight and level your FC is probably not mounted flat relatively to the aircraft's natural attitude when flying (most planes and wings actually fly with a few degrees of nose-up attitude to maintain their altitude). You'll need to trim your board's alignment (`align_board_roll`, `align_board_pitch`, `align_board_yaw`) accordingly. After each adjustment fly again and check if the behavior has improved.
* If you are unhappy with the value of maximum bank/pitch angles, you can adjust them via the `max_angle_inclination_rll` and `max_angle_inclination_pit`. Be aware that if you want the same amount of maximum angle for poshold/althold you will also need to increase their values (`nav_fw_bank_angle`, `nav_fw_climb_angle`, `nav_fw_dive_angle`).
* If you are unhappy with the strength of the Angle mode, for example if it levels out too quickly/hard, adjust P-gain of the level controller via `fw_p_level`.

### Other tuning tips:

* Setup your TPA correctly. [PID Attenuation and scaling](../advanced/PID-Attenuation-and-scaling.md)

* If your plane over corrects when RTH is engaged (symptom is a wave-like flight path), try increasing `nav_fw_pos_xy_p` and/or increasing `nav_fw_pos_xy_i`. Good values to start: `set nav_fw_pos_xy_p = 50`, `set nav_fw_pos_xy_i = 5`. You can also try lowering `nav_fw_pos_xy_d`.  
When P & I are too high the symptom is fast wandering left-right by a small amount (less than 5 deg). In that case you should try to decrease ``nav_fw_pos_xy_p`` and/or ``nav_fw_pos_xy_i`` or increase ``nav_fw_pos_xy_d``. The behaviour of the plane is very different with or w/o wind, so it is necessary to test and tweak parameters in both scenarios.