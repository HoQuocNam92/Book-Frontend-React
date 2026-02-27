import { getBannerBestSellerBooks, getBannerNewBooks, getBannerSales } from '@/services/banner.services'
import { useQuery } from '@tanstack/react-query'
const useBanner = () => {
    const getBannerSalesQuery = useQuery({
        queryKey: ['getBannerSales'],
        queryFn: getBannerSales
    })

    const getBannerNewBooksQuery = useQuery({
        queryKey: ['getBannerNewBooks'],
        queryFn: getBannerNewBooks
    })

    const getBannerBestSellerBooksQuery = useQuery({
        queryKey: ['getBannerBestSellerBooks'],
        queryFn: getBannerBestSellerBooks
    })

    return {
        getBannerSales: getBannerSalesQuery,
        getBannerNewBooks: getBannerNewBooksQuery,
        getBannerBestSellerBooks: getBannerBestSellerBooksQuery
    }


}
export default useBanner