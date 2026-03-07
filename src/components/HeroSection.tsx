import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Library, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

const quickActions = [
  { label: "Continue", icon: Play, route: "/home", color: "bg-primary text-primary-foreground" },
  { label: "Learn", icon: GraduationCap, route: "/learn", color: "bg-accent text-accent-foreground" },
  { label: "Library", icon: Library, route: "/library", color: "bg-secondary text-secondary-foreground" },
  { label: "Saved", icon: BookOpen, route: "/profile", color: "bg-muted text-foreground" },
];

export function HeroSection() {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl mx-4 mt-4 p-5"
      style={{ background: "var(--gradient-brand)" }}
    >
      {/* Decorative circles */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-primary-foreground/10" />
      <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-primary-foreground/5" />

      <div className="relative z-10">
        <p className="text-primary-foreground/70 text-xs font-medium uppercase tracking-wider">
          بسم الله الرحمن الرحيم
        </p>
        <h2 className="text-xl font-bold text-primary-foreground mt-1 leading-tight">
          Assalamu Alaikum
        </h2>
        <p className="text-primary-foreground/70 text-sm mt-1">
          Continue your journey of knowledge
        </p>

        {/* Quick action buttons */}
        <div className="grid grid-cols-2 gap-2 mt-4">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={() => navigate(action.route)}
              className={`flex w-full items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold ${action.color} transition-transform active:scale-95 shadow-sm`}
            >
              <action.icon size={14} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
