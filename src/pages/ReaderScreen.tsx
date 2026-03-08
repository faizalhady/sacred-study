import { useParams, useNavigate } from "react-router-dom";
import { useFeedItem, useToggleLike, useToggleSave } from "@/hooks/useAppData";
import { SUBJECT_BADGE } from "@/data/mockData";
import {
  ArrowLeft,
  Heart,
  Bookmark,
  Share2,
  BookOpen,
  ChevronRight,
  FileText,
  Type,
  Minus,
  Plus,
  ChevronDown,
  BookMarked,
  AlignLeft,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Mock chapters ─────────────────────────────────────────────────────────────
const CHAPTERS = [
  { title: "Muqaddimah (Introduction)",      pages: "1–12"   },
  { title: "Chapter 1: Tawhid al-Rububiyyah", pages: "13–42"  },
  { title: "Chapter 2: Tawhid al-Uluhiyyah",  pages: "43–89"  },
  { title: "Chapter 3: Tawhid al-Asma' wa Sifat", pages: "90–134" },
  { title: "Chapter 4: Shirk and Its Types",  pages: "135–180"},
  { title: "Chapter 5: Nawaqid al-Islam",     pages: "181–220"},
  { title: "Conclusion & Appendix",           pages: "221–320"},
];

const TOTAL_PAGES = 320;

// ─── Description accordion ────────────────────────────────────────────────────
const LOREM =
  " This text has been studied by scholars across generations and remains one of the most referenced works in the field. Its clarity, conciseness, and reliance on Quranic evidence and authentic Sunnah make it indispensable for any serious student of Islamic knowledge. Scholars have written numerous commentaries (shuruh) on it, each expanding on the rich content packed into its brief chapters. Reading it with a qualified teacher is strongly recommended.";

function DescriptionAccordion({ text }: { text: string }) {
  const [expanded, setExpanded] = useState(false);
  const fullText = (text || "") + LOREM;
  const preview = fullText.slice(0, 140);

  return (
    <div className="mt-2">
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
            <span className="text-muted-foreground/40">…</span>
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
          <ChevronDown size={13} />
        </motion.span>
      </button>
    </div>
  );
}

// ─── PDF Reader view ───────────────────────────────────────────────────────────
function PdfReaderView({
  item,
  onClose,
}: {
  item: { title: string; cover?: string; author?: string };
  onClose: () => void;
}) {
  const [page, setPage] = useState(1);
  const [direction, setDirection] = useState(1);

  const goNext = () => {
    if (page < TOTAL_PAGES) {
      setDirection(1);
      setPage((p) => p + 1);
    }
  };
  const goPrev = () => {
    if (page > 1) {
      setDirection(-1);
      setPage((p) => p - 1);
    }
  };

  // Mock Arabic page content that changes per page
  const pageContent = [
    {
      arabic:
        "بسم الله الرحمن الرحيم\n\nالحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين، نبينا محمد وعلى آله وصحبه أجمعين.",
      note: "Opening — Bismillah",
    },
    {
      arabic:
        "أما بعد: فهذا مختصر في العقيدة الإسلامية، استخرجته من كتاب الله العزيز، ومن سنة رسوله الكريم صلى الله عليه وسلم.",
      note: "Author's Introduction",
    },
    {
      arabic:
        "اعلم أن الله واجب الوجود، وأنه لا إله إلا الله، وأن محمداً رسول الله. وهذا هو أصل الدين وأساسه الذي لا يصح الإسلام إلا به.",
      note: "Chapter 1",
    },
    {
      arabic:
        "ومن أصول أهل السنة والجماعة: الإيمان بالقدر خيره وشره، وأن ما شاء الله كان وما لم يشأ لم يكن، وأنه لا حول ولا قوة إلا بالله.",
      note: "Chapter 2",
    },
  ];

  const content = pageContent[(page - 1) % pageContent.length];
  const progress = (page / TOTAL_PAGES) * 100;

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-0 bg-[#1a1a2e] z-50 flex flex-col max-w-lg lg:max-w-5xl mx-auto"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#16213e]">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <div className="text-center">
          <p className="text-xs font-semibold text-white/90 truncate max-w-[180px]">
            {item.title}
          </p>
          <p className="text-[10px] text-white/50">
            Page {page} of {TOTAL_PAGES}
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <BookMarked size={15} className="text-white/70" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-white/10">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Page note label */}
      <div className="px-5 pt-4 pb-1">
        <span className="text-[10px] text-primary/70 font-semibold uppercase tracking-widest">
          {content.note}
        </span>
      </div>

      {/* Page content */}
      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.2 }}
            className="min-h-full flex flex-col"
          >
            {/* Arabic text */}
            <div
              className="font-arabic text-right leading-[2.2] text-lg text-white/90 mt-2"
              dir="rtl"
            >
              {content.arabic.split("\n\n").map((para, i) => (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="my-4 border-t border-white/10" />

            {/* Translation placeholder */}
            <div className="text-sm text-white/50 leading-relaxed">
              <p className="text-[10px] uppercase tracking-wider text-white/30 mb-2 font-semibold">
                Translation (English)
              </p>
              <p>
                In the name of Allah, the Most Gracious, the Most Merciful. All
                praise is due to Allah, Lord of the worlds. Peace and blessings
                be upon the most noble of the prophets and messengers, our
                Prophet Muhammad, and upon his family and all his companions.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation footer */}
      <div className="px-5 py-4 border-t border-white/10 bg-[#16213e]">
        <div className="flex items-center gap-3">
          <button
            onClick={goPrev}
            disabled={page === 1}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-sm font-medium text-white/80 disabled:opacity-30 active:bg-white/20 transition-colors"
          >
            <ArrowLeft size={15} />
            Prev
          </button>

          {/* Page jump indicator */}
          <div className="flex-shrink-0 px-3 py-2 rounded-xl bg-primary/20 text-center min-w-[60px]">
            <p className="text-xs font-bold text-primary">{page}</p>
            <p className="text-[9px] text-primary/60">of {TOTAL_PAGES}</p>
          </div>

          <button
            onClick={goNext}
            disabled={page === TOTAL_PAGES}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-sm font-medium text-white/80 disabled:opacity-30 active:bg-white/20 transition-colors"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Article reader view ───────────────────────────────────────────────────────
function ArticleReaderView({
  item,
  onClose,
}: {
  item: { title: string; author?: string; description?: string };
  onClose: () => void;
}) {
  const [fontSize, setFontSize] = useState(16);

  const fullText = [
    item.description ||
      "This article explores fundamental concepts in Islamic theology and jurisprudence.",
    "The study of Islamic sciences has been systematically organized since the early centuries of Islam. Scholars developed comprehensive curricula covering the essential disciplines every student of knowledge should master.",
    "Among the most important subjects is the study of Tawheed (monotheism), which forms the foundation upon which all other knowledge is built. Without a correct understanding of Tawheed, one's worship and practice cannot be properly established.",
    "The Prophet ﷺ said: \"Whoever Allah wants good for, He gives them understanding of the religion.\" This hadith emphasizes the importance of seeking knowledge and understanding the fundamentals of our faith.",
    "Classical scholars devoted their lives to preserving and transmitting this knowledge across generations. Their effort and sacrifice is reflected in the vast corpus of Islamic literature that remains accessible to us today.",
    "As students of knowledge, our responsibility is to approach these texts with sincerity, humility, and the proper etiquette that our teachers and their teachers have modeled for us throughout history.",
  ];

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 28, stiffness: 280 }}
      className="fixed inset-0 bg-background z-50 flex flex-col max-w-lg lg:max-w-5xl mx-auto"
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-background/90 backdrop-blur border-b border-border">
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"
        >
          <ArrowLeft size={16} className="text-foreground" />
        </button>
        <p className="text-sm font-semibold text-foreground truncate mx-3 flex-1 text-center">
          {item.title}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFontSize((s) => Math.max(12, s - 2))}
            className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground"
          >
            <Minus size={12} />
          </button>
          <Type size={13} className="text-muted-foreground mx-0.5" />
          <button
            onClick={() => setFontSize((s) => Math.min(24, s + 2))}
            className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground"
          >
            <Plus size={12} />
          </button>
        </div>
      </div>

      <article
        className="flex-1 overflow-y-auto px-5 py-6"
        style={{ fontSize: `${fontSize}px` }}
      >
        <h1 className="text-xl font-bold text-foreground mb-1 leading-snug">
          {item.title}
        </h1>
        <p className="text-sm text-muted-foreground mb-6">by {item.author}</p>
        <div className="text-foreground leading-relaxed space-y-4">
          {fullText.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>
    </motion.div>
  );
}

