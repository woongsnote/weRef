import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../components/home/Home";
import AddPost from "../components/addPost/AddPost";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 각자 작업한 router 설정 */}
                <Route path="/" element={<Home />} />
                <Route path="/addPost" element={<AddPost />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;