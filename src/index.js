import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './components/login';
import Todos from './components/todo';
import Signup from './components/signup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path ='/' element={<Todos />}/>
      <Route path='/login' element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      </Routes>
    </BrowserRouter>  
  </React.StrictMode>
);
