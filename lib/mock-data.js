export const MOCK_STATS = {
  data: {
    total_users: 1540,
    total_orders: 892,
    total_categories: 12,
    total_ads: 24,
  },
};

export const MOCK_USERS = {
  data: Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `user-${i}`,
      name: "محمد احمد علي",
      email: "user@example.com",
      phone: "0123456789",
      status: i % 2 === 0 ? "active" : "suspended",
      created_at: "2025-12-27T10:00:00Z",
    })),
};

export const MOCK_ADS = {
  data: Array(8)
    .fill(null)
    .map((_, i) => ({
      id: `ad-${i}`,
      title: "اعلان تجريبي",
      image: "/icons/Logo.png",
      status: i % 2 === 0 ? "active" : "inactive",
      created_at: "2025-12-27T10:00:00Z",
    })),
};

export const MOCK_CATEGORIES = {
  data: Array(8)
    .fill(null)
    .map((_, i) => ({
      id: `cat-${i}`,
      name: "فئة المطاعم",
      image: "/icons/Logo.png",
      priority: i + 1,
      sub_categories: [{ name: "Name1" }, { name: "Name2" }],
      status: i % 2 === 0 ? "active" : "inactive",
      created_at: "2025-12-27T10:00:00Z",
    })),
};

export const MOCK_CATEGORY_STATS = {
  active_categories: 5,
  inactive_categories: 15,
  new_categories: 30,
  total_categories: 50,
  active_percentage: 6.08,
  inactive_percentage: -6.08,
  new_percentage: 6.08,
  total_percentage: 6.08,
};

export const MOCK_PRODUCT_STATS = {
  active_products: 5,
  inactive_products: 15,
  new_products: 30,
  total_products: 50,
  active_percentage: 6.08,
  inactive_percentage: -6.08,
  new_percentage: 6.08,
  total_percentage: 6.08,
};

export const MOCK_PRODUCTS = {
  data: Array(8)
    .fill(null)
    .map((_, i) => ({
      id: `prod-${i}`,
      barcode: `123456789012${i}`,
      category_id: 1,
      sub_category_id: 1,
      name_ar: "منتج تجريبي",
      name_en: "Test Product",
      description: "وصف المنتج",
      views_count: 0,
      created_at: "2026-01-14T10:43:33.000000Z",
      updated_at: "2026-01-14T10:43:33.000000Z",
      category: {
        id: 1,
        name: "ملابس",
        image: null,
        status: "active",
        created_at: "2026-01-14T10:38:05.000000Z",
        updated_at: "2026-01-14T10:38:05.000000Z",
      },
      sub_category: {
        id: 1,
        category_id: 1,
        name: "رجالي",
        created_at: "2026-01-14T10:38:05.000000Z",
        updated_at: "2026-01-14T10:38:05.000000Z",
      },
      images: [],
      variants: [
        {
          id: 1,
          product_id: 1,
          attribute_key: "color",
          attribute_value: "أسود",
          created_at: "2026-01-14T10:43:33.000000Z",
          updated_at: "2026-01-14T10:43:33.000000Z",
        },
      ],
      branches: [
        {
          id: 1,
          store_id: 1,
          name: "فرع تجريبي",
          longitude: "36.2028000",
          latitude: "33.5138000",
          created_at: "2026-01-14T10:26:38.000000Z",
          updated_at: "2026-01-14T10:26:38.000000Z",
          pivot: {
            product_id: 1,
            branch_id: 1,
            price: "99.99",
            created_at: "2026-01-14T10:43:33.000000Z",
            updated_at: "2026-01-14T10:43:33.000000Z",
          },
          store: {
            id: 1,
            name: "متجر تجريبي",
            created_at: "2026-01-13T21:29:35.000000Z",
            updated_at: "2026-01-13T21:29:35.000000Z",
          },
        },
      ],
    })),
};

export const MOCK_ORDERS = {
  data: Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `order-${i}`,
      user: { name: "محمد احمد علي" },
      product: { name: "سماعة الكترونية..." },
      category: { name: "الالكترونيات" },
      type: i % 2 === 0 ? "update" : "new",
      points: 1598,
      status: i % 3 === 0 ? "rejected" : i % 3 === 1 ? "pending" : "accepted",
      created_at: "2025-12-27T10:00:00Z",
    })),
};

export const MOCK_ORDER_DETAILS = {
  data: {
    id: "12132121313",
    status: "pending",
    type: "new",
    points: 42,
    product: {
      name: "ساعة ذكية بمواصفات خارقة",
      description: "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة...",
      rating: 4.7,
      views: 21671,
      images: ["/icons/Logo.png", "/icons/Logo.png"],
    },
    category: { name: "الالكترونيات" },
    stores: [{ name: "Noon" }, { name: "Zara" }],
    suggested_prices: [{ price: 123.5, store_name: "ماجيلا" }],
  },
};

export const MOCK_POINTS = {
  data: Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `point-${i}`,
      user: { name: "محمد احمد علي" },
      points: 1598,
      amount: 120.56,
      status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "pending" : "rejected",
      created_at: "2025-12-27T10:00:00Z",
    })),
};

export const MOCK_SETTINGS = {
  data: {
    id: 1,
    is_public: true,
    status: "open",
    created_at: "2026-01-27T20:17:56.000000Z",
    updated_at: "2026-01-27T20:17:56.000000Z",
  },
};

export const MOCK_PROFILE = {
  data: {
    id: "admin-1",
    name: "مدير النظام",
    email: "admin@shhal.com",
  },
};
