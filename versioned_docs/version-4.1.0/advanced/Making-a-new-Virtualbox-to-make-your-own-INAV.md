---
title: Make a new Virtualbox to make your own INAV
---

[YouTube Video showing the steps below](https://youtu.be/WN0UEmIJLX4)

1. Download and install [VirtualBox](https://www.virtualbox.org/)
1. Download [Anarchy Linux](https://github.com/AnarchyLinux/installer/releases) ISO.  (Anarchy Linux has taken on the mission of Arch Anywhere Linux now that Arch Anywhere linux has ceased)
1. Install Anarchy Linux in a new virtualbox
1. Reboot into your new Virtualbox
1. Install the required packages by running this in terminal: `sudo pacman -S git make gcc arm-none-eabi-gcc arm-none-eabi-newlib`
1. Download a fresh copy of INAV by running this in terminal: `git clone https://github.com/inavflight/inav`
1. Enter INAV folder, clean up previous builds, and build your target: `cd inav; make clean; make TARGET=TARGET_YOU_WANT_TO_MAKE`

And heres a [link](./Features-safe-to-add-and-remove-to-fit-your-needs..md#other-features-that-can-safely-be-removed-or-added) that gives some hints how to tailor INAV for your needs.

It is also now possible to build on OS X using the [cross compiler tools for ARM]
1. If you haven't already, install XCode command line tools and [homebrew](https://brew.sh)
1. Add the ArmMbed Brew tap: `brew tap ArmMbed/homebrew-formulae`
1. Install the cross compilation tools, gcc, git, and make: `brew install arm-none-eabi-gcc git make gcc`
1. Download a fresh copy of INAV by running this in terminal. `git clone https://github.com/inavflight/inav`
1. Enter INAV folder, clean up previous builds, and build your target: `cd inav; make clean; make TARGET=TARGET_YOU_WANT_TO_MAKE`