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
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, Pencil, Plus, Trash2 } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";

interface Category {
    id: number;
    name: string;
    slug?: string;
    parent_id?: number | null;
}

interface CategoryListDashboardProps {
    categories: Category[];
    loading: boolean;
    error: any;
    onEdit: (category: Category) => void;
    onDelete: (category: Category) => void;
    onCreate: () => void;
}

const CategoryListDashboard = ({
    categories,
    loading,
    error,
    onEdit,
    onDelete,
    onCreate,
}: CategoryListDashboardProps) => {
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

    const getParentName = (parentId: number | null | undefined) => {
        if (!parentId) return null;
        const parent = categories.find((c) => c.id === parentId);
        return parent?.name || null;
    };

    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Danh sách danh mục
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">ID</TableHead>
                                <TableHead className="min-w-[200px]">
                                    Tên
                                </TableHead>
                                <TableHead className="min-w-[140px]">
                                    Slug
                                </TableHead>
                                <TableHead className="min-w-[200px]">
                                    Danh mục cha
                                </TableHead>
                                <TableHead className="w-[84px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!categories || categories.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-10 text-center"
                                    >
                                        <div className="mx-auto max-w-md space-y-2">
                                            <div className="text-base font-medium">
                                                Chưa có danh mục nào
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                Tạo danh mục đầu tiên.
                                            </div>
                                            <Button
                                                onClick={onCreate}
                                                className="mt-2 gap-2"
                                            >
                                                <Plus className="h-4 w-4" />
                                                Thêm danh mục
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                categories.map((c) => (
                                    <TableRow
                                        key={c.id}
                                        className="align-middle"
                                    >
                                        <TableCell>
                                            <div className="text-xs text-muted-foreground">
                                                #{c.id}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">
                                                {c.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {c.slug || "—"}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {c.parent_id ? (
                                                <Badge
                                                    variant="secondary"
                                                    className="rounded-xl"
                                                >
                                                    {getParentName(
                                                        c.parent_id
                                                    ) ||
                                                        `#${c.parent_id}`}
                                                </Badge>
                                            ) : (
                                                <span className="text-sm text-muted-foreground">
                                                    — Gốc —
                                                </span>
                                            )}
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
                                                        onClick={() =>
                                                            onEdit(c)
                                                        }
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                        Chỉnh sửa
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem
                                                        className="gap-2 text-destructive focus:text-destructive"
                                                        onClick={() =>
                                                            onDelete(c)
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

export default CategoryListDashboard;
