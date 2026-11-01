import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    reorderLevel: {
      type: Number,
      required: true,
      default: 10,
      min: 0,
    },
    adjustType: {
      type: String,
      default: "add",
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Inventory = mongoose.model("Inventory", inventorySchema);

export default Inventory;
