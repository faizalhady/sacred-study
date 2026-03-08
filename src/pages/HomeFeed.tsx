import { AppHeader } from "@/components/AppHeader";
import { FeedCard } from "@/components/FeedCard";
import { HadithCarousel } from "@/components/HadithCarousel";
import { PlaylistModal } from "@/components/PlaylistModal";
import { SpotifyRow } from "@/components/SpotifyRow";
import { useFeed } from "@/hooks/useAppData";
import { motion } from "framer-motion";
import { ChevronRight, Play, TrendingUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SectionHeader({
  title,
  icon,
  count,
  onViewAll,
}: {
  title: string;
  icon?: React.ReactNode;
  count?: number;
  onViewAll?: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-3 px-5">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {count !== undefined && (
          <span className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded-full font-medium">
            {count}
          </span>
        )}
      </div>
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="flex items-center gap-0.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
        >
          View all
          <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

// Thin play overlay card for the horizontal scroll — wraps FeedCard with a centred play button
function VideoScrollCard({
  item,
  onPlaylistAdd,
}: {
  item: Parameters<typeof FeedCard>[0]["item"];
  onPlaylistAdd: (id: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="relative">
      <FeedCard item={item} onPlaylistAdd={onPlaylistAdd} />
      {/* Extra large play overlay on the thumbnail for instant recognition */}
      <button
        onClick={() => navigate(`/video/${item.id}`)}
        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-primary/90 flex items-center justify-center shadow-md pointer-events-none"
        tabIndex={-1}
        aria-hidden
      >
        <Play size={14} className="text-primary-foreground fill-primary-foreground ml-0.5" />
      </button>
    </div>
  );
}

export default function HomeFeed() {
  const { data: feedItems } = useFeed();
  const [playlistTarget, setPlaylistTarget] = useState<string | null>(null);
  const navigate = useNavigate();

  const videos = feedItems?.filter((f) => f.type === "video") ?? [];
  const allItems = feedItems ?? [];
  // Trending = sorted by likes
  const trending = [...allItems].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, 5);
  const recentlyAdded = allItems.slice(0, 3);

  return (
    <div className="min-h-screen bg-background pb-24">
      <AppHeader title="Home" />

      <div className="max-w-lg lg:max-w-5xl mx-auto">
        <HadithCarousel />

        {/* ── Resume Watching ── */}
        {videos.length > 0 && (
          <section className="mt-6 ml-5">
            <SectionHeader
              title="Resume Watching"
              icon={
                <div className="w-5 h-5 rounded-md bg-blue-500/10 flex items-center justify-center">
                  <Play size={11} className="text-blue-400 fill-blue-400 ml-0.5" />
                </div>
              }
              count={videos.length}
              onViewAll={() => navigate("/videos")}
            />
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-1 snap-x snap-mandatory">
              {videos.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-w-[240px] max-w-[240px] flex-shrink-0 snap-start"
                >
                  <VideoScrollCard item={item} onPlaylistAdd={setPlaylistTarget} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* ── Trending Content ── */}
        <section className="mt-6 px-0">
          <SectionHeader
            title="Trending Content"
            icon={
              <div className="w-5 h-5 rounded-md bg-primary/10 flex items-center justify-center">
                <TrendingUp size={11} className="text-primary" />
              </div>
            }
            count={allItems.length}
            onViewAll={() => navigate("/trending")}
          />
          <div className="px-4">
            <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
              {trending.map((item, i) => (
                <SpotifyRow key={item.id} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Recently Added ── */}
        <section className="mt-6 px-0">
          <SectionHeader
            title="Recently Added"
            onViewAll={() => navigate("/videos")}
          />
          <div className="px-4 space-y-3">
            {recentlyAdded.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <FeedCard item={item} onPlaylistAdd={setPlaylistTarget} />
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      <PlaylistModal
        isOpen={!!playlistTarget}
        onClose={() => setPlaylistTarget(null)}
        itemId={playlistTarget}
      />
    </div>
  );
}
