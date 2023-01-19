import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
  totalPrice: 0,
  items: []
};

function totalPriceAmount(state){
  state.totalPrice = state.items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action){
      const findItem = state.items.find(item => item.id === action.payload.id);
      if(findItem){
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1          
        });
      }
      totalPriceAmount(state);
    },
    removeItem(state, action){
      state.items = state.items.filter(item => item.id !== action.payload);
      totalPriceAmount(state);
    },
    clearItems(state){
      state.items = [];
      state.totalPrice = 0;
    },
    decItem(state, action){
      const findItem = state.items.find(item => item.id === action.payload);
      if(findItem.count > 1){
        findItem.count--;
        totalPriceAmount(state);
      }
    },
  }
});

export const { addItem, removeItem, clearItems, decItem} = cartSlice.actions;

export default cartSlice.reducer;