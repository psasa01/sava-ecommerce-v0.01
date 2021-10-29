const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// imports

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  posebnaPonuda,
  pretragaPoDimenziji,
  pretragaPoBrandu,
  productsCount,
  listAllForPagination
} = require("../controllers/product");

//routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);
router.get("/all-products", listAll);

router.delete("/product/:slug", authCheck, adminCheck, remove);

router.get("/posebna-ponuda", posebnaPonuda);

router.get("/dimenzija/:width/:height/:rim", pretragaPoDimenziji);
router.get("/productsByBrand/:brand", pretragaPoBrandu);

router.get("/product/:slug", read);

router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", listAllForPagination);

module.exports = router;
