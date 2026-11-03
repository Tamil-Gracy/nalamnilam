import express from "express";
import Order from "../Models/Order.js";

const router = express.Router();

// ==================================================
// ORDER API CALLS
// ==================================================

// Create order
router.post("/", async (req, res) => {
  try {
    const {
      firebaseUid,
      items,
      customer,
      address,
      paymentMethod,
      subtotal,
      discount,
      deliveryFee,
      total,
    } = req.body;

    const order = await Order.create({
      firebaseUid,
      items,
      customer,
      address,
      paymentMethod,
      subtotal,
      discount,
      deliveryFee,
      total,
    });

    return res.status(201).json({
      status: "success",
      message: "Order placed successfully",
      data: order,
    });
  } catch (err) {
    console.error("Create order error:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to place order",
      error: err.message,
    });
  }
});

// Fetch all orders for admin
router.get("/", async (req, res) => {
  try {
    const response = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.productId");

    return res.status(200).json({
      status: "success",
      message: "Fetched all orders",
      data: response,
    });
  } catch (err) {
    console.error("Fetch all orders error:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});

// Fetch one order by MongoDB ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "items.productId",
    );

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetched order data",
      data: order,
    });
  } catch (err) {
    console.error("Fetch order error:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch order data",
      error: err.message,
    });
  }
});

// Fetch all orders for one user
router.get("/user/:firebaseUid", async (req, res) => {
  try {
    const response = await Order.find({
      firebaseUid: req.params.firebaseUid,
    })
      .sort({ createdAt: -1 })
      .populate("items.productId");

    return res.status(200).json({
      status: "success",
      message: "Fetched all orders of user",
      data: response,
    });
  } catch (err) {
    console.error("Fetch user orders error:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to fetch orders of user",
      error: err.message,
    });
  }
});


//order status update
router.patch("/:id", async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const updateOrder = await Order.findOneAndUpdate(
      { _id: req.params.id },
      { orderStatus },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateOrder) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Order status updated successfully",
      data: updateOrder,
    });
  } catch (err) {
    console.error("Update order status error:", err);

    return res.status(500).json({
      status: "error",
      message: "Failed to update order status",
      error: err.message,
    });
  }
});

export default router;

      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updateUser,
    });
  } catch (err) {
    console.error("Update profile error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to update profile",
      error: err.message,
    });
  }
});

export default router;
