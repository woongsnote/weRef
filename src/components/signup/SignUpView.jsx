import React from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../shared/firebase";
import { collection, addDoc } from "firebase/firestore";


const SignUpView = () => {
  const id_ref = React.useRef();
  const name_ref = React.useRef();
  const pw_ref = React.useRef();

  const signupFB = async () => {
    const user = await createUserWithEmailAndPassword(
      auth,
      id_ref.current.value,
      pw_ref.current.value
    );
    console.log(user);

    const user_data = await addDoc(collection(db, "users"), {
      user_id: id_ref.current.value,
      name: name_ref.current.value,
    });
    console.log(user_data.id);
  }

  
  return (
    <div>
      아이디 : <input ref={id_ref} /> <br />
      이름 : <input ref={name_ref} /> <br />
      비밀번호 : <input ref={pw_ref} />
      <button onClick={signupFB}>회원가입</button>
    </div>
  );
};

export const id_ref = "id_ref"
export const pw_ref = "pw_ref"

export default SignUpView;