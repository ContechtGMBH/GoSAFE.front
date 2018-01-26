import series from 'async/series';

const layersStyles = require('../assets/styles');

const dataUtils = require('../utils/dataUtils');

export const receivedDataSources = (data, dataSourcesObject) => {
    return {
        type: 'RECEIVED_DS',
        payload: {
            layers: data,
            container: dataSourcesObject
        }
    }
}

export const receivedTracks = (data, dataSourcesObject) => {
    return {
        type: 'RECEIVED_TRACKS',
        payload: {
            entities: data,
            container: dataSourcesObject
        }
    }
}

export const receivedElements = (data, dataSourcesObject) => {
    return {
        type: 'RECEIVED_ELEMENTS',
        payload: {
            entities: data,
            container: dataSourcesObject
        }
    }
}

export const getDataRequested = () => {
    return {
        type: 'REQUEST_DS',
    };
}

export const getTracksRequested = () => {
    return {
        type: 'REQUEST_TRACKS',
    };
}

export const getElementsRequested = () => {
    return {
        type: 'REQUEST_ELEMENTS',
    };
}

export const getBasicData = (dataSourcesObject) => {
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
    return dispatch => {

        dispatch(getTracksRequested());

        dataUtils.getTracks('tracks', function(err, data) {
            dispatch(receivedTracks(data, dataSourcesObject));
        })
    }
}

export const elementsData = (id, dataSourcesObject) => {
    return dispatch => {

        dispatch(getElementsRequested());

        dataUtils.getElements({id: id}, function(err, data) {
            dispatch(receivedElements(data, dataSourcesObject));
        })
    }
}
