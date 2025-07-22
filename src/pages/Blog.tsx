import React, { useEffect, useState } from "react";

const STRAPI_URL = "http://localhost:1337";
const API_ENDPOINT = `${STRAPI_URL}/api/imagini-blogs?populate=*`;

// Types for content blocks
interface TextChild {
  type: "text";
  text: string;
}
interface ImageChild {
  type: "image";
  image: {
    url: string;
    alternativeText?: string;
  };
}
type ParagraphChild = TextChild | ImageChild;
interface ParagraphBlock {
  type: "paragraph";
  children: ParagraphChild[];
}
interface ImageBlock {
  type: "image";
  url: string;
  alt?: string;
}
type ContentBlock = ParagraphBlock | ImageBlock;

interface MediaFlat {
  url: string;
  alternativeText?: string;
}
interface MediaNested {
  data: {
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
}
type MediaType = MediaFlat | MediaNested;

interface MediaEntry {
  media?: {
    url: string;
    alternativeText?: string;
  };
}
type ContentEntry = {
  text?: ContentBlock[];
  media?: MediaType;
} & MediaEntry;

interface CoverImageData {
  attributes?: {
    url?: string;
    formats?: { medium?: { url: string } };
  };
}
interface CoverImage {
  data?: CoverImageData;
}

interface BlogPostRaw {
  id: number;
  title?: string;
  author?: string;
  coverImage?: CoverImage;
  contents?: ContentEntry[];
}

interface BlogPost {
  id: number;
  title: string;
  author: string;
  coverImageUrl: string | null;
  contents: ContentEntry[];
}

function renderContentBlocks(contents?: ContentEntry[]) {
  if (!Array.isArray(contents)) return null;
  return contents.map((entry, entryIdx) => {
    // Case 1: Paragraph/Text blocks
    if (Array.isArray(entry.text)) {
      return entry.text.map((block, idx) => {
        if (
          block.type === "paragraph" &&
          Array.isArray((block as ParagraphBlock).children)
        ) {
          return (
            <p key={`p-${entryIdx}-${idx}`} className="text-zinc-200 leading-relaxed mb-2">
              {(block as ParagraphBlock).children
                .filter((c): c is TextChild => c.type === "text" && typeof c.text === "string")
                .map((c, cIdx) => c.text)}
            </p>
          );
        }
        return null;
      });
    }

    // Case 2: Media block (handle both .media.url and .media.data.attributes.url)
    if (entry.media) {
      // Strapi v4+ nested format
      if (
        typeof entry.media === "object" &&
        "data" in entry.media &&
        entry.media.data &&
        typeof entry.media.data === "object" &&
        "attributes" in entry.media.data &&
        entry.media.data.attributes &&
        typeof entry.media.data.attributes.url === "string"
      ) {
        const imageUrl = entry.media.data.attributes.url.startsWith("http")
          ? entry.media.data.attributes.url
          : STRAPI_URL + entry.media.data.attributes.url;
        return (
          <img
            key={`media-${entryIdx}`}
            src={imageUrl}
            alt={entry.media.data.attributes.alternativeText || ""}
            className="my-4 rounded border border-zinc-700 max-w-full"
          />
        );
      }
      // Flat format
      if (typeof (entry.media as MediaFlat).url === "string") {
        const imageUrl = (entry.media as MediaFlat).url.startsWith("http")
          ? (entry.media as MediaFlat).url
          : STRAPI_URL + (entry.media as MediaFlat).url;
        return (
          <img
            key={`media-${entryIdx}`}
            src={imageUrl}
            alt={(entry.media as MediaFlat).alternativeText || ""}
            className="my-4 rounded border border-zinc-700 max-w-full"
          />
        );
      }
    }

    // Catch-all for unknown content blocks
    console.warn("Unknown content block:", entry);
    return null;
  });
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(API_ENDPOINT);
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const json = await res.json();
        const data: BlogPostRaw[] = Array.isArray(json.data) ? json.data : [];
        if (data[0]?.contents) {
          console.log("Fetched blog contents:", JSON.stringify(data[0].contents, null, 2));
        }
        const posts: BlogPost[] = data.map((item) => {
          // Safely access coverImage
          let coverImageUrl: string | null = null;
          if (
            item.coverImage &&
            item.coverImage.data &&
            item.coverImage.data.attributes
          ) {
            const imgAttrs = item.coverImage.data.attributes;
            coverImageUrl =
              imgAttrs.formats?.medium?.url ||
              imgAttrs.url ||
              null;
            if (coverImageUrl && !coverImageUrl.startsWith("http")) {
              coverImageUrl = STRAPI_URL + coverImageUrl;
            }
          }
          return {
            id: item.id,
            title: item.title || "Untitled",
            author: item.author || "Unknown",
            coverImageUrl,
            contents: Array.isArray(item.contents) ? item.contents : [],
          };
        });
        setPosts(posts);
      } catch (err: unknown) {
        setError(
          err && typeof err === "object" && "message" in err && typeof (err as Record<string, unknown>).message === "string"
            ? (err as Record<string, unknown>).message as string
            : "Unknown error"
        );
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
      <div className="w-full max-w-2xl space-y-10">
        {posts.map((post) => {
          // Get cover image URL (medium preferred)
          const coverImageUrl =
            post.coverImageUrl && post.coverImageUrl.startsWith("http")
              ? post.coverImageUrl
              : post.coverImageUrl
              ? STRAPI_URL + post.coverImageUrl
              : null;
          return (
            <div key={post.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 shadow-md">
              {coverImageUrl && (
                <img
                  src={coverImageUrl}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded-t mb-4 border border-zinc-700"
                />
              )}
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-zinc-400 mb-4">By {post.author}</p>
              <div className="space-y-3">
                {renderContentBlocks(post.contents)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 