# 📚 AlphaBooks — Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React%20Query-5-FF4154?logo=reactquery&logoColor=white" />
  <img src="https://img.shields.io/badge/Zustand-5-orange" />
  <img src="https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker&logoColor=white" />
</p>

Giao diện web cho hệ thống thương mại điện tử **AlphaBooks** — nền tảng bán sách trực tuyến. Xây dựng bằng React 19 với React Compiler, mang đến trải nghiệm mượt mà với dark mode, animations, responsive design, và tích hợp đầy đủ tính năng e-commerce hiện đại.

---

## ✨ Tính năng nổi bật

### 🛍️ E-Commerce
- 📖 Duyệt & tìm kiếm sách (Elasticsearch)
- 🔍 Bộ lọc theo danh mục, thương hiệu, giá
- 🛒 Giỏ hàng real-time
- 🎟️ Áp dụng mã giảm giá (coupon)
- 💳 Checkout với tính phí vận chuyển GHN
- 📦 Theo dõi đơn hàng & trạng thái giao hàng
- ⭐ Đánh giá & nhận xét sách
- 📰 Tin tức & blog

### 👤 User
- 🔐 Đăng ký / Đăng nhập (JWT)
- 🔑 Google OAuth 2.0
- 👤 Quản lý profile & avatar
- 📍 Quản lý địa chỉ giao hàng (tích hợp Goong Maps)
- 🔒 Quên & đặt lại mật khẩu

### 🛠️ Admin Dashboard
- 📊 Tổng quan doanh thu (biểu đồ Recharts)
- 📚 CRUD sản phẩm (kéo thả hình ảnh với DnD Kit)
- 📋 Quản lý đơn hàng
- 🎟️ Quản lý coupon
- 🖼️ Quản lý banner (drag & drop)
- 📰 Quản lý tin tức (Quill rich editor)
- 🏷️ Quản lý danh mục & thương hiệu
- 🔧 Quản lý dịch vụ

### 🤖 AI & UX
- 💬 Chatbot AI (RAG-powered, markdown rendering)
- 🗺️ Tích hợp bản đồ Goong
- 🎠 Image carousel (Swiper)
- 🌐 QR Code thanh toán
- 📱 Responsive trên mọi thiết bị

---

* ⚛️ ReactJS
* 🟦 TypeScript
* 🎨 Tailwind CSS
* 🧩 Shadcn/ui
* 🔄 Axios
* 📦 Vite
* 🐳 Docker

---

## 📂 Cấu trúc thư mục

```
frontend/
├── public/                    # Static assets
├── src/
│   ├── main.tsx               # App entry point
│   ├── App.tsx                # Root component
│   ├── index.css              # Global styles & design tokens
│   ├── assets/                # Images, icons, fonts
│   ├── components/            # UI components
│   │   ├── ui/                #   ShadCN base components
│   │   ├── common/            #   Shared components
│   │   ├── Home/              #   Homepage sections
│   │   ├── Header/            #   Navigation header
│   │   ├── Footer/            #   Footer
│   │   ├── Books/             #   Book listing & grid
│   │   ├── Detail/            #   Product detail page
│   │   ├── Cart/              #   Shopping cart
│   │   ├── Checkout/          #   Checkout flow
│   │   ├── Orders/            #   Order management
│   │   ├── Dashboard/         #   Admin dashboard
│   │   ├── Profile/           #   User profile
│   │   ├── SignIn/            #   Login form
│   │   ├── SignUp/            #   Register form
│   │   ├── Reviews/           #   Product reviews
│   │   ├── Related/           #   Related products
│   │   ├── ChatBot/           #   AI chatbot widget
│   │   ├── Swiper/            #   Image carousels
│   │   ├── DndKit/            #   Drag & drop components
│   │   ├── Breadcrumb/        #   Breadcrumb navigation
│   │   ├── QrCode/            #   QR payment
│   │   ├── EmptyState/        #   Empty state illustrations
│   │   └── ResetPassoword/    #   Password reset
│   ├── pages/                 # Route page components
│   ├── layouts/               # Layout wrappers
│   ├── router/                # Route definitions
│   ├── services/              # API service layer (Axios)
│   ├── hooks/                 # Custom React hooks
│   ├── stores/                # Zustand stores
│   ├── types/                 # TypeScript type definitions
│   ├── schema/                # Zod validation schemas
│   ├── lib/                   # Utility libraries
│   ├── utils/                 # Helper functions
│   └── styles/                # Additional stylesheets
├── components.json            # ShadCN UI config
├── vite.config.ts             # Vite configuration
├── tsconfig.json              # TypeScript config
├── eslint.config.js           # ESLint flat config
├── Dockerfile                 # Docker build
└── package.json
```

