import {createReducer} from '@reduxjs/toolkit';
import {ActionType} from '../action';

export const initialState = {
  dataList: [],
  isError: null,
  errorData: null,
};

const app = createReducer(initialState, (builder) => {
  builder
    .addCase(ActionType.SET_DATA, (state, action) => {
      state.dataList = action.payload;
    })
    .addCase(ActionType.SET_ERROR, (state, action) => {
      state.isError = action.payload;
    })
    .addCase(ActionType.SET_ERROR_DATA, (state, action) => {
      state.errorData = action.payload;
    });
});

export default app;
