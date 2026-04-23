---
title: "Boards, Targets and PWM Allocations"
---

# INAV Boards, Targets and PWM allocations

It can be difficult for an aircraft builder to determine if a particular board / target will meet their needs.

In order to offer some guidance, the following list is machine generated from the files under `inav/source/main/target` to provide a list of the options offered by supported boards.

The usage is taken directly from the source code, the following interpretation is offered:

| Symbol | Interpretation |
| ------ | -------------- |
| AUTO | Automatic motor / servo allocation |
| MOTOR | Motor |
| SERVO | Servo |
| LED      | LED strip  |
| PWM, ANY | Some other PWM function |

`AUTO` is used by INAV 7.0 and later. Hardware timer number is shown againt each `AUTO` line; a common function (`MOTOR`, `SERVO`) may be assigned by the user for a particular timer number.

`MOTOR`, `SERVO` are shown against a small number of boards where specific allocation is needed.

Prior to INAV 7.0 `MC_`, `FW_` prefixes were shown against motors and servos.

Note that the following tables only document PWM outputs that have at least a MOTOR or SERVO use. PWM outputs _solely_ supporting other (LED, PWM, ANY)functions are not listed; for those see the manufacter's documentation (or `target.c`).

See project [Cli](https://github.com/iNavFlight/inav/blob/master/docs/Cli.md) and [ESC and servo outputs](https://github.com/iNavFlight/inav/blob/master/docs/ESC%20and%20servo%20outputs.md) documentation.

*List generated 2024-11-18 from the [INAV 8.0.0-RC1 branch](https://github.com/iNavFlight/inav/) by [`parse_targets.rb`](/img/content/parse_targets.rb). Some targets may not be available in official or prior releases.* **E&OE.**

You are strongly advised to check the board documentation as to the suitability of any particular board.

In particular, even though a board is marked as 'DSHOT enabled', there is no guarantee that DSHOT will be available on an arbitrary output as its timer may not have DMA enabled.

The configurations listed above are those supported by the INAV developers; other configurations may be possible with a custom target. The source tree contains other, unofficial targets that may (or not) work. A full report, including non-release targets may be generated with `parse_targets.rb --all`.

Note also that due to the complexity of output options available in INAV, dynamic resource allocation is not available. Paweł Spychalski has published a [video](https://www.youtube.com/watch?v=v4R-pnO4srU) explaining why resource allocation is not supported by INAV; [see also #1154](https://github.com/iNavFlight/inav/issues/1145)

## Board: AIRBOTF4

Board is DSHOT enabled.

### Target: AIRBOTF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5, ANY |
| 6 | AUTO TIMER 1 |

## Board: ANYFCF7

Board is not DSHOT enabled.

### Target: ANYFCF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 5 |
| 9 | AUTO TIMER 5 |
| 10 | AUTO TIMER 9 |
| 11 | AUTO TIMER 3 |
| 12 | AUTO TIMER 5 |
| 13 | AUTO TIMER 2, LED |
| 14 | AUTO TIMER 3 |

### Target: ANYFCF7_EXTERNAL_BARO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 5 |
| 9 | AUTO TIMER 5 |
| 10 | AUTO TIMER 9 |
| 11 | AUTO TIMER 3 |
| 12 | AUTO TIMER 5 |
| 13 | AUTO TIMER 2, LED |
| 14 | AUTO TIMER 3 |

## Board: AOCODARCF405AIO

Board is DSHOT enabled.

### Target: AOCODARCF405AIO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |

## Board: AOCODARCF4V2

Board is DSHOT enabled.

### Target: AOCODARCF4V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: AOCODARCF4V3_SD

Board is DSHOT enabled.

### Target: AOCODARCF4V3_SD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

### Target: AOCODARCF4V3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: AOCODARCF722AIO

Board is DSHOT enabled.

### Target: AOCODARCF722AIO

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

## Board: AOCODARCF7DUAL

Board is DSHOT enabled.

### Target: AOCODARCF7DUAL

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: AOCODARCF7MINI_V1

Board is DSHOT enabled.

### Target: AOCODARCF7MINI_V1

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 4 |

### Target: AOCODARCF7MINI_V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: AOCODARCH7DUAL

Board is DSHOT enabled.

### Target: AOCODARCH7DUAL

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 5 |
| 8 | AUTO TIMER 5 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: ATOMRCF405NAVI

Board is DSHOT enabled.

### Target: ATOMRCF405NAVI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 3 |

## Board: ATOMRCF405NAVI_DELUX

Board is DSHOT enabled.

### Target: ATOMRCF405NAVI_DELUX

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 8 |
| 9 | AUTO TIMER 8 |
| 10 | AUTO TIMER 8 |
| 11 | AUTO TIMER 1 |

## Board: AXISFLYINGF7PRO

Board is DSHOT enabled.

### Target: AXISFLYINGF7PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: BEEROTORF4

Board is not DSHOT enabled.

### Target: BEEROTORF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 4 |

## Board: BETAFLIGHTF4

Board is DSHOT enabled.

### Target: BETAFLIGHTF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |

## Board: BETAFPVF722

Board is DSHOT enabled.

### Target: BETAFPVF722

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: BLACKPILL_F411_OSD

Board is DSHOT enabled.

### Target: BLACKPILL_F411_OSD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 4 |

### Target: BLACKPILL_F411_BLACKBOX

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 4 |

## Board: DAKEFPVF405

Board is DSHOT enabled.

### Target: DAKEFPVF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: DAKEFPVF722

Board is DSHOT enabled.

### Target: DAKEFPVF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: DALRCF405

Board is DSHOT enabled.

### Target: DALRCF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: DALRCF722DUAL

Board is DSHOT enabled.

### Target: DALRCF722DUAL

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 1 |

## Board: FF_F35_LIGHTNING

Board is DSHOT enabled.

### Target: FF_F35_LIGHTNING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

### Target: WINGFC

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: FIREWORKSV2

Board is DSHOT enabled.

### Target: FIREWORKSV2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

### Target: OMNIBUSF4V6

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: FLASHHOBBYF405

Board is DSHOT enabled.

### Target: FLASHHOBBYF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: FLASHHOBBYF722

Board is DSHOT enabled.

### Target: FLASHHOBBYF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: FLYCOLORF7MINI

Board is DSHOT enabled.

### Target: FLYCOLORF7MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: FLYCOLORF7V2

Board is DSHOT enabled.

### Target: FLYCOLORF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: FLYWOOF405PRO

Board is DSHOT enabled.

### Target: FLYWOOF405PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 8 |

### Target: FLYWOOF405HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 8 |

## Board: FLYWOOF722PRO

Board is DSHOT enabled.

### Target: FLYWOOF722PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: FLYWOOF745

Board is DSHOT enabled.

### Target: FLYWOOF745

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

### Target: FLYWOOF745NANO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: FLYWOOF7DUAL

Board is DSHOT enabled.

### Target: FLYWOOF7DUAL

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: FLYWOOH743PRO

Board is DSHOT enabled.

### Target: FLYWOOH743PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: FOXEERF405

Board is DSHOT enabled.

### Target: FOXEERF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: FOXEERF722DUAL

Board is DSHOT enabled.

### Target: FOXEERF722DUAL

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

### Target: FOXEERF722V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: FOXEERF722V4

Board is DSHOT enabled.

### Target: FOXEERF722V4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |

### Target: FOXEERF722V4_X8

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: FOXEERF745AIO

Board is DSHOT enabled.

### Target: FOXEERF745AIO

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

### Target: FOXEERF745AIO_V3

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

## Board: FOXEERH743

Board is DSHOT enabled.

### Target: FOXEERH743

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |
| 9 | AUTO TIMER 15 |
| 10 | AUTO TIMER 15 |

## Board: FRSKYPILOT

Board is DSHOT enabled.

### Target: FRSKYPILOT

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 2 |
| 11 | AUTO TIMER 2 |
| 12 | AUTO TIMER 2 |

### Target: FRSKYPILOT_LED

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 2 |
| 11 | AUTO TIMER 2 |
| 12 | AUTO TIMER 2 |

## Board: FURYF4OSD

Board is DSHOT enabled.

### Target: FURYF4OSD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 2 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |

### Target: MAMBAF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 2 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |

## Board: GEPRCF405

Board is DSHOT enabled.

### Target: GEPRCF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 3 |

## Board: GEPRCF405_BT_HD

Board is DSHOT enabled.

### Target: GEPRCF405_BT_HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: GEPRCF722

Board is DSHOT enabled.

### Target: GEPRCF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: GEPRCF722_BT_HD

Board is DSHOT enabled.

### Target: GEPRCF722_BT_HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: GEPRCF745_BT_HD

Board is DSHOT enabled.

### Target: GEPRCF745_BT_HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: GEPRC_F722_AIO

Board is DSHOT enabled.

### Target: GEPRC_F722_AIO

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

### Target: GEPRC_F722_AIO_UART3

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

## Board: HAKRCF405D

Board is DSHOT enabled.

### Target: HAKRCF405D

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |

## Board: HAKRCF405V2

Board is DSHOT enabled.

### Target: HAKRCF405V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: HAKRCF722V2

Board is DSHOT enabled.

### Target: HAKRCF722V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 1 |
| 8 | AUTO TIMER 3 |

## Board: HAKRCKD722

Board is DSHOT enabled.

### Target: HAKRCKD722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: HGLRCF722

Board is DSHOT enabled.

### Target: HGLRCF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: IFLIGHTF7_TWING

Board is DSHOT enabled.

### Target: IFLIGHTF7_TWING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: IFLIGHT_2RAW_H743

Board is DSHOT enabled.

### Target: IFLIGHT_2RAW_H743

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: IFLIGHT_BLITZ_ATF435

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_ATF435

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: IFLIGHT_BLITZ_F722

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_F722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: IFLIGHT_BLITZ_F722_X1

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_F722_X1

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

### Target: IFLIGHT_BLITZ_F722_X1_OSD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: IFLIGHT_BLITZ_F7_PRO

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_F7_PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: IFLIGHT_BLITZ_H7_PRO

Board is DSHOT enabled.

### Target: IFLIGHT_BLITZ_H7_PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

### Target: IFLIGHT_BLITZ_H7_WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: IFLIGHT_JBF7PRO

Board is DSHOT enabled.

### Target: IFLIGHT_JBF7PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |

## Board: JHEMCUF405

Board is DSHOT enabled.

### Target: JHEMCUF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: JHEMCUF405WING

Board is DSHOT enabled.

### Target: JHEMCUF405WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 2 |
| 10 | AUTO TIMER 2 |
| 11 | AUTO TIMER 12 |

## Board: JHEMCUF722

Board is DSHOT enabled.

### Target: JHEMCUF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: JHEMCUF745

Board is DSHOT enabled.

### Target: JHEMCUF745

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: JHEMCUH743HD

Board is DSHOT enabled.

### Target: JHEMCUH743HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 5 |
| 2 | AUTO TIMER 5 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: KAKUTEF4

Board is DSHOT enabled.

### Target: KAKUTEF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 8 |

### Target: KAKUTEF4V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 5 |

### Target: KAKUTEF4V23

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

### Target: KAKUTEF4V24

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: KAKUTEF4WING

Board is DSHOT enabled.

### Target: KAKUTEF4WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: KAKUTEF7

Board is DSHOT enabled.

### Target: KAKUTEF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |

### Target: KAKUTEF7HDV

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |

### Target: KAKUTEF7MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 5 |

## Board: KAKUTEF7MINIV3

Board is DSHOT enabled.

### Target: KAKUTEF7MINIV3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: KAKUTEH7

Board is DSHOT enabled.

### Target: KAKUTEH7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

### Target: KAKUTEH7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

### Target: KAKUTEH7MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: KAKUTEH7WING

Board is DSHOT enabled.

### Target: KAKUTEH7WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 5 |
| 8 | AUTO TIMER 5 |
| 9 | AUTO TIMER 15 |
| 10 | AUTO TIMER 15 |
| 11 | AUTO TIMER 3 |
| 12 | AUTO TIMER 3 |
| 13 | AUTO TIMER 3 |

## Board: MAMBAF405US

Board is DSHOT enabled.

### Target: MAMBAF405US

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |

### Target: MAMBAF405US_I2C

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |

## Board: MAMBAF405_2022A

Board is DSHOT enabled.

### Target: MAMBAF405_2022A

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

### Target: MAMBAF405_2022B

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: MAMBAF722

Board is DSHOT enabled.

### Target: MAMBAF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |

### Target: MAMBAF722_I2C

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |

## Board: MAMBAF722_2022A

Board is DSHOT enabled.

### Target: MAMBAF722_2022A

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 1 |
| 8 | AUTO TIMER 3 |

### Target: MAMBAF722_2022B

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 1 |
| 8 | AUTO TIMER 3 |

## Board: MAMBAF722_WING

Board is DSHOT enabled.

### Target: MAMBAF722_WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 1 |
| 8 | AUTO TIMER 3 |

## Board: MAMBAF722_X8

Board is DSHOT enabled.

### Target: MAMBAF722_X8

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 1 |
| 8 | AUTO TIMER 3 |

## Board: MAMBAH743

Board is DSHOT enabled.

### Target: MAMBAH743

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 5 |
| 2 | AUTO TIMER 5 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

### Target: MAMBAH743_2022B

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 5 |
| 2 | AUTO TIMER 5 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

### Target: MAMBAH743_2022B_GYRO2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 5 |
| 2 | AUTO TIMER 5 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: MATEKF405

Board is DSHOT enabled.

### Target: MATEKF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

### Target: MATEKF405OSD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

## Board: MATEKF405CAN

Board is DSHOT enabled.

### Target: MATEKF405CAN

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: MATEKF405SE

Board is DSHOT enabled.

### Target: MATEKF405SE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 12 |
| 8 | AUTO TIMER 12 |
| 9 | AUTO TIMER 1 |

### Target: MATEKF405SE_PINIO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 12 |
| 8 | AUTO TIMER 12 |
| 9 | AUTO TIMER 1 |

## Board: MATEKF405TE

Board is DSHOT enabled.

### Target: MATEKF405TE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 12 |
| 10 | AUTO TIMER 13 |
| 11 | AUTO TIMER 4 |

### Target: MATEKF405TE_SD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 12 |
| 10 | AUTO TIMER 13 |
| 11 | AUTO TIMER 4 |

## Board: MATEKF722

Board is DSHOT enabled.

### Target: MATEKF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

## Board: MATEKF722PX

Board is DSHOT enabled.

### Target: MATEKF722PX

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

### Target: MATEKF722PX_PINIO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

### Target: MATEKF722WPX

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

## Board: MATEKF722SE

Board is DSHOT enabled.

### Target: MATEKF722SE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

### Target: MATEKF722MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: MATEKF765

Board is DSHOT enabled.

### Target: MATEKF765

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 2 |
| 2 | AUTO TIMER 2 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 9 |
| 12 | AUTO TIMER 9 |

### Target: MATEKF765SE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 2 |
| 2 | AUTO TIMER 2 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 9 |
| 12 | AUTO TIMER 9 |

## Board: MATEKH743

Board is DSHOT enabled.

### Target: MATEKH743

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

### Target: MATEKH743HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: MICOAIR405MINI

Board is DSHOT enabled.

### Target: MICOAIR405MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 12 |

## Board: MICOAIR405V2

Board is DSHOT enabled.

### Target: MICOAIR405V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 12 |
| 10 | AUTO TIMER 12 |

## Board: MICOAIR743

Board is DSHOT enabled.

### Target: MICOAIR743

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

### Target: MICOAIR743_EXTMAG

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

## Board: NEUTRONRCF435MINI

Board is DSHOT enabled.

### Target: NEUTRONRCF435MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 3 |

## Board: NEUTRONRCF435SE

Board is DSHOT enabled.

### Target: NEUTRONRCF435SE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: NEUTRONRCF435WING

Board is DSHOT enabled.

### Target: NEUTRONRCF435WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 2 |

## Board: NEUTRONRCH7BT

Board is DSHOT enabled.

### Target: NEUTRONRCH7BT

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: DYSF4PRO

Board is DSHOT enabled.

### Target: DYSF4PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 1 |

### Target: DYSF4PROV2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 1 |

### Target: OMNIBUSF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 1 |

### Target: OMNIBUSF4PRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 1 |

### Target: OMNIBUSF4V3_S5_S6_2SS

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |

### Target: OMNIBUSF4V3_S5S6_SS

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |

### Target: OMNIBUSF4V3_S6_SS

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |

### Target: OMNIBUSF4V3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 1 |

## Board: OMNIBUSF7

Board is DSHOT enabled.

### Target: OMNIBUSF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |

### Target: OMNIBUSF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |

## Board: OMNIBUSF7NXT

Board is DSHOT enabled.

### Target: OMNIBUSF7NXT

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |

## Board: PIXRACER

Board is not DSHOT enabled.

### Target: PIXRACER

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 1 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: PRINCIPIOTF7

Board is DSHOT enabled.

### Target: PRINCIPIOTF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 1 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |

## Board: REVO

Board is DSHOT enabled.

### Target: REVO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5, ANY |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |
| 9 | AUTO TIMER 8 |
| 10 | AUTO TIMER 8 |

## Board: RUSH_BLADE_F7

Board is DSHOT enabled.

### Target: RUSH_BLADE_F7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

### Target: RUSH_BLADE_F7_HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: SAGEATF4

Board is DSHOT enabled.

### Target: SAGEATF4

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: SDMODELH7V1

Board is DSHOT enabled.

### Target: SDMODELH7V1

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 2 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: SKYSTARSF405HD

Board is DSHOT enabled.

### Target: SKYSTARSF405HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |

### Target: SKYSTARSF405HD2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |

## Board: SKYSTARSF722HD

Board is DSHOT enabled.

### Target: SKYSTARSF722HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |

### Target: SKYSTARSF722HDPRO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |

### Target: SKYSTARSF722MINIHD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |

## Board: SKYSTARSH743HD

Board is DSHOT enabled.

### Target: SKYSTARSH743HD

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 5 |
| 8 | AUTO TIMER 5 |

## Board: SPEDIXF405

Board is DSHOT enabled.

### Target: SPEDIXF405

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: SPEDIXF722

Board is DSHOT enabled.

### Target: SPEDIXF722

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: SPEEDYBEEF4

Board is DSHOT enabled.

### Target: SPEEDYBEEF4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

### Target: SPEEDYBEEF4_SFTSRL1

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

### Target: SPEEDYBEEF4_SFTSRL2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 1 |
| 7 | AUTO TIMER 4 |

## Board: SPEEDYBEEF405MINI

Board is DSHOT enabled.

### Target: SPEEDYBEEF405MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |

## Board: SPEEDYBEEF405V3

Board is DSHOT enabled.

### Target: SPEEDYBEEF405V3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 3 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |
| 9 | AUTO TIMER 1 |

## Board: SPEEDYBEEF405V4

Board is DSHOT enabled.

### Target: SPEEDYBEEF405V4

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 2 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 12 |
| 10 | AUTO TIMER 12 |

## Board: SPEEDYBEEF405WING

Board is DSHOT enabled.

### Target: SPEEDYBEEF405WING

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 2 |
| 9 | AUTO TIMER 2 |
| 10 | AUTO TIMER 2 |
| 11 | AUTO TIMER 12 |

## Board: SPEEDYBEEF7

Board is DSHOT enabled.

### Target: SPEEDYBEEF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 1 |
| 6 | LED, AUTO TIMER 4 |

## Board: SPEEDYBEEF745AIO

Board is DSHOT enabled.

### Target: SPEEDYBEEF745AIO

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |

## Board: SPEEDYBEEF7MINI

Board is DSHOT enabled.

### Target: SPEEDYBEEF7MINI

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

### Target: SPEEDYBEEF7MINIV2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: SPEEDYBEEF7V2

Board is DSHOT enabled.

### Target: SPEEDYBEEF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 1 |
| 2 | AUTO TIMER 1 |
| 3 | AUTO TIMER 1 |
| 4 | AUTO TIMER 3 |

## Board: SPEEDYBEEF7V3

Board is DSHOT enabled.

### Target: SPEEDYBEEF7V3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 2 |
| 2 | AUTO TIMER 2 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 4 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 3 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: SPRACINGF4EVO

Board is not DSHOT enabled.

### Target: SPRACINGF4EVO

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 8 |
| 2 | AUTO TIMER 8 |
| 3 | AUTO TIMER 8 |
| 4 | AUTO TIMER 8 |
| 5 | AUTO TIMER 10 |
| 6 | AUTO TIMER 11 |
| 7 | AUTO TIMER 3 |
| 8 | AUTO TIMER 3 |

## Board: TAKERF722SE

Board is DSHOT enabled.

### Target: TAKERF722SE

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: TBS_LUCID_FC

Board is DSHOT enabled.

### Target: TBS_LUCID_FC

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |

## Board: TBS_LUCID_H7

Board is DSHOT enabled.

### Target: TBS_LUCID_H7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 5 |
| 4 | AUTO TIMER 5 |
| 5 | AUTO TIMER 5 |
| 6 | AUTO TIMER 5 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |
| 9 | AUTO TIMER 4 |
| 10 | AUTO TIMER 4 |
| 11 | AUTO TIMER 15 |
| 12 | AUTO TIMER 15 |

## Board: TMOTORF7V2

Board is DSHOT enabled.

### Target: TMOTORF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 4 |
| 6 | AUTO TIMER 4 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |
| 9 | PWM, SERVO |

## Board: TMOTORVELOXF7V2

Board is DSHOT enabled.

### Target: TMOTORVELOXF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 3 |
| 2 | AUTO TIMER 3 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 3 |
| 5 | AUTO TIMER 2 |
| 6 | AUTO TIMER 2 |
| 7 | AUTO TIMER 4 |
| 8 | AUTO TIMER 4 |

## Board: TUNERCF405

Board is DSHOT enabled.

### Target: TUNERCF405

| PWM | Usage |
| --- | ----- |
| 1 | MOTOR |
| 2 | MOTOR |
| 3 | MOTOR |
| 4 | MOTOR |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 8 |

## Board: ZEEZF7

Board is DSHOT enabled.

### Target: ZEEZF7

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 4 |
| 4 | AUTO TIMER 3 |

### Target: ZEEZF7V2

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 1 |

### Target: ZEEZF7V3

| PWM | Usage |
| --- | ----- |
| 1 | AUTO TIMER 4 |
| 2 | AUTO TIMER 4 |
| 3 | AUTO TIMER 3 |
| 4 | AUTO TIMER 2 |
| 5 | AUTO TIMER 8 |
| 6 | AUTO TIMER 8 |
| 7 | AUTO TIMER 8 |
| 8 | AUTO TIMER 1 |
