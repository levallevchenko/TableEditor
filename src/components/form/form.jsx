import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {ActionCreator} from '../../store/action';
import Error from '../error/error';

function Form () {
  const {isError, errorData} = useSelector((state) => state);
  const dispatch = useDispatch();
  const textareaRef = useRef();

  const makeJSON = (string) => {
    const b = JSON.parse(JSON.stringify(string).replace(/\s/g, '').split(' ').join(''));
    return JSON.parse(b);
  };

  const submitButtonHandler = (evt) => {
    evt.preventDefault();

    const data = textareaRef.current.value;

    try {
      const jsonData = makeJSON(data);
      dispatch(ActionCreator.setData(jsonData));
    } catch (error) {
      dispatch(ActionCreator.setError(true));
      dispatch(ActionCreator.setErrorData('Please, enter correct JSON-data.'));
      setTimeout(() => {
        dispatch(ActionCreator.setError(false));
      }, 2500);
    }
  };

  const placeholder = `Enter your data in JSON format carefully.

  Example:

    [{
      "name": "as",
      "value": "400"
    },
    {
      "name": "df",
      "value": "4500"
    }]`;

  return (
    <section>
      <h2>Form for your JSON Data</h2>
      {isError &&
      <Error errorData={errorData} />}
      <form className="form" action="#" method="post">
        <textarea
          ref={textareaRef}
          className="form__textarea"
          name="json-data" id="json-data"
          placeholder={placeholder}
        />
        <button onClick={submitButtonHandler} className="form__button" type="submit">Publish</button>
      </form>
    </section>
  );
}

export default Form;
