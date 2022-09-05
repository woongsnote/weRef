import React from "react";
import { useState } from "react";

import Header from "../header/Header";
import HomeCard from "../homeCard/HomeCard";

import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  axios.get("http://52.79.235.129/api/post").then((response) => {
    console.log(response);
  });

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
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
          <HomeCard />
        </Grid>
      </Box>
    </>
  );
}
