// Reusable IlmuApp logo — Arabic khat "علم" as the icon mark
// Usage: <IlmuAppLogo size="sm" | "md" | "lg" />

interface IlmuAppLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Force white brand text for dark backgrounds (e.g. carousel slide) */
  white?: boolean;
}

const SIZE_MAP = {
  sm: { box: "w-6 h-6", text: "text-[11px]", brand: "text-[14px]", gap: "gap-1.5" },
  md: { box: "w-8 h-8", text: "text-[14px]", brand: "text-[16px]", gap: "gap-2" },
  lg: { box: "w-11 h-11", text: "text-[18px]", brand: "text-[20px]", gap: "gap-2.5" },
};

export function IlmuAppLogo({ size = "md", className = "", white = false }: IlmuAppLogoProps) {
  const s = SIZE_MAP[size];

  return (
    <div className={`flex items-center ${s.gap} ${className}`}>
      {/* Arabic khat mark */}
      <div
        className={`${s.box} rounded-lg bg-gradient-to-br from-teal-400/30 to-teal-600/10 border border-teal-400/30 flex items-center justify-center flex-shrink-0 relative`}
      >
        {/* subtle glow */}
        <div className="absolute inset-0 rounded-lg bg-teal-400/10 blur-sm" />
        {/* "علم" — knowledge in Arabic, khat-style via font-arabic */}
        <span
          // Added -translate-y-1 to move it upwards slightly
          className={`relative font-arabic font-bold leading-none text-teal-300 ${s.text} -translate-y-0.45 translate-x-0.8`}
          style={{ letterSpacing: "-0.02em" }}
        >
          علم
        </span>
      </div>

      {/* Brand name */}
      <span
        className={`font-bold tracking-tight leading-none ${s.brand} ${white ? "text-white" : "text-foreground"}`}
      >
        Ilmu<span className="text-teal-400">App</span>
      </span>
    </div>
  );
}
