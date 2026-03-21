---
title: Building Custom Firmware
---

## Rationale

Prebuilt targets may not include the (sensor) hardware you wish to use. If the hardware is already supported in iNav, it is relatively simple to build your own custom firmware. 

For F1 targets (NAZE and friends) we are at the limit of what can be supported with the flash space available. If you want to fly F1 on anything but a very standard and limited set of hardware, it is already necessary to build custom firmware, sometimes for something as simple as a different baro sensor.

This guide attempts to explain the steps necessary to make simple, configuration based changes in order to generate custom firmware. It is **not** a detailed development guide.

## Prerequisite

You need a working development environment. There is [build environment documentation](https://github.com/iNavFlight/inav/tree/master/docs/development) for the major platforms (Linux, MacOS, Windows). This documentation tends to quickly become obsolete as compiler versions evolve (as will this page:). In particular, using contemporary compiler version (e.g. as of June 2017, `arm-none-eabi-gcc` 6.3.\*) is recommended, as a contemporary compiler  will most likely match that being used by iNav developers. For example, the [Building in Ubuntu](https://github.com/iNavFlight/inav/blob/master/docs/development/Building%20in%20Ubuntu.md) document is completely out of date; a modern Linux distribution (Ubuntu or Fedora current release) will provide a contemporary (good) compiler without having to use 3rd party repositories. Arch Linux may provide the opposite problem, its (June 2017) offering `arm-none-eabi-gcc` 7.1.\* creates larger hex files than the 6.3 series, and downgrading may be recommended. If in doubt, please ask on the [RC Groups thread](https://www.rcgroups.com/forums/showthread.php?2495732-Cleanflight-iNav-%28navigation-rewrite%29-project) for advice.

Note that the above version numbers are going to be completely obsolete as you read this article.

### Virtual Machine Environment

A step by step guide to creating a virtual machine as an Inav build environment is described in the wiki  [[Making a new Virtualbox to make your own INAV]]. While the instructions are slanted towards Windows and Virtualbox, they are applicable to any OS and virtualisation engine.

## Target Specific Files

### Overview

For basic configuration changes, the files are found under `src/main/targets`. At the top level this includes a separate directory for each target:
```
src/main/target
├── AIRBOTF4
├── AIRHEROF3
├── ALIENFLIGHTF3
├── ALIENFLIGHTF4
├── ANYFC
├── ANYFCF7
├── ANYFCM7
├── BEEROTORF4
├── BLUEJAYF4
├── CC3D
├── CHEBUZZF3
├── CJMCU
├── COLIBRI
├── COLIBRI_RACE
├── common.h
├── CRAZEPONYMINI
├── EUSTM32F103RC
├── F4BY
├── FALCORE
├── FISHDRONEF4
├── FURYF3
├── KFC32F3_INAV
├── KROOZX
├── link
├── LUX_RACE
├── MOTOLAB
├── NAZE
├── OLIMEXINO
├── OMNIBUS
├── OMNIBUSF4
├── PIKOBLX_limited
├── PIXRACER
├── PORT103R
├── RCEXPLORERF3
├── REVO
├── RMDO
├── SPARKY
├── SPARKY2
├── SPRACINGF3
├── SPRACINGF3EVO
├── SPRACINGF3MINI
├── STM32F3DISCOVERY
├── stm32f7xx_hal_conf.h
├── system_stm32f30x.c
├── system_stm32f30x.h
├── system_stm32f4xx.c
├── system_stm32f4xx.h
├── system_stm32f7xx.c
├── system_stm32f7xx.h
└── YUPIF4
````
Under each target, there will be at least the files we are interested in:
* `target.h` : Defines the supported hardware on this target; and
* `target.mk` : Defines the source files we need to build that target.
 
e.g. in the NAZE target specific directory:

```
├── NAZE
│   ├── AIRHERO32.mk
│   ├── hardware_revision.c
│   ├── hardware_revision.h
│   ├── target.c
│   ├── target.h
│   └── target.mk

```


## Worked Example

This example will consider enabling the BMP085 / BMP180 barometer on the NAZE (for example to use a GY-652 [BMP180 / HMC5983] I2C baro and compass module on an acro Naze or Flip32).

### Use a separate branch

```
$ git checkout -b my_super_special_branch
```

This will isolate your work from the base repo and allow making a pull request if you decide to contribute your changes back to the project.

### target.h

If we examine `src/main/target/NAZE/target.h` we see there are two barometers defined:
````
#define BARO
#define USE_BARO_MS5611 // needed for Flip32 board
#define USE_BARO_BMP280
````
So we can remove one (or both) of these and instead define the use of BMP085 (BMP085 and BMP180 use the same software driver). So even this is not so easy, as you need to know that fact as well. Edit `src/main/target/NAZE/target.h` so the baro definition looks like:

````
#define BARO
//#define USE_BARO_MS5611 // needed for Flip32 board
#define USE_BARO_BMP085
````
Here, the MS5611 is removed (commented out with a double slash), and the BMP280 line is changed to use BMP085. One way to verify names can be to look in other, more well equipped targets; the SPRACINGF3 is sometimes a good place to look, so from `src/main/target/SPRACINGF3/target.h` we can see:
````
#define BARO
#define USE_BARO_MS5611
#define USE_BARO_BMP085
#define USE_BARO_BMP280
````
### target.mk

We're not done yet; we need to edit `target.mk` to tell the compiler which files we need for our bespoke sensor selection. If we look in the `src/main/target/NAZE/target.mk` file we see:
````
TARGET_SRC = \
            drivers/accgyro/accgyro_mpu.c \
            drivers/accgyro/accgyro_mpu6050.c \
            drivers/accgyro/accgyro_mpu6500.c \
            drivers/accgyro/accgyro_spi_mpu6500.c \
            drivers/barometer/barometer_bmp280.c \
            drivers/barometer/barometer_ms56xx.c \
            drivers/compass/compass_hmc5883l.c \
            drivers/flash_m25p16.c \
            drivers/light_ws2811strip.c \
            drivers/light_ws2811strip_stdperiph.c \
            io/flashfs.c \
            hardware_revision.c
````
So we're going to have to replace the barometer source file path; we can either root around the source tree or more easily, just look in some place that we know must use it, like `src/main/target/SPRACINGF3/target.mk` were we see:
````
TARGET_SRC = \
            drivers/accgyro/accgyro_mpu.c \
            drivers/accgyro/accgyro_mpu6050.c \
            drivers/barometer/barometer_bmp085.c \
            drivers/barometer/barometer_bmp280.c \
            drivers/barometer/barometer_ms56xx.c \
            /* and more */
````
So update the relevent part of `src/main/target/NAZE/target.mk`:
````
TARGET_SRC = \
            drivers/accgyro/accgyro_mpu.c \
            drivers/accgyro/accgyro_mpu6050.c \
            drivers/accgyro/accgyro_mpu6500.c \
            drivers/accgyro/accgyro_spi_mpu6500.c \
            drivers/barometer/barometer_bmp085.c \
            drivers/compass/compass_hmc5883l.c \
            drivers/flash_m25p16.c \
            drivers/light_ws2811strip.c \
            drivers/light_ws2811strip_stdperiph.c \
            io/flashfs.c \
            hardware_revision.c
````
Note: It was not really necessary to remove the BMP280 or MS5611 lines; as the defines were removed from `target.h` we would have effectively compiled an empty file.

### Building

So now make the target.
````
$ make TARGET=NAZE
...
Linking NAZE
arm-none-eabi-size ./obj/main/inav_NAZE.elf
   text	   data	    bss	    dec	    hex	filename
 126840	   1244	  17012	 145096	  236c8	./obj/main/inav_NAZE.elf
arm-none-eabi-objcopy -O ihex --set-start 0x8000000 obj/main/inav_NAZE.elf obj/inav_1.7.2_NAZE.hex
````
It fits in the 128K flash. Compare to a 'standard' build (MS5611/BMP280):
````
arm-none-eabi-size ./obj/main/inav_NAZE.elf
   text	   data	    bss	    dec	    hex	filename
 127616	   1244	  17036	 145896	  239e8	./obj/main/inav_NAZE.elf
arm-none-eabi-objcopy -O ihex --set-start 0x8000000 obj/main/inav_NAZE.elf obj/inav_1.7.2_NAZE.hex
````
## Caveats

This solves the original problem (how to build a NAZE target with BMP085/BMP180). 

You can now commit the changes to your branch, otherwise if one wants to update the source tree (e.g.)
````
git pull
````
git will complain that there are uncommitted changes and won't perform the update. There are a number of solutions, some beyond the scope of this simple guide, however the easiest are:

* Commit to your private branch as above; or
* `$ git reset --hard` before pulling ; or
* Stash away the original files and restore them after pulling.

