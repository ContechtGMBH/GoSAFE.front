const initial = {
    //feature: null,
    properties: {}
};

export default function (state = initial, action){
  switch (action.type){
    case 'SELECT_FEATURE':
      return {properties: action.payload};
    default:
      return state;
  }
}
