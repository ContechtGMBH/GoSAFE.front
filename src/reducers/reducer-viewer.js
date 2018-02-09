const initial = {
    viewer: null,
};

export default function (state = initial, action){
  switch (action.type){
    case 'SHARE_VIEWER':
      return {viewer: action.payload};
    default:
      return state;
  }
}
