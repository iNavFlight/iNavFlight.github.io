---
layout: post
title:  "INAV 1.6 PIFF Controller"
date:   2017-02-14
categories: [news]
---

While INAV 1.6 is just a few weeks away I'd like to highlight a brand new stabilisation controller for fixed-wing aircrafts - the PIFF.

So why invent a yet another controller if we already have a PID (although it's recommended to zero-out D-gain turning it into a PI-controller)?

Let's talk about it.

<!--more-->

What's PIFF? It stands for Proportional - Integral - Feed-Forward. We took the classic PI-controller and added a feed-forward component to it. So, what's so cool about feed-forward so we bothered implementing it and completely changing the way of tuning the fixed-wing aircraft?

Imagine a scenario (a very simplified one) when a trimmed plane is flying in dead calm air with no turbulence and there is a request to roll left at a given rate for a given time (i.e. do a barrel roll).

### Let's look at how a human pilot controls a plane manually:

![](/assets/2017-02-14/1_human_pilot.png)

 * At the beginning of the motion a good pilot will deflect the roll stick (and ailerons) to approximately the very position that is needed to reach the required rate.
 * During the maneuver pilot will watch the roll rate and deflect ailerons more or less to correct.
 * At the end of maneuver the pilot will release the stick, ailerons will move to neutral and plane will stop rotating.

### However, PI-controller behaves in a totally different way:

![](/assets/2017-02-14/2_PI.png)

 * At the beginning of the motion P-term will deflect ailerons a lot - usually much more than is normally required to sustain the desired rate.
 * As the plane will accelerate the rotation towards desired rate the P-term will deflect ailerons back to neutral (at exactly the desired rate P-term is zero and doesn't command any deflection at all).
 * This is where I-term comes in - it winds-up a lot keeping the rotation rate at required level as long as necessary. Eventually I-term is the only component keeping surfaces deflected (P-term is zero at exactly the desired rate).
 * Interesting things begin when there is a request to stop the motion: P-term commands a lot of deflection in opposite direction to stop the motion, but we have I-term wound-up and struggling to keep the plane rotating in the same direction.
 * Based on relation between gains for P and I there might be bounce-back, overshoot or oscillation until I-term unwinds to zero.

As you can see PI controller is moving surfaces in both directions and at high deflections - usually much higher than is normally required for such a maneuver. Such behaviour consumes energy - not only by servos themselves, but also by deflected surfaces that increase drag. Such behaviour also puts a lot of stress on servo gearing reducing their life-span.

Regardless of all drawbacks - PI-controller has one big advantage - it's fast. If servos are fast enough PI-controller is able to start and stop the motion faster than a human-pilot would - this is because P-term struggles to accelerate by deflecting more then necessary and also stops the motion by deflecting surfaces in opposite direction.

So, why PIFF is better? 

### Let's look at reduced version - the IFF-controller:

![](/assets/2017-02-14/3_IFF.png)

 * At the beginning of the motion FF-term will deflect the ailerons roughly to the needed deflection (as a human pilot would do). We are looking at undertuned IFF-controller, so that deflection will be smaller than necessary.
 * During the motion I-term winds-up slightly to compensate for the small error in deflection.
 * When motion should stop the FF-term will zero out, but I-term will keep ailerons slightly deflected causing motion to continue.
 * I-term unwinds from the small wind-up stopping the motion completely, but also causing small overshoot on the way.

As you can see IFF behaves much more like a human pilot - moving the servos only as requred and not caring a lot to compensate for errors instantly. This saves energy and puts less stress on servos as servo motion will be less in general. The one draw-back of IFF - overshoot - can be dealt with by adding some (small) P-gain which adds faster reaction and helps dealing with overshoot.

Tuning PIFF is fairly simple. What FF-gain is really - it's an inverse of airplane capabilities. You need to figure out what rotation rate your plane can reach will full servo deflection (in passthrough mode), calculate inverse of that, type that into FF-gain and get a nearly perfectly tuned machine. Then adjust I until you get rid of drift (caused by error in trimming) and add some P to make it snappier. Described approach for tuning is oversimplified, FF-gain in INAV can't be calculated exactly like that, but you get the idea.

So, to conclude. PIFF-controller is behaving more like a human pilot, consuming less energy and extending life-span of your servos. It can also be tuned to be as snappy as you want it to be, possibly even snappier than classic PI-controller.

### And this is how PIFF flies:

<iframe width="560" height="315" src="https://www.youtube.com/embed/r4vRrhFjdiQ" frameborder="0" allowfullscreen></iframe>

Stay tuned for release of INAV 1.6-RC1 to try the new PIFF!