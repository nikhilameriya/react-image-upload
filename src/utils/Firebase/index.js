import firebase from 'firebase'

var config = {
      apiKey: "AIzaSyC39uCj2G9Bfp5PwXuwldfp356FXtK_ULY",
      authDomain: "image-uploader-ca2c2.firebaseapp.com",
      databaseURL: "https://image-uploader-ca2c2.firebaseio.com",
      projectId: "image-uploader-ca2c2",
      storageBucket: "image-uploader-ca2c2.appspot.com",
      messagingSenderId: "701057828706",
      appId: "1:701057828706:web:27e1fa063314db0a598e3b"
};

firebase.initializeApp(config);

export const storage = firebase.storage();
