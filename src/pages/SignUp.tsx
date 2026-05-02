import FormSignUp from "@/components/SignUp/FormSignUp"
import HeaderSignUp from "@/components/SignUp/HeaderSignUp"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

const SignUp = () => {
    return (
        <div>
            <div className="flex min-h-[70vh] items-center justify-center bg-gray-100 px-4 py-8">
                <Card className="my-7 w-full max-w-md rounded-sm shadow-md">
                    <HeaderSignUp />
                    <CardContent  >
                        <p className="text-sm font-medium my-3">
                            Vui lòng nhập Email và Mật khẩu
                        </p>
                        <FormSignUp />

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignUp