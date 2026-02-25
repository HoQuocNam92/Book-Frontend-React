import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Plus, Pencil, Trash2, X, Save } from "lucide-react"

import { SpinnerCustom } from "@/components/ui/spinner"
import type { AddressForm } from "@/types/AddressForm"
import useAddress from "@/hooks/useAddress"



const emptyForm: AddressForm = {
    address: "",
    phone: "",
    province_id: "",
    district_id: "",
    ward_id: "",
}

export default function ProfileAddresses() {
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState<AddressForm>(emptyForm)
    const [error, setError] = useState("")
    const {
        getAddress,
        createMutation,
        updateMutation,
        deleteMutation,
        getProvincesQuery,
        getDistrictsQuery,
        getWardsQuery,
    } = useAddress()


    const resetForm = () => {
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)
        setError("")
    }

    const startEdit = (addr: any) => {
        setEditingId(addr.id)
        setShowForm(false)
        setForm({
            address: addr.address || "",
            phone: addr.phone || "",
            province_id: addr.province_id || "",
            district_id: addr.district_id || "",
            ward_id: addr.ward_id || "",
        })
        setError("")
    }

    const handleSubmit = () => {
        setError("")
        if (!form.address.trim()) {
            setError("Vui lòng nhập địa chỉ")
            return
        }
        if (editingId) {
            updateMutation.mutate({
                ...form,
                id: editingId
            })
        } else {
            createMutation.mutate(form)
        }
    }

    if (getAddress.isLoading) return <SpinnerCustom />

    const addresses = getAddress.data?.data || []
    const provinces = getProvincesQuery.data?.data || []
    const districts = getDistrictsQuery.data?.data || []
    const wards = getWardsQuery.data?.data || []
    const isSubmitting = createMutation.isPending || updateMutation.isPending
    const AddressFormUI = () => (
        <div className="rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                    {editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                </div>
                <Button variant="ghost" size="icon" onClick={resetForm} className="h-7 w-7">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label>Địa chỉ chi tiết *</Label>
                    <Input
                        value={form.address}
                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                        placeholder="Số nhà, tên đường..."
                    />
                </div>
                <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="0912345678"
                    />
                </div>
                <div className="space-y-2">
                    <Label>Tỉnh/Thành</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={form.province_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                province_id: e.target.value ? Number(e.target.value) : "",
                                district_id: "",
                                ward_id: "",
                            })
                        }
                    >
                        <option value="">-- Chọn tỉnh/thành --</option>
                        {provinces.map((p: any) => (
                            <option key={p.id} value={p.id}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Quận/Huyện</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={form.district_id}
                        disabled={!form.province_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                district_id: e.target.value ? Number(e.target.value) : "",
                                ward_id: "",
                            })
                        }
                    >
                        <option value="">-- Chọn quận/huyện --</option>
                        {districts.map((d: any) => (
                            <option key={d.id} value={d.id}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Phường/Xã</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={form.ward_id}
                        disabled={!form.district_id}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ward_id: e.target.value ? Number(e.target.value) : "",
                            })
                        }
                    >
                        <option value="">-- Chọn phường/xã --</option>
                        {wards.map((w: any) => (
                            <option key={w.id} value={w.id}>
                                {w.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={resetForm}>
                    Hủy
                </Button>
                <Button
                    size="sm"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="gap-1.5 bg-orange-500 hover:bg-orange-600"
                >
                    <Save className="h-3.5 w-3.5" />
                    {isSubmitting ? "Đang lưu..." : "Lưu"}
                </Button>
            </div>
        </div>
    )

    return (
        <Card className="rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    Sổ địa chỉ ({addresses.length})
                </CardTitle>
                {!showForm && editingId === null && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                            setShowForm(true)
                            setForm(emptyForm)
                            setError("")
                        }}
                        className="gap-1.5"
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Thêm địa chỉ
                    </Button>
                )}
            </CardHeader>

            <CardContent className="space-y-3">
                {/* Add form */}
                {showForm && <AddressFormUI />}

                {/* Address list */}
                {addresses.length === 0 && !showForm ? (
                    <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                        Bạn chưa có địa chỉ nào. Nhấn "Thêm địa chỉ" để bắt đầu.
                    </div>
                ) : (
                    addresses.map((addr: any) =>
                        editingId === addr.id ? (
                            <AddressFormUI key={addr.id} />
                        ) : (
                            <div
                                key={addr.id}
                                className="flex items-start justify-between rounded-xl border p-4 hover:border-neutral-300 transition"
                            >
                                <div>
                                    <div className="text-sm font-medium">{addr.address}</div>
                                    <div className="mt-1 text-xs text-muted-foreground">
                                        {[
                                            addr.Wards?.name,
                                            addr.Districts?.name,
                                            addr.Provinces?.name,
                                        ]
                                            .filter(Boolean)
                                            .join(", ")}
                                    </div>
                                    {addr.phone && (
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            SĐT: {addr.phone}
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center gap-1 flex-shrink-0">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => startEdit(addr)}
                                    >
                                        <Pencil className="h-3.5 w-3.5" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                        onClick={() => {
                                            if (confirm("Bạn có chắc muốn xóa địa chỉ này?")) {
                                                deleteMutation.mutate(addr.id)
                                            }
                                        }}
                                        disabled={deleteMutation.isPending}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                            </div>
                        )
                    )
                )}
            </CardContent>
        </Card>
    )
}
