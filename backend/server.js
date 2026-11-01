import express from "express";
import mongoose from "mongoose";
import path from "path";
import fs from "fs";
import cors from "cors";
import dotenv from "dotenv";

import User from "./Models/Users.js";
import Category from "./Models/Category.js";
import Inventory from "./Models/Inventory.js";
import StockHistory from "./Models/StockHistory.js";
import Product from "./Models/Product.js";
import createUpload from "./Middleware/upload.js";
import Cart from "./Models/Cart.js";
import Order from "./Models/Order.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ==================================================
// MIDDLEWARE
// ==================================================

app.use(cors());
app.use(express.json());

// Disable caching only for API responses
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store");
  next();
});

app.use("/uploads", express.static(path.resolve("uploads")));

const categoryUpload = createUpload("categories");
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

const deleteCategoryImage = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith("/uploads/categories/")) {
    return;
  }

  const filename = path.basename(imageUrl);
  const imagePath = path.resolve("uploads", "categories", filename);

  deleteFile(imagePath);
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
// USER API CALLS
// ==================================================

// Check mobile number
app.post("/api/users/checkMobile", async (req, res) => {
  try {
    const { mobile } = req.body;

    const existingUser = await User.findOne({ mobile });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already registered",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Mobile number is available",
    });
  } catch (err) {
    console.error("Check mobile error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to check user",
    });
  }
});

// Create user
app.post("/api/users", async (req, res) => {
  try {
    const { firebaseUid, name, mobile, role } = req.body;

    const newUser = await User.create({
      firebaseUid,
      name,
      mobile,
      role,
    });

    return res.status(201).json({
      success: true,
      message: "User saved successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Create user error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to save user",
      error: err.message,
    });
  }
});

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const allUsers = await User.find();

    return res.status(200).json({
      success: true,
      message: "Fetched all users",
      data: allUsers,
    });
  } catch (err) {
    console.error("Fetch users error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      data: null,
    });
  }
});

// Fetch one user by Firebase UID
app.get("/api/users/:id", async (req, res) => {
  try {
    const userData = await User.findOne({
      firebaseUid: req.params.id,
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched user",
      data: userData,
    });
  } catch (err) {
    console.error("Fetch user error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      data: null,
    });
  }
});

// Update user profile using Firebase UID
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, mobile, gender } = req.body;

    const updateUser = await User.findOneAndUpdate(
      { firebaseUid: req.params.id },
      {
        name,
        mobile,
        gender,
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

// ==================================================
// CATEGORY API CALLS
// ==================================================

// Add category
app.post(
  "/api/categories",
  categoryUpload.single("image"),
  async (req, res) => {
    try {
      const { name, description, status } = req.body;

      if (!name || !name.trim()) {
        if (req.file) deleteFile(req.file.path);

        return res.status(400).json({
          success: false,
          message: "Category name is required",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please upload a category image",
        });
      }

      const newCategory = await Category.create({
        name: name.trim(),
        description,
        image: `/uploads/categories/${req.file.filename}`,
        status: status === undefined ? true : status === "true",
      });

      return res.status(201).json({
        success: true,
        message: "Category saved successfully",
        data: newCategory,
      });
    } catch (err) {
      if (req.file) deleteFile(req.file.path);

      console.error("Create category error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to save category",
        error: err.message,
      });
    }
  },
);

// Fetch all categories
app.get("/api/categories", async (req, res) => {
  try {
    const allCategories = await Category.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Fetched all categories",
      data: allCategories,
    });
  } catch (err) {
    console.error("Fetch categories error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      data: [],
    });
  }
});

// Update category
app.put(
  "/api/categories/:id",
  categoryUpload.single("image"),
  async (req, res) => {
    try {
      const { name, description, status } = req.body;

      const category = await Category.findById(req.params.id);

      if (!category) {
        if (req.file) deleteFile(req.file.path);

        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }

      if (name !== undefined && !name.trim()) {
        if (req.file) deleteFile(req.file.path);

        return res.status(400).json({
          success: false,
          message: "Category name cannot be empty",
        });
      }

      let image = category.image;

      if (req.file) {
        image = `/uploads/categories/${req.file.filename}`;
      }

      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          name: name !== undefined ? name.trim() : category.name,
          description:
            description !== undefined ? description : category.description,
          image,
          status: status === undefined ? category.status : status === "true",
        },
        {
          new: true,
          runValidators: true,
        },
      );

      if (req.file && category.image) {
        deleteCategoryImage(category.image);
      }

      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
        data: updatedCategory,
      });
    } catch (err) {
      if (req.file) deleteFile(req.file.path);

      console.error("Update category error:", err);

      return res.status(500).json({
        success: false,
        message: "Failed to update category",
        error: err.message,
      });
    }
  },
);

// Delete category
app.delete("/api/categories/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const categoryImage = category.image;

    await Category.findByIdAndDelete(req.params.id);

    deleteCategoryImage(categoryImage);

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.error("Delete category error:", err);

    return res.status(500).json({
      success: false,
      message: "Failed to delete category",
      error: err.message,
    });
  }
});

// ==================================================
// PRODUCT API CALLS
// ==================================================

// Add product
app.post("/api/products", productUpload.single("image"), async (req, res) => {
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
app.get("/api/products", async (req, res) => {
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
app.get("/api/products/:id", async (req, res) => {
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
app.put(
  "/api/products/:id",
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
app.delete("/api/products/:id", async (req, res) => {
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

// ==================================================
// INVENTORY API CALLS
// ==================================================

// Fetch all inventory
app.get("/api/inventory", async (req, res) => {
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
app.post("/api/inventory/adjust", async (req, res) => {
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
app.get("/api/inventory/product/:productId", async (req, res) => {
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

// ==================================================
// CART API CALLS
// ==================================================

// Add product to cart
app.post("/api/cart/:firebaseUid", async (req, res) => {
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
app.get("/api/cart/:firebaseUid", async (req, res) => {
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
app.put("/api/cart/:firebaseUid/:productId", async (req, res) => {
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
app.delete("/api/cart/:firebaseUid/:productId", async (req, res) => {
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

// ==================================================
// ORDER API CALLS
// ==================================================

// Create order
app.post("/api/orders", async (req, res) => {
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
app.get("/api/orders", async (req, res) => {
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
app.get("/api/orders/:id", async (req, res) => {
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
app.get("/api/orders/user/:firebaseUid", async (req, res) => {
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

// ==================================================
// MONGODB CONNECTION AND SERVER STARTUP
// ==================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
  });
