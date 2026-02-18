import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import { useState } from "react"
import { emailSchema } from "@/schema/email.schema"
export default function ResetPassword() {
    const { resetPasswordMutation } = useAuth();
    const [email, setEmail] = useState<string>("");

    const handleSubmit = async () => {
        try {
            emailSchema.parse({ email });
            const res = await resetPasswordMutation.mutateAsync(email)
            alert(res?.message || "Thành công")

        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    return (
        <div className=" flex items-center justify-center bg-gray-100">
            <div className="my-7 w-full max-w-md bg-white rounded-md shadow-sm border">

                {/* Header */}
                <div className="border-b px-6 py-3">
                    <h2 className="text-sm font-semibold text-orange-600 uppercase">
                        Đăng nhập
                    </h2>
                </div>

                <div className="px-6 py-5 space-y-4">
                    <label className="text-sm text-gray-700">
                        <span className="text-red-500">*</span> Nhập địa chỉ email:
                    </label>

                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Button
                        className="w-full bg-gray-100 cursor-pointer text-gray-800 hover:bg-gray-200"
                        variant="secondary"
                        onClick={handleSubmit}
                        disabled={resetPasswordMutation.isPending}
                    >
                        Xác nhận
                    </Button>
                </div>
            </div>
        </div>
    )
}
