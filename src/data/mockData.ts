export interface Subject {
  id: string;
  title: string;
  description: string;
  level: string;
  icon: string;
  moduleCount: number;
}

export interface FeedItem {
  id: string;
  type: "video" | "pdf" | "article";
  subject_id: string;
  title: string;
  instructor?: string;
  author?: string;
  duration?: string;
  thumbnail?: string;
  cover?: string;
  likes?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  description?: string;
}

export interface Playlist {
  id: string;
  name: string;
  item_count: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar?: string;
  playlists: Playlist[];
  savedKitabs: FeedItem[];
  likedLectures: FeedItem[];
}

export interface Module {
  id: string;
  subject_id: string;
  title: string;
  subtitle: string;       // kitab / modul name
  level: 0 | 1 | 2 | 3;  // 0 = Muqaddimah, 1 = Asas, 2 = Pertengahan, 3 = Lanjutan
  lessons: number;
  duration: string;
  progress: number;
}

// ─── Subject badge map ──────────────────────────────────────────────────────────
// Maps subject_id → display label + colour tokens for badge rendering
export const SUBJECT_BADGE: Record<
  string,
  { label: string; color: string; bg: string }
> = {
  s1: { label: "Akidah",    color: "text-violet-400",  bg: "bg-violet-400/15"  },
  s2: { label: "Tafsir",    color: "text-sky-400",     bg: "bg-sky-400/15"     },
  s3: { label: "Hadis",     color: "text-emerald-400", bg: "bg-emerald-400/15" },
  s4: { label: "Tajwid",    color: "text-teal-400",    bg: "bg-teal-400/15"    },
  s5: { label: "Usul Fiqh", color: "text-amber-400",   bg: "bg-amber-400/15"   },
  s6: { label: "Seerah",    color: "text-rose-400",    bg: "bg-rose-400/15"    },
};

// ─── Level metadata ───────────────────────────────────────────────────────────
export const LEVEL_META: Record<
  0 | 1 | 2 | 3,
  { label: string; sublabel: string; color: string; bg: string }
> = {
  0: { label: "Level 0", sublabel: "Muqaddimah",   color: "text-slate-400",   bg: "bg-slate-400/10"  },
  1: { label: "Level 1", sublabel: "Asas",          color: "text-emerald-400", bg: "bg-emerald-400/10" },
  2: { label: "Level 2", sublabel: "Pertengahan",   color: "text-amber-400",   bg: "bg-amber-400/10"   },
  3: { label: "Level 3", sublabel: "Lanjutan",      color: "text-rose-400",    bg: "bg-rose-400/10"    },
};

// ─── Image helpers ────────────────────────────────────────────────────────────
const thumb = (seed: number, w = 600, h = 340) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

