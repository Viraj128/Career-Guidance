// // backend/middleware/verifyFirebase.js
// const { admin } = require("../config/firebase");

// const verifyFirebase = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }

//     const token = authHeader.split(" ")[1];
//     const decodedToken = await admin.auth().verifyIdToken(token);

//     req.user = { uid: decodedToken.uid };
//     next();
//   } catch (error) {
//     console.error("Firebase auth error:", error);
//     res.status(401).json({ error: "Invalid token" });
//   }
// };

// module.exports = verifyFirebase;


//------------------------------------------
// backend/middleware/verifyFirebase.js

const { auth } = require("../config/firebase");
// const admin = require("../config/firebase");

const verifyFirebase = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken; // attach user info to request
    next();
  } catch (error) {
    console.error("Firebase auth error:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = verifyFirebase;


