const admin = require("../firebase");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    // console.log("HHHEEAADDEERRSS TOKKKENNNN", req.headers.authtoken); // token
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    console.log("Firebase User In AuthCheck", firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied",
    });
  } else {
    next();
  }
};
