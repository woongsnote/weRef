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
import "./SignUp.css";
import FormControl from "@mui/material/FormControl";

import React, { useEffect, useRef, useState } from "react";

export default function SignUp() {
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordConfirmInput = useRef(null);
  const { nanoid } = require("nanoid");
  const [isUsername, setisUsername] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("usernamemsgtest");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // console.log(usernameInput)
  useEffect(() => {
    // dispatch(__deleteReviews())
    dispatch(createUserThunk());
  }, [dispatch]);

  //   const usernameRegex =
  //   /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
  //   const userCurrent = usernameInput.current.value
  //   // const userCurrent = usernameInput
  //   console.log(userCurrent)
  // setisUsername(userCurrent)

  // if (!usernameRegex.test(userCurrent)) {
  //   setUsernameMessage('아이디 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
  // } else {
  //   setUsernameMessage('올바른 아이디 형식이에요 : )')
  //   setisUsername(true)
  // }

  const signupClickHandler = async () => {
    const newUser = {
      id: nanoid(),
      username: usernameInput.current.value,
      // nickname: usernameInput.current.value,
      password: passwordInput.current.value,
      passwordConfirm: passwordConfirmInput.current.value,
    };

    const usernameRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const userCurrent = usernameInput.current.value;
    // const userCurrent = usernameInput
    setisUsername(userCurrent);
    console.log(isUsername);
    console.log(userCurrent);
    console.log(usernameInput);

    if (!usernameRegex.test(userCurrent)) {
      setUsernameMessage("아이디 형식이 틀렸어요! 다시 확인해주세요");
    } else {
      setUsernameMessage("올바른 아이디 형식이에요 : )");
      // setisUsername(true)
    }

    axios({
      id: nanoid(),
      // url: "http://13.125.246.47:8080/api/member/signup",
      url: "http://localhost:3001/users",
      method: "POST",
      data: newUser,
      withCredentials: true,
    });
    // dispatch(createUserThunk(newUser));
  };

  return (
    <div className="SignUp">
      <div>
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 2, width: "50ch" },
          }}
          noValidate
          autoComplete="off">
          {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        <TextField id="filled-basic" label="Filled" variant="filled" /> */}
          <TextField
            id="standard-basic"
            label="UserID"
            variant="standard"
            ref={usernameInput}
            type="text"
          />
          <TextField id="standard-basic" label="Password" variant="standard" />
          <TextField
            id="standard-basic"
            label="PasswordConfirm"
            variant="standard"
          />
        </Box>
      </div>
      <div>
        {/* username : <input  type="text" /> <br /> */}
        username : <input ref={usernameInput} type="text" /> <br />
        <div>{usernameMessage}</div>
        password : <input ref={passwordInput} type="password" /> <br />
        passwordConfirm : <input ref={passwordConfirmInput} type="password" />
      </div>
      <div></div>
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
