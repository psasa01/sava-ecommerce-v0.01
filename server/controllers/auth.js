const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  console.log("REqqQQQQQQQQQQQQQ", req);
  const { name, picture, email } = req.user;

  const { displayName, address, phone, poNum, city } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, displayName, address, phone, poNum, city },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name,
      picture,
      displayName: name,
      address,
      phone,
      poNum,
      city,
    }).save();
    console.log("USER CREATED", newUser);
    res.json(newUser);
    const updatingUser = await User.findOneAndUpdate(
      { email },
      {
        displayName: name,
        address: address,
        phone: phone,
        poNum: poNum,
        city: city,
      },
      { new: true }
    );
  }
};

exports.currentUser = (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
