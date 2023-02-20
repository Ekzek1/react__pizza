import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import type { RootState } from '../store';

interface CounterState {
  searchValue: string,
  categoryId: number,
  page: number,
  sort: {
    name: string, 
    sortProperty: string
  }
}

const initialState: CounterState = {
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
    setSearchValue(state, action){
      state.searchValue = action.payload;
    },
    setSortType(state, action){
      state.sort = action.payload;
    },
    setPage(state, action){
      state.page = action.payload;
    },
    setPageNext(state){
      state.page = state.page + 1;
    }, 
    setPageBack(state){
      state.page = state.page - 1;
    }, 
    setFilters (state, action) {
      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sortProperty;
    }
  }
});

export const { setCategoryId, setSortType, setPage, setPageNext, setPageBack , setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;

