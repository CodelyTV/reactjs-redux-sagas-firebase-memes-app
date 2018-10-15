# Unit 4

This units installs Firebase and creates necessary classes to create a user.

> NOTE: Ensure you get Firebase authentication config as explained in *Unit 1*.

## Steps

### Firebase

Lets install firebase client with `$ yarn add firebase`.

Firebase will be our backend service so we are going to create a file `src/services/firebase.js` responsible to initialize firebase client and returns us a ready to use reference.

```javascript
// Import firebase core and only used functionalities
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);
firebase.initializeApp(config);

export default firebase;
```

> Some things to note on the previous file:
> 
> - We import the code for the firebase core and only those services we are going to use in our app: `auth` and `database`.
> - We store the firebase configuration in the `.env.local` file. We explain that CRA loads that variables when building the bundle. Because `.env` accepts string we need to parse that value into a JS object we pass to firebase.
> - Firebase it is not initialized, that is, it do not know which is the project and permissions associated, until we pas a configuration.

