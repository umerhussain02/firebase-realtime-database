import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA0_PvrFLxYyJirFNS5-UBGtp4Ft2qpnwI",
  authDomain: "project-1-ad5a0.firebaseapp.com",
  databaseURL: "https://project-1-ad5a0-default-rtdb.firebaseio.com/",
  projectId: "project-1-ad5a0",
  storageBucket: "project-1-ad5a0.appspot.com",
  messagingSenderId: "465085940286",
  appId: "1:465085940286:web:0eaade9710486c35c0c76f",
};

export const app = initializeApp(firebaseConfig);
