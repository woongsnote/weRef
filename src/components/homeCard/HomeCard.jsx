import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./HomeCardStyle.css";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch, useSelector } from "react-redux";
import {
  updateHeart,
  addDelHeart,
  heartCheck,
} from "../../redux/modules/heart";

import { useEffect } from "react";

import { accessToken } from "../../utils/tokens";

const LikeIcon = (props) => {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);
  const [likeNum, setLikeNum] = useState(0);
  const [loginCheck, setLoginCheck] = useState(true);

  const data = useSelector((state) => state.posts.posts);
  const newData = [...data].filter((item) => item.id === props.id)[0];

  const heartData = useSelector((state) => state.heart);

  useEffect(() => {
    setLikeNum(newData.cntHeart);
    accessToken() === undefined ? setLoginCheck(false) : setLoginCheck(true);
    dispatch(heartCheck(newData.id));
  }, []);

  // console.log(heartData)

  const btnPush = () => {
    // let putData = {
    //   userId: newData.userId,
    //   title: newData.title,
    //   description: newData.description,
    //   author: newData.author,
    //   imgUrl: newData.imgUrl,
    //   createAt: newData.createAt,
    //   modifiedAt: newData.modifiedAt,
    //   refUrl: newData.referenceList,
    //   cntHeart: likeNum,
    //   id: newData.id,
    // };
    let postHeart = {
      userId: "userId",
      id: newData.id,
    };

    if (loginCheck === false) {
      alert("로그인 해주세요!");
    } else {
      if (liked === false) {
        setLiked(true);
        setLikeNum(likeNum + 1);
        // putData.cntHeart = likeNum + 1;
        // dispatch(updateHeart(putData));
        dispatch(addDelHeart(postHeart));
      } else {
        setLiked(false);
        setLikeNum(likeNum - 1);
        // putData.cntHeart = likeNum - 1;
        // dispatch(updateHeart(putData));
        dispatch(addDelHeart(postHeart));
      }
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

export default function HomeCard(props) {
  const navigate = useNavigate();

  const goDetail = () => {
    navigate(`/posts/${props.id}`);
  };

  return (
    <Grid item xs={4}>
      <Card sx={{ maxWidth: 300 }} id="goDetail">
        <div onClick={goDetail}>
          <CardHeader
            // avatar={<Avatar sx={{ bgcolor: red[10] }} src="img" />}
            title={props.author}
            subheader=""
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
              {props.description.length > 45
                ? props.description.substring(0, 45) + "..."
                : props.description}
              {/* 40자까지 미리보기 예정 */}
            </Typography>
          </CardContent>
        </div>
        <CardActions disableSpacing>
          {/* 좋아요버튼 컴포넌트 */}
          <LikeIcon id={props.id} cntHeart={props.cntHeart} />
        </CardActions>
      </Card>
    </Grid>
  );
}
