import Color from "cesium/Source/Core/Color";

module.exports = {
    yellowSubmarine: {
        stroke: Color.YELLOW
        // clampToGround: true
    },

    blueTrain: {
        strokeWidth: 1,
        markerSymbol: 'rail',
        markerColor: Color.BLUE
    },

    redOctober: {
        stroke: Color.RED,
        strokeWidth: 10
    },

    stPatrick: {
        stroke: Color.CHARTREUSE,
        fill: Color.GREEN.withAlpha(0.5),
        strokeWidth: 3
    }
}
