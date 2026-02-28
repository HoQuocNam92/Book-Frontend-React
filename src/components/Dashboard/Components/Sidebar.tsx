import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Boxes, ClipboardList, FolderTree, LayoutDashboard, LogOut, Package, Settings, Tag, Truck, Users, Image as ImageIcon, Ticket, TrendingUp } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import { useState } from 'react';
import { useNavigate } from 'react-router';
function SideItem({
    icon: Icon,
    label,
    onClick,
}: {
    icon: any;
    label: string;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition "
            }
        >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{label}</span>
        </button>
    );
}
const Sidebar = () => {


    const navigate = useNavigate();
    const onNavigate = (path: string) => {
        navigate('/dashboard/' + path);
    }

    const [lowStockOnly, setLowStockOnly] = useState(false);
    return (
        <>
            <aside className="hidden w-72 shrink-0 md:block">
                <Card className="sticky top-6 overflow-hidden rounded-2xl">
                    <CardHeader className="pb-3">
                        <div className="flex items-center gap-3">
                            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground">
                                <Boxes className="h-5 w-5" />
                            </div>
                            <div>
                                <CardTitle className="text-base">Admin Panel</CardTitle>
                                <CardDescription>React • Tailwind • shadcn</CardDescription>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent className="space-y-1">
                        <SideItem
                            icon={LayoutDashboard}
                            label="Dashboard"
                            onClick={() => onNavigate("overviews")}
                        />
                        <SideItem
                            icon={TrendingUp}
                            label="Doanh thu"
                            onClick={() => onNavigate("revenue")}
                        />
                        <SideItem
                            icon={ClipboardList}
                            label="Đơn hàng"
                            onClick={() => onNavigate("orders")}
                        />
                        <SideItem
                            icon={Package}
                            label="Sản phẩm"
                            onClick={() => onNavigate("products")}

                        />
                        <SideItem
                            icon={Tag}
                            label="Thương hiệu"
                            onClick={() => onNavigate("brands")}
                        />
                        <SideItem
                            icon={FolderTree}
                            label="Danh mục"
                            onClick={() => onNavigate("categories")}
                        />
                        <SideItem
                            icon={ImageIcon}
                            label="Banners"
                            onClick={() => onNavigate("banners")}
                        />
                        <SideItem
                            icon={Ticket}
                            label="Mã giảm giá"
                            onClick={() => onNavigate("coupons")}
                        />
                        <SideItem
                            icon={Users}
                            label="Khách hàng"
                            onClick={() => onNavigate("users")}
                        />
                        <SideItem
                            icon={Truck}
                            label="Kho / Tồn"
                            onClick={() => onNavigate("inventory")}
                        />

                        <Separator className="my-3" />

                        <div className="flex items-center justify-between rounded-xl px-3 py-2">
                            <div>
                                <div className="text-sm font-medium">Low stock mode</div>
                                <div className="text-xs text-muted-foreground">
                                    Lọc sản phẩm sắp hết
                                </div>
                            </div>
                            <Switch
                                checked={lowStockOnly}
                                onCheckedChange={setLowStockOnly}
                            />
                        </div>

                        <Separator className="my-3" />

                        <Button variant="outline" className="w-full justify-start gap-2">
                            <Settings className="h-4 w-4" />
                            Cài đặt
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-2">
                            <LogOut className="h-4 w-4" />
                            Đăng xuất
                        </Button>
                    </CardContent>
                </Card>
            </aside>
        </>
    )
}

export default Sidebar