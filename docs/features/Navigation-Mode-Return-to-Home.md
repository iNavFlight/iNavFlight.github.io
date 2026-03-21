---
title: Navigation Mode Return to Home
---

## Introduction

Return to Home (**RTH**) has quite a few settings, so would benefit from a page of it's own. **RTH** will attempt to bring copter/plane to the home position, or safehome if used. The home position is defined as a point where aircraft was first armed, by default. RTH will control both position and altitude. You will have to manually control altitude if your aircraft does not have an altitude sensor (barometer).

With default settings RTH will land immediately if you are closer than 5 meters from launch position. If further away it will make sure to have at least 10 meters of altitude. A plane will fly home at cruise throttle, then loiter or land, depending on settings. A copter will start going home at 3m/s, and land. It will disarm itself if so configured, otherwise you will have to manually disarm once on the ground.

Return to Home is activated by the NAV RTH flight mode.

## RTH Altitudes

There are two altitudes that can be used with RTH: _nav_rth_altitude_ and _nav_rth_home_altitude_.

_nav_rth_altitude_ is used in conjunction with the RTH Altitude control modes to decide the altitude that the model returns home at. See below to see how the two are combined.

_nav_rth_home_altitude_ sets the altitude that a plane will loiter at when it arrives at home. If above the _nav_rth_home_altitude_, the plane will start loitering, then loiter down to the home altitude. The default, 0, means that the feature is disabled. In which case the plane will loiter at the **Actual RTH Altitude**, or _nav_rth_altitude_ if linear descent is used.

## RTH Altitude control modes

RTH sequence can control altitude in several different ways, controlled by _nav_rth_alt_mode_ and _nav_rth_altitud_ (the altitude in centimetres) parameters.

Default setting is **NAV_RTH_AT_LEAST_ALT** - climb to preconfigured altitude if below, stay at current altitude if above.

### Maintain current altitude (NAV_RTH_NO_ALT)

- _nav_rth_alt_mode_ = **CURRENT**
- _nav_rth_altitude_ is ignored

The **Actual RTH Altitude** is the altitude that the model is currently flying at.

![RTH No Alt](/img/content/NAV_RTH_NO_ALT.jpg)

### Maintain current altitude + predefined safety margin (NAV_RTH_EXTRA_ALT)

- _nav_rth_alt_mode_ = **EXTRA**
- _nav_rth_altitude_ defines extra altitude margin

The **Actual RTH Altitude** is the altitude that the model is currently flying at, plus the _nav_rth_altitude_.

![RTH Extra alt](/img/content/NAX_RTH_EXTRA_ALT.jpg)

### Predefined altitude (NAV_RTH_CONST_ALT)

- _nav_rth_alt_mode_ = **FIXED**
- _nav_rth_altitude_ defines exact RTH altitude above launch point.

If the model is below _nav_rth_altitude_ it will climb to desired altitude prior to flying back home. If the model is above the desired altitude, it will turn and fly home and descend on the way. That defines the **Actual RTH Altitude**.

![RTH Const alt](/img/content/NAV_RTH_CONST_ALT.jpg)

### Maximum altitude since launch (NAV_RTH_MAX_ALT)

- _nav_rth_alt_mode_ = **MAX**

_pre-INAV 4.1_

- _nav_rth_altitude_ ignored

_INAV 4.1 onwards_

- _nav_rth_altitude_ defines the minimum RTH altitude above launch point. If the maximum altitude of the flight is below _nav_rth_altitude_, _nav_rth_altitude_ is used. If the maximum altitude of the flight is above _nav_rth_altitude_, the maximum altitude is used. 0 = disabled.

The **Actual RTH Altitude** is the highest altitude during the flight, or _nav_rth_altitude_ if higher.

![RTH Max alt](/img/content/NAV_RTH_MAX_ALT.jpg)

### At least predefined altitude above launch point (NAV_RTH_AT_LEAST_ALT)

- _nav_rth_alt_mode_ = **AT_LEAST**
- _nav_rth_altitude_ defines the minimum RTH altitude above launch point.

