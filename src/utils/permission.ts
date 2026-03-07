export const hasRole = (user: { role_id?: number[] }, role: number) => {
    return user?.role_id?.includes(role)
}

export const hasAnyRole = (user: { role_id?: number[] }, roles: number[]) => {
    return roles.some((role) => user?.role_id?.includes(role))
}