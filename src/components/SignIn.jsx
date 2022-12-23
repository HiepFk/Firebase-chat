import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { successAlert, errorAlert } from "../utils/alert";
import { toast } from "react-toastify";

function SignIn() {
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        successAlert(toast, "User signed");
      })
      .catch((error) => {
        errorAlert(toast, "Eror");
      });
  };

  return (
    <button className="sign-in" onClick={signInWithGoogle}>
      Sign in with Google
    </button>
  );
}

export default SignIn;
