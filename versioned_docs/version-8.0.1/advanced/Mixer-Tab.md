---
title: Mixer Tab
---

# Introduction

The mixer tab allows you to adjust the values that tells INAV how to translate stick movements from your radio to the speed of the motors and movement of the control surfaces of your aircraft. For example, on a multi-rotor, when you pull back on your radio's elevator stick, the front two motors will spin faster and the back two motors will slow down. On a flying wing, pulling back on the elevator moves the two elevons servos up. This allows for a giant variety of motor and control surface configurations to be supported.

## Warning
**Do not have any mixes on your radio.** The intent of INAV is to fly your aircraft either in partial or full navigation modes. As such, all
Modern radios have the ability to have custom settings for delta wings, v-tail aircraft, etc. However, this is basically a mix that is running on the radio and trying to use these custom radio configurations through INAV might appear to work in manual mode on the bench, but INAV can't be configured to "understand" how to control your plane with these custom radio configurations and will cause your airplane to fly out of control when another other mode is engadeged or failsafe tries to save your aircraft. **Turn off all custom radio configurations. This also applies to trims and expos. These are done in INAV. THIS IS HIGHLY IMPORTANT!**

## Initial Setup with Default Values
After you initial flash of INAV to your flight controller, you will be prompted with a **Default Values** screen where you will pick a preset that most closely matches your proposed aircraft type. Part of this initial default values is a mixer preset. This is what initially populates your mixer tab.


## Flexible motor and servo output allocation

INAV now was a function that allows to flexibly assign functions to PWM outputs directly from INAV Configurator.
Specific function `AUTO`, `MOTORS` or `SERVOS` can be assigned to each Timer Group. Then, all outputs from this group will perform this function.
Thanks to this, it's possible to use servos and motors in ways that previously required building a custom targets.

![INAV output assignment](https://quadmeup.com/assets/inav/inav_output_assignment.png)

Bear in mind:
* In some rare cases, output assignment might be different than in INAV 6. **This makes it even more important to remove your props and double check your outputs before you power your flight controller with batteries for the first time after applying your old settings or enabling outputs.**
* It is not possible to assign function to individual outputs. It's a hardware, not software limitation.

## Mixer profiles and VTOL support

This has been a frequent request since PNP VTOL models started becoming more common.

Read more in [Mixer Profile INAV docs](https://github.com/iNavFlight/inav/blob/master/docs/MixerProfile.md) and [VTOL INAV docs](https://github.com/iNavFlight/inav/blob/master/docs/VTOL.md)





##Mixer Preset

This is the portion where you tell INAV what type of plane it’s going into. The flight controller will do the mixing for you. Simply select the right plane type from the pulldown menu and click save and reboot. Most of the heavy lifting has been done for you with this move.

Normally, you shouldn’t need to change anything here since the “Default Values” should have applied these settings for you. However, it’s good practice to double-check.

If you want to run [reverse motor direction (props out)](https://oscarliang.com/reversed-motor-prop-rotation-quadcopter/), select “Reversed motor direction / Props-out configuration”.

Click Save and Reboot.
