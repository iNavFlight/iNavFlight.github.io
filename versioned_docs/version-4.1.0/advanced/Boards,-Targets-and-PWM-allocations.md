---
title: Inav Boards, Targets and PWM allocations
---

It can be difficult for an aircraft builder to determine if a particular board / target will meet their needs.

In order to offer some guidance, the following list is machine generated from the files under `inav/source/main/target` to provide a list of the options offered by supported boards.

The usage is taken directly from the source code, the following interpretation is offered:

| Symbol | Interpretation |
| ------ | -------------- |
| MC_MOTOR | Multi-rotor motor |
| FW_MOTOR | Fixed wing motor |
| MC_SERVO | Multi-rotor servo |
| FW_SERVO | Fixed wing servo |
| LED      | LED strip  |
| PWM, ANY | Some other PWM function |

*List generated 2022-01-30 from the [inav master branch](https://github.com/iNavFlight/inav/) by [`parse_targets.rb`](http://seyrsnys.myzen.co.uk/parse_targets.rb). Some targets may not be available in official or prior releases.* **E&OE.**

You are strongly advised to check the board documentation as to the suitability of any particular board.

The configurations listed above are those supported by the inav developers; other configurations may be possible with a custom target. The source tree contains other, unofficial targets that may (or not) work. A full report, including non-release targets may be generated with `parse_targets.rb --all`.

Note also that due to the complexity of output options available in inav, dynamic resource allocation is not available. Paweł Spychalski has published a [video](https://www.youtube.com/watch?v=v4R-pnO4srU) explaining why resource allocation is not supported by inav; [see also #1154](https://github.com/iNavFlight/inav/issues/1145)

## Board: AIKONF4

Board is not DSHOT enabled.

### Target: AIKONF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 6 | MC_MOTOR, MC_SERVO, FW_MOTOR |

## Board: AIRBOTF4

Board is DSHOT enabled.

### Target: AIRBOTF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO, ANY |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | PWM, FW_SERVO |
| 8 | PWM, FW_SERVO |
| 9 | PWM, FW_SERVO |
| 10 | PWM, FW_SERVO |

## Board: AIRBOTF7

Board is DSHOT enabled.

### Target: AIRBOTF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

### Target: OMNIBUSF7NANOV7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

## Board: ALIENFLIGHTNGF7

Board is not DSHOT enabled.

### Target: ALIENFLIGHTNGF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_SERVO |
| 2 | MC_SERVO |
| 3 | MC_SERVO |
| 4 | MC_SERVO |
| 5 | MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_MOTOR, FW_SERVO |
| 10 | MC_MOTOR, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |

## Board: ANYFC

Board is not DSHOT enabled.

### Target: ANYFC

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_MOTOR, FW_SERVO |
| 10 | MC_MOTOR, FW_SERVO |

## Board: ANYFCF7

Board is not DSHOT enabled.

### Target: ANYFCF7

| PWM | Usage |
| --- | ----- |
| 1 | PWM, MC_SERVO |
| 2 | PWM, MC_SERVO |
| 3 | PWM, MC_SERVO |
| 4 | PWM, MC_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_MOTOR |
| 9 | MC_MOTOR, FW_MOTOR |
| 10 | MC_MOTOR, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |
| 13 | MC_MOTOR, FW_SERVO, LED |
| 14 | MC_MOTOR, FW_SERVO |

### Target: ANYFCF7_EXTERNAL_BARO

| PWM | Usage |
| --- | ----- |
| 1 | PWM, MC_SERVO |
| 2 | PWM, MC_SERVO |
| 3 | PWM, MC_SERVO |
| 4 | PWM, MC_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_MOTOR |
| 9 | MC_MOTOR, FW_MOTOR |
| 10 | MC_MOTOR, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |
| 13 | MC_MOTOR, FW_SERVO, LED |
| 14 | MC_MOTOR, FW_SERVO |

## Board: ASGARD32F4

Board is DSHOT enabled.

### Target: ASGARD32F4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

## Board: ASGARD32F7

Board is DSHOT enabled.

### Target: ASGARD32F7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

## Board: BEEROTORF4

Board is not DSHOT enabled.

### Target: BEEROTORF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 8 | MC_MOTOR, MC_SERVO, FW_SERVO |

## Board: BETAFLIGHTF4

Board is DSHOT enabled.

### Target: BETAFLIGHTF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: BETAFPVF722

Board is DSHOT enabled.

### Target: BETAFPVF722

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |
| 5 | MC_MOTOR |
| 6 | MC_MOTOR |

## Board: BLUEJAYF4

Board is not DSHOT enabled.

### Target: BLUEJAYF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, LED |
| 6 | MC_MOTOR, FW_SERVO |

## Board: CLRACINGF4AIR

Board is not DSHOT enabled.

### Target: CLRACINGF4AIR

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

### Target: CLRACINGF4AIRV2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_SERVO |

### Target: CLRACINGF4AIRV3

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_SERVO |

## Board: COLIBRI

Board is not DSHOT enabled.

### Target: COLIBRI

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 8 | MC_MOTOR, MC_SERVO, FW_MOTOR |

### Target: QUANTON

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 8 | MC_MOTOR, MC_SERVO, FW_MOTOR |

## Board: DALRCF405

Board is DSHOT enabled.

### Target: DALRCF405

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_MOTOR |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: DALRCF722DUAL

Board is DSHOT enabled.

### Target: DALRCF722DUAL

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_SERVO |

## Board: F4BY

Board is not DSHOT enabled.

### Target: F4BY

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: FF_F35_LIGHTNING

Board is DSHOT enabled.

### Target: FF_F35_LIGHTNING

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

### Target: WINGFC

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FF_FORTINIF4

Board is not DSHOT enabled.

### Target: FF_FORTINIF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: FF_PIKOF4

Board is not DSHOT enabled.

### Target: FF_PIKOF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: FF_PIKOF4OSD

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FIREWORKSV2

Board is DSHOT enabled.

### Target: FIREWORKSV2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | FW_MOTOR |
| 3 | MC_MOTOR |
| 4 | FW_MOTOR |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

### Target: OMNIBUSF4V6

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | FW_MOTOR |
| 3 | MC_MOTOR |
| 4 | FW_MOTOR |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: FLYWOOF411

Board is DSHOT enabled.

### Target: FLYWOOF411

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |

### Target: FLYWOOF411_V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: FLYWOOF745

Board is DSHOT enabled.

### Target: FLYWOOF745

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 7 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 8 | MC_MOTOR, FW_SERVO, MC_SERVO |

### Target: FLYWOOF745NANO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 7 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 8 | MC_MOTOR, FW_SERVO, MC_SERVO |

## Board: FLYWOOF7DUAL

Board is DSHOT enabled.

### Target: FLYWOOF7DUAL

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FOXEERF405

Board is DSHOT enabled.

### Target: FOXEERF405

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FOXEERF722DUAL

Board is DSHOT enabled.

### Target: FOXEERF722DUAL

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

### Target: FOXEERF722V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FOXEERF745AIO

Board is DSHOT enabled.

### Target: FOXEERF745AIO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

## Board: FRSKYF4

Board is not DSHOT enabled.

### Target: FRSKYF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

## Board: FRSKYPILOT

Board is DSHOT enabled.

### Target: FRSKYPILOT

| PWM | Usage |
| --- | ----- |
| 1 | MC_SERVO, FW_MOTOR |
| 2 | MC_SERVO, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_MOTOR, FW_SERVO |
| 10 | MC_MOTOR, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |

### Target: FRSKYPILOT_LED

| PWM | Usage |
| --- | ----- |
| 1 | MC_SERVO, FW_MOTOR |
| 2 | MC_SERVO, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_MOTOR, FW_SERVO |

## Board: FRSKY_ROVERF7

Board is DSHOT enabled.

### Target: FRSKY_ROVERF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_SERVO |
| 5 | MC_SERVO |

## Board: FURYF4OSD

Board is DSHOT enabled.

### Target: FURYF4OSD

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |

### Target: MAMBAF405

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |

## Board: HGLRCF722

Board is DSHOT enabled.

### Target: HGLRCF722

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 8 | MC_MOTOR, MC_SERVO, FW_MOTOR |

## Board: IFLIGHTF4_SUCCEXD

Board is DSHOT enabled.

### Target: IFLIGHTF4_SUCCEXD

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

## Board: IFLIGHTF4_TWING

Board is not DSHOT enabled.

### Target: IFLIGHTF4_TWING

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: IFLIGHTF7_TWING

Board is DSHOT enabled.

### Target: IFLIGHTF7_TWING

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR, MC_SERVO |
| 6 | MC_MOTOR, FW_MOTOR, MC_SERVO |
| 7 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 8 | MC_MOTOR, FW_SERVO, MC_SERVO |

## Board: IFLIGHT_BLITZ_F722

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_F722

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: KAKUTEF4

Board is DSHOT enabled.

### Target: KAKUTEF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |

### Target: KAKUTEF4V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, MC_SERVO, FW_SERVO |

## Board: KAKUTEF7

Board is DSHOT enabled.

### Target: KAKUTEF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO, MC_SERVO |

### Target: KAKUTEF7HDV

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO, MC_SERVO |

### Target: KAKUTEF7MINI

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO, MC_SERVO |
| 6 | MC_MOTOR, FW_SERVO, MC_SERVO |

## Board: KAKUTEF7MINIV3

Board is DSHOT enabled.

### Target: KAKUTEF7MINIV3

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_MOTOR |
| 4 | MC_MOTOR, FW_MOTOR |
| 5 | MC_SERVO, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |

## Board: KAKUTEH7

Board is DSHOT enabled.

### Target: KAKUTEH7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: MAMBAF405US

Board is DSHOT enabled.

### Target: MAMBAF405US

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: MAMBAF405US_I2C

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: MAMBAF722

Board is DSHOT enabled.

### Target: MAMBAF722

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: MAMBAF722_I2C

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: MAMBAH743

Board is DSHOT enabled.

### Target: MAMBAH743

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_MOTOR |
| 8 | MC_MOTOR, FW_MOTOR |

## Board: MATEKF405

Board is DSHOT enabled.

### Target: MATEKF405

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, LED |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |

### Target: MATEKF405_SERVOS6

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, LED |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |

### Target: MATEKF405OSD

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, LED |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |

## Board: MATEKF405CAN

Board is DSHOT enabled.

### Target: MATEKF405CAN

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_MOTOR |
| 8 | MC_MOTOR, FW_MOTOR |

## Board: MATEKF405SE

Board is DSHOT enabled.

### Target: MATEKF405SE

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |
| 8 | MC_SERVO, FW_SERVO |
| 9 | MC_SERVO, FW_SERVO |

## Board: MATEKF411

Board is DSHOT enabled.

### Target: MATEKF411

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_SERVO, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

### Target: MATEKF411_FD_SFTSRL

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_SERVO, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

### Target: MATEKF411_RSSI

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_SERVO, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

### Target: MATEKF411_SFTSRL2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_SERVO, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

## Board: MATEKF411SE

Board is DSHOT enabled.

### Target: MATEKF411SE

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |

### Target: MATEKF411SE_PINIO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |

### Target: MATEKF411SE_FD_SFTSRL1

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_SERVO, FW_SERVO |

### Target: MATEKF411SE_SS2_CH6

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |

## Board: MATEKF722

Board is DSHOT enabled.

### Target: MATEKF722

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

### Target: MATEKF722_HEXSERVO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |

## Board: MATEKF722PX

Board is DSHOT enabled.

### Target: MATEKF722PX

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_SERVO, FW_SERVO |
| 10 | MC_SERVO, FW_SERVO |

### Target: MATEKF722WPX

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_SERVO, FW_SERVO |
| 10 | MC_SERVO, FW_SERVO |

## Board: MATEKF722SE

Board is DSHOT enabled.

### Target: MATEKF722SE

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_MOTOR |
| 8 | MC_SERVO, FW_MOTOR |

### Target: MATEKF722MINI

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_MOTOR |
| 8 | MC_SERVO, FW_MOTOR |

### Target: MATEKF722SE_8MOTOR

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

## Board: MATEKF765

Board is DSHOT enabled.

### Target: MATEKF765

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |
| 8 | MC_SERVO, FW_SERVO |
| 9 | MC_SERVO, FW_SERVO |
| 10 | MC_SERVO, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |

### Target: MATEKF765SE

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_SERVO |
| 8 | MC_SERVO, FW_SERVO |
| 9 | MC_SERVO, FW_SERVO |
| 10 | MC_SERVO, FW_SERVO |
| 11 | MC_MOTOR, FW_SERVO |
| 12 | MC_MOTOR, FW_SERVO |

## Board: MATEKH743

Board is DSHOT enabled.

### Target: MATEKH743

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | MC_MOTOR, FW_SERVO |
| 10 | MC_MOTOR, FW_SERVO |
| 11 | MC_SERVO, FW_SERVO |
| 12 | MC_SERVO, FW_SERVO |

## Board: NOX

Board is not DSHOT enabled.

### Target: NOX

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: DYSF4PRO

Board is DSHOT enabled.

### Target: DYSF4PRO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO, LED |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: DYSF4PROV2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO, LED |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: OMNIBUSF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO, LED |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: OMNIBUSF4PRO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: OMNIBUSF4PRO_LEDSTRIPM5

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: OMNIBUSF4V3_S5_S6_2SS

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: OMNIBUSF4V3_S5S6_SS

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: OMNIBUSF4V3_S6_SS

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: OMNIBUSF4V3

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

## Board: OMNIBUSF7

Board is DSHOT enabled.

### Target: OMNIBUSF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

### Target: OMNIBUSF7V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |

## Board: OMNIBUSF7NXT

Board is DSHOT enabled.

### Target: OMNIBUSF7NXT

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_MOTOR |

## Board: PIXRACER

Board is not DSHOT enabled.

### Target: PIXRACER

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_MOTOR |
| 6 | MC_MOTOR, FW_MOTOR |

## Board: REVO

Board is DSHOT enabled.

### Target: REVO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO, ANY |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | PWM, FW_SERVO |
| 8 | PWM, FW_SERVO |
| 9 | PWM, FW_SERVO |
| 10 | PWM, FW_SERVO |

## Board: SKYSTARSF405HD

Board is DSHOT enabled.

### Target: SKYSTARSF405HD

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |

## Board: SPARKY2

Board is not DSHOT enabled.

### Target: SPARKY2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |

## Board: SPEEDYBEEF4

Board is DSHOT enabled.

### Target: SPEEDYBEEF4

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: SPEEDYBEEF4_SFTSRL1

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_SERVO |

### Target: SPEEDYBEEF4_SFTSRL2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_SERVO |

## Board: SPEEDYBEEF7

Board is DSHOT enabled.

### Target: SPEEDYBEEF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | LED, MC_MOTOR, FW_SERVO |

## Board: SPEEDYBEEF7MINI

Board is DSHOT enabled.

### Target: SPEEDYBEEF7MINI

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_SERVO, FW_MOTOR |
| 8 | MC_SERVO, FW_MOTOR |

## Board: SPEEDYBEEF7V2

Board is DSHOT enabled.

### Target: SPEEDYBEEF7V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_MOTOR |

## Board: SPRACINGF4EVO

Board is not DSHOT enabled.

### Target: SPRACINGF4EVO

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_SERVO |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, MC_SERVO, FW_MOTOR |
| 8 | MC_MOTOR, MC_SERVO, FW_MOTOR |

## Board: SPRACINGF7DUAL

Board is DSHOT enabled.

### Target: SPRACINGF7DUAL

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |
| 5 | MC_MOTOR |
| 6 | MC_MOTOR |
| 7 | MC_MOTOR |
| 8 | MC_MOTOR |
| 9 | MC_MOTOR |
| 10 | MC_MOTOR |
| 11 | FW_SERVO, PWM |
| 12 | FW_SERVO, PWM |

## Board: TMOTORF7V2

Board is DSHOT enabled.

### Target: TMOTORF7V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_MOTOR |
| 4 | MC_MOTOR, FW_MOTOR |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |
| 9 | PWM, FW_SERVO |

## Board: YUPIF7

Board is DSHOT enabled.

### Target: YUPIF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_SERVO |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, MC_SERVO, FW_SERVO |
| 6 | MC_MOTOR, MC_SERVO, FW_SERVO, LED |

## Board: ZEEZF7

Board is DSHOT enabled.

### Target: ZEEZF7

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR |
| 2 | MC_MOTOR |
| 3 | MC_MOTOR |
| 4 | MC_MOTOR |

### Target: ZEEZF7V2

| PWM | Usage |
| --- | ----- |
| 1 | MC_MOTOR, FW_MOTOR |
| 2 | MC_MOTOR, FW_MOTOR |
| 3 | MC_MOTOR, FW_SERVO |
| 4 | MC_MOTOR, FW_SERVO |
| 5 | MC_MOTOR, FW_SERVO |
| 6 | MC_MOTOR, FW_SERVO |
| 7 | MC_MOTOR, FW_SERVO |
| 8 | MC_MOTOR, FW_SERVO |

