import { cn } from "@/lib/utils"

const Star = ({ filled, onChange }: { filled?: boolean; onChange?: () => void }) => {
    return (
        <span
            className={cn("text-2xl cursor-pointer", filled ? "text-yellow-400" : "text-neutral-300")}
            onClick={onChange}
        >
            ★
        </span>
    )
}


export default Star
