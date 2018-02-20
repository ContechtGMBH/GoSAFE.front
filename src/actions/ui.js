import {closeFeatureInfoBox} from '../utils/eventsUtils'

export const togglePanel = (condition) => {
    /*
     * UI utility for open/close the 'Panel' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    return {
        type: 'TOGGLE_PANEL',
        payload: !condition
    }
}

export const toggleAbout = (condition) => {
    /*
     * UI utility for open/close the 'About' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    return {
        type: 'TOGGLE_ABOUT',
        payload: !condition
    }
}

export const toggleLayers = (condition) => {
    /*
     * UI utility for open/close the 'Tracks' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    return {
        type: 'TOGGLE_LAYERS',
        payload: !condition
    }
}

export const toggleFeatureInfo = (condition) => {
    /*
     * UI utility for open/close the 'FeatureInfo' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    if (condition) {
      closeFeatureInfoBox()
    }
    return {
        type: 'TOGGLE_FEATUREINFO',
        payload: !condition
    }
}

export const toggleStatistics = (condition) => {
    /*
     * UI utility for open/close the 'Statistics' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    return {
        type: 'TOGGLE_STATISTICS',
        payload: !condition
    }
}

export const toggleRailml = (condition) => {
    /*
     * UI utility for open/close the 'Railml' widget
     *
     * @param {boolean} condition - if true it's visible, if false invisible. This action changes that state.
     */
    return {
        type: 'TOGGLE_RAILML',
        payload: !condition
    }
}
