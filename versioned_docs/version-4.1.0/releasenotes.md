---
title: Release Notes
sidebar_position: 2
---

![INAV Banner](/img/inav_banner.png)

## Hello and welcome to INAV 4.1 "Red Kite"

Please carefully read all of this document for the best possible experience and safety.

<!-- truncate -->

Your contribution from the past month has been very welcome! Thanks!

Tested and suggested hardware can be found [here](./quickstart/Welcome-to-INAV,-useful-links-and-products.md)

## Important notes

> This release is fully supported only with [INAV Configurator 4.1](https://github.com/iNavFlight/inav-configurator/releases). When an older version of Configurator is used, the OSD tab will not work!

## Upgrading from a previous release

### Upgrading from INAV 4.0

1. Use INAV Configurator 4.0 CLI to make a `diff` of the current configuration
2. Store the `diff` output
3. Download INAV Configurator 4.1 and flash INAV 4.1 firmware with `FULL CHIP ERASE`
4. Connect with INAV Configurator and restore the `diff` with the CLI tab

### Upgrading from older versions

Please follow the instructions on [this](./quickstart/Upgrading-from-an-older-version-of-INAV-to-the-current-version.md) page.

## Important changes

1. HDzero OSD canvas mode support
1. SD card support on Kakute H7 flight controllers
1. Improved Matrix filter tracks now 3 gyro noise peaks instead of only 1
1. Lowered Airmode threshold to improve Airmode handling on powerful multirotors
1. Fixed RTH Sanity Checking
1. RTH MAX mode uses RTH Altitude. If not 0, MAX mode will use RTH Altitude as the minimum altitude

### What's Changed

The full list of changes is available [here](https://github.com/iNavFlight/inav/pulls?q=is%3Apr+milestone%3A4.1+is%3Aclosed)

### New Contributors
* @jimsynz made their first contribution in https://github.com/iNavFlight/inav/pull/6981
* @jeffhendrix made their first contribution in https://github.com/iNavFlight/inav/pull/7587
* @serg-2 made their first contribution in https://github.com/iNavFlight/inav/pull/7655
* @geoffsim made their first contribution in https://github.com/iNavFlight/inav/pull/7668