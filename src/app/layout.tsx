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
  '/home/axjns': ['speaking', 'about', 'blog', 'cv', 'README.md', 'contact'],
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
  '/home/axjns/README.md': 'Welcome to the home directory of axjns! Try cat about, cat cv, cat blog, cat speaking.',
  '/home/axjns/contact': `Contact Alex Jones (axjns)\n--------------------------\nEmail: (see LinkedIn or GitHub for contact)\nGitHub: https://github.com/AlexsJones\nLinkedIn: https://www.linkedin.com/in/jonesax/\nSessionize: https://sessionize.com/jonesax/\nYouTube: https://www.youtube.com/cloudnativeskunkworks\n`,
  '/opt/coolapp': `\x1b[32mCoolApp v1.0\x1b[0m\n----------------\nWelcome to the legendary CoolApp!\n\nUsage: coolapp [--awesome]\n\nFeatures:\n- Does nothing, but does it in style.\n- 100% bug free (because it does nothing).\n- Easter egg: Try running with --awesome!\n\nThank you for trying CoolApp.\n`,
  '/opt/README.md': `# /opt/README.md\n\nWelcome to the /opt directory!\n\nHere you will find only the coolest, most experimental software.\n\nTry 'cat coolapp' for a surprise!\n\nP.S. This is not a real Linux system. Or is it?\n`,
  '/tmp/.X11-unix': 'Binary file (not printable)',
  '/tmp/testfile.txt': 'This is a test file in /tmp. Feel free to delete me! Or not.',
  '/var/log/syslog': '[  0.000000] Booting axjns.dev kernel...\n[  0.000001] All systems nominal.\n[ 42.000000] User tried to cat /var/log/syslog. Success!',
  '/var/log/dmesg': '[    0.000000] Linux version 6.14.11-300.fc42.x86_64\n[    0.000001] axjns.dev: The Matrix has you.',
  '/var/log/auth.log': 'Accepted password for axjns from 127.0.0.1 port 1337 ssh2\nUser axjns is always authorized.',
  '/var/www/index.html': '<!DOCTYPE html>\n<html><head><title>axjns.dev</title></head><body><h1>Welcome to the fake web root!</h1><p>This is not a real web server.</p></body></html>',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\naxjns:x:1000:1000:Alex Jones:/home/axjns:/bin/bash',
  '/etc/shadow': 'root:*:19700:0:99999:7:::\naxjns:*:19700:0:99999:7:::',
  '/etc/hosts': '127.0.0.1\tlocalhost\n::1\tlocalhost',
  '/etc/hostname': 'axjns.dev',
  '/etc/motd': 'Welcome to axjns.dev! Hack the planet.',
};

