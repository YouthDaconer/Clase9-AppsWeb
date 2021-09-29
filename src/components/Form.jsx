import React, { useState } from 'react';
import Todo from './Todo';
import '../App.css';
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
  const [updateModal, setUpdateModal] = useState(false);
  const [todo, setTodo] = useState({ todo: '', status: false });
  const [todoEdit, setTodoEdit] = useState({ todo: '', status: false });

  const showUpdateModal = (_todo) => {
    setTodoEdit({
      todo: _todo.todo,
      status: _todo.status,
      id: _todo.id
    });
    setUpdateModal(true);
  };

  const changeStateTodo = (todoSet) => {
    var loop = 0;
    var _todos = todos;
    _todos.map((_todo) => {
      if (todoSet.id === _todo.id) {
        if (todoSet.status) {
          _todos[loop].status = false;
        } else {
          _todos[loop].status = true;
        }
      }
      loop++;
    });
    setTodos(_todos);
    console.log(todos);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
  };

  const edit = (todoSet) => {
    if (Object.keys(todoSet).length === 0 || todoSet.todo.trim() === '') {
      alert('El campo no puede estar vacio');
      return;
    }
    var loop = 0;
    var _todos = todos;
    _todos.map((_todo) => {
      var breakLoop = false;
      if (todoSet.id == _todo.id) {
        console.log("Entró");
        _todos[loop].todo = _todo.todo;
        console.log(_todos[loop].todo + " -- Se debió haber cambiado");
        breakLoop = true;
      }
      if (breakLoop) {
        return;
      }
      loop++;
    });
    console.log(_todos);
    setTodos(_todos);
    console.log(todos);
    setUpdateModal(false);
  };

  const remove = (index) => {
    var response = window.confirm("¿Desea eliminar la tarea?");

    if (response) {
      const newTodos = [...todos];
      newTodos.splice(index, 1);
      setTodos(newTodos);
      setUpdateModal(false);
    }
  };

  const create = (e) => {
    if (Object.keys(todo).length === 0 || todo.todo.trim() === '') {
      alert('El campo no puede estar vacio');
      return;
    }
    var newTodo = { ...todo };
    newTodo.id = todos.length + 1;
    newTodo.status = false;
    todos.push(newTodo);
    setTodos(todos);

    setTodo({
      todo: '',
      status: false
    });
  };

  const handleChange = (e) => {
    setTodo({
      todo: e.target.value,
    });
  };

  const handleEditChange = (e) => {
    setTodoEdit({
      ...todoEdit,
      todo: e.target.value,
    });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>Agregar tarea</label>
        <br />
        <input type='text' name='todo' value={todo.todo} onChange={handleChange}></input>
        <button onClick={create}>Agregar</button>
      </form>
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
          {
            (todos.length === 0) ?
              <tr>
                <td colSpan="3">No hay tareas</td>
              </tr>
              :
              todos.map((_todo) => (
                <Todo
                  todo={_todo.todo}
                  status={_todo.status}
                  key={_todo.id}
                  id={_todo.id}
                  remove={remove}
                  showUpdateModal={showUpdateModal}
                  changeStateTodo={changeStateTodo}
                />
              ))
          }
        </tbody>
      </Table>

      <Modal isOpen={updateModal}>
        <ModalHeader>
          <div><h3>Editar Tarea {todoEdit.todo}</h3></div>
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <label>
              Todo:
            </label>
            <input
              name="todoEdit"
              type="text"
              onChange={handleEditChange}
            />
          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <Button
            onClick={() => edit(todoEdit)}
          >
            Editar
          </Button>
          <Button
            onClick={() => closeUpdateModal()}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Form;
