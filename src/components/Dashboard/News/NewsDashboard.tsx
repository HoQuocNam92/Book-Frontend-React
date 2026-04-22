import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw, Newspaper } from "lucide-react";
import { useNews } from "@/hooks/useNews";
import NewsListDashboard from "./NewsListDashboard";
import NewsForm from "./NewsForm";
import NewsDeleteDialog from "./NewsDeleteDialog";
import Pagination from "@/components/common/Pagination";
import type { NewsInput } from "@/schema/new.schema";

export default function NewsDashboard() {
    const { getNews, createNews, updateNews, deleteNews, page, setPage } = useNews();

    const [formOpen, setFormOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editingNews, setEditingNews] = useState<NewsInput | null>(null);
    const [deletingNewsId, setDeletingNewsId] = useState<number | null>(null);

    const newsList = getNews.data?.data || [];
    const totalPages = getNews.data?.totalPages || 1;

    const handleCreate = () => {
        setEditingNews(null);
        setFormOpen(true);
    };

    const handleEdit = (news: NewsInput) => {
        setEditingNews({
            id: news.id,
            title: news.title,
            type: news.type,
            description: news.description,
            is_published: news.is_published,
            thumbnail: news.thumbnail,
        });

        setFormOpen(true);
    };
    const handleDelete = (news: any) => {
        setDeletingNewsId(news.id);
        setDeleteOpen(true);
    };

    const handleFormSubmit = async (data: NewsInput) => {

        console.log("Form data to submit:", data); // Debug log
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description || "");
            formData.append("is_published", String(data.is_published));
            formData.append("type", data.type || "");
            if (data.thumbnail) {
                formData.append("thumbnail", data.thumbnail);
            }
            const res = editingNews ? await updateNews.mutateAsync({ id: editingNews.id!, data: formData }, { onSuccess: () => setFormOpen(false) }) : await createNews.mutateAsync(formData, { onSuccess: () => setFormOpen(false) });
            alert(res.message);
        } catch (error: any) {
            alert(error.response.data.message || "Có lỗi xảy ra");
        }


    };

    const handleConfirmDelete = () => {
        if (deletingNewsId !== null) {
            deleteNews.mutate(deletingNewsId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingNewsId(null);
                },
            });
        }
    };

    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <Newspaper className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">Tin tức</h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý bài viết tin tức: thêm, sửa, xoá, xuất bản.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <Button variant="outline" className="gap-2" onClick={() => getNews.refetch()}>
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                    <Button className="gap-2" onClick={handleCreate}>
                        <Plus className="h-4 w-4" />
                        Thêm bài viết
                    </Button>
                </div>
            </div>

            {/* List */}
            <NewsListDashboard
                newsList={newsList}
                loading={getNews.isLoading}
                error={getNews.error}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onCreate={handleCreate}
            />

            {/* Form Dialog */}
            <NewsForm
                open={formOpen}
                setOpen={setFormOpen}
                onSubmit={handleFormSubmit}
                initialData={editingNews}
                loading={createNews.isPending || updateNews.isPending}
            />

            {/* Delete Dialog */}
            <NewsDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteNews.isPending}
            />
            <Pagination totalPages={totalPages} page={page} onChange={setPage} />
        </div>
    );
}
