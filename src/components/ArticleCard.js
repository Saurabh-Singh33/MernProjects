import Link from "next/link";

const avatarColors = ["green", "purple", "orange", "blue"];
const thumbClasses = ["thumb-1", "thumb-2", "thumb-3", "thumb-4", "thumb-5", "thumb-6"];

export default function ArticleCard({ post, index = 0 }) {
  const avatarColor = avatarColors[index % avatarColors.length];
  const thumbClass = thumbClasses[index % thumbClasses.length];

  return (
    <article className="article-card" id={`article-${post.slug}`}>
      <div className="article-card-content">
        <div className="article-card-author">
          <div className={`article-author-avatar ${avatarColor}`}>
            {post.author.avatar}
          </div>
          <span className="article-author-name">{post.author.name}</span>
        </div>
        <h2 className="article-card-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="article-card-excerpt">{post.excerpt}</p>
        <div className="article-card-footer">
          <div className="article-card-meta">
            <span className="article-tag">{post.category}</span>
            <span className="article-date">{post.date}</span>
            <span className="meta-separator">·</span>
            <span className="article-read-time">{post.readTime}</span>
          </div>
          <div className="article-card-actions">
            <button className="action-btn" aria-label="Save post">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
            <button className="action-btn" aria-label="More options">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="article-card-image">
        <div className={`article-thumb ${thumbClass}`}>
          {post.title.charAt(0)}
        </div>
      </div>
    </article>
  );
}
