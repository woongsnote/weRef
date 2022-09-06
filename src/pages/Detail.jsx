import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/modules/post";

import { Box, Link } from "@mui/material";

import Header from "../components/header/Header";
import DetailContent from "../components/detail/DetailContent";
import CommentList from "../components/comments/CommentList";
import { getComments } from "../redux/modules/comments";

// import { RESP } from "../shared/response";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  // const { commentList } = useSelector((state) => state.comments);
  //로그인한 사용자 ID(임시값)
  const currentUserId = "sang1";
  // const currentUserId = "";
  //데이터 가져오는 동안 로딩 처리
  const [isLoading, setLoading] = useState(true);
  //받아온 데이터 상태관리
  // const [data, setData] = useState();
  //받아온 댓글 상태 관리
  // const [comments, setComments] = useState([]);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(id));

    setTimeout(() => {
      // setComments(RESP.COMMENTS.result);

      // setData(post);
      setLoading(false);
    }, 1000);
  }, []);
  // console.log(post);
  // console.log(data);
  // const links = data.referenceList;
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
        {currentUserId === post.author ? <EditButton /> : null}
      </Box>

      {/* 작성한 내용 표시 */}
      <DetailContent
        title={post.title}
        imageUrl={post.imgUrl}
        description={post.description}
        likes={post.cntHeart}
        links={post.referenceList}
      />
      <CommentList
        currentUserId={currentUserId}
        // comments={commentList}
        postId={id}
      />
    </>
  );
};

export default Detail;
