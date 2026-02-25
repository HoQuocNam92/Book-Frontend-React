





const SpecRowAttributes = ({ label, value }: { label: string; value: string }) => {
    return (
        <div className="flex items-start justify-between gap-3 border-b pb-2 last:border-b-0 last:pb-0">
            <div className="text-muted-foreground">{label}</div>
            <div className="text-right font-medium">{value}</div>
        </div>
    )
}
export default SpecRowAttributes
