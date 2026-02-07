import {
    Card,
    CardContent,
} from "@/components/ui/card"
import FormSignIn from "@/components/SignIn/FormSignIn"
import Header from "@/components/SignIn/HeaderSignIn"
import { Link } from "react-router-dom"
const SignIn = () => {
    return (
        <div>
            <div className="flex items-center justify-center bg-gray-100">
                <Card className="w-105 rounded-sm shadow-md my-7">
                    <Header />
                    <CardContent  >
                        <p className="text-sm font-medium my-3">
                            Vui lòng nhập Email và Mật khẩu
                        </p>
                        <FormSignIn />

                        <div className="text-sm my-3">
                            <Link to="/auth/getpassword" className="text-orange-500 hover:underline">
                                Quên mật khẩu
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SignIn

