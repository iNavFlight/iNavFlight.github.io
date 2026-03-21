---
title: Legacy Mixers
---

## Overview

In iNav 2.0 (and hence in *development* after the release of inav 1.9.1), all mixers are removed from the flight controller. Mixers can be assigned by either the Configurator 2.0, or in the CLI. If the CLI is used:

* The `mixer` statement is removed
* The new settings `platform_type` and `model_preview_type` are required, see Cli.md.

For further exotic mixes, see also [custom mixes for exotic setups](../advanced/Custom-mixes-for-exotic-setups.md)

# CLI  mmix / smix for legacy mixers

The following captures `mmix` / `smix` values in the FC for 1.9.1 and earlier.

```
# mmix load TRI
mmix 0  1.000  0.000  1.333  0.000
mmix 1  1.000 -1.000 -0.667  0.000
mmix 2  1.000  1.000 -0.667  0.000

smix 0 5 2 100 0

# mmix load QUADP
mmix 0  1.000  0.000  1.000 -1.000
mmix 1  1.000 -1.000  0.000  1.000
mmix 2  1.000  1.000  0.000  1.000
mmix 3  1.000  0.000 -1.000 -1.000

# mmix load QUADX
mmix 0  1.000 -1.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  1.000
mmix 2  1.000  1.000  1.000  1.000
mmix 3  1.000  1.000 -1.000 -1.000

# mmix load Y6
mmix 0  1.000  0.000  1.333  1.000
mmix 1  1.000 -1.000 -0.667 -1.000
mmix 2  1.000  1.000 -0.667 -1.000
mmix 3  1.000  0.000  1.333 -1.000
mmix 4  1.000 -1.000 -0.667  1.000
mmix 5  1.000  1.000 -0.667  1.000

# mmix load HEX6
mmix 0  1.000 -0.866  0.500  1.000
mmix 1  1.000 -0.866 -0.500 -1.000
mmix 2  1.000  0.866  0.500  1.000
mmix 3  1.000  0.866 -0.500 -1.000
mmix 4  1.000  0.000 -1.000  1.000
mmix 5  1.000  0.000  1.000 -1.000

# mmix load FLYING_WING
mmix 0  1.000  0.000  0.000  0.000
mmix 1  1.000  0.000  0.000  0.000

smix 0 3 0 50 0
smix 1 3 1 50 0
smix 2 4 0 -50 0
smix 3 4 1 50 0

# mmix load Y4
mmix 0  1.000  0.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  0.000
mmix 2  1.000  0.000  1.000  1.000
mmix 3  1.000  1.000 -1.000  0.000

# mmix load HEX6X
mmix 0  1.000 -0.500  0.866  1.000
mmix 1  1.000 -0.500 -0.866  1.000
mmix 2  1.000  0.500  0.866 -1.000
mmix 3  1.000  0.500 -0.866 -1.000
mmix 4  1.000 -1.000  0.000 -1.000
mmix 5  1.000  1.000  0.000  1.000

# mmix load OCTOX8
mmix 0  1.000 -1.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  1.000
mmix 2  1.000  1.000  1.000  1.000
mmix 3  1.000  1.000 -1.000 -1.000
mmix 4  1.000 -1.000  1.000  1.000
mmix 5  1.000 -1.000 -1.000 -1.000
mmix 6  1.000  1.000  1.000 -1.000
mmix 7  1.000  1.000 -1.000  1.000

# mmix load OCTOFLATP
mmix 0  1.000  0.707 -0.707  1.000
mmix 1  1.000 -0.707 -0.707  1.000
mmix 2  1.000 -0.707  0.707  1.000
mmix 3  1.000  0.707  0.707  1.000
mmix 4  1.000  0.000 -1.000 -1.000
mmix 5  1.000 -1.000  0.000 -1.000
mmix 6  1.000  0.000  1.000 -1.000
mmix 7  1.000  1.000  0.000 -1.000

# mmix load OCTOFLATX
mmix 0  1.000  1.000 -0.414  1.000
mmix 1  1.000 -0.414 -1.000  1.000
mmix 2  1.000 -1.000  0.414  1.000
mmix 3  1.000  0.414  1.000  1.000
mmix 4  1.000  0.414 -1.000 -1.000
mmix 5  1.000 -1.000 -0.414 -1.000
mmix 6  1.000 -0.414  1.000 -1.000
mmix 7  1.000  1.000  0.414 -1.000

# mmix load AIRPLANE
mmix 0  1.000  0.000  0.000  0.000
mmix 1  1.000  0.000  0.000  0.000

smix 0 3 0 100 0
smix 1 4 0 100 0
smix 2 3 14 100 0
smix 3 4 14 -100 0
smix 4 5 2 100 0
smix 5 2 1 100 0

# mmix load VTAIL4
mmix 0  1.000 -0.580  0.580  1.000
mmix 1  1.000 -0.460 -0.390 -0.500
mmix 2  1.000  0.580  0.580 -1.000
mmix 3  1.000  0.460 -0.390  0.500

# mmix load HEX6H
mmix 0  1.000 -1.000  1.000 -1.000
mmix 1  1.000 -1.000 -1.000  1.000
mmix 2  1.000  1.000  1.000  1.000
mmix 3  1.000  1.000 -1.000 -1.000
mmix 4  1.000  0.000  0.000  0.000
mmix 5  1.000  0.000  0.000  0.000

# mmix load ATAIL4
mmix 0  1.000  0.000  1.000  1.000
mmix 1  1.000 -1.000 -1.000  0.000
mmix 2  1.000  0.000  1.000 -1.000
mmix 3  1.000  1.000 -1.000  0.000
```