import { Heart, Bookmark, FolderPlus, Play, FileText, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToggleLike, useToggleSave } from "@/hooks/useAppData";
import type { FeedItem } from "@/data/mockData";

interface FeedCardProps {
  item: FeedItem;
  onPlaylistAdd: (id: string) => void;
}

export function FeedCard({ item, onPlaylistAdd }: FeedCardProps) {
  const navigate = useNavigate();
  const toggleLike = useToggleLike();
  const toggleSave = useToggleSave();

  const handleTap = () => {
    if (item.type === "video") navigate(`/video/${item.id}`);
    else navigate(`/reader/${item.id}`);
  };

  const typeIcon = item.type === "video" ? Play : item.type === "pdf" ? FileText : BookOpen;
  const TypeIcon = typeIcon;

  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm">
      {/* Thumbnail / Cover */}
      <button onClick={handleTap} className="relative w-full aspect-video bg-muted overflow-hidden block">
        <img
          src={item.thumbnail || item.cover}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-foreground/5" />
        {item.type === "video" && item.duration && (
          <div className="absolute bottom-2 right-2 bg-foreground/80 text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-md">
            {item.duration}
          </div>
        )}
        <div className="absolute top-2 left-2 bg-primary/90 text-primary-foreground text-xs font-medium px-2 py-0.5 rounded-md flex items-center gap-1">
          <TypeIcon size={12} />
          {item.type === "video" ? "Lecture" : item.type === "pdf" ? "Kitab" : "Article"}
        </div>
      </button>

      {/* Content */}
      <div className="p-3.5">
        <button onClick={handleTap} className="text-left w-full">
          <h3 className="font-semibold text-sm text-card-foreground leading-tight line-clamp-2">
            {item.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {item.instructor || item.author}
          </p>
        </button>

        {/* Action Row */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <button
            onClick={() => toggleLike.mutate(item.id)}
            className="flex items-center gap-1.5 group"
          >
            <Heart
              size={18}
              className={item.isLiked ? "fill-destructive text-destructive" : "text-muted-foreground group-hover:text-destructive"}
              strokeWidth={item.isLiked ? 0 : 1.5}
            />
            {item.likes !== undefined && (
              <span className="text-xs text-muted-foreground">{item.likes}</span>
            )}
          </button>

          <button
            onClick={() => toggleSave.mutate(item.id)}
            className="flex items-center gap-1.5 group"
          >
            <Bookmark
              size={18}
              className={item.isSaved ? "fill-primary text-primary" : "text-muted-foreground group-hover:text-primary"}
              strokeWidth={item.isSaved ? 0 : 1.5}
            />
          </button>

          <button
            onClick={() => onPlaylistAdd(item.id)}
            className="flex items-center gap-1.5 group"
          >
            <FolderPlus size={18} className="text-muted-foreground group-hover:text-accent" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
