import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "@/services/user.services";

export const useUsers = () => {
    const queryClient = useQueryClient();

    const getUsersQuery = useQuery({
        queryKey: ["users"],
        queryFn: getUsers,
    });

    const deleteUserMutation = useMutation({
        mutationFn: (id: number) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });

    return {
        getUsers: getUsersQuery,
        deleteUser: deleteUserMutation,
    };
};
