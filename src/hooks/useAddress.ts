import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import {
    getMyAddresses,
    createAddress,
    updateAddress,
    deleteAddress,
    getProvinces,
    getDistricts,
    getWards,
} from "@/services/address.services"
import { useAuthStore } from "@/stores/auth.stores"
import { useState } from "react"
const useAddress = () => {
    const queryClient = useQueryClient()

    const [provinceId, setProvinceId] = useState<number | null>(null)
    const [districtId, setDistrictId] = useState<number | null>(null)
    const user = useAuthStore((s) => s.user)
    const getAddress = useQuery({
        queryKey: ['my-addresses', user?.id],
        queryFn: getMyAddresses,
        enabled: !!user?.id
    })
    const createMutation = useMutation({
        mutationFn: async (data: any) => await createAddress(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-addresses', user?.id] })
        }
    })
    const updateMutation = useMutation({
        mutationFn: async (data: any) => await updateAddress(user?.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-addresses', user?.id] })
        }
    })
    const deleteMutation = useMutation({
        mutationFn: async (id: number) => await deleteAddress(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-addresses', user?.id] })
        }
    })

    const getProvincesQuery = useQuery({
        queryKey: ['provinces'],
        queryFn: async () => await getProvinces()
    })
    const getDistrictsQuery = useQuery({
        queryKey: ['districts', provinceId],
        queryFn: async () => await getDistricts(provinceId!),
        enabled: !!provinceId
    })
    const getWardsQuery = useQuery({
        queryKey: ['wards', districtId],
        queryFn: async () => await getWards(districtId!),
        enabled: !!districtId
    })



    return {
        getAddress,
        createMutation,
        updateMutation,
        deleteMutation,
        getProvincesQuery,
        getDistrictsQuery,
        getWardsQuery,
        setProvinceId,
        setDistrictId
    }
}

export default useAddress