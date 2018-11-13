import firebase from './firebase';

const auth = firebase.auth();

class Service {
  onAuthStateChanged = cb => auth.onAuthStateChanged(cb)

  /**
   * Creates a new user
   */
  createUser = async ({ username, email, password }) => {
    await auth.createUserWithEmailAndPassword(email, password);
    const user = auth.currentUser;
    await user.updateProfile({
      displayName: username,
    });

    return user;
  }

  /**
   * Returns current logged user
   */
  currentUser = () => auth.currentUser

  /**
   * Login user via email and password
   */
  loginUser = async (email, password) => auth.signInWithEmailAndPassword(email, password);

  /**
   * Logout user
   */
  logoutUser = async () => auth.signOut();
}


export default new Service();
