---
title: Default Values for Different Types of Aircraft
---

:::warning
**This is outdated, INAV 1.6 is out and is using PRESET. Values here are old and variable names have changed by adding "mc" and "fw" to differentiate between multicopter and fixed wing.**
:::

Values written here must be based on 1.2 or later!

This is not a replacement for tuning your PIDs, this is only a starting point from you to tune from. There are various tutorials on the internet on how to tune your PIDs.

Worth reading regards to deciding to use asynchronous mode. https://quadmeup.com/inav-how-to-setup-asynchronous-gyro/

### History: **PLEASE WRITE HERE IF YOU CHANGE ANYTHING AND WHY.**
```
05.01.3017 oleøst: Changed some settings in 250 class.
21.11.2016 oleoat: Removed disabling of baro because fixed in iNav 1.4
21.11.2016 oleoat: Changed recommend gyro_lpf on flying wing, should probably be changed on acrobatic airplanes aswell
17.11.2016 oleost: Added disabled baro for fixedwing until [543](https://github.com/iNavFlight/inav/pull/543) is fixed
17.11.2016 oleost: Added values for fixed wing.
03.10.2016 artekw: Added default settings for F450
01.10.2016 oleost: Removed old PIDs based on pre 1.2
10.07.2016 oleost: Added disabling mag on flying wing aswell
24.06.2016 oleost: Created first version of this wiki
24.06.2016 oleost: Changed default to "mag_hardware = 1" on regular regular airplane because airplanes flies better with gps heading instead of mag heading.
24.06.2016 oleost: removed looptime 1000, to low for f1 targets.
2016-11-21 stronnag Added Quad 250 settings for F3/ iNav 1.4
2016-11-21 stronnag Added Tri 600 settings for F3/ iNav 1.4
```

# Change to default iNav settings 

Changes **you** think that should be done to iNav globally:

```
24.06.2016 oleost: Change default to velned on because it generally looks like a better solution. (use_gps_velned = 1)

```

# Multirotor

**150 Size:**

_PIDs:_

```

```

_Navigation PIDs:_

```

```

_Other Values:_

```

```

**250 Size:**


_PIDs:_

```
set p_pitch = 55
set i_pitch = 40
set d_pitch = 15
set p_roll = 55
set i_roll = 40
set d_roll = 15
set p_yaw = 90
set i_yaw = 45
set d_yaw = 20
set p_level = 20
set i_level = 15
set d_level = 75
```


_Navigation PIDs:_

```

```

_Other Values:_

```
set gyro_lpf = 256hz
set tpa_rate = 10
set tpa_breakpoint = 1650

Also reduce looptime if your FC is capable of it.
set looptime = 1000
set gyro_sync = on
set gyro_sync_denom = 8
```

**450 Size:**
```
Weight: ~1200g (with battery)
Props: 10x4.5
Battery: 3s 5200mAh
```

_PIDs:_
```
set p_pitch = 90
set i_pitch = 34
set d_pitch = 54
set p_roll = 90
set i_roll = 34
set d_roll = 54
set p_yaw = 70
set i_yaw = 20
set d_yaw = 0
set p_level = 22
set i_level = 15
set d_level = 75
```
_Navigation PIDs:_

```
set nav_alt_p = 50
set nav_alt_i = 0
set nav_alt_d = 0
set nav_vel_p = 100
set nav_vel_i = 50
set nav_vel_d = 10
set nav_pos_p = 65
set nav_pos_i = 120
set nav_pos_d = 10
set nav_posr_p = 180
set nav_posr_i = 15
set nav_posr_d = 100
set nav_navr_p = 10
set nav_navr_i = 5
set nav_navr_d = 8
```

_Other Values:_

```
set imu_dcm_ki = 0
set gyro_sync = ON
set gyro_sync_denom = 2
set gyro_lpf = 42HZ
```

**600 Tricopter:**

