/* eslint-disable */
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: 'AIzaSyAkYDMtQ7X_Twvv-H6GOlX4glTglMHgGtQ',
    authDomain: 'lanaswan-f2a0b.firebaseapp.com',
    databaseURL: 'https://lanaswan-f2a0b.firebaseio.com',
    projectId: 'lanaswan-f2a0b',
    storageBucket: 'lanaswan-f2a0b.appspot.com',
    messagingSenderId: '52629460309',
    appId: '1:52629460309:web:68d52f39bd9e814cc74bdc'
}

let app = null
// // prevent initializing firebase more than once
if (!firebase.apps.length) { 
    app = firebase.initializeApp(firebaseConfig)
}
// inject it so it can be accessed as this.$firebase inside the project
export default (ctx, inject) => {
  inject('firebase', firebase)
}
// export default firebase
