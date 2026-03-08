import { useState, useMemo } from "react";
import { useFeed } from "@/hooks/useAppData";
import { SpotifyRow } from "@/components/SpotifyRow";
import { AppHeader } from "@/components/AppHeader";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

const PAGE_SIZE = 10;

export default function TrendingScreen() {
  const { data: feedItems } = useFeed();
  const [page, setPage] = useState(1);

  // Sort all items by likes descending
  const sorted = useMemo(
    () =>
      [...(feedItems ?? [])].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)),
    [feedItems]
  );

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Trending" subtitle="Most liked content" />

      <div className="max-w-lg lg:max-w-5xl mx-auto px-4 mt-4">
        {/* Section label */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp size={13} className="text-primary" />
          </div>
          <span className="text-xs font-semibold text-muted-foreground">
            {sorted.length} items · Page {page} of {totalPages}
          </span>
        </div>

        {/* List */}
        <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden mb-4">
          {paginated.map((item, i) => (
            <div key={item.id} className="px-3">
              <SpotifyRow
                item={item}
                index={(page - 1) * PAGE_SIZE + i}
                showIndex
              />
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pb-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                    p === page
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center text-muted-foreground disabled:opacity-30 hover:text-foreground transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
