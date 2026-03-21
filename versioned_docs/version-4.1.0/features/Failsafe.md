---
title: Failsafe
---

## Foreword

The goal is to configure both your flight controller and radio receiver so that failsafe does as you expect in every situation.

For failsafe to work optimally iNav needs to know it's in a failsafe event and not just doing regular RTH. This is necessary for example to correctly handle loss of GPS while returning to home.

This assumes you have regular GPS modes like `RTH` working **already**.

## Configuration of receiver

You have several options on how to configure receiver:

### Option one

Set receiver to send out `NO PULSES` or `HOLD` on a failsafe event. This is perfectly fine for FrSky Radios.

### Option two

1. Set up INAV "Failsafe" mode on an RC channel.

2. Set up the radio receiver failsafe so the RC channel used in 1. outputs a value that activates INAV "Failsafe" mode on RC link loss.

The above is fine on FlySky radio.

### Option three

Set up  the radio receiver failsafe so the throttle channel outputs a value below the `rx_min_usec` setting. This will trigger INAV Failsafe when the radio receiver goes into failsafe.

The throttle channel lower endpoint may need to be temporarily set to the lowest setting allowing the failsafe value to be set low also (around 800us should be possible). Once the receiver failsafe setting has been saved the throttle endpoint can be reset to the normal value.

Works well with Flysky radios without the need to set Failsafe mode (option 2).

## Configuration of iNav

Go to `Failsafe` tab, and enable `RTH` as Stage 2 failsafe.

For fixed wing set `failsafe_throttle_low_delay = 0` or else it will disarm the fixed wing in the air when Failsafe triggers and you have had low throttle for the default time period.

The behavior of `RTH` can also be configured.

 - [iNav Flight modes / Navigation Modes](./Navigation-Mode-Return-to-Home.md)

Loss of GPS during Failsafe RTH will result in an emergency landing so make sure the following are set to avoid surprises:
- `nav_emerg_landing_speed` - default is 5 m/s. Reduce for a fixed wing.
- `failsafe_off_delay` - default will disarm after 20s. Increase or disable if more time required.
- `failsafe_throttle` - default setting is 1000 which will cause a multicopter to drop if not increased to slightly below hover throttle.

## Verifying that failsafe works as intended

Verify that your failsafe works without props:

1. Remove all props

1. Go outside, arm and apply throttle, run with it 50meter away from home (normally the place where you armed it) and then turn off transmitter. The aircraft should now try to climb (increase throttle). Also verify that you're able to regain control by turning on transmitter again, and move the ROLL/PITCH stick more than `failsafe_stick_threshold`

Now, verify that failsafe works while in flight:

1. Put the props on again

1. Take off, fly at least 50 meters from home, and turn off transmitter. Tip: Do this over soft grass. If it's an airplane it's better to have some altitude

Note: If you are using a fixed wing without a magnetometer enabled you will need to run with the airplane before turning off the transmitter to test failsafe. This is because GPS speed needs to be above a certain threshold to acquire a valid heading. Without a valid heading failsafe will not initiate.

Note: To regain control after a failsafe event, you must move the roll/pitch sticks more than `failsafe_stick_threshold` in order to regain control.

**INAV offers additional failsafe safety features**

**failsafe_min_distance** and the action you wish to invoke (_failsafe_min_distance_procedure_)

****failsafe_throttle_low_delay**** (Time throttle level must have been closed  to Auto disarm)

The first setting could avoid injury as it will prevent the possibility of the craft blasting off to its RTH height within chosen safety distance of the set home point. It could also work against you if a failsafe event occurred while flying close with a setting of (just land) and you were flying from a very small safe landing area.
All options are available to best suit your needs.

The second setting could just ruin your day with a mid-air disarm but conversely save you from personal injury if it is forgotten to disarm the craft (not using motor stop also goes a long way to making the craft safer as the spinning propellers are a visible sign the craft is armed and dangerous).

Further reading and settable parameters are available here :-
https://github.com/iNavFlight/inav/blob/master/docs/Failsafe.md#failsafe_throttle

And here :-
https://github.com/iNavFlight/inav/blob/master/docs/Cli.md

