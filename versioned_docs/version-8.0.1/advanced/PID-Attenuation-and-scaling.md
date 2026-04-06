---
title: PID Attenuation and Scaling
---

**TPA** [***Throttle PID Attenuation***] is what allows aircraft that are optimally tuned in a cruise flight range, based on throttle or airspeed, to dynamically adjust PID gains to prevent control oscillations.

## Multirotors

**TPA** = percentage of PID attenuation that will occur when the throttle is increased above the TPA breakpoint.

**TPA Breakpoint** = the throttle micro-second value in the curve at which **TPA** will begin to be applied. Below that point the PIDs are not attenuated at all.

### How and Why to use this?

Your PID's should be tuned in a throttle range your copter will comfortably cruise at - _e.g. _1450 - 1650uS_ based on thrust to weight ratio and bank angle_. But as you increase the throttle beyond this, you may start getting oscillations. So increase the **TPA Breakpoint** to a throttle value just below the onset of oscillations. Then slowly increase **TPA** until your oscillations are gone. TPA = 20 is a good starting point. But it may need to be taken higher on more powerful copters.
**Note** - On reverse motor 3D installs, TPA is not recommended.
### Example of multirotor TPA curve

![](/img/content/tpa_multirotor.png)

## Airplanes

For airplanes **TPA** works in a different way - It not only attenuates PID gains at high throttle, but also boosts them at low throttle, allowing better control when flying or gliding at low speeds with minimal or no throttle. **TPA** is expressed as a curve that boosts PIDs below the TPA Breakpoint and attenuates them above the breakpoint.

**TPA** = amount of attenuation apply to the PIDs. 100% TPA allows PIDs to be scaled by a factor of `[2x boost]` `[0.4 reduction]`.

**TPA Breakpoint** = the point in the throttle curve at which PIDs are not boosted or attenuated.

**FW TPA Time Constant** = TPA smoothing and delay time constant to reflect non-instantaneous speed/throttle response of the plane.

### How to use this?

Tune your PIDs at the throttle level you intend to fly your airplane (cruise throttle). Set that value as **TPA Breakpoint**.
You will notice that when you fly at lower throttle your airplane handles more loosely. And at higher throttle (up to full throttle) it begins to oscillate. Increase **TPA** amount until these oscillations are gone or minimal. This will also translate to better handling at lower throttle values.


The **TPA Time Constant** feature uses an asymmetric filter, that effects both increasing and decreasing throttle/speed. Meaning it delays the addition/removal of attenuation/boost for the selected time period, when the throttle is moved a set value either side of the **TPA Breakpoint**.
Planes with low thrust/weight ratio generally need higher time constant for launch. While planes with a lower drag coefficient, conversely require a higher time constant, during speed wash-off; requiring the constant to be balanced.


### Example of airplane TPA curve

![](/img/content/tpa_airplane.png)

:::note
The present airplane implementation has limits.
:::

Until airspeed support is introduced, INAV only uses the throttle for attenuation, which is relatively proportional to airspeed. But it can not attenuate the PIDs at lower throttle values if the airplane is placed into a dive as the airspeed increases.