Home design 600mm tricopter. Same amateur pilot who only ever flies in horizon /LOS.

````
3S, 4200mAh (Graphene), 10x5 HQ Thin Electic props, 1000kv. c. 900grams all up.
iNav 1.4 for the rockin' async_gyro. 
Gets about 18 minutes gentle / nav modes, maybe 16 mins for aggressive manual flying.

F3 (SPEVO). Enjoys the relatively high PIDs.
````

_PIDs:_

```
set p_pitch = 110
set i_pitch = 20
set d_pitch = 52
set p_roll = 110
set i_roll = 20
set d_roll = 52
set p_yaw = 75
set i_yaw = 20
set d_yaw = 0
set p_level = 20
set i_level = 20
set d_level = 75
```

_Navigation PIDs:_

```
set nav_alt_p = 50
set nav_alt_i = 0
set nav_alt_d = 0
set nav_vel_p = 100
set nav_vel_i = 50
set nav_vel_d = 10
set nav_pos_p = 65
set nav_pos_i = 120
set nav_pos_d = 0
set nav_posr_p = 180
set nav_posr_i = 15
set nav_posr_d = 100
set nav_navr_p = 10
set nav_navr_i = 5
set nav_navr_d = 8
```

_Other Values:_

```
smix reverse 5 2 r # for the tail servo :)
set looptime = 1000
set gyro_sync = ON
set gyro_sync_denom = 8
set async_mode = GYRO
set gyro_lpf = 256HZ
set motor_pwm_rate = 2000
set motor_pwm_protocol = ONESHOT125
set servo_pwm_rate = 160

set gps_provider = UBLOX
set gps_sbas_mode = EGNOS
set gps_dyn_model = AIR_1G

set rc_expo = 70
set rc_yaw_expo = 20
set thr_mid = 50
set thr_expo = 0
set roll_rate = 55
set pitch_rate = 48
set yaw_rate = 20
set tpa_rate = 20
set tpa_breakpoint = 1650
```


**600 Size:**

_PIDs:_

```

```

_Navigation PIDs:_

```

```

_Other Values:_

```

```


# Fixedwing

**Regular plane**

_PIDs:_

```

```

_Navigation PIDs:_

```
set nav_alt_p = 50
set nav_alt_i = 0
set nav_alt_d = 0
set nav_vel_p = 100
set nav_vel_i = 50
set nav_vel_d = 10
set nav_pos_p = 65
set nav_pos_i = 120
set nav_pos_d = 10
set nav_posr_p = 180
set nav_posr_i = 150
set nav_posr_d = 100
set nav_navr_p = 200
set nav_navr_i = 10
set nav_navr_d = 0
```

_Other Values:_

```
set mag_hardware = 1
set auto_disarm_delay = 0
set small_angle= 70
```

**Flying wing**

_PIDs:_

```
set p_pitch = 20
set i_pitch = 30
set d_pitch = 15
set p_roll = 25
set i_roll = 30
set d_roll = 15
set p_yaw = 0
set i_yaw = 0
set d_yaw = 0
set p_level = 20
set i_level = 5
set d_level = 75

```

_Navigation PIDs:_

```

```

_Other Values:_

```
set mag_hardware = none
set gyro_sync = ON
set gyro_sync_denom = 1
set gyro_lpf = 98HZ
set gyro_soft_lpf_hz = 40
set acc_soft_lpf_hz = 15
set dterm_lpf_hz = 30
set nav_fw_launch_accel = 1500
set nav_fw_launch_detect_time = 40
set nav_fw_launch_thr = 1600
set nav_fw_launch_motor_delay = 150
set naw_fw_launch_timeout = 5000
set naw_fw_launch_climb_angle = 13
set max_angle_inclination_rll = 600
set max_angle_inclination_pit = 450

set rc_expo = 40
set tpa_rate = 33
set tpa_breakpoint = 1300

set auto_disarm_delay = 0
set small_angle= 70
```