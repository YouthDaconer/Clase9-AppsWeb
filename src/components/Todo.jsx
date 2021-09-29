import React from 'react';
import {
  Button,
} from "reactstrap";

const Todo = ({ todo, status, id, remove, showUpdateModal, changeStateTodo }) => {
  return (
    <>
      <tr>
        <td><h3>{todo}</h3></td>
        <td>
          <input type='checkbox'
            value={id}
            onChange={() => changeStateTodo({ todo: todo, status: status, id: id })}
            checked={status ? true : false}
          />
        </td>
        <td className='buttons'>
          <Button className='btn-delete' onClick={() => remove(id)}>
            X
          </Button>{" "}
          <Button className='btn-edit' onClick={() => showUpdateModal({ todo: todo, status: status, id: id })}>
            E
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Todo;
