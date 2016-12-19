/**
 * Highcharts plugin for creating individual rounded corners.
 * Author: Torstein Honsi
 * Last revision: 2014-09-19
 * License: MIT License
 *
 * Known issues:
 * - Animation isn't working. To overcome that, create a method on the Renderer which points
 *   to a symbol definition, like it is currently done with "arc" in PieSeries.
 * - Dom exception on showing/hiding the series
 */
(function (H) {
    var each = H.each;

    H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
        
        var serie = this,
            chart = serie.chart,
            options = serie.options,
            index = serie.index,
            series = chart.series,
            rTopLeft = 0,
            rTopRight = 0,
            rBottomRight = 0,
            rBottomLeft = 0,
            topMargin = options.topMargin || 0,
            bottomMargin = options.bottomMargin || 0,
            seriesLen = series.length - 1,
            dataPoint,
            seriesRoundedIndex,
            currentSerie,
            currentSerieOptions,
            i, j;

        proceed.call(this);

        each(serie.points, function (point) {
            var xValue = point.x;

            seriesRoundedIndex = -1;

            for (i = 0; i <= seriesLen; i++) {

                currentSerie = series[i];
                currentSerieOptions = currentSerie.options;

                if (currentSerie.type === 'column' && currentSerieOptions.className !== 'highcharts-navigator-series') {
                    for (j = 0; j < currentSerieOptions.data.length; j++) {
                        
                        dataPoint = currentSerieOptions.data[j];
            
                        if ((series[i].visible !== false) && (
                            (dataPoint[0] === xValue && dataPoint[1] !== 0) ||
                            (dataPoint.x === xValue && dataPoint.y !== 0) ||
                            (j === xValue && dataPoint !== 0))) {

                            seriesRoundedIndex = series[i].index;
                            i = seriesLen;
                        }
                    }
                }
            }

            if (index === seriesRoundedIndex) {
                rTopLeft = options.borderRadiusTopLeft || 0;
                rTopRight = options.borderRadiusTopRight || 0;
                rBottomLeft = options.borderRadiusBottomRight || 0;
                rBottomRight = options.borderRadiusBottomLeft || 0;
            } else {
                rTopLeft = 0;
                rTopRight = 0;
                rBottomLeft = 0;
                rBottomRight = 0;
            }

            var shapeArgs = point.shapeArgs,
                w = shapeArgs.width,
                h = shapeArgs.height,
                x = shapeArgs.x,
                y = shapeArgs.y;

            // fix the issue in the case when round is higher then half of width. It causes artefacts
            if (rTopLeft > (w / 2)) {
                rTopLeft = w / 2;
            }

            if (rTopRight > (w / 2)) {
                rTopRight = w / 2;
            }

            if (rBottomLeft > (w / 2)) {
                rBottomLeft = w / 2;
            }

            if (rBottomRight > (w / 2)) {
                rBottomRight = w / 2;
            }

            // Preserve the box for data labels
            point.dlBox = point.shapeArgs;
            point.shapeType = 'path';

            
            point.shapeArgs = {
                d: [
                    'M', x + rTopLeft, y + topMargin,
                    // top side
                    'L', x + w - rTopRight, y + topMargin,
                    // top right corner
                    'C', x + w - rTopRight / 2, y, x + w, y + rTopRight / 2, x + w, y + rTopRight,
                    // right side
                    'L', x + w, y + h - rBottomRight,
                    // bottom right corner
                    'C', x + w, y + h - rBottomRight / 2, x + w - rBottomRight / 2, y + h, x + w - rBottomRight, y + h + bottomMargin,
                    // bottom side
                    'L', x + rBottomLeft, y + h + bottomMargin,
                    // bottom left corner
                    'C', x + rBottomLeft / 2, y + h, x, y + h - rBottomLeft / 2, x, y + h - rBottomLeft,
                    // left side
                    'L', x, y + rTopLeft,
                    // top left corner
                    'C', x, y + rTopLeft / 2, x + rTopLeft / 2, y, x + rTopLeft, y,
                    'Z'
                ]
            };

        });
    });
}(Highcharts));