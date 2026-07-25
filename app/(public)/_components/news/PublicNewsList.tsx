/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPost } from "@/lib/types";
import { NewsCard } from "./NewsCard";

export async function PublicNewsList() {

  const result = {
    success: true,
    data: [
      {
        id: "1",
        title: "Public News 1",
        content: "This is the content of public news 1.",
        thumbnail: "https://i.postimg.cc/Jh39vKgR/any-vs-unknown.png",
        isFeatured: true,
        status: "PUBLISHED",
        tags: ["tag1", "tag2"],
        views: 100,
        isPremium: false,
        authorId: "1",
        createdAt: '2026-07-25',
        updatedAt: '2026-07-25',
      },
      {
        id: "2",
        title: "Public News 1",
        content: "This is the content of public news 1.",
        thumbnail: "https://i.postimg.cc/Jh39vKgR/any-vs-unknown.png",
        isFeatured: true,
        status: "PUBLISHED",
        tags: ["tag1", "tag2"],
        views: 100,
        isPremium: false,
        authorId: "1",
        createdAt: '2026-07-25',
        updatedAt: '2026-07-25',
      }
    ]
  };

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No news found.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((post : IPost | any) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}