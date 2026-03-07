import { useState } from "react";
import { X, Plus, Check, FolderOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaylists, useCreatePlaylist } from "@/hooks/useAppData";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemId: string | null;
}

export function PlaylistModal({ isOpen, onClose }: PlaylistModalProps) {
  const { data: playlists } = usePlaylists();
  const createPlaylist = useCreatePlaylist();
  const [newName, setNewName] = useState("");
  const [addedTo, setAddedTo] = useState<string | null>(null);

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist.mutate(newName.trim());
      setNewName("");
    }
  };

  const handleAdd = (playlistId: string) => {
    setAddedTo(playlistId);
    setTimeout(() => {
      setAddedTo(null);
      onClose();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[70vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="text-base font-semibold text-card-foreground">Add to Playlist</h3>
              <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted">
                <X size={18} className="text-muted-foreground" />
              </button>
            </div>

            {/* Create new */}
            <div className="px-5 pb-3">
              <div className="flex gap-2">
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="New playlist name..."
                  className="flex-1 bg-muted text-foreground text-sm rounded-xl px-3.5 py-2.5 placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                />
                <button
                  onClick={handleCreate}
                  disabled={!newName.trim()}
                  className="bg-primary text-primary-foreground rounded-xl px-3.5 py-2.5 disabled:opacity-40"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Playlist list */}
            <div className="px-5 pb-8 overflow-y-auto max-h-[45vh]">
              {playlists?.map((pl) => (
                <button
                  key={pl.id}
                  onClick={() => handleAdd(pl.id)}
                  className="w-full flex items-center gap-3 py-3 border-b border-border last:border-0"
                >
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    {addedTo === pl.id ? (
                      <Check size={18} className="text-primary" />
                    ) : (
                      <FolderOpen size={18} className="text-muted-foreground" />
                    )}
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-card-foreground">{pl.name}</p>
                    <p className="text-xs text-muted-foreground">{pl.item_count} items</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
