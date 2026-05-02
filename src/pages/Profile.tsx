import { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { User, Package, MapPin } from "lucide-react"

import ProfileInfo from "@/components/Profile/ProfileInfo"
import ProfileOrders from "@/components/Profile/ProfileOrders"
import ProfileAddresses from "@/components/Profile/ProfileAddresses"
const tabs = [
    { key: "profile", label: "Hồ sơ", icon: User },
    { key: "orders", label: "Đơn hàng", icon: Package },
    { key: "addresses", label: "Sổ địa chỉ", icon: MapPin },
]
const Profile = () => {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const tabParam = searchParams.get("tab") || "profile"
    const [activeTab, setActiveTab] = useState(() =>
        tabs.some((t) => t.key === tabParam) ? tabParam : "profile",
    )

    useEffect(() => {
        const next = searchParams.get("tab") || "profile"
        if (tabs.some((t) => t.key === next)) {
            setActiveTab(next)
        }
    }, [searchParams])

    if (!user) {
        navigate("/auth/sign-in")
        return null
    }

    const handleTabChange = (key: string) => {
        setActiveTab(key)
        setSearchParams({ tab: key })
    }

    return (
        <div className="container bg-neutral-50 min-h-[60vh]">
            <div className="px-4 py-6">
                {/* Breadcrumb */}
                <div className="mb-4 text-sm text-muted-foreground">
                    <a href="/" className="hover:text-foreground">Trang chủ</a>
                    <span className="mx-2">›</span>
                    <span className="text-foreground">Tài khoản</span>
                </div>

                <nav
                    className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden [-webkit-overflow-scrolling:touch]"
                    aria-label="Mục tài khoản"
                >
                    {tabs.map((tab) => {
                        const Icon = tab.icon
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => handleTabChange(tab.key)}
                                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${activeTab === tab.key
                                    ? "border-orange-200 bg-orange-50 font-medium text-orange-600"
                                    : "border-transparent bg-white text-muted-foreground hover:bg-neutral-50"
                                    }`}
                            >
                                <Icon className="h-4 w-4 shrink-0" />
                                {tab.label}
                            </button>
                        )
                    })}
                </nav>

                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar — desktop */}
                    <div className="hidden lg:col-span-3 lg:block">
                        <div className="rounded-2xl border bg-white p-4">
                            {/* User info */}
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                    <User className="h-5 w-5 text-orange-600" />
                                </div>
                                <div className="min-w-0">
                                    <div className="truncate text-sm font-semibold">{user?.name || "Người dùng"}</div>
                                    <div className="truncate text-xs text-muted-foreground">{user?.email}</div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="mt-3 space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => handleTabChange(tab.key)}
                                            className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${activeTab === tab.key
                                                ? "bg-orange-50 text-orange-600 font-medium"
                                                : "text-muted-foreground hover:bg-neutral-50 hover:text-foreground"
                                                }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {tab.label}
                                        </button>
                                    )
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="col-span-12 lg:col-span-9">
                        {activeTab === "profile" && <ProfileInfo />}
                        {activeTab === "orders" && <ProfileOrders />}
                        {activeTab === "addresses" && <ProfileAddresses />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile