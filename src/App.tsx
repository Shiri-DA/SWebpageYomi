import React from 'react';
import { Outlet } from "react-router"
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import {UserProvider} from "./Context/useAuth";
import {Navbar} from "./Pages/Navbar/Navbar";

function App() {
  return (
    <>
        <UserProvider>
          <Navbar />
          <Outlet />
          <ToastContainer />
        </UserProvider>
    </>
  );
}

export default App;
