import { ChevronRight } from "lucide-react";
import { NewsItem } from "../../../types";

type NewsCardProps = {
  item: NewsItem;
};

export function NewsCard({ item }: NewsCardProps) {
  return (
    <article className="news-card" key={`${item.title}-${item.date}`}>
      <img src={item.image} alt="" />
      <div className="news-card-body">
        <div className="news-meta">
          <span>{item.category}</span>
          <time>{item.date}</time>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <button className="text-button" type="button">
          Lire <ChevronRight size={16} />
        </button>
      </div>
    </article>
  );
}