If the aircraft is below _nav_rth_altitude_ it will climb to desired altitude prior to flying back home. If the model is above the desired altitude, it will turn and fly home at the current altitude. This defines the **Actual RTH Altitude**.

![RTH at least alt](/img/content/NAV_RTH_AT_LEAST_ALT.jpg)

### Predefined altitude linear descent (NAV_RTH_AT_LEAST_ALT_LINEAR_DESCENT)

_pre-INAV 7.0_

- _nav_rth_alt_mode_ = **AT_LEAST_LINEAR_DESCENT**
- _nav_rth_altitude_ defines minimum RTH altitude above launch point.

If the aircraft is below _nav_rth_altitude_ it will climb to desired altitude prior to flying back home. If the model is above the desired altitude, it will turn and fly home, and descend on the way (on a linear straight line). This defines the **Actual RTH Altitude**. Aircraft will descend in a way that it'll reach the _nav_rth_altitude_ altitude only when it reaches the home point. So aircraft can save energy by doing an easy descend on it's way back home.

![](https://i.imgur.com/CPgKb4w.png)

## Linear Descent

_INAV 7.0 Onwards_

Before INAV 7.0; linear descent was an extended version of the **AT_LEAST** return to home method. From INAV 7.0 onwards, linear descent can be used with all RTH methods. It has also been extended to give the pilot more control. Because all RTH methods can now use linear descent; there needs to be a target altitude to descend to, that works with all RTH methods. To do this, the target altitude of the linear descent is now the `nav_rth_home_altitude`. You will need to set this parameter in order for linear descent to work.

If Linear Descent is enabled, and the RTH Home Altitude is less than 10m. A warning is shown around the RTH Home Altitude input box. You can enter whatever values you want, including 0. It is your responsibility to make sure the value is safe for your flight environment. If the RTH Home Altitude is not set, Linear Descent is not used in flight.
![image](https://user-images.githubusercontent.com/17590174/219960451-626acd82-c885-4b92-a836-30f3cfc81a41.png)

An option has also been added to decide how far away the linear descent starts. This is via the `nav_rth_linear_descent_start_distance` parameter. Current behaviour can be maintained by setting this to 0 [default]. When set to 0, the linear descent starts immediately upon entering RTH. You can also specify a distance from home when the linear descent begins. This is in metres and be up to 10km (10,000m). In all cases, the linear descent aims to reach the `nav_rth_home_altitude` as it arrives home, if possible.

Though this feature is still called linear descent, due to consistency. In some cases, if flying below the home position, this can work as a linear ascent. Rising up to the `nav_rth_home_altitude`.

## Climb first

The _nav_rth_climb_first_ option sets how the model will initiate the **RTH**.

### Climb first with Multirotors

- If _nav_rth_climb_first_ = **OFF**, the multirotor will turn to home, and immediately fly towards it, climbing on the way to the **Actual RTH Altitude**.
- If _nav_rth_climb_first_ = **ON**, the multirotor hover and increase altitude. When it reaches the **Actual RTH altitude**, it will fly towards home.

### Climb first with Fixed Wing

#### _nav_rth_climb_first_ = **OFF**

The plane will turn towards home, and climb to the **Actual RTH altitude** on the homeward journey.

[![https://imgur.com/qXkxPxh](https://i.imgur.com/qXkxPxhl.png)](https://i.imgur.com/qXkxPxh.png)

#### _nav_rth_climb_first_ = **ON**

The plane climb to the **Actual RTH altitude** in the direction it is currently flying. Once the **Actual RTH Altitude** is reached, it will turn and fly towards home.

[![https://imgur.com/MYWCu2X](https://i.imgur.com/MYWCu2Xl.png)](https://i.imgur.com/MYWCu2X.png)

#### _nav_rth_climb_first_ = **ON_FW_SPIRAL**

_Feature available since iNav 3.0._

The plane climb in a loiter to the **Actual RTH altitude**. Once the **Actual RTH Altitude** is reached, it will turn and fly towards home.

[![https://imgur.com/iviZOZ4](https://i.imgur.com/iviZOZ4l.png)](https://i.imgur.com/iviZOZ4.png)

#### Two stage climb first

_Feature available since INAV 4.0_

Climb first can be a pretty inefficient part of the RTH sequence. The problem is that you are using energy spiralling up to altitude, or worse, flying away from home while gaining height. However, turning off climb first may not be a valid option, depending on the flying environment. This setting gives pilots more options with climb first.

This feature can be set up in the CLI with the following commands:

- **nav_rth_climb_first_stage_altitude**: Allows you to set an altitude for the first climb stage. The default, 0, means the feature is disabled.
- **nav_rth_climb_first_stage_mode**: This setting is similar to nav_rth_mode, in that it lets you decide how you want to use the first climb stage altitude. Settings are AT_LEAST and EXTRA.

#### nav_rth_climb_first_stage_mode = AT_LEAST

This setting works in the same vein as the main RTH modes. Your target altitude for the first stage climb will be what you have set in nav_rth_climb_first_stage_altitude. If you are below the first climb stage altitude, the plane will climb to it. If not, it will turn to home. It will either directly fly home, or climb on the way home if your main RTH altitude target has not been reached. If the RTH Altitude is reached in the first stage, it will immediately turn towards home.

#### nav_rth_climb_first_stage_mode = EXTRA

Again, this setting works just like the main RTH modes. The target altitude for the first stage climb will be your current altitude plus the value you have set in nav_rth_climb_first_stage_altitude. If you are below the RTH Altitude, it will climb to the first climb stage altitude. If not, it will turn to home. The plane will either fly directly home, or climb on the way home if your RTH altitude target has not been reached. If the RTH Altitude is reached in the first stage, it will immediately turn towards home.

#### How does this work?

To be honest, pretty much as you expect it to. Once you select RTH, the model will start climbing (linear or spiral) up until the first stage target is met. Then it turns towards home and flies in that direction. If more altitude is needed to reach your target RTH altitude, it will climb on the way home. If the target altitude is met during the first climb stage, it will just fly home. Nice and simple, and much more energy efficient.

[![RTH Climb modes - climb first = on with stage](https://i.imgur.com/S9ARPtfl.png)](https://i.imgur.com/S9ARPtf.png)

[![RTH Climb modes - climb first = spiral with stage](https://i.imgur.com/7GMqN9Ql.png)](https://i.imgur.com/7GMqN9Q.png)

## Other Settings

### Trackback

_INAV 6.0 Onwards_
RTH Trackback records the recent track of the craft allowing it to return back along the track when RTH is triggered rather than returning directly back home. It's mainly intended to be used as a means of returning the craft to a position where the Rx signal can be recovered if it was lost due to a line of sight obstruction. This should improve the chances of recovering the Rx signal whilst reducing the risk of flying into the obstruction that caused the loss compared to normal RTH heading directly back home.

When triggered the craft returns along the trackback route until the end is reached at which point it reverts to normal RTH heading directly home. It doesn't perform the RTH climb phase at the start of the Trackback but instead uses the altitude recorded for each track point so long as that altitude is no lower than the altitude when Trackback was triggered (this is the minimum altitude used throughout the Trackback phase).

Trackback currently allows 50 trackback points with a maximum potential trackback distance of 2000m if the recorded track allows within the track point limit. It should be noted that the distance is the straight line distance from the point Trackback was triggered to the current position rather than the accumulative distance along the track. It's mainly intended to be used to limit the distance travelled away from the start point before a normal RTH is initiated. It can be set using [nav_rth_trackback_distance](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_rth_trackback_distance). Trackback usage is controlled by setting [nav_rth_trackback_mode](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_rth_trackback_mode), OFF, ON and FS. ON works for normal and failsafe RTH, FS is for Failsafe RTH only.

Trackback RTH can be cancelled using the RTH Altitude Control Override `RIGHT ROLL` command at which point RTH will revert to a normal RTH heading directly back home. [nav_rth_alt_control_override](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_rth_alt_control_override) needs to be ON for this to work.

### Altitude Control Override

_INAV 3.0 Onwards_
It is possible to override the default RTH Altitude and Climb First settings during the initial RTH climb phase using the [nav_rth_alt_control_override](https://github.com/iNavFlight/inav/blob/master/docs/Settings.md#nav_rth_alt_control_override) setting.
