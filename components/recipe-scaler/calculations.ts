import {
  type CalculatedIngredient,
  type Ingredient,
  type LossMode,
  type PurchaseOrder,
  type Unit,
} from "./types";

export function formatAmount(value: number) {
  if (!Number.isFinite(value)) return "0";
  if (Math.abs(value) >= 100) return value.toFixed(1);
  if (Math.abs(value) >= 10) return value.toFixed(2);
  return value.toFixed(3).replace(/0+$/, "").replace(/\.$/, "");
}

export function roundTo(value: number, digits: number) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

export function formatCompactUnitAmount(value: number, unit: Unit) {
  if (unit === "kg" && Math.abs(value) < 1) return `${formatAmount(value * 1000)} g`;
  if (unit === "l" && Math.abs(value) < 1) return `${formatAmount(value * 1000)} ml`;
  return `${formatAmount(value)} ${unit}`;
}

export function formatRate(value: number) {
  if (!Number.isFinite(value)) return "0";
  if (Number.isInteger(value)) return String(value);
  return formatAmount(value);
}

export function calculateIngredient(item: Ingredient, factor: number, lossMode: LossMode): CalculatedIngredient {
  const scaled = item.base * factor;
  const purchaseAmount =
    lossMode === "aufschlag"
      ? scaled * (1 + item.loss / 100)
      : item.loss >= 100
        ? 0
        : scaled / (1 - item.loss / 100);

  return {
    ...item,
    scaled,
    purchaseAmount,
  };
}

export function calculatePurchaseOrder(item: CalculatedIngredient): PurchaseOrder | null {
  if (!item.purchase || item.purchase.packageSize <= 0) return null;

  const config = item.purchase;
  let convertedAmount = item.purchaseAmount;
  let convertedUnit = item.unit;
  let calculationLabel = `${formatAmount(item.purchaseAmount)} ${item.unit} ÷ ${formatAmount(config.packageSize)} ${config.packageSizeUnit}`;
  let hasConversion = false;
  let conversionRateLabel: string | undefined;
  let perDemandUnitLabel: string | undefined;

  if (config.conversion) {
    const { fromUnit, toUnit, fromPerTo } = config.conversion;
    if (item.unit === fromUnit && config.packageSizeUnit === toUnit && fromPerTo > 0) {
      convertedAmount = item.purchaseAmount / fromPerTo;
      convertedUnit = toUnit;
      calculationLabel = `${formatAmount(item.purchaseAmount)} ${fromUnit} ÷ ${formatRate(fromPerTo)} ${fromUnit}/${toUnit}`;
      hasConversion = true;
      conversionRateLabel = `${formatAmount(config.packageSize)} ${toUnit} je ca. ${formatRate(fromPerTo)} ${fromUnit}`;
      perDemandUnitLabel = formatCompactUnitAmount(config.packageSize / fromPerTo, toUnit);
    }
  }

  const rawOrderQty = convertedUnit === config.packageSizeUnit ? convertedAmount / config.packageSize : 0;
  const orderQty = config.rounding === "whole" ? Math.ceil(rawOrderQty) : roundTo(rawOrderQty, 2);

  return {
    demandAmount: item.purchaseAmount,
    demandUnit: item.unit,
    convertedAmount,
    convertedUnit,
    rawOrderQty,
    orderQty,
    orderUnit: config.orderUnit,
    packageSize: config.packageSize,
    packageSizeUnit: config.packageSizeUnit,
    approximate: Boolean(config.approximate),
    calculationLabel,
    hasConversion,
    conversionRateLabel,
    perDemandUnitLabel,
  };
}
