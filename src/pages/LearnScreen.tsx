import { AppHeader } from "@/components/AppHeader";
import type { Module, Subject } from "@/data/mockData";
import { LEVEL_META } from "@/data/mockData";
import { useModules, useSubjects } from "@/hooks/useAppData";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Circle,
  Lock,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// ─── Subject grid card ────────────────────────────────────────────────────────
function SubjectCard({
  subject,
  onClick,
}: {
  subject: Subject;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 active:scale-[0.97] transition-all"
    >
      <span className="text-3xl">{subject.icon}</span>
      <h3 className="text-sm font-semibold text-card-foreground mt-3 leading-tight">
        {subject.title}
      </h3>
      <p className="text-xs text-muted-foreground mt-0.5 leading-snug line-clamp-2">
        {subject.description}
      </p>
      <div className="flex items-center gap-1.5 mt-3 flex-wrap">
        <span className="text-[10px] bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">
          {subject.level}
        </span>
        <span className="text-[10px] text-muted-foreground ml-auto">
          {subject.moduleCount} levels
        </span>
      </div>
    </button>
  );
}

// ─── Progress icon ────────────────────────────────────────────────────────────
function ProgressIcon({ progress }: { progress: number }) {
  if (progress === 100)
    return <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0" />;
  if (progress === 0)
    return <Circle size={18} className="text-muted-foreground/40 flex-shrink-0" />;
  return (
    <div className="w-[18px] h-[18px] rounded-full border-2 border-primary flex-shrink-0 relative overflow-hidden">
      <div
        className="absolute bottom-0 left-0 right-0 bg-primary/40"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

// ─── Single module row ────────────────────────────────────────────────────────
function ModuleRow({
  mod,
  isLocked,
}: {
  mod: Module;
  isLocked: boolean;
}) {
  const meta = LEVEL_META[mod.level];

  return (
    <div
      className={`flex items-start gap-3 p-3.5 rounded-xl transition-colors ${isLocked ? "opacity-50" : "hover:bg-muted/40"
        }`}
    >
      {/* Progress / lock icon */}
      <div className="mt-0.5 flex-shrink-0">
        {isLocked ? (
          <Lock size={16} className="text-muted-foreground/40" />
        ) : (
          <ProgressIcon progress={mod.progress} />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground leading-tight">
          {mod.title}
        </h4>
        <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2 italic">
          {mod.subtitle}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-muted-foreground">
            {mod.lessons} lessons · {mod.duration}
          </span>
          {mod.progress > 0 && mod.progress < 100 && (
            <span className={`text-[10px] font-semibold ${meta.color}`}>
              {mod.progress}%
            </span>
          )}
        </div>

        {/* Progress bar */}
        {mod.progress > 0 && !isLocked && (
          <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${mod.progress}%`,
                background:
                  mod.progress === 100
                    ? "rgb(52 211 153)"
                    : "var(--color-primary, hsl(168 55% 45%))",
              }}
            />
          </div>
        )}
      </div>

      {!isLocked && (
        <ChevronRight size={14} className="text-muted-foreground flex-shrink-0 mt-1" />
      )}
    </div>
  );
}

// ─── Level section (collapsible) ──────────────────────────────────────────────
function LevelSection({
  level,
  modules,
  defaultOpen,
}: {
  level: 0 | 1 | 2 | 3;
  modules: Module[];
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const meta = LEVEL_META[level];

  // A level is locked if the previous level's first module isn't 100% complete.
  // Level 0 is never locked. Level N is locked if level N-1 has progress === 0 overall.
  const prevLevelDone =
    level === 0 ? true : modules.some((m) => m.level === (level - 1) as 0 | 1 | 2 | 3 && m.progress > 0);

  // Determine locked per-module: locked if level is locked
  const levelProgress = modules.filter((m) => m.level === level);
  const allInLevel = levelProgress;

  // Overall level completion for badge
  const completed = allInLevel.filter((m) => m.progress === 100).length;
  const total = allInLevel.length;

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* Level header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-card hover:bg-muted/30 transition-colors"
      >
        {/* Badge */}
        <div className={`w-20 h-10 rounded-xl ${meta.bg} flex-shrink-0 flex flex-col items-center justify-center gap-0.5`}>
          <p className={`text-[11px] font-bold ${meta.color} leading-none`}>
            {meta.label}
          </p>
          <p className={`text-[9px] font-medium ${meta.color} opacity-80 leading-none`}>
            {meta.sublabel}
          </p>
        </div>

        {/* Title col */}
        <div className="flex-1 text-left min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {level === 0
              ? "Muqaddimah / Pengenalan"
              : level === 1
                ? "Asas"
                : level === 2
                  ? "Pertengahan"
                  : "Lanjutan"}
          </p>
          <p className="text-[11px] text-muted-foreground">
            {completed}/{total} selesai
          </p>
        </div>

        {/* Completion pills */}
        {completed === total && total > 0 && (
          <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
        )}

        <ChevronDown
          size={16}
          className={`text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Module list */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="divide-y divide-border bg-background/50">
              {allInLevel.map((mod) => (
                <ModuleRow key={mod.id} mod={mod} isLocked={false} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Module list for a subject ────────────────────────────────────────────────
function ModuleList({ subjectId }: { subjectId: string }) {
  const { data: modulesList } = useModules(subjectId);

  if (!modulesList || modulesList.length === 0) {
    return (
      <div className="flex flex-col items-center py-16 gap-3">
        <BookOpen size={32} className="text-muted-foreground opacity-30" />
        <p className="text-sm text-muted-foreground">No modules yet</p>
      </div>
    );
  }

  // Group by level
  const levels = [0, 1, 2, 3] as const;
  const byLevel = (lv: 0 | 1 | 2 | 3) =>
    modulesList.filter((m) => m.level === lv);

  // Overall stats
  const total = modulesList.length;
  const done = modulesList.filter((m) => m.progress === 100).length;
  const inProgress = modulesList.filter(
    (m) => m.progress > 0 && m.progress < 100
  ).length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-3"
    >
      {/* Overall progress summary */}
      <div className="bg-card border border-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-foreground">
            Overall Progress
          </p>
          <p className="text-xs text-muted-foreground">
            {done}/{total} levels
          </p>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${(done / total) * 100}%` }}
          />
        </div>
        <div className="flex gap-3 mt-2.5">
          <span className="text-[10px] text-emerald-400 font-semibold">
            ✓ {done} selesai
          </span>
          {inProgress > 0 && (
            <span className="text-[10px] text-primary font-semibold">
              ↻ {inProgress} dalam progres
            </span>
          )}
          <span className="text-[10px] text-muted-foreground ml-auto">
            {total - done - inProgress} belum mulai
          </span>
        </div>
      </div>

      {/* Level sections */}
      {levels.map((lv) => {
        const mods = byLevel(lv);
        if (mods.length === 0) return null;

        // Determine if this level should default-open
        // Open if it has in-progress modules, or it's level 0
        const hasInProgress = mods.some(
          (m) => m.progress > 0 && m.progress < 100
        );
        const isCurrentLevel = hasInProgress || (lv === 0 && done === 0);

        return (
          <LevelSection
            key={lv}
            level={lv}
            modules={modulesList}
            defaultOpen={isCurrentLevel || lv === 0}
          />
        );
      })}
    </motion.div>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function LearnScreen() {
  const { subjectId } = useParams<{ subjectId?: string }>();
  const navigate = useNavigate();
  const { data: subjectsList } = useSubjects();
  const [selected, setSelected] = useState<Subject | null>(null);

  useEffect(() => {
    if (subjectId && subjectsList) {
      const found = subjectsList.find((s) => s.id === subjectId) ?? null;
      setSelected(found);
    } else {
      setSelected(null);
    }
  }, [subjectId, subjectsList]);

  const handleSelect = (subject: Subject) => {
    setSelected(subject);
    navigate(`/learn/${subject.id}`);
  };

  const handleBack = () => {
    setSelected(null);
    navigate("/learn");
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader
        title={selected ? selected.title : "Syllabus"}
        subtitle={
          selected ? selected.description : "Structured Islamic studies"
        }
        leftSlot={
          selected ? (
            <button
              onClick={handleBack}
              className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-foreground"
            >
              <ArrowLeft size={18} />
            </button>
          ) : undefined
        }
      />

      <div className="max-w-lg lg:max-w-5xl mx-auto px-4 mt-5">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
            >
              {/* Intro banner */}
              <div className="rounded-2xl p-4 mb-4 flex items-center gap-3"
                style={{ background: "var(--gradient-brand)" }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-primary-foreground/80">
                    Kurikulum Ilmu Islam
                  </p>
                  <p className="text-sm font-bold text-primary-foreground">
                    Level 0 → Level 3 · 6 Subjek
                  </p>
                  <p className="text-[11px] text-primary-foreground/70 mt-0.5">
                    Setiap subjek bermula dari Muqaddimah hingga Lanjutan
                  </p>
                </div>
              </div>

              {/* Level legend */}
              {/* <div className="flex gap-2 mb-4 flex-wrap">
                {([0, 1, 2, 3] as const).map((lv) => {
                  const m = LEVEL_META[lv];
                  return (
                    <div
                      key={lv}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-full ${m.bg}`}
                    >
                      <span className={`text-[10px] font-bold ${m.color}`}>
                        {m.label}
                      </span>
                      <span className={`text-[10px] ${m.color} opacity-70`}>
                        {m.sublabel}
                      </span>
                    </div>
                  );
                })}
              </div> */}

              {/* Subject grid */}
              <div className="grid grid-cols-2 gap-3">
                {subjectsList?.map((subject) => (
                  <SubjectCard
                    key={subject.id}
                    subject={subject}
                    onClick={() => handleSelect(subject)}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <ModuleList subjectId={selected.id} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
