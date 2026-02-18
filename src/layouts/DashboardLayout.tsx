
import Sidebar from "@/components/Dashboard/Components/Sidebar";

import { Outlet } from "react-router-dom";

const DashboardLayout = () => {

    return (
        <>
            <div className="container-dashboard ">
                <div className="  flex  gap-4 p-4 md:p-6">
                    <Sidebar />
                    <div className="flex w-full flex-1 flex-col">
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default DashboardLayout