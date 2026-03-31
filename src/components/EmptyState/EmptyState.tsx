type Props = {
    message?: string;
};

export default function EmptyState({ message = "Không tìm thấy sản phẩm" }: Props) {
    return (
        <div className="flex items-center justify-center py-10 text-gray-500 text-sm">
            <p>{message}</p>
        </div>
    );
}