import {React, useEffect, useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../../shared/firebase";
import { collection, addDoc } from "firebase/firestore";
import { createUserThunk } from "../../redux/modules/users";
import { useDispatch } from "react-redux";


const SignUpView = () => {
  const dispatch = useDispatch()

  const id_ref = React.useRef();
  const name_ref = React.useRef();
  const pw_ref = React.useRef();  
  const usernameInput = useRef(null);
  const nameInput = useRef(null);
  const passwordInput = useRef(null);


  const signupFB = async () => {
    dispatch(
    createUserThunk(    
      {
      user_id: id_ref.current.value,
      name: name_ref.current.value,
<<<<<<< HEAD
    });
    console.log(user_data.id);
  };

=======
      }
      )
    )  
  }
  // console.log(id_ref.current.value)
  
>>>>>>> 8041aca6b620eb46cb5d7b7a03730b01bf6159e3
  return (
    <div>
      username : <input ref={usernameInput} /> <br />
      name : <input ref={nameInput} /> <br />
      password : <input ref={passwordInput} />
      {/* passwordcheck */}
      {/* <button onClick={signupFB}>회원가입</button> */}
    </div>
  );
};

<<<<<<< HEAD
export const id_ref = "id_ref";
export const pw_ref = "pw_ref";
=======
// export const id_ref = "id_reffff"
// export const pw_ref = "pw_ref"
// export const name_ref = "name_ref"
// export {usernameInput, nameInput, passwordInput}

>>>>>>> 8041aca6b620eb46cb5d7b7a03730b01bf6159e3

export default SignUpView;
