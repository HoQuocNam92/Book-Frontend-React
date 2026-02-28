import { getProfile, updateProfile } from '@/services/user.services'
import { useAuthStore } from '@/stores/auth.stores'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const useProfile = () => {
    const queryClient = useQueryClient()
    const user = useAuthStore((s) => s.user)
    const getProfileQuery = useQuery({
        queryKey: ["profile", user?.id],

        queryFn: getProfile,
        enabled: !!user?.id,
    })
    const updateProfileMutation = useMutation({
        mutationFn: (formData: any) => updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile", user?.id] })
        },
    })
    return {
        getProfile: getProfileQuery,
        updateProfile: updateProfileMutation,
    }
}

export default useProfile   