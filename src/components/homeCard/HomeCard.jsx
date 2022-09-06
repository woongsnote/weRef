import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import { updatePosts } from "../../redux/modules/post";
import { updateHeart, addHeart, deleteHeart } from "../../redux/modules/heart";

import { useEffect } from "react";

const LikeIcon = (props) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(0);

  const data = useSelector((state) => state.post.posts);
  const newData = [...data].filter((item) => item.id === props.id)[0];

  useEffect(() => {
    setLikeNum(newData.heartCnt);
  }, []);

  const btnPush = () => {
    let putData = {
      userId: newData.userId,
      title: newData.title,
      description: newData.description,
      author: newData.author,
      imgUrl: newData.imgUrl,
      createAt: newData.createAt,
      modifiedAt: newData.modifiedAt,
      heartCnt: likeNum,
      id: newData.id,
    };
    let postHeart = {
      userId: "userId",
      id: newData.id,
    };

    if (liked === false) {
      setLiked(true);
      setLikeNum(likeNum + 1);
      putData.heartCnt = likeNum + 1;
      dispatch(updatePosts(putData));
      dispatch(addHeart(postHeart));
    } else {
      setLiked(false);
      setLikeNum(likeNum - 1);
      putData.heartCnt = likeNum - 1;
      dispatch(updatePosts(putData));
      dispatch(deleteHeart());
    }
  };

  if (liked === true) {
    return (
      <IconButton aria-label="add to favorites" onClick={btnPush}>
        <FavoriteIcon />
        <span>{likeNum}</span>
      </IconButton>
    );
  }
  if (liked === false) {
    return (
      <IconButton aria-label="add to favorites" onClick={btnPush}>
        <FavoriteBorderIcon />
        <span>{likeNum}</span>
      </IconButton>
    );
  }
};
export { LikeIcon };

export default function HomeCrad(props) {
  const navigate = useNavigate();

  const goDetail = () => {
    // navigate(`/posts/${props.id}`);
    navigate(`/posts/1`);
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }} id="goDetail">
        <div onClick={goDetail}>
          <CardHeader
            // avatar={<Avatar sx={{ bgcolor: red[10] }} src="img" />}
            title={props.author}
            subheader="September 14, 2016"
          />
          <Typography>{props.title}</Typography>
          <CardMedia
            component="img"
            height="150"
            image={
              props.imgUrl === undefined
                ? require("../../image/WEREF_empty_img.png")
                : props.imgUrl
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {props.description}
              {/* 40자까지 미리보기 예정 */}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          {/* 좋아요버튼 컴포넌트 */}
          <LikeIcon id={props.id} heartCnt={props.heartCnt} />
        </CardActions>
      </Card>
    </Grid>
  );
}
