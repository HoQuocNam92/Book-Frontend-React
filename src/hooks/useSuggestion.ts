import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";
import { getSearchSuggestions } from "@/services/suggestion.services";
export const useSuggestion = (keyword: string) => {
    const debouncedKeyword = useDebounce(keyword, 300);
    const getSuggestions = useQuery({
        queryKey: ['suggestions', debouncedKeyword],
        queryFn: () => getSearchSuggestions(debouncedKeyword),
        enabled: debouncedKeyword.length >= 2,
        staleTime: 1000 * 60 * 5,
    });

    return {
        suggestions: getSuggestions.data?.data ?? [],
        isLoading: getSuggestions.isLoading,
        isError: getSuggestions.isError,
    }
};