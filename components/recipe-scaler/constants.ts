import { type Ingredient, type Unit } from "./types";

export const unitOptions: Unit[] = [
  "g",
  "kg",
  "ml",
  "l",
  "TL",
  "EL",
  "Stk.",
  "Prise",
  "Bund",
  "Zehen",
  "Einh.",
];

export const ingredientGridColumns =
  "grid-cols-[minmax(12.45rem,0.95fr)_4.8rem_1.25rem_4.6rem_3.2rem_1.00rem_7.65rem_2.7rem_1.25rem]";

export const customInitialIngredients: Ingredient[] = [
  {
    id: "custom-initial-ingredient",
    name: "Neue Zutat",
    base: 0,
    unit: "kg",
    loss: 0,
    demandUnit: "kg",
    purchase: {
      orderUnit: "Einh.",
      packageSize: 1,
      packageSizeUnit: "kg",
      rounding: "none",
    },
  },
];
