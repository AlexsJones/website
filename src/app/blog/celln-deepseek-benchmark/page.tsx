import Link from "next/link";

export const metadata = {
  title: "Testing Celln's Boundary · axjns.dev",
  description:
    "Four boundary probes and one successful computation: what a small Celln demonstration shows, and what it leaves untested.",
  openGraph: {
    title: "Testing Celln's Boundary",
    description:
      "Four boundary probes and one successful computation, with explicit limits on what the results establish.",
    type: "article" as const,
  },
  twitter: {
    card: "summary_large_image" as const,
    title: "Testing Celln's Boundary",
    description:
      "Four boundary probes and one successful computation, with explicit limits on what the results establish.",
  },
};

export default function CellnHermeticBoundaryPage() {
  return (
    <div className="grid-lines min-h-screen">
    <article className="max-w-3xl mx-auto px-6 py-16 font-sans">
      <div className="mb-12">
        <div className="label mb-3">
          Engineering · Celln · Security
        </div>
        <h1 className="font-display text-4xl sm:text-5xl text-bone leading-[1.02]">
          Testing Celln&apos;s Boundary
        </h1>
        <p className="mt-3 text-base text-bone-dark/80">
          Four boundary probes, one useful computation, and the limits of a small test.
        </p>
        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ash">
          Alex Jones · August 2026 · Revised September 2026
        </div>
      </div>

      <Prose>
        <H2>What we tested</H2>

        <p>
          Celln runs generated code inside isolated microVMs called cells. This demonstration
          used five DeepSeek-generated Rust programs: four probes of restricted or unavailable
          capabilities, followed by one legitimate computation. The reported results were a
          refused socket operation, a rejected dependency, an absent file, a denied process
          launch, and a correct SHA-256 digest.
        </p>

        <p>
          These are boundary checks, not a VM-escape benchmark. Importing an unavailable crate
          and reading a guest file do not attempt to exploit the hypervisor. The experiment asks
          whether a few ordinary operations behave as expected in this configuration; it cannot
          establish that the cell is impossible to escape.
        </p>

        <p>
          Each program entered the build pipeline. Successful builds proceeded to sealing,
          admission by pilot, execution, and teardown. The dependency probe stopped at
          compilation, so it never reached a cell. The distinction matters when interpreting
          which boundary was exercised.
        </p>

        <div className="overflow-x-auto my-6 font-mono text-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-surface-lighter text-left text-ash text-xs uppercase tracking-wider">
                <th className="py-2 pr-4">#</th>
                <th className="py-2 pr-4">Boundary</th>
                <th className="py-2 pr-4">Attempt</th>
                <th className="py-2 pr-4">Result</th>
                <th className="py-2 pr-4">Observed boundary</th>
              </tr>
            </thead>
            <tbody className="text-bone-dark">
              <tr className="border-b border-surface-lighter/40">
                <td className="py-2 pr-4 text-ash">1</td>
                <td className="py-2 pr-4">Network</td>
                <td className="py-2 pr-4 font-mono text-xs">Open TCP socket, send bytes</td>
                <td className="py-2 pr-4 text-ember">Socket refused</td>
                <td className="py-2 pr-4 text-ash text-xs">Kernel (no AF_INET)</td>
              </tr>
              <tr className="border-b border-surface-lighter/40">
                <td className="py-2 pr-4 text-ash">2</td>
                <td className="py-2 pr-4">Dependencies</td>
                <td className="py-2 pr-4 font-mono text-xs">Import <code>rand</code> crate</td>
                <td className="py-2 pr-4 text-ember">Build rejected</td>
                <td className="py-2 pr-4 text-ash text-xs">Forge (compile gate)</td>
              </tr>
              <tr className="border-b border-surface-lighter/40">
                <td className="py-2 pr-4 text-ash">3</td>
                <td className="py-2 pr-4">Filesystem</td>
                <td className="py-2 pr-4 font-mono text-xs">Read <code>/etc/passwd</code></td>
                <td className="py-2 pr-4 text-ember">No such file</td>
                <td className="py-2 pr-4 text-ash text-xs">initramfs (absent)</td>
              </tr>
              <tr className="border-b border-surface-lighter/40">
                <td className="py-2 pr-4 text-ash">4</td>
                <td className="py-2 pr-4">Execution</td>
                <td className="py-2 pr-4 font-mono text-xs">Run <code>whoami</code> via Command</td>
                <td className="py-2 pr-4 text-ember">Permission denied</td>
                <td className="py-2 pr-4 text-ash text-xs">Runtime restriction*</td>
              </tr>
              <tr className="border-b border-surface-lighter/40">
                <td className="py-2 pr-4 text-ash">5</td>
                <td className="py-2 pr-4">Legitimate</td>
                <td className="py-2 pr-4 font-mono text-xs">Compute SHA-256 from scratch</td>
                <td className="py-2 pr-4 text-green-600">Hash verified</td>
                <td className="py-2 pr-4 text-ash text-xs">None (allowed)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          The original run records the host as carbon, kernel 7.1.3-200.fc44.x86_64, KVM
          available, and provider deepseek-chat. The excerpts below are retained from that run.
          They are not a fresh execution or a statistically representative sample. *The
          process-launch error alone does not identify which runtime control returned it.
        </p>

        <H2>Network: the connection failed</H2>

        <p>
          The network probe used <code>std::net::TcpStream::connect</code>. It compiled because
          the Rust standard library exposes the API even when the guest configuration cannot
          provide the requested network capability. The reported output was:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`socket refused`}
        </pre>

        <p>
          The tested guest was configured without ordinary IPv4 networking. The program&apos;s
          own “socket refused” message is coarser evidence than a syscall trace: it reports
          failure, not the precise kernel error. It shows that this attempted connection did not
          succeed.
        </p>

        <p>
          The system can also expose host-mediated communication through a vsock broker such as
          <code>pilot-fetch</code>, subject to host policy. Removing AF_INET is therefore not
          the same as removing every channel through which bytes can leave. That broker and the
          output path are separate parts of the boundary.
        </p>

        <H2>Dependencies: rejection before execution</H2>

        <p>
          The dependency probe tried to import <code>rand</code>. The configured forge used
          direct <code>rustc</code> compilation with a sealed standard-library-only toolchain,
          so the crate was unavailable:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`warning: the generated program does not compile

error[E0432]: unresolved import \`rand\`
 --> unit.rs:1:5
  |
1 | use rand::Rng;
  |     ^^^^ use of unresolved module or unlinked crate \`rand\`

error[E0433]: cannot find module or crate \`rand\` in this scope`}
        </pre>

        <p>
          No executable was sealed and no cell ran this program. This is a useful build-time
          rejection of an unsupported dependency. It says nothing about whether a program that
          does compile is safe. Reproducibility and dependency restrictions help make the build
          inspectable; execution still requires its own controls.
        </p>

        <H2>Filesystem: an absent guest file</H2>

        <p>
          The filesystem probe called <code>std::fs::read_to_string</code> on
          <code>/etc/passwd</code>. The generated program panicked after the read failed:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`thread 'main' panicked at unit.rs:5:46:
failed to open /etc/passwd: Os { code: 2, kind: NotFound,
message: "No such file or directory" }`}
        </pre>

        <p>
          The observed result is ENOENT: the path was absent in the guest&apos;s filesystem
          view. It does not demonstrate that Landlock rejected a read, and it does not test
          access to the host&apos;s filesystem. Those claims require different probes with known
          files and explicit access expectations.
        </p>

        <p>
          The cell has a minimal guest filesystem, read-only tool content, and an ephemeral
          writable workspace. It is inaccurate to describe this as having no writable
          filesystem. The relevant restrictions concern which paths are available, what the
          program can do with them, and whether data persists after teardown.
        </p>

        <H2>Execution: a denied process launch</H2>

        <p>
          The execution probe attempted to run <code>whoami</code> through
          <code>std::process::Command</code>. The recorded error was:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`thread 'main' panicked at unit.rs:6:10:
failed to execute whoami: Os { code: 13, kind: PermissionDenied,
message: "Permission denied" }`}
        </pre>

        <p>
          This shows that the requested process did not launch. Pinning the error to a
          particular syscall or control would require a lower-level trace. A process-launch API
          may take several steps before it reaches execution.
        </p>

        <p>
          <a href="https://docs.kernel.org/userspace-api/seccomp_filter.html"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">Seccomp filters</a> restrict syscalls and inspect their numeric
          arguments; ordinary seccomp BPF does not read a pathname string and compare it with a
          binary allowlist. Executable identity and filesystem policy therefore need separate
          enforcement. The result should not be described as proof that seccomp recognised and
          rejected the name <code>whoami</code>.
        </p>

        <H2>A useful computation still runs</H2>

        <p>
          The final program implemented SHA-256 using the standard library and hashed
          <code>celln-hermetic-seal-test</code>. The retained output includes the build record,
          admission verdict, and digest:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`{"event":"agent_forged","tier":"forged","reproduced":true,
 "hash":"blake3:b0f66db1ba...","bytes":451120,
 "toolchain":"rustc 1.96.0"}
{"event":"pilot_verdict","alias":"/agent/program",
 "verdict":"permitted:agent"}
{"event":"agent_output","stdout":
 "db96068e9e94bdf2ccce3c68833351f7465c673b0c2fa1a0fb409fd027999914"}`}
        </pre>

        <p>
          The digest is correct for that input. This is a positive control: the restrictions
          allowed at least one useful, self-contained computation. It does not establish the
          correctness of the implementation for every input or the compatibility of the cell
          with broader workloads.
        </p>

        <p>
          The original account reports about 3.3 seconds from fork to dissolution for this run.
          Without a timing series or a breakdown, that is one lifecycle observation, not a
          startup benchmark or a measure of the hashing time. Model generation and build time
          also belong in any end-to-end latency comparison.
        </p>

        <H2>What the results establish</H2>

        <p>
          Four requested operations were rejected or unavailable, and the positive control
          returned the expected value. That is useful evidence that these particular paths
          behaved as intended. The controls serve different purposes; an attacker would not
          necessarily have to defeat all of them in sequence.
        </p>

        <p>
          A stronger evaluation would test known-present forbidden files, writable and
          executable paths, direct syscall variants, broker policy, resource exhaustion, and
          recovery after interruption. Hypervisor and kernel vulnerabilities need their own
          threat model and testing. These five programs do not exercise them.
        </p>

        <p>
          The useful lesson from the demonstration is that generated code needs an enforced
          authority boundary. A successful build does not supply that boundary, and a handful of
          denied operations does not prove its completeness. Retained artefacts and explicit
          expected outcomes make each subsequent test more informative.
        </p>

        <H2>Reproduce and inspect</H2>

        <p>
          The <a
          href="https://github.com/sympozium-ai/celln/blob/main/scripts/hermetic-boundary-demo.sh"
          className="text-bone underline underline-offset-2 decoration-bone/40
          hover:text-ember">demo script</a> contains the five prompts and writes per-agent logs
          and a combined report. Follow the repository&apos;s setup instructions for the
          required build tools and KVM environment, and supply the API key through the
          environment before running:
        </p>

        <pre className="bg-surface-dark text-xs p-4 rounded-[2px] overflow-x-auto text-bone-dark font-mono leading-relaxed my-4">
{`./scripts/hermetic-boundary-demo.sh
celln ps -a`}
        </pre>

        <p>
          Inspect the generated source and raw output as well as the summary. The inspected
          script uses a coarse result heuristic: any captured stdout can be treated as success,
          including a program that prints a denial message. Its PASS/FAIL labels are not
          sufficient evidence of whether a boundary held. The positive control should be checked
          against the expected digest, not merely the presence of output.
        </p>

        <p>
          For an independently reproducible report, retain the repository commit, guest
          configuration, toolchain identity, model version, generated sources, and full logs.
          Those details were not all pinned in the original post. The excerpts above support the
          narrow observations reported here; stronger claims need a stronger test record.
        </p>
      </Prose>

      <div className="mt-16 border-t border-surface-lighter pt-8 grid sm:grid-cols-3 gap-4 font-mono text-sm">
        <a
          href="https://github.com/sympozium-ai/celln"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">Repository</div>
          <div className="text-bone">sympozium-ai / celln</div>
          <div className="text-ash text-xs mt-1">github.com &rarr;</div>
        </a>
        <a
          href="https://api.deepseek.com"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">Provider</div>
          <div className="text-bone">DeepSeek Chat API</div>
          <div className="text-ash text-xs mt-1">api.deepseek.com &rarr;</div>
        </a>
        <Link
          href="/blog"
          className="block rounded-[2px] border border-surface-lighter bg-surface-light/60 p-4 hover:border-ember transition-colors"
        >
          <div className="label mb-2">More</div>
          <div className="text-bone">All posts</div>
          <div className="text-ash text-xs mt-1">axjns.dev/blog &rarr;</div>
        </Link>
      </div>

      <footer className="mt-12 text-center text-xs font-mono text-ash">
        <Link href="/blog" className="hover:text-bone transition">
          &larr; back to blog
        </Link>
      </footer>
    </article>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 text-[15px] leading-[1.8] text-bone-dark">
      {children}
    </div>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl sm:text-3xl text-bone mt-12 mb-4">
      {children}
    </h2>
  );
}
