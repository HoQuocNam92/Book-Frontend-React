import { Button } from '@/components/ui/button'

const BrandRow = ({ brands, selectedBrand, setSelectedBrand }: any) => {
    return (
        <>
            <div className="md:col-span-2 text-sm text-muted-foreground">
                Thương hiệu
            </div>

            <div className="md:col-span-10">
                <div className="flex flex-wrap gap-2">
                    {brands.map((b: any) => {
                        const active = selectedBrand === b
                        return (
                            <Button
                                key={b}
                                variant={active ? "default" : "ghost"}
                                className={
                                    active
                                        ? "bg-orange-500 hover:bg-orange-600"
                                        : "text-muted-foreground"
                                }
                                onClick={() =>
                                    setSelectedBrand((prev: any) => (prev === b ? null : b))
                                }
                            >
                                {b}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default BrandRow