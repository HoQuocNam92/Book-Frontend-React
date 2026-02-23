import type { Book } from "@/components/Dashboard/Products/types/Book";



export const seedBooks: Book[] = [
    {
        id: 1001,
        title: "Clean Code",
        sku: "BK-CC-001",
        price: 239000,
        salePercent: 17,
        stock: 24,
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        galleryUrls: [
            "https://images-na.ssl-images-amazon.com/images/I/41xShlnTZTL._SX374_BO1,204,203,200_.jpg",
        ],
        categories: ["Programming", "Best Seller"],
        author: "Robert C. Martin",
        publisher: "Prentice Hall",
        pages: 464,
        status: "ACTIVE",
        isFeatured: true,
        createdAt: "2026-02-01T10:00:00.000Z",
        updatedAt: "2026-02-08T10:00:00.000Z",
    },
    {
        id: 1002,
        title: "Atomic Habits",
        sku: "BK-AH-002",
        price: 189000,
        salePercent: null,
        stock: 8,
        coverUrl:
            "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
        galleryUrls: [
            "https://images-na.ssl-images-amazon.com/images/I/51-uspgqWIL._SX329_BO1,204,203,200_.jpg",
        ],
        categories: ["Self-help"],
        author: "James Clear",
        publisher: "Avery",
        pages: 320,
        status: "ACTIVE",
        isFeatured: false,
        createdAt: "2026-01-25T10:00:00.000Z",
        updatedAt: "2026-02-06T10:00:00.000Z",
    },
    {
        id: 1003,
        title: "Dế Mèn Phiêu Lưu Ký",
        sku: "BK-DM-003",
        price: 69000,
        salePercent: 14,
        stock: 0,
        coverUrl:
            "https://upload.wikimedia.org/wikipedia/vi/8/80/De_men_phieu_luu_ky.jpg",
        galleryUrls: [
            "https://upload.wikimedia.org/wikipedia/vi/8/80/De_men_phieu_luu_ky.jpg",
        ],
        categories: ["Vietnamese", "Kids"],
        author: "Tô Hoài",
        publisher: "Kim Đồng",
        pages: 160,
        status: "ARCHIVED",
        isFeatured: false,
        createdAt: "2025-12-15T10:00:00.000Z",
        updatedAt: "2026-01-10T10:00:00.000Z",
    },
]


