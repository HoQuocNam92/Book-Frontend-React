import { useQuery } from "@tanstack/react-query";
import * as searchServices from "@/services/search.services";
import { useDebounce } from './useDebounce';

export const useSearch = ({ inputValue, pageNumber }: { inputValue: string; pageNumber: number }) => {



    const debouncedKey = useDebounce(inputValue, 500);

    const booksQuery = useQuery({
        queryKey: ["searchBooks", debouncedKey, pageNumber],
        queryFn: async () => searchServices.searchBooks(debouncedKey, pageNumber),
        enabled: !!debouncedKey,
        staleTime: 30 * 1000,
    });




    const books = booksQuery?.data
    const error = booksQuery?.error;
    const isLoading = booksQuery?.isLoading;

    return {
        books,
        isLoading,
        error,
    };
};
