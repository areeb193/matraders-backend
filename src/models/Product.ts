import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  stockQuantity: { type: Number, default: 0 },
  image: { type: String, default: '' }, // Image URL/path for product
  createdAt: { type: Date, default: Date.now }
});

const Product = (mongoose.models.Product as mongoose.Model<any>) || mongoose.model('Product', ProductSchema);
export default Product;
