import React, { useState } from "react";

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
  const onSubmitCommentHandler = (event) => {
    //새로고침 방지
    event.preventDefault();

    try {
      if (comment === "") return;
      setIsLoading(true);
      const data = {
        post: postId,
        username: currentUserId,
        comment: comment,
      };
      console.log(data);
      dispatch(addComment(data));
    } catch (error) {
      // setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);

      // reset Input
      commentReset();
    }
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
      }}
    >
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
            }}
          >
            {isLoading ? "추가 중..." : <AddBoxRoundedIcon />}
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default AddComment;
