import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth,db } from "../../shared/firebase"
import {collection, addDoc} from "firebase/firestore";
import SignUpView from "./SignUpView";


export default function SignUp() {

    const signup = async () => {

        const user = await createUserWithEmailAndPassword(auth, "devdev@aaa.com", "devdev123!");
        console.log(user);
        const user_data = await addDoc(collection(db, "users"), {user_id: "1111", name: "perl"});
        console.log(user_data.id);
    }
    
    return(
        <div className="SignUp">
            <SignUpView />
        <button onClick={signup}>회원가입</button>
        </div>
    )
};
