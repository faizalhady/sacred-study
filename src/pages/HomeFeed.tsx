import { useState } from "react";
import { useFeed } from "@/hooks/useAppData";
import { FeedCard } from "@/components/FeedCard";
import { SpotifyRow } from "@/components/SpotifyRow";
import { HeroSection } from "@/components/HeroSection";
import { PlaylistModal } from "@/components/PlaylistModal";
import { motion } from "framer-motion";

export default function HomeFeed() {
  const { data: feedItems } = useFeed();
  const [playlistTarget, setPlaylistTarget] = useState<string | null>(null);

  const videos = feedItems?.filter((f) => f.type === "video") ?? [];
  const allItems = feedItems ?? [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-5 py-3 max-w-lg mx-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-xs font-arabic text-primary-foreground font-bold">عِ</span>
          </div>
          <h1 className="text-base font-bold text-foreground">Home</h1>
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        {/* Hero Section */}
        <HeroSection />

        {/* Resume Watching — Horizontal Swipe */}
        {videos.length > 0 && (
          <section className="mt-5">
            <h2 className="text-sm font-semibold text-foreground mb-3 px-5">Resume Watching</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar px-4 pb-1 snap-x snap-mandatory">
              {videos.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-w-[260px] max-w-[260px] flex-shrink-0 snap-start"
                >
                  <FeedCard item={item} onPlaylistAdd={setPlaylistTarget} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Spotify-style Compact List */}
        <section className="mt-6 px-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">Trending Content</h2>
            <span className="text-xs text-muted-foreground">{allItems.length} items</span>
          </div>
          <div className="bg-card rounded-2xl border border-border divide-y divide-border overflow-hidden">
            {allItems.map((item, i) => (
              <SpotifyRow key={item.id} item={item} index={i} />
            ))}
          </div>
        </section>

        {/* Recently Added — full cards */}
        <section className="mt-6 px-4">
          <h2 className="text-sm font-semibold text-foreground mb-3">Recently Added</h2>
          <div className="space-y-3">
            {allItems.slice(0, 3).map((item, i) => (
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
