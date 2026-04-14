import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-links">
          <Link href="/" className="footer-link">Help</Link>
          <Link href="/" className="footer-link">Status</Link>
          <Link href="/" className="footer-link">About</Link>
          <Link href="/" className="footer-link">Careers</Link>
          <Link href="/" className="footer-link">Blog</Link>
          <Link href="/" className="footer-link">Privacy</Link>
          <Link href="/" className="footer-link">Terms</Link>
        </div>
        <div className="footer-brand">Narrativ</div>
      </div>
    </footer>
  );
}
