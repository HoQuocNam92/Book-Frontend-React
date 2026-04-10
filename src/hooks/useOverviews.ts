import { getRevenueByYear } from '@/services/overview.services'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const useOverViews = () => {
    const [year, setYear] = useState(new Date().getFullYear())
    const getChartData = useQuery({
        queryKey: ['chartData', year],
        queryFn: async () => getRevenueByYear(year),
        enabled: !!year
    })
    return {
        getChartData,
        setYear
    }
}

export default useOverViews