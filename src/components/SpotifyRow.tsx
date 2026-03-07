import { useNavigate } from "react-router-dom";
import { Heart, Play, FileText, BookOpen } from "lucide-react";
import { useToggleLike } from "@/hooks/useAppData";
import type { FeedItem } from "@/data/mockData";
import { SUBJECT_BADGE } from "@/data/mockData";
import { motion } from "framer-motion";

interface SpotifyRowProps {
  item: FeedItem;
  index: number;
  showIndex?: boolean;
}

export function SpotifyRow({ item, index, showIndex = true }: SpotifyRowProps) {
  const navigate = useNavigate();
  const toggleLike = useToggleLike();

  const handleTap = () => {
    if (item.type === "video") navigate(`/video/${item.id}`);
    else navigate(`/reader/${item.id}`);
  };

  const TypeIcon = item.type === "video" ? Play : item.type === "pdf" ? FileText : BookOpen;
  const subject = SUBJECT_BADGE[item.subject_id];

  return (
    <motion.button
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={handleTap}
      className="w-full flex items-center gap-3 py-2.5 px-1 hover:bg-muted/50 rounded-lg transition-colors group text-left"
    >
      {showIndex && (
        <span className="text-xs font-medium text-muted-foreground w-5 text-center flex-shrink-0">
          {index + 1}
        </span>
      )}

      {/* Thumbnail */}
      <div className="relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
        {(item.thumbnail || item.cover) ? (
          <img
            src={item.thumbnail || item.cover}
            alt={item.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <TypeIcon size={16} className="text-primary" />
          </div>
        )}
        {item.type === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <Play size={14} className="text-primary-foreground fill-primary-foreground" />
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium text-foreground truncate leading-tight">
          {item.title}
        </h4>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          {/* Subject badge */}
          {subject && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${subject.bg} ${subject.color}`}>
              {subject.label}
            </span>
          )}
          <TypeIcon size={10} className="text-muted-foreground flex-shrink-0" />
          <span className="text-xs text-muted-foreground truncate">
            {item.instructor || item.author}
            {item.duration && ` · ${item.duration}`}
          </span>
        </div>
      </div>

      {/* Like */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike.mutate(item.id);
        }}
        className="flex-shrink-0 p-1.5"
      >
        <Heart
          size={16}
          className={item.isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}
          strokeWidth={item.isLiked ? 0 : 1.5}
        />
      </button>
    </motion.button>
  );
}
