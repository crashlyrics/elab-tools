type NumberStepperProps = {
  onStep: (delta: number) => void;
  label: string;
};

export default function NumberStepper({ onStep, label }: NumberStepperProps) {
  return (
    <div className="flex h-8 w-5 flex-col justify-center gap-[2px]" aria-label={label}>
      <button
        type="button"
        onClick={() => onStep(1)}
        className="flex h-3.5 items-center justify-center rounded-[4px] bg-slate-100 text-[10px] text-slate-600 ring-1 ring-slate-300/80 transition hover:bg-slate-200"
      >
        +
      </button>
      <button
        type="button"
        onClick={() => onStep(-1)}
        className="flex h-3.5 items-center justify-center rounded-[4px] bg-slate-100 text-[10px] text-slate-600 ring-1 ring-slate-300/80 transition hover:bg-slate-200"
      >
        −
      </button>
    </div>
  );
}
