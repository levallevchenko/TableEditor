import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import reducer from './store/app/app';
import {configureStore} from '@reduxjs/toolkit';
import Form from './components/form/form';
import Table from './components/table/table';

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(),
});


ReactDOM.render(
  <Provider store={store}>
    <Form />
    <Table />
  </Provider>,
  document.getElementById('root'));
