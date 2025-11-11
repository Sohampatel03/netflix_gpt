import React, { useEffect } from 'react';
import Header from './Header';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './Login';
import Browse from './Browse';
import { useDispatch } from 'react-redux';

const Body = () => {
  // const dispatch = useDispatch();
  const approuter = createBrowserRouter([
    {
      path : "/",
      element : <Login/>,
    },
        {
          path : "/header",
          element : <Header/>,
        },
        {
          path : "/browse",
          element : <Browse/>,
        },
  ]);

 
  return (
    <div>
      <RouterProvider router ={approuter}/>
    </div>
  )
}



export default Body;