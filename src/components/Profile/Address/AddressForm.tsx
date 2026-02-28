import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { AddressFormInput } from "@/types/AddressForm"
import { Save, X } from "lucide-react"

type AddressFormUIProps = {
    form: AddressFormInput,
    setForm: React.Dispatch<React.SetStateAction<AddressFormInput>>,
    error: string[],
    isSubmitting: boolean,
    handleSubmit: () => void,
    resetForm: () => void,
    editingId: number | null,
    provinces?: string[],
    districts?: any[],
    wards?: any[],
    setDistrictId?: (id: number) => void,
    setProvinceId?: (id: number) => void
}

const AddressFormUI = ({ form, setForm, error, isSubmitting, handleSubmit, resetForm, editingId, provinces, districts, wards, setDistrictId, setProvinceId }: AddressFormUIProps) => {
    console.log("Rendering AddressFormUI with form data:", { provinces, districts, wards, })
    return (

        <div className="rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/30 p-4 space-y-4">
            <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">
                    {editingId ? "Sửa địa chỉ" : "Thêm địa chỉ mới"}
                </div>
                <Button variant="ghost" size="icon" onClick={resetForm} className="h-7 w-7">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            {error && error?.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-600">
                    {Array.isArray(error) ? (
                        error.map((e: any, i) => <div key={i}>{e.message}</div>)
                    ) : (
                        <div>{error}</div>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                    <Label>Địa chỉ chi tiết</Label>
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
                        value={form.province_code}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                province_code: Number(e.target.value),
                            })
                            setProvinceId?.(Number(e.target.value))
                        }

                        }
                    >
                        <option value="">-- Chọn tỉnh/thành --</option>
                        {provinces?.map((p: any) => (
                            <option key={p.id} value={p.code}>
                                {p.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Quận/Huyện</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={form.district_code}
                        disabled={!form.province_code}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                district_code: Number(e.target.value),
                            })
                                ,
                                setDistrictId?.(Number(e.target.value))
                        }
                        }
                    >
                        <option value="">-- Chọn quận/huyện --</option>
                        {districts?.map((d: any) => (
                            <option key={d.id} value={d.code}>
                                {d.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="space-y-2">
                    <Label>Phường/Xã</Label>
                    <select
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm"
                        value={form.ward_code}
                        disabled={!form.district_code}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                ward_code: Number(e.target.value)
                            })
                        }
                    >
                        <option value="">-- Chọn phường/xã --</option>
                        {wards?.map((w: any) => (
                            <option key={w.id} value={w.code}>
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
}

export default AddressFormUI