const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email, address, phone, poNum, city } = req.body;
  // console.log("REEEEEQQQQQQ", req);
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, address, city, phone, poNum },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    console.log("REQ BODDDDYYYYYYY: ", req);

    const newUser = await new User({
      email,
      name,
      picture,
      address,
      phone,
      poNum,
      city,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
  }
};

exports.currentUser = (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
