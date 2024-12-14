import { useState } from "react";

export const usePagination = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0  );
    const [total, setTotal] = useState(0);
    return {
        limit,
        setLimit,
        page,
        setPage,
        total,
        setTotal,
    };
};
