import React from "react";
import { loginUserThunk } from "../../redux/modules/users";
import { useDispatch } from 'react-redux';
import { useState } from "react";


export default function Login() {
    const dispatch = useDispatch()
    const [user_ID, setuser_ID] = useState({
      user_ID: "",
    });
    const [user_PW, setuser_PW] = useState({
      user_PW: "",
    });


    const loginFB =  () => {
        dispatch(
          loginUserThunk({
          email: user_ID.user_ID,
          password: user_PW.user_PW
          })
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

