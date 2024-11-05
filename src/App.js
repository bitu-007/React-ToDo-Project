import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoIndex } from './components/todo-index';
import { ToDoLogin } from './components/todo-login';
import { ToDoRegister } from './components/todo-register';
import { ToDoUserDashBoard } from './components/todo-user-dashboard';
import './components/todo-index.css';
import { ToDoAddAppointment } from './components/todo-add-appointment';
import { ToDoDetails } from './components/todo-details';
import { ToDoEdit } from './components/todo-edit';

function App() {
  return (
    <div className="todo-background">
      <BrowserRouter>
        <header>
        <h2 className='text-center text-light fs-1 bg-dark p-1'>To-Do</h2>
        </header>

        <section>
           <Routes>

            <Route path='/' element={<ToDoIndex />} />
            <Route path='user-login' element={<ToDoLogin />} />
            <Route path='user-register' element={<ToDoRegister />} />
            <Route path='user-dash' element={<ToDoUserDashBoard />} />
            <Route path='add-appointment' element={<ToDoAddAppointment />} />
            <Route path='todo-details/:id' element={<ToDoDetails />} />
            <Route path='todo-edit/:id' element={<ToDoEdit />} />
          
        </Routes>
       </section>
      </BrowserRouter>
    </div>
  );
}

export default App;
