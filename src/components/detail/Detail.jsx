import React, { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Button, Link, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Image from "mui-image";

import Header from "../header/Header";
import { RESP } from "../../shared/response";

export default function Detail() {
  //데이터 가져오는 동안 로딩 처리
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(RESP.DETAIL.result);
    }, 1000);
  }, []);

  // const navigate = useNavigate();

  const links = data.urlLink;

  // const EditButton = () => {
  //   return (
  //     <Box sx={{ display: "flex", alignItems: "flex-end" }} hidden>
  //       {/* Edit page 이동(로그인 했을 때만 표시) */}
  //       <Link
  //         variant="body1"
  //         onClick={() => {
  //           navigate("/addPost");
  //         }}
  //         underline="none"
  //         component={"button"}
  //       >
  //         수정하기
  //       </Link>
  //     </Box>
  //   );
  // };

  return isLoading ? (
    <Box>정보를 가져오는 중입니다.. </Box>
  ) : (
    <>
      <Header />

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
            </Item>
            <Box>
              <h3>Ref List</h3>
              {/* 링크 리스트 */}
              {links.map((link, index) => {
                return (
                  <LinkItem key={index}>
                    <Link href={link}>{link}</Link>
                  </LinkItem>
                );
              })}
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* 댓글 리스트 */}
      <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
        {/* 새 댓글 누르면 댓글 컴포넌트 생성 */}
        <Button
          onClick={() => {
            console.log("댓글 추가");
          }}
        >
          새 댓글
        </Button>
        <Box>
          댓글
          <Button
            onClick={() => {
              console.log("댓글 저장");
            }}
          >
            추가
          </Button>
          <Button
            onClick={() => {
              console.log("댓글 저장");
            }}
          >
            삭제
          </Button>
          <Button
            onClick={() => {
              console.log("댓글 저장");
            }}
          >
            편집
          </Button>
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

const LinkItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
