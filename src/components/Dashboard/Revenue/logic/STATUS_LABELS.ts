export const STATUS_LABELS: Record<string, { label: string; className: string }> = {
    paid: { label: "Đã thanh toán", className: "bg-green-100 text-green-700" },
    confirmed: { label: "Đã xác nhận", className: "bg-blue-100 text-blue-700" },
    pending: { label: "Chờ xử lý", className: "bg-yellow-100 text-yellow-700" },
    shipping: { label: "Đang giao", className: "bg-blue-100 text-blue-700" },
    cancelled: { label: "Đã hủy", className: "bg-red-100 text-red-700" },
    completed: { label: "Hoàn thành", className: "bg-purple-100 text-purple-700" },
};
