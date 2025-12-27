export const MOCK_STATS = {
  data: {
    total_users: 1540,
    total_orders: 892,
    total_categories: 12,
    total_ads: 24
  }
};

export const MOCK_USERS = {
  data: Array(10).fill(null).map((_, i) => ({
    id: `user-${i}`,
    name: "محمد احمد علي",
    email: "user@example.com",
    phone: "0123456789",
    status: i % 2 === 0 ? "active" : "inactive",
    created_at: "2025-12-27T10:00:00Z"
  }))
};

export const MOCK_ADS = {
  data: Array(8).fill(null).map((_, i) => ({
    id: `ad-${i}`,
    title: "اعلان تجريبي",
    image: "/icons/Logo.png",
    status: i % 2 === 0 ? "active" : "inactive",
    created_at: "2025-12-27T10:00:00Z"
  }))
};

export const MOCK_CATEGORIES = {
  data: Array(8).fill(null).map((_, i) => ({
    id: `cat-${i}`,
    name: "فئة المطاعم",
    image: "/icons/Logo.png",
    priority: i + 1,
    sub_categories: [{ name: "Name1" }, { name: "Name2" }],
    status: i % 2 === 0 ? "active" : "inactive",
    created_at: "2025-12-27T10:00:00Z"
  }))
};

export const MOCK_ORDERS = {
  data: Array(10).fill(null).map((_, i) => ({
    id: `order-${i}`,
    user: { name: "محمد احمد علي" },
    product: { name: "سماعة الكترونية..." },
    category: { name: "الالكترونيات" },
    type: i % 2 === 0 ? "update" : "new",
    points: 1598,
    status: i % 3 === 0 ? "rejected" : i % 3 === 1 ? "pending" : "accepted",
    created_at: "2025-12-27T10:00:00Z"
  }))
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
      images: ["/icons/Logo.png", "/icons/Logo.png"]
    },
    category: { name: "الالكترونيات" },
    stores: [{ name: "Noon" }, { name: "Zara" }],
    suggested_prices: [
      { price: 123.5, store_name: "ماجيلا" }
    ]
  }
};

export const MOCK_POINTS = {
  data: Array(10).fill(null).map((_, i) => ({
    id: `point-${i}`,
    user: { name: "محمد احمد علي" },
    points: 1598,
    amount: 120.56,
    status: i % 3 === 0 ? "completed" : i % 3 === 1 ? "pending" : "rejected",
    created_at: "2025-12-27T10:00:00Z"
  }))
};

export const MOCK_SETTINGS = {
  data: {
    visitor_mode: false,
    smtp_host: "Mail.cdl.eilk.tepldck.site",
    smtp_port: "7493",
    smtp_user: "Mail.cdl.eilk.tepldck.site",
    smtp_encryption: "SSL"
  }
};

export const MOCK_PROFILE = {
    data: {
        id: "admin-1",
        name: "مدير النظام",
        email: "admin@shhal.com"
    }
}
