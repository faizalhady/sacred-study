import { Home, BookOpen, Compass, User, Play } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/home",    icon: Home,    label: "Home"    },
  { path: "/learn",   icon: BookOpen, label: "Learn"  },
  { path: "/videos",  icon: Play,    label: "Videos"  },
  { path: "/browse",  icon: Compass, label: "Browse"  },
  { path: "/profile", icon: User,    label: "Profile" },
];

export function BottomTabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-tab-bar border-t border-border safe-bottom lg:hidden">
      <div className="mx-auto max-w-lg flex items-center h-16">
        {tabs.map((tab) => {
          const isActive =
            location.pathname === tab.path ||
            location.pathname.startsWith(tab.path + "/");

          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="relative flex flex-col items-center justify-center gap-0.5 flex-1 h-full"
            >
              {/* Active indicator line */}
              <span
                className={`absolute top-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-200 ${
                  isActive ? "w-6 bg-primary" : "w-0 bg-transparent"
                }`}
              />

              <tab.icon
                size={tab.path === "/videos" ? 21 : 20}
                className={
                  isActive
                    ? tab.path === "/videos"
                      ? "text-primary fill-primary"
                      : "text-tab-active"
                    : "text-tab-inactive"
                }
                strokeWidth={isActive ? 2.5 : 1.8}
                {...(tab.path === "/videos" && isActive
                  ? { fill: "currentColor" }
                  : {})}
              />
              <span
                className={`text-[9px] font-medium transition-colors ${
                  isActive ? "text-tab-active" : "text-tab-inactive"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
