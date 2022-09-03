import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Link,
  Paper,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Input,
  TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import Image from "mui-image";

import Header from "../header/Header";
import { RESP } from "../../shared/response";

const Detail = () => {
  //로그인한 사용자 ID(임시값)
  const currentUserId = "tester1";
  //데이터 가져오는 동안 로딩 처리
  const [isLoading, setLoading] = useState(true);
  //받아온 데이터 상태관리
  const [data, setData] = useState({});
  //받아온 댓글 상태 관리
  const [comments, setComments] = useState([]);

  const [editMode, setEditMode] = useState(false);

  const [comment, setComment] = useState();

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

  /** 레퍼런스 링크 리스트 */
  const RefList = () => {
    return (
      <Box>
        <h3>Reference List</h3>

        {links.map(({ refUrl }, index) => {
          return (
            <LinkItem key={index}>
              <Link href={refUrl}>{refUrl}</Link>
            </LinkItem>
          );
        })}
      </Box>
    );
  };

  /** 댓글 리스트 */
  const CommentList = () => {
    return (
      <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
        {/* 새 댓글 추가 */}
        <AddComment />
        {/* 가져온 댓글 목록 */}
        {comments.length === 0 ? <Box>아직 댓글이 없어요</Box> : null}

        {comments.map((comment) => {
          return (
            <Comment
              key={comment.writer}
              author={comment.writer}
              content={comment.comment}
            />
          );
        })}
      </Box>
    );
  };

  /** 댓글 컴포넌트 */

  const Comment = ({ author, content }) => {
    return (
      <Card sx={{ display: "flex", margin: "1rem auto" }}>
        <CardHeader sx={{ flex: "1" }} avatar={<Avatar></Avatar>}></CardHeader>
        <CardContent sx={{ flex: "8" }}>
          <Typography>{author}</Typography>
          {editMode && currentUserId === author ? (
            <Input>{content}</Input>
          ) : (
            <Typography>{content}</Typography>
          )}
        </CardContent>

        {/* 로그인한 사람이 쓴 댓글이면 버튼 보이기 */}

        <CardActions sx={{ flex: "1" }}>
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

  const AddComment = () => {
    const AddHandler = (e) => {
      e.preventDefault();
      console.log("댓글 추가");
    };

    const onChangeHandler = () => {
      console.log(comment);
    };

    return (
      <Card sx={{ display: "flex", flexDirection: "row" }}>
        <CardHeader sx={{ flex: "1" }} avatar={<Avatar></Avatar>}></CardHeader>
        <CardContent sx={{ flex: "8" }}>
          <Typography fontWeight="bold">{currentUserId}</Typography>
          <TextField fullWidth id="fullWidth" onChange={onChangeHandler} />
        </CardContent>

        <Button>
          <AddBoxRoundedIcon />
        </Button>
      </Card>
    );
  };

  return isLoading ? (
    <Box>정보를 가져오는 중입니다.. </Box>
  ) : (
    <>
      <Header />
      {currentUserId === data.writer ? <EditButton /> : null}

      {/* 작성한 내용 표시 */}
      <Box sx={{ border: "1px solid #eee" }} m={2} p={3} borderRadius={2}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Item>
              <Image src={data.imageUrl} alt="description" />
            </Item>
            <FavoriteBorderRoundedIcon />
            {data.likes} likes
          </Grid>
          <Grid item xs={8}>
            <Item>
              <h2>{data.title}</h2>
            </Item>
            <RefList />
          </Grid>
        </Grid>
        <Item>{data.description}</Item>
      </Box>
      <CommentList />
    </>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const LinkItem = styled(Item)(({ theme }) => ({
  margin: theme.spacing(2),
}));

export default Detail;
