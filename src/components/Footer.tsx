import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-2 border-surface-lighter bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="label mb-3">[ contact ]</div>
            <div className="font-display text-3xl text-bone mb-2">
              Alex Jones
            </div>
            <p className="font-mono text-xs text-ash uppercase tracking-[0.08em]">
              Principal Engineer @ AWS &mdash; London, UK
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-[0.12em]">
            <a
              href="https://github.com/AlexsJones"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-dark hover:text-ember transition-colors"
            >
              GitHub &#8599;
            </a>
            <a
              href="https://www.linkedin.com/in/jonesax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-dark hover:text-ember transition-colors"
            >
              LinkedIn &#8599;
            </a>
            <a
              href="https://x.com/AlexJonesax"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-dark hover:text-ember transition-colors"
            >
              X &#8599;
            </a>
            <a
              href="https://sessionize.com/jonesax/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone-dark hover:text-ember transition-colors"
            >
              Sessionize &#8599;
            </a>
            <Link
              href="/terminal"
              className="text-ash hover:text-ember transition-colors"
              title="ssh axjns.dev"
            >
              /terminal
            </Link>
          </div>
        </div>

        <div className="mt-10 border-t border-surface-lighter pt-6">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
              &copy; {new Date().getFullYear()} Alex Jones
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
