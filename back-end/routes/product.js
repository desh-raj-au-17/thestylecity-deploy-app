const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getProductReviews,
  deleteReviews,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// get all products.
router.route("/products").get(getProducts);

// get single product.
router.route("/product/:id").get(getSingleProduct);

// add new products.
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// update existing product.
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// delete existing product.
router
  .route("/admin/product/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// create and update product review
router.route("/review").put(isAuthenticatedUser, createProductReview);

// get all product review
router.route("/reviews").get(isAuthenticatedUser, getProductReviews);

// Delete product review
router.route("/reviews").delete(isAuthenticatedUser, deleteReviews);

module.exports = router;
