---
title: Custom Mixes
# slug: custommixes
---

This page documents custom mixer for exotic platforms. As this page was written prior to inav 2.0, you are advised to verify the `smix` syntax compared to your firmware version. It is also necessary to set the `platform_type` for your platform.

## Quadcopter + configuration [Motors on front, rear, left and right]

```
mmix reset
mmix 0 1.0 0.0 1.0 -1.0   # REAR
mmix 1 1.0 -1.0 0.0 1.0   # RIGHT
mmix 2 1.0 1.0 0.0 1.0    # LEFT
mmix 3 1.0 0.0 -1.0 -1.0  # Front
```

## Hexa H6

```
mmix reset
mmix 0 1.0 -1.0 1.0 -1.0     # REAR_R
mmix 1 1.0 -1.0 -1.0 1.0     # FRONT_R
mmix 2 1.0 1.0 1.0 1.0       # REAR_L
mmix 3 1.0 1.0 -1.0 -1.0     # FRONT_L
mmix 4 1.0 0.0 0.0 0.0       # RIGHT
mmix 5 1.0 0.0 0.0 0.0       # LEFT
```

## Quadcopter A-tail

This configuration probably can be improved, similar to V-tail config

```
mmix reset
mmix 0 1.0 0.0 1.0 1.0          # REAR_R
mmix 1 1.0 -1.0 -1.0 0.0        # FRONT_R
mmix 2 1.0 0.0 1.0 -1.0         # REAR_L
mmix 3 1.0 1.0 -1.0 -0.0        # FRONT_L
```

## Quadcopter V-tail

```
mmix reset
mmix 0 1.0 -0.58 0.58 1.0        # REAR_R
mmix 1 1.0 -0.46 -0.39 -0.5      # FRONT_R
mmix 2 1.0 0.58 0.58 -1.0        # REAR_L
mmix 3 1.0 0.46 -0.39 0.5        # FRONT_L
```

## Hexa Y6

```
mmix reset
mmix 0 1.0 0.0 1.333333 1.0     # REAR
mmix 1 1.0 -1.0 -0.666667 -1.0  # RIGHT
mmix 2 1.0 1.0 -0.666667 -1.0   # LEFT
mmix 3 1.0 0.0 1.333333 -1.0    # UNDER_REAR
mmix 4 1.0 -1.0 -0.666667 1.0   # UNDER_RIGHT
mmix 5 1.0 1.0 -0.666667 1.0   # UNDER_LEFT
```

## Quad Y4

```
mmix reset
mmix 0 1.0 0.0 1.0 -1.0     # REAR_TOP CW
mmix 1 1.0 -1.0 -1.0 0.0    # FRONT_R CCW
mmix 2 1.0 0.0 1.0 1.0      # REAR_BOTTOM CCW
mmix 3 1.0 1.0 -1.0 0.0     # FRONT_L CW
```

## Hexa P6

```
mmix reset
mmix 0 1.0 -0.866025 0.5 1.0        # REAR_R
mmix 1 1.0 -0.866025 -0.5 -1.0      # FRONT_R
mmix 2 1.0 0.866025 0.5 1.0         # REAR_L
mmix 3 1.0 0.866025 -0.5 -1.0       # FRONT_L
mmix 4 1.0 0.0 -1.0 1.0             # FRONT
mmix 5 1.0 0.0 1.0 -1.0             # REAR
```

## Octa Flat P

```
mmix reset
mmix 0 1.0 0.707107 -0.707107 1.0       # FRONT_L
mmix 1 1.0 -0.707107 -0.707107 1.0      # FRONT_R
mmix 2 1.0 -0.707107 0.707107 1.0       # REAR_R
mmix 3 1.0 0.707107 0.707107 1.0        # REAR_L
mmix 4 1.0 0.0 -1.0 -1.0                # FRONT
mmix 5 1.0 -1.0 0.0 -1.0                # RIGHT
mmix 6 1.0 0.0 1.0 -1.0                 # REAR
mmix 7 1.0 1.0 0.0 -1.0                 # LEFT
```

## Octa Flat X

```
mmix reset
mmix 0 1.0 1.0 -0.414178 1.0        # MIDFRONT_L
mmix 1 1.0 -0.414178 -1.0 1.0       # FRONT_R
mmix 2 1.0 -1.0 0.414178 1.0        # MIDREAR_R
mmix 3 1.0 0.414178 1.0 1.0         # REAR_L
mmix 4 1.0 0.414178 -1.0 -1.0       # FRONT_L
mmix 5 1.0 -1.0 -0.414178 -1.0      # MIDFRONT_R
mmix 6 1.0 -0.414178 1.0 -1.0       # REAR_R
mmix 7 1.0 1.0 0.414178 -1.0        # MIDREAR_L
```

## Bicopter

***Warning*** this is highly experimental, not documented, not tested in real life conditions and I'm pretty sure there are not more than few in the whole world!
Mixer configuration below is reverse engineered from CF code.

