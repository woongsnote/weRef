import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../redux/modules/post";

import { Box, Button } from "@mui/material";

import Header from "../components/header/Header";
import DetailContent from "../components/detail/DetailContent";
import CommentList from "../components/comments/CommentList";
import { getComments } from "../redux/modules/comments";
import Loading from "../components/loading/Loading";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import Layout from "../components/layout/Layout";
import DetailMenuButton from "../components/detail/DetailMenuButton";
import { accessToken, refreshToken } from "../utils/tokens";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { post } = useSelector((state) => state.post);

  // const { commentList } = useSelector((state) => state.comments);
  //로그인한 사용자 ID(임시값)
  const currentUserId = "sang";
  //데이터 가져오는 동안 로딩 처리
  const [isLoading, setLoading] = useState(true);

  const [unKnown, setUnKnown] = useState(true);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(getComments(id));

    if (!accessToken === null || !refreshToken === null) setUnKnown(false);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  /** 수정하기 버튼 -로그인해야 표시 */

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Header />
      <Layout>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            backgroundColor: "white",
            justifyContent: "flex-end",
            margin: "1rem",
          }}
        >
          {currentUserId === post.author ? (
            <DetailMenuButton
              onClick={() => {
                navigate(`/editPost/${id}`);
              }}
            >
              <EditRoundedIcon />
            </DetailMenuButton>
          ) : null}

          {currentUserId === post.author ? (
            <DetailMenuButton
              onClick={() => {
                navigate(`/editPost/${id}`);
              }}
            >
              <DeleteRoundedIcon />
            </DetailMenuButton>
          ) : null}

          <DetailMenuButton onClick={() => navigate("/")}>
            <ArrowBackRoundedIcon />
          </DetailMenuButton>
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
          postId={id}
          unKnown={unKnown}
        />
      </Layout>
    </>
  );
};

export default Detail;
