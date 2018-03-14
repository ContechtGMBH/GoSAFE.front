const initial = {display: false};

/*
 * Display About widget
 *
 * type: 'TOGGLE_ABOUT'
 * payload: {boolean}
 *
 * default: false
 */
export default function (state = initial, action){
  switch (action.type){
    case 'TOGGLE_ABOUT':
      return {display: action.payload};
    default:
      return state;
  }
}
