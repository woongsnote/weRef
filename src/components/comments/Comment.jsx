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

const Comment = ({ author, content, currentUserId }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <Card sx={{ display: "flex", margin: "1rem auto" }}>
      <CardHeader avatar={<Avatar></Avatar>}></CardHeader>
      <CardContent sx={{ flex: 10, paddingLeft: 0 }}>
        <Typography fontWeight="bold">{author}</Typography>
        {editMode && currentUserId === author ? (
          <Input fullWidth>{content}</Input>
        ) : (
          <Typography>{content}</Typography>
        )}
      </CardContent>

      {/* 로그인한 사람이 쓴 댓글이면 버튼 보이기 */}

      <CardActions>
        {currentUserId === author ? (
          <>
            <Button
              onClick={() => {
                if (editMode === false) {
                  console.log("edit");
                  setEditMode(!editMode);
                } else {
                  console.log("save");
                  setEditMode(!editMode);
                }
              }}
            >
              {editMode ? <SaveRoundedIcon /> : <EditRoundedIcon />}
            </Button>
            <Button
              onClick={() => {
                if (editMode) console.log("cancel");
                else console.log("delete");
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
