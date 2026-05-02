import { ChevronDown, ChevronRight, FolderOpen } from "lucide-react";
import { Link, useParams } from "react-router-dom";

type Props = {
    category: any;
    level?: number;
    expanded: Record<number, boolean>;
    childrenMap: Record<number, any[]>;
    toggleCategory: (id: number) => void;
    /** Gọi khi chọn link danh mục (vd. đóng dialog trên mobile) */
    onNavigate?: () => void;
};

export default function CategoryItem({
    category,
    level = 0,
    expanded,
    childrenMap,
    toggleCategory,
    onNavigate,
}: Props) {
    const { category_slug } = useParams();
    const isOpen = expanded[category.id];
    const children = childrenMap[category.id] || [];
    return (
        <li>
            <div
                className="flex items-center justify-between px-2 py-1.5 hover:bg-orange-50 rounded"
                style={{ paddingLeft: `${level * 12}px` }}
            >
                <Link
                    to={`/danh-muc/${category.slug}`}
                    onClick={() => onNavigate?.()}
                    className={`flex items-center gap-2 flex-1 text-sm
                    ${category.slug === category_slug
                            ? "text-orange-600 font-semibold"
                            : ""
                        }`}
                >
                    <FolderOpen className="w-4 h-4 shrink-0  text-orange-400" />
                    <h3 className="line-clamp-1">{category.name}</h3>
                </Link>

                <button
                    onClick={() => toggleCategory(category.id)}
                    className="text-xs px-1"
                >
                    {isOpen ? <ChevronDown /> : <ChevronRight />}
                </button>
            </div>

            {isOpen && children.length > 0 && (
                <ul>
                    {children.map((child: any) => (
                        <CategoryItem
                            key={child.id}
                            category={child}
                            level={level + 1}
                            expanded={expanded}
                            childrenMap={childrenMap}
                            toggleCategory={toggleCategory}
                            onNavigate={onNavigate}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}