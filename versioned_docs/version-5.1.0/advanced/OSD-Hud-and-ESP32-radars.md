---
title: OSD Hud and ESP32 Radars
---

## The Hud

The Hud is a feature that displays various points of interest (POI) on the OSD, in "3D", by showing a marker where the location is on the screen. For now it's capable to display :

- The home point
- Nearby aircrafts as sent by an ESP32 LoRa modem
- Next waypoints during a mission.

## Video Resources

- [This is a video demonstrating the hud for both home point and ESP32 radar tracking](https://youtu.be/zzKkcd5_cY4?t=27).
- [This is a video demonstrating the display of the waypoints live during an autonomous mission](https://www.youtube.com/watch?v=CqKNGY4pogU).

## Configuration

The hud must be set from the CMS menu of the OSD or from the CLI in the Configurator.

:::info
**Important! The Hud is a sub-set of the crosshair, it's designed this way because the crosshair is the origin/reference for anything hud-related. So make sure you have the crosshair enabled and displayed in the OSD tab of the Configurator. It is not recommended to have any of the legacy map or 2D-view items displayed in your OSD, as this could cause overlaps on the screen.**
:::

In order for the hud to display in "3D" where the POI is, it needs to know few things about your FPV camera :

In the CMS/OSD menu, go to OSD > Hud >...

### Crosshair style

To choose between 7 different types of crosshairs.

**CLI :**
`set osd_crosshairs_style = DEFAULT`

**Available Values:** `"DEFAULT", "AIRCRAFT", "TYPE3", "TYPE4", "TYPE5", "TYPE6", "TYPE7"`

### Camera Uptilt

Set the camera uptilt for the FPV camera. That's the angle in degres between the horizontal of the aircraft and the line of sight of the camera. For a multirotor with a camera usually pointing up it's a positive value, most often between 5 and 30°. For a plane with the camera pointing down it should be a negative value, often between -5 and -10°.

**CLI :**
`set osd_camera_uptilt = 0`

### Camera FOV horizontal + vertical

The FOV for the FPV camera, the default values are ok for a 2.8mm lens. If your camera is a 2.5mm or 2.1mm or lower focal, try to raise both the horizontal and vertical FOVs by 5 or 10° by steps (the smaller the focal length, the larger the field of view). If the FOV is too far off, the tracking won't work well near the borders of the screen.

**CLI :**
`set osd_camera_fov_h = 135`
`set osd_camera_fov_v = 85`

### Hud Margin horizontal + vertical

How far from the border of the screen the hud ends, so it does not overwrite the rest of your OSD datas.

**CLI :**
`set osd_hud_margin_h = 3`
`set osd_hud_margin_v = 3`

### Horizon offset

To vertically adjust, between -2 and +2, the whole OSD and AHI and scrolling bars, it's recommended to leave it at 0.

**CLI :**
`set osd_horizon_offset = 0`

## Displayed items:

This sub menu will let you select what is displayed on the Hud :

### Homing arrows

To display little arrows around the crossair showing where the home point is.

**CLI :**
`set osd_hud_homing = ON`

### Home point

To 3D-display the home point location (H)

**CLI :**
`set osd_hud_homepoint = ON`

### Radar max aircraft

Maximum count of nearby aircrafts or POIs to display, as sent from an ESP32 LoRa module. Set to 0 to disable (show nothing), up to 4. The nearby aircrafts will appear as markers A, B, C, D

**CLI :**
`set osd_hud_radar_disp= 3`

### Radar min range

In meters, by default 10 meters, radar aircrafts closer than this will not be displayed. This setting exists mostly to unclutter the OSD view during close range pursuits.

**CLI :**
`set osd_hud_radar_range_min = 10`

### Radar max range

In meters, by default 4000, radar aircrafts further away than this will not be displayed.

**CLI :**
`set osd_hud_radar_range_max = 4000`

### Next waypoints

How many waypoint are displayed, from 0 to 3. Set to 0 (zero) to disable. As sample, if set to 2, and you just passed the 3rd waypoint of the mission, you'll see markers for the 4th and waypoints (marked "4' and '5')

[This is a video demonstrating the display of the waypoints live during an autonomous mission](https://www.youtube.com/watch?v=CqKNGY4pogU).

**CLI :**
`set osd_hud_wp_disp= 2`

# CLI commands

All the settings are available in the CLI, defaults are :

```
set osd_crosshairs_style = DEFAULT
set osd_horizon_offset = 0
set osd_camera_uptilt = 0
set osd_camera_fov_h = 135
set osd_camera_fov_v = 85
set osd_hud_margin_h = 3
set osd_hud_margin_v = 3
set osd_hud_homing = OFF
set osd_hud_homepoint = OFF
set osd_hud_radar_disp = 0
set osd_hud_radar_range_min = 10
set osd_hud_radar_range_max = 4000
set osd_hud_radar_nearest = 0
set osd_hud_wp_disp = 2
```

## Accuracy and limitations

There's a long chain of inaccuracies conspiring to make the tracking not perfectly accurate :

- The heading of your aircraft can be wrong by a significant margin during or right after a hard turn. The steadier the flight, the more accurate it is.

- The artificial horizon drift issue does not help. Accurate positioning for the POI markers depends on the actual attitude and heading of the aircraft, any slight difference of few degrees will mess up the tracking.

- The tracking is not taking into account the roll angle of the plane so it remains simple and fast, so it won't be accurate when the banking angle is too high.

- OSD is character based, it's a 30x16 grid for PAL, and 30x13 for NTSC, it's not super high-definition.

- The crosshair is not perfectly centered in both horizontal and vertical dimensions because of an even numbers of columns and rows

- The position of the other aircrafts as sent by the ESP32 modules are updated at 2Hz (every 0.5sec), so at high speed there's lag involved because of relative movements.

### ESP32 LoRa modem ("iNav Radar" project)

If you have such a module fitted on your aicraft, extra steps are required in order to display the remote aircrafts live on the Hud :

- Wire the ESP32 module to a free UART on your flight controller, same as you would connect a GPS (+5V, GND, TX, RX). Using a Softserial port is not supported, it's not fast enough.

- In the INAV Configurator, Ports tab, enable the MSP option for this UART, and set the speed to **115200**. You don't have to set anything else for the port, the ESP32 will then communicate with the flight controller using standard MSP/MSP2 messages.

- In the CMS, OSD > Hud > Displayed items, set **Radar max aircraft to 4**

- If the wiring and port configuration is correct, at boot time the ESP32 module will show the INAV/host version detected.

Please see this [discussion at RCGroups](https://www.rcgroups.com/forums/showthread.php?3304673-iNav-Radar-ESP32-LoRa-modems) for mode details about the ESP32 modules and the radar project.

[This is a video demonstrating the hud for both home point and ESP32 radar tracking](https://youtu.be/zzKkcd5_cY4?t=27).

### What's displayed exactly ?

- If the marker is the home location, then the home icon is shown, it depends of the uploaded OSD font, it's usually a little house or the H letter. Below the marker is the distance, in meters/kilometers if the OSD is set to metric or UK, and in feet/miles if imperial.

- If the marker is a POI sent by the optional ESP32 LoRa Module, the markers are letters A, B, C etc, and below is also the distance, same as above. Additionally left and right of the marker will be displayed the link quality (4 bars = 100% of packets received, 3 bars = 75%, 2 bars = 50%, 1 bar = 25%, X = link lost), and the relative heading of the other aicraft : If you and the other aircraft are going in the exact same direction the relative heading arrow will point up. If your two aircrafts are going opposite directions then the arrow will point down.

- If the marker is a mission waypoint (WP), the markers are numbers 1, 2, 3, etc with an icon before.

## Troubleshooting

- **The ESP32 says "NoFC", it does not see the INAV flight controller**

Check that all 4 wires 5V GND TX RX are connected, and check that the port/UART the ESP32 is connected to is set with MSP enabled and speed is 115200 baud.

- **Conditions before display**

The H marker and/or the A, B, C ... markers will appear on the OSD view only if the position and heading of your aircraft are known. So it needs a valid GPS lock. The home marker will show only when the home point is recorded, so once the flight controller is armed. The home lock is not required to display nearby radar POIs.

Since the 3D markers will only show when the heading of the plane is known, on a flying wing with no compass (no magnetometer) the 3D markers will only appear when the plane is flying/moving, so the GPS can compute the direction.

- **Some characters are missing in the OSD/Hud**

Upload a compatible OSD font with the latest version of the Configurator, from the OSD tab.
