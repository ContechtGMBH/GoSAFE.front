const initial = {
    properties: {},
    name: null
};

export default function (state = initial, action){
  switch (action.type){
    case 'SELECT_FEATURE':
      return action.payload;
    default:
      return state;
  }
}
