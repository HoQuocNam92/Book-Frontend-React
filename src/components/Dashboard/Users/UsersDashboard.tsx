import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Users } from "lucide-react";
import { useUsers } from "@/hooks/useUsers";
import UserListDashboard from "./UserListDashboard";
import UserDeleteDialog from "./UserDeleteDialog";
import Pagination from "@/components/common/Pagination";

export default function UsersDashboard() {
    const { getUsers, deleteUser, page, setPage } = useUsers();

    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState<number | null>(null);

    const users = getUsers.data?.data || getUsers.data || [];

    const handleDelete = (user: any) => {
        setDeletingUserId(user.id);
        setDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deletingUserId !== null) {
            deleteUser.mutate(deletingUserId, {
                onSuccess: () => {
                    setDeleteOpen(false);
                    setDeletingUserId(null);
                },
            });
        }
    };
    const totalPages = getUsers.data?.totalPages
    console.log("totalPages", totalPages)
    return (
        <div className="w-full space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border bg-background">
                            <Users className="h-4.5 w-4.5" />
                        </div>
                        <h1 className="text-xl font-semibold tracking-tight">
                            Người dùng
                        </h1>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Quản lý danh sách người dùng đã đăng ký.
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => getUsers.refetch()}
                    >
                        <RefreshCw className="h-4 w-4" />
                        Làm mới
                    </Button>
                </div>
            </div>

            {/* List */}
            <UserListDashboard
                users={users}
                loading={getUsers.isLoading}
                error={getUsers.error}
                onDelete={handleDelete}
            />

            <UserDeleteDialog
                open={deleteOpen}
                setOpen={setDeleteOpen}
                onConfirm={handleConfirmDelete}
                loading={deleteUser.isPending}
            />
            <Pagination page={page} onChange={() => setPage(page)} totalPages={totalPages || 1} />
        </div>
    );
}
