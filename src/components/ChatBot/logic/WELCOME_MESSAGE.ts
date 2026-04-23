import type { Message } from "@/types/Message";

export const WELCOME_MESSAGE: Message = {
    id: "welcome",
    content:
        "Xin chào! 👋 Mình là trợ lý AI của **Alpha Books**. Mình có thể giúp bạn:\n\n- 📚 Tìm kiếm sách\n- 📦 Tra cứu đơn hàng\n- 💳 Hỗ trợ thanh toán\n- 🚚 Thông tin giao hàng\n\nBạn cần giúp gì nào? 😊",
    sender: "bot",
    timestamp: new Date().toISOString(),
};
