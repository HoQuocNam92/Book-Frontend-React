import { TableCell, TableRow } from '@/components/ui/table'

const OverviesEmpty = () => {
    return (
        <TableRow>
            <TableCell
                colSpan={7}
                className="py-10 text-center text-muted-foreground"
            >
                Không có đơn nào.
            </TableCell>
        </TableRow>
    )
}

export default OverviesEmpty