import React from "react";
import { auth } from "../utils/firebase";

function ChatMessage(props) {
  const { text, uid, photoURL, img } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img
        src={
          photoURL ||
          "https://firebasestorage.googleapis.com/v0/b/natours-220f9.appspot.com/o/users%2Fdefault.jpg?alt=media&token=85fed1bd-c023-4d1a-81e3-e6a2a536f950"
        }
        alt="image"
        className="img_author"
      />
      <div className="chat">
        {img && <img src={img} alt="" className="img_chat" />}
        {text !== "" && <p className="text_chat">{text}</p>}
      </div>
    </div>
  );
}

export default ChatMessage;
