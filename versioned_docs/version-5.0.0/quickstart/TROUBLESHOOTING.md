---
title: Troubleshooting
---

## UAV won't arm
1. Verify that it is level. You can bypass this requirement by typing "set Small_angle=180" then "save" in the CLI.
2. Run-time calibration not completed. Put the UAV flat and immobile on a surface and wait 10 seconds.
3. GPS doesn't have a lock. Move to an area with no sky obstruction or interference and wait. If lock still doesn't happen after a minute, relocate your GPS far from on-board electrics or shield the bottom part with [copper tape](https://www.ebay.com/itm/Copper-Foil-Tape-2-X-10ft-EMI-Conductive-Adhesive-Ship-from-USA/152118807659?hash=item236afccc6b:g:q2IAAOSwpdpVaIrt:rk:3:pf:0).
4. Compass not calibrated. Start compass calibration from configurator or stick control and, within 30 seconds, face all 6 face of the UAV to the ground.
If none of the above work, verify in your goggles or CLI "status" command the cause. Hardware malfunction might be the cause.

## UAV shakes
1. Verify that frame & motors are solidly bolted together, on an H-frame double up the bottom plate.
2. lower P on Roll and Pitch from configurator, adjustments or stick control
3. drop PID to 1,1,1 for Pitch and Roll and do a PID tuning from scrartch https://youtu.be/4sjXJ5HoU_c or https://youtu.be/ehyXLsvaEhw

## POS HOLD drifting
(moving in circle a.k.a Toilet bowling or running away)
1. SETTINGS: go inside configuration and verify that your MAG alignment is [set properly](/docs/quickstart/GPS--and-Compass-setup.md)
2. CALIBRATION: redo MAG calibration
3. TEST MAG INSULATION: on the bench, add headings to OSD then props off, connect battery, motor tabs rev up your motors and see in your goggles if the headings changes. If it changes you have bad insulation so move the mag away from your quad's electricals or apply copper tape between mag and main power lines. If you want to test this with flight condition current, fly your quad outside in ACRO, doing punch-through with no yaw movement.

## Transition to ALT HOLD is bad
1. Get your UAV in a stable hover in ACRO or ANGLE mode, find the amount of throttle required (openTX>Output>Throttle number at the top). Dial this number in configurator>Advanced Tuning tab>Hover Throttle. Note: if the value you find is >1700, your motors are underpowered to lift your quad, consider different props and motor combination.