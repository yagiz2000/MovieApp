import firebase from "firebase";
var config = {
  apiKey: "AIzaSyBUojiNoUITZxBD9T8Wqx773bnD0LCoGiw",
  authDomain: "filmapp-aa692.firebaseapp.com",
  // For databases not in the us-central1 location, databaseURL will be of the
  // form https://[databaseName].[region].firebasedatabase.app.
  // For example, https://your-database-123.europe-west1.firebasedatabase.app
  databaseURL: "https://filmapp-aa692-default-rtdb.firebaseio.com",
  storageBucket: "filmapp-aa692.appspot.com",
};
firebase.initializeApp(config);

// Get a reference to the database service
var id = "1234";
var database = firebase.database();
var ref2 = firebase
  .database()
  .ref()
  .child("users");
ref2.child(id).set({
  film: {
    title: "Hello",
  }
});
