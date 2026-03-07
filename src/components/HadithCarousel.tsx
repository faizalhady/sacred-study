import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Languages,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { IlmuAppLogo } from "@/components/IlmuAppLogo";

// ─── Fixed height for ALL slides ───────────────────────────────────────────────
const SLIDE_H = "h-[160px]";

// ─── Slide definitions ─────────────────────────────────────────────────────────
interface CarouselSlide {
  id: number;
  type: "hero" | "matan" | "tarjamah" | "syarah";
  label: string;
  icon: React.ElementType;
  accentColor: string;
  accentBg: string;
}

const SLIDES: CarouselSlide[] = [
  { id: 0, type: "hero",     label: "IlmuPath",     icon: Sparkles,  accentColor: "text-teal-300",    accentBg: "bg-teal-400/15"    },
  { id: 1, type: "matan",    label: "Matan Hadis",  icon: BookOpen,  accentColor: "text-emerald-300", accentBg: "bg-emerald-400/15" },
  { id: 2, type: "tarjamah", label: "Terjemahan",   icon: Languages, accentColor: "text-sky-300",     accentBg: "bg-sky-400/15"     },
  { id: 3, type: "syarah",   label: "Syarah Ulama", icon: Lightbulb, accentColor: "text-amber-300",   accentBg: "bg-amber-400/15"   },
];

function accentClass(type: CarouselSlide["type"]) {
  if (type === "hero")     return "bg-teal-400";
  if (type === "matan")    return "bg-emerald-400";
  if (type === "tarjamah") return "bg-sky-400";
  return "bg-amber-400";
}

// ─── Slide 0 — Hero ───────────────────────────────────────────────────────────
function HeroSlide() {
  const navigate = useNavigate();
  return (
    // px-10 gives clearance from the floating prev/next arrow buttons
    <div className="h-full flex flex-col items-center justify-center gap-2.5 px-10 text-center">

      {/* Logo + brand row */}
      <div className="flex items-center gap-2">
        <IlmuAppLogo size="sm" white />
        <span className="text-[8px] font-semibold text-teal-300/50 bg-teal-400/10 border border-teal-400/15 px-1.5 py-0.5 rounded-full">
          بسم الله
        </span>
      </div>

      {/* Arabic tagline */}
      <p className="text-white/30 text-[9px] font-arabic -mt-1">طريق العلم للأمة</p>

      {/* Divider */}
      <div className="flex items-center gap-2 w-32">
        <div className="h-px flex-1 bg-teal-400/20" />
        <div className="w-1 h-1 rounded-full bg-teal-400/40" />
        <div className="h-px flex-1 bg-teal-400/20" />
      </div>

      {/* Tagline */}
      <div className="space-y-0.5">
        <p className="text-[12px] font-bold text-white/90 leading-snug">
          Knowledge for the Ummah
        </p>
        <p className="text-[9px] text-white/35 leading-relaxed">
          One hadith · one ayah · one lesson at a time
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate("/learn")}
        className="flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/30 active:scale-95 transition-all text-teal-300 text-[10px] font-semibold px-3.5 py-1.5 rounded-full mt-0.5"
      >
        <BookOpen size={10} />
        Explore Syllabus
      </button>

    </div>
  );
}

