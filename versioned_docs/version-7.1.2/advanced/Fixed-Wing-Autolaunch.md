---
title: Fixed Wing Autolaunch
---

## Fixed Wing Autolaunch

Fixed Wing Autolaunch, aka launch mode, allows the pilot to have assistance in launching their airplane. This can be particularly useful if you're a new pilot, have a difficult model to launch, or have a large model.

## Enabling Autolaunch

By default, autolaunch will not work. You need to tell INAV that you want to use it. There are two ways to do this. You can use a switched mode, or you can have it permanently enabled. Which you choose it personal preference. The switch gives you more control. Having it permanently enabled means it will work all the time. But if you don't want to use it, you must remember to move the pitch or roll stick to deactivated it.

### Using Autolaunch with a switch

![Fixed Wing NAV LAUNCH mode in INAV](https://github.com/iNavFlight/inav/assets/17590174/20901922-bee3-4707-8e99-58aa4a97b9a1)

To use a switch. You will need to set a switch to a channel on your transmitter. Then in the **Modes** page in INAV Configurator. Set **NAV LAUNCH** mode to be active when the switch is in the chosen position. If you don't see the **NAV LAUNCH** mode. You may have the permanent method enabled.

### Having Autolaunch permanently enabled

![Permanently enable launch mode in INAV](https://github.com/iNavFlight/inav/assets/17590174/1d39a728-482d-49c8-8fd4-22c9c7bfb63a)

To have Autolaunch permanently enabled. You need to activate the **Permanently enabled Launch Mode for Fixed Wing** feature on the **Configuration** page. If this is enabled, the **NAV LAUNCH** mode will not be found on the **Modes** page.

## Configuring launch mode for your aircraft

The basic settings for Autolaunch can be found on the **Advanced Tuning** page in INAV Configurator. These settings should be all that you need to change to get launch mode working well for your model.

![Autolaunch settings on the Advanced Tuning page](https://github.com/iNavFlight/inav/assets/17590174/9eb0e978-0be8-4b16-b47f-ff6920932e81)

:::tip
The Autolaunch settings on the **Advanced Tuning** page are ordered in the way they happen during the launch. So they start with **Idle Throttle** (the first part of launch mode to activate, if set) to the **End Transition Time** (the end of the launch). This graphical explanation shows the Autolaunch sequence, related parameters and events is provided.

![AutoLaunch](https://github.com/iNavFlight/inav/assets/64522330/5a79c637-9724-481d-aba3-ad72581d2123)
:::

We will look at these setting briefly. But there are videos explaining the settings, including <a href="https://youtu.be/rj_RSrXqib8" target="_blank">this one</a>.

### Idle Throttle

The **Idle Throttle** setting allows you to let the motor spin at the desired throttle level _before_ you throw the airplane. This can be useful if:
* you have a large or heavy aircraft that will benefit from some additional push
* your plane suffers from torque roll
* you would like a visual indicator that the aircraft is ready to launch

The amount of **Idle Throttle** you need depends on your goal. If you only want a visual indicator, a low value like 1100uS (10%) will work for you. However, if you want to have some launch assistance or to combat torque roll. You will need to estimate and adjust this value until it works well for your aircraft. A good starting point may be half the launch throttle, which we will cover later. If you don't want to use **Idle Throttle**. Set the value to 1000uS (0%)

:::note
If you see a red box around the **Idle Throttle**. It is because you have specified an **Idle Throttle Delay** but do not have an **Idle Throttle** set.

![image](https://github.com/iNavFlight/inav/assets/17590174/0a7daf0a-acb7-4d7d-a7da-a42af59307c2)
:::

### Idle Throttle Delay

**Idle Throttle Delay** adds a delay between raising the throttle and the *Idle Throttle** starting. This is extremely useful if you need to do something like put your transmitter down and pick up your airplane. Or just to get yourself prepared. If you do not want to use an **Idle Throttle Delay**. Set this to 0.

### Max Throw Angle

The **Max Throw Angle** setting is the maximum angle that the aircraft can be at to allow the launch to be detected. The default of 45 degrees should be plenty for most launches. Please don't be tempted to set this to a stupid angle like 180 degrees. Even a double-handed overhead launch should only need a maximum of 60 degrees. Any higher than this and the aircraft will likely just stall. There are very few exceptions, where vertical launches are desired. Such as high powered FunJet. Which will have a high power to weight ratio.

### Motor Delay

**Motor Delay** is the time between the launch being detected and the motor starting to spin up to **Launch Throttle**. This setting is pretty important for safety. If you have a tractor plane. This setting can be low safely.

:::danger
If the motor speeds up too quickly and you have a pusher plane. You risk a prop strike to your hand. So please be carful when adjusting this.
:::

### Minimum Launch Time

The **Minimum Launch Time** setting dictates a time period where the sticks on your transmitter will not respond. This is particularly useful if you have to pick up your transmitter or it's hanging on a neck strap. Setting this to 2 seconds can stop the launch being aborted unintentionally, because you have bumped a stick on your transmitter.

### Motor Spinup Time

This setting usually doesn't need to be changed. But it can be useful for reducing torque roll or taking stress off of folding props. The **Motor Spinup Time** is the time taken to go from the starting throttle (0% or **Idle Throttle**) to **Launch Throttle**. Lowering this setting is not recommended. But if you have a folding or large prop you could increase it. You could also try increasing this to help avoid torque roll.

### Launch Throttle

**Launch Throttle** is the main throttle level for the launch. This should be set based on the powertrain and weight of your aircraft. In <a href="https://youtu.be/rj_RSrXqib8" target="_blank">this video</a>, you can see a physical method for calculating the *Launch Throttle*. There is also [a tool for estimating the launch throttle](https://www.mrd-rc.com/tutorials-tools-and-testing/useful-tools/inav-auto-launch-throttle-estimator/).

### Climb Angle

Is the base attitude of the model for the climb. The **Climb Angle** should be set for the model. Some require a flatter launch to get speed up. Whereas others could have a steeper climb. Your flying environment may also contribute to the **Climb Angle**.

:::note
**Fixed Wing Level Trim** will be added to the **Climb Angle**. So a **Climb Angle** of 20 degrees and a **Fixed Wing Level Trim** of 5 degrees, would result in a commanded pitch of 25 degrees.
:::

### Launch Timeout

The **Launch Timeout** is the maximum time that the launch climb phase  will take. Once this timeout has been exceeded. The launch will progress to the end transition.

### Maximum Altitude

Is the **Maximum Altitude** that the airplane will climb to. Once this altitude is reached. The launch will progress to the end transition.

### End Transition Time

Is the time that the final launch phase will take. The **End Transition Time** makes for a smooth transition from the launch angle and throttle to level flight and the current or cruise throttle.

## Using Autolaunch

There are many versions of how to use autolaunch floating about the internet. But here is the official procedure for using autolaunch.

### Pilot actions for starting autolaunch

1. As preparation for launch, make sure that you are not in a navigation mode, or a modifier (such as alt hold) that activates auto throttle.
2. If you don't have autolaunch permanently enabled. Enable NAV LAUNCH with the switch on your transmitter.
3. Arm the airplane.
4. Select the mode that you would like to exit launch in to. A good choice for this is loiter, as you can watch the aircraft through the launch and keep it in view when it completes.
:::note
Currently, you cannot exit launch in to a waypoint mission.
:::

5. Raise the throttle to the approximate level that you want after launch has completed.

At this point, the process is different depending on your settings.

**No idle throttle set**

6. At this point, the airplane should be ready to throw. You can check in the OSD for the system message `** READY TO LAUNCH **`. Throw the airplane and it will enter the launch procedure. **You should not shake the aircraft to falsely start the launch.**

**Idle throttle set with no Idle Throttle Delay**

6. At this point, the motor will start with the Idle Throttle. `** READY TO LAUNCH**` will be shown on the OSD. Throw the airplane and it will enter the launch procedure.

**Idle Throttle set with an Idle Throttle Delay**

6. For the length of the Idle Throttle Delay. Nothing will happen. On the OSD it will show `** WAITING FOR IDLE **`. Then, the motor will start with the Idle Throttle and show `** READY TO LAUNCH **` on the OSD. Throw the airplane and it will enter the launch procedure.

:::note
Above, I have mentioned text being shown in the OSD to explain the launch status. To see these, you must have the **System Messages** OSD element on your OSD layout. We highly recommend having **System Messages** on every OSD layout. As it will show useful information and warnings during your flight.
:::

### The launch procedure

7. After throwing the airplane. INAV will watch for triggers to determine it has been launched. The two main triggers are the `nav_fw_launch_accel` and `nav_fw_launch_detect_time`. Once these have been breached, launch progresses to the next stage. A second trigger is the GPS. If INAV detects the craft moving away from the arming point. It will progress to the next stage of launch.
8. The throttle will increase from its current level to **Launch Throttle** over the course of **Motor Spinup Time**. Also, the pitch of the airplane will be commanded to target **Climb Angle** plus *Fixed Wing Level Trim**.
9. The airplane will climb with these settings until either the **Launch Timeout* or **Maximum Altitude** have been surpassed.
10. Launch will transition in to the flight mode and throttle level selected on your transmitter, over the course of **End Transition Time**.

## Advanced Settings

The advanced settings are only accessible through the CLI. For the most part, they are not needed. But some pilots may find them useful.

### Wiggle to Wake Idle Throttle

_From INAV 8.0_

Wiggle to Wake allows you to wiggle the yaw of the plane to start the idle throttle. This does not start the launch procedure or launch throttle, only the idle throttle. This gives more control over when the idle throttle starts, as you don't need to use a timer. Though the timer can still also be used. If so, idle will start either when the timer expires or the wiggle is detected.

There is one setting in the CLI: `nav_fw_launch_wiggle_to_wake_idle`. 0 = disabled. 1 and 2 signify 1 or 2 yaw wiggles to activate.
* 1 wiggle has a higher detection point, for airplanes without a tail.
* 2 wiggles has a lower detection point, but requires the repeated action. This is intended for larger models and airplanes with tails.

For this to work. An idle throttle value greater than 1000uS must be set, and `nav_fw_launch_wiggle_to_wake_idle` must not be 0. If there is no idle throttle delay, the wiggle will activate the idle throttle. If an idle delay is also set up, whichever occurs first activates the idle throttle.
