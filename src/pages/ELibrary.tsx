import { useState } from "react";
import { useFeed } from "@/hooks/useAppData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FileText, BookOpen, Search } from "lucide-react";

export default function ELibrary() {
  const { data: feedItems } = useFeed();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "pdf" | "article">("all");
  const [search, setSearch] = useState("");

  const items = feedItems?.filter((f) => {
    if (f.type === "video") return false;
    if (filter !== "all" && f.type !== filter) return false;
    if (search && !f.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }) ?? [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-5 py-4 max-w-lg mx-auto">
          <h1 className="text-lg font-bold text-foreground">Library</h1>
          <p className="text-xs text-muted-foreground">Kitabs & Articles</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search library..."
            className="w-full bg-muted text-foreground text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {(["all", "pdf", "article"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-colors ${
                filter === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {f === "all" ? "All" : f === "pdf" ? "Kitabs" : "Articles"}
            </button>
          ))}
        </div>

        {/* Items */}
        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/reader/${item.id}`)}
              className="w-full bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3.5 text-left"
            >
              {item.cover ? (
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-14 h-20 rounded-lg object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen size={22} className="text-primary" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  {item.type === "pdf" ? (
                    <FileText size={12} className="text-accent" />
                  ) : (
                    <BookOpen size={12} className="text-primary" />
                  )}
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">
                    {item.type === "pdf" ? "Kitab" : "Article"}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-card-foreground line-clamp-2">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{item.author}</p>
              </div>
            </motion.button>
          ))}

          {items.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No items found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
