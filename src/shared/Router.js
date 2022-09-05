import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import AddPost from "../components/addPost/AddPost";
import Login from "../components/login/Login";
import SignUp from "../components/signup/SignUp";

import Detail from "../pages/Detail";
import EditPost from "../components/editPost/EditPost";

import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

const Router = () => {
  const [is_login, setIsLogin] = React.useState(false);

  // console.log(auth.currentUser);

  const loginCheck = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  React.useEffect(() => {
    onAuthStateChanged(auth, loginCheck);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* 각자 작업한 router 설정 */}
        <Route path="/" element={<Home />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/posts/:id" element={<Detail />} />
        <Route path="/editPost/:id" element={<EditPost />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
