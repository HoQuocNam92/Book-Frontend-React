/**
 * Chèn biến đổi Cloudinary (f_auto, q_auto, w_*, c_limit) để giảm dung lượng tải.
 * Không đổi URL nếu không phải Cloudinary hoặc đã có f_auto.
 */
export function optimizeImageUrl(url: string | undefined | null, maxWidth: number): string {
    if (!url || typeof url !== "string") return ""
    const u = url.trim()
    if (!u || maxWidth < 1) return u

    const isCld =
        u.includes("res.cloudinary.com") ||
        u.includes("cloudinary.com") ||
        u.includes("cloudinary.net")
    if (!isCld) return u

    if (/\/upload\/[^/]*f_auto/i.test(u) || /\/upload\/f_auto/i.test(u)) return u

    const m = u.match(/^(https?:\/\/[^/]+\/(?:image|video)\/upload\/)(.+)$/i)
    if (!m) return u

    const prefix = m[1]
    const rest = m[2]
    const firstSeg = rest.split("/")[0] ?? ""

    // Đã có chuỗi biến đổi kiểu w_800,... ở segment đầu
    if (/[,_]/.test(firstSeg) && /^(w_|c_|f_|q_|h_)/i.test(firstSeg)) {
        return u
    }

    const t = `f_auto,q_auto,w_${Math.min(maxWidth, 2000)},c_limit`
    return `${prefix}${t}/${rest}`
}
