import { Badge } from "@/components/ui/badge"
import { BadgeCheck, BadgeX, Layers } from "lucide-react"

export type BookStatus = "draft" | "active" | "archived"

export function statusBadge(status: BookStatus) {


    if (status === "active") {
        return (
            <Badge className="gap-1">
                <BadgeCheck className="h-3.5 w-3.5" /> Active
            </Badge>
        )
    }
    if (status === "draft") {
        return (
            <Badge variant="secondary" className="gap-1">
                <Layers className="h-3.5 w-3.5" /> Draft
            </Badge>
        )
    }
    return (
        <Badge variant="destructive" className="gap-1">
            <BadgeX className="h-3.5 w-3.5" /> Archived
        </Badge>
    )
}
