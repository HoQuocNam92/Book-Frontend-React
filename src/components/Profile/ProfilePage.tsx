import { useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuthStore } from "@/stores/auth.stores"
import { User, Package, MapPin } from "lucide-react"
import ProfileInfo from "./ProfileInfo"
import ProfileOrders from "./ProfileOrders"
import ProfileAddresses from "./ProfileAddresses"

const tabs = [
    { key: "profile", label: "Hồ sơ", icon: User },
    { key: "orders", label: "Đơn hàng", icon: Package },
    { key: "addresses", label: "Sổ địa chỉ", icon: MapPin },
]

export default function ProfilePage() {
    const navigate = useNavigate()
    const user = useAuthStore((s) => s.user)
    const [searchParams, setSearchParams] = useSearchParams()
    const tabParam = searchParams.get("tab") || "profile"
    const [activeTab, setActiveTab] = useState(tabParam)

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

                <div className="grid grid-cols-12 gap-6">
                    {/* Sidebar */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="rounded-2xl border bg-white p-4">
                            {/* User info */}
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100">
                                    <User className="h-5 w-5 text-orange-600" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold">{user?.name || "Người dùng"}</div>
                                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="mt-3 space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon
                                    return (
                                        <button
                                            key={tab.key}
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
