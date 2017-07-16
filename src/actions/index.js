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
