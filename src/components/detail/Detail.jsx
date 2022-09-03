import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  FormControl,
  Link,
  Paper,
  Avatar,
  Card,
  CardContent,
  Typography,
  CardActions,
  CardHeader,
  Input,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
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

        {links.map((link, index) => {
          return (
            <LinkItem key={index}>
              <Link href={link}>{link}</Link>
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
                {editMode ? "Save" : "Edit"}
              </Button>
              <Button
                onClick={() => {
                  if (editMode) console.log("cancel");
                  else console.log("delete");
                }}
              >
                {editMode ? "Cancel" : "Del"}
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

    return (
      <FormControl>
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <Avatar></Avatar>
          <Typography>{currentUserId}</Typography>
          <Input></Input>
          <Button>
            <AddBoxRoundedIcon />
          </Button>
        </Card>
      </FormControl>
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
          </Grid>
          <Grid item xs={8}>
            <Item>
              <h2>{data.title}</h2>
              <p>{data.description}</p>
            </Item>
            <RefList />
          </Grid>
        </Grid>
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
