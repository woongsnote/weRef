import React from "react";
import { useState } from "react";

import Header from "../header/Header";
import HomeCrad from "../homeCard/HomeCrad";

import { Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Home() {
    const navigate = useNavigate()

    const [loginCheck, setLoginCheck] = useState(true);

    const goAddPost=()=>{
        loginCheck === true ? navigate('/addPost') : alert('로그인 해주세요!')
    }

    return(
        <>
            <Header />
            <Button variant="contained"
            onClick={goAddPost}>글쓰기</Button>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={3} columns={16}>
                    <HomeCrad />
                    <HomeCrad />
                    <HomeCrad />
                    <HomeCrad />
                    <HomeCrad />
                </Grid>
            </Box>
        </>
    )
};