// Add pretend binaries as commands
const BINARY_COMMANDS: Record<string, string> = {
  'ls': typeof EASTER_EGGS.ls === 'function' ? EASTER_EGGS.ls() : EASTER_EGGS.ls,
  'cat': 'Usage: cat [file]\nConcatenate and print files. Try cat /etc/passwd!',
  'bash': 'GNU bash, version 5.2.0(1)-release (x86_64-axjns)',
  'sh': 'sh: this shell is too minimal for your needs.',
  'echo': 'echo what?',
  'top': typeof EASTER_EGGS.top === 'function' ? EASTER_EGGS.top() : EASTER_EGGS.top,
  'ps': typeof EASTER_EGGS.ps === 'function' ? EASTER_EGGS.ps() : EASTER_EGGS.ps,
  'neofetch': typeof EASTER_EGGS.neofetch === 'function' ? EASTER_EGGS.neofetch() : EASTER_EGGS.neofetch,
  '/opt/coolapp': '\x1b[32mCoolApp v1.0\x1b[0m\n----------------\nYou ran CoolApp!\n\nCongratulations, you have achieved maximum coolness.\n\nTry running with --awesome for a secret.\n',
  './coolapp': '\x1b[32mCoolApp v1.0\x1b[0m\n----------------\nYou ran CoolApp from the current directory!\n\nAchievement unlocked: ./coolapp\n',
  'vim': '', // placeholder, handled specially
  'kubectl': '', // handled specially
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
  const [vimSession, setVimSession] = useState<null | {
    filename: string;
    buffer: string[];
    mode: 'normal' | 'insert' | 'command';
    command: string;
  }>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const vimRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = React.useRef(pathname);

  // Only set initial output once
  useEffect(() => {
    if (history.length === 0) {
      setHistory([PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"], FILE_CONTENT['/etc/motd']]);
    }
    // eslint-disable-next-line
  }, []);

  // Print page output and motd when route changes (but not on initial load)
  useEffect(() => {
    if (history.length > 0 && PAGE_OUTPUT[pathname]) {
      setHistory((h) => [...h, PAGE_OUTPUT[pathname], FILE_CONTENT['/etc/motd']]);
    }
    // eslint-disable-next-line
  }, [pathname]);

  useEffect(() => {
    // Matrix rain animation setup
    const matrixRain = document.getElementById('matrix-rain');
    if (!matrixRain) return;
    // Remove any existing canvas
    const oldCanvas = document.getElementById('matrix-canvas');
    if (oldCanvas) oldCanvas.remove();
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '0';
    matrixRain.appendChild(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
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
    const interval = setInterval(draw, 50);
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    }
    window.addEventListener('resize', handleResize);
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      canvas.remove();
    };
  }, []);

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
    // Handle pretend binaries
    if (BINARY_COMMANDS[base] || BINARY_COMMANDS[cmd]) {
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        BINARY_COMMANDS[cmd] || BINARY_COMMANDS[base],
      ]);
      return;
    }
    // Handle fake vim
    if (base === 'vim') {
      const filename = args[0] || '[No Name]';
      setVimSession({
        filename,
        buffer: [''],
        mode: 'normal',
        command: '',
      });
      return;
    }
    // Handle fake kubectl
    if (base === 'kubectl') {
      const subcmd = args.join(' ');
      if (/get\s+pods(\s+-A)?/.test(subcmd)) {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          `NAMESPACE     NAME                        READY   STATUS    RESTARTS   AGE
kube-system   coredns-7f89b7bc75-abcde      1/1     Running   0          2d
kube-system   kube-proxy-xyz12              1/1     Running   0          2d
default       my-app-5d4f6b7c7d-12345        1/1     Running   1          1d
default       db-0                          1/1     Running   0          1d
`]);
        return;
      }
      if (/get\s+nodes/.test(subcmd)) {
        setHistory((h) => [
          ...h,
          `${prompt(cwd)} ${cmd}`,
          `NAME         STATUS   ROLES    AGE   VERSION
axjns-node   Ready    master   2d    v1.30.0
`]);
        return;
      }
      setHistory((h) => [
        ...h,
        `${prompt(cwd)} ${cmd}`,
        `kubectl: unknown or unsupported command\nTry 'kubectl get pods -A' or 'kubectl get nodes'`
      ]);
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

  // Vim key handler
  const handleVimKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!vimSession) return;
    if (vimSession.mode === 'insert') {
      if (e.key === 'Escape') {
        setVimSession({ ...vimSession, mode: 'normal' });
        e.preventDefault();
        return;
      }
      if (e.key === 'Backspace') {
        setVimSession((vs) => {
          if (!vs) return vs;
          const buf = [...vs.buffer];
          buf[buf.length - 1] = buf[buf.length - 1].slice(0, -1);
          return { ...vs, buffer: buf };
        });
        e.preventDefault();
        return;
      }
      if (e.key === 'Enter') {
        setVimSession((vs) => {
          if (!vs) return vs;
          return { ...vs, buffer: [...vs.buffer, ''] };
        });
        e.preventDefault();
        return;
      }
      // Add character
      if (e.key.length === 1) {
        setVimSession((vs) => {
          if (!vs) return vs;
          const buf = [...vs.buffer];
          buf[buf.length - 1] += e.key;
          return { ...vs, buffer: buf };
        });
        e.preventDefault();
        return;
      }
      return;
    }
    if (vimSession.mode === 'normal') {
      if (e.key === 'i') {
        setVimSession({ ...vimSession, mode: 'insert' });
        e.preventDefault();
        return;
      }
      if (e.key === ':') {
        setVimSession({ ...vimSession, mode: 'command', command: '' });
        e.preventDefault();
        return;
      }
      return;
    }
    if (vimSession.mode === 'command') {
      if (e.key === 'Enter') {
        if (vimSession.command === 'q' || vimSession.command === 'wq') {
          setVimSession(null);
          setHistory((h) => [...h, 'Exited vim.']);
        } else {
          setVimSession({ ...vimSession, mode: 'normal', command: '' });
        }
        e.preventDefault();
        return;
      }
      if (e.key === 'Backspace') {
        setVimSession((vs) => {
          if (!vs) return vs;
          return { ...vs, command: vs.command.slice(0, -1) };
        });
        e.preventDefault();
        return;
      }
      if (e.key.length === 1) {
        setVimSession((vs) => {
          if (!vs) return vs;
          return { ...vs, command: vs.command + e.key };
        });
        e.preventDefault();
        return;
      }
      return;
    }
  };

  return (
    <html lang="en">
      <body className="bg-black text-green-400 font-mono min-h-screen relative antialiased overflow-x-hidden">
        {/* Matrix rain animation backdrop */}
        <div id="matrix-rain" className="fixed inset-0 z-0 pointer-events-none" aria-hidden></div>
        <div className="flex flex-col items-center min-h-screen">
          <div className="w-full max-w-4xl mt-8 border border-green-800 bg-black/95 rounded shadow-lg relative z-10">
            {vimSession ? (
              <div
                ref={vimRef}
                tabIndex={0}
                className="p-6 whitespace-pre-wrap break-words text-green-400 font-mono text-base min-h-[60vh] outline-none"
                style={{ minHeight: '60vh', background: '#111' }}
                onKeyDown={handleVimKeyDown}
                autoFocus
              >
                {vimSession.buffer.map((line, i) => (
                  <div key={i}>{line === '' ? '~' : line}</div>
                ))}
                <div className="text-green-300">{vimSession.mode === 'command' ? ':' + vimSession.command : ''}</div>
                <div className="mt-4 text-green-500">
                  -- {vimSession.mode === 'insert' ? 'INSERT' : vimSession.mode === 'command' ? 'COMMAND' : 'NORMAL'} --
                  <span className="ml-4">{vimSession.filename}</span>
                </div>
                <div className="mt-2 text-green-600 text-xs">
                  (vim: i = insert, Esc = normal, :q or :wq = quit, type to edit)
                </div>
                <div className="mt-2 text-green-400 text-xs">
                  VIM - Vi IMproved<br />Welcome to vim!<br />Editing session (not saved)
                </div>
              </div>
            ) : (
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
            )}
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
      </body>
    </html>
  );
}
