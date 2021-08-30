// NOTE
// Please use your own firebase details below. For more details visit: https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/documentation/development/firebaseIntegration.html


import firebase from 'firebase/app'

// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyCsRwMQizK_VkJ2e4QPg5vLI1oUvZ0KNVg",
  authDomain: "studyfirebaseandvue.firebaseapp.com",
  projectId: "studyfirebaseandvue",
  storageBucket: "studyfirebaseandvue.appspot.com",
  messagingSenderId: "780599548003",
  appId: "1:780599548003:web:c57302277c3729c20fc056",
  measurementId: "G-J6TBHEW68Y"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)