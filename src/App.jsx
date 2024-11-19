import React from 'react'
import './components/common/LoginRegister.css'
import { ToastContainer, toast } from 'react-toastify';
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import app from './firebase.confiq';
import Home from './pages/Home';
import ForgetPassword from './components/Forget password/ForgetPassword';
import Layout from './components/Layout/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
    <Route path="/" element={<Layout />} >
    <Route index element={<Home />} />
    </Route>
<Route path="/register" element={<Register />} />
   <Route path="/login" element={<Login />} />
    <Route path="/forgetpass" element={<ForgetPassword />} />
   </Route>
  
))

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer/>
    </>
  )
}

export default App
