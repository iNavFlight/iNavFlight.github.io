---
layout: post
title:  "INAV 1.5 Released"
date:   2016-12-31
categories: [news]
---

While the year of 2016 is coming to an end so is another cycle in INAV development and we are happy to present you the result - [INAV 1.5](https://github.com/iNavFlight/inav/releases/tag/1.5)!

Featuring a lot more safety features the new firmware will protect you from flying with disconnected or uncalibrated sensors and in many other cases where it's unsafe to leave the ground.

<!--more-->

New OSD-enabled boards also have some support now. Not all of the required information is displayed on OSD yet, but we are working to fix this. At the moment the OMNIBUS F3 AIO board is a very appealing solution suitable for both multuirotor and fixes-wing aircrafts. You can get one here - [url]http://shop.myairbot.com/index.php/early-bird/omnibusv11.html[/url]

Airplane launch mode is improved - now it is much more reliable and allows you to launch your flying wing by holding it by the wingtip and swinging it into the air. One of the INAV developers - DzikuVx - made a video explaining the new feature - [url]https://www.youtube.com/watch?v=LfoYep7a8jQ[/url]

A lot of bugs has been fixes as well. A few most notable fixes are
1. An issue with coarse resolution in the middle of the stick in ACRO mode which was bugging us for quite a while (known as "deadband even when deadband = 0 issue")
2. BARO + GPS co-existance on airplanes is finally fixed. It's now perfectly safe to leave BARO enabled on airplanes.
3. Failsafe defaults are now more safe. A lot of failsafe bugs have been fixed as well.

In the next 2017 year we'll work hard to give you even more safety and new cool features to both multicopter and airplane flyers.

If you like INAV and feel like supporting it - please consider [supporting the pledge on Patreon or making an one-time donation on PayPal](https://inavflight.github.io/supporting-inav/). You support regardless of it's form will help making INAV better, safer and easier to use! If you are not in position to make a donation - just keep using INAV, reporting bugs and help make INAV more polular!

Happy New Year! Fly safe!
INAV team