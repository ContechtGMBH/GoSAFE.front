import axios from "axios";

import GeoJsonDataSource from "cesium/Source/DataSources/GeoJsonDataSource";

const __API_URL__ = 'http://localhost:3000/';

module.exports = {

    getLayer: function(dataSourcesObject, endpoint, style, callback){
        axios.get(__API_URL__ + endpoint)
            .then(function(response){

                let layer = new GeoJsonDataSource.load(response.data, style);

                if (dataSourcesObject) {
                    dataSourcesObject.add(layer);
                }

                callback(null, endpoint)
            })
            .catch(function(error){
                console.log(error)
            })
    }
}
