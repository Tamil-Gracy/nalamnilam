import express from "express";
import mongoose from "mongoose";

import Cart from "../Models/Cart.js";

const router = express.Router();

// ==================================================
// CART API CALLS
// ==================================================

// Add product to cart
router.post("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { productId } = req.body;

    if (!productId || !mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Valid product ID is required",
      });
    }

    // Find one cart document
    let cart = await Cart.findOne({ firebaseUid });

    if (!cart) {
      cart = new Cart({
        firebaseUid,
        items: [],
      });
    }

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({
        productId,
        quantity: 1,
      });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ firebaseUid }).populate(
      "items.productId",
    );

    return res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});

// Get cart of one user
router.get("/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const cart = await Cart.findOne({ firebaseUid }).populate(
      "items.productId",
    );

    return res.status(200).json({
      success: true,
      data: cart || { items: [] },
    });
  } catch (error) {
    console.error("Fetch cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});

// Update cart quantity
router.put("/:firebaseUid/:productId", async (req, res) => {
  try {
    const { firebaseUid, productId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);

    if (!Number.isInteger(qty) || qty < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ firebaseUid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    item.quantity = qty;
    await cart.save();

    const updatedCart = await Cart.findOne({ firebaseUid }).populate(
      "items.productId",
    );

    return res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    console.error("Update cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update quantity",
      error: error.message,
    });
  }
});

// Delete product from cart
router.delete("/:firebaseUid/:productId", async (req, res) => {
  try {
    const { firebaseUid, productId } = req.params;

    const cart = await Cart.findOne({ firebaseUid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ firebaseUid }).populate(
      "items.productId",
    );

    return res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    console.error("Remove cart item error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
});

export default router;
