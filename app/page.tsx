"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import NumberStepper from "../components/recipe-scaler/NumberStepper";

import { recipeTemplates } from "../components/recipe-scaler/templates";

import MetricChip from "../components/recipe-scaler/MetricChip";

import {
  calculateIngredient,
  calculatePurchaseOrder,
  formatAmount,
  formatCompactUnitAmount,
  formatRate,
  roundTo,
} from "../components/recipe-scaler/calculations";

import {
  type CalculatedIngredient,
  type PurchaseRounding,
  type Ingredient,
  type LossMode,
  type PlanningMode,
  type PurchaseConfig,
  type PurchaseOrder,
  type RecipeMode,
  type TemplateId,
  type Unit,
  type RecipeTemplate,
} from "../components/recipe-scaler/types";

import {
  customInitialIngredients,
  ingredientGridColumns,
  unitOptions,
} from "../components/recipe-scaler/constants";

const calculationSelfTests = [
  {
    name: "Aufschlag adds loss percentage",
    input: { id: "test-aufschlag", name: "Test", base: 10, unit: "kg" as Unit, loss: 20, demandUnit: "kg" as Unit },
    factor: 2,
    lossMode: "aufschlag" as const,
    expectedPurchaseAmount: 24,
  },
  {
    name: "Schwund divides by remaining yield",
    input: { id: "test-schwund", name: "Test", base: 10, unit: "kg" as Unit, loss: 20, demandUnit: "kg" as Unit },
    factor: 2,
    lossMode: "schwund" as const,
    expectedPurchaseAmount: 25,
  },
  {
    name: "Whole package rounding rounds up",
    input: {
      id: "test-rounding",
      name: "Oregano",
      base: 25,
      unit: "g" as Unit,
      loss: 0,
      demandUnit: "g" as Unit,
      purchase: { orderUnit: "Dose(n)", packageSize: 100, packageSizeUnit: "g" as Unit, rounding: "whole" as const },
    },
    factor: 5,
    lossMode: "aufschlag" as const,
    expectedOrderQty: 2,
  },
  {
    name: "Conversion from cloves to kg works",
    input: {
      id: "test-conversion",
      name: "Knoblauch",
      base: 16,
      unit: "Zehen" as Unit,
      loss: 10,
      demandUnit: "Zehen" as Unit,
      purchase: {
        orderUnit: "kg",
        packageSize: 1,
        packageSizeUnit: "kg" as Unit,
        rounding: "none" as const,
        conversion: { fromUnit: "Zehen" as Unit, toUnit: "kg" as Unit, fromPerTo: 200 },
      },
    },
    factor: 5,
    lossMode: "aufschlag" as const,
    expectedOrderQty: 0.44,
  },
];

calculationSelfTests.forEach((test) => {
  const result = calculateIngredient(test.input, test.factor, test.lossMode);
  if ("expectedPurchaseAmount" in test) {
    console.assert(Math.abs(result.purchaseAmount - test.expectedPurchaseAmount) < 0.001, `${test.name}: purchaseAmount`);
  }
  if ("expectedOrderQty" in test) {
    const order = calculatePurchaseOrder(result);
    console.assert(order && Math.abs(order.orderQty - test.expectedOrderQty) < 0.001, `${test.name}: orderQty`);
  }
});

const defaultTemplate = recipeTemplates.kartoffelgratin;
const initialIngredients: Ingredient[] = structuredClone(defaultTemplate.ingredients);

