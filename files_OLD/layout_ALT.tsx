// app/(tools)/layout.tsx

import ToolFooter from "@/components/ToolFooter";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen text-slate-800"
      style={{
        background: "linear-gradient(90deg, #c9d3de 0%, #eef2f6 100%)",
        fontFamily: "Ubuntu Sans, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[DEINE-BREITE] flex-col px-6 pt-10">
        <main className="flex-1">{children}</main>

        <ToolFooter />
      </div>
    </div>
  );
}
