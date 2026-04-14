import Link from "next/link";
import { getAllPosts, getAllCategories } from "@/lib/posts";

const avatarColors = ["green", "purple", "orange", "blue"];

export default function Sidebar() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const trending = posts.sort((a, b) => b.claps - a.claps).slice(0, 4);

  return (
    <aside className="sidebar" aria-label="Sidebar">
      {/* Trending Section */}
      <section className="sidebar-section">
        <h3 className="sidebar-title">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ display: "inline", marginRight: "6px", verticalAlign: "-2px" }}
          >
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          Trending on Narrativ
        </h3>
        <ol className="trending-list">
          {trending.map((post, index) => (
            <li key={post.id} className="trending-item">
              <span className="trending-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="trending-content">
                <div className="trending-author">
                  <div
                    className={`trending-author-avatar`}
                    style={{
                      background:
                        index % 2 === 0
                          ? "linear-gradient(135deg, #667eea, #764ba2)"
                          : "linear-gradient(135deg, #f093fb, #f5576c)",
                    }}
                  >
                    {post.author.avatar}
                  </div>
                  <span className="trending-author-name">
                    {post.author.name}
                  </span>
                </div>
                <h4 className="trending-title">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h4>
                <span className="trending-meta">
                  {post.date} · {post.readTime}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Topics Section */}
      <section className="sidebar-section">
        <h3 className="sidebar-title">Recommended Topics</h3>
        <div className="topics-grid">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/blog?category=${category}`}
              className="topic-tag"
            >
              {category}
            </Link>
          ))}
          <span className="topic-tag">JavaScript</span>
          <span className="topic-tag">React</span>
          <span className="topic-tag">Next.js</span>
          <span className="topic-tag">CSS</span>
        </div>
      </section>

      <hr className="sidebar-divider" />

      {/* Footer Links */}
      <div className="sidebar-links">
        <Link href="/" className="sidebar-link">Help</Link>
        <Link href="/" className="sidebar-link">Status</Link>
        <Link href="/" className="sidebar-link">About</Link>
        <Link href="/" className="sidebar-link">Careers</Link>
        <Link href="/" className="sidebar-link">Privacy</Link>
        <Link href="/" className="sidebar-link">Terms</Link>
      </div>
    </aside>
  );
}
