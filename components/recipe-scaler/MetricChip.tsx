type MetricChipProps = {
  label: string;
  value: string;
  icon: "factor" | "list";
};

export default function MetricChip({ label, value, icon }: MetricChipProps) {
  return (
    <div className="flex min-w-[12.5rem] items-center gap-2 rounded-full bg-slate-200/80 px-3 py-2 ring-1 ring-slate-300/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2c3e4a] text-white shadow-[0_6px_14px_rgba(44,62,74,0.18)]">
        {icon === "factor" ? (
          <span className="text-base font-semibold leading-none">×</span>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
            <path d="M7 7h11" />
            <path d="M7 12h11" />
            <path d="M7 17h11" />
            <path d="M4 7h.01" />
            <path d="M4 12h.01" />
            <path d="M4 17h.01" />
          </svg>
        )}
      </span>

      <div className="min-w-0 leading-tight">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">{label}</div>
        <div className="text-sm font-semibold tabular-nums text-slate-800">{value}</div>
      </div>
    </div>
  );
}
