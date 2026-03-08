import { useState } from "react";
import { useFeed } from "@/hooks/useAppData";
import { SpotifyRow } from "@/components/SpotifyRow";
import { AppHeader } from "@/components/AppHeader";
import { Search } from "lucide-react";

export default function BrowseScreen() {
  const { data: feedItems } = useFeed();
  const [filter, setFilter] = useState<"all" | "pdf" | "article">("all");
  const [search, setSearch] = useState("");

  const items =
    feedItems?.filter((f) => {
      if (f.type === "video") return false;
      if (filter !== "all" && f.type !== filter) return false;
      if (search && !f.title.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    }) ?? [];

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Browse" subtitle="Kitabs & Articles" />

      <div className="max-w-lg lg:max-w-5xl mx-auto px-4 mt-4">
        {/* Search */}
        <div className="relative mb-4">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search kitabs & articles..."
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

        {/* List */}
        <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
          {items.map((item, i) => (
            <SpotifyRow key={item.id} item={item} index={i} />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">
            No items found
          </div>
        )}
      </div>
    </div>
  );
}
