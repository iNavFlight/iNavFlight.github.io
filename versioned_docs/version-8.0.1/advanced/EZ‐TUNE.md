---
title: EZ‐TUNE
---

###
EZ-TUNE

##
Easy Tuning with INAV

A simplified multirotor tuning tool for PIDs and more.

For example instead of setting several filters with specified frequencies and types, you only need one slider to set them all.

Where to Find It:
- There is a tab in the CONFIGURATOR labelled EZ-Tune.
- This tab contains all settings related to the Easy Tune framework, consolidated onto one page.
- There is no need to use the CLI anymore.

Features Available in EZ-Tune:
- Default settings for large multirotors and the ability to choose them for sizes between the ususal ones.
- A general switch to enable and disable Easy Tune.
- A slider for setting filter cutoff frequencies.
- A slider for the axis ratio, adjusting how the weight distribution on your multirotor drone is configured.
- Settings for response, damping, stability, and aggressiveness that modify the PID and Forward settings.
- Two sliders for tuning rates and Expo settings.
- A preview on the right side shows changes as you adjust the sliders, providing a nice comparison to the current PID tuning procedure.

Safety Features:
- When Easy Tune is enabled, the entire PID tuning tab is disabled, reducing the risk of unintentional adjustments.
- This prevents modifications to settings that should not be changed.

Ez Tune vs Betaflight:

The simplified slider tuning is similar to the Betaflight slider tuning but differs in several ways:
- Unlike the Betaflight PID slider tuning, EZ-Tune in INAV not only adjusts PID controllers but also:
	- Sets rates and Expo values.
	- Enables and disables functions.
	- Greatly reduces the number of settings you need to manage.
- Instead of setting 12 values for the PID controller, you only need four.
- Instead of dealing with multiple filters and configurations, there's one simple slider.
- Both the rates and Expo settings for all axes are controlled by only two sliders.

How To Use

EZ TUNE is still new so please keep a copy of the current configuration with a 'diff all' command in the CLI followed by saving to a file in case you need to go back to the original

Select EZ TUNE from the CONFIGURATOR TABS.

Do read carefully what is written in each of the 9 sections on the left hand side.

First you will need to enable EZ TUNE in the green box. This will then allow you to safely adjust settings on the page. There is nothing else to change. If you feel that you need to go to PID tuning tab then don't. Everything you need to start with is here.


If you go through setting the recommended values for your craft in each box then you will have a default stable tune.

Note that the first box depends on the prop size used.

Usual starting points for 'Filter Hz' are:
-  3-inch props: 90,
-  5-inch props: 110,
-  7-inch props: 90,
-  10-inch props: 75,
-  12-inch props: 60.

![Graphically](https://github.com/Phil-MC/hello-world/blob/master/eztune-graph.webp)
The slope from 3" to 5" is misleading as the calculations change after this.

Use Blackbox and your own judgement to find a value that is most suited for your UAV after you have tested it.

When you have filled them all in click SAVE on the bottom right-hand corner.

TESTING

You will need to test fly your craft and see if there is anything that needs changing.

CHANGE ONE ENTRY AT A TIME.

SAVE AND TEST  BEFORE MAKING ANY MORE CHANGES.

Moving each slider across from left to right increases the effect, from mild at the left to extreme at the right. In many cases going from a sluggish response through the ideal one to an unstable one. Damping is an exception and is best left alone until the final test. I recommend finding a responsive setting while still stable, and then going back a little or increasing Damping at the end until it feels reliable. This is because the settings may well affect each other.

The defaults for the blue box from top to bottom are:
- Axis ratio	110
- Response	100
- Damping	100
- Stability	100

EZ TUNE calculates the values to go into the Preview Boxes on the right hand side.

When you press SAVE they are transferred to the Flight Controller.

NOTE

You can make use of EZ-TUNE to generate settings for quad sizes other than those listed on EZ-TUNE by using the graph. You do of course have to test them and modify as necessary. There are no guarantees. You are responsible for the outcome. I suggested using this technique to assist you in your search for a stable tune for other quad sizes.

FEEDBACK

Please send comments both positive and negative to the relevant section on INAV DISCORD or the INAV Facebook Forum
