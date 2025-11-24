// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "avan-ai.firebaseapp.com",
    projectId: "avan-ai",
    storageBucket: "avan-ai.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456",
    measurementId: "G-ABCDEF123"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const mockSaveToCloud = async (data) => {
    console.log("Saving to Avan Cloud...", data);
    return new Promise((resolve) => setTimeout(resolve, 1000));
};

export const mockLoginWithGoogle = async () => {
    console.log("Logging in with Google...");
    return new Promise((resolve) => setTimeout(() => resolve({ user: "Google User" }), 1500));
};
