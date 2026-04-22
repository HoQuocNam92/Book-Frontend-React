import HeaderProductDashboard from "@/components/Dashboard/Products/HeaderProductDashboard"
import ProductListDashboard from "@/components/Dashboard/Products/ProductListDashboard"
import FilterProductDashboard from "@/components/Dashboard/Products/FilterProductDashboard"
import FormDeleteProduct from "@/components/Dashboard/Products/FormDeleteProduct"

import { useProducts } from "@/hooks/useProducts"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { FormProductQuickActionsInput } from "@/schema/product.schema"

export default function BooksDashboard() {
    const [pageNumber, setPageNumber] = useState(1)

    const { getProductsALl, updateProductQuickActions, deleteProduct } = useProducts("all", pageNumber)

    const [openFormDelete, setOpenFormDelete] = useState(false)
    const [selected, setSelected] = useState<Record<number, boolean>>({})

    const navigate = useNavigate()
    const handleCreateProduct = () => {
        navigate('/dashboard/products/create')
    }
    const handleUpdateProductQuickActions = async (id: string, data: FormProductQuickActionsInput) => {

        try {

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

            <ProductListDashboard handleUpdateProductQuickActions={handleUpdateProductQuickActions} setOpen={setOpenFormDelete} products={getProductsALl?.data} pageNumber={pageNumber} setPageNumber={setPageNumber} loading={getProductsALl?.isLoading} errors={getProductsALl?.error} selected={selected} setSelected={setSelected} />

            <FormDeleteProduct open={openFormDelete} setOpen={setOpenFormDelete} selected={selected} deleteProduct={deleteProduct} />
        </div>
    )
}


