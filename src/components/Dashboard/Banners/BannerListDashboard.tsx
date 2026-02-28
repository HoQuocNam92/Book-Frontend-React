import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, ImageOff, Plus } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";

const TYPE_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
    sales: { label: "Khuyến mãi", variant: "default" },
    featured: { label: "Nổi bật", variant: "secondary" },
    new: { label: "Sách mới", variant: "outline" },
};

interface BannerListProps {
    banners: any[];
    loading: boolean;
    error: any;
    onEdit: (banner: any) => void;
    onDelete: (banner: any) => void;
    onCreate: () => void;
}

const BannerListDashboard = ({ banners, loading, error, onEdit, onDelete, onCreate }: BannerListProps) => {
    if (loading) return <SpinnerCustom />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
                <p className="text-sm text-destructive">Không thể tải dữ liệu banner.</p>
            </div>
        );
    }

    if (!banners || banners.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border bg-muted">
                    <ImageOff className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Chưa có banner nào</p>
                    <p className="text-sm text-muted-foreground">Thêm banner đầu tiên để bắt đầu.</p>
                </div>
                <Button className="gap-2" onClick={onCreate}>
                    <Plus className="h-4 w-4" />
                    Thêm banner
                </Button>
            </div>
        );
    }

    return (
        <div className="rounded-2xl border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-16">#</TableHead>
                        <TableHead>Hình ảnh</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead className="hidden md:table-cell">URL liên kết</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {banners.map((banner: any) => {
                        const typeInfo = TYPE_MAP[banner.type] || { label: banner.type, variant: "outline" };
                        return (
                            <TableRow key={banner.id}>
                                <TableCell className="font-mono text-muted-foreground">{banner.id}</TableCell>
                                <TableCell>
                                    {banner.image_url ? (
                                        <img
                                            src={banner.image_url}
                                            alt="Banner"
                                            className="h-12 w-24 rounded-lg object-cover border"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-24 items-center justify-center rounded-lg border bg-muted">
                                            <ImageOff className="h-4 w-4 text-muted-foreground" />
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                                </TableCell>
                                <TableCell className="hidden md:table-cell max-w-[200px] truncate text-sm text-muted-foreground">
                                    {banner.link_url || "—"}
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(banner)}
                                            className="h-8 w-8"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(banner)}
                                            className="h-8 w-8 text-destructive hover:text-destructive"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default BannerListDashboard;
