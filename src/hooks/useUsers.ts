import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, deleteUser } from "@/services/user.services";
import { useState } from "react";

export const useUsers = () => {
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const getUsersQuery = useQuery({
        queryKey: ["users", page],
        queryFn: () => getUsers(page),
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
        page,
        setPage,
    };
};
