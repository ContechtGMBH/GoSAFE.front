const initial = {
    datasets: null
};
/*
 * Mocked datasets
 *
 * type: 'DATASET{index}'
 * payload: {null}
 *
 * default: {array of int}
 */
export default function (state = initial, action){
  switch (action.type){
    case 'REQUESTED_DATASETS':
      return state
    case 'RECEIVED_DATASETS':
      return {
        datasets: action.payload
      }
    default:
      return state;
  }
}
