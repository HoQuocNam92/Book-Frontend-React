import { instance } from "@/utils/instance"

export const getBannerSales = async () => {
    const res = await instance.get('/banner/sales')
    return res.data
}

export const getBannerNewBooks = async () => {
    const res = await instance.get('/banner/new-books')
    return res.data
}

export const getBannerBestSellerBooks = async () => {
    const res = await instance.get('/banner/best-seller-books')
    return res.data
}