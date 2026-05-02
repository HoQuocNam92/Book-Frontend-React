import { createBrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '../layouts/MainLayou';
import ProtectedRoute from '../pages/ProtectedRoute';
import { SpinnerCustom } from '@/components/ui/spinner';

// Lazy-loaded pages (code splitting)
const SignIn = lazy(() => import('@/pages/SignIn'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const FormReset = lazy(() => import('@/components/ResetPassoword/FormReset'));
const BookByCategory = lazy(() => import('@/pages/BookByCategory'));
const Oops = lazy(() => import('@/pages/Oops'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const HomeBookshelfSection = lazy(() => import('@/components/Home/HomeBookshelfSection'));
const Cart = lazy(() => import('@/pages/Cart'));
const Profile = lazy(() => import('@/pages/Profile'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
const NewsPage = lazy(() => import('@/pages/NewsPage'));
const NewsDetail = lazy(() => import('@/pages/NewsDetail'));
const OAuthSuccess = lazy(() => import('@/pages/OAuthSuccess'));
const CheckoutPage = lazy(() => import('@/components/Checkout/CheckoutPage'));
const CheckoutSuccess = lazy(() => import('@/components/Checkout/CheckoutSuccess'));
const OrderDetailPage = lazy(() => import('@/pages/OrderDetailPage'));

// Dashboard (heavy: Recharts, Quill, DndKit) — only loaded when admin navigates here
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));
const ProductsDashboard = lazy(() => import('@/components/Dashboard/Products/ProductsDashboard'));
const OverviewsDashboard = lazy(() => import('@/components/Dashboard/Overviews/OverviewsDashboard'));
const ProductForm = lazy(() => import('@/components/Dashboard/Products/ProductForm'));
const BrandsDashboard = lazy(() => import('@/components/Dashboard/Brands/BrandsDashboard'));
const CategoriesDashboard = lazy(() => import('@/components/Dashboard/Categories/CategoriesDashboard'));
const UsersDashboard = lazy(() => import('@/components/Dashboard/Users/UsersDashboard'));
const OrdersDashboard = lazy(() => import('@/components/Dashboard/Orders/OrdersDashboard'));
const BannersDashboard = lazy(() => import('@/components/Dashboard/Banners/BannersDashboard'));
const CouponsDashboard = lazy(() => import('@/components/Dashboard/Coupons/CouponsDashboard'));
const RevenueDashboard = lazy(() => import('@/components/Dashboard/Revenue/RevenueDashboard'));
const NewsDashboard = lazy(() => import('@/components/Dashboard/News/NewsDashboard'));
const ServicesDashboard = lazy(() => import('@/components/Dashboard/Services/ServicesDashboard'));

// Helper to wrap lazy components with Suspense
const S = ({ children }: { children: React.ReactNode }) => (
    <Suspense fallback={<SpinnerCustom />}>{children}</Suspense>
);

export const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <MainLayout />,
            children: [
                {
                    index: true,
                    element: <S><HomeBookshelfSection /></S>
                },
                {
                    path: '/danh-muc/:category_slug?',
                    element: <S><BookByCategory /></S>
                },
                {
                    path: '/tin-tuc',
                    element: <S><NewsPage /></S>
                },
                {
                    path: '/tin-tuc/:slug',
                    element: <S><NewsDetail /></S>
                },
                {
                    path: '/gio-hang',
                    element: <S><Cart /></S>
                },
                {
                    path: '/thanh-toan',
                    element: <S><CheckoutPage /></S>
                },
                {
                    path: '/ho-so',
                    element: <S><Profile /></S>
                },
                {
                    path: '/don-hang/:orderId',
                    element: <S><OrderDetailPage /></S>
                },
                {
                    path: '/dat-hang-thanh-cong',
                    element: <S><CheckoutSuccess /></S>
                },
                {
                    path: '/:slug',
                    element: <S><ProductDetail /></S>
                },
                {
                    path: '/tim-kiem',
                    element: <S><BookByCategory /></S>
                },
                {
                    path: '/dang-nhap-thanh-cong',
                    element: <S><OAuthSuccess /></S>
                }
            ]
        },
        {
            path: '/auth',
            element: <MainLayout />,
            children: [
                {
                    path: 'sign-in',
                    element: <S><SignIn /></S>
                },
                {
                    path: 'sign-up',
                    element: <S><SignUp /></S>
                },
                {
                    path: 'getpassword',
                    element: <S><FormReset /></S>
                },
            ]
        },
        {
            path: '/dashboard',
            element: <ProtectedRoute roles={[1, 3]}>
                <S><DashboardLayout /></S>
            </ProtectedRoute>,
            children: [
                {
                    path: 'overviews?',
                    element: <S><OverviewsDashboard /></S>
                },
                {
                    path: 'orders',
                    element: <S><OrdersDashboard /></S>
                },
                {
                    path: 'products',
                    element: <S><ProductsDashboard /></S>,
                },
                {
                    path: 'products/create',
                    element: <S><ProductForm /></S>,
                },
                {
                    path: 'products/edit/:slug',
                    element: <S><ProductForm /></S>,
                },
                {
                    path: 'brands',
                    element: <S><BrandsDashboard /></S>,
                },
                {
                    path: 'categories',
                    element: <S><CategoriesDashboard /></S>,
                },
                {
                    path: 'users',
                    element: <S><UsersDashboard /></S>,
                },
                {
                    path: 'banners',
                    element: <S><BannersDashboard /></S>
                },
                {
                    path: 'coupons',
                    element: <S><CouponsDashboard /></S>
                },
                {
                    path: 'revenue',
                    element: <S><RevenueDashboard /></S>
                },
                {
                    path: 'news',
                    element: <S><NewsDashboard /></S>
                },
                {
                    path: 'services',
                    element: <S><ServicesDashboard /></S>
                }
            ]
        },
        {
            path: '/oops',
            element: <S><Oops /></S>
        },
        {
            path: '*',
            element: <S><NotFound /></S>
        }
    ]
)


