/**
 * Highcharts plugin for creating individual rounded corners.
 * 
 * Author: Torstein Honsi
 * Samuel J Mathew - Added support for  series with negative values.
 * Version: 1.0.5
 * License: MIT License
 * URL : https://github.com/samuelj90/rounded-corners
 */
(function (factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory;
    } else {
        factory(Highcharts);
    }
}(function (H) {
    var rel = H.relativeLength;

    H.wrap(H.seriesTypes.column.prototype, 'translate', function (proceed) {
        var options = this.options,
            topMargin = options.topMargin || 0,
            bottomMargin = options.bottomMargin || 0;

        proceed.call(this);

        H.each(this.points, function (point) {
            var shapeArgs = point.shapeArgs,
                w = shapeArgs.width,
                h = shapeArgs.height,
                x = shapeArgs.x,
                y = shapeArgs.y;
            var borderRadiusTopLeft = options.borderRadiusTopLeft;
            var borderRadiusTopRight = options.borderRadiusTopRight;
            var borderRadiusBottomRight = options.borderRadiusBottomRight;
            var borderRadiusBottomLeft = options.borderRadiusBottomLeft;

            if (point.y < 0) {
                var tempTopLeft = borderRadiusTopLeft;
                var tempTopRight = borderRadiusTopRight;
                borderRadiusTopLeft = borderRadiusBottomLeft;
                borderRadiusTopRight = borderRadiusBottomRight;
                borderRadiusBottomLeft = tempTopLeft;
                borderRadiusBottomRight = tempTopRight;
            }

            // Get the radius
            var rTopLeft = rel(borderRadiusTopLeft || 0, w),
                rTopRight = rel(borderRadiusTopRight || 0, w),
                rBottomRight = rel(borderRadiusBottomRight || 0, w),
                rBottomLeft = rel(borderRadiusBottomLeft || 0, w);

            if (rTopLeft || rTopRight || rBottomRight || rBottomLeft) {
                var maxR = Math.min(w, h) / 2

                if (rTopLeft > maxR) {
                    rTopLeft = maxR;
                }

                if (rTopRight > maxR) {
                    rTopRight = maxR;
                }

                if (rBottomRight > maxR) {
                    rBottomRight = maxR;
                }

                if (rBottomLeft > maxR) {
                    rBottomLeft = maxR;
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
            }

        });
    });
}(Highcharts))
);

