import {closeFeatureInfoBox} from '../utils/eventsUtils'

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

export const toggleFeatureInfo = condition => {
    if (condition) {
      closeFeatureInfoBox()
    }
    return {
        type: 'TOGGLE_FEATUREINFO',
        payload: !condition
    }
}

export const toggleStatistics = condition => {
    return {
        type: 'TOGGLE_STATISTICS',
        payload: !condition
    }
}

export const toggleRailml = condition => {
    return {
        type: 'TOGGLE_RAILML',
        payload: !condition
    }
}
