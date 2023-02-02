import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAQvW3xHMN5dhge4Z5YqA03v_uC7cPp38Y",
    authDomain: "crew-view-project.firebaseapp.com",
    projectId: "crew-view-project",
    storageBucket: "crew-view-project.appspot.com",
    messagingSenderId: "569371603476",
    appId: "1:569371603476:web:433d94f5501f7551aead01"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  export default app