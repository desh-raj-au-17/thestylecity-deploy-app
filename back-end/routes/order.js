const express = require("express");
const router = express.Router();
const {
  newOrder,
  myOrders,
  getSingleOrder,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// create new order.
router.route("/order/new").post(isAuthenticatedUser, newOrder);

//get single order.
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// get logged user orders.
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// get all orders (Admin only).
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizeRoles("admin"), allOrders);

// update / process orders (Admin only)
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

// update / process orders (Admin only)
router
  .route("/admin/order/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;
