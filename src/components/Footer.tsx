import Link from "next/link";

// Matches the v2 footer in public/v2.
export default function Footer() {
  return (
    <footer className="v2-footer">
      <span>&copy; {new Date().getFullYear()} Alex Jones</span>
      <span className="chk" aria-hidden="true" />
      <nav>
        <a href="https://github.com/AlexsJones" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a href="https://huggingface.co/axjns" target="_blank" rel="noopener noreferrer">
          Hugging Face
        </a>
        <a href="https://x.com/AlexJonesax" target="_blank" rel="noopener noreferrer">
          X
        </a>
        <a href="https://sessionize.com/jonesax/" target="_blank" rel="noopener noreferrer">
          Sessionize
        </a>
        <a href="/cv">CV</a>
        <a href="/feed.xml">RSS</a>
        <Link href="/terminal" title="ssh axjns.dev">
          /terminal
        </Link>
      </nav>
      <span>Open source // field tested // made in the U.K.</span>
    </footer>
  );
}
