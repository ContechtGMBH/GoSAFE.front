const initial = {
    nodeSpacing: 100,
    levelSeparation: 300,
    sortMethod: "directed",
    direction: "LR"
};

export default function (state = initial, action){
  switch (action.type){
    case 'ROTATE_GRAPH_UD':
      return {
        ...state,
        direction: "UD"
      }
    case 'ROTATE_GRAPH_LR':
      return {
        ...state,
        direction: "LR"
      }
    default:
      return state;
  }
}
