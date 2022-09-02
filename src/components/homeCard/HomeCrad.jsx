import React from "react";

import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';





export default function HomeCrad() {

    return(
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[10] }} src="" />
                }
                title="닉네임"
                subheader="September 14, 2016"
            />
            <Typography>
                'React - 무슨무슨 기능' 이라는 내용이 들어갈 제목이에옹
            </Typography>
            <CardMedia
                component="img"
                height="150"
                image="/static/images/cards/paella.jpg"
                
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    내가 뭘 공부했는데 이 유튜버나 강의가 도움이 되었다라는 내용이에오
                    {/* 40자까지 미리보기 예정 */}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <FavoriteBorderIcon />
                <FavoriteIcon/>
                <span>0</span>
                </IconButton> 
            </CardActions>
            </Card>
        </Grid>
    )
};
