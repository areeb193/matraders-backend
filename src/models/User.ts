import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name must not exceed 100 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true, // Index for faster queries
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false, // Don't return password by default for security
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
    index: true, // Index for role-based queries
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true, // Index for date-based queries
  },
});

// Add compound index for email + role queries (performance optimization)
UserSchema.index({ email: 1, role: 1 });

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
