import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import * as revenueServices from "../services/revenues.services.js";

export type RevenuePeriod = "week" | "month" | "year";

const useRevenues = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [week, setWeek] = useState(getCurrentISOWeek());
    const [period, setPeriod] = useState<RevenuePeriod>("year");

    // All revenues (year overview — KPI cards, top products, order status)
    const getRevenues = useQuery({
        queryKey: ["revenues", year],
        queryFn: async () => await revenueServices.getRevenues(year),
        enabled: !!year,
    });

    // Weekly chart data
    const getRevenueWeek = useQuery({
        queryKey: ["revenueWeek", week, year],
        queryFn: async () => await revenueServices.getRevenueWeek(week, year),
        enabled: period === "week",
    });

    // Monthly chart data
    const getMonthlyRevenue = useQuery({
        queryKey: ["monthlyRevenue", year, month],
        queryFn: async () => await revenueServices.getMonthlyRevenue(year, month),
        enabled: period === "month",
    });

    // Yearly chart data
    const getYearlyRevenue = useQuery({
        queryKey: ["yearlyRevenue", year],
        queryFn: async () => await revenueServices.getYearlyRevenue(year),
        enabled: period === "year",
    });

    return {
        // Overview (KPI, top products, order status)
        getRevenues,
        // Chart data per period
        getRevenueWeek,
        getMonthlyRevenue,
        getYearlyRevenue,
        // Filters
        period,
        setPeriod,
        year,
        setYear,
        month,
        setMonth,
        week,
        setWeek,
    };
};

/** Returns the current ISO week number (1–53) */
function getCurrentISOWeek(): number {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 4);
    const startISO = getMonday(startOfYear);
    const diff = now.getTime() - startISO.getTime();
    return Math.ceil((diff / 86400000 + 1) / 7);
}

function getMonday(d: Date): Date {
    const day = d.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    return new Date(d.getFullYear(), d.getMonth(), d.getDate() + diff);
}

export default useRevenues;