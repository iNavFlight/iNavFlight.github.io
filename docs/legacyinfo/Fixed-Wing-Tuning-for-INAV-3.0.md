---
title: Fixed Wing Tuning INAV 3.0
---

This is a basic overview of the steps to perform autotune and auto board pitch alignment in INAV 3.0

## Initial Setup  
* Enable "Continuous trim servos on Fixed Wing" in configuration tab
* Modes Tab 
  * Create acro/autotune flight mode. It's recommended to add P,I,FF values on your OSD to see values changing.
  * Create angle mode w/ autolevel.

## Tuning Flight
* Take off
* Fly in acro mode
* Switch on autotune
* Give full roll and pitch inputs
* Turn off autotune
* Switch to angle/autolevel mode
* Switch back to acro
* Land
* Disarm
* Save(stick command)

When satisfied with performance, remove "autolevel" and "autotune" modes. 

"Fixed Wing Level Trim" can be checked in the "PID Tuning" tab at the bottom of the "Mechanics" internal tab. 
 
Confirm in the "Outputs" tab that your servo "MID" positions are within a value of 1450 and 1550. If outside this range, it is recommended to mechanically trim your control surfaces to 1500 value. After a good servo center has been attained you can disable "Continuous trim servos on Fixed Wing" 
  
  

