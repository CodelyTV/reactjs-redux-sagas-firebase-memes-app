// Import firebase core and only used functionalities
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
firebase.initializeApp(config);

export default firebase;
