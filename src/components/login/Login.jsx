import React from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../shared/firebase";
import { loginUserThunk } from "../../redux/modules/users";
import { useDispatch } from 'react-redux';
import { id_ref, pw_ref } from "../signup/SignUpView";
import { useState } from "react";


export default function Login() {
    const id_ref = React.useRef();
    const pw_ref = React.useRef();
    const dispatch = useDispatch()
    const [user_ID, setuser_ID] = useState({
      user_ID: "",
    });
    const [user_PW, setuser_PW] = useState({
      user_PW: "",
    });

    // console.log(user_ID.user_ID)

    const loginFB = async () => {
      // const response = await dispatch(createUserThunk(newUser));
        const data = await dispatch(
          loginUserThunk([{
          email: user_ID.user_ID,
          password: user_PW.user_PW
          }])
        ); 
    };

    return(
        <div>
            아이디 :           
            <input
            type="text"
            onChange={(ev) => {
              const { value } = ev.target;
              setuser_ID({
                user_ID: value
              });
            }}
          />
 <br />
            비밀번호 : 
            <input
            type="text"
            onChange={(ev) => {
              const { value } = ev.target;
              setuser_PW({
                user_PW: value
              });
            }}
          />
            <br />
            <button onClick={loginFB} >로그인</button>           
        </div>
    
    )
};

