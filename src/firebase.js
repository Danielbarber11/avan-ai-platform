import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// TODO: Replace the following with your app's Firebase project configuration
// You can get this from the Firebase Console: Project Settings -> General -> Your apps
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
let app;
let auth;
let googleProvider;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    googleProvider = new GoogleAuthProvider();
} catch (error) {
    console.warn("Firebase not configured correctly. Please check firebase.js");
}

export const signInWithGoogle = async () => {
    if (!auth) {
        alert("שגיאה: הגדרות Firebase חסרות.\nאנא פתח את הקובץ src/firebase.js והדבק את המפתחות שלך.");
        return null;
    }
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        alert("שגיאה בהתחברות עם גוגל: " + error.message);
        return null;
    }
};

export const mockSaveToCloud = (data) => {
    console.log('Saving to cloud (Mock):', data);
    // In a real app, this would use Firestore or Realtime Database
    // const db = getFirestore(app);
    // addDoc(collection(db, "data"), data);
    alert('הנתונים נשמרו בענן! (הדמיה)');
};
