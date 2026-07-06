import { Newspaper } from "lucide-react";
import { NewsItem } from "../../types";
import { NewsCard } from "./components/NewsCard";

type NewsSectionprops = {
  news: NewsItem[];
};

export function NewsSection({ news }: NewsSectionprops) {
  return (
    <section id="actualites" className="content-section">
      <div className="section-heading">
        <span className="section-icon">
          <Newspaper size={20} />
        </span>
        <div>
          <p className="eyebrow">Vie du club</p>
          <h2>Actualites</h2>
        </div>
      </div>

      <div className="news-grid">
        {news.map((item) => (
          <NewsCard key={`${item.title}-${item.date}`} item={item} />
        ))}
      </div>
    </section>
  );
}
