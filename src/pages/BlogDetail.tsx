import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const STRAPI_URL = "http://localhost:1337";

function renderContentBlocks(contents?: any[]) {
  if (!Array.isArray(contents)) return null;
  return contents.map((entry, entryIdx) => {
    if (Array.isArray(entry.text)) {
      return entry.text.map((block: any, idx: number) => {
        if (block.type === "paragraph" && Array.isArray(block.children)) {
          return (
            <p key={`p-${entryIdx}-${idx}`} className="text-zinc-200 leading-relaxed mb-2">
              {block.children
                .filter((c: any) => c.type === "text" && typeof c.text === "string")
                .map((c: any, cIdx: number) => c.text)}
            </p>
          );
        }
        return null;
      });
    }
    // Media block support can be added here if needed
    return null;
  });
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${STRAPI_URL}/api/imagini-blogs?filters[slug][$eq]=${slug}&populate=*`
        );
        if (!res.ok) throw new Error("Failed to fetch blog post");
        const json = await res.json();
        setPost(json.data[0] || null);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-400">Loading...</div>;
  }
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
  }
  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-zinc-400">Blog post not found.</div>;
  }

  const coverImageUrl =
    post.coverImage?.formats?.medium?.url
      ? STRAPI_URL + post.coverImage.formats.medium.url
      : post.coverImage?.url
      ? STRAPI_URL + post.coverImage.url
      : null;

  return (
    <div className="min-h-screen bg-background text-white flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-md">
        <Link to="/blog" className="text-red-400 hover:underline mb-4 inline-block">&larr; Back to Blog List</Link>
        {coverImageUrl && (
          <img
            src={coverImageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-t mb-4 border border-zinc-700"
          />
        )}
        <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
        <p className="text-zinc-400 mb-4">By {post.author}</p>
        <div className="space-y-3">
          {renderContentBlocks(post.contents)}
        </div>
      </div>
    </div>
  );
} 