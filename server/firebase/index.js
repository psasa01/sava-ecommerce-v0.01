var admin = require("firebase-admin");

var serviceAccount = require("../config/fbServiceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://react-redux-ecommerce-5b06d-default-rtdb.europe-west1.firebasedatabase.app",
});

module.exports = admin;
