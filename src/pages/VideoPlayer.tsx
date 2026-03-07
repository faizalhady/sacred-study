import { useParams, useNavigate } from "react-router-dom";
import { useFeedItem, useToggleLike, useToggleSave } from "@/hooks/useAppData";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  FolderPlus,
  Share2,
  Play,
  ChevronDown,
  FileText,
  Download,
  X,
  Files,
} from "lucide-react";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlaylistModal } from "@/components/PlaylistModal";
import { SUBJECT_BADGE } from "@/data/mockData";

// ─── Mock materials data ──────────────────────────────────────────────────────
interface Material {
  id: string;
  title: string;
  size: string;
  pages: number;
}

const MATERIALS_POOL: Material[] = [
  { id: "mat1",  title: "Lecture Notes — Full Summary",          size: "1.2 MB", pages: 18 },
  { id: "mat2",  title: "Handout — Key Terms & Definitions",     size: "340 KB", pages: 4  },
  { id: "mat3",  title: "Worksheet — Self-Assessment Questions", size: "210 KB", pages: 3  },
  { id: "mat4",  title: "Reference Slides (Printable)",          size: "2.4 MB", pages: 24 },
  { id: "mat5",  title: "Kitab Extract — Relevant Chapters",     size: "890 KB", pages: 12 },
  { id: "mat6",  title: "Arabic Vocabulary List",                size: "180 KB", pages: 2  },
  { id: "mat7",  title: "Mind Map — Topic Overview",             size: "450 KB", pages: 1  },
  { id: "mat8",  title: "Recommended Reading List",              size: "95 KB",  pages: 1  },
  { id: "mat9",  title: "Dalil (Proofs) Reference Sheet",        size: "310 KB", pages: 5  },
  { id: "mat10", title: "Quiz & Revision Questions",             size: "220 KB", pages: 6  },
];

// Deterministically pick 1–3 materials based on video id seed
function getMaterials(id: string): Material[] {
  const seed = id.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const count = (seed % 3) + 1; // 1, 2, or 3
  const start = seed % MATERIALS_POOL.length;
  const result: Material[] = [];
  for (let i = 0; i < count; i++) {
    result.push(MATERIALS_POOL[(start + i) % MATERIALS_POOL.length]);
  }
  return result;
}

// ─── Long lorem-ipsum description ─────────────────────────────────────────────
const LOREM =
  " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est.";

