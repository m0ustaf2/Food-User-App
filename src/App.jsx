import { useCallback, useContext, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Login from './AuthModule/Components/Login/Login';
import RequestPassReset from './AuthModule/Components/RequestPassReset/RequestPassReset';
import ResetPass from './AuthModule/Components/ResetPass/ResetPass';
import { AuthContext } from './Context/AuthContext';
import Home from './HomeModule/Components/Home/Home';
import FavoritesList from './RecipesModule/Components/RecipesList/FavoritesList';
import RecipesList from './RecipesModule/Components/RecipesList/RecipesList';
import AuthLayout from './SharedModule/Components/AuthLayout/AuthLayout';
import MasterLayout from './SharedModule/Components/MasterLayout/MasterLayout';
import NotFound from './SharedModule/Components/NotFound/NotFound';
import ProtectedRoute from './SharedModule/Components/ProtectedRoute/ProtectedRoute';
import Register from './AuthModule/Components/Register/Register';
import VerifyMail from './AuthModule/Components/Register/VerifyMail';

function App() {
let{userData,saveuserData}=useContext(AuthContext);


  const routes=createHashRouter([
    {
      path:"/dashboard",
      element:<ProtectedRoute userData={userData}><MasterLayout userData={userData}/></ProtectedRoute>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element:<Home  userData={userData} />},
        {path:'recipes',element:<RecipesList/>},
        {path:'favorites',element:<FavoritesList/>},
      ]
    },
    {
      path:"/",
      element:<AuthLayout/>,
      errorElement:<NotFound/>,
      children:[
        {index:true,element: <Login saveuserData={saveuserData}/>},
        {path:'login',element:<Login saveuserData={saveuserData}/>},
        {path:'request-pass-reset',element:<RequestPassReset/>},
        {path:'reset-pass',element:<ResetPass/>},
        {path:'register',element:<Register/>},
        {path:'verify',element:<VerifyMail/>},

      ]

    }
  ])

  return (
    <>
    
    <Toaster/>
    <ToastContainer theme='dark'
    autoClose={2000}/>

    <RouterProvider router={routes} />
    </>
  )
}

export default App
