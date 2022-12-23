import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2t_HjQYsNuK7-lgvGPF6StodcuHPrEFc",
  authDomain: "grocery-store-fk.firebaseapp.com",
  projectId: "grocery-store-fk",
  storageBucket: "grocery-store-fk.appspot.com",
  messagingSenderId: "403058726796",
  appId: "1:403058726796:web:c91a078f57aeb9ebf628a9",
  measurementId: "G-6VKGVR2S3G",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export const firestore = getFirestore(app);

export default app;
