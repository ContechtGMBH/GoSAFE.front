export const shareViewer = (viewer) => {
    /*
     * Shares the Cesium viewer object in combined reducers.
     *
     * @param {object} viewer - an active Cesium.viever object
     */
    return {
        type: 'SHARE_VIEWER',
        payload: viewer
    }
}
