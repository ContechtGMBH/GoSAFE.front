import turf from "turf";
import Wkt from 'wicket/wicket';
import axios from "axios";

declare var __API_URL__ : String;

module.exports = {

    getNeighbourhood: function(trackGeom, callback){
        /*
         * Neighbourhood is a dataset within a distance to the given track.
         * Dataset contains features not directly related to the railway network.
         * Ex. buildings, wathersheeds, vegetation areas. Mostly extracted from the
         * CityGML and other vector formats (not railml!).
         *
         * Buffer radius - 150m (0.15km)
         *
         * @param {string} trackGeom - a valid WKT string (Linestring but others are valid too)
         * @callback callback - a callback to run after POST request is done. Handles error and response
         */
        let wkt = new Wkt.Wkt()
        let track = turf.lineString(wkt.read(trackGeom).toJson().coordinates)
        let buffer = turf.buffer(track, 0.15)

        let bufferWkt = wkt.read(JSON.stringify(buffer)).write()

        axios.post(__API_URL__ + 'api/v1/neighbourhood', {wkt: bufferWkt})
            .then(function(response){
                callback(null, {data: response.data})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    flatten: function(array, result) {
        /*
         * Utility function. Converts a multidimensional array to the flatten array.
         * Use to convert geojson coordinates to 1d array that can be passed to any 'Cesium.Cartesian3.fromDegreesArray'
         *
         * @param {array} array - nd array
         * @param {array} result - empty array or undefined, an additional parameter, can be skipped
         * @return {array} result - 1d array
         */
        result === undefined && (result = []);

        for (var i = 0, len = array.length; i < len; i++) {
            if (Object.prototype.toString.call(array[i]) === '[object Array]') {
                this.flatten(array[i], result);
            } else {
                result.push(array[i]);
            }
        }

        return result;
    }

}
