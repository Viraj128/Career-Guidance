// backend/config/firebase.js
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-account.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();

module.exports = { admin, auth };



// backend/config/firebase.js
// const admin = require("firebase-admin");
// const serviceAccount = require("../firebase-service-account.json");

// if (!admin.apps.length) {
//   admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//   });
// }

// module.exports = admin; // export only admin
