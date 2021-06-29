import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getData} from '../../store/api-actions';
import {nanoid} from 'nanoid';
import {ActionCreator} from '../../store/action';
import TableRow from '../table-row/table-row.jsx';

function Table() {
  const {dataList} = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  let activeRow = null;

  function findRowIndex(evt, element) {
    const tableBody = evt.currentTarget;
    const rows = Array.from(tableBody.childNodes);

    const isActiveRow = (row) => row  === element;

    const rowIndex = rows.findIndex(isActiveRow);

    return rowIndex;
  }

  function removeButtonClickHandler(evt) {
    if (evt.target.matches('.table__remove-button')) {
      const activeRowIndex = findRowIndex(evt, evt.target.parentNode.parentNode);

      const newDataList = dataList.filter((dataItem, index) => index !== activeRowIndex);

      dispatch(ActionCreator.setData(newDataList));
    }
  }

  const getNextElement = (cursorPosition, currentElement) => {
    const currentElementCoord = currentElement.getBoundingClientRect();
    const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

    const nextElement = (cursorPosition < currentElementCenter) ?
      currentElement :
      currentElement.nextElementSibling;

    return nextElement;
  };

  function changeHoveredClass (evt, method) {
    const currentElement = evt.target.parentNode.childNodes;
    if (method === 'add') {
      currentElement.forEach((cell) => cell.classList.add('hovered'));
      return;
    }

    if (evt.target.matches('td')) {
      currentElement.forEach((cell) => cell.classList.remove('hovered'));
    }
  }

  function dragstart (evt) {
    if (evt.target.matches('tr')) {
      evt.target.classList.add('hold');
      activeRow = evt.target;
      setTimeout(() => {
        evt.target.classList.add('hide');
      }, 0);
    }
  }

  function dragend (evt) {
    if (evt.target.matches('tr')) {
      evt.target.className = 'table__row';
    }
  }

  function dragover (evt) {
    evt.preventDefault();
  }

  function dragenter (evt) {
    evt.preventDefault();
    if (evt.target.matches('td')) {
      changeHoveredClass(evt, 'add');
    }
  }

  function dragleave (evt) {
    evt.preventDefault();
    changeHoveredClass(evt, 'remove');
  }

  function dragdrop (evt) {
    changeHoveredClass(evt, 'remove');

    const activeElement = activeRow;
    const currentElement = evt.target.parentNode;
    const isMoveable = activeElement !== currentElement &&
      currentElement.matches('.table__row');

    if (!isMoveable) {
      return;
    }

    const nextElement = getNextElement(evt.clientY, currentElement);

    if (
      (nextElement &&
      activeElement === nextElement.previousElementSibling) ||
      activeElement === nextElement) {
      return;
    }

    evt.currentTarget.insertBefore(activeElement, nextElement);

    activeElement.draggable = false;
    activeElement.index = findRowIndex(evt, nextElement);
  }

  return (
    <section>
      <h2>Your list</h2>
      <table className="table" cellPadding={0} cellSpacing={0} border={0}>
        <thead className="table__head">
          <tr>
            <th className="table__caption" colSpan="1"></th>
            <th className="table__caption" colSpan="5">Goods</th>
            <th className="table__caption" colSpan="6">Price</th>
          </tr>
        </thead>
        <tbody className="table__body"
          onClick={removeButtonClickHandler}
          onDragStart={dragstart}
          onDragEnd={dragend}
          onDragOver={dragover}
          onDragEnter={dragenter}
          onDragLeave={dragleave}
          onDrop={dragdrop}
        >
          {dataList.map((dataItem, id) => <TableRow key={nanoid()} id={nanoid()} dataName={dataItem.name} dataValue={dataItem.value} />)}
        </tbody>
      </table>
    </section>
  );
}

export default Table;