// ─── Main ReaderScreen ─────────────────────────────────────────────────────────
export default function ReaderScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item } = useFeedItem(id ?? "");
  const toggleLike = useToggleLike();
  const toggleSave = useToggleSave();
  const [readerOpen, setReaderOpen] = useState(false);

  if (!item) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Content not found</p>
      </div>
    );
  }

  const isPdf = item.type === "pdf";

  return (
    <div className="min-h-screen bg-background">

      {/* ── Compact hero — same style as VideoPlayer ── */}
      <div className="relative w-full aspect-video bg-foreground/95 overflow-hidden">
        <img
          src={item.cover || item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient overlay so content below blends */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-9 h-9 rounded-full bg-foreground/40 backdrop-blur flex items-center justify-center"
        >
          <ArrowLeft size={18} className="text-white" />
        </button>

        {/* Badges: type + subject */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
          <span className="text-[10px] font-bold bg-primary/90 text-primary-foreground px-2.5 py-1 rounded-full uppercase tracking-wide backdrop-blur-sm">
            {isPdf ? "Kitab" : "Article"}
          </span>
          {SUBJECT_BADGE[item.subject_id] && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${
              SUBJECT_BADGE[item.subject_id].bg
            } ${SUBJECT_BADGE[item.subject_id].color}`}>
              {SUBJECT_BADGE[item.subject_id].label}
            </span>
          )}
        </div>

        {/* Bottom overlay: title + author on the hero itself */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
          <h1 className="text-lg font-bold text-white leading-snug drop-shadow">
            {item.title}
          </h1>
          <p className="text-sm text-white/70 mt-0.5">
            by {item.author}
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-lg mx-auto px-5">

        {/* Action row */}
        <div className="flex items-center gap-5 py-4 border-b border-border">
          <button
            onClick={() => toggleLike.mutate(item.id)}
            className="flex flex-col items-center gap-1"
          >
            <Heart
              size={22}
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
              size={22}
              className={item.isSaved ? "fill-primary text-primary" : "text-muted-foreground"}
              strokeWidth={item.isSaved ? 0 : 1.5}
            />
            <span className="text-[10px] text-muted-foreground">Save</span>
          </button>

          <button className="flex flex-col items-center gap-1">
            <Share2 size={22} className="text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[10px] text-muted-foreground">Share</span>
          </button>

          <div className="flex-1" />

          {/* Primary CTA */}
          <button
            onClick={() => setReaderOpen(true)}
            className="flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-xl active:scale-95 transition-transform"
          >
            {isPdf ? (
              <>
                <BookOpen size={15} />
                Read Kitab
              </>
            ) : (
              <>
                <AlignLeft size={15} />
                Read Article
              </>
            )}
          </button>
        </div>

        {/* Description */}
        <div className="py-4 border-b border-border">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            About
          </p>
          <DescriptionAccordion text={item.description ?? ""} />
        </div>

        {/* PDF-only: Chapter list */}
        {isPdf && (
          <div className="py-4 border-b border-border">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Table of Contents
            </p>
            <div className="space-y-1">
              {CHAPTERS.map((ch, i) => (
                <button
                  key={i}
                  onClick={() => setReaderOpen(true)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <FileText size={13} className="text-primary" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {ch.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      Pages {ch.pages}
                    </p>
                  </div>
                  <ChevronRight
                    size={14}
                    className="text-muted-foreground flex-shrink-0 group-hover:text-foreground transition-colors"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Details card */}
        <div className="py-4 pb-24">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Details
          </p>
          <div className="bg-card border border-border rounded-2xl divide-y divide-border overflow-hidden">
            {[
              { label: "Type",   value: isPdf ? "PDF Kitab" : "Article" },
              { label: "Author", value: item.author ?? "—" },
              { label: "Pages",  value: isPdf ? `${TOTAL_PAGES} pages` : "—" },
              { label: "Language", value: "Arabic / English" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-muted-foreground">{row.label}</span>
                <span className="text-xs font-semibold text-foreground">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Reader overlay ── */}
      <AnimatePresence>
        {readerOpen && (
          isPdf ? (
            <PdfReaderView
              item={item}
              onClose={() => setReaderOpen(false)}
            />
          ) : (
            <ArticleReaderView
              item={item}
              onClose={() => setReaderOpen(false)}
            />
          )
        )}
      </AnimatePresence>
    </div>
  );
}
