import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  priceAtTimeOfOrder: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
  items: { type: [OrderItemSchema], required: true },
  customerName: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
  createdAt: { type: Date, default: Date.now }
});

const Order = (mongoose.models.Order as mongoose.Model<any>) || mongoose.model('Order', OrderSchema);
export default Order;
