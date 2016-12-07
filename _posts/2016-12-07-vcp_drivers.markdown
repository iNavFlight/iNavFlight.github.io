---
layout: post
title:  "STM32 VirtualComPort driver for Windows"
date:   2016-12-07
categories: [tips]
---

*Virtual Com Port*, VCP to method of choice for almost all recent flight controllers to connect to PCs. No more onboard USB-to-UART converters like CP2102. SMT32 can work as USB device too after all… But for this, Windows users will require dedicated driver.

I have no idea why STMicroelectronics made it so hard do download and use STM32 VCP driver for Windows so hard. You have to register, confirm and then you can download, install package and look for the driver on HDD... Why, oh why...

So, to fix this issue, here it is: STM VCP driver for Windows as a zip, [ready for download](/assets/2016-12-07/STM32_vcp_driver.zip). Just unzip.

[Original article](https://quadmeup.com/stm32-virtualcomport-driver-for-windows/) by *Dziku*.