```
mmix reset
mmix 0 1.0 1.0 0.0 0.0 # left motor
mmix 1 1.0 -1.0 0.0 0.0 # right motor

smix reset
smix 0 4 2 100 0 # Servo 4 for left motor pitch change
smix 1 4 1 100 0 # Servo 4 for left motor pitch change
smix 2 5 2 -100 0 # Servo 5 for right motor pitch change
smix 3 5 1 100 0 # Servo 5 for right motor pitch change
```

## Dualcopter

***Warning*** this is highly experimental, not documented, not tested in real life conditions and I'm pretty sure there are not more than few in the whole world!
Mixer configuration below is reverse engineered from CF code.
```
mmix reset
mmix 0 1.0 0.0 0.0 -1.0  # Left
mmix 1 1.0 0.0 0.0 1.0   # Right

smix reset
smix 0 4 1 100 0
smix 1 5 0 100 0
```

## V-Tail Fixed Wing

Tested in a Mini talon UAV.

```
# mixer
mmix reset
mmix 0 1.0 0.0 0.0 0.0         # motor

smix reset
smix 0 2 0 -100 0         # servo 2 takes Stabilised ROLL
smix 1 3 0 -100 0         # servo 3 takes Stabilised ROLL

smix 2 4 1 -50 0          # servo 4 takes Stabilised PITCH
smix 3 5 1 50 0           # servo 5 takes Stabilised -PITCH

smix 4 4 2 50 0           # servo 4 takes Stabilised YAW
smix 5 5 2 50 0           # servo 5 takes Stabilised YAW

smix 6 6 8 -100 0         # servo 6 takes RC AUX 1 (camera yaw)
smix 7 7 9 -100 0         # servo 7 takes RC AUX 2 (drop bomb :-))
```

## Skyhunter Nano (no rudder) - 1.7.2 onwards

```
mmix reset
mmix 0 1.000 0.000 0.000 0.000
smix reset
smix 0 3 0 -100 0
smix 1 4 0 -100 0
smix 2 2 1 -100 0
```

## Nano Talon with 2 Servos for the V-Tail
Note: See [this video](https://www.youtube.com/watch?v=IOApkFPGKtc) for details on the V-Tail mod.
```
# mixer
mmix reset
mmix 0 1.0 0.0 0.0 0.0         # motor
smix reset 
smix 0 2 0 -100 0         # servo 2 takes Stabilised ROLL (PWM 3)
smix 1 3 1 -50 0          # servo 3 takes Stabilised PITCH (PWM 4)
smix 2 4 1 50 0         # servo 4 takes Stabilised -PITCH (PWM 5)
smix 3 3 2 50 0         # servo 3 takes Stabilised YAW (PWM 4)
smix 4 4 2 50 0         # servo 4 takes Stabilised YAW (PWM 5)
```

## AVIOS BUSHMULE – Notably separate FLAPS (instead of flapperons). Uses single aileron control with Y cable
```
# servo mix
smix reset
smix 0 2 1  100 0     # servo 2 takes Stabilised PITCH  (PWM 3)
smix 1 3 0  100 0     # servo 3 takes Stabilised ROLL   (PWM 4)
smix 2 4 14 100 0     # servo 4 takes FLAPS             (PWM 5)
smix 3 5 2  100 0     # servo 5 takes Stabilised YAW    (PWM 6)
# servo – also consider manipulating of servo midpoint for correct flaps operation:
servo 4 1000 2000 2000 -100 -1 

```
## Twin Motor - Differential thrust and FLAPERONS
```
# mixer
mmix reset
mmix 0  1.000  0.000  0.000  0.300 #Left motor
mmix 1  1.000  0.000  0.000 -0.300 #Right motor

# servo mix
smix reset
smix 0 3 0 100 0 #servo 3 takes Stabilised ROLL (PWM 4)
smix 1 4 0 100 0 #servo 4 takes Stabilised ROLL (PWM 5)
smix 2 5 2 100 0 #servo 5 takes Stabilised YAW (PWM 6)
smix 3 2 1 100 0 #servo 2 takes Stabilised PITCH (PWM 3)
smix 4 3 14 100 0 #Setup flaps on aileron pins (PWM 4)
smix 5 4 14 100 0 #Setup flaps on aileron pins (PWM 5)
smix reverse 3 14 r #Reverse the Flaps on PWM 4/5, skip this if you want spoilerons 
smix reverse 4 14 r #or if it works based on servo orientation

# servo
servo 5 1000 2000 1500 -100 -1 #My rudder was reversed, again you may not need this rule
```

# Setups that were never implemented in Baseflight, Cleanflight or any of its derivatives

# Disabled setups

## HELI 120 CCPM

Never implemented.

## HELI 90 DEG

Never implemented.

## MIXER_GIMBAL

Use feature ***SERVO_TILT*** instead.

## Singlecopter

***Warning*** this is highly experimental, not documented and I'm pretty sure there are not more than few in the whole world!
Mixer configuration below is reverse engineered from CF code. Mixer is capable of processing this setup, but servo output will not work due to BF/CF PWM output limitations. 

```
mmix reset

smix reset
smix 0 3 2 100 0 
smix 1 3 1 100 0 
smix 2 4 2 100 0 
smix 3 4 1 100 0 
smix 4 5 2 100 0 
smix 5 5 0 100 0 
smix 6 6 2 100 0
smix 7 6 0 100 0 
```
