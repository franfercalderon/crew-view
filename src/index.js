import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
import './styles/styles.sass'

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAQvW3xHMN5dhge4Z5YqA03v_uC7cPp38Y",
//   authDomain: "crew-view-project.firebaseapp.com",
//   projectId: "crew-view-project",
//   storageBucket: "crew-view-project.appspot.com",
//   messagingSenderId: "569371603476",
//   appId: "1:569371603476:web:433d94f5501f7551aead01"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

//Export app
// export default app


// Initialize Firebase Authentication and get a reference to the service
// const auth = getAuth(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
