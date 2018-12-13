import firebase from './firebase';

const database = firebase.database();

class Service {
  /**
   * Store new user information
   */
  addUser = async (user) => {
    await database.ref(`users/${user.uid}`)
      .set({
        createdAt: firebase.database.ServerValue.TIMESTAMP,
        displayName: user.displayName,
      });
  }

  /**
   * Store a new spark
   */
  addSpark = async (data, uid) => {
    const sparkData = {
      author: uid,
      data,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    };

    // Save spark
    const spark = await database.ref('sparks/')
      .push(sparkData);

    // Store spark key in user's feed
    await database.ref(`users/${uid}/feed/${spark.key}`)
      .set(true);
  }
}

export default new Service();
