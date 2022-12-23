import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, query, orderBy, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestore, auth, storage } from "../utils/firebase";

import styled from "styled-components";

import ChatMessage from "./ChatMessage";
import FileUpload from "./FileUpload";
function ChatRoom() {
  const dummy = useRef();

  const messagesRef = collection(firestore, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt"));
  const [messages] = useCollectionData(messagesQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");
  const [img, setImg] = useState(null);
  const [showImg, setShowImg] = useState(null);

  const uploadImg = async (file, uid, photoURL) => {
    const today = new Date().toISOString();
    const imageRef = ref(storage, `/messages/${today + file.name}`);

    await uploadBytes(imageRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        addDoc(messagesRef, {
          text: formValue,
          createdAt: new Date(),
          uid,
          photoURL,
          img: url,
        });
      });
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    if (img) {
      await uploadImg(img, uid, photoURL);
    } else {
      addDoc(messagesRef, {
        text: formValue,
        createdAt: new Date(),
        uid,
        photoURL,
        img: null,
      });
    }

    setFormValue("");
    setImg(null);
    setShowImg(null);
  };

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  });

  return (
    <Wrapper>
      <main>
        {messages &&
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <FileUpload showImg={showImg} setShowImg={setShowImg} setImg={setImg} />

        <button type="submit" disabled={!formValue && !img}>
          🐍
        </button>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  main {
    padding: 10px;
    height: 80vh;
    margin: 10vh 0 10vh;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
  }

  main::-webkit-scrollbar {
    width: 0.25rem;
  }

  main::-webkit-scrollbar-track {
    background: #1e1e24;
  }

  main::-webkit-scrollbar-thumb {
    background: #6649b8;
  }
  form {
    height: 10vh;
    position: fixed;
    bottom: 0;
    background-color: rgb(24, 23, 23);
    width: 100%;
    max-width: 728px;
    display: flex;
    font-size: 1.5rem;
  }

  form button {
    width: 20%;
    background-color: rgb(56, 56, 143);
  }

  input {
    line-height: 1.5;
    width: 100%;
    font-size: 1.5rem;
    background: rgb(58, 58, 58);
    color: white;
    outline: none;
    border: none;
    padding: 0 10px;
  }

  button {
    background-color: #282c34;
    border: none;
    color: white;
    padding: 15px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    cursor: pointer;
    font-size: 1.25rem;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default ChatRoom;