---

## ⚙️ Cài đặt & Chạy

### Yêu cầu

- **Node.js** ≥ 20
- **npm** ≥ 9
- Backend API đang chạy tại `http://localhost:8080`

### 1. Clone & Install

```bash
git clone https://github.com/your-username/alphaBooks-React.git
cd alphaBooks-React/frontend
npm install
```

### 2. Cấu hình môi trường

Tạo file `.env`:

```env
# ── API ──
VITE_API_BASE_URL=http://localhost:8080/api

# ── Chatbot ──
VITE_STORAGE_KEY=alphabooks_chatbot_history
VITE_MAX_HISTORY=100

# ── Goong Maps ──
VITE_GOONG_API_KEY=your_goong_api_key
VITE_GOONG_MAP_KEY=your_goong_map_key
VITE_WAREHOUSE_LAT=21.028511
VITE_WAREHOUSE_LNG=105.804817
VITE_GOONG_VEHICLE=bike
```

### 3. Chạy Development

```bash
npm run dev
```

App chạy tại: **http://localhost:5173**

### 4. Build Production

```bash
npm run build
npm run preview    # Preview production build
```

---

## 🔧 Scripts

```bash
npm run dev        # Development server (HMR)
npm run build      # TypeScript check + Vite production build
npm run preview    # Preview production build
npm run lint       # ESLint check
npm run format     # Prettier format
```

---

## 🏗️ Build Optimizations

Vite config đã tối ưu với **code splitting**:

| Chunk | Packages |
|-------|----------|
| `vendor-react` | react, react-dom, react-router-dom |
| `vendor-query` | @tanstack/react-query |
| `vendor-swiper` | swiper |
| `vendor-recharts` | recharts |
| `vendor-quill` | quill, react-quill-new |
| `vendor-dnd` | @dnd-kit/core, sortable, utilities |
| `vendor-form` | react-hook-form, @hookform/resolvers, zod |
| `vendor-date` | date-fns, dayjs |

---

## 🐳 Docker

```bash
# Build image
docker build -t alphabooks-frontend .

# Run container
docker run -p 5173:5173 alphabooks-frontend

# Hoặc chạy toàn bộ stack (từ thư mục root)
cd ..
docker compose up -d
```

---

## 🔌 Kết nối Backend

Frontend giao tiếp với backend thông qua Axios instance:

```typescript
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
```

Các API services được tổ chức theo module trong `src/services/`.

---

## 📱 Pages

| Route | Component | Mô tả |
|-------|-----------|--------|
| `/` | Home | Trang chủ |
| `/sign-in` | SignIn | Đăng nhập |
| `/sign-up` | SignUp | Đăng ký |
| `/books/:slug` | ProductDetail | Chi tiết sách |
| `/category/:slug` | BookByCategory | Sách theo danh mục |
| `/cart` | Cart | Giỏ hàng |
| `/profile` | Profile | Thông tin cá nhân |
| `/orders/:id` | OrderDetailPage | Chi tiết đơn hàng |
| `/news` | NewsPage | Danh sách tin tức |
| `/news/:slug` | NewsDetail | Chi tiết tin tức |
| `/reset-password` | ResetPassword | Đặt lại mật khẩu |
| `/dashboard/*` | Dashboard | Admin panel |
| `/oauth/success` | OAuthSuccess | OAuth callback |

---

## 🤝 Đóng góp

```bash
# Fork repo → Clone → Tạo branch
git checkout -b feature/your-feature

# Commit & Push
git commit -m "feat: add new feature"
git push origin feature/your-feature

# Tạo Pull Request
```

---

## 📄 License

MIT License

---

## 👨‍💻 Tác giả

**Ho Quoc Nam** 🚀

---

⭐ Nếu thấy hữu ích hãy star repo nhé!
