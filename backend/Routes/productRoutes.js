import express from "express";
import fs from "fs";
import path from "path";

import Product from "../Models/Product.js";
import Inventory from "../Models/Inventory.js";
import createUpload from "../Middleware/upload.js";

const router = express.Router();
const productUpload = createUpload("products");

// ==================================================
// FILE DELETE HELPERS
// ==================================================

const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File deletion error:", err.message);
      }
    });
  }
};

const deleteProductImage = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith("/uploads/products/")) {
    return;
  }

  const filename = path.basename(imageUrl);
  const imagePath = path.resolve("uploads", "products", filename);

  deleteFile(imagePath);
};

// ==================================================
// PRODUCT API CALLS
// ==================================================

// Add product
router.post("/", productUpload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      quantity,
      unit,
      badge,
      status,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a product image",
      });
    }

    const newProduct = await Product.create({
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      quantity,
      unit,
      badge,
      image: `/uploads/products/${req.file.filename}`,
      status: status === undefined ? true : status === "true",
    });

    await Inventory.create({
      productId: newProduct._id,
      stock: stock,
      reorderLevel: 10,
    });

    return res.status(201).json({
      success: true,
      message: "Product saved successfully",
      data: newProduct,
    });
  } catch (err) {
    if (req.file) deleteFile(req.file.path);

    console.error("Create product error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to save product",
      error: err.message,
    });
  }
});

// Fetch all products
router.get("/", async (req, res) => {
  try {
    const allProducts = await Product.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Fetched products",
      data: allProducts,
    });
  } catch (err) {
    console.error("Fetch products error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      data: [],
    });
  }
});

// Fetch one product
router.get("/:id", async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id).populate(
      "category",
      "name",
    );

    if (!productData) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched product data",
      data: productData,
    });
  } catch (err) {
    console.error("Fetch product error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      data: null,
    });
  }
});

// Update product
router.put(
  "/:id",
  productUpload.single("image"),
  async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        price,
        discountPrice,
        stock,
        quantity,
        unit,
        badge,
        status,
      } = req.body;

      const product = await Product.findById(req.params.id);

      if (!product) {
        if (req.file) deleteFile(req.file.path);

        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      let image = product.image;

      if (req.file) {
        image = `/uploads/products/${req.file.filename}`;
      }

      const updateProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          name: name !== undefined ? name : product.name,
          description:
            description !== undefined ? description : product.description,
          category: category !== undefined ? category : product.category,
          price: price !== undefined ? price : product.price,
          discountPrice:
            discountPrice !== undefined ? discountPrice : product.discountPrice,
          stock: stock !== undefined ? stock : product.stock,
          quantity: quantity !== undefined ? quantity : product.quantity,
          unit: unit !== undefined ? unit : product.unit,
          badge: badge !== undefined ? badge : product.badge,
          image,
          status: status === undefined ? product.status : status === "true",
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (req.file && product.image) {
        deleteProductImage(product.image);
      }

      return res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updateProduct,
      });
    } catch (err) {
      if (req.file) deleteFile(req.file.path);

      console.error("Update product error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update product",
        error: err.message,
      });
    }
  },
);

// Delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const productImage = product.image;

    await Product.findByIdAndDelete(req.params.id);
    await Inventory.deleteOne({ productId: req.params.id });

    deleteProductImage(productImage);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    console.error("Delete product error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
});

export default router;
