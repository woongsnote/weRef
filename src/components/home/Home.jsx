import React from "react";
import { useState, useEffect } from "react";

import Header from "../header/Header";
import HomeCrad from "../homeCard/HomeCrad";

import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import axios from "axios";
import { getPosts } from "../../redux/modules/post";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const data = useSelector((state) => state.post.posts);
  const reverse = [...data].reverse();
  // axios.get("http://52.79.235.129/api/post");
  // console.log(axios.get("http://52.79.235.129/api/post"));

  const [loginCheck, setLoginCheck] = useState(true);

  const goAddPost = () => {
    loginCheck === true ? navigate("/addPost") : alert("로그인 해주세요!");
  };

  return (
    <>
      <Header />
      <Button variant="contained" onClick={goAddPost}>
        글쓰기
      </Button>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3} columns={16}>
          {reverse.map((item) => (
            <HomeCrad
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              author={item.author}
              likes={item.likes}
              refUrl={item.refUrl}
            />
          ))}
        </Grid>
      </Box>
    </>
  );
}
