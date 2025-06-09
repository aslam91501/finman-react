import { Pagination } from "@heroui/react";
import { useSearchParams } from "react-router-dom";

export function Paginator({ currentPage, totalPages, hasType }: { currentPage: number, totalPages: number, hasType?: boolean }) {
    const [searchParams, setParams] = useSearchParams();

    const setNavigation = (page: number) => {
        if (page < 1 || page > totalPages) return;

        let searchString = `?page=${page}`

        if (searchParams.get('search') !== null)
            searchString += `&search=${searchParams.get('search')}`

        if (searchParams.get('sort') !== null)
            searchString += `&sort=${searchParams.get('sort')}`

        if (searchParams.get('direction') !== null)
            searchString += `&direction=${searchParams.get('direction')}`

        if (hasType && searchParams.get('type') !== null)
            searchString += `&type=${searchParams.get('type')}`;


        searchParams.set('page', `${page}`)
        setParams(searchParams)
        // navigate(currentRoute});
    }

    return <>
        <div className="flex justify-end">
            <Pagination
                size="sm"
                page={currentPage}
                total={totalPages}
                onChange={(p) => setNavigation(p)}
            />
        </div>
    </>
}