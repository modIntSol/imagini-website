import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const STRAPI_URL = "http://localhost:1337";
const API_ENDPOINT = `${STRAPI_URL}/api/imagini-blogs?populate=*&sort=publishedAt:desc`;

interface CoverImage {
  formats?: {
    thumbnail?: { url: string };
    medium?: { url: string };
  };
  url?: string;
}

interface BlogListItem {
  id: number;
  title: string;
  slug: string;
  author: string;
  coverImage?: CoverImage;
}

export default function BlogList() {
  const [posts, setPosts] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const json = await res.json();
        const data = Array.isArray(json.data) ? json.data : [];
        const posts: BlogListItem[] = data.map((item: any) => {
          const coverImage = item.coverImage || {};
          return {
            id: item.id,
            title: item.title || "Untitled",
            slug: item.slug,
            author: item.author || "Unknown",
            coverImage,
          };
        });
        setPosts(posts);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Imagini Blog</h1>
      {loading && <p className="text-zinc-400 text-lg">Loading blog posts...</p>}
      {error && <p className="text-red-400 text-lg">{error}</p>}
      {!loading && !error && posts.length === 0 && (
        <p className="text-zinc-400 text-lg">No blog posts published yet.</p>
      )}
      <div className="w-full max-w-2xl space-y-6">
        {posts.map((post) => {
          const coverImageUrl =
            post.coverImage?.formats?.thumbnail?.url
              ? STRAPI_URL + post.coverImage.formats.thumbnail.url
              : post.coverImage?.formats?.medium?.url
              ? STRAPI_URL + post.coverImage.formats.medium.url
              : post.coverImage?.url
              ? STRAPI_URL + post.coverImage.url
              : null;
          return (
            <Link
              to={`/blog/${post.slug}`}
              key={post.id}
              className="block bg-zinc-900 border border-zinc-800 rounded-lg p-4 hover:border-red-600 transition-colors"
            >
              <div className="flex items-center gap-4">
                {coverImageUrl && (
                  <img
                    src={coverImageUrl}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded border border-zinc-700"
                  />
                )}
                <div>
                  <h2 className="text-xl font-semibold mb-1">{post.title}</h2>
                  <p className="text-zinc-400 text-sm">By {post.author}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 