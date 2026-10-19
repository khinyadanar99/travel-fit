import cardigan from "../assets/clothing/cardigan.png";
import tshirt from "../assets/clothing/t-shirt.png";
import sweater from "../assets/clothing/sweater.png";
import fleece from "../assets/clothing/fleece.png";
import hoodie from "../assets/clothing/hoodie.png";
import jacket from "../assets/clothing/jacket.png";
import lightJacket from "../assets/clothing/light-jacket.png";
import puffer from "../assets/clothing/puffer.png";
import trenchCoat from "../assets/clothing/trench-coat.png";
import thermal from "../assets/clothing/thermal.png";
import longSleeve from "../assets/clothing/long-sleeve.png";
import dress from "../assets/clothing/dress.png";
import rainJacket from "../assets/clothing/rain-jacket.png";
import tankTop from "../assets/clothing/tank-top.png";
import woolCoat from "../assets/clothing/wool-coat.png";
import windbreaker from "../assets/clothing/windbreaker.png";


import jeans from "../assets/clothing/jeans.png";
import shorts from "../assets/clothing/shorts.png";
import skirt from "../assets/clothing/skirt.png";
import trousers from "../assets/clothing/trousers.png";

import tights from "../assets/clothing/tights.png";

import boots from "../assets/clothing/boots.png";
import sneakers from "../assets/clothing/sneakers.png";
import loafers from "../assets/clothing/loafers.png";
import sandals from "../assets/clothing/sandals.png";

import beanie from "../assets/clothing/beanie.png";
import gloves from "../assets/clothing/gloves.png";
import scarf from "../assets/clothing/scarf.png";

import sunglasses from "../assets/clothing/sunglasses.png";
import umbrella from "../assets/clothing/umbrella.png";

export const clothingImages = {
    cardigan,
    "t-shirt": tshirt,
    sweater,
    fleece,
    hoodie,
    jacket,
    "light-jacket": lightJacket,
    puffer,
    "trench-coat": trenchCoat,
    thermal,
    "long-sleeve": longSleeve,
    dress,
    "rain-jacket": rainJacket,
    "tank-top": tankTop,
    "wool-coat": woolCoat,
    windbreaker,

    jeans,
    shorts,
    skirt,
    trousers,

    tights,

    boots,
    sneakers,
    loafers,
    sandals,

    beanie,
    gloves,
    scarf,

    sunglasses,
    umbrella
};

type TemperatureRule = {
  max: number;
  base: ClothingItemName[];
  mid: ClothingItemName[];
  outer: ClothingItemName[];
  bottom: ClothingItemName[];
  bottomLayer: ClothingItemName[];
  shoes: ClothingItemName[];
};

interface ClothingWeatherInput {
  feelsLikeMin: number;
  feelsLikeMax: number;
  rainProbability: number | null;
  totalPrecipitation: number;
  maxWindSpeed: number;
  weatherCode: number;
}

export type ClothingItemName = keyof typeof clothingImages;

export type ClothingCategory = "base"
  | "mid"
  | "outer"
  | "bottom"
  | "bottomLayer"
  | "shoes"
  | "accessories" | string;

export type ClothingRecommendations = Record<ClothingCategory,ClothingItemName[]>;

const temperatureRules: Record<string, TemperatureRule> = {
    veryCold: {
        max: 5,
        base: ["thermal", "long-sleeve"],
        mid: ["sweater", "fleece"],
        outer: ["wool-coat", "puffer"],
        bottom: ["jeans", "trousers"],
        bottomLayer: ["tights"],
        shoes: ["boots"],
    },

    cold: {
        max: 10,
        base: ["thermal", "long-sleeve"],
        mid: ["sweater", "hoodie", "fleece"],
        outer: ["jacket", "trench-coat"],
        bottom: ["jeans", "trousers"],
        bottomLayer: ["tights"],
        shoes: ["boots", "sneakers"],
    },

    cool: {
        max: 15,
        base: ["long-sleeve", "t-shirt"],
        mid: ["sweater", "cardigan"],
        outer: ["light-jacket"],
        bottom: ["jeans", "trousers", "skirt"],
        bottomLayer: ["tights"],
        shoes: ["sneakers", "boots", "loafers"],
    },

    mild: {
        max: 20,
        base: ["t-shirt", "dress"],
        mid: ["cardigan"],
        outer: ["light-jacket"],
        bottom: ["jeans", "trousers", "skirt"],
        bottomLayer: [],
        shoes: ["sneakers", "loafers"],
    },

    warm: {
        max: 25,
        base: ["t-shirt", "tank-top", "dress"],
        mid: ["cardigan"],
        outer: ["light-jacket"],
        bottom: ["skirt", "shorts", "jeans", "trousers"],
        bottomLayer: [],
        shoes: ["sneakers", "sandals", "loafers"],
    },

    hot: {
        max: 30,
        base: ["t-shirt", "tank-top", "dress"],
        mid: [],
        outer: [],
        bottom: ["shorts", "skirt", "trousers"],
        bottomLayer: [],
        shoes: ["sandals", "sneakers"],
    },

    veryHot: {
        max: Infinity,
        base: ["tank-top", "dress"],
        mid: [],
        outer: [],
        bottom: ["shorts", "skirt"],
        bottomLayer: [],
        shoes: ["sandals"],
    },
};