// ─── Materials bottom sheet ───────────────────────────────────────────────────
function MaterialsModal({
  isOpen,
  onClose,
  videoId,
  videoTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  videoId: string;
  videoTitle: string;
}) {
  const materials = useMemo(() => getMaterials(videoId), [videoId]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-card rounded-t-3xl max-h-[75vh] overflow-hidden flex flex-col"
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
              <div className="w-10 h-1 rounded-full bg-muted" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Files size={14} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground">
                    Learning Materials
                  </h3>
                  <p className="text-[10px] text-muted-foreground">
                    {materials.length} file{materials.length > 1 ? "s" : ""} available
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-muted flex items-center justify-center"
              >
                <X size={15} className="text-muted-foreground" />
              </button>
            </div>

            {/* Video title context */}
            <div className="mx-5 mb-3 px-3 py-2 bg-muted/50 rounded-xl flex-shrink-0">
              <p className="text-[11px] text-muted-foreground leading-none mb-0.5">
                For this lecture
              </p>
              <p className="text-xs font-medium text-foreground line-clamp-1">
                {videoTitle}
              </p>
            </div>

            {/* Materials list */}
            <div className="overflow-y-auto flex-1 px-4 pb-8">
              <div className="bg-background rounded-2xl border border-border divide-y divide-border overflow-hidden">
                {materials.map((mat) => (
                  <div
                    key={mat.id}
                    className="flex items-center gap-3 px-3 py-3 group hover:bg-muted/30 transition-colors"
                  >
                    {/* PDF icon */}
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} className="text-rose-400" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate leading-tight">
                        {mat.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">
                          PDF
                        </span>
                        <span className="text-[10px] text-muted-foreground/50">
                          ·
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {mat.pages} {mat.pages === 1 ? "page" : "pages"}
                        </span>
                        <span className="text-[10px] text-muted-foreground/50">
                          ·
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {mat.size}
                        </span>
                      </div>
                    </div>

                    {/* Download button */}
                    <button className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 hover:bg-primary/20 active:scale-95 transition-all">
                      <Download size={15} className="text-primary" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─── Description accordion ────────────────────────────────────────────────────
function DescriptionAccordion({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const fullText = text + LOREM;
  const preview = fullText.slice(0, 160);

  return (
    <div className="mt-3">
      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.p
            key="full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground leading-relaxed"
          >
            {fullText}
          </motion.p>
        ) : (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {preview}
            <span className="text-muted-foreground/50">…</span>
          </p>
        )}
      </AnimatePresence>

      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-1 mt-1.5 text-xs font-semibold text-primary hover:opacity-80 transition-opacity"
      >
        {expanded ? "Show less" : "Show more"}
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex"
        >
          <ChevronDown size={14} />
        </motion.span>
      </button>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function VideoPlayer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item } = useFeedItem(id ?? "");
  const toggleLike = useToggleLike();
  const toggleSave = useToggleSave();
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [showMaterials, setShowMaterials] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Content not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ── Video area ── */}
      <div className="relative w-full aspect-video bg-foreground/95">
        <img
          src={item.thumbnail || item.cover}
          alt={item.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center">
          <button className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center active:scale-95 transition-transform shadow-xl">
            <Play
              size={28}
              className="text-primary-foreground fill-primary-foreground ml-1"
            />
          </button>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-foreground/40 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-background" />
        </button>
        {/* Subject badge */}
        {SUBJECT_BADGE[item.subject_id] && (
          <div className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
            SUBJECT_BADGE[item.subject_id].bg
          } ${SUBJECT_BADGE[item.subject_id].color}`}>
            {SUBJECT_BADGE[item.subject_id].label}
          </div>
        )}

        {item.duration && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-medium px-2 py-0.5 rounded-md">
            {item.duration}
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="max-w-lg mx-auto px-5 py-5">
        {/* Instructor row */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {(item.instructor || item.author || "?")[0]}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {item.instructor || item.author}
            </p>
            <p className="text-xs text-muted-foreground">{item.duration}</p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-lg font-bold text-foreground leading-snug">
          {item.title}
        </h1>

        {/* Description accordion */}
        <DescriptionAccordion
          text={
            item.description ??
            "This lecture covers essential topics in Islamic knowledge. Watch to learn more."
          }
        />

        {/* ── Action Row ── */}
        <div className="flex items-center mt-6 pt-4 border-t border-border">
          {/* Left group */}
          <div className="flex items-center gap-5">
            {/* Like */}
            <button
              onClick={() => toggleLike.mutate(item.id)}
              className="flex flex-col items-center gap-1"
            >
              <Heart
                size={24}
                className={
                  item.isLiked
                    ? "fill-destructive text-destructive"
                    : "text-muted-foreground"
                }
                strokeWidth={item.isLiked ? 0 : 1.5}
              />
              <span className="text-[10px] text-muted-foreground">
                {item.likes ?? 0}
              </span>
            </button>

            {/* Save */}
            <button
              onClick={() => toggleSave.mutate(item.id)}
              className="flex flex-col items-center gap-1"
            >
              <Bookmark
                size={24}
                className={
                  item.isSaved
                    ? "fill-primary text-primary"
                    : "text-muted-foreground"
                }
                strokeWidth={item.isSaved ? 0 : 1.5}
              />
              <span className="text-[10px] text-muted-foreground">Save</span>
            </button>

            {/* Playlist */}
            <button
              onClick={() => setShowPlaylist(true)}
              className="flex flex-col items-center gap-1"
            >
              <FolderPlus
                size={24}
                className="text-muted-foreground"
                strokeWidth={1.5}
              />
              <span className="text-[10px] text-muted-foreground">
                Playlist
              </span>
            </button>

            {/* Share */}
            <button className="flex flex-col items-center gap-1">
              <Share2
                size={24}
                className="text-muted-foreground"
                strokeWidth={1.5}
              />
              <span className="text-[10px] text-muted-foreground">Share</span>
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Materials — far right */}
          <button
            onClick={() => setShowMaterials(true)}
            className="flex flex-col items-center gap-1 relative"
          >
            <div className="relative">
              <FileText
                size={24}
                className="text-accent"
                strokeWidth={1.5}
              />
              {/* Small badge showing file count */}
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-accent text-[9px] font-bold text-accent-foreground flex items-center justify-center leading-none">
                {getMaterials(item.id).length}
              </span>
            </div>
            <span className="text-[10px] text-accent font-medium">
              Materials
            </span>
          </button>
        </div>
      </div>

      {/* ── Modals ── */}
      <PlaylistModal
        isOpen={showPlaylist}
        onClose={() => setShowPlaylist(false)}
        itemId={item.id}
      />

      <MaterialsModal
        isOpen={showMaterials}
        onClose={() => setShowMaterials(false)}
        videoId={item.id}
        videoTitle={item.title}
      />
    </div>
  );
}
