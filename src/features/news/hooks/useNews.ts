import { SyntheticEvent, useState } from "react";
import { initialNews } from "../../../data/intialNews";
import { NewsItem } from "../../../types";

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>(initialNews);

  function handleAddNews(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get("title") || "").trim();
    const description = String(form.get("description") || "").trim();
    const imageUrl = String(form.get("imageUrl") || "").trim();
    const imageFile = form.get("imageFile");

    if (!title || !description) {
      return;
    }

    const uploadedImage =
      imageFile instanceof File && imageFile.size > 0
        ? URL.createObjectURL(imageFile)
        : "";

    setNews((currentNews) => [
      {
        title,
        description,
        category: String(form.get("category") || "Club"),
        date: "Aujourd'hui",
        image: uploadedImage || imageUrl || "/placeholder-news.svg",
      },
      ...currentNews,
    ]);
    event.currentTarget.reset();
  }

  return {
    news,
    handleAddNews,
  };
}
