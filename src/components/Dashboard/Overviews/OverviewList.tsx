import StatusBadge from '@/components/Dashboard/Components/StatusBadge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { TableCell, TableRow } from '@/components/ui/table'
import { formatVND } from '@/utils/formatVND'

const OverviewList = ({ o }: any) => {
    return (
        <TableRow key={o.id}>
            <TableCell className="font-medium">#{o.id}</TableCell>
            <TableCell>{o.customer}</TableCell>
            <TableCell className="hidden md:table-cell">
                {o.items}
            </TableCell>
            <TableCell className="hidden md:table-cell text-muted-foreground">
                {o.createdAt ? new Date(o.createdAt).toLocaleString("vi-VN") : ""}
            </TableCell>
            <TableCell>{formatVND(Number(o.total || 0))}</TableCell>
            <TableCell>
                <StatusBadge status={o.status?.toUpperCase() || "PENDING"} />
            </TableCell>
            <TableCell className="text-right">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="rounded-xl"
                        >
                            <span className="text-black">
                                Menu
                            </span>

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
                        <DropdownMenuItem className="text-destructive">
                            Hủy đơn
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </TableCell>
        </TableRow>
    )
}

export default OverviewList