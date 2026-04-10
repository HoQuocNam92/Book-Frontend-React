import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'

const ProductBrandAttrRealated = ({ product, brand }: any) => {
  const initial = brand ? brand.charAt(0).toUpperCase() : '?'

  // Generate a consistent color from brand name
  const colors = [
    'from-orange-400 to-amber-400',
    'from-blue-400 to-indigo-400',
    'from-violet-400 to-purple-400',
    'from-green-400 to-emerald-400',
    'from-pink-400 to-rose-400',
  ]
  const colorIndex = brand ? brand.charCodeAt(0) % colors.length : 0
  const gradientClass = colors[colorIndex]

  return (
    <div className="col-span-12 lg:col-span-3 space-y-4">
      {/* Brand card */}
      <Card className="rounded-2xl border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradientClass} text-base font-bold text-white shadow-sm`}>
              {initial}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-neutral-800">{brand}</div>
              <div className="text-xs text-neutral-400">Thương hiệu</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attributes card */}
      {product.BookAttributes?.length > 0 && (
        <Card className="rounded-2xl border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-sm font-semibold text-neutral-700">
              <BookOpen className="h-4 w-4 text-orange-400" />
              Thông tin sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4 text-sm">
            <div className="divide-y divide-neutral-100 rounded-xl overflow-hidden border border-neutral-100">
              {product.BookAttributes.map((attr: any, i: number) => (
                <div
                  key={attr.id ?? i}
                  className={`flex gap-2 px-3 py-2 ${i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}`}
                >
                  <span className="w-28 shrink-0 text-xs text-neutral-400">{attr.attr_key}</span>
                  <span className="flex-1 text-xs font-medium text-neutral-700">{attr.attr_value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ProductBrandAttrRealated