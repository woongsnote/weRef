import React from "react";

import { 
    Button,
    ButtonGroup,
 } from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

export default function Header() {
    return(
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        WeReF
                    </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">SignUp</Button>
                </Toolbar>
            </AppBar>
        </Box>
    //     <>
            
    //         <ButtonGroup
    //             disableElevation
    //             variant="contained"
    //             aria-label="Disabled elevation buttons"
    //             >
    //             <Button style={{"height":'40px'}}variant="contained">
    //                     로그인
    //             </Button>
    //             <Button style={{"height":'40px'}}>회원가입</Button>
    //         </ButtonGroup>
    //   </>
    )
};
