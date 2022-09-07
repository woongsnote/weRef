import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import SignUpView, { id_ref, pw_ref, name_ref } from "./SignUpView";
// import uuid from 'react-uuid'
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../redux/modules/users";
import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@material-ui/core/TextField";
import Box from "@mui/material/Box";
// import styled from 'styled-components;'
// import { StylesProvider } from '@material-ui/core/styles';
import axios from "axios";

export default function SignUp() {
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const nameInput = useRef(null);
  const passwordInput = useRef(null);
  // console.log(usernameInput)
  useEffect(() => {
    // dispatch(__deleteReviews())
    dispatch(createUserThunk());
    }, [dispatch]);

  const signupClickHandler = async () => {
    // e.preventDefault();
    const newUser = {
    //   id: nanoid(),
      username: usernameInput.current.value,
      nickname: nameInput.current.value,
      password: passwordInput.current.value,
      passwordConfirm: passwordInput.current.value

    };
    axios({ url:"http://13.125.246.47:8080/api/member/signup", 
    method:"POST",
    data:newUser,
    withCredentials:true})
    // dispatch(createUserThunk(newUser));
  };

  return (
    <div className="SignUp">
      {/* <SignUpView /> */}
      {/* <StylesProvider injectFirst>
    <BoxContainer> */}

    <div>
        username : <input ref={usernameInput} type="text" /> <br />
        nickname : <input ref={nameInput} type="text" /> <br />
        password : <input ref={passwordInput} type="password" />
    </div>
    <div>
        <TextField
            error
            id="filled-error"
            label="Error"
            defaultValue="username을 입력하세요"
            variant="filled"
        />
        <TextField
            error
            id="filled-error-helper-text"
            label="Error"
            defaultValue="Hello World"
            helperText="Incorrect entry."
            variant="filled"
        />
    </div>
    <Button variant="contained" onClick={signupClickHandler}>
        회원가입
    </Button>
      {/* <button onClick={signupClickHandler}>회원가입</button> */}
    {/* </BoxContainer>
    </StylesProvider> */}
    </div>

  );
}


// const BoxContainer = styled.div `
//   padding: 6px 12px;
//   border-radius: 8px;
//   font-size: 1rem;
//   line-height: 1.5;
//   border: 1px solid lightgray;
//   color: gray;
//   background: white;
// `;