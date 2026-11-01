import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../Models/Product.js";
import Inventory from "../Models/Inventory.js";

dotenv.config();

const createInventory = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const products = await Product.find().select("_id name stock");

    let createdCount = 0;
    let skippedCount = 0;

    for (const product of products) {
      const existingInventory = await Inventory.findOne({
        productId: product._id,
      });

      if (existingInventory) {
        skippedCount++;
        continue;
      }

      await Inventory.create({
        productId: product._id,

        // Preserve the stock value from existing products.
        stock: product.stock ?? 0,

        reorderLevel: 10,
      });

      console.log(`Inventory created for: ${product.name}`);
      createdCount++;
    }

    console.log("\nMigration completed!");
    console.log("Products found:", products.length);
    console.log("Inventory records created:", createdCount);
    console.log("Already existing records skipped:", skippedCount);
  } catch (error) {
    console.error("Migration failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

createInventory();
