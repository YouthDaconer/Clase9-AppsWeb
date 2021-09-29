import React, { useState } from "react";
import Todo from "./Todo";
import "../App.css";
import {
  Table,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const Form = () => {
  const [todos, setTodos] = useState([]);

  const [newTodoName, setNewTodoName] = useState("");
  const [editTodoName, setEditTodoName] = useState("");

  const [modalEdit, setEditModal] = useState(false);
  const [todoEdit, setTodoEdit] = useState({});

  /* Crear tarea */
  const create = (e) => {
    e.preventDefault();

    if (newTodoName === "") {
      alert("El nombre de la tarea es obligatorio");
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      name: newTodoName,
      status: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoName("");
  };

  /* Editar tarea */
  const edit = (id, editTodoName) => {
    if (editTodoName === "") {
      alert("El nombre de la tarea es obligatorio");
      return;
    }

    const todoIndex = todos.findIndex((todo) => todo.id === id);

    // Reconstruimos el array con el todo editado
    const newTodoArray = [
      ...todos.slice(0, todoIndex),
      { ...todoEdit, name: editTodoName },
      ...todos.slice(todoIndex + 1),
    ];

    setTodos(newTodoArray);
    handleCloseEditModal();
  };

  /* Eliminar tarea */
  const remove = (id) => {
    var response = window.confirm("¿Desea eliminar la tarea?");

    if (response) {
      const todoIndexRemove = todos.findIndex((todo) => todo.id === id);

      // Reconstruimos el array sin la tarea que se quitará
      const newTodoArray = [
        ...todos.slice(0, todoIndexRemove),
        ...todos.slice(todoIndexRemove + 1),
      ];

      setTodos(newTodoArray);
      handleCloseEditModal();
    }
  };

  /* Completar tarea */
  const complete = (id, status) => {
    const todoComplete = todos.find((todo) => todo.id === id);
    const todoIndexComplete = todos.findIndex((todo) => todo.id === id);

    // Reconstruimos el array con el estado de la tarea cambiado
    const newTodoArray = [
      ...todos.slice(0, todoIndexComplete),
      { ...todoComplete, status },
      ...todos.slice(todoIndexComplete + 1),
    ];

    setTodos(newTodoArray);
    handleCloseEditModal();
  };

  /* Bloque de handlers */

  const handleOpenEditModal = (todo) => {
    setTodoEdit(todo);
    setEditModal(true);
  };

  const handleCloseEditModal = () => {
    setEditTodoName("");
    setEditModal(false);
  };

  const handleChange = (e) => {
    setNewTodoName(e.target.value);
  };

  const handleEditChange = (e) => {
    setEditTodoName(e.target.value);
  };

  return (
    <>
      <div class="card">
        <div class="card-body">
          <form onSubmit={create}>
            <div class="form-group">
              <label for="todo">Nombre de la tarea:</label>
              <br />
              <br />
              <input
                id="todo"
                class="form-control"
                type="text"
                name="todo"
                value={newTodoName}
                onChange={handleChange}
              ></input>
            </div>
            <br />
            <button class="btn btn-success" id="btn-create" onClick={create}>Agregar</button>
          </form>
        </div>
      </div>
      <br />
      <Table id="tareas">
        <thead>
          <tr>
            <th>Tarea</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {todos.length > 0 ? (
            todos.map((todo) => (
              <Todo
                todo={todo}
                key={todo.id}
                onCompleteTodo={(status) =>
                  complete(todo.id, status)
                }
                onOpenEditModal={(todo) => handleOpenEditModal(todo)}
                onRemove={(id) => remove(id)}
              />
            ))
          ) : (
            <tr>
              <td colSpan={3}>No hay tareas</td>
            </tr>
          )}
        </tbody>
      </Table>

      <Modal isOpen={modalEdit}>
        <ModalHeader>
          <div>
            <h3>Editar Tarea: {todoEdit.name}</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <form>
            <div class="form-group row">
              <label for="todoEdit" class="col-sm-2 col-form-label">Nombre: </label>
              <div class="col-sm-10">
                <input
                  id="todoEdit"
                  name="todoEdit"
                  type="text"
                  value={editTodoName}
                  onChange={handleEditChange}
                />
              </div>
            </div>
          </form>
        </ModalBody>

        <ModalFooter>
          <button class="btn btn-success" onClick={() => edit(todoEdit.id, editTodoName)}>
            Guardar
          </button>
          <button class="btn btn-danger" onClick={handleCloseEditModal}>Cancelar</button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Form;
