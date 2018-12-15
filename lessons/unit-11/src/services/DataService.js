import firebase from './firebase';

const database = firebase.database();

window.database = database;

const LIMIT = 3;

const getUserDisplayName = async (uid) => {
  let displayName = null;
  const displayNameSnapshot = await database.ref(`users/${uid}/displayName`).once('value');

  if (displayNameSnapshot.exists()) {
    displayName = displayNameSnapshot.val();
  }

  return displayName;
};

const loadSparksFromAllUsers = async (lastKey) => {
  // Query sparks limiting and offseting by lastKey
  let query;
  if (!lastKey) {
    query = database.ref('sparks/')
      .orderByKey()
      .limitToLast(LIMIT);
  } else {
    query = database.ref('sparks/')
      .orderByKey()
      .endAt(lastKey)
      .limitToLast(LIMIT);
  }

  const sparks = [];
  const snapshot = await query.once('value');
  snapshot.forEach((childSnapshot) => {
    // Avoid duplicates. This is due when querying with 'endAt' the child
    // with 'lastKey' is also included.
    if (lastKey === childSnapshot.key) {
      return;
    }

    const sparkData = childSnapshot.val();
    sparks.push({
      ...sparkData,
      key: childSnapshot.key,
    });
  });
  sparks.reverse(); // Reverse order (newest first)

  return sparks;
};

const loadSparksFromUserFeed = async (uid, lastKey) => {
  // Query sparks limiting and offseting by lastKey
  let query;
  if (!lastKey) {
    query = database.ref(`users/${uid}/feed`)
      .orderByKey()
      .limitToLast(LIMIT);
  } else {
    query = database.ref(`users/${uid}/feed`)
      .orderByKey()
      .endAt(lastKey)
      .limitToLast(LIMIT);
  }

  const sparkIds = [];
  const snapshot = await query.once('value');
  snapshot.forEach((childSnapshot) => {
    // Avoid duplicates. This is due when querying with 'endAt' the child
    // with 'lastKey' is also included.
    if (lastKey === childSnapshot.key) {
      return;
    }

    sparkIds.push(childSnapshot.key);
  });
  sparkIds.reverse(); // Reverse order (newest first)

  // Retrive sparks data
  const sparks = await Promise.all(sparkIds.map(async (id) => {
    const spark = await database.ref(`sparks/${id}`).once('value');
    return {
      ...spark.val(),
      key: spark.key,
    };
  }));

  return sparks;
};

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

  /**
   * Load sparks. If user is provided it loads the user's feed sparks.
   */
  loadSparks = async ({ uid = null, lastKey = null } = {}) => {
    let sparks;

    if (!uid) {
      sparks = await loadSparksFromAllUsers(lastKey);
    } else {
      sparks = await loadSparksFromUserFeed(uid, lastKey);
    }

    // Update each spark with author display name
    const updatedSparks = await Promise.all(sparks.map(async (sparkData) => {
      const userName = await getUserDisplayName(sparkData.author);
      return {
        ...sparkData,
        userName,
      };
    }));

    return updatedSparks;
  };

  /**
   * Increase a spark's thumbs up value
   */
  thumbsUp = async (key) => {
    const result = await database.ref(`sparks/${key}`)
      // We update the spark in a transaction operation to avoid concurrency problems.
      // The way to do is "querying" for the spark and updating its properties.
      .transaction((spark) => {
        if (spark) {
          return {
            ...spark,
            key,
            thumbsUp: spark.thumbsUp ? spark.thumbsUp + 1 : 1,
          };
        }
        return spark;
      });

    if (result.committed && result.snapshot.exists()) {
      return result.snapshot.val();
    }
    return null;
  }
}

export default new Service();
