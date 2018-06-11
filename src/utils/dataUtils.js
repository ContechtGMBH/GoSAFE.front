import axios from "axios";

declare var __API_URL__: String;

module.exports = {

    getLayer: function(endpoint, style, callback){
      /*
       * Deprecated
       */
        axios.get(__API_URL__ + 'api/v1/' + endpoint)
            .then(function(response){
                callback(null, {data: response.data, style: style, name: endpoint})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    convertRailml: function(data, endpoint, style, callback){

      /*
       * To fix.
       */

      axios.post('__RAILML_URL__' + endpoint, data)
          .then(function(response){
            callback(null, {data: response.data, style: style, name: endpoint})
          })
          .catch(function(error){
              console.log(error)
          })
    },

    getTracks: function(endpoint, callback){
        /*
         * Get all tracks from the database (all nodes with 'Track' labels)
         * Tracks are visualized on the globe
         *
         * @param {string} endpoint - this param should be removed, there is only one endpoint for tracks
         * @callback callback - a callback to run after GET request is resolved. Handles error and response.
         */
        axios.get(__API_URL__ + 'api/v1/' + endpoint)
            .then(function(response){
                callback(null, {data: response.data, name: endpoint})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getElements: function(data, callback){
        /*
         * Get all railml elements related to the given track node from the database
         * Elements are visualized on the globe
         *
         * @param {object} data - an object with the 'track_id' parameter
         * @callback callback - a callback to run after GET request is resolved. Handles error and response.
         */
        axios.post(__API_URL__ + 'api/v1/elements', data)
            .then(function(response){
                callback(null, {data: response.data})
            })
            .catch(function(error){
                console.log(error)
            })
    },

    getGraph: function(data, callback){
      /*
       * Get the track node and all elements related from the database
       * All nodes are converted to the proper format ready to display on the D3-graph canvas
       *
       * @param {string} data - an object with the 'id' parameter
       * @callback callback - a callback to run after GET request is resolved. Handles error and response.
       */
      axios.post(__API_URL__ + 'api/v1/tracktograph', data)
          .then(function(response){
              callback(null, {data: response.data})
          })
          .catch(function(error){
              console.log(error)
          })
    },

    getAdjacentNodes: function(data, callback){
      /*
       * Get all nodes connected to the given node from the database
       * All nodes are converted to the proper format ready to display on the D3-graph canvas
       *
       * @param {string} data - an object with the 'id' parameter
       * @callback callback - a callback to run after GET request is resolved. Handles error and response.
       */
      axios.post(__API_URL__ + 'api/v1/elementstograph', data)
          .then(function(response){
              callback(null, {data: response.data})
          })
          .catch(function(error){
              console.log(error)
          })
    },

    getCurrentTrains: function(callback){
      /*
       * Get information about current trains from realtime irishrail api.
       *
       * @callback callback - a callback to run after GET request is resolved. Handles error and response.
       */
      axios.get(__API_URL__ + 'api/v1/realtime/getcurrenttrains')
          .then(function(response){
              callback(null, {data: response.data})
          })
          .catch(function(error){
              console.log(error)
          })
    }
}
