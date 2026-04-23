import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import { lazy, Suspense } from "react"
import { Outlet } from "react-router-dom"

const ChatBot = lazy(() => import("@/components/ChatBot/ChatBot"))

const MainLayout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
            <Suspense fallback={null}>
                <ChatBot />
            </Suspense>
        </div>
    )
}

export default MainLayout