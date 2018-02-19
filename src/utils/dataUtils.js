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
    },

    getNeighbours: function(bbox) {
      let p1 = {x: 53, y: 0};
      let p2 = {x: 53.25, y: 2.75};
      //let center = {x: (p2.x + p1.x)/2 , y: (p2.y + p1.y)/2}
      let radius =  this.distance(p1.y, p1.x, p2.y, p2.x)/2
      //console.log(center)
      console.log(radius)
    },

    distance: function(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295;    // Math.PI / 180
      var c = Math.cos;
      var a = 0.5 - c((lat2 - lat1) * p)/2 +
              c(lat1 * p) * c(lat2 * p) *
              (1 - c((lon2 - lon1) * p))/2;

      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
}
