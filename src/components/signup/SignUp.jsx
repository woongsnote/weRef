import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth,db } from "../../shared/firebase"
import {collection, addDoc} from "firebase/firestore";
import SignUpView, { id_ref, pw_ref } from "./SignUpView";
// import uuid from 'react-uuid'
import { useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { useDispatch } from "react-redux";
import { createUserThunk } from "../../redux/modules/users";


export default function SignUp() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()

        const signupClickHandler = async () => {
            const newUser = {
                // userID: uuidV4(),
                email: id_ref,
                password : pw_ref
            };
            // setEmail("");
            // setPassword("");
            // setPasswordConfirmation("");
            
            const response = await dispatch(createUserThunk(newUser));
            if (response.payload === "Signup succeeded.") {
                navigator("/");
            }    
    };
    

    
    
    return(
        <div className="SignUp">
            <SignUpView />
        <button onClick={signupClickHandler}>회원가입</button>
        </div>
    )
};
