---
title: OSD Custom Messages
---

One of INAV's most useful features has been the [Programming Framework](https://github.com/iNavFlight/inav/blob/master/docs/Programming%20Framework.md) . Allowing users to customize their flight logic, to suit their requirements.

But from the release of INAV 7.1.0 there is the addition of _custom OSD_ elements. So users can add their own messages, and display relevant global variables derived from the Programming framework.

The settings are found under the Configurator OSD tab.

![Custom elements GV](https://github.com/iNavFlight/inav/assets/47995726/26c8b12d-27da-4a10-9ce7-e8b42289623b)
![elements](https://github.com/iNavFlight/inav/assets/47995726/33bb28e2-d090-4716-b01c-6a0aec59f9eb)

With 3 custom elements available. And various user selections. Which are as follows.

|  Options       |        Description                                                                                            |
| ------------   |  -----------------------------------------------------------------------------------------------------------  |
| **NONE**       | Don't use any selection in the drop-down                                                                     |
| **TEXT**       | Displays text. 0 - 15 characters which can include [`A-Z`] [`0-9`] [`^!.\*`] * Text can only be used once in a single element, due to memory limitations                                           |
| **ICON STATIC**| User can select a [character](https://github.com/iNavFlight/inav-configurator/blob/master/resources/osd/INAV%20Character%20Map.md) number from the [INAV OSD](https://github.com/iNavFlight/inav-configurator/blob/master/resources/osd/analogue/impact.png) , they want to display as a descriptive reference                                                                      |
| **ICON GV**    | Displays the driven global variable                                                       |
| **GV**         | Data within the global variable can be displayed in these decimal format's [`00000` `000.00` `000` `0.0`]
| **VISIBILITY** | Choose when to display custom message - **Always** or as the result of a **Global Variable** or **Logic Condition** being met        |

This [video](https://youtu.be/BqkDo-2O7js?si=_vOAHQn2N0MGbKdl&t=81) made by the features developer. Shows an example of a custom element, which is the **!GROUND!** message, and a GV containing Lidar altitude above the surface. With a static altitude character beside it.



***

## This is a simple example of a stall warning indicator

The logic checks if the AoA is greater than 20 degrees, with the airspeed being less than 30km/h, or if the throttle is less than 48%. Makes sure you enable the _virtual pitot_ if you do not use a real pitot. Values can be altered to suit your models requirements.


![Stall warning logic](https://github.com/iNavFlight/inav/assets/47995726/7326b09e-83e8-42c3-aba4-3ef2706cb522)


The message will display STALL WARNING with a warning symbol (221). The stall message will only appear when the conditions are met.

![OSD warning](https://github.com/iNavFlight/inav/assets/47995726/1d479cda-6620-4025-9958-fb693149d886)
