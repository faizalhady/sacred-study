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
  lessons: number;
  duration: string;
  progress: number;
}

export const subjects: Subject[] = [
  { id: "s1", title: "Akidah", description: "Foundations of Belief", level: "Level 1", icon: "🕌", moduleCount: 8 },
  { id: "s2", title: "Tafsir", description: "Quranic Exegesis", level: "Level 1", icon: "📖", moduleCount: 12 },
  { id: "s3", title: "Hadis", description: "Prophetic Traditions", level: "Level 2", icon: "📜", moduleCount: 10 },
  { id: "s4", title: "Tajwid", description: "Rules of Recitation", level: "Level 1", icon: "🎙️", moduleCount: 6 },
];

export const modules: Module[] = [
  { id: "m1", subject_id: "s1", title: "Three Fundamental Principles", lessons: 12, duration: "6h 30m", progress: 75 },
  { id: "m2", subject_id: "s1", title: "Kitab at-Tawheed", lessons: 20, duration: "10h 15m", progress: 30 },
  { id: "m3", subject_id: "s1", title: "Nawaqid al-Islam", lessons: 8, duration: "4h 00m", progress: 0 },
  { id: "m4", subject_id: "s2", title: "Introduction to Tafsir", lessons: 10, duration: "5h 00m", progress: 50 },
  { id: "m5", subject_id: "s2", title: "Surah Al-Fatiha Deep Dive", lessons: 6, duration: "3h 20m", progress: 100 },
  { id: "m6", subject_id: "s3", title: "40 Hadith of Imam Nawawi", lessons: 42, duration: "21h 00m", progress: 15 },
  { id: "m7", subject_id: "s3", title: "Mustalah al-Hadith", lessons: 14, duration: "7h 45m", progress: 0 },
  { id: "m8", subject_id: "s4", title: "Makharij al-Huruf", lessons: 10, duration: "5h 00m", progress: 60 },
  { id: "m9", subject_id: "s4", title: "Rules of Noon Sakinah", lessons: 8, duration: "4h 10m", progress: 0 },
];

export const feed: FeedItem[] = [
  {
    id: "v1",
    type: "video",
    subject_id: "s1",
    title: "Introduction to Usool at-Thalatha",
    instructor: "Ustadh Abu Yahya",
    duration: "45:00",
    thumbnail: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=600&auto=format&fit=crop",
    likes: 124,
    isLiked: true,
    isSaved: false,
    description: "A comprehensive introduction to the Three Fundamental Principles by Imam Muhammad ibn Abdul-Wahhab. This lecture covers the importance of knowing your Lord, your religion, and your Prophet ﷺ.",
  },
  {
    id: "b1",
    type: "pdf",
    subject_id: "s2",
    title: "Tafsir Ibn Kathir - Volume 1",
    author: "Ibn Kathir",
    cover: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=300&auto=format&fit=crop",
    likes: 89,
    isLiked: false,
    isSaved: true,
  },
  {
    id: "v2",
    type: "video",
    subject_id: "s3",
    title: "Hadith 1: Actions are by Intentions",
    instructor: "Sheikh Ahmad Musa",
    duration: "32:15",
    thumbnail: "https://images.unsplash.com/photo-1585036156171-384164a8c8d3?q=80&w=600&auto=format&fit=crop",
    likes: 256,
    isLiked: false,
    isSaved: false,
    description: "An explanation of the first hadith from the collection of Imam Nawawi. Understanding the importance of intention (niyyah) in all our actions.",
  },
  {
    id: "a1",
    type: "article",
    subject_id: "s1",
    title: "Understanding Tawheed: A Beginner's Guide",
    author: "Dr. Bilal Philips",
    likes: 67,
    isLiked: true,
    isSaved: true,
    description: "This article explores the concept of Tawheed (Islamic monotheism) in a clear and accessible way for those new to Islamic studies.",
  },
  {
    id: "v3",
    type: "video",
    subject_id: "s4",
    title: "Makharij al-Huruf: Points of Articulation",
    instructor: "Qari Muhammad Saleem",
    duration: "28:40",
    thumbnail: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=600&auto=format&fit=crop",
    likes: 198,
    isLiked: false,
    isSaved: false,
    description: "Learn the correct pronunciation points for each Arabic letter. Essential for proper Quran recitation.",
  },
  {
    id: "v4",
    type: "video",
    subject_id: "s2",
    title: "Tafsir Surah Al-Fatiha - Part 1",
    instructor: "Dr. Yasir Qadhi",
    duration: "55:20",
    thumbnail: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=600&auto=format&fit=crop",
    likes: 342,
    isLiked: true,
    isSaved: true,
    description: "A detailed linguistic and thematic analysis of the opening chapter of the Quran.",
  },
  {
    id: "b2",
    type: "pdf",
    subject_id: "s1",
    title: "Kitab at-Tawheed",
    author: "Muhammad ibn Abdul-Wahhab",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=300&auto=format&fit=crop",
    likes: 145,
    isLiked: false,
    isSaved: false,
  },
];

export const userProfile: UserProfile = {
  name: "Student User",
  email: "student@example.com",
  playlists: [
    { id: "p1", name: "Ramadan Prep", item_count: 4 },
    { id: "p2", name: "Weekend Study", item_count: 7 },
    { id: "p3", name: "Tajwid Practice", item_count: 3 },
  ],
  savedKitabs: [
    feed.find((f) => f.id === "b1")!,
    feed.find((f) => f.id === "b2")!,
  ],
  likedLectures: feed.filter((f) => f.isLiked),
};
