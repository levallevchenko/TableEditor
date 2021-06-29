import React, {useRef} from 'react';
import PropTypes from 'prop-types';

function TableRow ({dataName, dataValue}) {
  const inputRef = useRef();

  function addDraggability (evt) {
    if (evt.target.matches('.table__handle-button')) {
      evt.currentTarget.draggable = true;
    }
  }

  return (
    <tr className="table__row"
      onMouseDown={addDraggability}
    >
      <td className="table__data table__handle" colSpan="1">
        <button className="table__handle-button"></button>
      </td>
      <td className="table__data" colSpan="5">
        <input className="table__input" type="text" name="" defaultValue={dataName} />
      </td>
      <td className="table__data" colSpan="5">
        <input className="table__input" ref={inputRef} type="text" name="" defaultValue={dataValue} />
      </td>
      <td className="table__data table__remove-data" colSpan="1">
        <button className="table__remove-button" draggable="false"></button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  dataName: PropTypes.string.isRequired,
  dataValue: PropTypes.number.isRequired,
};

export default TableRow;
