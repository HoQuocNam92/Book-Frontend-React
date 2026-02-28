import ProductRelated from '@/components/Detail/ProductRelated'
import SpecRowAttributes from '@/components/Detail/SpecRowAttributes'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ProductBrandAttrRealated = ({ product, brand, related }: any) => {
  return (
    <div className="col-span-12 lg:col-span-3 space-y-4">
      <Card className="rounded-2xl">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-neutral-100 text-sm font-bold">
              {brand.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">{brand}</div>
              <div className="text-xs text-muted-foreground">Thương hiệu</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {
        product.BookAttributes?.length > 0 && (
          <Card className="rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Thông tin</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {
                product.BookAttributes?.map((attr: any) => (
                  <SpecRowAttributes label={attr.attr_key} value={attr.attr_value} />
                ))
              }
            </CardContent>
          </Card>

        )}

      {related.length > 0 && (
        <ProductRelated related={related} />
      )}
    </div>
  )
}

export default ProductBrandAttrRealated