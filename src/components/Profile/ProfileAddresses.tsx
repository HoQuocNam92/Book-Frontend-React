import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Plus, Pencil, Trash2 } from "lucide-react"

import { SpinnerCustom } from "@/components/ui/spinner"
import useAddress from "@/hooks/useAddress"
import AddressFormUI from "@/components/Profile/Address/AddressForm"
import { AddressFormSchema, type AddressFormInput } from "@/types/AddressForm"



const emptyForm: AddressFormInput = {
    address: "",
    phone: "",
    province_code: 0,
    district_code: 0,
    ward_code: 0,
}
export default function ProfileAddresses() {
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<number | null>(null)
    const [form, setForm] = useState<AddressFormInput>(emptyForm)
    const [error, setError] = useState<any[]>([])

    const {
        getAddress,
        createMutation,
        updateMutation,
        deleteMutation,
        getProvincesQuery,
        getDistrictsQuery,
        getWardsQuery,
        setProvinceId,
        setDistrictId
    } = useAddress()

    const addresses = getAddress.data?.data || []
    const provinces = getProvincesQuery.data?.data || []
    const districts = getDistrictsQuery.data?.data || []
    const wards = getWardsQuery.data?.data || []

    const isLoading =
        getAddress.isLoading ||
        getProvincesQuery.isLoading ||
        getDistrictsQuery.isLoading ||
        getWardsQuery.isLoading

    const isSubmitting =
        createMutation.isPending ||
        updateMutation.isPending

    if (isLoading) return <SpinnerCustom />

    const resetForm = () => {
        setShowForm(false)
        setEditingId(null)
        setForm(emptyForm)
        setError([])
    }

    const startEdit = (addr: any) => {
        setEditingId(addr.id)
        setProvinceId(addr.province_code)
        setDistrictId(addr.district_code)
        setForm({
            address: addr.address || "",
            phone: addr.phone || "",
            province_code: 49,
            district_code: addr.district_code || 0,
            ward_code: addr.ward_code || 0,
        })
    }

    const mapCodeToId = (list: any[], code: number) =>
        list.find(i => i.code === code)?.code

    const handleSubmit = async () => {
        setError([])

        const result = AddressFormSchema.safeParse(form)
        if (!result.success) {
            setError(result.error.issues)
            return
        }

        const payload = {
            ...result.data,
            province_code: mapCodeToId(provinces, form.province_code),
            district_code: mapCodeToId(districts, form.district_code),
            ward_code: mapCodeToId(wards, form.ward_code),
        }

        try {
            const res = editingId
                ? await updateMutation.mutateAsync({ id: editingId, ...payload })
                : await createMutation.mutateAsync(payload)

            alert(res.message || "Thành công!")
            resetForm()
        } catch (err: any) {
            alert(err?.response?.data?.message || "Có lỗi xảy ra.")
        }
    }

    const renderForm = () => (
        <AddressFormUI
            form={form}
            setForm={setForm}
            error={error}
            isSubmitting={isSubmitting}
            handleSubmit={handleSubmit}
            editingId={editingId}
            resetForm={resetForm}
            provinces={provinces}
            districts={districts}
            wards={wards}
            setProvinceId={setProvinceId}
            setDistrictId={setDistrictId}
        />
    )

    return (
        <Card className="rounded-2xl">
            <CardHeader className="flex justify-between">
                <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-orange-500" />
                    Sổ địa chỉ ({addresses.length})
                </CardTitle>

                {!showForm && editingId === null && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                            setShowForm(true)
                            setForm(emptyForm)
                        }}
                    >
                        <Plus className="h-3.5 w-3.5" />
                        Thêm địa chỉ
                    </Button>
                )}
            </CardHeader>

            <CardContent className="space-y-3">

                {showForm && renderForm()}

                {addresses.length === 0 && !showForm ? (
                    <div className="border-dashed border p-8 text-center text-sm">
                        Bạn chưa có địa chỉ nào.
                    </div>
                ) : (
                    addresses.map((addr: any) =>
                        editingId === addr.id
                            ? <div key={addr.id}>{renderForm()}</div>
                            : (
                                <div key={addr.id}
                                    className="flex justify-between border p-4 rounded-xl">
                                    <div>
                                        <div className="font-medium text-sm">
                                            {addr.address}
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {[addr.Wards?.name,
                                            addr.Districts?.name,
                                            addr.Provinces?.name]
                                                .filter(Boolean)
                                                .join(", ")}
                                        </div>
                                        {addr.phone &&
                                            <div className="text-xs">
                                                SĐT: {addr.phone}
                                            </div>}
                                    </div>

                                    <div className="flex gap-1">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => startEdit(addr)}
                                        >
                                            <Pencil className="h-3.5 w-3.5" />
                                        </Button>

                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            disabled={deleteMutation.isPending}
                                            onClick={() =>
                                                confirm("Xóa?")
                                                && deleteMutation.mutate(addr.id)
                                            }
                                        >
                                            <Trash2 className="h-3.5 w-3.5 text-red-500" />
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