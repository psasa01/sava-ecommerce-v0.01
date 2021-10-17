const Sub = require("../models/sub");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    const { name, parent } = req.body;
    const category = await new Sub({
      name,
      parent,
      slug: `${slugify(parent)}-${slugify(name)}`,
    }).save();
    res.json(category);
  } catch (err) {
    console.log(err);
    res.status(400).send("Nazalost podkategorija nije kreirana!");
  }
};

exports.list = async (req, res) => {
  res.json(await Sub.find({}).sort({ createdAt: -1 }).exec());
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  res.json(sub);
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Azuriranje podkategorije nije uspjelo!");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({
      slug: req.params.slug,
    });
    res.json(deleted);
    //   .send(`Uspjesno ste obrisali kategoriju: ${deleted.name}!`);
  } catch (err) {
    res.status(400).send("Brisanje podkategorije neuspjesno");
  }
};
