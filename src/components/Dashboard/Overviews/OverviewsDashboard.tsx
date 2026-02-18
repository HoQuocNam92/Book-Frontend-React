import React, { useMemo, useState } from 'react'
import { CardContent, CardHeader, CardDescription, CardTitle, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const revenueSeries = [
    { day: "T2", revenue: 12 },
    { day: "T3", revenue: 18 },
    { day: "T4", revenue: 14 },
    { day: "T5", revenue: 22 },
    { day: "T6", revenue: 28 },
    { day: "T7", revenue: 20 },
    { day: "CN", revenue: 30 },
];
const kpis = [
    {
        title: "Doanh thu",
        value: "128.4M",
        delta: "+12.8%",
        hint: "So với 7 ngày trước",
        icon: CreditCard,
    },
    {
        title: "Đơn hàng",
        value: "1,482",
        delta: "+6.2%",
        hint: "Tỷ lệ hoàn tất 93%",
        icon: ShoppingCart,
    },
    {
        title: "Khách hàng",
        value: "9,203",
        delta: "+2.1%",
        hint: "Khách quay lại 41%",
        icon: Users,
    },
    {
        title: "Sản phẩm",
        value: "512",
        delta: "+18",
        hint: "Đang bán 478",
        icon: Package
    },
];
const ordersSeed = [
    {
        id: "OD-10421",
        customer: "Nguyễn Văn A",
        total: 890000,
        status: "PAID",
        items: 3,
        createdAt: "2026-02-07 09:12",
    },
    {
        id: "OD-10420",
        customer: "Trần Thị B",
        total: 1290000,
        status: "SHIPPING",
        items: 5,
        createdAt: "2026-02-07 08:45",
    },
    {
        id: "OD-10419",
        customer: "Lê Minh C",
        total: 450000,
        status: "PENDING",
        items: 2,
        createdAt: "2026-02-07 08:02",
    },
    {
        id: "OD-10418",
        customer: "Phạm Duy D",
        total: 2190000,
        status: "CANCELLED",
        items: 7,
        createdAt: "2026-02-06 22:18",
    },
    {
        id: "OD-10417",
        customer: "Hoàng E",
        total: 990000,
        status: "PAID",
        items: 4,
        createdAt: "2026-02-06 21:04",
    },
];

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import KpiCard from '@/components/Dashboard/Components/KpiCard';
import MiniMetric from '@/components/Dashboard/Components/MiniMetric';
import { Separator } from '@/components/ui/separator';
import { formatVND } from '@/utils/formatVND';
import StatusBadge from '@/components/Dashboard/Components/StatusBadge';
import { CreditCard, Package, Search, ShoppingCart, Users } from 'lucide-react';
const OverviewsDashboard = () => {
    const [q, setQ] = useState("");
    const [tab, setTab] = useState<"all" | "paid" | "pending" | "shipping">(
        "all"
    );
    const [orders, setOrders] = useState(ordersSeed);

    const filteredOrders = useMemo(() => {
        const byTab = (o: (typeof ordersSeed)[number]) => {
            if (tab === "all") return true;
            if (tab === "paid") return o.status === "PAID";
            if (tab === "pending") return o.status === "PENDING";
            if (tab === "shipping") return o.status === "SHIPPING";
            return true;
        };
        const bySearch = (o: (typeof ordersSeed)[number]) => {
            const s = (q ?? "").trim().toLowerCase();
            if (!s) return true;
            return (
                o.id.toLowerCase().includes(s) ||
                o.customer.toLowerCase().includes(s)
            );
        };

        return orders.filter((o) => byTab(o) && bySearch(o));
    }, [orders, q, tab]);
    return (
        <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 my-2">
                {kpis.map((k) => (
                    <KpiCard key={k.title} {...k} />
                ))}
            </div>

            <div className="grid gap-4 lg:grid-cols-3 my-2">
                <Card className="rounded-2xl lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Doanh thu 7 ngày</CardTitle>
                        <CardDescription>
                            Chart demo (Recharts) • gắn API sau
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="h-70">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={revenueSeries}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="day" />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    strokeWidth={2}
                                    fillOpacity={0.25}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="rounded-2xl ">
                    <CardHeader>
                        <CardTitle>Vận hành</CardTitle>
                        <CardDescription>
                            Một vài chỉ số quick để admin nhìn
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <MiniMetric
                            title="Tỷ lệ hoàn tất"
                            value="93%"
                            progress={93}
                        />
                        <MiniMetric
                            title="Đơn đang giao"
                            value="18"
                            progress={62}
                        />
                        <MiniMetric
                            title="Tồn kho an toàn"
                            value="78%"
                            progress={78}
                        />

                        <Separator />

                        <div className="grid gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className="w-full rounded-xl">
                                        + Tạo đơn nhanh
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-130">
                                    <DialogHeader>
                                        <DialogTitle>Tạo đơn nhanh</DialogTitle>
                                        <DialogDescription>
                                            Demo form. Bạn gắn API POST /orders là xong.
                                        </DialogDescription>
                                    </DialogHeader>

                                    <div className="grid gap-4 py-2">
                                        <div className="grid gap-2">
                                            <Label>Mã đơn</Label>
                                            <Input placeholder="VD: OD-10422" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Tên khách</Label>
                                            <Input placeholder="VD: Nguyễn Văn A" />
                                        </div>
                                        <div className="grid gap-2">
                                            <Label>Tổng tiền</Label>
                                            <Input placeholder="VD: 1290000" />
                                        </div>
                                    </div>

                                    <DialogFooter>
                                        <Button variant="outline">Hủy</Button>
                                        <Button>Tạo</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <Button variant="outline" className="w-full rounded-xl">
                                Xuất báo cáo
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent orders */}
            <Card className="rounded-2xl my-2">
                <CardHeader>
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                            <CardTitle>Đơn gần đây</CardTitle>
                            <CardDescription>
                                Có search + filter + actions menu
                            </CardDescription>
                        </div>

                        <Tabs
                            value={tab}
                            onValueChange={(v) => setTab(v as any)}
                            className="w-full md:w-auto"
                        >
                            <TabsList className="w-full md:w-auto">
                                <TabsTrigger value="all">Tất cả</TabsTrigger>
                                <TabsTrigger value="paid">Đã thanh toán</TabsTrigger>
                                <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
                                <TabsTrigger value="shipping">Đang giao</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>

                    <div className="relative md:hidden">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder="Tìm đơn theo mã / tên khách..."
                            className="pl-9"
                        />
                    </div>
                </CardHeader>

                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mã đơn</TableHead>
                                <TableHead>Khách hàng</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Số SP
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Thời gian
                                </TableHead>
                                <TableHead>Tổng</TableHead>
                                <TableHead>Trạng thái</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((o): any => (
                                <TableRow key={o.id}>
                                    <TableCell className="font-medium">{o.id}</TableCell>
                                    <TableCell>{o.customer}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {o.items}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground">
                                        {o.createdAt}
                                    </TableCell>
                                    <TableCell>{formatVND(o.total)}</TableCell>
                                    <TableCell>
                                        <StatusBadge status={o.status} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="rounded-xl"
                                                >
                                                    ...
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-44">
                                                <DropdownMenuItem>
                                                    Xem chi tiết
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    In hóa đơn
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem
                                                    className="text-destructive"
                                                    onClick={() =>
                                                        setOrders((prev) =>
                                                            prev.map((x) =>
                                                                x.id === o.id
                                                                    ? { ...x, status: "CANCELLED" }
                                                                    : x
                                                            )
                                                        )
                                                    }
                                                >
                                                    Hủy đơn
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}

                            {filteredOrders.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={7}
                                        className="py-10 text-center text-muted-foreground"
                                    >
                                        Không có đơn nào.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}

export default OverviewsDashboard