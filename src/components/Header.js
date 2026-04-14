"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header" id="main-header">
      <div className="header-inner">
        <div className="header-left">
          <Link href="/" className="logo">
            Narrativ
          </Link>
          <nav className="header-nav" aria-label="Main navigation">
            <Link
              href="/"
              className={`nav-link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`nav-link ${pathname.startsWith("/blog") ? "active" : ""}`}
            >
              Blog
            </Link>
          </nav>
        </div>
        <div className="header-right">
          <button className="search-btn" aria-label="Search">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="write-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Write</span>
          </button>
          <button className="sign-in-btn" id="sign-in-btn">
            Sign in
          </button>
        </div>
      </div>
    </header>
  );
}
