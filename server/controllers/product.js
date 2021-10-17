const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    // console.log(req.body);
    req.body.slug = slugify(`
      ${req.body.width}-${req.body.height}-${req.body.rim}-${req.body.loadindex}-${req.body.speedindex}-${req.body.title}`);
    req.body.fullTitle = `${req.body.width}/${req.body.height}R${req.body.rim} ${req.body.loadindex}${req.body.speedindex} - ${req.body.title}`;
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message
    });
  }
};

exports.listAll = async (req, res) => {
  let products = await Product.find({})

    .populate("category")
    .populate("subs")
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(products);
};

exports.listAllForPagination = async (req, res) => {
  console.table(req.body);
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 8;
    let products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subs")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.status(400).send("Brisanje nije uspjelo");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subs")
    .exec();
  res.json(product);
};

exports.update = async (req, res) => {
  try {
    // if(req.body.title) {
    //   req.body.slug = slugify(req.body.title);
    // }
    req.body.fullTitle = `${req.body.width}/${req.body.height}R${req.body.rim} ${req.body.loadindex}${req.body.speedindex} - ${req.body.title}`;

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },

      req.body,
      { new: true }
    ).exec();
    res.json(updated);
  } catch (err) {
    console.log("Product Update Error", err);
    return res.status(400).send("Uredjivanje proizvoda nije uspjelo!");
  }
};

exports.posebnaPonuda = async (req, res) => {
  try {
    const posebni = await Product.find({
      posebnaPonuda: true
    })
      .populate("category")
      .populate("subs")
      .exec();
    res.json(posebni);
  } catch (err) {
    return res.status(400);
  }
};

exports.pretragaPoDimenziji = async (req, res) => {
  try {
    const poDimenziji = await Product.find({
      width: req.params.width,
      height: req.params.height,
      rim: req.params.rim
    })
      .populate("category")
      .populate("subs")
      .exec();
    res.json(poDimenziji);
  } catch (err) {
    return res.status(400);
  }
};

exports.productsCount = async (req, res) => {
  let total = await Product.find({})
    .estimatedDocumentCount()
    .exec();
  res.json(total);
};
