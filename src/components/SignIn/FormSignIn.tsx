import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { signInSchema } from '@/schema/signIn.schema'
import type { signInForm } from '@/schema/signIn.schema'
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';


const FormSignIn = () => {
    const { register, handleSubmit,
        formState: { errors } } = useForm<signInForm>({ resolver: zodResolver(signInSchema) })

    const { signInMutation } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: signInForm) => {
        try {
            const res = await signInMutation.mutateAsync(data)
            alert(res?.message || "Thành công")
            navigate("/")
        } catch (error: any) {
            alert(error.response.data.message)
        }
    };
    const handleSignInWithGoogle = async () => {
        window.open(`${import.meta.env.VITE_API_BASE_URL}/auth/google`, "_self");

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <Input placeholder="Email" type="email" {...register("email")} />
            <p className='text-red-300'>
                {errors?.email?.message}
            </p>
            <Input placeholder="Mật khẩu" type="password" {...register("password")} />
            <p className='text-red-300'>
                {errors?.password?.message}
            </p>
            <Button type='submit' className="w-full bg-orange-500 cursor-pointer hover:bg-orange-600 text-white" disabled={signInMutation.isPending}>
                ĐĂNG NHẬP
            </Button>

            <Button
                variant="outline"
                className="w-full border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-50"
                onClick={handleSignInWithGoogle}
                type='button'
            >
                ĐĂNG NHẬP GOOGLE
            </Button>

            <Button
                variant="outline"
                className="w-full border-red-600 cursor-pointer text-red-600 hover:bg-red-50"
            >
                ĐĂNG NHẬP FACEBOOK
            </Button>

            <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">
                    Dành cho khách hàng mới
                </span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <Button className="w-full m-0 p-0 bg-red-600 cursor-pointer hover:bg-red-700 text-white">
                <Link className='w-full p-2' to="/auth/sign-up"> ĐĂNG KÝ</Link>

            </Button>
        </form>
    )
}

export default FormSignIn