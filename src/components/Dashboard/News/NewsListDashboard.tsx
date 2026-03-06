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
import { Pencil, Trash2, FileX, Plus } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";
import { format } from "date-fns";

interface NewsListProps {
    newsList: any[];
    loading: boolean;
    error: any;
    onEdit: (news: any) => void;
    onDelete: (news: any) => void;
    onCreate: () => void;
}

const NewsListDashboard = ({ newsList, loading, error, onEdit, onDelete, onCreate }: NewsListProps) => {
    if (loading) return <SpinnerCustom />;

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center">
                <p className="text-sm text-destructive">Không thể tải dữ liệu tin tức.</p>
            </div>
        );
    }

    if (!newsList || newsList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-16 text-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border bg-muted">
                    <FileX className="h-6 w-6 text-muted-foreground" />
                </div>
                <div>
                    <p className="font-medium">Chưa có bài viết nào</p>
                    <p className="text-sm text-muted-foreground">Thêm bài viết đầu tiên để bắt đầu.</p>
                </div>
                <Button className="gap-2" onClick={onCreate}>
                    <Plus className="h-4 w-4" />
                    Thêm bài viết
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
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Loại</TableHead>
                        <TableHead className="hidden md:table-cell">Trạng thái</TableHead>
                        <TableHead className="hidden md:table-cell">Ngày tạo</TableHead>
                        <TableHead className="text-right">Hành động</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {newsList.map((news: any) => (
                        <TableRow key={news.id}>
                            <TableCell className="font-mono text-muted-foreground">{news.id}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-3">
                                    {news.thumbnail ? (
                                        <img
                                            src={news.thumbnail}
                                            alt={news.title}
                                            className="h-10 w-16 rounded-lg object-cover border flex-shrink-0"
                                        />
                                    ) : null}
                                    <span className="font-medium line-clamp-2 text-sm">{news.title}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline">{news.type || "—"}</Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                                <Badge variant={news.is_published ? "default" : "secondary"}>
                                    {news.is_published ? "Đã xuất bản" : "Nháp"}
                                </Badge>
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm text-muted-foreground">
                                {news.created_at ? format(new Date(news.created_at), "dd/MM/yyyy") : "—"}
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onEdit(news)}
                                        className="h-8 w-8"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(news)}
                                        className="h-8 w-8 text-destructive hover:text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default NewsListDashboard;
