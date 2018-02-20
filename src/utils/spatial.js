import turf from "turf";
import Wkt from 'wicket/wicket';
import axios from "axios";
import {endpoint} from '../../config/endpoints'

const __API_URL__ = endpoint + 'api/v1/';
const __RAILML_URL__ = endpoint;

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

        axios.post(__API_URL__ + 'neighbourhood', {wkt: bufferWkt})
            .then(function(response){
                callback(null, {data: response.data})
            })
            .catch(function(error){
                console.log(error)
            })
    }

}
