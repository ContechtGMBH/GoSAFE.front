import axios from "axios";
import {endpoint} from '../../config/endpoints'

const __API_URL__ = endpoint + 'api/v1/';
const __RAILML_URL__ = endpoint;

module.exports = {

    getLayer: function(endpoint, style, callback){
        axios.get(__API_URL__ + endpoint)
            .then(function(response){
                callback(null, {data: response.data, style: style, name: endpoint})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    convertRailml: function(data, endpoint, style, callback){

      //axios.defaults.headers.common['Authorization'] = 'ZGhhcmFzeW1jenVrQGdtYWlsLmNvbTptYXN0ZXI4OA==';

      axios.post(__RAILML_URL__ + endpoint, data)
          .then(function(response){
            callback(null, {data: response.data, style: style, name: endpoint})
          })
          .catch(function(error){
              console.log(error)
          })
    },

    getTracks: function(endpoint, callback){
        axios.get(__API_URL__ + endpoint)
            .then(function(response){
                callback(null, {data: response.data, name: endpoint})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getElements: function(data, callback){
        axios.post(__API_URL__ + 'elements', data)
            .then(function(response){
                callback(null, {data: response.data})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getGraph: function(data, callback){
      axios.post(__API_URL__ + 'tracktograph', data)
          .then(function(response){
              callback(null, {data: response.data})
          })
          .catch(function(error){
              console.log(error)
          })
    },

    getAdjacentNodes: function(data, callback){
      axios.post(__API_URL__ + 'elementstograph', data)
          .then(function(response){
              callback(null, {data: response.data})
          })
          .catch(function(error){
              console.log(error)
          })
    }
}
