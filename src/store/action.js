export const ActionType = {
  SET_DATA: 'app/setData',
  SET_ERROR: 'app/setError',
  SET_ERROR_DATA: 'app/setErrorData',
};

export const ActionCreator = {
  setData: (dataList) => ({
    type: ActionType.SET_DATA,
    payload: dataList,
  }),
  setError: (isError) => ({
    type: ActionType.SET_ERROR,
    payload: isError,
  }),
  setErrorData: (errorData) => ({
    type: ActionType.SET_ERROR_DATA,
    payload: errorData,
  }),
};
