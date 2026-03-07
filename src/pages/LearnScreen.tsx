import { useState } from "react";
import { useSubjects, useModules } from "@/hooks/useAppData";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, BookOpen } from "lucide-react";
import type { Subject } from "@/data/mockData";

export default function LearnScreen() {
  const { data: subjectsList } = useSubjects();
  const [selected, setSelected] = useState<Subject | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-5 py-4 max-w-lg mx-auto flex items-center gap-3">
          {selected && (
            <button onClick={() => setSelected(null)} className="text-foreground">
              <ArrowLeft size={20} />
            </button>
          )}
          <div>
            <h1 className="text-lg font-bold text-foreground">
              {selected ? selected.title : "Syllabus"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {selected ? selected.description : "Structured Islamic studies"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-5">
        <AnimatePresence mode="wait">
          {!selected ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-2 gap-3"
            >
              {subjectsList?.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelected(subject)}
                  className="bg-card border border-border rounded-2xl p-4 text-left hover:border-primary/30 transition-colors"
                >
                  <span className="text-3xl">{subject.icon}</span>
                  <h3 className="text-sm font-semibold text-card-foreground mt-3">{subject.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{subject.description}</p>
                  <div className="flex items-center gap-1 mt-3">
                    <span className="text-[10px] bg-primary/10 text-primary font-medium px-2 py-0.5 rounded-full">
                      {subject.level}
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-auto">
                      {subject.moduleCount} modules
                    </span>
                  </div>
                </button>
              ))}
            </motion.div>
          ) : (
            <ModuleList subjectId={selected.id} />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ModuleList({ subjectId }: { subjectId: string }) {
  const { data: modulesList } = useModules(subjectId);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-3"
    >
      {modulesList?.map((mod) => (
        <div
          key={mod.id}
          className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3"
        >
          <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <BookOpen size={18} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-card-foreground truncate">{mod.title}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              {mod.lessons} lessons · {mod.duration}
            </p>
            {mod.progress > 0 && (
              <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${mod.progress}%` }}
                />
              </div>
            )}
          </div>
          <ChevronRight size={16} className="text-muted-foreground flex-shrink-0" />
        </div>
      ))}
    </motion.div>
  );
}
