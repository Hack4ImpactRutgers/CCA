import mongoose from "mongoose";
const { Schema, Types } = mongoose;

const orderSchema = new mongoose.Schema(
  {
    client: { type: Types.ObjectId, ref: Schema.Client, required: true },
    assignedVolunteers: [ {type: Types.ObjectId, ref: Schema.Volunteer} ],
    createdOn: { type: Date },
    deliverBy: { type: Date },
    cost: { type: Number },
    deliveryStatus: { type: String, enum: ["unassigned", "assigned", "delivered"] }
  });

const orderModel = mongoose.model("order", orderSchema);

export default orderModel;