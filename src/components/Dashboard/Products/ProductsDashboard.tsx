import HeaderProductDashboard from "@/components/Dashboard/Products/HeaderProductDashboard"
import ProductListDashboard from "@/components/Dashboard/Products/ProductListDashboard"
import FilterProductDashboard from "@/components/Dashboard/Products/FilterProductDashboard"
import FormDeleteProduct from "@/components/Dashboard/Products/FormDeleteProduct"

import { useProducts } from "@/hooks/useProducts"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function BooksDashboard() {

    const { getProductByCategory, setPageNumber, pageNumber, deleteProduct } = useProducts()

    const [openFormDelete, setOpenFormDelete] = useState(false)
    const [selected, setSelected] = useState<Record<number, boolean>>({})

    const navigate = useNavigate()
    const handleCreateProduct = () => {
        navigate('/dashboard/products/create')
    }
    return (
        <div className="w-full space-y-4">
            <HeaderProductDashboard handleCreateProduct={handleCreateProduct} />
            <FilterProductDashboard />
            <ProductListDashboard setOpen={setOpenFormDelete} products={getProductByCategory?.data} pageNumber={pageNumber} setPageNumber={setPageNumber} loading={getProductByCategory?.isLoading} errors={getProductByCategory?.error} selected={selected} setSelected={setSelected} />

            <FormDeleteProduct open={openFormDelete} setOpen={setOpenFormDelete} selected={selected} deleteProduct={deleteProduct} />
        </div>
    )
}


