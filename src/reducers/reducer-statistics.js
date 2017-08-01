const initial = {display: false};

export default function (state = initial, action){
  switch (action.type){
    case 'TOGGLE_STATISTICS':
      return {display: action.payload};
    default:
      return state;
  }
}
