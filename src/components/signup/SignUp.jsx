import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth,db } from "../../shared/firebase"
import {collection, addDoc} from "firebase/firestore";
import SignUpView, { id_ref, pw_ref,name_ref } from "./SignUpView";
// import uuid from 'react-uuid'
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../redux/modules/users";
import { nanoid } from "@reduxjs/toolkit";
import React,{ useEffect, useRef, useState } from "react";


export default function SignUp() {
    
    const dispatch = useDispatch()
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
            id:nanoid(),
            username: usernameInput.current.value,
            name: nameInput.current.value,
            password : passwordInput.current.value,
        };            
        dispatch(createUserThunk(newUser));
    };
        
    return(
        <div className="SignUp">
            {/* <SignUpView /> */}
            <div>
            username : <input ref={usernameInput} type="text"/> <br />
            name : <input ref={nameInput} type="text"/> <br />
            password : <input ref={passwordInput} type="text"/>
            </div>
        <button onClick={signupClickHandler}>회원가입</button>
        </div>
    )
};
