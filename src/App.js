import React from 'react';
import './App.css';
import Form from './components/Form';
import 'bootstrap/dist/css/bootstrap.css';

/* ACTIVIDAD
  - Van a habilitar la opcion de editar el todo, abre un input y edita el todo.
  - Permitir completar la tarea
  - Van a organizar el CSS a un diseño mas agradable
 */
const App = () => {

  return (
    <>
      <div className='App'>
        <div className='App-content'>
          <p class="title-app">Organizador de tareas</p>
          <Form />
        </div>
      </div>
    </>
  );

}

export default App;
