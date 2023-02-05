# PE Clipboard

## About
The app allows users to create gradebooks, classes, and rosters for easy attendance and evaluation
of players or students.

## Goals
The app will eventually have the functionality to replace common grading and evaluation notes typically
done using rosters and a clipboard. A previous version of this app was made with google apps script that did the same thing
but automatically creates a google sheet for each gradebook created.  The google sheet then keeps track
of daily points, weekly points, notes, absenses, grades, ect. The newer version will use Firebase.

## Current Version
The current newest version of the app utilizes Firebase's real time database rather than google sheets.  The current version
can still be utilized for attendence and daily evaluations but the data will only be available through the
web app, not in google drive.

## Technology
- React v16
- React-Router-Dom Version v6
- Bootstrap & React-Bootstrap
- SASS
- Redux
- Google Sign-in
- Firebase Realtime Database
- Node v14 ( use `nvm use 14` if you have a newer version installed )

**Important Note**:
Since google sign-in and Firebase are used, users must create their own
google client id through google cloud platform. 
set up a .env file in your root directory with the
variable:

```REACT_APP_GOOGLE_CLIENT_ID=<YOUR CLIENT ID>```

For firebase, start a new project and realtime database. Click on your app, click on Realtime database
to start the database. In the .env file, add your firbase config variables as shown below:
  
```REACT_APP_FIREBASE_API_KEY=<YOUR_API_KEY>
REACT_APP_FIREBASE_AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
REACT_APP_FIREBASE_PROJECT_ID=<YOUR_PROJECT_ID>
REACT_APP_FIREBASE_STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
REACT_APP_MESSAGING_SENDER_ID=<YOUR_SENDER_ID>
REACT_APP_FIREBASE_APP_ID=<YOUR_APP_ID>
REACT_APP_FIREBASE_MEASUREMENT_ID=<YOUR_MEASUREMENT_ID>
REACT_APP_FIREBASE_DATABASE_URL=<YOUR_DATABASE_URL>
```
When getting the above values from firebase, leave out the quotations.
