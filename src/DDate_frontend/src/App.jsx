import React from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import CreateAccount1 from "./Components/Hero/CreateAccount1";
import CreateAccount2 from "./Components/Hero/CreateAccount2";
import CreateAccount3 from "./Components/Hero/CreateAccount3";
import CreateAccount4 from "./Components/Hero/CreateAccount4";
import CreateAccount5 from "./Components/Hero/CreateAccount5";
import Swipe from "./Components/Swipe";
import Profile from "./Components/Profile";
import Notification from "./Components/Notification";
import MessagePage from "./Components/MessagePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/CreateAccount1" element={<CreateAccount1 />} />
        <Route path="/CreateAccount2" element={<CreateAccount2 />} />
        <Route path="/CreateAccount3" element={<CreateAccount3/>} />
        <Route path="/CreateAccount4" element={<CreateAccount4/>} />
        <Route path="/CreateAccount5" element={<CreateAccount5/>} /> 
       <Route path="/Swipe" element={<Swipe/>} /> 
         <Route path="/Profile" element={<Profile/>} />
        <Route path="/Notification" element={<Notification/>} />
        <Route path="/MessagePage" element={<MessagePage/>} />


      </Routes>
    </>
  );
};

export default App;










