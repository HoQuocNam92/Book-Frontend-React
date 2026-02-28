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
import { Eye, Filter, Trash2 } from "lucide-react";
import { SpinnerCustom } from "@/components/ui/spinner";

interface User {
    id: number;
    name: string;
    email: string;
    is_google: boolean;
    created_at: string;
    UserProfile?: {
        Gender?: string | null;
        Phone?: string | null;
        avatar?: string | null;
    };
    UserRoles?: {
        Roles?: {
            name?: string;
        };
    }[];
}

interface UserListDashboardProps {
    users: User[];
    loading: boolean;
    error: any;
    onDelete: (user: User) => void;
}

const UserListDashboard = ({
    users,
    loading,
    error,
    onDelete,
}: UserListDashboardProps) => {
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

    const getRoleName = (user: User) => {
        if (user.UserRoles && user.UserRoles.length > 0) {
            return user.UserRoles[0]?.Roles?.name || "user";
        }
        return "user";
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("vi-VN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    };

    return (
        <Card className="rounded-2xl">
            <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                    <Filter className="h-4 w-4" />
                    Danh sách người dùng
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">ID</TableHead>
                                <TableHead className="min-w-[60px]">
                                    Avatar
                                </TableHead>
                                <TableHead className="min-w-[160px]">
                                    Tên
                                </TableHead>
                                <TableHead className="min-w-[200px]">
                                    Email
                                </TableHead>
                                <TableHead className="min-w-[100px]">
                                    Vai trò
                                </TableHead>
                                <TableHead className="min-w-[100px]">
                                    Loại
                                </TableHead>
                                <TableHead className="min-w-[120px]">
                                    Ngày tạo
                                </TableHead>
                                <TableHead className="w-[84px] text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {!users || users.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={8}
                                        className="py-10 text-center"
                                    >
                                        <div className="text-muted-foreground">
                                            Chưa có người dùng nào
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                users.map((u) => (
                                    <TableRow key={u.id} className="align-middle">
                                        <TableCell>
                                            <div className="text-xs text-muted-foreground">
                                                #{u.id}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {u.UserProfile?.avatar ? (
                                                <img
                                                    src={u.UserProfile.avatar}
                                                    alt={u.name}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="grid h-9 w-9 place-items-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
                                                    {u.name?.charAt(0)?.toUpperCase() || "?"}
                                                </div>
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <div className="font-medium">
                                                {u.name}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {u.email}
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant={
                                                    getRoleName(u) === "admin"
                                                        ? "default"
                                                        : "secondary"
                                                }
                                                className="rounded-xl"
                                            >
                                                {getRoleName(u)}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="rounded-xl"
                                            >
                                                {u.is_google
                                                    ? "Google"
                                                    : "Email"}
                                            </Badge>
                                        </TableCell>

                                        <TableCell>
                                            <div className="text-sm text-muted-foreground">
                                                {formatDate(u.created_at)}
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
                                                        className="gap-2 text-destructive focus:text-destructive"
                                                        onClick={() =>
                                                            onDelete(u)
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

export default UserListDashboard;
