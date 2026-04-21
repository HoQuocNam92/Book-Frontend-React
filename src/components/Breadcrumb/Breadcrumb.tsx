import { ChevronRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items, title }: {
    items: { name: string; slug: string }[];
    title: string;
}) => {
    return (
        <div className="mb-5 flex items-center gap-1.5 text-sm text-neutral-400">
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
            <span className="line-clamp-1 font-medium text-neutral-600">{title}</span>
        </div>
    );
};

export default Breadcrumb;