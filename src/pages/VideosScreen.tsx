import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useFeed } from "@/hooks/useAppData";
import { AppHeader } from "@/components/AppHeader";
import { motion } from "framer-motion";
import {
  Search,
  Play,
  Heart,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Filter,
  Clock,
} from "lucide-react";
import { useToggleLike, useToggleSave } from "@/hooks/useAppData";
import type { FeedItem } from "@/data/mockData";

const PAGE_SIZE = 10;

type SortOption = "popular" | "newest" | "duration";

const subjects = [
  { id: "all", label: "All" },
  { id: "s1", label: "Akidah" },
  { id: "s2", label: "Tafsir" },
  { id: "s3", label: "Hadis" },
  { id: "s4", label: "Tajwid" },
  { id: "s5", label: "Fiqh" },
  { id: "s6", label: "Seerah" },
];

function VideoCard({ item }: { item: FeedItem }) {
  const navigate = useNavigate();
  const toggleLike = useToggleLike();
  const toggleSave = useToggleSave();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <button
        onClick={() => navigate(`/video/${item.id}`)}
        className="relative w-full aspect-video bg-muted block overflow-hidden"
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/20" />
        {/* Play button — centred circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-primary/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <Play size={16} className="text-primary-foreground fill-primary-foreground ml-0.5" />
          </div>
        </div>
        {/* Duration badge */}
        {item.duration && (
          <div className="absolute bottom-1.5 right-1.5 bg-black/70 text-white text-[10px] font-medium px-1.5 py-0.5 rounded-md flex items-center gap-1">
            <Clock size={9} />
            {item.duration}
          </div>
        )}
      </button>

      {/* Info */}
      <div className="p-2.5 flex flex-col gap-1.5 flex-1">
        <button
          onClick={() => navigate(`/video/${item.id}`)}
          className="text-left"
        >
          <h3 className="text-xs font-semibold text-card-foreground leading-tight line-clamp-2">
            {item.title}
          </h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
            {item.instructor}
          </p>
        </button>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1 border-t border-border mt-auto">
          <button
            onClick={() => toggleLike.mutate(item.id)}
            className="flex items-center gap-1"
          >
            <Heart
              size={13}
              className={item.isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}
              strokeWidth={item.isLiked ? 0 : 1.5}
            />
            {item.likes !== undefined && (
              <span className="text-[10px] text-muted-foreground">{item.likes}</span>
            )}
          </button>
          <button onClick={() => toggleSave.mutate(item.id)}>
            <Bookmark
              size={13}
              className={item.isSaved ? "fill-primary text-primary" : "text-muted-foreground"}
              strokeWidth={item.isSaved ? 0 : 1.5}
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideosScreen() {
  const { data: feedItems } = useFeed();
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [sort, setSort] = useState<SortOption>("popular");
  const [page, setPage] = useState(1);

  const videos = useMemo(() => {
    let list = (feedItems ?? []).filter((f) => f.type === "video");

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          (v.instructor ?? "").toLowerCase().includes(q)
      );
    }

    if (subjectFilter !== "all") {
      list = list.filter((v) => v.subject_id === subjectFilter);
    }

    if (sort === "popular") {
      list = [...list].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    } else if (sort === "duration") {
      list = [...list].sort((a, b) => {
        const toSec = (d?: string) => {
          if (!d) return 0;
          const [m, s] = d.split(":").map(Number);
          return m * 60 + (s ?? 0);
        };
        return toSec(b.duration) - toSec(a.duration);
      });
    }

    return list;
  }, [feedItems, search, subjectFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(videos.length / PAGE_SIZE));
  const paginated = videos.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSearch = (v: string) => {
    setSearch(v);
    setPage(1);
  };

  const handleSubject = (id: string) => {
    setSubjectFilter(id);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Videos" subtitle="Lectures & lessons" />

      <div className="max-w-lg mx-auto px-4 mt-4 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search videos..."
            className="w-full bg-muted text-foreground text-sm rounded-xl pl-9 pr-4 py-2.5 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>

        {/* Subject filter chips */}
        <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-0.5">
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => handleSubject(s.id)}
              className={`text-xs font-medium px-3 py-1.5 rounded-full whitespace-nowrap flex-shrink-0 transition-colors ${
                subjectFilter === s.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Sort row */}
        <div className="flex items-center gap-2">
          <Filter size={13} className="text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground mr-1">Sort:</span>
          {(
            [
              { key: "popular" as SortOption, label: "Popular" },
              { key: "newest" as SortOption, label: "Newest" },
              { key: "duration" as SortOption, label: "Longest" },
            ] as const
          ).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSort(opt.key)}
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                sort === opt.key
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
          <span className="ml-auto text-xs text-muted-foreground">
            {videos.length} videos
          </span>
        </div>

        {/* 2-column grid */}
        {paginated.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {paginated.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <VideoCard item={item} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 gap-3">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
              <Play size={24} className="text-muted-foreground opacity-40" />
            </div>
            <p className="text-sm font-semibold text-foreground">No videos found</p>
            <p className="text-xs text-muted-foreground">Try a different search or filter</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 pt-2 pb-2">
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
