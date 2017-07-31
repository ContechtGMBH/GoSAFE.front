const initial = {
    lmb: 'FEATUREINFO',
    rmb: null
};

export default function (state = initial, action){
  switch (action.type){
    case 'GET_FEATUREINFO':
      return {
          lmb: 'FEATUREINFO',
          rmb: null
      };
    case 'ADD_NEWFEATURE':
        return {
            lmb: 'NEWFEATURE',
            rmb: null
        };
    default:
      return state;
  }
}
