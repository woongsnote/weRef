/** 댓글 컴포넌트 */
import {
  Card,
  CardHeader,
  Avatar,
  CardContent,
  CardActions,
  Typography,
  Input,
  Button,
} from "@mui/material";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, updateComment } from "../../redux/modules/comments";

const Comment = ({ author, comment, currentUserId, id }) => {
  const [editMode, setEditMode] = useState(false);
  const [editComment, setEditComment] = useState(comment);

  const dispatch = useDispatch();

  /** 댓글 삭제 */
  const onDelete = (_id) => {
    dispatch(deleteComment(_id));
  };

  /** 댓글 수정 */
  const onUpdate = (_id, _content) => {
    dispatch(updateComment({ id: _id, content: _content }));
  };

  /** 댓글 내용 수정 감지 */
  const onChangeHandler = (event) => {
    setEditComment(event.target.value);
  };

  return (
    <Card sx={{ display: "flex", margin: "1rem auto" }}>
      <CardHeader avatar={<Avatar></Avatar>}></CardHeader>
      <CardContent sx={{ flex: 1, paddingLeft: 0 }}>
        <Typography fontWeight="bold" width={"50%"}>
          {author}
        </Typography>
        {editMode && currentUserId === author ? (
          <Input
            fullWidth
            placeholder={comment}
            value={editComment}
            onChange={onChangeHandler}
          ></Input>
        ) : (
          <Typography flex={5}>{comment}</Typography>
        )}
      </CardContent>

      {/* 로그인한 사람이 쓴 댓글이면 버튼 보이기 */}

      <CardActions>
        {currentUserId === author ? (
          <>
            <Button
              onClick={() => {
                editMode ? onUpdate(id, editComment) : setEditMode(!editMode);
              }}
            >
              {editMode ? <SaveRoundedIcon /> : <EditRoundedIcon />}
            </Button>
            <Button
              onClick={() => {
                editMode ? setEditMode(!editMode) : onDelete(id);
              }}
            >
              {editMode ? <UndoRoundedIcon /> : <DeleteRoundedIcon />}
            </Button>
          </>
        ) : null}
      </CardActions>
    </Card>
  );
};
export default Comment;
