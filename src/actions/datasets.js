const dataUtils = require('../utils/dataUtils');

export const requestedDatasets = () => {
    /*
     * Statistics component handler
     */
    return {
        type: 'REQUESTED_DATASETS'
    }
}

export const receivedDatasets = (data) => {
    /*
     * Statistics component handler
     */
    return {
        type: 'RECEIVED_DATASETS',
        payload: data
    }
}

export const loadDatasets = () => {
    /*
     * Actions handler;
     * Dispatches request and after response is retrieved, sends it to the reducer
     */
     console.log('before dispatch')
    return dispatch => {
        dispatch(requestedDatasets());
        dataUtils.getDatasets(function(err, data) {
            dispatch(receivedDatasets(data.data));
        })
    }
}
