import { getAllPosts } from "@/lib/posts";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "All Stories",
  description:
    "Explore all stories on Narrativ — ideas, insights, and perspectives on technology, design, engineering, and more.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="main-content" id="blog-listing">
      <section className="feed-section">
        <div className="feed-header">
          <button className="feed-tab active">All Stories</button>
          <button className="feed-tab">Technology</button>
          <button className="feed-tab">Design</button>
          <button className="feed-tab">Engineering</button>
        </div>
        <div id="blog-articles-feed">
          {posts.map((post, index) => (
            <ArticleCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </section>
      <Sidebar />
    </div>
  );
}
