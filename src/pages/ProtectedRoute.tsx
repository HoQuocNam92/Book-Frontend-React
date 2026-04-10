import { useAuthStore } from "@/stores/auth.stores";
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children, roles }: { children: React.ReactNode; roles: number[] }) => {
    const user = useAuthStore((s: any) => s.user)

    if (!user) {
        return <Navigate to="/auth/sign-in" />
    }
    const hasPermission = roles.some((role) =>
        user.role_id?.includes(role)
    )

    if (!hasPermission) {
        return <Navigate to="/oops" />
    }

    return children
}

export default ProtectedRoute