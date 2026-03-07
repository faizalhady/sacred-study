import { useState } from "react";
import { useFeed } from "@/hooks/useAppData";
import { FeedCard } from "@/components/FeedCard";
import { PlaylistModal } from "@/components/PlaylistModal";
import { motion } from "framer-motion";

export default function HomeFeed() {
  const { data: feedItems } = useFeed();
  const [playlistTarget, setPlaylistTarget] = useState<string | null>(null);

  const resumeWatching = feedItems?.filter((f) => f.type === "video").slice(0, 2) ?? [];
  const newlyAdded = feedItems ?? [];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-5 py-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-sm font-arabic text-primary-foreground font-bold">عِ</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">Assalamu Alaikum</h1>
              <p className="text-xs text-muted-foreground">Continue your journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Resume Watching */}
        {resumeWatching.length > 0 && (
          <section className="mt-5">
            <h2 className="text-sm font-semibold text-foreground mb-3 px-1">Resume Watching</h2>
            <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-1">
              {resumeWatching.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="min-w-[280px] flex-shrink-0"
                >
                  <FeedCard item={item} onPlaylistAdd={setPlaylistTarget} />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Newly Added */}
        <section className="mt-6">
          <h2 className="text-sm font-semibold text-foreground mb-3 px-1">Newly Added</h2>
          <div className="space-y-4">
            {newlyAdded.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
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
