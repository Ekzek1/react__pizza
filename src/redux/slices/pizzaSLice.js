import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async (params, thunkAPI) => {
    const { page,sortBy, order, category, search} = params;
    const { data } = await axios.get(
      `https://639f29c27aaf11ceb8940d63.mockapi.io/items?page=${page}&limit=4${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    return data
  }
)

const initialState = {
  items: [],
  status: 'loading',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action){
      state.items = action.payload;
    }
  },
  extraReducers: {    
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload
    },
    [fetchPizzas.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;