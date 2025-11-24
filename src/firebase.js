```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// You can get this from the Firebase Console: Project Settings -> General -> Your apps
const firebaseConfig = {
    apiKey: "AIzaSyACNoSZCE1klwD-fXtyJtf7pwKMD_LFgbA",
    authDomain: "avan-ai-platform.firebaseapp.com",
    projectId: "avan-ai-platform",
    storageBucket: "avan-ai-platform.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // User needs to find this if they want notifications
    appId: "YOUR_APP_ID" // User needs to find this
};

// Initialize Firebase
let app;
let auth;
let db;
let googleProvider;
let appleProvider;

try {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    googleProvider = new GoogleAuthProvider();
    appleProvider = new OAuthProvider('apple.com');
} catch (error) {
    console.warn("Firebase not configured correctly. Please check firebase.js", error);
}

export const signInWithGoogle = async () => {
    if (!auth) return null;
    try {
        const result = await signInWithPopup(auth, googleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Google", error);
        alert("שגיאה בהתחברות עם גוגל: " + error.message);
        return null;
    }
};

export const signInWithApple = async () => {
    if (!auth) return null;
    try {
        const result = await signInWithPopup(auth, appleProvider);
        return result.user;
    } catch (error) {
        console.error("Error signing in with Apple", error);
        alert("שגיאה בהתחברות עם אפל (דורש הגדרות נוספות במסוף): " + error.message);
        return null;
    }
};

export const saveToCloud = async (collectionName, data) => {
    if (!db) {
        console.warn("Firestore not initialized");
        return;
    }
    try {
        await addDoc(collection(db, collectionName), {
            ...data,
            timestamp: new Date()
        });
        console.log("Document written to", collectionName);
    } catch (e) {
        console.error("Error adding document: ", e);
        alert("שגיאה בשמירה לענן. וודא ש-Firestore מופעל במסוף של Firebase.");
    }
};

export const getFromCloud = async (collectionName, userId) => {
    if (!db) return [];
    try {
        const q = query(
            collection(db, collectionName), 
            where("userId", "==", userId),
            orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error getting documents: ", e);
        return [];
    }
};
```
