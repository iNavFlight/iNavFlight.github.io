---
title: Why Do I Have Limited Servo Throws In My Airplane
---

## Explanation of why you have limited throw in any stabilisation mode. ( Including Rate / Acro )

First basic PIFF controller:

* P-gain will change your servo movement when it sees an error between wanted motion ( deg/s ) and actual motion ( deg/s )
* I-gain will change your servo movement when it sees an error between wanted motion ( deg/s ) and actual motion ( deg/s ), however I-gain also knows the concept of time, and therefor will contuinue to increase servo movement until actual motion is the same as wanted motion.
* FF-gain doesnt not care about actual motion, and does only move servos based on wanted motion.

Also Angle mode itself have an P-gain to level the aircraft back to level.

Also an sidenote is that I-gain is suppressed before takeoff and without throttle, EVEN with airmode enable you need to first have had some throttle to see the I-gain working, this is important to know if you want to "bench" test behavior.

Passthrough bypasses all this an moves servos directly.

In other words, the only thing that will limit passthrough servo limits and rates set up in the Servos tab.

## What is stabilisation? And how do you as the pilot control the airplane in a stabilised mode?

In passthrough everything is easy, you move sticks on radio, the FC does some mixing according to which airplane/flying wing you have, and then you move the servos directly.

In stabiliation mode however you dont control the servos at **ALL**. Everything is controlled by actual motion, and wanted motion. When you move the sticks you are commanding motion, example 30deg/s roll.

Then the P-gain will start working, the I-gain will start working and the FF-gain will start working, if tuned properly it will hit the wanted motion.

So what does this have to do with limited servo throws?

1. For actual testing on bench you will need to arm and apply throttle to see how much the servos actual moves in flight.

2:

An typical wing can example manage 500 deg/s, default rate values for INAV is 200deg/s.

QUIZ: You command 100% right roll, which would be 200deg/s. What would happend if it did give you full servo throw?

Yes, it would have hit 500deg/s instead and overshoot target motion.

Sum up:

You dont **need** full servo throw! It all depends how you want to [tune](../advanced/Tune-INAV-PIFF-controller-for-fixedwing.md) your airplane.

IF you want full throw, your rate settings ( deg/s ) should match what your plane is able to do at full servo throw. Then in stabilitation mode you increase your P-gain or FF-gain untill you get full throw on servos.


Sidenote: For older firmeware, If you want to calm your airplane in `passthrough` mode, you will need an programmable TX. Program it so when enabling `passthrough` on a switch, the switch also reduce channel range and adds expo.

In modern firmware, with `manual` mode (which replaces `passthrough`), the FC imposes expo and rates.