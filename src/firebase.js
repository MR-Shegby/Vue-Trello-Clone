import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyABUkU324tMyb5ddSmC7CvFOxwZxT07xu8',
  authDomain: 'vue-trello-clone.firebaseapp.com',
  databaseURL: 'https://vue-trello-clone.firebaseio.com',
  projectId: 'vue-trello-clone',
  storageBucket: 'vue-trello-clone.appspot.com',
  messagingSenderId: '630300380367'
}

firebase.initializeApp(config)

export const database = firebase.database()

// export default {
//   database
// }