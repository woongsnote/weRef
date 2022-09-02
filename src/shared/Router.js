import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import AddPost from "../components/addPost/AddPost";
import Login from "../components/login/Login";
import SignUp from "../components/signup/SignUp";
import Detail from "../components/detail/Detail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 각자 작업한 router 설정 */}
        <Route path="/" element={<Home />} />
        <Route path="/addPost" element={<AddPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/detail" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
