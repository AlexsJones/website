"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";

function BlinkingCursor() {
  return <span className="inline-block w-2 h-5 bg-green-400 align-bottom animate-blink ml-1" style={{animation: 'blink 1s steps(2, start) infinite'}}></span>;
}

const COMMANDS = {
  home: "/",
  about: "/about",
  speaking: "/speaking",
  blog: "/blog",
  cv: "/cv",
  help: null,
  clear: null,
};

const PAGE_OUTPUT: Record<string, string> = {
  "/": `Welcome to axjns.dev\nType a command or use the menu above.`,
  "/about": `About Me\n--------\nPrincipal Engineer @ AWS\nCloud Native Advocate, Speaker, Open Source Contributor.\nLondon, United Kingdom.`,
  "/speaking": `Speaking Events\n--------------\n- Beyond the Clouds: Charting the course for AI in the CloudNative world\n- K8sGPT: Balancing AI's Productivity Boost with Ethical Considerations in Cloud-Native\n- Rust Operators For Kubernetes\n- Crowdsourcing a Kubernetes distribution: What we learnt with MicroK8s\n- SLO's don't matter: A nihilist's guide to reliability\nSee more: https://sessionize.com/jonesax/`,
  "/blog": `Blog\n----\nNo posts yet. Stay tuned!`,
  "/cv": `Alex Jones - CV\n----------------\nPrincipal Engineer @ AWS\nLondon, United Kingdom\nEmail: alexsimonjones@gmail.com\nLinkedIn: www.linkedin.com/in/jonesax\n\nSummary:\nI am an individual contributor. My work is mysterious and important.\nOutside of work I contribute to open-source.\nExpertise: Distributed systems, Kubernetes, Systems Design, AI in Cloud.\n\nExperience:\n- AWS: Principal Engineer (Aug 2023 - Present)\n- k8sgpt.ai: Founder (Mar 2023 - Present)\n- Canonical: Engineering Director, Kubernetes (Jan 2022 - Aug 2023)\n- JPMorgan Chase: VP SRE (Dec 2020 - May 2021)\n- American Express: Engineering Director, SRE (May 2019 - Dec 2020)\n- Beamery: Head of Platform & Infrastructure (May 2017 - May 2019)\n- Sky: Lead DevOps Engineer (Apr 2016 - May 2017)\n- Microsoft: Senior Software Engineer (Oct 2014 - Apr 2015)\n...and more\n\nCertifications:\n- Speaker: KubeCon + CloudNativeCon North America 2021, 2022\n- Speaker: KubeCon + CloudNativeCon Europe 2023, 2025\n\nSkills:\nLong-term Vision, Communication, AWS, Distributed Systems, Kubernetes, Systems Design,\nAI in Cloud, DevOps, Observability, Go, Rust, Linux, Open Source, Platform Engineering\n\nEducation:\nKingston University — First class BsC with Honors, Computer Science (2007 - 2010)`
};

