---
title: Rate Dynamics
---

## INAV and EmuFlight Rate Dynamics

> INAV Rate Dynamics is a direct port of EmuFlight Rate dynamics. Exactly the same presets can be applied and used.

Originally, this article comes from [EmuFlight Wiki page](https://emuflight.github.io/features/Rate-Dynamics.html)

## What is Rate Dynamics?

Rate Dynamics is a stick-feel modifier. It allows the pilot to achieve any input control characteristics desired. Rate Dynamics is essentially a PID controller for RC Command. In simplest terminology, it either delays or overshoots RC command. Normal RC Rates still apply.

## How do Rate Dynamics work?

Rate Dynamics allows your rates to change dynamically based on how you move your sticks. This results is the ability to choose aggressive racing feel, smoother freestyle feel, or a super super cinematic feel on the sticks.

Center and End determine how the rate dynamics effect the stick feel during the center or end of the stick. Center will effect your stick feel near the center of the stick and end effects the feel at the end of the stick. 

The three parameters that effect rate dynamics are:
* Sensitivity
* Correction
* Weight

### Sensitivity

Sensitivity adds a boost or shrink to your rates and makes your quad feel more “sensitive”, hence the name. This boost is seen as a percentage. The default of `100` does nothing while a value of 120 boosts your rates by 1.2 and a value of 80 shrinks your rates by a value of .8!

### Correction

Correction is a value that will over time correct for the boost or shrink in rates caused by your sensitivity. The higher the correction the quicker it corrects for the boost or shrink in rates.

### Weight

Weight apposes all change to the setpoint which makes the sticks feel as though you have added some weight to them, hence the name. This number is seen as a percentage. A value of 0 does nothing while a value of 50 apposes 50% of the change in your rates. This smooths out your sticks and if used to a very large values will add delay, but can make your sticks look very cinematic.

While weight does add some “latency” to the sticks everyone that has tested this feature uses at least some weight as it does quite a good job of smoothing things out. Even race pilots will use weight, just counteracted with extra sensitivity to counteract the “latency” that it adds leading to a sharp, yet smooth, fast reacting quad that handles well for racing.

## Presets

### Default

```
set rate_dynamics_center_sensitivity = 100
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 0
set rate_dynamics_end_sensitivity = 100
set rate_dynamics_end_correction = 10
set rate_dynamics_end_weight = 0
```

### Cinamatic

```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 20
set rate_dynamics_center_weight = 60
set rate_dynamics_end_sensitivity = 90
set rate_dynamics_end_correction = 10
set rate_dynamics_end_weight = 40
```

### Freestyle

```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 35
set rate_dynamics_end_sensitivity = 130
set rate_dynamics_end_correction = 10 
set rate_dynamics_end_weight = 35
```

### Freestyle Less bounceback

```
set rate_dynamics_center_sensitivity = 80
set rate_dynamics_center_correction = 10
set rate_dynamics_center_weight = 35
set rate_dynamics_end_sensitivity = 130
set rate_dynamics_end_correction = 30 
set rate_dynamics_end_weight = 35
```

### Racing 

```
set rate_dynamics_center_sensitivity = 130
set rate_dynamics_center_correction = 35
set rate_dynamics_center_weight = 30
set rate_dynamics_end_sensitivity = 115
set rate_dynamics_end_correction = 20
set rate_dynamics_end_weight = 10
```

## Additional Tips

@fichek Tip: one thing I instantly noticed is the bounceback when there is over 100% sensitivity on stick end and low weight and/or correction - so the recommended freestyle preset is a bit too springy imo…

@nerdCopter Tip: i only set rate_center_weight = 30 to smooth my center-stick which looks less jerky in HD.

## Tools

[@fichek’s Rate Simulator](https://stoot.tech/emu-rate-dynamics.html)