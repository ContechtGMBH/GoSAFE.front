import Color from "cesium/Source/Core/Color";

module.exports = {
    default: {
        stroke: Color.YELLOW
        // clampToGround: true
    },

    blueTrain: {
        strokeWidth: 1,
        markerSymbol: 'rail',
        markerColor: Color.BLUE
    },

    redThick: {
        stroke: Color.RED,
        strokeWidth: 10
    }
}
