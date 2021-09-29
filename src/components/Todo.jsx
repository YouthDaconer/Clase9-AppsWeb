import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from "reactstrap";

const Todo = ({
  todo,
  onCompleteTodo,
  onOpenEditModal: handleOpenEditModal,
  onRemove: handleRemoveTodo,
}) => {

  const handleOnCheckTodo = (e) => {
    setStatus(e.target.checked);
    onCompleteTodo(!status);
  };
  const [status, setStatus] = useState(todo.status);

  return (
    <>
      <tr>
        <td>
          <strong><label>{todo.name}</label></strong>
        </td>
        <td>
          <label>
            <input
              type="checkbox"
              value={status}
              onChange={handleOnCheckTodo} />
            {todo.status ? (<strong>Completada</strong>) : (<strong>Pendiente</strong>)}
          </label>
        </td>
        <td className="buttons">
          <Button
            className="btn btn-danger"
            onClick={() => handleRemoveTodo(todo.id)}
          >
            Eliminar
          </Button>{" "}
          <Button className="btn btn-warning" onClick={() => handleOpenEditModal(todo)}>
            Editar
          </Button>
        </td>
      </tr>
    </>
  );
};

export default Todo;
