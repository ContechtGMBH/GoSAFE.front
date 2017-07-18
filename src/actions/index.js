import series from 'async/series';

const layersStyles = require('../assets/styles');

const dataUtils = require('../utils/dataUtils');

export const togglePanel = condition => {
    return {
        type: 'TOGGLE_PANEL',
        payload: !condition
    }
}

export const toggleAbout = condition => {
    return {
        type: 'TOGGLE_ABOUT',
        payload: !condition
    }
}

export const toggleLayers = condition => {
    return {
        type: 'TOGGLE_LAYERS',
        payload: !condition
    }
}

export const receivedDataSources = (data, dataSourcesObject) => {
    return {
        type: 'RECEIVED_DS',
        payload: {
            layers: data,
            container: dataSourcesObject
        }
    }
}


export const getDataRequested = () => {
    return {
        type: 'REQUEST_DS',
    };
}

export const getBasicData = (dataSourcesObject) => {
    return dispatch => {

        dispatch(getDataRequested());

        series([
                function(callback) {
                    dataUtils.getLayer('tracks', layersStyles.default, function(err, data) {
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
    return dispatch => {

        dispatch(getDataRequested());

        series([
                function(callback) {
                    dataUtils.getLayer('tracks', layersStyles.default, function(err, data) {
                        callback(null, data);
                    })
                },
                function(callback) {
                    dataUtils.getLayer('platforms', layersStyles.redThick, function(err, data) {
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