const EASTER_EGGS: Record<string, string | (() => string)> = {
  ls: "about  blog  cv  speaking  README.md",
  top: `top - 00:00:01 up 1 day,  1 user,  load average: 0.00, 0.01, 0.05\nTasks: 1 total, 1 running, 0 sleeping, 0 stopped, 0 zombie\n%Cpu(s): 0.7 us, 0.3 sy, 0.0 ni, 99.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st\nMiB Mem :  16384.0 total,  12000.0 free,   2048.0 used,   1336.0 buff/cache\nPID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n  1 axjns     20   0   10000   3000   2000 R   0.7   0.1   0:00.01 axjns.dev\n 42 axjns     20   0   42424   1337   1337 S   0.0   0.0   0:00.00 cowsay\n 99 axjns     20   0   99999   4040   4040 S   0.0   0.0   0:00.00 fortune`,
  du: `4.0K    ./blog\n8.0K    ./cv\n16.0K   ./about\n32.0K   ./speaking\n42G     ./README.md\n1337G   .\nWow, that's a lot of disk usage!`,
  iotop: `Total DISK READ: 0.00 B/s | Total DISK WRITE: 0.00 B/s\nPID  PRIO  USER     DISK READ  DISK WRITE  SWAPIN     IO>    COMMAND\n1    be    axjns    0.00 B/s   0.00 B/s    0.00 %     0.00 % axjns.dev\n42   be    axjns    0.00 B/s   0.00 B/s    0.00 %     0.00 % cowsay\n99   be    axjns    0.00 B/s   0.00 B/s    0.00 %     0.00 % fortune\n(Your disk is chilling.)`,
  lsblk: `NAME        MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT\nsda           8:0    0 1337G  0 disk \n└─sda1        8:1    0 1337G  0 part /\nsuperfloppy   1:0    1  1.4M  0 disk /mnt/floppy\nusb0         11:0    1  16G   0 disk /mnt/usb\n(So many blocks, so little time.)`,
  ssh: `usage: ssh [-46AaCfGgKkMNnqsTtVvXxYy] [-B bind_interface] [-b bind_address]\n           [-c cipher_spec] [-D [bind_address:]port] [-E log_file]\n           [-e escape_char] [-F configfile] [-I pkcs11] [-i identity_file]\n           [-J destination] [-L address] [-l login_name] [-m mac_spec]\n           [-O ctl_cmd] [-o option] [-P tag] [-p port] [-R address]\n           [-S ctl_path] [-W host:port] [-w local_tun[:remote_tun]]\n           destination [command [argument ...]]\n       ssh [-Q query_option]`,
  whoami: "axjns",
  uname: "Linux axjns.dev 6.14.11-300.fc42.x86_64 #1 SMP PREEMPT_DYNAMIC",
  ps: `  PID TTY          TIME CMD\n    1 pts/0    00:00:01 axjns.dev\n  222 pts/0    00:00:00 bash\n  333 pts/0    00:00:00 cowsay\n  444 pts/0    00:00:00 fortune`,
  cat: "meow. (You don't have permission to read this file)",
  echo: "echo what?",
  pwd: "/home/axjns",
  date: new Date().toString(),
  cal: `     June 2024\nSu Mo Tu We Th Fr Sa\n                   1\n 2  3  4  5  6  7  8\n 9 10 11 12 13 14 15\n16 17 18 19 20 21 22\n23 24 25 26 27 28 29\n30`,
  fortune: "You will deploy to production on a Friday.",
  cowsay: ` ____________\n< axjns.dev >\n ------------\n        \   ^__^\n         \  (oo)\\_______\n            (__)\\       )\/\\\n                ||----w |\n                ||     ||`,
  neofetch: `            .-/+oossssoo+/-.\n        ':+ssssssssssssssssss+:'.\n      -+ssssssssssssssssssyyssss+-\n    .ossssssssssssssssssdMMMNysssso.\n   /ssssssssssshdmmNNmmyNMMMMhssssss/\n  +ssssssssshmydMMMMMMMNddddyssssssss+\n /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/\n.ssssssssdMMMNhsssssssssshNMMMdssssssss.\n+sssshhhyNMMNyssssssssssssyNMMMysssssss+\nossyNMMMNyMMhsssssssssssssshmmmhssssssso\nossyNMMMNyMMhsssssssssssssshmmmhssssssso\n+sssshhhyNMMNyssssssssssssyNMMMysssssss+\n.ssssssssdMMMNhsssssssssshNMMMdssssssss.\n /sssssssshNMMMyhhyyyyhmNMMMNhssssssss/\n  +ssssssssshmydMMMMMMMNddddyssssssss+\n   /ssssssssssshdmmNNmmyNMMMMhssssss/\n    .ossssssssssssssssssdMMMNysssso.\n      -+ssssssssssssssssssyyssss+-\n        ':+ssssssssssssssssss+:'.\n            .-/+oossssoo+/-.\n\naxjns@dev\nOS: Linux\nHost: axjns.dev\nKernel: 6.14.11-300.fc42.x86_64\nUptime: 1 day\nShell: bash\nResolution: 1920x1080\nDE: CLI\nCPU: Intel(R) Hacker i9\nMemory: 16GB\n`};

