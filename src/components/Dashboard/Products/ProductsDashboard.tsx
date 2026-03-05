import HeaderProductDashboard from "@/components/Dashboard/Products/HeaderProductDashboard"
import ProductListDashboard from "@/components/Dashboard/Products/ProductListDashboard"
import FilterProductDashboard from "@/components/Dashboard/Products/FilterProductDashboard"
import FormDeleteProduct from "@/components/Dashboard/Products/FormDeleteProduct"

import { useProducts } from "@/hooks/useProducts"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { FormProductQuickActionsInput } from "@/schema/product.schema"

export default function BooksDashboard() {

    const { getProductByCategory, updateProductQuickActions, setPageNumber, pageNumber, deleteProduct } = useProducts()

    const [openFormDelete, setOpenFormDelete] = useState(false)
    const [selected, setSelected] = useState<Record<number, boolean>>({})

    const navigate = useNavigate()
    const handleCreateProduct = () => {
        navigate('/dashboard/products/create')
    }
    const handleUpdateProductQuickActions = async (id: string, data: FormProductQuickActionsInput) => {

        try {
            console.log("Check data in dashboard", data)
            // const formData = new FormData();
            // formData.append('title', data.title);
            // formData.append('description', data.description!);
            // formData.append('price', data.price.toString());
            // formData.append('category_id', data.category_id);
            // formData.append('brand_id', data.brand_id);
            // formData.append('stock', data.stock.toString());
            // formData.append('status', data.status.toString());
            // formData.append('content', data.content);
            // formData.append('is_featured', Boolean(data.is_featured).toString());
            // formData.append('discount_percent', data.discount_percent?.toString() || '0');
            // if (data.images instanceof File) {
            //     formData.append('image', data.images);
            // }
            const res = await updateProductQuickActions.mutateAsync({ id, data })
            alert(res.message || "Cập nhật sản phẩm thành công")
        } catch (error: any) {
            alert(error.response?.data?.message || "Cập nhật sản phẩm thất bại")
        }
    }
    return (
        <div className="w-full space-y-4">
            <HeaderProductDashboard handleCreateProduct={handleCreateProduct} />
            <FilterProductDashboard />
            <ProductListDashboard handleUpdateProductQuickActions={handleUpdateProductQuickActions} setOpen={setOpenFormDelete} products={getProductByCategory?.data} pageNumber={pageNumber} setPageNumber={setPageNumber} loading={getProductByCategory?.isLoading} errors={getProductByCategory?.error} selected={selected} setSelected={setSelected} />

            <FormDeleteProduct open={openFormDelete} setOpen={setOpenFormDelete} selected={selected} deleteProduct={deleteProduct} />
        </div>
    )
}


