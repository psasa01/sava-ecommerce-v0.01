const User = require("../models/user");

exports.createOrUpdateUserEmailPass = async (req, res) => {
  console.log("REqqQQQQQQQQQQQQQ", req);
  const { picture, email, firebase } = req.user;

  const { name, address, phone, poNum, city } = req.body;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, address, phone, poNum, city, firebase },
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
      firebase: firebase.sign_in_provider,
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
        name: name,
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

exports.createOrUpdateUser = async (req, res) => {
  const { name, picture, email, firebase } = req.user;
  // console.log("REEEEEQQQQQQ", req);
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture, firebase },
    { new: true }
  );
  if (user) {
    console.log("USER UPDATED", user);
    res.json(user);
  } else {
    console.log;
    const newUser = await new User({
      email,
      name,
      picture,
      firebase: firebase.sign_in_provider,
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
