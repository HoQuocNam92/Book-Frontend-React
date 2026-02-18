import { createBrowserRouter } from 'react-router-dom'
import SignIn from '@/pages/SignIn';
import MainLayout from '../layouts/MainLayou';
import SignUp from '@/pages/SignUp';
import FormReset from '@/components/ResetPassoword/FormReset';
import BookByCategory from '@/pages/BookByCategory';
import Oops from '@/pages/Oops';
import NotFound from '@/pages/NotFound';
import DashboardLayout from '@/layouts/DashboardLayout';
import ProductsDashboard from '@/components/Dashboard/Products/ProductsDashboard';
import OverviewsDashboard from '@/components/Dashboard/Overviews/OverviewsDashboard';
import ProductDetailPage from '@/components/Detail/ProductDetailPage';
import HomeBookshelfSection from '@/components/Home/HomeBookshelfSection';
import ProductForm from '@/components/Dashboard/Products/ProductForm';
export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <HomeBookshelfSection />
                }
                ,
                {
                    path: '/danh-muc/:slug?',
                    element: <BookByCategory />
                },
                {
                    path: '/:slug',
                    element: <ProductDetailPage />
                }

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
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                {
                    path: 'overviews?',
                    element: <OverviewsDashboard />
                },
                {
                    path: 'orders',
                    element: <ProductsDashboard />
                },
                {
                    path: 'products',
                    element: <ProductsDashboard />,

                },
                {
                    path: 'products/create',
                    element: <ProductForm />,

                }
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