// ─── Slide 1 — Matan ──────────────────────────────────────────────────────────
function MatanSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-3 px-5">
      {/* Narrator */}
      <p className="text-white/50 text-[10px] leading-relaxed font-arabic text-right" dir="rtl">
        عَنْ عُمَرَ بْنِ الْخَطَّابِ رَضِيَ اللَّهُ عَنْهُ قَالَ: سَمِعْتُ رَسُولَ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ يَقُولُ:
      </p>

      {/* Matan */}
      <div className="bg-white/10 rounded-2xl px-4 py-3.5 border border-white/10">
        <p className="text-white font-arabic text-right leading-[1.9] text-sm font-medium" dir="rtl">
          «إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى»
        </p>
      </div>

      {/* Reference */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-white/35 text-[10px] shrink-0">Sahih al-Bukhari · No. 1</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}

// ─── Slide 2 — Terjemahan ─────────────────────────────────────────────────────
function TarjamahSlide() {
  return (
    <div className="flex flex-col justify-center h-full gap-3 px-5">
      {/* Narrator */}
      <p className="text-white/50 text-[10px] leading-relaxed">
        Daripada Umar bin al-Khattab <span className="font-arabic">رضي الله عنه</span>,
        beliau berkata: Aku mendengar Rasulullah ﷺ bersabda:
      </p>

      {/* Translation */}
      <div className="bg-white/10 rounded-2xl px-4 py-3.5 border border-white/10">
        <p className="text-white text-[13px] leading-relaxed font-semibold">
          "Sesungguhnya setiap amalan itu bergantung pada niatnya, dan
          sesungguhnya bagi setiap orang itu apa yang dia niatkan."
        </p>
      </div>

      {/* Reference */}
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-white/10" />
        <p className="text-white/35 text-[10px] shrink-0">Hadis 1 · Al-Arba'in an-Nawawiyyah</p>
        <div className="h-px flex-1 bg-white/10" />
      </div>
    </div>
  );
}

// ─── Slide 3 — Syarah ─────────────────────────────────────────────────────────
function SyarahSlide() {
  return (
    <div className="flex flex-col h-full gap-2 px-5 overflow-y-auto hide-scrollbar">
      {/* Quran dalil */}
      <div>
        <p className="text-[9px] font-bold text-amber-300/70 uppercase tracking-wider mb-1">
          Dalil Al-Quran
        </p>
        <div className="bg-white/8 rounded-xl px-3 py-2.5 border border-white/10">
          <p className="text-white/85 font-arabic text-right text-[12px] leading-[1.8]" dir="rtl">
            وَمَآ أُمِرُوٓا۟ إِلَّا لِيَعۡبُدُوا۟ ٱللَّهَ مُخۡلِصِينَ لَهُ ٱلدِّينَ
          </p>
          <p className="text-white/40 text-[10px] mt-1 leading-snug">
            "…melainkan supaya menyembah Allah dengan mengikhlaskan ibadat kepada-Nya." — Al-Bayyinah: 5
          </p>
        </div>
      </div>

      {/* Salaf */}
      <div>
        <p className="text-[9px] font-bold text-amber-300/70 uppercase tracking-wider mb-1">
          Ulama Salaf
        </p>
        <div className="bg-white/8 rounded-xl px-3 py-2.5 border border-white/10">
          <p className="text-white/75 font-arabic text-right text-[11px] leading-[1.8]" dir="rtl">
            هَذَا الْحَدِيثُ ثُلُثُ الْعِلْمِ
          </p>
          <p className="text-white/40 text-[10px] mt-1 leading-snug">
            "Hadis ini adalah satu pertiga ilmu." — Imam asy-Syafi'i
            <span className="italic text-white/25 ml-1">(Fath al-Bari, 1/11)</span>
          </p>
        </div>
      </div>

      {/* Kontemporari */}
      <div>
        <p className="text-[9px] font-bold text-amber-300/70 uppercase tracking-wider mb-1">
          Ulama Kontemporari
        </p>
        <div className="bg-white/8 rounded-xl px-3 py-2.5 border border-white/10">
          <p className="text-white/65 text-[11px] leading-relaxed italic">
            "Niat membezakan antara ibadah dengan adat kebiasaan harian."
          </p>
          <p className="text-white/30 text-[10px] mt-1">— Ibn Uthaimin, Syarh al-Arba'in, Hal. 10</p>
        </div>
      </div>
    </div>
  );
}

const SLIDE_CONTENT = [HeroSlide, MatanSlide, TarjamahSlide, SyarahSlide];

// ─── Main carousel ─────────────────────────────────────────────────────────────
export function HadithCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = SLIDES.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(((next % total) + total) % total);
    },
    [total]
  );

  const goNext = useCallback(() => go(current + 1, 1), [current, go]);
  const goPrev = useCallback(() => go(current - 1, -1), [current, go]);

  const delay = current === 0 ? 3000 : 9000;

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(goNext, delay);
    return () => clearTimeout(t);
  }, [current, paused, goNext, delay]);

  const slide = SLIDES[current];
  const SlideIcon = slide.icon;
  const Content = SLIDE_CONTENT[current];
  const isHero = slide.type === "hero";

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="w-full overflow-hidden relative"
      style={{
        background:
          "linear-gradient(135deg, hsl(222 47% 11%) 0%, hsl(220 40% 16%) 60%, hsl(168 55% 12%) 100%)",
      }}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background orbs — hero only */}
      <AnimatePresence>
        {isHero && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-teal-500/8 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-400/6 blur-3xl" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top bar (hidden on hero — arrows float instead) */}
      <div className={`flex items-center justify-between px-5 pt-4 pb-2 ${isHero ? "invisible" : ""}`}>
        <div className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-md ${slide.accentBg} flex items-center justify-center flex-shrink-0`}>
            <SlideIcon size={11} className={slide.accentColor} />
          </div>
          <div>
            <p className="text-[8px] font-bold text-white/35 uppercase tracking-widest leading-none">
              Hadis Hari Ini
            </p>
            <p className={`text-[11px] font-bold leading-tight ${slide.accentColor}`}>
              {slide.label}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={goPrev} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-all">
            <ChevronLeft size={13} className="text-white/70" />
          </button>
          <button onClick={goNext} className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-all">
            <ChevronRight size={13} className="text-white/70" />
          </button>
        </div>
      </div>

      {/* Hero floating arrows */}
      {isHero && (
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-2 z-10 pointer-events-none">
          <button onClick={goPrev} className="pointer-events-auto w-7 h-7 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-all">
            <ChevronLeft size={14} className="text-white/50" />
          </button>
          <button onClick={goNext} className="pointer-events-auto w-7 h-7 rounded-full bg-white/10 flex items-center justify-center active:scale-90 transition-all">
            <ChevronRight size={14} className="text-white/50" />
          </button>
        </div>
      )}

      {/* ── Fixed-height slide area ── */}
      <div className={`relative overflow-hidden ${SLIDE_H}`}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -50 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Content />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer: progress + dots */}
      <div className="flex flex-col items-center gap-2 px-5 py-3">
        <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden">
          {!paused && (
            <motion.div
              key={current}
              className={`h-full rounded-full ${accentClass(slide.type)}`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: delay / 1000, ease: "linear" }}
            />
          )}
        </div>
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i, i > current ? 1 : -1)}
              aria-label={s.label}
            >
              <motion.div
                animate={{ width: i === current ? 20 : 6, opacity: i === current ? 1 : 0.3 }}
                transition={{ duration: 0.25 }}
                className={`h-1.5 rounded-full ${i === current ? accentClass(slide.type) : "bg-white"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
