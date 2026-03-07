import { AppHeader } from "@/components/AppHeader";
import { SettingsModal } from "@/components/SettingsModal";
import { useUserProfile } from "@/hooks/useAppData";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  Bell,
  BookOpen,
  ChevronRight,
  Clock,
  Compass,
  FolderOpen,
  Heart,
  History,
  Library,
  Lock,
  LogOut,
  Moon,
  Play,
  Settings,
  Sun,
  TrendingUp,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Gear dropdown ──────────────────────────────────────────────────────────
function GearDropdown({
  onSettings,
  onLogout,
}: {
  onSettings: () => void;
  onLogout: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const items = [
    {
      icon: User,
      label: "Edit Profile",
      onClick: () => { onSettings(); setOpen(false); },
    },
    {
      icon: Lock,
      label: "Change Password",
      onClick: () => { onSettings(); setOpen(false); },
    },
    {
      icon: Bell,
      label: "Notifications",
      onClick: () => setOpen(false),
    },
    {
      icon: theme === "dark" ? Sun : Moon,
      label: theme === "dark" ? "Light Mode" : "Dark Mode",
      onClick: () => { setTheme(theme === "dark" ? "light" : "dark"); setOpen(false); },
    },
    {
      icon: LogOut,
      label: "Log Out",
      danger: true,
      onClick: () => { setOpen(false); onLogout(); },
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
      >
        <Settings size={16} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-10 w-48 bg-card border border-border rounded-2xl shadow-xl overflow-hidden z-50"
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors ${(item as { danger?: boolean }).danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-foreground hover:bg-muted"
                  }`}
              >
                <item.icon size={15} strokeWidth={1.8} />
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Stats ───────────────────────────────────────────────────────────────────
const stats = [
  { label: "Lectures", value: "24", icon: Play },
  { label: "Hours", value: "18h", icon: Clock },
  { label: "Streak", value: "7d", icon: TrendingUp },
  { label: "Badges", value: "5", icon: Award },
];

// ─── Quick-nav shortcuts ──────────────────────────────────────────────────────
const shortcuts = [
  { label: "Saved Kitabs", icon: BookOpen, path: "/library", color: "bg-amber-500/10 text-amber-400" },
  { label: "Liked Content", icon: Heart, path: "/library", color: "bg-rose-500/10 text-rose-400" },
  { label: "My Playlists", icon: FolderOpen, path: "/library", color: "bg-violet-500/10 text-violet-400" },
  { label: "Watch History", icon: History, path: "/library", color: "bg-blue-500/10 text-blue-400" },
  { label: "Browse Kitabs", icon: Compass, path: "/browse", color: "bg-emerald-500/10 text-emerald-400" },
  { label: "My Library", icon: Library, path: "/library", color: "bg-primary/10 text-primary" },
];

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const { data: profile } = useUserProfile();
  const navigate = useNavigate();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleLogout = () => navigate("/");

  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader
        title="Profile"
        rightSlot={
          <GearDropdown
            onSettings={() => setSettingsOpen(true)}
            onLogout={handleLogout}
          />
        }
      />

      <div className="max-w-lg mx-auto px-4">

        {/* ── Avatar ── */}
        <div className="flex flex-col items-center pt-8 pb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lg ring-4 ring-background">
              <span className="text-3xl font-bold text-primary-foreground">
                {initials}
              </span>
            </div>
            <button
              onClick={() => setSettingsOpen(true)}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-accent flex items-center justify-center shadow-md"
            >
              <User size={13} className="text-accent-foreground" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
          <span className="mt-2 text-[10px] bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
            Level 2 Student
          </span>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-4 gap-2 mb-5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-card border border-border rounded-2xl py-3 flex flex-col items-center gap-1"
            >
              <s.icon size={16} className="text-primary" strokeWidth={1.8} />
              <p className="text-sm font-bold text-foreground">{s.value}</p>
              <p className="text-[10px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Continue learning ── */}
        <div
          className="rounded-2xl p-4 mb-6 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-transform"
          style={{ background: "var(--gradient-brand)" }}
          onClick={() => navigate("/learn")}
        >
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-primary-foreground/80">
              Continue Learning
            </p>
            <p className="text-sm font-bold text-primary-foreground">
              Three Fundamental Principles
            </p>
            <div className="mt-1.5 h-1.5 bg-primary-foreground/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-foreground rounded-full"
                style={{ width: "75%" }}
              />
            </div>
          </div>
          <ChevronRight size={16} className="text-primary-foreground/70 flex-shrink-0" />
        </div>

        {/* ── Quick access ── */}
        {/* <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Quick Access
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            {shortcuts.map((s) => (
              <button
                key={s.label}
                onClick={() => navigate(s.path)}
                className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3 text-left hover:border-primary/30 active:scale-[0.97] transition-all"
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${s.color.split(" ")[0]}`}>
                  <s.icon size={17} className={s.color.split(" ")[1]} strokeWidth={1.8} />
                </div>
                <span className="text-xs font-semibold text-card-foreground leading-tight">
                  {s.label}
                </span>
              </button>
            ))}
          </div>
        </div> */}

        {/* ── Account section ── */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Account
          </p>
          <div className="bg-card border border-border rounded-2xl overflow-hidden divide-y divide-border">
            {[
              { icon: User, label: "Edit Profile", onClick: () => setSettingsOpen(true) },
              { icon: Lock, label: "Change Password", onClick: () => setSettingsOpen(true) },
              { icon: Bell, label: "Notifications", onClick: () => { } },
            ].map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted transition-colors"
              >
                <item.icon size={17} className="text-muted-foreground" strokeWidth={1.8} />
                <span className="text-sm text-foreground flex-1 text-left">{item.label}</span>
                <ChevronRight size={14} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* ── Danger zone ── */}
        <div className="mb-8">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-destructive/5 transition-colors"
            >
              <LogOut size={17} className="text-destructive" strokeWidth={1.8} />
              <span className="text-sm text-destructive flex-1 text-left font-medium">
                Log Out
              </span>
            </button>
          </div>
        </div>

      </div>

      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
}
