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

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static(path.resolve("uploads")));

const categoryUpload = createUpload("categories");
const productUpload = createUpload("products");

// Delete a file if it exists
const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error("File deletion error:", err.message);
      }
    });
  }
};

// Delete category image
const deleteCategoryImage = (imageUrl) => {
  if (!imageUrl || !imageUrl.startsWith("/uploads/categories/")) {
    return;
  }

  const filename = path.basename(imageUrl);
  const imagePath = path.resolve("uploads", "categories", filename);

  deleteFile(imagePath);
};

// Delete product image
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

    const existingUser = await User.find({ mobile });

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
    const userData = await User.find({
      firebaseUid: req.params.id,
    });

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
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

// Update user profile
app.put("/api/users/:id", async (req, res) => {
  try {
    const { name, mobile, gender } = req.body;

    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        mobile,
        gender,
      },
      { new: true },
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
// ADMIN CATEGORY API CALLS
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
    const allCategories = await Category.find().sort({ createdAt: -1 });

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

      // Keep the existing image if no new image is uploaded
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
        { new: true, runValidators: true },
      );

      // Delete old image only after a new image is uploaded
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
    const newInventory = await Inventory.create({
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
      message: "Fetched all products",
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

    //   console.log(productData);
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
      data: [],
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

      // Keep existing image if no new image is uploaded
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
        { new: true, runValidators: true },
      );

      // Delete old image only after a new image is uploaded
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

// Fetch all inventory list
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

// update inventory

app.post("/api/inventory/adjust", async (req, res) => {
  try {
    const { productId, adjustType, quantity, reason } = req.body;

    const qty = Number(quantity);

    // 1. Validate input
    if (
      !mongoose.isValidObjectId(productId) ||
      !["ADDED", "REMOVED", "CORRECTED"].includes(adjustType) ||
      quantity === "" ||
      quantity == null ||
      isNaN(qty) ||
      qty < 0 ||
      (adjustType !== "CORRECTED" && qty === 0) ||
      !reason?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "Please enter valid details",
      });
    }

    // 2. Find inventory
    const inventory = await Inventory.find({ productId });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    // 3. Get current stock
    const previousStock = inventory.stock;
    let newStock;

    // 4. Calculate new stock
    if (adjustType === "ADDED") {
      newStock = previousStock + qty;
    } else if (adjustType === "REMOVED") {
      newStock = previousStock - qty;
    } else {
      newStock = qty;
    }

    // 5. Check available stock
    if (newStock < 0) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock available",
      });
    }

    // 6. Update inventory
    inventory.stock = newStock;
    await inventory.save();

    // 7. Create stock history
    const hist = await StockHistory.create({
      productId,
      type: adjustType,
      quantity: Math.abs(newStock - previousStock),
      previousStock,
      newStock,
      reason: reason.trim(),
    })
      .then((res) => {
        //console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });

    // 8. Send response
    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: {
        previousStock,
        newStock,
      },
    });
  } catch (error) {
    //console.error("Inventory adjustment error:", error);
    //console.log(error)
    return res.status(500).json({
      success: false,
      message: "Failed to update stock",
    });
  }
});

//get inventory data for one product
app.get("/api/inventory/product/:productId", async (req, res) => {
  try {
    const inventory = await Inventory.find({
      productId: req.params.productId,
    });

    if (!inventory) {
      return res.status(404).json({
        success: false,
        message: "Inventory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: inventory.stock,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch stock",
    });
  }
});

// add to cart from PDP

app.post("/api/cart/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { productId } = req.body;

    // Find the customer's cart
    let cart = await Cart.find({ firebaseUid });

    // If cart doesn't exist, create an empty cart
    if (!cart) {
      cart = new Cart({
        firebaseUid,
        items: [],
      });
    }

    // Check whether the product already exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      // Add the new product to the existing cart
      cart.items.push({
        productId,
        quantity: 1,
      });
    }

    // Save the cart
    await cart.save();

    // Return cart with product details
    const updatedCart = await Cart.find({ firebaseUid }).populate(
      "items.productId",
    );

    res.status(200).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
});

//get cart data of one user

app.get("/api/cart/:firebaseUid", async (req, res) => {
  try {
    const { firebaseUid } = req.params;

    const cart = await Cart.find({ firebaseUid }).populate(
      "items.productId",
    );

    res.json({
      success: true,
      data: cart || { items: [] },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: error.message,
    });
  }
});

//cart quantity update

app.put("/api/cart/:firebaseUid/:productId", async (req, res) => {
  try {
    const { firebaseUid, productId } = req.params;
    const { quantity } = req.body;

    // Find the customer's cart
    const cart = await Cart.find({ firebaseUid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the selected product in the cart
    const item = cart.items.find(
      (item) => item.productId.toString() === productId,
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Update quantity
    item.quantity = quantity;
    await cart.save();

    // Return updated cart with product details
    const updatedCart = await Cart.find({ firebaseUid }).populate(
      "items.productId",
    );

    res.json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
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

    const cart = await Cart.find({ firebaseUid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Remove selected product
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId,
    );

    await cart.save();

    // Return updated cart
    const updatedCart = await Cart.find({ firebaseUid }).populate(
      "items.productId",
    );

    res.json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to remove product",
      error: error.message,
    });
  }
});

//create order

// Create order
app.post("/api/orders", async (req, res) => {
  try {
    const {
      firebaseUid,
      items,
      customer,
      address,
      paymentMethod,
      paymentStatus,
      subtotal,
      discount,
      deliveryFee,
      total,
      orderStatus,
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

     res.status(201).json({
       status: 'success',
      message: "Order placed successfully",
      data:order,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to place order",
      error: err.message,
    });
  }
});


//get all orders for admin

app.get("/api/orders/", async (req, res) => {
   try {
      const response = await Order.find().sort({ createdAt: -1 }).populate(
      "items.productId",
    );
      if (response) {
         return res.status(200).json({
            status: 'success',
            message: "Fetched all orders",
            data : response
         })
      }
   } catch (err) {
      return res.status(500).json({
            status: 'error',
            message: "Failed to fecth orders"
         })
   }
})

//get one order data
app.get("/api/orders/:id", async (req, res) => {
   try {
     
      const res = await Order.findById(req.params.id)
      .sort({ createdAt: -1 })
         .populate("items.productId");
      
    if (res) {
      return res.status(200).json({
        status: "success",
        message: "Fetched order data",
        data: response,
      });
    }
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fecth order data",
    });
  }
});

//find particular user orders
app.get("/api/orders/user/:firebaseUid", async (req, res) => {
  try {
    const response = await Order.find({
      firebaseUid: req.params.firebaseUid,
    })
      .sort({ createdAt: -1 })
        .populate("items.productId");
    if (response) {
      return res.status(200).json({
        status: "success",
        message: "Fetched all orders of user",
        data: response,
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch order of user",
      error: err.message,
    });
  }
});





// MONGODB CONNECTION AND SERVER STARTUP

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
