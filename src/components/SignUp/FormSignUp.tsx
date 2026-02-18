import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useAuth from '@/hooks/useAuth';
import { signUpSchema } from '@/schema/signUp,schema';
import type { signUpForm } from '@/schema/signUp,schema';
import { Link, useNavigate } from 'react-router-dom';


const FormSignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<signUpForm>({ resolver: zodResolver(signUpSchema) })
    const {
        signUpMutation } = useAuth();
    const navigate = useNavigate();
    const onSubmit = async (data: signUpForm) => {
        try {
            const res = await signUpMutation.mutateAsync(data)
            alert(res?.message || "Thành công")
            navigate("/auth/sign-in")

        } catch (error: any) {
            alert(error.response.data.message)
        }
    }
    const handleSignInWithGoogle = () => {
        window.open(`${import.meta.env.VITE_BASE_URL}/auth/google`, "_self");
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <p className='text-red-300 m-0'>
                {errors?.name?.message}
            </p>
            <Input placeholder="Họ và tên" type="text" {...register("name")} />
            <p className='text-red-300 m-0'>
                {errors?.email?.message}
            </p>
            <Input placeholder="Địa chỉ email" type="email" {...register("email")} />
            <p className='text-red-300 m-0'>
                {errors?.password?.message}
            </p>
            <Input placeholder="Mật khẩu" type="password" {...register("password")} />
            <p className='text-red-300 m-0'>
                {errors?.phone?.message}
            </p>
            <Input placeholder="Số điện thoại" type="text" {...register("phone")} />

            <Button type='submit' className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white" disabled={signUpMutation.isPending}>
                ĐĂNG KÝ
            </Button>

            <Button
                variant="outline"
                className="w-full   border-blue-600 cursor-pointer text-blue-600 hover:bg-blue-50"
                onClick={handleSignInWithGoogle}
                type='button'
            >
                ĐĂNG NHẬP GOOGLE
            </Button>

            <Button
                variant="outline"
                className="w-full  border-red-600 cursor-pointer text-red-600 hover:bg-red-50"
            >
                ĐĂNG NHẬP FACEBOOK
            </Button>

            <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-sm text-gray-500">
                    Bạn đã có tài khoản?

                </span>
                <div className="flex-1 h-px bg-gray-300" />
            </div>

            <Button className="w-full  m-0 p-0 bg-red-600 hover:bg-red-700 text-white">
                <Link className='w-full p-2' to="/auth/sign-in"> ĐĂNG NHẬP</Link>
            </Button>
        </form>
    )
}

export default FormSignUp