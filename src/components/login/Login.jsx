import React from "react";
import { loginUserThunk } from "../../redux/modules/users";
import { useDispatch } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"
import { Button } from "@mui/material";


export default function Login() {
    const dispatch = useDispatch()
    const [user_ID, setuser_ID] = useState({
    user_ID: "",
    });
    const [user_PW, setuser_PW] = useState({
    user_PW: "",
    });
    const navigate = useNavigate()

    const loginFB =  () => {
        dispatch(
            loginUserThunk({
            username: user_ID,
            password: user_PW
        })
        );
        navigate("/");
 
    };

    console.log(user_PW)


    return(
        <div className="Login">
        
            아이디 :           
            <input
            type="text"
            onChange={(ev) => {
              setuser_ID(ev.target.value);
            }}
          />
 <br />
            비밀번호 : 
            <input
            type="text"
            onChange={(ev) => {
                setuser_PW(ev.target.value);
              }}
          />
            <br />
            <Button variant="contained" onClick={loginFB}>
            로그인
            </Button>    
        </div>
    
    )
};

