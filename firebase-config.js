// firebase-config.js
// 1) Create a Firebase project, enable Email/Password auth and Firestore
// 2) Replace the config object values below with your project's values
// 3) Host locally or on a static host and the site will use Firebase auth/firestore

// Example:
/*
const firebaseConfig = {
  apiKey: "AIza....",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:123:web:abcd"
};
*/

if(typeof firebase !== 'undefined'){
  // make firebaseApp global only if config is provided
  try{
    const firebaseConfig = {
      apiKey: "REPLACE_ME",
      authDomain: "REPLACE_ME",
      projectId: "REPLACE_ME",
      storageBucket: "REPLACE_ME",
      messagingSenderId: "REPLACE_ME",
      appId: "REPLACE_ME"
    };
    // check replace
    if(firebaseConfig.apiKey && firebaseConfig.apiKey !== 'REPLACE_ME'){
      firebase.initializeApp(firebaseConfig);
      window.firebaseApp = firebase.app();
      console.log('Firebase initialized');
    } else {
      console.warn('Firebase config not filled. Edit firebase-config.js with your project values to enable Auth/Firestore.');
    }
  }catch(e){ console.warn('Firebase init error', e) }
}
