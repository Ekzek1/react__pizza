import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  categoryId: 0,
  page: 1,
  sort: {
    name: 'популярности (DESC)', 
    sortProperty: 'rating'
  }
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action){
      state.categoryId = action.payload;
    },
    setSortType(state, action){
      state.sort = action.payload;
    },
    setPage(state, action){
      state.page = action.payload;
    },
    setPageNext(state, action){
      state.page = state.page + 1;
    }, 
    setPageBack(state, action){
      state.page = state.page - 1;
    }, 
    setFilters (state, action) {
      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sortProperty;
    }
  }
});

export const { setCategoryId, setSortType, setPage, setPageNext, setPageBack , setFilters } = filterSlice.actions;

export default filterSlice.reducer;

