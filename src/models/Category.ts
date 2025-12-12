import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

const Category = (mongoose.models.Category as mongoose.Model<any>) || mongoose.model('Category', CategorySchema);
export default Category;
