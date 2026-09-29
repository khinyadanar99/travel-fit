import { clothingImages } from "../utils/OutfitRules";

function ClothingItem({ item }) {
    return (
        <div className="flex flex-col items-center">
            <div className="flex w-24 h-28 md:h-32 sm:w-28 items-center justify-center">
                <img
                    src={clothingImages[item]}
                    alt={item}
                    className="w-20 h-20 sm:h-24 sm:w-24 object-contain"
                />
            </div>

            <p className="mt-3 text-sm font-medium capitalize">
                {item.replaceAll("-", " ")}
            </p>
        </div>
    );
}

export default ClothingItem;