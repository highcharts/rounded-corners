Rounded corners
===============
This plugin adds options for setting rounded corners on bar and column charts.

The contents of the plugin is located in the javascript file
`rounded-corners.js`. 

This plugin is published under the MIT license, and the license document is
included in the repository.

### Install
Use `yarn add highcharts-rounded-corners` or `npm install highcharts-rounded-corners`

### Usage
The plugin adds four options to the column series object; `borderRadiusTopLeft`,
`borderRadiusTopRight`, `borderRadiusBottomLeft` and `borderRadiusBottomRight`.
If the options are given as numbers, they are interpreted as pixels. If given
as percentage strings, they are percentages of the column width.


### Demo
* [Rounded corners](http://jsfiddle.net/highcharts/b288zrch/)

### Integrate in Angular2 App
Import js library file and inject it to the highcharts dependency module as follows:

```import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts'
import * as HighchartsMore from 'highcharts/highcharts-more.src'
import * as RoundedCornersModule from 'highcharts-rounded-corners'
@NgModule({
  imports: [ ChartModule ],
  providers: [
    {
      provide: HIGHCHARTS_MODULES,
      useFactory: () => [HighchartsMore, RoundedCornersModule]
    },
  ]
})

class YourModuleClass {}```
