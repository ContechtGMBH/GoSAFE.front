const initial = {
    dataset: [5,10,1,3,7,6,5,7,8,1,2,4]
};

export default function (state = initial, action){
  switch (action.type){
    case 'DATASET1':
      return {dataset: [5,10,1,3,7,6,5,7,8,1,2,4]};
    case 'DATASET2':
      return {dataset: [1,2,4,2,1,10,7,8,1,2,1,9]};
    case 'DATASET3':
      return {dataset: [10,8,7,3,4,5,8,6,7,1,1,7]};
    default:
      return state;
  }
}
