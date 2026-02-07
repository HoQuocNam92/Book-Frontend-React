import { createBrowserRouter } from 'react-router-dom'
import SignIn from '@/pages/SignIn';
import MainLayout from '../layouts/MainLayou';
import SignUp from '@/pages/SignUp';
import FormReset from '@/components/ResetPassoword/FormReset';
import BookByCategory from '@/pages/BookByCategory';
import Oops from '@/pages/Oops';
import NotFound from '@/pages/NotFound';
export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    path: '/danh-muc/:slug?',
                    element: <BookByCategory />
                },

            ]
        },
        {
            path: '/auth',
            element: <MainLayout />,
            children: [
                {
                    path: 'sign-in',
                    element: <SignIn />
                },
                {
                    path: 'sign-up',
                    element: <SignUp />
                }
                ,
                {
                    path: 'getpassword',
                    element: <FormReset />
                },



            ]
        },
        {
            path: '/oops',
            element: <Oops />
        },
        {
            path: '*',
            element: <NotFound />
        }
    ]
)

