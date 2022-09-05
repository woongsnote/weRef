import { Box, Avatar, Typography, Input } from "@mui/material";
// import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import useInput from "../../hooks/useInput";
import { useState } from "react";
import { apis } from "../../shared/api";

const AddComment = ({ setComments, comments, currentUserId, postId }) => {
  //커스텀 훅(useInput) 사용
  const [comment, onChangeCommentHandler, commentReset] = useInput();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmitCommentHandler = async (event) => {
    event.preventDefault();

    try {
      if (comment === "") return;

      setIsLoading(true);

      const { data } = await apis.addComment();

      setComments([...comments, data]);
    } catch (error) {
      setError(error);
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
            }}
          >
            {/* <AddBoxRoundedIcon /> */}
            {isLoading ? "추가 중..." : "추가하기"}
          </button>
        </Box>
      </form>
    </Box>
  );
};

export default AddComment;
