import Axios from 'axios';
const HOST = '/api/items'; 

export const LOAD_ITEMS = `LOAD_ITEMS`;
export const LOAD_SINGLE_ITEM = `LOAD_SINGLE_ITEM`;

export const loadItems = () => {
  return dispatch => {
    return Axios.get(HOST)
    .then(items => {
      dispatch({
        type: LOAD_ITEMS,
        items: items.data
      });
    })
  }
}

export const loadSingleItem = (id) => {
  return dispatch => {
    return Axios.get(`${HOST}/${id}`)
    .then(item => {
      dispatch({
        type: LOAD_SINGLE_ITEM,
        item: item.data
      })
    }) 
  }
}

export const addItem = (newItem) => {
  return dispatch => {
    console.log(newItem.imageFile);
   Axios.post(HOST, newItem)
   .then(newItemDetails => {
      if(newItemDetails.data && newItemDetails.data.id) {
         return dispatch(loadItems())
      }
    })
    .catch((err) => {
      console.log(err.response);
    });
  };
};