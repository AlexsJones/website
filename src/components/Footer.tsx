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

        {/* specimen badge row — ref: LAB sticker sheet */}
        <div className="mt-10 pt-6 border-t border-surface-lighter flex flex-wrap items-center gap-3 font-mono text-[9px] uppercase tracking-[0.18em]">
          <span className="checker inline-block w-16 h-4" aria-hidden />
          <span className="inline-flex items-center gap-2 border border-bone/60 text-bone px-2 py-1 rounded-[2px]">
            Made in the U.K. <span className="text-ember">&#9656;&#9656;&#9656;</span>
          </span>
          <span className="border border-bone/60 text-bone px-1.5 py-1 rounded-[2px]">
            R
          </span>
          <span className="bg-bone text-surface px-2 py-1 rounded-[2px] font-semibold">
            Field Tested
          </span>
          <span className="text-ash">Zero downtime blogging</span>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ash">
            &copy; {new Date().getFullYear()} axjns.dev &mdash; built with an
            ember
          </span>
          <span className="text-ember-dark text-[8px] tracking-[0.3em]">
            &#9656;&#9656;&#9656;
          </span>
        </div>
      </div>
    </footer>
  );
}
