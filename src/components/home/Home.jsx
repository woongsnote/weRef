import React from "react";
import { useState, useEffect } from "react";

import "./HomeStyle.css";
import Header from "../header/Header";
import HomeCard from "../homeCard/HomeCard";

import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import axios from "axios";
import { getPosts } from "../../redux/modules/posts";


import { accessToken } from "../../utils/tokens";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);


  const data = useSelector((state) => state.post.posts);
  const newData = [...data];


  const [loginCheck, setLoginCheck] = useState(true);

  useEffect(() => {
    accessToken() === undefined ? setLoginCheck(false) : setLoginCheck(true);
  }, [loginCheck]);

  

  const goAddPost = () => {
    loginCheck === true ? navigate("/addPost") : alert("로그인 해주세요!");
  };

  return (
    <>
      <Header />
      <div className="greeting">
        <h1>WEREF!</h1>
        <p>오늘은 무엇을 배웠나요?</p>
      </div>
      <div className="writeBtn">
        <Button variant="contained" onClick={goAddPost}>
          글쓰기
        </Button>
      </div>
      <Box sx={{ flexGrow: 2 }}>
        <Grid
          container
          spacing={8}
          columns={16}
          id="cardLayout"
          columnSpacing={{ md: -20 }}
        >


          {newData.map((item) => (
            <HomeCard

              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              author={item.author}
              imgUrl={item.imgUrl}
              cntHeart={item.cntHeart}
              createAt={item.createAt}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}
