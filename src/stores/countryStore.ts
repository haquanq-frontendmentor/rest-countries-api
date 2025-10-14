import { countries } from "@/data";
import type { Country } from "@/data.type";
import { create } from "zustand";

const REGION_OPTIONS = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
const PAGE_SIZE_OPTIONS = [10, 25, 50];
const FIRST_PAGE = 1;

interface CountryStoreState {
    countries: Country[];
    getCountries: () => { countries: Country[]; filteredCount: number };
    pagination: {
        pageNumber: number;
        setPageNumber: (value: number) => void;
        pageSize: number;
        setPageSize: (value: number) => void;
    };
    filter: {
        region: string;
        setRegion: (value: string) => void;
    };
    search: {
        countryName: string;
        setCountryName: (value: string) => void;
    };
}

const useCountryStore = create<CountryStoreState>()((set, get) => ({
    countries,
    getCountries: () => {
        const { filter, search, pagination } = get();

        const filteredCountries = countries.filter((v) => {
            const hasRegion = v.region.startsWith(filter.region);
            const hasCountryNameLike = v.name.common.toLowerCase().indexOf(search.countryName.toLowerCase()) != -1;
            return hasRegion && hasCountryNameLike;
        });

        const pageOffset = (pagination.pageNumber - 1) * pagination.pageSize;
        const paginatedCountries = filteredCountries.slice(pageOffset, pageOffset + pagination.pageSize);

        return { countries: paginatedCountries, filteredCount: filteredCountries.length };
    },
    pagination: {
        pageNumber: FIRST_PAGE,
        setPageNumber: (value) => {
            set((state) => ({ ...state, currentPage: value }));
        },
        pageSize: PAGE_SIZE_OPTIONS[0],
        setPageSize: (value) => {
            set((state) => ({ ...state, currentPageSize: value }));
        },
    },
    filter: {
        regions: REGION_OPTIONS,
        region: "",
        setRegion: (value) => {
            set((state) => ({ ...state, filter: { ...state.filter, region: value } }));
        },
    },
    search: {
        countryName: "",
        setCountryName(value) {
            set((state) => ({ ...state, search: { ...state.search, countryName: value } }));
        },
    },
}));

export { PAGE_SIZE_OPTIONS, REGION_OPTIONS, useCountryStore };
