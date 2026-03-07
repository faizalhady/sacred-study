import { useParams, useNavigate } from "react-router-dom";
import { useFeedItem } from "@/hooks/useAppData";
import { ArrowLeft, Type, Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function ReaderScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: item } = useFeedItem(id ?? "");
  const [fontSize, setFontSize] = useState(16);

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
      {/* Header */}
      <div className="sticky top-0 z-40 bg-background/90 backdrop-blur-lg border-b border-border">
        <div className="px-4 py-3 max-w-lg mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="text-foreground p-1">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-sm font-semibold text-foreground truncate mx-4 flex-1 text-center">
            {item.title}
          </h1>
          {!isPdf && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFontSize((s) => Math.max(12, s - 2))}
                className="p-1 text-muted-foreground"
              >
                <Minus size={16} />
              </button>
              <Type size={14} className="text-muted-foreground" />
              <button
                onClick={() => setFontSize((s) => Math.min(24, s + 2))}
                className="p-1 text-muted-foreground"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto">
        {isPdf ? (
          /* PDF viewer mockup */
          <div className="flex flex-col items-center py-6 px-4">
            {item.cover && (
              <img
                src={item.cover}
                alt={item.title}
                className="w-48 rounded-lg shadow-lg mb-6"
              />
            )}
            <div className="bg-card border border-border rounded-2xl p-6 w-full">
              <h2 className="text-lg font-bold text-card-foreground font-arabic text-center mb-4">
                {item.title}
              </h2>
              <p className="text-sm text-muted-foreground text-center mb-6">
                by {item.author}
              </p>
              <div className="space-y-4 text-sm text-card-foreground leading-relaxed font-arabic text-right" dir="rtl">
                <p>بسم الله الرحمن الرحيم</p>
                <p>الحمد لله رب العالمين، والصلاة والسلام على أشرف الأنبياء والمرسلين، نبينا محمد وعلى آله وصحبه أجمعين.</p>
                <p>أما بعد: فهذا مختصر في العقيدة الإسلامية، استخرجته من كتاب الله العزيز، ومن سنة رسوله الكريم صلى الله عليه وسلم.</p>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">
                Page 1 of 320 · Pinch to zoom
              </p>
            </div>
          </div>
        ) : (
          /* Article reader */
          <article className="px-5 py-6" style={{ fontSize: `${fontSize}px` }}>
            <h1 className="text-xl font-bold text-foreground mb-2">{item.title}</h1>
            <p className="text-sm text-muted-foreground mb-6">by {item.author}</p>
            <div className="text-foreground leading-relaxed space-y-4">
              <p>
                {item.description || "This article explores fundamental concepts in Islamic theology and jurisprudence, drawing from classical sources and contemporary scholarship."}
              </p>
              <p>
                The study of Islamic sciences has been systematically organized since the early centuries of Islam. Scholars developed comprehensive curricula that covered the essential disciplines every student of knowledge should master.
              </p>
              <p>
                Among the most important subjects is the study of Tawheed (monotheism), which forms the foundation upon which all other knowledge is built. Without a correct understanding of Tawheed, one's worship and practice cannot be properly established.
              </p>
              <p>
                The Prophet ﷺ said: "Whoever Allah wants good for, He gives them understanding of the religion." This hadith emphasizes the importance of seeking knowledge and understanding the fundamentals of our faith.
              </p>
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
