import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Link } from "@mui/material";

import Header from "../components/header/Header";
import CommentList from "../components/comments/CommentList";

import { RESP } from "../shared/response";
import DetailContent from "../components/detail/DetailContent";

import { apis } from "../shared/api";

const Detail = () => {
  //로그인한 사용자 ID(임시값)
  const currentUserId = "";
  //데이터 가져오는 동안 로딩 처리
  const [isLoading, setLoading] = useState(true);
  //받아온 데이터 상태관리
  const [data, setData] = useState({});
  //받아온 댓글 상태 관리
  const [comments, setComments] = useState([]);

  const test = apis.getDetail(3);
  console.log(test);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setData(RESP.DETAIL.result);
      setComments(RESP.COMMENTS.result);
    }, 1000);
  }, []);

  const navigate = useNavigate();

  const links = data.urlLink;

  /** 수정하기 버튼 -로그인해야 표시 */
  const EditButton = () => {
    return (
      <Box sx={{ display: "flex", alignItems: "flex-end" }} hidden>
        {/* Edit page 이동(로그인 했을 때만 표시) */}
        <Link
          variant="body1"
          onClick={() => {
            navigate("/addPost");
          }}
          underline="none"
          component={"button"}
        >
          수정하기
        </Link>
      </Box>
    );
  };

  return isLoading ? (
    // TODO 로딩 표시
    <Box>정보를 가져오는 중입니다.. </Box>
  ) : (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "#eee",
          justifyContent: "flex-end",
        }}
      >
        {currentUserId === data.writer ? <EditButton /> : null}
      </Box>

      {/* 작성한 내용 표시 */}
      <DetailContent
        title={data.title}
        imageUrl={data.imageUrl}
        description={data.description}
        likes={data.likes}
        links={links}
      />
      <CommentList comments={comments} />
    </>
  );
};

export default Detail;
