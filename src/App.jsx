import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./utils/firebase";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import ChatRoom from "./components/ChatRoom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user] = useAuthState(auth);
  return (
    <>
      <ToastContainer />

      <div className="App">
        <header>
          <h1>⚛️🔥💬</h1>
          <SignOut />
        </header>

        <section>{user ? <ChatRoom user={user} /> : <SignIn />}</section>
      </div>
    </>
  );
}

export default App;