const cover = (seed: number, w = 300, h = 420) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}?grayscale`;

// ─── Subjects ─────────────────────────────────────────────────────────────────
export const subjects: Subject[] = [
  { id: "s1", title: "Akidah",      description: "Ilmu Tauhid & Foundations of Belief",  level: "Level 0–3", icon: "🕌", moduleCount: 4 },
  { id: "s2", title: "Tafsir",      description: "Quranic Exegesis & Al-Quran Sciences", level: "Level 0–3", icon: "📖", moduleCount: 4 },
  { id: "s3", title: "Hadis",       description: "Matan Hadis & Mustalah al-Hadith",      level: "Level 0–3", icon: "📜", moduleCount: 4 },
  { id: "s4", title: "Tajwid",      description: "Quranic Recitation Rules",              level: "Level 0–1", icon: "🎙️", moduleCount: 2 },
  { id: "s5", title: "Usul Fiqh",   description: "Islamic Jurisprudence & Qawaid",        level: "Level 0–3", icon: "⚖️", moduleCount: 4 },
  { id: "s6", title: "Seerah",      description: "Life of the Prophet ﷺ",                level: "Level 0–3", icon: "🌙", moduleCount: 4 },
];

// ─── Modules ──────────────────────────────────────────────────────────────────
// Each subject has Level 0, 1, 2, 3 — one module per level (expandable later)
export const modules: Module[] = [

  // ── s1: Akidah ───────────────────────────────────────────────────────────────
  {
    id: "s1-l0",
    subject_id: "s1",
    level: 0,
    title: "Pengenalan Akidah & Rukun Iman",
    subtitle: "Al-Wajibat al-Mutahattimat — Ibn Abdul Wahhab",
    lessons: 6,
    duration: "3h 00m",
    progress: 100,
  },
  {
    id: "s1-l1",
    subject_id: "s1",
    level: 1,
    title: "Rukun Iman, Tauhid & Nawaqid al-Islam",
    subtitle: "Thalathah al-Usul · Al-Qawa'id al-Arba' · Kitab at-Tauhid",
    lessons: 20,
    duration: "10h 30m",
    progress: 75,
  },
  {
    id: "s1-l2",
    subject_id: "s1",
    level: 2,
    title: "Asma' wa Sifat & Manhaj Ahlus Sunnah",
    subtitle: "Al-Aqidah al-Wasitiyyah · Lum'ah al-I'tiqad",
    lessons: 16,
    duration: "8h 15m",
    progress: 30,
  },
  {
    id: "s1-l3",
    subject_id: "s1",
    level: 3,
    title: "Takdir, Syubhat & Ilmu al-Firaq",
    subtitle: "Al-Aqidah at-Tahawiyyah · At-Tadmuriyyah",
    lessons: 24,
    duration: "13h 00m",
    progress: 0,
  },

  // ── s2: Tafsir ───────────────────────────────────────────────────────────────
  {
    id: "s2-l0",
    subject_id: "s2",
    level: 0,
    title: "Literasi Al-Quran & Adab Tilawah",
    subtitle: "Modul Iqra' · At-Tibyan fi Adab Hamalat al-Quran",
    lessons: 8,
    duration: "4h 00m",
    progress: 100,
  },
  {
    id: "s2-l1",
    subject_id: "s2",
    level: 1,
    title: "Kaedah Asas Tafsir & Surah-Surah Lazim",
    subtitle: "Tafsir as-Sa'di · Usul fi at-Tafsir (Ibn Uthaimin)",
    lessons: 14,
    duration: "7h 20m",
    progress: 60,
  },
  {
    id: "s2-l2",
    subject_id: "s2",
    level: 2,
    title: "Tafsir bil-Ma'thur, Asbab Nuzul & Ulum Al-Quran",
    subtitle: "Mukhtasar Tafsir Ibn Katsir · Mabahith fi 'Ulum al-Quran",
    lessons: 18,
    duration: "9h 30m",
    progress: 20,
  },
  {
    id: "s2-l3",
    subject_id: "s2",
    level: 3,
    title: "Tafsir Analitikal, Bahasa Arab & Hukum",
    subtitle: "Tafsir at-Tabari · Tafsir al-Qurtubi · Al-Itqan",
    lessons: 28,
    duration: "16h 00m",
    progress: 0,
  },

  // ── s3: Hadis ────────────────────────────────────────────────────────────────
  {
    id: "s3-l0",
    subject_id: "s3",
    level: 0,
    title: "Ta'zim as-Sunnah & Adab Mendengar Hadis",
    subtitle: "Riyadh as-Salihin — Bab Niat & Adab",
    lessons: 5,
    duration: "2h 30m",
    progress: 100,
  },
  {
    id: "s3-l1",
    subject_id: "s3",
    level: 1,
    title: "Hafalan Hadis Asas & Mustalah al-Hadith",
    subtitle: "Al-Arba'in an-Nawawiyyah · Al-Manzumah al-Baiquniyyah",
    lessons: 14,
    duration: "7h 00m",
    progress: 50,
  },
  {
    id: "s3-l2",
    subject_id: "s3",
    level: 2,
    title: "Hadis Hukum (Fiqh al-Hadith) & Ulum Hadis",
    subtitle: "'Umdatul Ahkam · Bulugh al-Maram · Nukhbatul Fikr",
    lessons: 22,
    duration: "11h 45m",
    progress: 10,
  },
  {
    id: "s3-l3",
    subject_id: "s3",
    level: 3,
    title: "Kutub as-Sittah, Takhrij & Al-Jarh wa at-Ta'dil",
    subtitle: "Kutub as-Sittah · Muqaddimah Ibn Salah · Tadrib ar-Rawi",
    lessons: 36,
    duration: "22h 00m",
    progress: 0,
  },

  // ── s4: Tajwid (Tafsir/Quran literacy overlap — levels 0 & 1 only) ───────────
  {
    id: "s4-l0",
    subject_id: "s4",
    level: 0,
    title: "Huruf Hijaiyah & Adab Berinteraksi dengan Al-Quran",
    subtitle: "Modul Muqaddam · At-Tibyan (Imam Nawawi)",
    lessons: 8,
    duration: "4h 00m",
    progress: 100,
  },
  {
    id: "s4-l1",
    subject_id: "s4",
    level: 1,
    title: "Makharij, Sifat Huruf & Hukum Nun/Meem Sakinah",
    subtitle: "Tuhfat al-Atfal · Matan al-Jazariyyah",
    lessons: 12,
    duration: "6h 10m",
    progress: 60,
  },

  // ── s5: Usul Fiqh ─────────────────────────────────────────────────────────────
  {
    id: "s5-l0",
    subject_id: "s5",
    level: 0,
    title: "Mabadi' al-'Asharah & Maqasid Syariah Pengenalan",
    subtitle: "Khulasah Ta'zim al-'Ilm — Syeikh Soleh al-'Usaymi",
    lessons: 6,
    duration: "3h 00m",
    progress: 100,
  },
  {
    id: "s5-l1",
    subject_id: "s5",
    level: 1,
    title: "Terminologi Usul & Fiqh Ibadah Harian",
    subtitle: "Al-Waraqat · Al-Usul min 'Ilm al-Usul (Ibn Uthaimin) · Safinatu an-Naja",
    lessons: 16,
    duration: "8h 00m",
    progress: 40,
  },
  {
    id: "s5-l2",
    subject_id: "s5",
    level: 2,
    title: "Fiqh Muamalat, Munakahat & Kaedah Fiqhiyyah",
    subtitle: "Rawdah an-Nazhir · Zad al-Mustaqni' · Manzumah al-Qawa'id",
    lessons: 20,
    duration: "10h 30m",
    progress: 0,
  },
  {
    id: "s5-l3",
    subject_id: "s5",
    level: 3,
    title: "Fiqh Muqaran, Tarjih & Maqasid Syariah",
    subtitle: "Al-Mughni · Al-Majmu' · Bidayah al-Mujtahid · Al-Muwafaqat",
    lessons: 28,
    duration: "16h 00m",
    progress: 0,
  },

  // ── s6: Seerah ───────────────────────────────────────────────────────────────
  {
    id: "s6-l0",
    subject_id: "s6",
    level: 0,
    title: "Biodata & Syamail Nabi ﷺ",
    subtitle: "As-Syamail al-Muhammadiyyah · Khulasah Nur al-Yaqin",
    lessons: 6,
    duration: "3h 00m",
    progress: 100,
  },
  {
    id: "s6-l1",
    subject_id: "s6",
    level: 1,
    title: "Timeline Kehidupan Rasulullah ﷺ",
    subtitle: "Ar-Rahiq al-Makhtum — Safiyurrahman al-Mubarakfuri",
    lessons: 14,
    duration: "7h 30m",
    progress: 85,
  },
  {
    id: "s6-l2",
    subject_id: "s6",
    level: 2,
    title: "Fiqh Sirah — Pengajaran & Hikmah",
    subtitle: "Zad al-Ma'ad — Ibn Qayyim al-Jauziyyah",
    lessons: 18,
    duration: "9h 15m",
    progress: 10,
  },
  {
    id: "s6-l3",
    subject_id: "s6",
    level: 3,
    title: "Sirah Bersanad & Sejarah Khulafa' ar-Rasyidin",
    subtitle: "Sirah Ibn Hisyam · Al-Bidayah wa an-Nihayah (Ibn Katsir)",
    lessons: 30,
    duration: "18h 00m",
    progress: 0,
  },
];

// ─── Feed ─────────────────────────────────────────────────────────────────────
export const feed: FeedItem[] = [
  // ── Videos ──────────────────────────────────────────────────────────────────
  {
    id: "v1",
    type: "video",
    subject_id: "s1",
    title: "Introduction to Usool at-Thalatha",
    instructor: "Ustadh Abu Yahya",
    duration: "45:00",
    thumbnail: thumb(10),
    likes: 124,
    isLiked: true,
    isSaved: false,
    description:
      "A comprehensive introduction to the Three Fundamental Principles by Imam Muhammad ibn Abdul-Wahhab. This lecture covers the importance of knowing your Lord, your religion, and your Prophet ﷺ.",
  },
  {
    id: "v2",
    type: "video",
    subject_id: "s3",
    title: "Hadith 1: Actions are by Intentions",
    instructor: "Sheikh Ahmad Musa",
    duration: "32:15",
    thumbnail: thumb(20),
    likes: 256,
    isLiked: false,
    isSaved: false,
    description:
      "An explanation of the first hadith from the collection of Imam Nawawi. Understanding the importance of intention (niyyah) in all our actions.",
  },
  {
    id: "v3",
    type: "video",
    subject_id: "s4",
    title: "Makharij al-Huruf: Points of Articulation",
    instructor: "Qari Muhammad Saleem",
    duration: "28:40",
    thumbnail: thumb(30),
    likes: 198,
    isLiked: false,
    isSaved: false,
    description:
      "Learn the correct pronunciation points for each Arabic letter. Essential for proper Quran recitation.",
  },
  {
    id: "v4",
    type: "video",
    subject_id: "s2",
    title: "Tafsir Surah Al-Fatiha - Part 1",
    instructor: "Ustadh Abdur-Rahman Hassan",
    duration: "55:20",
    thumbnail: thumb(40),
    likes: 342,
    isLiked: true,
    isSaved: true,
    description:
      "A detailed linguistic and thematic analysis of the opening chapter of the Quran.",
  },
  {
    id: "v5",
    type: "video",
    subject_id: "s6",
    title: "The Prophet ﷺ in Makkah — Early Years",
    instructor: "Ustadh Ismail Kamdar",
    duration: "41:05",
    thumbnail: thumb(50),
    likes: 310,
    isLiked: false,
    isSaved: true,
    description:
      "An engaging retelling of the early Makkan period of the Prophet's life ﷺ, covering his birth, childhood, and the first revelation.",
  },
  {
    id: "v6",
    type: "video",
    subject_id: "s5",
    title: "Principles of Wudu & Ghusl",
    instructor: "Sheikh Assim Al-Hakeem",
    duration: "38:50",
    thumbnail: thumb(60),
    likes: 187,
    isLiked: false,
    isSaved: false,
    description:
      "A practical breakdown of the conditions and obligatory acts of ritual purification according to the Sunnah.",
  },
  {
    id: "v7",
    type: "video",
    subject_id: "s1",
    title: "The Six Pillars of Iman",
    instructor: "Sheikh Khalid Al-Rashid",
    duration: "52:10",
    thumbnail: thumb(70),
    likes: 415,
    isLiked: true,
    isSaved: false,
    description:
      "An in-depth look at the six pillars of faith and their implications on a Muslim's daily life and worship.",
  },
  {
    id: "v8",
    type: "video",
    subject_id: "s3",
    title: "Hadith 2: Islam, Iman & Ihsan",
    instructor: "Sheikh Ahmad Musa",
    duration: "47:30",
    thumbnail: thumb(80),
    likes: 289,
    isLiked: false,
    isSaved: false,
    description:
      "Explanation of the famous Hadith of Jibril, covering the three levels of the religion.",
  },

  // ── Books / PDFs ─────────────────────────────────────────────────────────────
  {
    id: "b1",
    type: "pdf",
    subject_id: "s2",
    title: "Tafsir Ibn Kathir — Volume 1",
    author: "Ibn Kathir",
    cover: cover(101),
    likes: 89,
    isLiked: false,
    isSaved: true,
    description:
      "The first volume of the most widely used classical Tafsir in the Islamic world, covering Surah Al-Fatiha and the beginning of Al-Baqarah.",
  },
  {
    id: "b2",
    type: "pdf",
    subject_id: "s1",
    title: "Kitab at-Tawheed",
    author: "Muhammad ibn Abdul-Wahhab",
    cover: cover(102),
    likes: 145,
    isLiked: false,
    isSaved: false,
    description:
      "The foundational text on Islamic monotheism, drawing proofs from the Quran and Sunnah for the worship of Allah alone.",
  },
  {
    id: "b3",
    type: "pdf",
    subject_id: "s3",
    title: "Forty Hadith — Imam Nawawi",
    author: "Imam Nawawi",
    cover: cover(103),
    likes: 212,
    isLiked: true,
    isSaved: true,
    description:
      "A collection of forty-two hadiths carefully selected by Imam Nawawi covering the essentials of Islamic practice.",
  },
  {
    id: "b4",
    type: "pdf",
    subject_id: "s4",
    title: "Tuhfat al-Atfal — Tajwid Rules",
    author: "Sulayman al-Jamzuri",
    cover: cover(104),
    likes: 76,
    isLiked: false,
    isSaved: false,
    description:
      "A classic poem in Tajwid covering the rulings of Noon Sakinah, Tanwin, and Meem Sakinah.",
  },
  {
    id: "b5",
    type: "pdf",
    subject_id: "s5",
    title: "Bulugh al-Maram",
    author: "Ibn Hajar al-Asqalani",
    cover: cover(105),
    likes: 163,
    isLiked: false,
    isSaved: true,
    description:
      "A comprehensive collection of hadith related to Islamic jurisprudence, widely used as a Fiqh reference.",
  },
  {
    id: "b6",
    type: "pdf",
    subject_id: "s6",
    title: "Sealed Nectar — Ar-Raheeq Al-Makhtum",
    author: "Safi-ur-Rahman al-Mubarakpuri",
    cover: cover(106),
    likes: 298,
    isLiked: true,
    isSaved: false,
    description:
      "The award-winning biography of Prophet Muhammad ﷺ, praised for its accuracy and engaging narrative.",
  },

  // ── Articles ──────────────────────────────────────────────────────────────────
  {
    id: "a1",
    type: "article",
    subject_id: "s1",
    title: "Understanding Tawheed: A Beginner's Guide",
    author: "Dr. Bilal Philips",
    thumbnail: thumb(201),
    likes: 67,
    isLiked: true,
    isSaved: true,
    description:
      "This article explores the concept of Tawheed (Islamic monotheism) in a clear and accessible way for those new to Islamic studies.",
  },
  {
    id: "a2",
    type: "article",
    subject_id: "s3",
    title: "How to Approach the Study of Hadith Sciences",
    author: "Sheikh Hasan Al-Somali",
    thumbnail: thumb(202),
    likes: 54,
    isLiked: false,
    isSaved: false,
    description:
      "A practical roadmap for students who want to study Mustalah al-Hadith and understand how scholars grade narrations.",
  },
  {
    id: "a3",
    type: "article",
    subject_id: "s2",
    title: "The Virtues of Reciting Surah Al-Kahf on Friday",
    author: "Compiled by Islamic Research Team",
    thumbnail: thumb(203),
    likes: 132,
    isLiked: false,
    isSaved: true,
    description:
      "A summary of authentic narrations about the virtues of Surah Al-Kahf and the recommended practice of reciting it every Friday.",
  },
  {
    id: "a4",
    type: "article",
    subject_id: "s6",
    title: "Lessons from the Hijrah for Today's Muslim",
    author: "Ustadh Ismail Kamdar",
    thumbnail: thumb(204),
    likes: 98,
    isLiked: true,
    isSaved: false,
    description:
      "Drawing timeless lessons from the Prophet's ﷺ migration from Makkah to Madinah and its relevance to contemporary Muslims.",
  },
  {
    id: "a5",
    type: "article",
    subject_id: "s5",
    title: "The Importance of Praying on Time",
    author: "Sheikh Ibn Baz (translated)",
    thumbnail: thumb(205),
    likes: 179,
    isLiked: false,
    isSaved: false,
    description:
      "A translated fatwa and article by Sheikh Ibn Baz on the obligation of praying each prayer within its prescribed time.",
  },
];

// ─── User Profile ─────────────────────────────────────────────────────────────
export const userProfile: UserProfile = {
  name: "Student User",
  email: "student@example.com",
  playlists: [
    { id: "p1", name: "Ramadan Prep",    item_count: 4 },
    { id: "p2", name: "Weekend Study",   item_count: 7 },
    { id: "p3", name: "Tajwid Practice", item_count: 3 },
    { id: "p4", name: "Seerah Series",   item_count: 5 },
  ],
  savedKitabs: feed.filter((f) => f.isSaved && f.type === "pdf"),
  likedLectures: feed.filter((f) => f.isLiked),
};
