import Sidebar from "@/components/Dashboard/Components/Sidebar"
import DashboardMobileMenu from "@/components/Dashboard/DashboardMobileMenu"
import { Outlet } from "react-router-dom"

const DashboardLayout = () => {
    return (
        <div className="container-dashboard w-full max-w-full px-3 sm:px-4 md:px-6">
            <DashboardMobileMenu />
            <div className="flex gap-4 py-4 md:py-6">
                <Sidebar />
                <div className="flex min-w-0 flex-1 flex-col">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout