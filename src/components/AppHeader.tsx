import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "next-themes";
import { useSidebarNav } from "@/context/SidebarContext";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";
import { IlmuAppLogo } from "@/components/IlmuAppLogo";

interface AppHeaderProps {
  title?: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  leftSlot?: ReactNode;
}

export function AppHeader({ title, subtitle, rightSlot, leftSlot }: AppHeaderProps) {
  const { toggle } = useSidebarNav();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border lg:ml-64">
      {/* ── Mobile header (unchanged) ── */}
      <div className="px-4 max-w-lg mx-auto relative flex items-center h-14 lg:hidden">
        {/* Left — absolutely positioned */}
        <div className="absolute left-4 flex items-center">
          {leftSlot ? leftSlot : (
            <button
              onClick={toggle}
              className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-foreground active:scale-95 transition-transform"
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Center — always truly centred */}
        <div className="w-full flex flex-col items-center justify-center">
          {!leftSlot ? (
            <button
              onClick={() => navigate("/home")}
              className="active:opacity-70 transition-opacity"
              aria-label="Go to Home"
            >
              <IlmuAppLogo size="sm" />
            </button>
          ) : (
            <div className="text-center px-16">
              <h1 className="text-base font-bold text-foreground leading-tight truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-[10px] text-muted-foreground leading-tight truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Right — absolutely positioned */}
        <div className="absolute right-4 flex items-center gap-1">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden lg:flex items-center justify-between h-14 px-6 max-w-5xl mx-auto">
        <div className="flex items-center gap-3 min-w-0">
          {leftSlot}
          <div className="min-w-0">
            <h1 className="text-lg font-semibold text-foreground leading-tight truncate">
              {title || "'Ilm Platform"}
            </h1>
            {subtitle && (
              <p className="text-xs text-muted-foreground leading-tight truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
        </div>
      </div>
    </div>
  );
}
