import ClothingItem from './ClothingItem';

function ClothingCard({ title, items }) {
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