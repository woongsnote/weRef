/** 댓글 리스트 */
import { Box } from "@mui/material";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getComments } from "../../redux/modules/comments";
const CommentList = ({ postId, currentUserId }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getComments(postId));
  // }, []);

  const { commentList } = useSelector((state) => state.comments);

  return (
    <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
      {/* 새 댓글 추가 */}
      <AddComment currentUserId={currentUserId} postId={postId} />
      {/* 가져온 댓글 목록 */}
      {commentList.length === 0 ? <Box>아직 댓글이 없어요</Box> : null}

      {commentList.map((comment) => {
        return (
          <Comment
            key={comment.id}
            author={comment.username}
            comment={comment.comment}
            currentUserId={currentUserId}
            id={comment.id}
          />
        );
      })}
    </Box>
  );
};

export default CommentList;
