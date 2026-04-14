import Link from "next/link";
import { getAllPosts, getFeaturedPost } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";

export default function Home() {
  const featuredPost = getFeaturedPost();
  const allPosts = getAllPosts().filter((p) => !p.featured);

  return (
    <>
      {/* Hero Section with Featured Post */}
      <section className="hero-section" id="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Featured
            </div>
            <h1 className="hero-title">
              <Link href={`/blog/${featuredPost.slug}`}>
                {featuredPost.title}
              </Link>
            </h1>
            <p className="hero-excerpt">{featuredPost.excerpt}</p>
            <div className="hero-meta">
              <div className="hero-author-avatar">
                {featuredPost.author.avatar}
              </div>
              <span className="hero-author-name">
                {featuredPost.author.name}
              </span>
              <span className="meta-separator">·</span>
              <span className="hero-date">{featuredPost.date}</span>
              <span className="meta-separator">·</span>
              <span className="hero-date">{featuredPost.readTime}</span>
            </div>
          </div>
          <div className="hero-image-container">
            <div
              style={{
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div className="hero-image-overlay">
              <span className="hero-image-tag">{featuredPost.category}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="main-content" id="main-content">
        <section className="feed-section">
          <div className="feed-header">
            <button className="feed-tab active" id="tab-for-you">
              For you
            </button>
            <button className="feed-tab" id="tab-following">
              Following
            </button>
            <button className="feed-tab" id="tab-trending">
              Trending
            </button>
          </div>
          <div id="articles-feed">
            {allPosts.map((post, index) => (
              <ArticleCard key={post.id} post={post} index={index} />
            ))}
          </div>
        </section>
        <Sidebar />
      </div>
    </>
  );
}
