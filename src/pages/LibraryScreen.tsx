import { useState } from "react";
import { useUserProfile, useFeed } from "@/hooks/useAppData";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Heart,
  FolderOpen,
  History,
  ChevronRight,
  Play,
  FileText,
  BookMarked,
  Plus,
  Filter,
  Clock,
} from "lucide-react";
import { AppHeader } from "@/components/AppHeader";
import { PlaylistModal } from "@/components/PlaylistModal";
import type { FeedItem } from "@/data/mockData";

type Tab = "saved" | "liked" | "playlists" | "history";

const TABS: { key: Tab; label: string; icon: React.ComponentType<any> }[] = [
  { key: "saved", label: "Saved", icon: BookMarked },
  { key: "liked", label: "Liked", icon: Heart },
  { key: "playlists", label: "Playlists", icon: FolderOpen },
  { key: "history", label: "History", icon: History },
];

type HistoryFilter = "all" | "video" | "pdf" | "article";

function TypeBadge({ type }: { type: FeedItem["type"] }) {
  const map = {
    video: { label: "Video", icon: Play, color: "bg-blue-500/10 text-blue-400" },
    pdf: { label: "Kitab", icon: BookOpen, color: "bg-amber-500/10 text-amber-400" },
    article: { label: "Article", icon: FileText, color: "bg-emerald-500/10 text-emerald-400" },
  };
  const { label, icon: Icon, color } = map[type];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded-md ${color}`}>
      <Icon size={9} />
      {label}
    </span>
  );
}

function EmptyState({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ size: number; className: string }>;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex flex-col items-center py-16 gap-3">
      <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
        <Icon size={28} className="text-muted-foreground opacity-40" />
      </div>
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="text-xs text-muted-foreground text-center max-w-[200px]">{subtitle}</p>
    </div>
  );
}

export default function LibraryScreen() {
  const { data: profile } = useUserProfile();
  const { data: feedItems } = useFeed();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("saved");
  const [historyFilter, setHistoryFilter] = useState<HistoryFilter>("all");
  const [playlistTarget, setPlaylistTarget] = useState<string | null>(null);
  const [showFilterSheet, setShowFilterSheet] = useState(false);

  if (!profile) return null;

  // History = all feed items the user has interacted with (liked or saved) as mock
  const historyItems = (feedItems ?? []).filter((f) => {
    if (historyFilter !== "all" && f.type !== historyFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="My Library" subtitle="Your personal collection" />

      <div className="max-w-lg mx-auto">
        {/* Tab bar — horizontally scrollable */}
        <div className="flex gap-1 px-4 pt-4 pb-3 overflow-x-auto hide-scrollbar">
          {TABS.map((t) => {
            const isActive = tab === t.key;
            return (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <t.icon size={13} strokeWidth={isActive ? 2.5 : 1.8} />
                {t.label}
                {t.key === "saved" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/20"}`}>
                    {profile.savedKitabs.length}
                  </span>
                )}
                {t.key === "liked" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/20"}`}>
                    {profile.likedLectures.length}
                  </span>
                )}
                {t.key === "playlists" && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${isActive ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted-foreground/20"}`}>
                    {profile.playlists.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {/* ── SAVED ── */}
              {tab === "saved" && (
                <div className="space-y-2.5">
                  {profile.savedKitabs.length === 0 ? (
                    <EmptyState
                      icon={BookMarked}
                      title="Nothing saved yet"
                      subtitle="Save kitabs and articles to read them later"
                    />
                  ) : (
                    profile.savedKitabs.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => navigate(`/reader/${item.id}`)}
                        className="w-full bg-card border border-border rounded-2xl p-3 flex items-center gap-3 text-left hover:border-primary/30 active:scale-[0.98] transition-all"
                      >
                        {item.cover ? (
                          <img
                            src={item.cover}
                            alt={item.title}
                            className="w-11 h-[60px] rounded-xl object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-[60px] bg-muted rounded-xl flex items-center justify-center flex-shrink-0">
                            <BookOpen size={18} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <TypeBadge type={item.type} />
                          <h3 className="text-sm font-semibold text-card-foreground truncate mt-0.5">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.author ?? item.instructor}
                          </p>
                        </div>
                        <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* ── LIKED ── */}
              {tab === "liked" && (
                <div className="space-y-2.5">
                  {profile.likedLectures.length === 0 ? (
                    <EmptyState
                      icon={Heart}
                      title="No liked content"
                      subtitle="Like lectures and articles to find them here"
                    />
                  ) : (
                    profile.likedLectures.map((item) => (
                      <button
                        key={item.id}
                        onClick={() =>
                          navigate(
                            item.type === "video"
                              ? `/video/${item.id}`
                              : `/reader/${item.id}`
                          )
                        }
                        className="w-full bg-card border border-border rounded-2xl p-3 flex items-center gap-3 text-left hover:border-primary/30 active:scale-[0.98] transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                          {item.thumbnail || item.cover ? (
                            <img
                              src={item.thumbnail ?? item.cover}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText size={16} className="text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <TypeBadge type={item.type} />
                          <h3 className="text-sm font-semibold text-card-foreground truncate mt-0.5">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground truncate">
                            {item.instructor ?? item.author}
                          </p>
                        </div>
                        <Heart
                          size={15}
                          className="fill-destructive text-destructive flex-shrink-0"
                          strokeWidth={0}
                        />
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* ── PLAYLISTS ── */}
              {tab === "playlists" && (
                <div className="space-y-2.5">
                  {/* Create new playlist button */}
                  <button
                    onClick={() => setPlaylistTarget("new")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl border border-dashed border-primary/40 text-primary hover:bg-primary/5 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Plus size={18} className="text-primary" />
                    </div>
                    <span className="text-sm font-semibold">New Playlist</span>
                  </button>

                  {profile.playlists.map((pl) => (
                    <div
                      key={pl.id}
                      className="bg-card border border-border rounded-2xl p-3.5 flex items-center gap-3 active:scale-[0.98] transition-transform cursor-pointer hover:border-primary/30"
                    >
                      <div className="w-11 h-11 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
                        <FolderOpen size={20} className="text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-card-foreground">
                          {pl.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {pl.item_count} items
                        </p>
                      </div>
                      <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              )}

              {/* ── HISTORY ── */}
              {tab === "history" && (
                <div>
                  {/* Filter row */}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => setShowFilterSheet(true)}
                      className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Filter size={12} />
                      Filter
                    </button>
                    {(["all", "video", "pdf", "article"] as HistoryFilter[]).map((f) => (
                      <button
                        key={f}
                        onClick={() => setHistoryFilter(f)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                          historyFilter === f
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {f === "all" ? "All" : f === "pdf" ? "Kitabs" : f === "video" ? "Videos" : "Articles"}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2.5">
                    {historyItems.length === 0 ? (
                      <EmptyState
                        icon={History}
                        title="No history yet"
                        subtitle="Content you watch or read will appear here"
                      />
                    ) : (
                      historyItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            navigate(
                              item.type === "video"
                                ? `/video/${item.id}`
                                : `/reader/${item.id}`
                            )
                          }
                          className="w-full bg-card border border-border rounded-2xl p-3 flex items-center gap-3 text-left hover:border-primary/30 active:scale-[0.98] transition-all"
                        >
                          <div className="w-16 h-11 rounded-xl overflow-hidden flex-shrink-0 bg-muted relative">
                            {item.thumbnail || item.cover ? (
                              <img
                                src={item.thumbnail ?? item.cover}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FileText size={16} className="text-muted-foreground" />
                              </div>
                            )}
                            {item.type === "video" && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <Play size={14} className="text-white fill-white" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <TypeBadge type={item.type} />
                            <h3 className="text-sm font-semibold text-card-foreground truncate mt-0.5">
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Clock size={10} className="text-muted-foreground" />
                              <p className="text-[10px] text-muted-foreground">
                                {item.duration ?? "—"} · {item.instructor ?? item.author}
                              </p>
                            </div>
                          </div>
                          <ChevronRight size={14} className="text-muted-foreground flex-shrink-0" />
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <PlaylistModal
        isOpen={!!playlistTarget}
        onClose={() => setPlaylistTarget(null)}
        itemId={playlistTarget}
      />
    </div>
  );
}
