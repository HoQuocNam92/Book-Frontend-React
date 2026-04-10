import { getProfile, updateProfile } from '@/services/user.services'
import { useAuthStore } from '@/stores/auth.stores'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
const useProfile = () => {
    const queryClient = useQueryClient()
    const getProfileQuery = useQuery({
        queryKey: ["profile"],
        queryFn: async () => {
            const res = await getProfile();
            useAuthStore.getState().setUser(res.data);
            return res;
        },

    })
    const updateProfileMutation = useMutation({
        mutationFn: (formData: any) => updateProfile(formData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["profile"] })
        },
    })
    return {
        getProfile: getProfileQuery,
        updateProfile: updateProfileMutation,
    }
}

export default useProfile   