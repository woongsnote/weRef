import React from "react";

import styled from "styled-components";

import Header from "../header/Header";
import HomeCrad from "../homeCard/HomeCrad";

import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


export default function Home() {
    return(
        <>
            <Header />
            <Link to={'/addPost'}><Button variant="contained">글쓰기</Button></Link>
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
