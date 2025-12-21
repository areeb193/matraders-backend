// API Utility Library - Centralized API calls for MA Traders
// This file provides type-safe, reusable API functions

export interface Category {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: Category | string;
  stockQuantity: number;
  image?: string;
  createdAt?: string;
}

export interface OrderItem {
  product: Product | string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================================
// PRODUCT APIs
// ============================================================================

export const productAPI = {
  // Get all products
  getAll: async (): Promise<Product[]> => {
    const res = await fetch('/api/products', {
      cache: 'no-store' // Always get fresh data
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  // Get single product by ID
  getById: async (id: string): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch product');
    return res.json();
  },

  // Create product with FormData (for image upload)
  create: async (formData: FormData): Promise<Product> => {
    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create product');
    }
    return res.json();
  },

  // Update product (JSON only, no image update)
  update: async (id: string, data: Partial<Product>): Promise<Product> => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update product');
    }
    return res.json();
  },

  // Delete product
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete product');
    }
    return res.json();
  },

  // Search products
  search: async (query: string): Promise<Product[]> => {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },
};

// ============================================================================
// CATEGORY APIs
// ============================================================================

export const categoryAPI = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    const res = await fetch('/api/categories', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  // Get single category
  getById: async (id: string): Promise<Category> => {
    const res = await fetch(`/api/categories/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch category');
    return res.json();
  },

  // Create category
  create: async (data: Omit<Category, '_id'>): Promise<Category> => {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create category');
    }
    return res.json();
  },

  // Update category
  update: async (id: string, data: Partial<Category>): Promise<Category> => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update category');
    }
    return res.json();
  },

  // Delete category
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`/api/categories/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete category');
    }
    return res.json();
  },
};

// ============================================================================
// ORDER APIs
// ============================================================================

export const orderAPI = {
  // Get all orders
  getAll: async (): Promise<Order[]> => {
    const res = await fetch('/api/orders', {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    return res.json();
  },

  // Get single order
  getById: async (id: string): Promise<Order> => {
    const res = await fetch(`/api/orders/${id}`, {
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('Failed to fetch order');
    return res.json();
  },

  // Create order
  create: async (data: Omit<Order, '_id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to create order');
    }
    return res.json();
  },

  // Update order status
  updateStatus: async (id: string, status: Order['status']): Promise<Order> => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to update order');
    }
    return res.json();
  },

  // Delete order
  delete: async (id: string): Promise<{ message: string }> => {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to delete order');
    }
    return res.json();
  },
};

// ============================================================================
// UPLOAD API
// ============================================================================

export const uploadAPI = {
  // Upload image
  uploadImage: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || 'Failed to upload image');
    }
    return res.json();
  },
};

// ============================================================================
// STATISTICS / DASHBOARD APIs
// ============================================================================

export const statsAPI = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const [products, orders, categories] = await Promise.all([
      productAPI.getAll(),
      orderAPI.getAll(),
      categoryAPI.getAll(),
    ]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const pendingOrders = orders.filter(o => o.status === 'pending').length;
    const lowStockProducts = products.filter(p => p.stockQuantity < 10).length;

    return {
      totalProducts: products.length,
      totalOrders: orders.length,
      totalCategories: categories.length,
      totalRevenue,
      pendingOrders,
      lowStockProducts,
      products,
      orders,
      categories,
    };
  },
};
