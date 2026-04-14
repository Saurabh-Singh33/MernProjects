import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllPosts } from "@/lib/posts";

// Generate static params for all blog posts
export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author.name],
      tags: [post.category],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <article className="post-page" id={`post-${slug}`}>
      {/* Post Header */}
      <header className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-subtitle">{post.excerpt}</p>

        <div className="post-author-bar">
          <div className="post-author-info">
            <div className="post-author-avatar">{post.author.avatar}</div>
            <div className="post-author-details">
              <div className="post-author-name-row">
                <span className="post-author-name">{post.author.name}</span>
                <span className="meta-separator">·</span>
                <button className="follow-btn">Follow</button>
              </div>
              <span className="post-publish-info">
                {post.readTime} · {post.date}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="post-actions-bar">
          <div className="post-actions-left">
            <button className="post-action" aria-label="Clap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {post.claps.toLocaleString()}
            </button>
            <button className="post-action" aria-label="Comments">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              24
            </button>
          </div>
          <div className="post-actions-right">
            <button className="post-action" aria-label="Save">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="post-action" aria-label="Share">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Post Content */}
      <div
        className="post-content"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Tags */}
      <div className="post-tags">
        <span className="post-tag">{post.category}</span>
        <span className="post-tag">Web Development</span>
        <span className="post-tag">Programming</span>
      </div>

      {/* Engagement */}
      <div className="post-engagement">
        <button className="clap-btn" aria-label="Clap for this post">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {post.claps.toLocaleString()} claps
        </button>
        <div className="post-actions-right">
          <button className="post-action" aria-label="Save">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="post-action" aria-label="Share">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </div>
      </div>

      {/* Author Card */}
      <div className="author-card">
        <div className="author-card-inner">
          <div className="author-card-avatar">{post.author.avatar}</div>
          <div className="author-card-info">
            <div className="author-card-header">
              <h3 className="author-card-name">{post.author.name}</h3>
              <button className="author-follow-btn">Follow</button>
            </div>
            <p className="author-card-bio">{post.author.bio}</p>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="related-section" id="related-posts">
          <h2 className="related-title">
            More from {post.author.name}
          </h2>
          <div className="related-grid">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="related-card">
                <div className="related-card-author">
                  <div
                    className="trending-author-avatar"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea, #764ba2)",
                    }}
                  >
                    {relatedPost.author.avatar}
                  </div>
                  <span className="related-card-author-name">
                    {relatedPost.author.name}
                  </span>
                </div>
                <h3 className="related-card-title">
                  <Link href={`/blog/${relatedPost.slug}`}>
                    {relatedPost.title}
                  </Link>
                </h3>
                <span className="related-card-meta">
                  {relatedPost.date} · {relatedPost.readTime}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
