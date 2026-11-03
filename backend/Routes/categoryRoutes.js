import express from "express";
import fs from "fs";
import path from "path";

import Category from "../Models/Category.js";
import createUpload from "../Middleware/upload.js";

const router = express.Router();
const categoryUpload = createUpload("categories");

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

// ==================================================
// CATEGORY API CALLS
// ==================================================

// Add category
router.post(
  "/",
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
router.get("/", async (req, res) => {
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
router.put(
  "/:id",
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
router.delete("/:id", async (req, res) => {
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

export default router;
