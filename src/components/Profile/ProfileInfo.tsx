import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Pencil, Save, X } from "lucide-react"
import { SpinnerCustom } from "@/components/ui/spinner"
import type { FormProfile } from "@/types/Profile"
import useProfile from "@/hooks/useProfile"
import ProfileError from "@/components/Profile/ProfileError"

export default function ProfileInfo() {
    const [editing, setEditing] = useState(false)
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)
    const [formData, setFormData] = useState<FormProfile>({
        name: "",
        phone: "",
        gender: "",
        birth: "",
        created_at: ""
    })

    const { getProfile, updateProfile } = useProfile()

    const profile = getProfile.data?.data
    const handleUpdateProfile = async () => {
        try {
            const formDataUser = new FormData();
            formDataUser.append("name", formData.name);
            formDataUser.append("phone", formData.phone);
            formDataUser.append("gender", formData.gender);
            formDataUser.append("birth", formData.birth);

            if (avatarFile) {
                formDataUser.append("avatar", avatarFile);
            }

            const res = await updateProfile.mutateAsync(formDataUser);
            alert(res.message || "Cập nhật thông tin cá nhân thành công")
            setEditing(false)
            setAvatarFile(null)
        } catch (error: any) {
            alert(error?.message || "Có lỗi xảy ra")
        }
    }
    const handleEdit = () => {
        setFormData({
            name: profile?.name,
            gender: profile?.UserProfile?.Gender || "",
            phone: profile?.UserProfile?.Phone || "",
            birth: profile?.UserProfile?.Birth || "",
            created_at: profile?.created_at || "",
        })
        setEditing(true)
    }



    if (getProfile.isLoading) return <SpinnerCustom />

    if (getProfile.error) {
        return <ProfileError />
    }


    return (
        <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-5 w-5 text-orange-500" />
                    Thông tin cá nhân
                </CardTitle>
                {!editing ? (
                    <Button variant="outline" size="sm" onClick={handleEdit} className="gap-1.5">
                        <Pencil className="h-3.5 w-3.5" />
                        Chỉnh sửa
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditing(false)}
                            className="gap-1.5"
                        >
                            <X className="h-3.5 w-3.5" />
                            Hủy
                        </Button>
                        <Button
                            size="sm"
                            onClick={handleUpdateProfile}
                            disabled={updateProfile.isPending}
                            className="gap-1.5 bg-orange-500 hover:bg-orange-600"
                        >
                            <Save className="h-3.5 w-3.5" />
                            {updateProfile.isPending ? "Đang lưu..." : "Lưu"}
                        </Button>
                    </div>
                )}
            </CardHeader>

            <CardContent className="space-y-5">
                {editing ? (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={
                                    previewAvatar ||
                                    profile?.UserProfile?.Avatar ||
                                    "/default-avatar.png"
                                }
                                alt="avatar"
                                className="w-20 h-20 rounded-full object-cover border"
                            />

                            <div>
                                <Label>Ảnh đại diện</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) {
                                            setAvatarFile(file)
                                            setPreviewAvatar(URL.createObjectURL(file))
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Họ tên</Label>
                            <Input
                                value={formData?.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Số điện thoại</Label>
                            <Input
                                value={formData?.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                placeholder="0912345678"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Giới tính</Label>
                            <select
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                                value={formData?.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="">Chọn</option>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label>Ngày sinh</Label>
                            <Input
                                type="date"
                                value={formData?.birth}
                                onChange={(e) => setFormData({ ...formData, birth: e.target.value })}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                        <div className="flex items-center gap-4 mb-6">
                            <img
                                src={
                                    profile?.UserProfile?.avatar ||
                                    "/default-avatar.png"
                                }
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover border"
                            />
                        </div>
                        <InfoRow label="Họ tên" value={profile?.name} />
                        <InfoRow label="Email" value={profile?.email} />
                        <InfoRow label="Số điện thoại" value={profile?.UserProfile?.Phone} />
                        <InfoRow label="Giới tính" value={profile?.UserProfile?.Gender} />
                        <InfoRow
                            label="Ngày sinh"
                            value={
                                profile?.UserProfile?.Birth
                                    ? new Date(profile.UserProfile.Birth).toLocaleDateString("vi-VN")
                                    : undefined
                            }
                        />
                        <InfoRow
                            label="Ngày tham gia"
                            value={
                                profile?.created_at
                                    ? new Date(profile.created_at).toLocaleDateString("vi-VN")
                                    : undefined
                            }
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

function InfoRow({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
            <div className="text-sm font-medium">{value || "—"}</div>
        </div>
    )
}
