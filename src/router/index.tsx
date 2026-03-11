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
import HomeBookshelfSection from '@/components/Home/HomeBookshelfSection';
import ProductForm from '@/components/Dashboard/Products/ProductForm';
import BrandsDashboard from '@/components/Dashboard/Brands/BrandsDashboard';
import CategoriesDashboard from '@/components/Dashboard/Categories/CategoriesDashboard';
import UsersDashboard from '@/components/Dashboard/Users/UsersDashboard';
import OrdersDashboard from '@/components/Dashboard/Orders/OrdersDashboard';
import Cart from '@/pages/Cart';
import CheckoutPage from '@/components/Checkout/CheckoutPage';
import Profile from '@/pages/Profile';
import ProductDetail from '@/pages/ProductDetail';
import BannersDashboard from '@/components/Dashboard/Banners/BannersDashboard';
import CouponsDashboard from '@/components/Dashboard/Coupons/CouponsDashboard';
import RevenueDashboard from '@/components/Dashboard/Revenue/RevenueDashboard';
import NewsDashboard from '@/components/Dashboard/News/NewsDashboard';
import NewsPage from '@/pages/NewsPage';
import NewsDetail from '@/pages/NewsDetail';
import OAuthSuccess from '@/pages/OAuthSuccess';
import ProtectedRoute from '../pages/ProtectedRoute';
import CheckoutSuccess from '@/components/Checkout/CheckoutSuccess';

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
                    path: '/danh-muc/:category_slug?',
                    element: <BookByCategory />
                },
                {
                    path: '/tin-tuc',
                    element: <NewsPage />
                },
                {
                    path: '/tin-tuc/:slug',
                    element: <NewsDetail />
                },
                {
                    path: '/gio-hang',
                    element: <Cart />
                },
                {
                    path: '/thanh-toan',
                    element: <CheckoutPage />
                },
                {
                    path: '/ho-so',
                    element: <Profile />
                },
                {
                    path: '/dat-hang-thanh-cong',
                    element: <CheckoutSuccess />
                },
                {
                    path: '/:slug',
                    element: <ProductDetail />
                }
                , {
                    path: '/oauth-success',
                    element: <OAuthSuccess />
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
            element: <ProtectedRoute roles={[1, 3]}>
                <DashboardLayout />
            </ProtectedRoute>,
            children: [
                {
                    path: 'overviews?',
                    element: <OverviewsDashboard />
                },
                {
                    path: 'orders',
                    element: <OrdersDashboard />
                },
                {
                    path: 'products',
                    element: <ProductsDashboard />,

                },
                {
                    path: 'products/create',
                    element: <ProductForm />,

                },
                {
                    path: 'products/edit/:slug',
                    element: <ProductForm />,
                },
                {
                    path: 'brands',
                    element: <BrandsDashboard />,
                },
                {
                    path: 'categories',
                    element: <CategoriesDashboard />,
                },
                {
                    path: 'users',
                    element: <UsersDashboard />,
                },
                {
                    path: 'banners',
                    element: <BannersDashboard />
                },
                {
                    path: 'coupons',
                    element: <CouponsDashboard />
                },
                {
                    path: 'revenue',
                    element: <RevenueDashboard />
                },
                {
                    path: 'news',
                    element: <NewsDashboard />
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


