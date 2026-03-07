import { useState } from "react";
import { useUserProfile } from "@/hooks/useAppData";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Settings, BookOpen, Heart, FolderOpen } from "lucide-react";

type Tab = "saved" | "liked" | "playlists";

export default function ProfileScreen() {
  const { data: profile } = useUserProfile();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("saved");

  if (!profile) return null;

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="px-5 py-4 max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-foreground">Profile</h1>
          <button className="text-muted-foreground">
            <Settings size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4">
        {/* Avatar + info */}
        <div className="flex flex-col items-center py-8">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-primary-foreground">{initials}</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">{profile.name}</h2>
          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>

        {/* Segmented tabs */}
        <div className="flex bg-muted rounded-xl p-1 mb-5">
          {([
            { key: "saved" as Tab, label: "Saved", icon: BookOpen },
            { key: "liked" as Tab, label: "Liked", icon: Heart },
            { key: "playlists" as Tab, label: "Playlists", icon: FolderOpen },
          ]).map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                tab === t.key
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              <t.icon size={14} />
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {tab === "saved" && (
            <div className="space-y-3">
              {profile.savedKitabs.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/reader/${item.id}`)}
                  className="w-full bg-card border border-border rounded-xl p-3 flex items-center gap-3 text-left"
                >
                  {item.cover ? (
                    <img src={item.cover} alt={item.title} className="w-12 h-16 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-16 bg-muted rounded-lg flex items-center justify-center">
                      <BookOpen size={18} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-card-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.author}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {tab === "liked" && (
            <div className="space-y-3">
              {profile.likedLectures.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.type === "video" ? `/video/${item.id}` : `/reader/${item.id}`)}
                  className="w-full bg-card border border-border rounded-xl p-3 flex items-center gap-3 text-left"
                >
                  <img
                    src={item.thumbnail || item.cover}
                    alt={item.title}
                    className="w-16 h-12 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-semibold text-card-foreground truncate">{item.title}</h3>
                    <p className="text-xs text-muted-foreground">{item.instructor || item.author}</p>
                  </div>
                  <Heart size={14} className="fill-destructive text-destructive flex-shrink-0" strokeWidth={0} />
                </button>
              ))}
            </div>
          )}

          {tab === "playlists" && (
            <div className="space-y-3">
              {profile.playlists.map((pl) => (
                <div
                  key={pl.id}
                  className="bg-card border border-border rounded-xl p-3.5 flex items-center gap-3"
                >
                  <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center">
                    <FolderOpen size={18} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-card-foreground">{pl.name}</h3>
                    <p className="text-xs text-muted-foreground">{pl.item_count} items</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
