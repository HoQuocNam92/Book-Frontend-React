import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items, title }: {
    items: { name: string; slug: string }[];
    title: string;
}) => {
    return (
        <nav
            className="mb-5 flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-1 overflow-x-auto text-sm text-neutral-400 [-webkit-overflow-scrolling:touch]"
            aria-label="Breadcrumb"
        >
            <Link to="/">Home</Link>
            {items.map((item) => (
                <React.Fragment key={item.slug}>
                    <span className="flex">
                        <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                    </span>

                    <Link to={`/danh-muc/${item.slug}`}>
                        {item.name}
                    </Link>
                </React.Fragment>
            ))}
            <ChevronRight className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-2 min-w-0 max-w-full font-medium text-neutral-600 sm:line-clamp-1">
                {title}
            </span>
        </nav>
    );
};

export default Breadcrumb;