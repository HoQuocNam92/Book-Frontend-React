import { clamp } from '@/components/Books/logic/clamp'
import { Input } from '@/components/ui/input'
import { Slider } from "@/components/ui/slider"


const SliderPrice = ({ priceRange, min, max, setPriceRange }: any) => {
    return (
        <>
            <div className="md:col-span-10">
                <div className="flex flex-col gap-3">
                    <div className="px-1">
                        <Slider
                            value={priceRange}
                            min={min}
                            max={max}
                            step={10000}
                            onValueChange={(v) =>
                                setPriceRange([
                                    clamp(v[0], min, max),
                                    clamp(v[1], min, max),
                                ])
                            }
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Input
                            className="h-9 w-32"
                            value={priceRange[0]}
                            onChange={(e) =>
                                setPriceRange([
                                    clamp(Number(e.target.value || 0), min, max),
                                    priceRange[1],
                                ])
                            }
                        />
                        <div className="text-muted-foreground">—</div>
                        <Input
                            className="h-9 w-32"
                            value={priceRange[1]}
                            onChange={(e) =>
                                setPriceRange([
                                    priceRange[0],
                                    clamp(Number(e.target.value || 0), min, max),
                                ])
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SliderPrice