Rounded corners
===============

### Deprecated
This plugin has been deprecated. Since Highcharts v11, rounded corners are built
into the library natively, and with better handling of chart direction, stacking
and more. See [column.borderRadius](https://api.highcharts.com/highcharts/series.column.borderRadius).

### Description
This plugin adds options for setting rounded corners on bar and column charts.

The contents of the plugin is located in the javascript file
`rounded-corners.js`.

This plugin is published under the MIT license, and the license document is
included in the repository.

### Usage
The plugin adds four options to the column series object; `borderRadiusTopLeft`,
`borderRadiusTopRight`, `borderRadiusBottomLeft` and `borderRadiusBottomRight`.
If the options are given as numbers, they are interpreted as pixels. If given
as percentage strings, they are percentages of the column width.


### Demo
* [Rounded corners](http://jsfiddle.net/highcharts/b288zrch/)

