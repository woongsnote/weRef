import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { addComment } from "../../redux/modules/comments";

import { Box, Avatar, Typography, Input } from "@mui/material";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";

import useInput from "../../hooks/useInput";

const AddComment = ({ currentUserId, postId }) => {
  const dispatch = useDispatch();
  //커스텀 훅(useInput) 사용
  const [comment, onChangeCommentHandler, commentReset] = useInput();

  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  /**댓글 추가 */
  // const onSubmitCommentHandler = (event) => {
  //   //새로고침 방지
  //   event.preventDefault();

  //   try {
  //     if (comment === "") return;
  //     setIsLoading(true);
  //     dispatch(addComment(postId), { comment });
  //   } catch (error) {
  //     // setError(error);
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);

  //     // reset Input
  //     commentReset();
  //   }
  // };
  const onSubmitCommentHandler = (event) => {
    //새로고침 방지
    event.preventDefault();

    const apiPost = {
      url: `http://13.125.246.47:8080/api/auth/comment/${postId}`,
      method: "POST",
      data: { comment },
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.accessToken,

        // "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY2MjU2ODIwNH0.SnIFHhjOg2VLCMxxrYGdd-UImZNE_Z94rllnseWfNClNrxE8Cx6VNXaj3f8dmSSpfh6GU3R_gr5e8x6Kf1__Kg",
        "Refresh-Token": window.localStorage.refreshToken,
        // "eyJKV1RfSEVBREVSX1BBUkFNX1RZUEUiOiJoZWFkZXJUeXBlIiwiYWxnIjoiSFM1MTIifQ.eyJleHAiOjE2NjMxNzEyMDR9.yXlSZj-NtB7T6P0IBUMTNZMYwHwfOv5oQQta6virA7fd2amSC2homfEOdZ-a0WA-eTCm6BI9FBPQgqxUXWpWLg",
      },
      withCredentials: true,
    };
    console.log(apiPost);
    axios(apiPost);

    //     // reset Input
    commentReset();
  };
  return currentUserId === "" ? (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        alignSelf: "center",
        border: "1px solid #eee",
        borderRadius: "4px",
        height: "5.5rem",
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Typography>로그인 후 이용가능합니다.</Typography>
    </Box>
  ) : (
    <Box sx={{ border: "1px solid #eee", borderRadius: "5px" }}>
      <form onSubmit={onSubmitCommentHandler}>
        <Box sx={{ display: "flex", flexDirection: "row", flex: 1 }}>
          <Avatar sx={{ margin: "1rem" }} />
          <Box sx={{ flex: 10, padding: "1rem" }}>
            <Typography fontWeight="bold">{currentUserId}</Typography>
            <Input
              id="commentInput"
              onChange={onChangeCommentHandler}
              name="comment"
              value={comment}
              placeholder="댓글을 입력하세요(50자 이내)"
              type="text"
              required
              maxLength={50}
              fullWidth
            />
          </Box>

          <button
            style={{
              margin: "16px",
              backgroundColor: "white",
              border: "none",
              cursor: "pointer",
              color: "#1976d2",
            }}>
            {isLoading ? "추가 중..." : <AddBoxRoundedIcon />}
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default AddComment;
