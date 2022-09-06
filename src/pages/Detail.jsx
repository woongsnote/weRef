import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/modules/post";

import { Box, Button, Link } from "@mui/material";

import Header from "../components/header/Header";
import DetailContent from "../components/detail/DetailContent";
import CommentList from "../components/comments/CommentList";
import { getComments } from "../redux/modules/comments";
import Loading from "../components/loading/Loading";

// import { RESP } from "../shared/response";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);
  // const { commentList } = useSelector((state) => state.comments);
  //로그인한 사용자 ID(임시값)
  const currentUserId = "sang";
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
  const BackButton = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "white",
          // width: "100%",
        }}
      >
        <Button
          variant="body1"
          onClick={() => {
            navigate(`/`);
          }}
          underline="none"
          component={"button"}
          marginRight="2rem"
        >
          이전으로
        </Button>
      </Box>
    );
  };

  /** 수정하기 버튼 -로그인해야 표시 */
  const EditButton = () => {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          backgroundColor: "white",
          // width: "100%",
        }}
      >
        {/* Edit page 이동(로그인 했을 때만 표시) */}
        <Button
          variant="body1"
          onClick={() => {
            navigate(`/editPost/${id}`);
          }}
          underline="none"
          component={"button"}
        >
          수정하기
        </Button>
      </Box>
    );
  };

  return isLoading ? (
    // TODO 로딩 표시
    <Loading />
  ) : (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "white",
          justifyContent: "flex-end",
        }}
      >
        <BackButton />
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
