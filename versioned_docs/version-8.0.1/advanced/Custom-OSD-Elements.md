---
title: Custom OSD Elements
---

One of INAV's most useful features has been the [Programming Framework](https://github.com/iNavFlight/inav/blob/master/docs/Programming%20Framework.md) . Allowing users to customize their flight logic, to suit their requirements. But, from the release of INAV 7.0.0. There is the addition of _custom OSD_ elements. So users can add their own elements, and display relevant data derived from the Programming framework.

The settings are found under the Configurator OSD tab.

![Custom elements GV](https://github.com/iNavFlight/inav/assets/47995726/26c8b12d-27da-4a10-9ce7-e8b42289623b)
![elements](https://github.com/iNavFlight/inav/assets/47995726/33bb28e2-d090-4716-b01c-6a0aec59f9eb)

Each custom OSD element has three configurable spaces, plus an activation condition. You don't need to use all three configuration spaces, and the element can always be active. The three configurable spaces can either be a character from the OSD font, data from the programming framework, or text. The character numbers can be found in [this document](https://github.com/iNavFlight/inav-configurator/blob/master/resources/osd/INAV%20Character%20Map.md). These are the options available in each configurable space.

|  Options       |        Description                                                                                            |
| ------------   |  -----------------------------------------------------------------------------------------------------------  |
| **None**       | Don't use any selection in the drop-down                                                                     |
| **Text**       | Displays text. 0 - 15 characters which can include [`A-Z`] [`0-9`] [`^!.\*`] * Text can only be used once in a single element, due to memory limitations                                           |
| **Icon Static**| User can select a [character](https://github.com/iNavFlight/inav-configurator/blob/master/resources/osd/INAV%20Character%20Map.md) number from the [INAV OSD](https://github.com/iNavFlight/inav-configurator/blob/master/resources/osd/analogue/impact.png) , they want to display as a descriptive reference                                                                      |
| **ICON from Global Variable**    | Displays the icon, driven from a global variable
| **ICON from Logic Condition**    | Displays the icon, driven from a logic condition (Added in INAV 8.0.0)                                                  |
| **Global Variable #**         | Data within the global variable can be displayed in these decimal format's [`00000` `0000` `000` `00` `0` `0000.0` `000.00` `000.0` `00.00` `00.0` `0.0`] (Some formats added in INAV 8.0.0) |
| **Logic Condition #**         | Status of the logic condition can be displayed in these decimal format's [`00000` `0000` `000` `00` `0` `0000.0` `000.00` `000.0` `00.00` `00.0` `0.0`] (Added in INAV 8.0.0) |
| **VISIBILITY** | Choose when to display custom message - **Always** or as the result of a **Global Variable** or **Logic Condition** being met        |

:::note
Currently, only the first 255 characters are supported by custom OSD elements.
:::

This [video](https://youtu.be/BqkDo-2O7js?si=_vOAHQn2N0MGbKdl&t=81) made by the features' developer. Shows an example of a custom element, which is the **!GROUND!** message, and a GV containing Lidar altitude above the surface. With a static altitude character beside it.

### Working with numbers
<img src="https://github.com/user-attachments/assets/5dba884b-2f27-4e80-878c-f72b7c08ba87" align="left" height="350px" />You may have noticed that there are plenty of different options for showing different formats of numbers. All numbers can be either positive or negative. Which is why you will see an empty space to the left of a positive number. The whole numbers are pretty self explanatory. Just choose the appropriate number of digits for the number you are displaying. But, the numbers with decimal places need a little more explanation. In the programming framework, there are no floating point numbers. So no decimal spaces. So how do we display a number with decimal spaces? We are simply faking it with maths.

As an example, we want to show our distance to home in kilometres. The **Flight** - **Home distance [m]** operand in the programming framework returns metres. We also want to show 2 decimal places. So how do we do it? Simply, take the calculation we would normally need, and shift it by the number of decimal places. For example, to convert our metres to kilometres, we need to divide the metres by 1000. But, If we want two decimal places, we shift the 1000 we use for the calculation right by 2. So instead of performing *metres ÷ 1000*. We perform *metres ÷ 10*.

To see that with real numbers. Imagine that **Flight** - **Home distance [m]** is outputting 7243m. Remember that all results are whole numbers, no floating point. So *7243 ÷ 10 = 724*. Out custom OSD element display then takes that number and inserts the decimal place in the correct place. So, our OSD will show 7.24km.



***

## This is an example of a simple stall warning indicator

The logic checks if the _Virtual Airspeed_ has dropped below 30km/h, with the _Pitch_ being above 20°, or the _Throttle_ being below 48%. Warning of a potential stall.. Being that most tip stall conditions are induced unknowingly by the pilot, this can help avoid such events.

Makes sure you enable the _Virtual Pitot_ if you do not use a real Pitot.. To better suit your aircraft. Pitch angle, Throttle and Airspeed values should be altered for best detection.

![Air speed stall warning logic](https://github.com/user-attachments/assets/0f9ecb36-7903-476f-a843-5c53cfcbeac0)

The message will display STALL WARNING with a warning symbol (221). The stall message will only appear when the conditions are met.

![OSD warning](https://github.com/iNavFlight/inav/assets/47995726/1d479cda-6620-4025-9958-fb693149d886)

:::note
Please note that stalls are not caused directly by the speed of the aircraft. Stalls are caused by too little airflow over the wing. Which is dependent on airspeed at the attitude of the aircraft. So it may not detect all instances of a stall. Please do not be complacent. Aircraft with higher wing loading or poor stall characteristics should always be flown with caution when lowering the throttle to conserve energy.
:::

## This is an example of a basic switch indicator
While there are switch indicators for the OSD. Using the Custom OSD elements can give you much more control over this. This is an example of how to set them up.

On the Programming Framework page. Set up the Logic Conditions for the switch.

![Programming for a switch indicator](https://github.com/user-attachments/assets/68490129-b2fb-4441-8437-35e2ac824cfe)

- LC0 takes the channel that you want to display the switch for, and subtracts 1000. This gives the switch a 0-1000 range.
- LC1 maps that range to 3 values: 0, 1, and 2.
- LC2 Adds the value from LC1 to the first switch indicator icon. 208 is switch down, 209 is switch in the middle, and 210 is switch up.
- LC3 sets GVAR 0 to the value from LC2. **Note** In INAV 8.0.0, you do not need LC3. You can use the output from LC2 directly to select the icon.

Then on the OSD page. Add the Custom OSD element to handle the programming.

![Custom OSD Settings](https://github.com/user-attachments/assets/8a20e38d-4373-4ed9-ab7d-33f2fcc6df32)

- Setup the icon. For INAV 7.1.x you will need to set this to **Icon Global Variable**. You would set the GV to the variable you chose in the programming. In this example, GV 0. With INAV 8.0.0 onwards, we don't need to use the Global Variable. So set this to use **Icon from Logic Condition**. Then set the LC to the appropriate Logic Condition. LC2 in our example.
- Next, we simple add the **Text** for what the switch represents.

If you want to swap the icon and text sides. You simply switch the text and icon.

:::note
Please note that Custom element previews are added in INAV 8.0.0. Currently, the Custom OSD icons in the OSD preview cannot retrieve the actual value from the global variable. The actual value of Global Variable 0 in the above example is 209. Which displays the mid switch position
![](/img/content/209.png)
:::

## Example: Showing the altitude in different measurement units
In this example, we have our OSD set to metric. But some of the guys we fly with only understand feet. So what we are going to do is be nice, and have both measurement units on our OSD. We have the standard **Altitude** OSD element showing us the altitude in metres. Now we are going to add a second altitude custom element in feet. First, hop to the **Programming** page and we will perform the calculations.

![image](https://github.com/user-attachments/assets/e48bd2b5-0810-45b8-a0ef-83c31140c33e)

The first LC, we multiply the altitude in cm by 100. This allows us to divide with more accuracy. The second LC, we are dividing the result of LC0 by 3048 to get the result in feet. Note that by multiplying by 100 and dividing by 3048. We are more accurate, but will max out at 7045ft. Of course, we're not flying anywhere near that altitude. This calculation is just to show the limitations.

Next, head back to the **OSD** page and enable Custom Element 1. We will now make this show the altitude in feet.
<img src="https://github.com/user-attachments/assets/ca09118f-323e-488a-a3d5-c2999069ce58" align="right" height="100px" /> In the first configuration space, we choose **Logic Condition 0000** from the list. We will now choose LC1, which is the logic condition performing the divide. We can use 4 digits of precision because we know the number will not go over 7045. Next, we select **Static Icon** for the seconds configuration space. The character number is **120**, so enter that. You can see that the OSD preview has updated and is showing the a 4 digit number and the correct **Alt Ft** character.

But, what if we only wanted to this altitude when we are under 400ft for example. We can do this by adding one more line on the **Programming** page.

![image](https://github.com/user-attachments/assets/61d50f4b-5cbe-4b99-a741-ff0e7a1c7326)

The third logic condition is only active if we are below 400 feet. So back on the **OSD** page. We can change the visibility configuration to **Logic Condition** and  **LC2**. This will only show our custom element when the altitude is below 400 ft.

![image](https://github.com/user-attachments/assets/7483e053-2369-49e7-9a7f-9de8fbae6aad)

## Custom OSD Elements video tutorials

[How to add custom OSD elements in INAV - Mr.D RC](https://youtu.be/DR6rxMLTP44)
