import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import * as searchServices from "@/services/search.services";

export const useSearch = () => {
    const [inputValue, setInputValue] = useState("");
    const [debouncedKey, setDebouncedKey] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedKey(inputValue.trim());
        }, 300);
        return () => clearTimeout(timer);
    }, [inputValue]);

    useEffect(() => {
        setIsOpen(debouncedKey.length >= 2);
    }, [debouncedKey]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const enabled = debouncedKey.length >= 2;

    const booksQuery = useQuery({
        queryKey: ["searchBooks", debouncedKey],
        queryFn: () => searchServices.searchBooks(debouncedKey),
        enabled,
        staleTime: 30 * 1000,
    });

    const categoriesQuery = useQuery({
        queryKey: ["searchCategories", debouncedKey],
        queryFn: () => searchServices.searchCategories(debouncedKey),
        enabled,
        staleTime: 30 * 1000,
    });

    const authorsQuery = useQuery({
        queryKey: ["searchAuthors", debouncedKey],
        queryFn: () => searchServices.searchAuthors(debouncedKey),
        enabled,
        staleTime: 30 * 1000,
    });

    const isLoading = booksQuery.isLoading || categoriesQuery.isLoading || authorsQuery.isLoading;

    const books: any[] = booksQuery.data?.data ?? [];
    const categories: any[] = categoriesQuery.data?.data ?? [];
    const authors: any[] = authorsQuery.data?.data ?? [];

    const hasResults = books.length > 0 || categories.length > 0 || authors.length > 0;

    const clearSearch = () => {
        setInputValue("");
        setDebouncedKey("");
        setIsOpen(false);
    };

    return {
        inputValue,
        setInputValue,
        isOpen,
        setIsOpen,
        isLoading,
        books,
        categories,
        authors,
        hasResults,
        containerRef,
        clearSearch,
    };
};