// Simulated filesystem
const FS: Record<string, string[]> = {
  '/': ['home', 'tmp', 'opt', 'bin', 'var', 'etc'],
  '/home': ['axjns'],
  '/home/axjns': ['speaking', 'about', 'blog', 'cv', 'README.md'],
  '/blog': [],
  '/cv': [],
  '/about': [],
  '/speaking': [],
  '/tmp': ['.X11-unix', 'testfile.txt'],
  '/opt': ['coolapp', 'README.md'],
  '/bin': ['ls', 'cat', 'bash', 'sh', 'echo', 'top', 'ps', 'neofetch'],
  '/var': ['log', 'tmp', 'www'],
  '/var/log': ['syslog', 'dmesg', 'auth.log'],
  '/var/tmp': [],
  '/var/www': ['index.html'],
  '/etc': ['passwd', 'shadow', 'hosts', 'hostname', 'motd'],
};

// Map file content for /home/axjns
const FILE_CONTENT: Record<string, string> = {
  '/home/axjns/speaking': PAGE_OUTPUT['/speaking'],
  '/home/axjns/about': PAGE_OUTPUT['/about'],
  '/home/axjns/blog': PAGE_OUTPUT['/blog'],
  '/home/axjns/cv': PAGE_OUTPUT['/cv'],
  '/home/axjns/README.md': 'Welcome to the home directory of axjns! Try cat about, cat cv, cat blog, cat speaking.'
};

function resolvePath(cwd: string, arg: string): string {
  if (!arg || arg === '.') return cwd;
  if (arg === '/') return '/';
  if (arg === '..') {
    if (cwd === '/') return '/';
    return cwd.slice(0, cwd.lastIndexOf('/')) || '/';
  }
  if (arg.startsWith('/')) return arg;
  return (cwd === '/' ? '' : cwd) + '/' + arg;
}

