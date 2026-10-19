import ClothingItem from './ClothingItem.tsx';
import type {
  ClothingCategory,
  ClothingItemName,
} from "../utils/OutfitRules.ts";

interface ClothingCardProps {
  title: ClothingCategory;
  items: ClothingItemName[];
}

function ClothingCard({ title, items }: ClothingCardProps) {
    if (!items?.length) return null;

    return (
        <div className="glass p-5">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                {title}
            </h3>

            <div className="flex flex-wrap gap-3">
                {items.map((item, index) => (
                    <ClothingItem key={index} item={item}/>
                ))}
            </div>
        </div>
    );
}

export default ClothingCard