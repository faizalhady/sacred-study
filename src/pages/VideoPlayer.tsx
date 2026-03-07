import { useParams, useNavigate } from "react-router-dom";
import { useFeedItem, useToggleLike, useToggleSave } from "@/hooks/useAppData";
import { ArrowLeft, Heart, Bookmark, FolderPlus, Share2 } from "lucide-react";
import { useState } from "react";
import { PlaylistModal } from "@/components/PlaylistModal";

export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item } = useFeedItem(id ?? "");
  const toggleLike = useToggleLike();
  const toggleSave = useToggleSave();
  const [showPlaylist, setShowPlaylist] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Content not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Video Area */}
      <div className="relative w-full aspect-video bg-foreground/95">
        <img
          src={item.thumbnail || item.cover}
          alt={item.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center">
            <div className="w-0 h-0 border-t-8 border-b-8 border-l-12 border-t-transparent border-b-transparent border-l-primary-foreground ml-1" 
              style={{ borderLeftWidth: '14px' }}
            />
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-foreground/40 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-background" />
        </button>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-5 py-5">
        {/* Instructor */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {(item.instructor || item.author || "?")[0]}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">{item.instructor || item.author}</p>
            <p className="text-xs text-muted-foreground">{item.duration}</p>
          </div>
        </div>

        <h1 className="text-lg font-bold text-foreground leading-snug">{item.title}</h1>
        
        {item.description && (
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
        )}

        {/* Action Row */}
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
          <button
            onClick={() => toggleLike.mutate(item.id)}
            className="flex flex-col items-center gap-1"
          >
            <Heart
              size={24}
              className={item.isLiked ? "fill-destructive text-destructive" : "text-muted-foreground"}
              strokeWidth={item.isLiked ? 0 : 1.5}
            />
            <span className="text-[10px] text-muted-foreground">{item.likes ?? 0}</span>
          </button>

          <button
            onClick={() => toggleSave.mutate(item.id)}
            className="flex flex-col items-center gap-1"
          >
            <Bookmark
              size={24}
              className={item.isSaved ? "fill-primary text-primary" : "text-muted-foreground"}
              strokeWidth={item.isSaved ? 0 : 1.5}
            />
            <span className="text-[10px] text-muted-foreground">Save</span>
          </button>

          <button
            onClick={() => setShowPlaylist(true)}
            className="flex flex-col items-center gap-1"
          >
            <FolderPlus size={24} className="text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[10px] text-muted-foreground">Playlist</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <Share2 size={24} className="text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[10px] text-muted-foreground">Share</span>
          </button>
        </div>
      </div>

      <PlaylistModal
        isOpen={showPlaylist}
        onClose={() => setShowPlaylist(false)}
        itemId={item.id}
      />
    </div>
  );
}
