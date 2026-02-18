import FormSignUp from "@/components/SignUp/FormSignUp"
import HeaderSignUp from "@/components/SignUp/HeaderSignUp"
import {
    Card,
    CardContent,
} from "@/components/ui/card"

const SignUp = () => {
    return (
        <div>
            <div className="  flex items-center justify-center bg-gray-100">
                <Card className="w-105 rounded-sm shadow-md my-7">
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