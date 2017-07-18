import axios from "axios";
import {endpoint} from '../../config/endpoints'

const __API_URL__ = endpoint + 'data/';

module.exports = {

    getLayer: function(endpoint, style, callback){
        axios.get(__API_URL__ + endpoint)
            .then(function(response){
                callback(null, {data: response.data, style: style})
            })
            .catch(function(error){
                console.log(error)
            })
    }
}
