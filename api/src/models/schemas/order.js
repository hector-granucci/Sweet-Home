import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  product: [{ type: Schema.Types.ObjectId, required: true, ref: "Product" }],
  quantity:{ type: Number },
  totalPrice: { type: Number, required: true, default: 0.0 },
  padAt: { type: Date }
});

const Order = mongoose.model("Order", orderSchema)

export default Order 