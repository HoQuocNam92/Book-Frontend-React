import { useQuery } from "@tanstack/react-query";
import { getShippingInfo } from "@/services/shipping.services";

interface UseShippingParams {
    districtId: number | null;
    wardCode: string | null;
    weight?: number;
    insuranceValue?: number;
    enabled?: boolean;
}

const useShipping = ({
    districtId,
    wardCode,
    weight,
    insuranceValue,
    enabled = true,
}: UseShippingParams) => {
    const isEnabled = enabled && !!districtId && !!wardCode;

    const shippingQuery = useQuery({
        queryKey: ["shipping-info", districtId, wardCode, weight],
        queryFn: async () => {
            const res = await getShippingInfo({
                to_district_id: districtId!,
                to_ward_code: String(wardCode!),
                weight,
                insurance_value: insuranceValue,
            });
            return res.data;
        },
        enabled: isEnabled,
        staleTime: 5 * 60 * 1000, // cache 5 phút
        retry: 1,
    });

    return {
        shippingQuery,
        shippingFee: shippingQuery.data?.fee ?? 0,
        leadtime: shippingQuery.data?.leadtime ?? null,
        isLoadingShipping: isEnabled && shippingQuery.isLoading,
        isShippingError: shippingQuery.isError,
    };
};

export default useShipping;
