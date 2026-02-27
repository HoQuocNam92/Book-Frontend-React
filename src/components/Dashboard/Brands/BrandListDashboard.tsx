import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, Filter, ImageIcon, Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { SpinnerCustom } from "@/components/ui/spinner";

interface Brand {
    id: number;
    name: string;
    slug?: string;
    description?: string;
    logo_url?: string;
    created_at?: string;
}

interface BrandListDashboardProps {
    brands: Brand[];
    loading: boolean;
    error: any;
    onEdit: (brand: Brand) => void;
    onDelete: (brand: Brand) => void;
    onCreate: () => void;
}

const BrandListDashboard = ({
    brands,
    loading,
    error,
    onEdit,
    onDelete,
    onCreate,
}: BrandListDashboardProps) => {
    if (loading) {
        return <SpinnerCustom />;
    }
    if (error) {
        return (
            <div className="text-destructive">
                Có lỗi xảy ra khi tải dữ liệu
            </div>
        );
    }

    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Danh sách thương hiệu
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Logo</TableHead>
                                <TableHead className="min-w-[200px]">
                                    Tên
                                </TableHead>
                                <TableHead className="min-w-[140px]">
                                    Slug
                                </TableHead>
                                <TableHead className="min-w-[250px]">
                                    Mô tả
                                </TableHead>
                                <TableHead className="min-w-[140px]">
                                    Ngày tạo
                                </TableHead>
                                <TableHead className="w-[84px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!brands || brands.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="py-10 text-center"
                                    >
                                        <div className="mx-auto max-w-md space-y-2">
                                            <div className="text-base font-medium">
                                                Chưa có thương hiệu nào
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Tạo thương hiệu đầu tiên.
                                            </div>
                                            <Button
                                                onClick={onCreate}
                                                className="mt-2 gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Thêm thương hiệu
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                brands.map((b) => (
                                    <TableRow key={b.id} className="align-middle">
                                        <TableCell>
                                            <div className="h-10 w-10 overflow-hidden rounded-xl border bg-muted">
                                                {b.logo_url ? (
                                                    <img
                                                        src={b.logo_url}
                                                        alt={b.name}
                                                        className="h-full w-full object-contain"
                                                    />
                                                ) : (
                                                    <div className="grid h-full w-full place-items-center">
                                                        <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">
                                                {b.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {b.slug || "—"}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground line-clamp-2">
                                                {b.description || "—"}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm">
                                                {b.created_at
                                                    ? dayjs(b.created_at).format(
                                                        "DD/MM/YYYY"
                                                    )
                                                    : "—"}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                #{b.id}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="rounded-xl"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent
                                                    align="end"
                                                    className="w-48"
                                                >
                                                    <DropdownMenuLabel>
                                                        Thao tác
                                                    </DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2"
                                                        onClick={() => onEdit(b)}
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        Chỉnh sửa
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive focus:text-destructive"
                                                        onClick={() =>
                                                            onDelete(b)
                                                        }
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Xóa
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default BrandListDashboard;
