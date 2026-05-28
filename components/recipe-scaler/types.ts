export type Unit = "g" | "kg" | "ml" | "l" | "TL" | "EL" | "Stk." | "Prise" | "Bund" | "Zehen" | "Einh.";

export type PurchaseRounding = "none" | "whole";

export type PurchaseConfig = {
  orderUnit: string;
  packageSize: number;
  packageSizeUnit: Unit;
  rounding: PurchaseRounding;
  approximate?: boolean;
  conversion?: {
    fromUnit: Unit;
    toUnit: Unit;
    fromPerTo: number;
  };
};

export type Ingredient = {
  name: string;
  base: number;
  unit: Unit;
  loss: number;
  demandUnit: Unit;
  purchase?: PurchaseConfig;
};

export type RecipeMode = "custom" | "template";
export type TemplateId = "kartoffelgratin" | "bolognese";
export type LossMode = "aufschlag" | "schwund";
export type PlanningMode = "standard" | "purchase";

export type CalculatedIngredient = Ingredient & {
  scaled: number;
  purchaseAmount: number;
};

export type PurchaseOrder = {
  demandAmount: number;
  demandUnit: Unit;
  convertedAmount: number;
  convertedUnit: Unit;
  rawOrderQty: number;
  orderQty: number;
  orderUnit: string;
  packageSize: number;
  packageSizeUnit: Unit;
  approximate: boolean;
  calculationLabel: string;
  hasConversion: boolean;
  conversionRateLabel?: string;
  perDemandUnitLabel?: string;
};

export type RecipeTemplate = {
  id: TemplateId;
  name: string;
  basePortions: number;
  targetPortions: number;
  ingredients: Ingredient[];
};
