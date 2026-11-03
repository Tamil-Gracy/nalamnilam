import express from "express";
import mongoose from "mongoose";

import Inventory from "../Models/Inventory.js";
import StockHistory from "../Models/StockHistory.js";

const router = express.Router();

// ==================================================
// INVENTORY API CALLS
// ==================================================

// Fetch all inventory
router.get("/", async (req, res) => {
  try {
    const allInventory = await Inventory.find().populate({
      path: "productId",
      select: "name image category",
      populate: {
        path: "category",
        select: "name",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all inventory",
      data: allInventory,
    });
  } catch (err) {
    console.error("Fetch inventory error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch inventory",
      data: [],
    });
  }
});

// Adjust inventory
router.post("/adjust", async (req, res) => {
  try {
    const { productId, adjustType, quantity, reason } = req.body;

    const qty = Number(quantity);

    // Validate input
    if (
      !mongoose.isValidObjectId(productId) ||
      !["ADDED", "REMOVED", "CORRECTED"].includes(adjustType) ||
      quantity === "" ||
      quantity == null ||
      !Number.isFinite(qty) ||
      qty < 0 ||
      (adjustType !== "CORRECTED" && qty === 0) ||
      !reason?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid details",
      });
    }

    // Find one inventory document
    const inventory = await Inventory.findOne({ productId });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    const previousStock = inventory.stock;
    let newStock;

    if (adjustType === "ADDED") {
      newStock = previousStock + qty;
    } else if (adjustType === "REMOVED") {
      newStock = previousStock - qty;
    } else {
      newStock = qty;
    }

    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    inventory.stock = newStock;
    await inventory.save();

    await StockHistory.create({
      productId,
      type: adjustType,
      quantity: Math.abs(newStock - previousStock),
      previousStock,
      newStock,
      reason: reason.trim(),
    });

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: {
        previousStock,
        newStock,
      },
    });
  } catch (error) {
    console.error("Inventory adjustment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
      error: error.message,
    });
  }
});

// Fetch inventory for one product
router.get("/product/:productId", async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      productId: req.params.productId,
    });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: inventory.stock,
    });
  } catch (error) {
    console.error("Fetch stock error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch stock",
    });
  }
});

export default router;
