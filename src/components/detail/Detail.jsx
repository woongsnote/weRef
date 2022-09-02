import React from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Button, Link, Paper } from "@mui/material";
import Image from "mui-image";
import Grid from "@mui/material/Grid";

import Header from "../header/Header";

export default function Detail() {
  const navigate = useNavigate();

  const data = {
    title: "안녕하세요",
    imageUrl: "https://picsum.photos/id/176/2000",
    link: "https://nomadcoders.co/",
    description: "테스트중입니다",
    createdAt: Date.now(),
    modifiedAt: Date.now(),
  };
  console.log(data);

  return (
    <>
      <Header />
      <Box>
        {/* Edit page 이동(로그인 했을 때만 표시) */}
        <Link
          variant="body2"
          onClick={() => {
            navigate("/addPost");
          }}
          underline="none"
          component={"button"}
        >
          수정하기
        </Link>
      </Box>
      {/* 작성한 내용 표시 */}
      <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Image src={data.imageUrl} alt="description" />
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
              <p>{data.link}</p>
              <p>{data.link}</p>
              <p>{data.link}</p>
              <p>{data.link}</p>
              <p>{data.link}</p>
            </Item>
          </Grid>
        </Grid>
      </Box>
      {/* 댓글 리스트``````` */}
      <Box>
        <Button>새 댓글</Button>
        <Box>
          댓글
          <Button>추가</Button>
          <Button>삭제</Button>
          <Button>편집</Button>
        </Box>
      </Box>
    </>
  );
}
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
