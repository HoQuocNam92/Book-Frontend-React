 # 📚 Book Frontend React

## 🚀 Giới thiệu

**Book Frontend React** là dự án frontend cho hệ thống bán sách online, được xây dựng bằng **React + TypeScript**.

Dự án cung cấp các chức năng cơ bản của một website thương mại điện tử như:

* Đăng ký / Đăng nhập
* Xem danh sách sách
* Chi tiết sản phẩm
* Giỏ hàng
* Áp dụng mã giảm giá (coupon)
* Thanh toán
* Trang quản lý (admin/dashboard)

---

## 🛠️ Công nghệ sử dụng

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
src/
│── components/      # UI components (Button, Card, Modal...)
│── pages/           # Các trang chính (Home, Login, Cart...)
│── services/        # Gọi API (axios)
│── hooks/           # Custom hooks
│── store/           # State management (Redux/Zustand nếu có)
│── utils/           # Helper functions
│── layouts/         # Layout chung (MainLayout, AuthLayout...)
│── routes/          # Routing
│── assets/          # Hình ảnh, icon
```

---

## ⚙️ Cài đặt

### 1. Clone project

```bash
git clone https://github.com/your-username/book-frontend-react.git
cd book-frontend-react
```

### 2. Cài dependencies

```bash
npm install
# hoặc
yarn
```

### 3. Cấu hình môi trường

Tạo file `.env`:

```env
VITE_API_URL=http://localhost:8080/api
```

### 4. Chạy project

```bash
npm run dev
```

Project sẽ chạy tại:

```
http://localhost:5173
```

---

## 🔑 Chức năng chính

### 👤 Authentication

* Đăng ký tài khoản
* Đăng nhập / đăng xuất
* Lưu token (JWT)

### 🛍️ Sản phẩm

* Hiển thị danh sách sách
* Xem chi tiết sách
* Tìm kiếm / lọc sản phẩm

### 🛒 Giỏ hàng

* Thêm / xoá sản phẩm
* Cập nhật số lượng
* Tính tổng tiền

### 🎟️ Coupon

* Áp dụng mã giảm giá
* Validate coupon từ server

### 💳 Thanh toán

* Checkout
* Hiển thị thông tin đơn hàng

### 🛠️ Admin Dashboard

* Quản lý sản phẩm
* Quản lý đơn hàng
* Quản lý coupon

---

## 🔌 API

Project sử dụng API backend riêng.

Ví dụ:

```ts
import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
```

---

## 🐳 Docker

Build và chạy bằng Docker:

```bash
docker build -t book-frontend .
docker run -p 3000:3000 book-frontend
```

---

## 📸 Demo

> (Thêm ảnh demo UI tại đây)

---

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón!

```bash
# Fork repo
# Tạo branch mới
git checkout -b feature/your-feature

# Commit
git commit -m "Add new feature"

# Push
git push origin feature/your-feature
```

---

## 📄 License

MIT License

---

## 👨‍💻 Tác giả

**Ho Quoc Nam
