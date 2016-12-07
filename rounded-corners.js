/**
 * Highcharts plugin for creating individual rounded corners.
 *
 * Author: Torstein Honsi
 * Last revision: 2016-10-19
 * License: MIT License
 *
 * Known issues:
 * - Animation isn't working. To overcome that, create a method on the Renderer which points
 *   to a symbol definition, like it is currently done with "arc" in PieSeries.
 * - Dom exception on showing/hiding the series
 */
(function (H) {
    H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
        var options = this.options,
            rTopLeft = options.borderRadiusTopLeft || 0,
            rTopRight = options.borderRadiusTopRight || 0,
            rBottomRight = options.borderRadiusBottomRight || 0,
            rBottomLeft = options.borderRadiusBottomLeft || 0,
            topMargin = options.topMargin || 0,
            bottomMargin = options.bottomMargin || 0,
            rTopLeftFraction = options.borderRadiusTopLeftFraction || 0,
            rTopRightFraction = options.borderRadiusTopRightFraction || 0,
            rBottomRightFraction = options.borderRadiusBottomRightFraction || 0,
            rBottomLeftFraction = options.borderRadiusBottomLeftFraction || 0;

        proceed.call(this);

        if (rTopLeft || rTopRight || rBottomRight || rBottomLeft ||
            rTopLeftFraction || rTopRightFraction || rBottomRightFraction || rBottomRightFraction) {
            H.each(this.points, function(point) {
                var shapeArgs = point.shapeArgs,
                    w = shapeArgs.width,
                    h = shapeArgs.height,
                    x = shapeArgs.x,
                    y = shapeArgs.y;
                
                // Correct for small columns (#7)
                if (rTopLeft > (w / 2)) {
                    rTopLeft = w / 2;
                }

                if (rTopRight > (w / 2)) {
                    rTopRight = w / 2;
                }

                rTopLeft = rTopLeft || rTopLeftFraction * w;
                rTopRight = rTopRight || rTopRightFraction * w;
                rBottomRight = rBottomRight || rBottomRightFraction * w;
                rBottomLeft = rBottomLeft || rBottomLeftFraction * w;

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
        }
    });
}(Highcharts));
