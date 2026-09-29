
import { getRecommendedClothing } from "../utils/OutfitRules";
import ClothingCard from "./ClothingCard";

function ClothingRecommendation({selectedDay}) {

  if(!selectedDay) return;
    
    const recommendation = getRecommendedClothing(selectedDay);

  return (
    <div className="glass my-5 p-5 sm:p-10">
        <h3 className="text-lg uppercase font-bold">What you can wear</h3>
        <p className="text-sm tracking-wide text-gray-500">Mix and Match based on your style</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 mt-5 sm:mt-8">
        {Object.entries(recommendation).map(([key, value]) => (
          <ClothingCard key={key} title={key} items={value} />
        ))}
      </div>
    </div>
    
  )
}

export default ClothingRecommendation