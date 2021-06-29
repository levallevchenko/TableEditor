import {ActionCreator} from './action';
import env from 'react-dotenv';

const databaseId = env.NOTION_DATABASE_ID;

const GET_URL = `https://notion-api.splitbee.io/v1/table/${databaseId}`;
const POST_URL = `https://api.notion.com/v1/databases/${databaseId}/query`;

export function getData() {
  return function (dispatch) {
    return fetch(GET_URL)
      .then((response) => response.json())
      .then((data) => dispatch(ActionCreator.setData(data)));
  };
}

export function postData(data) {
  return function (dispatch) {
    return fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((newData) => dispatch(ActionCreator.setData(newData)));
  };
}


