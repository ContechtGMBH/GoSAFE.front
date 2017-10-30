import axios from "axios";
import {endpoint} from '../../config/endpoints'

const __API_URL__ = endpoint + 'data/';
const __RAILML_URL__ = endpoint;

module.exports = {

    getLayer: function(endpoint, style, callback){
        axios.get(__API_URL__ + endpoint)
            .then(function(response){
                callback(null, {data: response.data, style: style})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    convertRailml: function(data, endpoint, style, callback){

      //axios.defaults.headers.common['Authorization'] = 'ZGhhcmFzeW1jenVrQGdtYWlsLmNvbTptYXN0ZXI4OA==';

      axios.post(__RAILML_URL__ + endpoint, data)
          .then(function(response){
            callback(null, {data: response.data, style: style})
          })
          .catch(function(error){
              console.log(error)
          })
    }
}
