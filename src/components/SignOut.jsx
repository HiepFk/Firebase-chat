import React from "react";
import { auth } from "../utils/firebase";
// import { successAlert, errorAlert } from "../utils/alert";
// import { toast } from "react-toastify";
function SignOut() {
  return (
    auth.currentUser && (
      <button className="sign-out" onClick={() => auth.signOut()}>
        Sign Out
      </button>
    )
  );
}

export default SignOut;
