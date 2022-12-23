import React from "react";
import { auth } from "../firebase";

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/natours-220f9.appspot.com/o/users%2Fdefault.jpg?alt=media&token=85fed1bd-c023-4d1a-81e3-e6a2a536f950"
        }
        alt="image"
      />
      <p>{text}</p>
    </div>
  );
}

export default ChatMessage;
