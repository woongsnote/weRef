import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../shared/firebase";

export default function Login() {
    const id_ref = React.useRef();
    const pw_ref = React.useRef();

    const loginFB = async () => {
        const user = await signInWithEmailAndPassword(
          auth,
          id_ref.current.value,
          pw_ref.current.value
        );
      };

    return(
        <div>
            아이디 : <input ref={id_ref} /> <br />
            비밀번호 : <input ref={pw_ref} />
            <br />
            <button onClick={loginFB} >로그인</button>
            
        </div>
    
    )
};