function getTemperatureRules(feelsLike: number): TemperatureRule {
    if (feelsLike <= 5) {
        return temperatureRules.veryCold;
    }

    if (feelsLike <= 10) {
        return temperatureRules.cold;
    }

    if (feelsLike <= 15) {
        return temperatureRules.cool;
    }

    if (feelsLike <= 20) {
        return temperatureRules.mild;
    }

    if (feelsLike <= 25) {
        return temperatureRules.warm;
    }

    if (feelsLike <= 30) {
        return temperatureRules.hot;
    }

    return temperatureRules.veryHot;
}


function addUnique(items: ClothingItemName[], newItems: ClothingItemName[]): ClothingItemName[] {
    return [...new Set([...items, ...newItems])];
}


export function getRecommendedClothing(
    weather: ClothingWeatherInput,
): ClothingRecommendations {
    const {
        feelsLikeMin,
        feelsLikeMax,
        rainProbability: rawRainProbability,
        totalPrecipitation = 0,
        maxWindSpeed = 0,
        weatherCode,
    } = weather;

    const rainProbability = rawRainProbability ?? 0;

    // Use the coldest "feels like" temperature
    // so the user is not underdressed during the coldest part of the day.
    const temperature = feelsLikeMin ?? feelsLikeMax;

    const rules = getTemperatureRules(temperature);

    const recommendations: ClothingRecommendations = {
        base: [...rules.base],
        mid: [...rules.mid],
        outer: [...rules.outer],
        bottom: [...rules.bottom],
        bottomLayer: [...rules.bottomLayer],
        shoes: [...rules.shoes],
        accessories: [],
    };


    // --------------------------------
    // RAIN
    // --------------------------------

    if (rainProbability >= 50 || totalPrecipitation >= 2) {
        recommendations.outer = addUnique(
            recommendations.outer,
            ["rain-jacket"]
        );

        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["umbrella"]
        );
    }


    // --------------------------------
    // LIGHT RAIN
    // --------------------------------

    else if (rainProbability >= 30 || totalPrecipitation > 0) {
        recommendations.outer = addUnique(
            recommendations.outer,
            ["rain-jacket"]
        );

        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["umbrella"]
        );
    }


    // --------------------------------
    // WIND
    // --------------------------------

    if (maxWindSpeed >= 30) {
        recommendations.outer = addUnique(
            recommendations.outer,
            ["windbreaker"]
        );
    }


    // --------------------------------
    // SNOW
    // --------------------------------

    if (weatherCode >= 71 && weatherCode <= 86) {
        recommendations.outer = addUnique(
            recommendations.outer,
            ["puffer"]
        );

        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["beanie", "gloves", "scarf"]
        );
    }


    // --------------------------------
    // COLD ACCESSORIES
    // --------------------------------

    if (temperature <= 10) {
        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["scarf"]
        );
    }

    if (temperature <= 5) {
        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["gloves"]
        );
    }

    if (temperature <= 0) {
        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["beanie"]
        );
    }


    // --------------------------------
    // WARM WEATHER
    // --------------------------------

    if (feelsLikeMax >= 25) {
        recommendations.accessories = addUnique(
            recommendations.accessories,
            ["sunglasses"]
        );
    }


    return recommendations;
}