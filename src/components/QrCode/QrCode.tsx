import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
const QrCode = ({ qrUrl, setQrUrl, timeLeft }: {
    qrUrl: string | null,
    setQrUrl: (url: string | null) => void,
    timeLeft: number
}) => {
    return (
        <div>
            <Dialog open={!!qrUrl} onOpenChange={() => setQrUrl(null)}>
                <DialogContent className="sm:max-w-md text-center">

                    <DialogHeader>
                        <DialogTitle>Thanh toán bằng QR</DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col items-center gap-4">
                        <img
                            src={qrUrl || ""}
                            alt="QR Payment"
                            className="w-96 h-96 object-contain border rounded-lg p-2"
                        />

                        <p className="text-lg text-gray-500">
                            Vui lòng quét mã QR để hoàn tất thanh toán
                        </p>
                        <p className="text-lg text-red-500">
                            QR hết hạn sau: {Math.ceil(timeLeft / 60)}:{timeLeft % 60}
                        </p>
                        <button
                            onClick={() => setQrUrl(null)}
                            className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-80"
                        >
                            Đóng
                        </button>
                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default QrCode