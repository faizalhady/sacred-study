import { useSidebarNav } from "@/context/SidebarContext";
import { IlmuAppLogo } from "@/components/IlmuAppLogo";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  Compass,
  GraduationCap,
  HelpCircle,
  Home,
  Library,
  LogOut,
  Play,
  Shield,
  Star,
  TrendingUp,
  User,
  X
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", icon: Home, path: "/home" },
  { label: "Videos", icon: Play, path: "/videos" },
  { label: "Learn", icon: GraduationCap, path: "/learn" },
  { label: "My Library", icon: Library, path: "/library" },
  { label: "Profile", icon: User, path: "/profile" },
];

const discoverItems = [
  { label: "Browse", icon: Compass, path: "/browse" },
  { label: "Trending", icon: TrendingUp, path: "/trending" },
];

const moreItems = [
  { label: "Notifications", icon: Bell, path: null },
  { label: "Help & Support", icon: HelpCircle, path: null },
  { label: "Rate the App", icon: Star, path: null },
  { label: "Privacy Policy", icon: Shield, path: null },
];

export function AppSidebar() {
  const { isOpen, close } = useSidebarNav();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path: string | null) => {
    if (path) {
      navigate(path);
      close();
    }
  };

  const handleLogout = () => {
    close();
    navigate("/");
  };

  const sidebarNav = (
    <>
      {/* Scrollable nav area */}
      <div className="flex-1 overflow-y-auto sidebar-scrollbar">
        <div className="px-3 mb-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">Navigation</p>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-0.5 ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="px-3 mt-2 mb-1">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">Discover</p>
          {discoverItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-0.5 ${isActive ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"}`}
              >
                <item.icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="px-3 mt-2">
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-1">More</p>
          {moreItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNav(item.path)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted transition-colors mb-0.5"
            >
              <item.icon size={18} strokeWidth={1.8} className="text-muted-foreground" />
              {item.label}
            </button>
          ))}
          {/* Log Out — under More items */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors mb-0.5"
          >
            <LogOut size={18} strokeWidth={1.8} />
            Log Out
          </button>
        </div>
      </div>

      {/* Footer — user card + version */}
      <div className="px-4 pb-3 border-t border-border pt-3">
        <button
          onClick={() => handleNav("/profile")}
          className="w-full bg-primary/10 rounded-2xl p-3 flex items-center gap-3 hover:bg-primary/15 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary-foreground">SU</span>
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-semibold text-foreground truncate">Student User</p>
            <p className="text-xs text-muted-foreground truncate">student@example.com</p>
          </div>
          <ChevronRight size={16} className="ml-auto flex-shrink-0 text-muted-foreground" />
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-3">'Ilm Platform v1.0.0</p>
      </div>
    </>
  );

  return (
    <>
      {/* ── Desktop: permanent fixed sidebar ── */}
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:w-64 lg:flex-col bg-card border-r border-border z-[70]">
        <div className="flex items-center px-5 pt-8 pb-6">
          <IlmuAppLogo size="md" />
        </div>
        {sidebarNav}
      </div>

      {/* ── Mobile: overlay drawer (unchanged) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className="fixed inset-0 bg-foreground/50 z-[60] backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 left-0 h-full w-72 bg-card border-r border-border z-[70] flex flex-col shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between px-5 pt-12 pb-6">
                <IlmuAppLogo size="md" />
                <button
                  onClick={close}
                  className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              {sidebarNav}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