export default function ElabToolsGebindeMockup() {
  const [expertMode, setExpertMode] = useState(false);
  const [recipeMode, setRecipeMode] = useState<RecipeMode>("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState<TemplateId>("kartoffelgratin");
  const [lossMode, setLossMode] = useState<LossMode>("aufschlag");
  const [planningMode, setPlanningMode] = useState<PlanningMode>("standard");
  const [basePortions, setBasePortions] = useState(defaultTemplate.basePortions);
  const [targetPortions, setTargetPortions] = useState(defaultTemplate.targetPortions);
  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [originalIngredients, setOriginalIngredients] = useState<Ingredient[] | null>(structuredClone(initialIngredients));
  const [recipeName, setRecipeName] = useState(defaultTemplate.name);
  const [originalRecipeName, setOriginalRecipeName] = useState(defaultTemplate.name);
  const [originalBasePortions, setOriginalBasePortions] = useState(defaultTemplate.basePortions);

  const factor = useMemo(() => {
    if (!Number.isFinite(basePortions) || basePortions <= 0) return 0;
    return targetPortions / basePortions;
  }, [basePortions, targetPortions]);

  const calculatedIngredients: CalculatedIngredient[] = useMemo(() => {
    return ingredients.map((item) => calculateIngredient(item, factor, lossMode));
  }, [ingredients, factor, lossMode]);

  const ingredientCountChanged =
    recipeMode === "template" &&
    ingredients.length !== originalIngredients?.length;

  const updateIngredient = <K extends keyof Ingredient>(index: number, field: K, value: Ingredient[K]) => {
    setIngredients((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)));
  };

  const stepIngredientNumber = (index: number, field: "base" | "loss", delta: number) => {
    const step = field === "base" ? 0.1 : 0.1;
    const digits = field === "loss" ? 1 : 2;

    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: Math.max(0, roundTo(Number(item[field]) + delta * step, digits)) };
      }),
    );
  };

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "Neue Zutat",
        base: 0,
        unit: "kg",
        loss: 0,
        demandUnit: "kg",
        purchase: { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: "kg", rounding: "none" },
      },
    ]);
  };

  const moveIngredient = (index: number, direction: -1 | 1) => {
    setIngredients((prev) => {
      const next = [...prev];
      const targetIndex = index + direction;

      if (targetIndex < 0 || targetIndex >= next.length) {
        return prev;
      }

      const [movedItem] = next.splice(index, 1);
      next.splice(targetIndex, 0, movedItem);

      return next;
    });
  };

  const updatePurchaseConfig = <K extends keyof PurchaseConfig>(index: number, field: K, value: PurchaseConfig[K]) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        return { ...item, purchase: { ...currentPurchase, [field]: value } };
      }),
    );
  };

  const stepPurchasePackageSize = (index: number, delta: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            packageSize: Math.max(0, roundTo(Number(currentPurchase.packageSize) + delta * 0.05, 2)),
          },
        };
      }),
    );
  };

  const togglePurchaseRounding = (index: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            rounding: currentPurchase.rounding === "whole" ? "none" : "whole",
          },
        };
      }),
    );
  };

  const togglePurchaseApproximate = (index: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            approximate: !currentPurchase.approximate,
          },
        };
      }),
    );
  };

  const setSimplePurchaseConversion = (index: number, enabled: boolean) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            conversion: enabled
              ? currentPurchase.conversion ?? { fromUnit: item.unit, toUnit: currentPurchase.packageSizeUnit, fromPerTo: 1 }
              : undefined,
          },
        };
      }),
    );
  };

  const updatePurchaseConversion = <K extends keyof NonNullable<PurchaseConfig["conversion"]>>(
    index: number,
    field: K,
    value: NonNullable<PurchaseConfig["conversion"]>[K],
  ) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        const currentConversion = currentPurchase.conversion ?? { fromUnit: item.unit, toUnit: currentPurchase.packageSizeUnit, fromPerTo: 1 };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            conversion: { ...currentConversion, [field]: value },
          },
        };
      }),
    );
  };

  const stepPurchaseConversionRate = (index: number, delta: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => {
        if (i !== index) return item;
        const currentPurchase = item.purchase ?? { orderUnit: "Einh.", packageSize: 1, packageSizeUnit: item.unit, rounding: "none" as const };
        const currentConversion = currentPurchase.conversion ?? { fromUnit: item.unit, toUnit: currentPurchase.packageSizeUnit, fromPerTo: 1 };
        return {
          ...item,
          purchase: {
            ...currentPurchase,
            conversion: {
              ...currentConversion,
              fromPerTo: Math.max(0, roundTo(Number(currentConversion.fromPerTo) + delta * 1, 2)),
            },
          },
        };
      }),
    );
  };

  const applyTemplate = (templateId: TemplateId) => {
    const template = recipeTemplates[templateId];
    setSelectedTemplateId(templateId);
    setRecipeName(template.name);
    setBasePortions(template.basePortions);
    setTargetPortions(template.targetPortions);
    setIngredients(structuredClone(template.ingredients));
    setOriginalRecipeName(template.name);
    setOriginalBasePortions(template.basePortions);
    setOriginalIngredients(structuredClone(template.ingredients));
    setRecipeMode("template");
  };

  const switchToCustomRecipe = () => {
    const customRecipeName = "Eigenes Rezept";
    const customBasePortions = 10;
    const customTargetPortions = 10;

    setRecipeMode("custom");
    setRecipeName(customRecipeName);
    setBasePortions(customBasePortions);
    setTargetPortions(customTargetPortions);
    setIngredients(structuredClone(customInitialIngredients));
    setOriginalIngredients(null);
    setOriginalRecipeName(customRecipeName);
    setOriginalBasePortions(customBasePortions);
  };

  const resetAll = () => {
    if (recipeMode === "custom") {
      switchToCustomRecipe();
      return;
    }

    applyTemplate(selectedTemplateId);
  };

  const loadTemplateRecipe = (templateId: TemplateId) => {
    applyTemplate(templateId);
  };

  const purchaseOrders = calculatedIngredients.map((item) => ({ item, order: calculatePurchaseOrder(item) }));
    const copyPurchaseList = async () => {
      const lines = purchaseOrders.map(({ item, order }) => {
        if (planningMode === "purchase" && order) {
          return `${item.name}: ${order.approximate ? "ca. " : ""}${formatAmount(order.orderQty)} ${order.orderUnit}`;
        }

        return `${item.name}: ${formatAmount(item.purchaseAmount)} ${item.unit}`;
      });

      await navigator.clipboard.writeText(lines.join("\n"));
    };

  return (
  <>
    <div
      className="min-h-screen overflow-x-auto text-slate-800"
      style={{
        background: "linear-gradient(90deg, #c9d3de 0%, #eef2f6 100%)",
        fontFamily: "Ubuntu Sans, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.11] [background-image:radial-gradient(rgba(44,62,74,0.26)_1.2px,transparent_1.2px)] [background-size:16px_16px]" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(44,62,74,0.16)_1.6px,transparent_1.6px)] [background-size:26px_26px]" />
        <div className="absolute left-[14%] top-[9%] h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(218,255,74,0.07),rgba(218,255,74,0)_68%)]" />
        <div className="absolute right-[10%] top-[18%] h-96 w-96 rounded-full bg-[radial-gradient(circle,rgba(90,117,145,0.10),rgba(90,117,145,0)_72%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 md:px-10 md:py-10">
        <header className="relative -mt-4 mb-5 flex items-start justify-between gap-6 pl-5">
          <div className="flex items-center gap-0.5">
            <div className="flex items-center">
              <Image
                src="/logo/elab.shop-logo_oai.svg"
                alt="elab.shop"
                width={180}
                height={64}
                priority
                className="h-auto w-[180px]"
              />
            </div>
            <div className="hidden absolute left-1/2 top-[8px] -translate-x-1/2 md:block">
              <div className="text-center">
                <div className="text-[1.08rem] font-black tracking-[0.11em] text-slate-500">
                  elab your workflow
                </div>

                <div className="mt-0.5 text-[0.87rem] leading-tight text-slate-600">
                  Präzise Hilfswerkzeuge für den professionellen Workflow
                </div>
              </div>
            </div>
           </div>

          <nav className="hidden mr-5 items-center gap-2 rounded-full bg-white/90 px-2 py-2 shadow-[0_8px_24px_rgba(58,76,97,0.08)] ring-1 ring-slate-200/60 backdrop-blur md:flex">
            <a className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100" href="#">Tools</a>
            <a className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100" href="#">Info</a>
          </nav>
        </header>

        <div className="mb-6">
          <section className="rounded-t-[1.35rem] bg-white/80 p-7 shadow-[0_22px_60px_rgba(48,67,88,0.16)] ring-1 ring-slate-300/85 backdrop-blur md:p-8">
            <div className="flex items-start justify-between gap-6 max-[840px]:flex-wrap">
              <div className="min-w-0 flex-1 pr-2">
                <h1 className="text-3xl font-bold tracking-[-0.04em] text-slate-800 md:text-[2.7rem]">Rezept-Skalierer</h1>
                <p className="mt-3 whitespace-nowrap text-[1.02rem] leading-7 text-slate-600 max-[1080px]:whitespace-normal">
                  Produktionsmengen, Verlustfaktoren und Einkaufsmengen berechnen – mit klarer Trennung zwischen Rezept, Bedarf und Bestellung.
                </p>
              </div>

              <div className="shrink-0 rounded-[1rem] bg-slate-50 px-4 py-3 text-sm text-slate-600 ring-1 ring-slate-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_24px_rgba(71,85,105,0.12)]">
                <span className="text-slate-500">Modell</span>
                <span className="ml-2 font-semibold text-slate-700">Einkauf v2</span>
              </div>
            </div>
          </section>

          <div className="h-[1.5mm]" />

          <section className="rounded-b-[1.35rem] bg-white/80 px-7 pt-4 pb-[calc(1rem+1.5mm)] shadow-[0_22px_60px_rgba(48,67,88,0.16)] ring-1 ring-slate-300/85 backdrop-blur md:px-8">
            <div className="flex flex-wrap items-center gap-3">
              <label className="text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Rezeptmodus</label>
              <select
                value={recipeMode === "template" ? selectedTemplateId : "custom"}
                onChange={(e) => {
                  if (e.target.value === "custom") switchToCustomRecipe();
                  else loadTemplateRecipe(e.target.value as TemplateId);
                }}
                className="rounded-full bg-slate-200/80 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition hover:bg-slate-300"
              >
                <option value="custom">Eigenes Rezept</option>
                <option value="kartoffelgratin">Vorlage: Kartoffelgratin</option>
                <option value="bolognese">Vorlage: Bolognese-Sauce</option>
              </select>
              <label className="ml-2 text-[11px] font-medium uppercase tracking-[0.12em] text-slate-500">Planungsmodus</label>
              <select
                value={planningMode}
                onChange={(e) => setPlanningMode(e.target.value as PlanningMode)}
                className="rounded-full bg-slate-200/80 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition hover:bg-slate-300"
              >
                <option value="standard">Einfache Einheiten</option>
                <option value="purchase">Einkaufseinheiten</option>
              </select>
            </div>
          </section>
        </div>

        <main className="grid items-start gap-6 xl:grid-cols-[1.75fr_1fr]">
          <section className="rounded-[1.35rem] bg-white/90 p-4 shadow-[0_28px_70px_rgba(49,67,88,0.18)] ring-1 ring-slate-300/85 md:p-7">
            <div className="mb-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_14rem] md:items-start">
              <div className="flex flex-col gap-0 self-start pt-[1px]">
                <h2 className="text-xl font-semibold tracking-[-0.03em] leading-none text-slate-800">Eingabe</h2>
                <p className="mt-1 text-sm leading-5 text-slate-500">Rezeptdaten, Produktionsmengen und Bedarf</p>
              </div>

              <div className="flex w-[14rem] flex-col items-end gap-2 self-start pt-[1px]">
                <div className={`flex w-full items-center justify-end gap-1.5 text-right text-xs font-medium leading-none ${expertMode ? "text-[#2c3e4a]" : "text-slate-500"}`}>
                  <button
                    type="button"
                    className="flex h-4 w-4 items-center justify-center rounded-full bg-slate-400/70 text-[11px] font-bold text-white leading-none shadow-[0_2px_7px_rgba(100,116,139,0.25)] transition hover:bg-slate-600"
                    title={`Verlustberechnung:
                • Aufschlag: Verlust wird auf den Zielbedarf aufgeschlagen.
                • Schwund: Verlust wird als Abzug von der Ausgangsmenge verstanden.

                Wichtig:
                Bei der Kalkulation mit Aufschlag bzw. Schwund sind voneinander 
                abweichende Bezugswerte zu beachten!

                Beispiel:
                100 kg Bedarf + 10 % Aufschlag = 110 kg brutto.
                Bei 10 % Schwund reichen 110 kg brutto nicht aus: 
                110 kg − 10 % = 99 kg netto.
                Um 100 kg netto zu erhalten, muss man von ca. 111,11 kg brutto ausgehen.`}
                    aria-label="Expertenmodus erklären"
                  >
                    <span className="leading-none">i</span>
                  </button>
                  <span>Expertenmodus</span>
                </div>
                <div className="grid min-h-[1.75rem] w-full grid-cols-[minmax(0,1fr)_2.75rem] items-center gap-3">
                  <div className="flex justify-end">
                    {expertMode && (
                      <select value={lossMode} onChange={(e) => setLossMode(e.target.value as LossMode)} className="translate-y-[3px] w-[7.8rem] rounded-full bg-slate-200/80 px-3 py-1.5 text-xs font-medium text-slate-700 ring-1 ring-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] outline-none transition hover:bg-slate-300">
                        <option value="aufschlag">Aufschlag</option>
                        <option value="schwund">Schwund</option>
                      </select>
                    )}
                  </div>
                  <button type="button" onClick={() => setExpertMode((v) => !v)} className="group inline-flex justify-self-end items-center rounded-full px-1 py-1 translate-y-[3px]" aria-pressed={expertMode}>
                    <span className={`relative h-5 w-9 rounded-full transition ${expertMode ? "bg-[#2c3e4a] ring-1 ring-[#314754]" : "bg-slate-300"}`}>
                      <span className={`absolute top-0.5 h-4 w-4 rounded-full transition-all ${expertMode ? "left-[18px] bg-white shadow-[0_2px_8px_rgba(71,85,105,0.22)]" : "left-0.5 bg-white shadow-[0_2px_6px_rgba(71,85,105,0.18)]"}`} />
                    </span>
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">Rezeptname</label>
                <input
                  value={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                  className={`w-full rounded-[1rem] bg-slate-50 px-4 py-4 text-[1rem] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(148,163,184,0.16),0_10px_24px_rgba(71,85,105,0.08)] ring-1 ring-slate-300/90 ${recipeMode === "template" && recipeName !== originalRecipeName ? "text-fuchsia-700 font-semibold" : "text-slate-800"}`}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">Portionen Ausgangsrezept</label>
                  <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={basePortions}
                    onChange={(e) => setBasePortions(Number(e.target.value) || 0)}
                    className={`w-full rounded-[1rem] bg-slate-50 px-4 py-4 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(148,163,184,0.16),0_10px_24px_rgba(71,85,105,0.08)] ring-1 ring-slate-300/90 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${recipeMode === "template" && basePortions !== originalBasePortions ? "text-fuchsia-700 font-semibold" : "text-slate-800"}`}
                  />
                  <NumberStepper
                    label="Portionen Ausgangsrezept ändern"
                    onStep={(delta) => setBasePortions((prev) => Math.max(1, prev + delta))}
                  />
                </div>
                </div>
                <div>

                  <label className="mb-2 block text-sm font-medium text-slate-600">Gewünschte Portionen</label>
                 <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={targetPortions}
                    onChange={(e) => setTargetPortions(Number(e.target.value) || 0)}
                    className="w-full rounded-[1rem] bg-slate-50 px-4 py-4 text-slate-800 outline-none shadow-[inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(148,163,184,0.16),0_10px_24px_rgba(71,85,105,0.08)] ring-1 ring-slate-300/90 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />

                  <NumberStepper
                    label="Gewünschte Portionen ändern"
                    onStep={(delta) => setTargetPortions((prev) => Math.max(0, prev + delta))}
                  />
                </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pb-1">
                <MetricChip label="Skalierung" value={formatAmount(factor)} icon="factor" />
                <MetricChip label="Zutaten" value={String(ingredients.length)} icon="list" highlight={ingredientCountChanged}/>
              </div>

              <div>
                <div className="mb-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800">Zutaten</h3>
                    <p className="mt-1 text-sm text-slate-500">Rezeptmenge, Einheit, Verlust, Bedarf und Einkaufskonfiguration</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button type="button" onClick={resetAll} className="rounded-full bg-slate-200/80 px-4 py-2 text-sm font-medium text-slate-700 ring-1 ring-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] transition hover:bg-slate-300 active:bg-slate-400">Reset</button>
                    <button type="button" onClick={addIngredient} className="rounded-full bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-[0_12px_24px_rgba(71,85,105,0.18)] transition hover:bg-slate-800 active:bg-slate-900">+ Zutat</button>
                  </div>
                </div>

                <div className="overflow-x-auto rounded-[1.15rem] bg-slate-200/80 p-3 ring-1 ring-slate-300/85 shadow-[inset_0_1px_0_rgba(255,255,255,1),0_12px_28px_rgba(71,85,105,0.06)]">
                  <div className="min-w-[640px] pr-4">
                    <div className={`grid ${ingredientGridColumns} gap-2 px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.13em] text-slate-600`}>
                      <div>Zutat</div>
                      <div className="text-right">Menge</div>
                      <div />
                      <div>Basis</div>
                      <div className="translate-x-3 text-right whitespace-nowrap">Verlust %</div>
                      <div />
                      <div className="-translate-x-10 text-right">Bedarf</div>
                      <div />
                    </div>

                    <div className="space-y-2">
                      {calculatedIngredients.map((item, index) => {
                        const original = originalIngredients?.find(
                          (originalItem) => originalItem.id === item.id
                        );
                        const changedFromTemplate = recipeMode === "template" && Boolean(original);

                        return (
                          <div
                            key={item.id}
                            className={`grid ${ingredientGridColumns} items-center gap-2 rounded-[1rem] bg-white/85 px-3 py-3 text-sm shadow-[0_6px_16px_rgba(71,85,105,0.04)] ring-1 ring-white/80`}
                          >
                            <input
                              value={item.name}
                              onChange={(e) => updateIngredient(index, "name", e.target.value)}
                              className={`w-full bg-transparent font-medium outline-none ${changedFromTemplate && item.name !== original?.name ? "text-fuchsia-700 font-semibold" : "text-slate-800"}`}
                            />

                            <input
                              type="number"
                              step="0.01"
                              value={item.base}
                              onChange={(e) => updateIngredient(index, "base", Number(e.target.value) || 0)}
                              className={`w-[4.8rem] justify-self-end bg-transparent px-1 text-right tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${changedFromTemplate && item.base !== original?.base ? "text-fuchsia-700 font-semibold" : "text-slate-700"}`}
                            />

                            <NumberStepper label="Menge ändern" onStep={(delta) => stepIngredientNumber(index, "base", delta)} />

                            <select
                              value={item.unit}
                              onChange={(e) => updateIngredient(index, "unit", e.target.value as Unit)}
                              className="w-[4.6rem] rounded-md bg-slate-100/80 px-2 py-1 text-xs text-slate-600 ring-1 ring-slate-200/80 outline-none"
                            >
                              {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                            </select>

                            <input
                              type="number"
                              step="0.1"
                              value={item.loss}
                              onChange={(e) => updateIngredient(index, "loss", Number(e.target.value) || 0)}
                              className={`w-[4.2rem] justify-self-end bg-transparent px-1 text-right tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${changedFromTemplate && item.loss !== original?.loss ? "text-fuchsia-700 font-semibold" : "text-slate-600"}`}
                            />

                            <NumberStepper label="Verlust ändern" onStep={(delta) => stepIngredientNumber(index, "loss", delta)} />

                            <div className="flex items-center justify-end gap-2.5 pr-1">
                              <span className="min-w-[3.4rem] text-right font-semibold tabular-nums text-slate-800">
                                {formatAmount(item.purchaseAmount)}
                              </span>
                              <select
                                value={item.demandUnit}
                                onChange={(e) => updateIngredient(index, "demandUnit", e.target.value as Unit)}
                                className="w-[3.8rem] rounded-md bg-slate-100/80 px-1 py-1 text-[11px] text-slate-600 ring-1 ring-slate-200/80 outline-none"
                              >
                                {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                              </select>
                            </div>

                            <div className="flex h-6 w-[2.35rem] overflow-hidden rounded-md bg-slate-100 ring-1 ring-slate-300/80">
                              <button
                                type="button"
                                onClick={() => moveIngredient(index, -1)}
                                disabled={index === 0}
                                className="flex flex-1 items-center justify-center text-[10px] font-semibold text-slate-500 transition hover:bg-slate-200 disabled:opacity-30"
                                title="Zutat nach oben verschieben"
                              >
                                ↑
                              </button>
                              <button
                                type="button"
                                onClick={() => moveIngredient(index, 1)}
                                disabled={index === ingredients.length - 1}
                                className="flex flex-1 items-center justify-center border-l border-slate-300/80 text-[10px] font-semibold text-slate-500 transition hover:bg-slate-200 disabled:opacity-30"
                                title="Zutat nach unten verschieben"
                              >
                                ↓
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => setIngredients((prev) => prev.filter((_, i) => i !== index))}
                              className="text-sm text-slate-400 hover:text-red-500"
                              aria-label="Zutat entfernen"
                            >
                              ✕
                            </button>

                            {planningMode === "purchase" && (
                              <div className="col-span-full mt-1 rounded-[0.85rem] bg-slate-100/80 p-3 ring-1 ring-slate-200/90">
                                <div className="mb-3 flex items-center justify-between gap-3">
                                  <div>
                                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">Einkauf</div>
                                    <div className="mt-1 text-xs text-slate-500">Gebinde, Rundung und optionale Umrechnung für diese Zutat</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      type="button"
                                      onClick={() => togglePurchaseRounding(index)}
                                      className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${item.purchase?.rounding === "whole" ? "bg-[#2c3e4a] text-white ring-[#2c3e4a]" : "bg-white text-slate-600 ring-slate-300 hover:bg-slate-50"}`}
                                    >
                                      Ganze Gebinde
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => togglePurchaseApproximate(index)}
                                      className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${item.purchase?.approximate ? "bg-lime-200 text-slate-900 ring-lime-300" : "bg-white text-slate-600 ring-slate-300 hover:bg-slate-50"}`}
                                    >
                                      ca.
                                    </button>
                                  </div>
                                </div>

                                <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_7rem_5.8rem]">
                                  <label className="block">
                                    <span className="mb-1 block text-[11px] font-medium text-slate-500">Bestelleinheit</span>
                                    <input
                                      value={item.purchase?.orderUnit ?? "Einh."}
                                      onChange={(e) => updatePurchaseConfig(index, "orderUnit", e.target.value)}
                                      className="w-full rounded-lg bg-white px-3 py-2 text-sm text-slate-700 outline-none ring-1 ring-slate-300"
                                    />
                                  </label>
                                  <label className="block">
                                    <span className="mb-1 block text-[11px] font-medium text-slate-500">Gebindegröße</span>
                                    <div className="flex items-center gap-4">
                                      <input
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={item.purchase?.packageSize ?? 1}
                                        onChange={(e) => updatePurchaseConfig(index, "packageSize", Number(e.target.value) || 0)}
                                        className="w-[84%] rounded-lg bg-white px-3 py-2 text-right text-sm tabular-nums text-slate-700 outline-none ring-1 ring-slate-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                      />
                                      <div className="-ml-1 scale-[0.96] origin-left">
                                        <NumberStepper label="Gebindegröße ändern" onStep={(delta) => stepPurchasePackageSize(index, delta)} />
                                      </div>
                                    </div>
                                  </label>
                                  <label className="block">
                                    <span className="mb-1 block text-[11px] font-medium text-slate-500">Einheit</span>
                                    <select
                                      value={item.purchase?.packageSizeUnit ?? item.unit}
                                      onChange={(e) => updatePurchaseConfig(index, "packageSizeUnit", e.target.value as Unit)}
                                      className="w-full rounded-lg bg-white px-2 py-2 text-sm text-slate-700 outline-none ring-1 ring-slate-300"
                                    >
                                      {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                    </select>
                                  </label>
                                </div>

                                <div className="mt-3 rounded-lg bg-white/70 p-3 ring-1 ring-slate-200">
                                  <div className="mb-2 flex items-center justify-between gap-3">
                                    <div>
                                      <div className="text-xs font-semibold text-slate-600">Umrechnung</div>
                                      <div className="mt-0.5 text-xs text-slate-500">Nur relevant für die Bestellung</div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => setSimplePurchaseConversion(index, !item.purchase?.conversion)}
                                      className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition ${item.purchase?.conversion ? "bg-[#2c3e4a] text-white ring-[#2c3e4a]" : "bg-white text-slate-600 ring-slate-300 hover:bg-slate-50"}`}
                                    >
                                      {item.purchase?.conversion ? "Aktiv" : "Aus"}
                                    </button>
                                  </div>
                                  {item.purchase?.conversion && (
                                    <div className="grid gap-3 md:grid-cols-[5.8rem_5.8rem_1fr]">
                                      <label className="block">
                                        <span className="mb-1 block text-[11px] font-medium text-slate-500">Von</span>
                                        <select
                                          value={item.purchase.conversion.fromUnit}
                                          onChange={(e) => updatePurchaseConversion(index, "fromUnit", e.target.value as Unit)}
                                          className="w-full rounded-lg bg-white px-2 py-2 text-sm text-slate-700 outline-none ring-1 ring-slate-300"
                                        >
                                          {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                        </select>
                                      </label>
                                      <label className="block">
                                        <span className="mb-1 block text-[11px] font-medium text-slate-500">Nach</span>
                                        <select
                                          value={item.purchase.conversion.toUnit}
                                          onChange={(e) => updatePurchaseConversion(index, "toUnit", e.target.value as Unit)}
                                          className="w-full rounded-lg bg-white px-2 py-2 text-sm text-slate-700 outline-none ring-1 ring-slate-300"
                                        >
                                          {unitOptions.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
                                        </select>
                                      </label>
                                      <label className="block">
                                        <span className="mb-1 block text-[11px] font-medium text-slate-500">Menge je Einkaufseinheit</span>
                                        <div className="grid grid-cols-[minmax(0,1fr)_1.25rem] items-center gap-1.5">
                                          <input
                                            type="number"
                                            min="0"
                                            step="0.01"
                                            value={item.purchase.conversion.fromPerTo}
                                            onChange={(e) => updatePurchaseConversion(index, "fromPerTo", Number(e.target.value) || 0)}
                                            className="min-w-0 rounded-lg bg-white px-3 py-2 text-right text-sm tabular-nums text-slate-700 outline-none ring-1 ring-slate-300 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                          />
                                          <div className="scale-[0.96] origin-left">
                                            <NumberStepper label="Menge je Einkaufseinheit ändern" onStep={(delta) => stepPurchaseConversionRate(index, delta)} />
                                          </div>
                                        </div>
                                      </label>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <aside className="h-fit rounded-[1.35rem] bg-[#2c3e4a] p-6 shadow-[0_24px_60px_rgba(20,30,40,0.35)] ring-1 ring-[#314754] xl:sticky xl:top-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <div className="text-sm text-slate-300">Einkaufsliste</div>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-100">Für {targetPortions} Portionen</h2>
              </div>
              <div className="rounded-full bg-lime-300/90 px-3 py-1 text-xs font-semibold text-slate-900 shadow-[0_0_14px_rgba(190,242,100,0.25)]">live</div>
            </div>

            <div className="space-y-3">
              {purchaseOrders.map(({ item, order }, index) => (
                <div key={`purchase-${item.id}`} className="rounded-[1rem] bg-[#344a57] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_18px_rgba(0,0,0,0.25)] ring-1 ring-[#3c5563]">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-200">{item.name}</div>
                      <div className="mt-1 text-xs text-slate-400">
                        Bedarf: {formatAmount(item.purchaseAmount)} {item.unit}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      {planningMode === "purchase" && order ? (
                        <>
                          <div className="flex items-center justify-end gap-2">
                            <div>
                              <div className="text-sm font-semibold tabular-nums text-slate-100">
                                {order.approximate ? "ca. " : ""}{formatAmount(order.orderQty)} {order.orderUnit}
                              </div>
                              <div className="mt-1 text-xs text-slate-300">
                                à {order.hasConversion && order.perDemandUnitLabel ? `ca. ${order.perDemandUnitLabel}` : `${order.approximate ? "ca. " : ""}${formatAmount(order.packageSize)} ${order.packageSizeUnit}`}
                              </div>
                            </div>
                            <button
                              type="button"
                              className="flex h-4 w-4 items-center justify-center rounded-full bg-[#5a7591] text-[9px] font-semibold text-white shadow-[0_2px_8px_rgba(90,117,145,0.28)] transition hover:bg-[#4d657e]"
                              title={order.hasConversion
                                ? `Bedarf: ${formatAmount(order.demandAmount)} ${order.demandUnit}
Gesamtgewicht ca.: ${formatAmount(order.convertedAmount)} ${order.convertedUnit}
Einheit: ${order.conversionRateLabel}
Berechnung: ${order.calculationLabel}
Bestellung: ca. ${formatAmount(order.orderQty)} ${order.orderUnit}`
                                : `Bedarf: ${formatAmount(order.demandAmount)} ${order.demandUnit}
Einheit: ${formatAmount(order.packageSize)} ${order.packageSizeUnit} pro ${order.orderUnit}
Berechnung: ${order.calculationLabel}
Bestellung: ${formatAmount(order.orderQty)} ${order.orderUnit}`
                              }
                              aria-label="Einkaufsdetails anzeigen"
                            >
                              i
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="text-sm font-semibold text-slate-100">
                          {formatAmount(item.purchaseAmount)} {item.unit}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.05rem] bg-[#344a57] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_8px_18px_rgba(0,0,0,0.25)] ring-1 ring-[#3c5563]">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                <span className="h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_14px_rgba(190,242,100,0.9)]" />
                Praxishinweis
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <p>Die linke Tabelle bleibt auf Rezept- und Bedarfsmengen fokussiert.</p>
                <p>{planningMode === "purchase" ? "Die Einkaufsliste zeigt daraus konkrete Bestellvorschläge inklusive Gebindegrößen." : "Im Modus Einfache Einheiten werden nur die benötigten Mengen angezeigt."}</p>
                <p>Umrechnungen wie Zehen zu kg werden nur in der Einkaufsliste ausgewiesen.</p>
                <p>Um größere Überschüsse zu vermeiden, kann dieselbe Zutat mehrfach mit unterschiedlichen Gebindegrößen angelegt und in der Zutatenliste passend positioniert werden.</p>
                </div>
              </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
              <button className="rounded-[1rem] bg-slate-100 px-4 py-3 text-sm font-medium text-slate-800 shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-[1px]">PDF exportieren</button>
              <button
                type="button"
                onClick={copyPurchaseList}
                className="rounded-[1rem] bg-[#3c5563] px-4 py-3 text-sm font-medium text-slate-100 ring-1 ring-[#4a6473] shadow-[0_10px_24px_rgba(0,0,0,0.25)] transition hover:-translate-y-[1px]"
              >
                Kopieren
              </button>
            </div>
          </aside>
        </main>
      </div>
    </div>
    </>
);
}

