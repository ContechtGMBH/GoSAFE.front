import series from 'async/series';

const layersStyles = require('../assets/styles');

const dataUtils = require('../utils/dataUtils');

const spatial = require('../utils/spatial');

/*
 * Asynchronous actions for retrieving data from the database
 * powered by redux-thunk
 * Action types:
 * 'REQUEST_X' - first action dispatched when request is executed
 * 'RECEIVED_X' - second action dispatched after an async request is finished and
 *                response is returned, here the payload is sent to teh reducer
 *
 */

export const receivedDataSources = (data, dataSourcesObject) => {
    /*
     * Deprecated
     */
    return {
        type: 'RECEIVED_DS',
        payload: {
            layers: data,
            container: dataSourcesObject
        }
    }
}

export const receivedTracks = (data, dataSourcesObject) => {
    /*
     * entities - track nodes from the database
     * container - viewer.dataSources object from the active Cesium viewer
     *
     * @param {array} data - an array of graph nodes
     * @param {object} dataSourcesObject - an active cesium viewer datasources
     */
    return {
        type: 'RECEIVED_TRACKS',
        payload: {
            entities: data,
            container: dataSourcesObject
        }
    }
}

export const receivedElements = (data, dataSourcesObject) => {
    /*
     * entities - track elements and ocs elements from the database, related to
     *            the given track
     * container - viewer.dataSources object from the active Cesium viewer
     *
     * @param {array} data - an array of graph nodes
     * @param {object} dataSourcesObject - an active cesium viewer datasources
     */
    return {
        type: 'RECEIVED_ELEMENTS',
        payload: {
            entities: data,
            container: dataSourcesObject
        }
    }
}

export const receivedNeighbourhood = (data, dataSourcesObject) => {
    /*
     * entities - Non RailML data from the database, ex. nodes extracted from
     *            CityGML; nodes in the database must have a spatial index;
     *            nodes are taken within a distance from the given track
     * container - viewer.dataSources object from the active Cesium viewer
     *
     * @param {array} data - an array of graph nodes
     * @param {object} dataSourcesObject - an active cesium viewer datasources
     */
    return {
        type: 'RECEIVED_NEIGHBOURHOOD',
        payload: {
            entities: data,
            container: dataSourcesObject
        }
    }
}

export const getDataRequested = () => {
    /*
     * Simple async handler
     */
    return {
        type: 'REQUEST_DS',
    };
}

export const getTracksRequested = () => {
    /*
     * Simple async handler
     */
    return {
        type: 'REQUEST_TRACKS',
    };
}

export const getElementsRequested = () => {
    /*
     * Simple async handler
     */
    return {
        type: 'REQUEST_ELEMENTS',
    };
}

export const getNeighbourhoodRequested = () => {
    /*
     * Simple async handler
     */
    return {
        type: 'REQUEST_NEIGHBOURHOOD',
    };
}

export const getBasicData = (dataSourcesObject) => {
  /*
   * Deprecated
   */
    return dispatch => {

        dispatch(getDataRequested());

        series([
                function(callback) {
                    dataUtils.getLayer('tracks', layersStyles.yellowSubmarine, function(err, data) {
                        callback(null, data);
                    })
                },
                function(callback) {
                    dataUtils.getLayer('signals', layersStyles.blueTrain, function(err, data) {
                        callback(null, data);
                    })
                }
            ],

            function(error, results) {
                dispatch(receivedDataSources(results, dataSourcesObject));
            }

        )
    }
}

export const getExtendedData = (dataSourcesObject) => {
  /*
   * Deprecated
   */
    return dispatch => {

        dispatch(getDataRequested());

        series([
                function(callback) {
                    dataUtils.getLayer('tracks', layersStyles.yellowSubmarine, function(err, data) {
                        callback(null, data);
                    })
                },
                function(callback) {
                    dataUtils.getLayer('platforms', layersStyles.redOctober, function(err, data) {
                        callback(null, data);
                    })
                },
                function(callback) {
                    dataUtils.getLayer('signals', layersStyles.blueTrain, function(err, data) {
                        callback(null, data);
                    })
                },
                function(callback) {
                    dataUtils.getLayer('counties', layersStyles.stPatrick, function(err, data) {
                        callback(null, data);
                    })
                },
            ],

            function(error, results) {
                dispatch(receivedDataSources(results, dataSourcesObject));
            }

        )
    }
}

export const railmlData = (file, dataSourcesObject) => {
    /*
     * To fix
     */
    return dispatch => {

        dispatch(getDataRequested());

        series([
                function(callback) {
                    dataUtils.convertRailml(file, 'api/v1/railml', layersStyles.redOctober, function(err, data) {
                        callback(null, data)
                    })
                }
            ],

            function(error, results) {
                dispatch(receivedDataSources(results, dataSourcesObject));
            }

        )
    }
}

export const tracksData = (dataSourcesObject) => {
    /*
     * Actions handler;
     * Dispatches request and after response is retrieved, sends it to the reducer
     *
     * @params {object} dataSourcesObject - an active cesium viewer object
     */
    return dispatch => {
        dispatch(getTracksRequested());
        dataUtils.getTracks('tracks', function(err, data) {
            dispatch(receivedTracks(data, dataSourcesObject));
        })
    }
}

export const elementsData = (id, dataSourcesObject) => {
    /*
     * Actions handler;
     * Dispatches request and after response is retrieved, sends it to the reducer
     *
     * @param {string} id - a railway network node ID
     * @params {object} dataSourcesObject - an active cesium viewer object
     */
    return dispatch => {
        dispatch(getElementsRequested());
        dataUtils.getElements({id: id}, function(err, data) {
            dispatch(receivedElements(data, dataSourcesObject));
        })
    }
}

export const neighbourhoodData = (trackGeom, dataSourcesObject) => {
    /*
     * Actions handler;
     * Dispatches request and after response is retrieved, sends it to the reducer
     *
     * @param {string} trackGeom - a valid WKT string (track geometry - LINESTRING)
     * @params {object} dataSourcesObject - an active cesium viewer object
     */
    return dispatch => {
        dispatch(getNeighbourhoodRequested());
        spatial.getNeighbourhood(trackGeom, function(err, data) {
            dispatch(receivedNeighbourhood(data, dataSourcesObject));
        })
    }
}
