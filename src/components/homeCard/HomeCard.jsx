import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const LikeIcon = (props) => {
  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(1);

  const btnPush = () => {
    if (liked === true) {
      setLikeNum(likeNum - 1);
      setLiked(false);
    } else {
      setLikeNum(likeNum + 1);
      setLiked(true);
    }
  };

  if (liked === true) {
    return (
      <IconButton aria-label="add to favorites" onClick={btnPush}>
        <FavoriteIcon />
        <span>{props.likes}</span>
      </IconButton>
    );
  }
  if (liked === false) {
    return (
      <IconButton aria-label="add to favorites" onClick={btnPush}>
        <FavoriteBorderIcon />
        <span>{props.likes}</span>
      </IconButton>
    );
  }
};

export { LikeIcon };

export default function HomeCard(props) {
  console.log(props.title);
  console.log(props.likes);
  // console.log(props.title)

  const navigate = useNavigate();

  const goDetail = () => {
    // navigate(`/posts/${props.id}`);
    navigate(`/posts/2`);
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 345 }} id="goDetail">
        <div onClick={goDetail}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[10] }} src="img" />}
            title={props.author}
            subheader="September 14, 2016"
          />
          <Typography>{props.title}</Typography>
          <CardMedia
            component="img"
            height="150"
            image="/static/images/cards/paella.jpg"
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
          <LikeIcon likes={props.likes} />
        </CardActions>
      </Card>
    </Grid>
  );
}