export default function RootLayout() {
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState<string>("/");
  const [showGif, setShowGif] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = React.useRef(pathname);

  // Only set initial output once
  useEffect(() => {
    if (history.length === 0) {
      setHistory([PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"]]);
    }
    // eslint-disable-next-line
  }, []);

  // Print page output when route changes (but not on initial load)
  useEffect(() => {
    if (history.length > 0 && PAGE_OUTPUT[pathname]) {
      setHistory((h) => [...h, PAGE_OUTPUT[pathname]]);
    }
    // eslint-disable-next-line
  }, [pathname]);

  const handleCommand = (cmd: string) => {
    setShowGif(false); // Hide gif on any command
    const command = cmd.trim();
    const [base, ...args] = command.split(/\s+/);
    const arg = args.join(' ');
    // Filesystem commands
    if (base === 'ls') {
      const target = resolvePath(cwd, arg);
      if (FS[target as keyof typeof FS]) {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          FS[target as keyof typeof FS].join('  ') || '',
        ]);
      } else {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          `ls: cannot access '${arg}': No such file or directory`,
        ]);
      }
      return;
    }
    if (base === 'cd') {
      const target = resolvePath(cwd, arg);
      if (FS[target as keyof typeof FS]) {
        setCwd(target);
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
        ]);
      } else {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          `cd: no such file or directory: ${arg}`,
        ]);
      }
      return;
    }
    if (base === 'pwd') {
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        cwd,
      ]);
      return;
    }
    if (base === 'cat') {
      let target = arg;
      if (!target.startsWith('/')) {
        target = cwd === '/' ? '/' + arg : cwd + '/' + arg;
      }
      if (FILE_CONTENT[target]) {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          FILE_CONTENT[target],
        ]);
      } else {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          `cat: ${arg}: No such file or directory`,
        ]);
      }
      return;
    }
    // Easter eggs and normal commands
    const lower = command.toLowerCase();
    if (
      base === 'ssh' || lower === 'ssh' ||
      base === 'sudo' || lower === 'sudo' ||
      (base === 'rm' && /-rf/.test(cmd))
    ) {
      setShowGif(true);
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        String(EASTER_EGGS['ssh']),
      ]);
      return;
    }
    if (EASTER_EGGS[lower]) {
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        typeof EASTER_EGGS[lower] === "function" ? EASTER_EGGS[lower]() : EASTER_EGGS[lower],
      ]);
      return;
    }
    if (COMMANDS[lower as keyof typeof COMMANDS] && typeof COMMANDS[lower as keyof typeof COMMANDS] === "string") {
      router.push(COMMANDS[lower as keyof typeof COMMANDS]!);
      setHistory((h) => [...h, `${prompt(cwd)} ${cmd}`]);
      return;
    }
    if (lower === "help") {
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        "Available commands: home, about, speaking, blog, cv, help, clear, ls, cd, pwd, ...",
      ]);
      return;
    }
    if (lower === "clear") {
      setHistory([]);
      return;
    }
    setHistory((h) => [
      ...h,
      `${prompt(cwd)} ${cmd}`,
      `command not found: ${cmd}`,
    ]);
  };

  function prompt(dir: string) {
    return `axjns@dev:${dir}$`;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono min-h-screen relative antialiased overflow-x-hidden">
        {/* Matrix rain animation backdrop */}
        <div id="matrix-rain" className="fixed inset-0 z-0 pointer-events-none" aria-hidden></div>
        <div className="flex flex-col items-center min-h-screen">
          <div className="w-full max-w-4xl mt-8 border border-green-800 bg-black/95 rounded shadow-lg relative z-10">
            <div className="p-6 whitespace-pre-wrap break-words text-green-400 font-mono text-base min-h-[60vh]" onClick={() => inputRef.current && inputRef.current.focus()}>
              {history.map((line, i) => (
                <div key={i} className="break-words whitespace-pre-wrap">{line}</div>
              ))}
              <div className="flex items-center">
                <span className="text-green-300">{prompt(cwd)}</span>
                {input.length === 0 ? <BlinkingCursor /> : null}
                <input
                  ref={inputRef}
                  className="bg-transparent border-none outline-none text-green-400 font-mono ml-2 w-48"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                />
                {input.length > 0 ? <BlinkingCursor /> : null}
              </div>
            </div>
            {showGif && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60" style={{cursor:'pointer'}} onClick={() => setShowGif(false)}>
                <img src="/img/you-didnt-say-the-magic-word-ah-ah.gif" alt="You didn't say the magic word!" className="max-w-xs md:max-w-md lg:max-w-lg rounded shadow-2xl border-4 border-pink-600" />
              </div>
            )}
          </div>
        </div>
        <style>{`
          @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
          #matrix-rain { pointer-events: none; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 0; background: transparent; }
        `}</style>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              const canvas = document.createElement('canvas');
              canvas.id = 'matrix-canvas';
              canvas.style.position = 'absolute';
              canvas.style.top = 0;
              canvas.style.left = 0;
              canvas.style.width = '100vw';
              canvas.style.height = '100vh';
              canvas.style.pointerEvents = 'none';
              canvas.style.zIndex = 0;
              document.getElementById('matrix-rain')?.appendChild(canvas);
              const ctx = canvas.getContext('2d');
              let width = window.innerWidth;
              let height = window.innerHeight;
              canvas.width = width;
              canvas.height = height;
              const fontSize = 18;
              const columns = Math.floor(width / fontSize);
              const drops = Array(columns).fill(1);
              function draw() {
                ctx.fillStyle = 'rgba(0,0,0,0.08)';
                ctx.fillRect(0, 0, width, height);
                ctx.font = fontSize + "px monospace";
                ctx.fillStyle = '#39FF14';
                for (let i = 0; i < drops.length; i++) {
                  const text = String.fromCharCode(0x30A0 + Math.random() * 96);
                  ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                  if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                  }
                  drops[i]++;
                }
              }
              setInterval(draw, 50);
              window.addEventListener('resize', () => {
                width = window.innerWidth;
                height = window.innerHeight;
                canvas.width = width;
                canvas.height = height;
              });
            })();
          `
        }} />
      </body>
    </html>
  );
}
