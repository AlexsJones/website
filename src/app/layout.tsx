// Enhanced layout with boot sequence, theme switcher, notes, tab completion, history, and guestbook
"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import Image from 'next/image';

// Theme definitions
const THEMES = {
  matrix: { bg: 'bg-black', text: 'text-green-400', prompt: 'text-green-300', cursor: 'bg-green-400', name: 'Matrix' },
  amber: { bg: 'bg-black', text: 'text-amber-500', prompt: 'text-amber-400', cursor: 'bg-amber-500', name: 'Amber' },
  blue: { bg: 'bg-blue-950', text: 'text-blue-300', prompt: 'text-blue-200', cursor: 'bg-blue-300', name: 'IBM Blue' },
  hacker: { bg: 'bg-black', text: 'text-lime-400', prompt: 'text-lime-300', cursor: 'bg-lime-400', name: 'Hacker' },
  cyberpunk: { bg: 'bg-purple-950', text: 'text-pink-400', prompt: 'text-cyan-400', cursor: 'bg-pink-400', name: 'Cyberpunk' },
};

interface Note {
  id: number;
  text: string;
  timestamp: string;
}

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  timestamp: string;
}

function BlinkingCursor({ theme }: { theme: string }) {
  const themeConfig = THEMES[theme as keyof typeof THEMES] || THEMES.matrix;
  return <span className={`inline-block w-2 h-5 ${themeConfig.cursor} align-bottom animate-blink ml-1`} style={{animation: 'blink 1s steps(2, start) infinite'}}></span>;
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
  whoami: "axjns",
  uname: "Linux axjns.dev 6.14.11-300.fc42.x86_64 #1 SMP PREEMPT_DYNAMIC",
  ps: `  PID TTY          TIME CMD\n    1 pts/0    00:00:01 axjns.dev\n  222 pts/0    00:00:00 bash\n  333 pts/0    00:00:00 cowsay\n  444 pts/0    00:00:00 fortune`,
  pwd: "/home/axjns",
  date: () => new Date().toString(),
  fortune: "You will deploy to production on a Friday.",
  cowsay: ` ____________\n< axjns.dev >\n ------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`,
  make: "make: *** No targets specified and no makefile found.  Stop.",
  sudo: "We trust you have received the usual lecture from the local System Administrator.",
};

// Simulated filesystem
const FS: Record<string, string[]> = {
  '/': ['home', 'tmp', 'opt', 'bin', 'var', 'etc'],
  '/home': ['axjns'],
  '/home/axjns': ['speaking', 'about', 'blog', 'cv', 'README.md', 'contact', 'projects', '.bash_history'],
  '/home/axjns/projects': ['k8sgpt', 'llmfit', 'secret-project'],
  '/blog': [],
  '/cv': [],
  '/about': [],
  '/speaking': [],
  '/tmp': ['.X11-unix', 'testfile.txt'],
  '/opt': ['coolapp', 'README.md'],
  '/bin': ['ls', 'cat', 'bash', 'sh', 'echo', 'top', 'ps'],
  '/var': ['log', 'tmp', 'www'],
  '/var/log': ['syslog', 'dmesg', 'auth.log'],
  '/etc': ['passwd', 'hosts', 'hostname', 'motd'],
};

const FILE_CONTENT: Record<string, string> = {
  '/home/axjns/speaking': PAGE_OUTPUT['/speaking'],
  '/home/axjns/about': PAGE_OUTPUT['/about'],
  '/home/axjns/blog': PAGE_OUTPUT['/blog'],
  '/home/axjns/cv': PAGE_OUTPUT['/cv'],
  '/home/axjns/README.md': 'Welcome to the home directory of axjns! Try cat about, cat cv, cat blog, cat speaking.',
  '/home/axjns/contact': `Contact Alex Jones (axjns)\n--------------------------\nEmail: (see LinkedIn or GitHub)\nGitHub: https://github.com/AlexsJones\nLinkedIn: https://www.linkedin.com/in/jonesax/\nSessionize: https://sessionize.com/jonesax/`,
  '/home/axjns/.bash_history': `ls -la\ncd projects\ngit status\nkubectl get pods\nsudo rm -rf / --no-preserve-root\nhistory | grep oops\nmake sandwich\nsudo make sandwich\nvim important-config.yaml\nexit`,
  '/home/axjns/projects/k8sgpt': 'k8sgpt - AI-powered Kubernetes cluster analysis\nGitHub: https://github.com/k8sgpt-ai/k8sgpt',
  '/home/axjns/projects/llmfit': 'llmfit - Right-size LLMs to your hardware\nGitHub: https://github.com/AlexsJones/llmfit',
  '/home/axjns/projects/secret-project': 'DO_NOT_READ.txt:\n\nThis is the secret project.\n\nIt will change everything.\n\nJust kidding. It\'s a todo app.',
  '/etc/motd': 'Welcome to axjns.dev! Hack the planet.',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\naxjns:x:1000:1000:Alex Jones:/home/axjns:/bin/bash',
  '/etc/hosts': '127.0.0.1\tlocalhost\n::1\tlocalhost',
  '/etc/hostname': 'axjns.dev',
  '/var/log/syslog': '[  0.000000] Booting axjns.dev kernel...\n[  0.000001] All systems nominal.\n[ 42.000000] User tried to cat /var/log/syslog. Success!',
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

// Get autocomplete suggestions
function getCompletions(input: string, cwd: string): string[] {
  const parts = input.split(' ');
  const lastPart = parts[parts.length - 1];
  
  // Command completion
  if (parts.length === 1) {
    const allCommands = [...Object.keys(COMMANDS), ...Object.keys(EASTER_EGGS), 'cd', 'ls', 'pwd', 'cat', 'note', 'guestbook', 'theme', 'history', 'hack', 'sudo', 'make'];
    return allCommands.filter(cmd => cmd.startsWith(lastPart)).sort();
  }
  
  // File/directory completion
  const cmd = parts[0];
  if (cmd === 'cd' || cmd === 'cat' || cmd === 'ls') {
    const target = lastPart.startsWith('/') ? lastPart : cwd === '/' ? '/' + lastPart : cwd + '/' + lastPart;
    const dir = target.includes('/') ? target.substring(0, target.lastIndexOf('/')) || '/' : cwd;
    const prefix = target.includes('/') ? target.substring(target.lastIndexOf('/') + 1) : lastPart;
    
    if (FS[dir]) {
      return FS[dir].filter(item => item.startsWith(prefix)).map(item => {
        const fullPath = dir === '/' ? '/' + item : dir + '/' + item;
        return lastPart.startsWith('/') ? fullPath : item;
      });
    }
  }
  
  return [];
}

export default function RootLayout() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cwd, setCwd] = useState<string>("/home/axjns");
  const [showGif, setShowGif] = useState(false);
  const [theme, setTheme] = useState<string>('matrix');
  const [notes, setNotes] = useState<Note[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = React.useRef(pathname);

  const themeConfig = THEMES[theme as keyof typeof THEMES] || THEMES.matrix;

  // Load persisted data
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('axjns-theme');
      if (savedTheme) setTheme(savedTheme);
      
      const savedNotes = localStorage.getItem('axjns-notes');
      if (savedNotes) setNotes(JSON.parse(savedNotes));
      
      const savedGuestbook = localStorage.getItem('axjns-guestbook');
      if (savedGuestbook) setGuestbook(JSON.parse(savedGuestbook));
      
      const savedHistory = localStorage.getItem('axjns-history');
      if (savedHistory) setCommandHistory(JSON.parse(savedHistory));
      
      const savedCwd = localStorage.getItem('axjns-cwd');
      if (savedCwd) setCwd(savedCwd);
    }
  }, []);

  // Save theme
  useEffect(() => {
    if (typeof window !== 'undefined' && bootComplete) {
      localStorage.setItem('axjns-theme', theme);
    }
  }, [theme, bootComplete]);

  // Boot sequence
  useEffect(() => {
    const bootSeq = [
      'BIOS v69.420 (C) 2024 axjns Corp.',
      '',
      'Booting axjns.dev...',
      '[ OK ] Started Matrix Rain Service',
      '[ OK ] Started Cowsay Daemon',
      '[ OK ] Mounted /home/axjns',
      '[ OK ] Started Note Manager',
      '[ OK ] Started Guestbook Service',
      '[ OK ] Reached target Multi-User System',
      '',
      'axjns.dev login: axjns',
      'Password: ',
      'Last login: ' + new Date().toLocaleString(),
      '',
      FILE_CONTENT['/etc/motd'],
      '',
      PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"],
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSeq.length) {
        setBootMessages(prev => [...prev, bootSeq[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setBootComplete(true), 500);
      }
    }, 150);
    
    return () => clearInterval(interval);
  }, []);

  // Matrix rain (only for matrix and hacker themes)
  useEffect(() => {
    if (!bootComplete) return;
    if (theme !== 'matrix' && theme !== 'hacker') return;
    
    const matrixRain = document.getElementById('matrix-rain');
    if (!matrixRain) return;
    
    const oldCanvas = document.getElementById('matrix-canvas');
    if (oldCanvas) oldCanvas.remove();
    
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    canvas.style.cssText = 'position:absolute;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0';
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
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = theme === 'hacker' ? '#CCFF00' : '#39FF14';
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
  }, [theme, bootComplete]);

  const handleCommand = (cmd: string) => {
    setShowGif(false);
    setTabCompletions([]);
    setTabIndex(0);
    
    const command = cmd.trim();
    if (!command) return;
    
    // Save to command history
    const newHistory = [...commandHistory, command];
    setCommandHistory(newHistory);
    setHistoryIndex(-1);
    if (typeof window !== 'undefined') {
      localStorage.setItem('axjns-history', JSON.stringify(newHistory));
    }
    
    const [base, ...args] = command.split(/\s+/);
    const arg = args.join(' ');

    // Theme command
    if (base === 'theme') {
      if (!arg) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Available themes: matrix, amber, blue, hacker, cyberpunk', 'Current: ' + theme]);
        return;
      }
      if (THEMES[arg as keyof typeof THEMES]) {
        setTheme(arg);
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `Theme changed to: ${THEMES[arg as keyof typeof THEMES].name}`]);
        return;
      }
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Unknown theme. Try: theme']);
      return;
    }

    // Note system
    if (base === 'note') {
      const subcmd = args[0];
      if (subcmd === 'add') {
        const text = args.slice(1).join(' ');
        if (!text) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: note add "your note text"']);
          return;
        }
        const note: Note = { id: Date.now(), text, timestamp: new Date().toLocaleString() };
        const newNotes = [...notes, note];
        setNotes(newNotes);
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-notes', JSON.stringify(newNotes));
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `Note added (id: ${note.id})`]);
        return;
      }
      if (subcmd === 'list' || !subcmd) {
        if (notes.length === 0) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'No notes yet. Use: note add "text"']);
        } else {
          const noteList = notes.map(n => `[${n.id}] ${n.timestamp}\n${n.text}`).join('\n\n');
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, noteList]);
        }
        return;
      }
      if (subcmd === 'rm') {
        const id = parseInt(args[1]);
        if (!id) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: note rm <id>']);
          return;
        }
        const newNotes = notes.filter(n => n.id !== id);
        setNotes(newNotes);
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-notes', JSON.stringify(newNotes));
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `Note ${id} deleted`]);
        return;
      }
      const id = parseInt(subcmd);
      if (id) {
        const note = notes.find(n => n.id === id);
        if (note) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `[${note.id}] ${note.timestamp}\n${note.text}`]);
        } else {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `Note ${id} not found`]);
        }
        return;
      }
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: note [add|list|rm] or note <id>']);
      return;
    }

    // Guestbook
    if (base === 'guestbook') {
      const subcmd = args[0];
      if (subcmd === 'sign') {
        const name = args[1];
        const message = args.slice(2).join(' ');
        if (!name || !message) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: guestbook sign <your-name> <message>']);
          return;
        }
        const entry: GuestbookEntry = { id: Date.now(), name, message, timestamp: new Date().toLocaleString() };
        const newGuestbook = [...guestbook, entry];
        setGuestbook(newGuestbook);
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-guestbook', JSON.stringify(newGuestbook));
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `Thank you for signing, ${name}!`]);
        return;
      }
      if (subcmd === 'read' || !subcmd) {
        if (guestbook.length === 0) {
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Guestbook is empty. Be the first!\nUsage: guestbook sign <name> <message>']);
        } else {
          const entries = guestbook.map(e => `[${e.timestamp}] ${e.name}:\n${e.message}`).join('\n\n');
          setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `=== Guestbook (${guestbook.length} entries) ===\n\n${entries}`]);
        }
        return;
      }
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: guestbook [sign|read]']);
      return;
    }

    // History command
    if (base === 'history') {
      if (commandHistory.length === 0) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'No history yet']);
      } else {
        const histList = commandHistory.map((c, i) => `${i + 1}  ${c}`).join('\n');
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, histList]);
      }
      return;
    }

    // Hack easter egg
    if (base === 'hack') {
      const hackingMsg = [
        'Initializing hack...',
        'Connecting to mainframe...',
        'Bypassing firewall...',
        'Downloading database...',
        'Cracking encryption...',
        'Access granted!',
        '',
        'Just kidding. This is a website.',
      ].join('\n');
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, hackingMsg]);
      return;
    }

    // Make sandwich easter eggs
    if (command === 'make sandwich') {
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'What? Make it yourself.']);
      return;
    }
    if (command === 'sudo make sandwich') {
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Okay.']);
      return;
    }

    // Filesystem commands
    if (base === 'ls') {
      const target = resolvePath(cwd, arg);
      if (FS[target as keyof typeof FS]) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, FS[target as keyof typeof FS].join('  ') || '']);
      } else {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `ls: cannot access '${arg}': No such file or directory`]);
      }
      return;
    }

    if (base === 'cd') {
      const target = resolvePath(cwd, arg);
      if (FS[target as keyof typeof FS]) {
        setCwd(target);
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-cwd', target);
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd]);
      } else {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `cd: no such file or directory: ${arg}`]);
      }
      return;
    }

    if (base === 'pwd') {
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, cwd]);
      return;
    }

    if (base === 'cat') {
      let target = arg;
      if (!target.startsWith('/')) {
        target = cwd === '/' ? '/' + arg : cwd + '/' + arg;
      }
      if (FILE_CONTENT[target]) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, FILE_CONTENT[target]]);
      } else {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `cat: ${arg}: No such file or directory`]);
      }
      return;
    }

    // SSH/sudo GIF trigger
    if (base === 'ssh' || base === 'sudo' || (base === 'rm' && /-rf/.test(cmd))) {
      setShowGif(true);
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, EASTER_EGGS['ssh'] as string]);
      return;
    }

    // Easter eggs
    const lower = command.toLowerCase();
    if (EASTER_EGGS[lower]) {
      const egg = EASTER_EGGS[lower];
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, typeof egg === "function" ? egg() : egg]);
      return;
    }

    // Navigation commands
    if (COMMANDS[lower as keyof typeof COMMANDS] && typeof COMMANDS[lower as keyof typeof COMMANDS] === "string") {
      router.push(COMMANDS[lower as keyof typeof COMMANDS]!);
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd]);
      return;
    }

    if (lower === "help") {
      setHistory(h => [
        ...h,
        prompt(cwd) + ' ' + cmd,
        "Available commands:",
        "Navigation: home, about, speaking, blog, cv",
        "Files: ls, cd, pwd, cat",
        "Tools: note, guestbook, theme, history, clear",
        "Fun: hack, make sandwich, cowsay, fortune, neofetch, top, ps",
      ]);
      return;
    }

    if (lower === "clear") {
      setHistory([]);
      return;
    }

    setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `command not found: ${cmd}`]);
  };

  function prompt(dir: string) {
    return `axjns@dev:${dir}$`;
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setTabCompletions([]);
      setTabIndex(0);
      return;
    }

    // Command history navigation
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
      return;
    }

    // Tab completion
    if (e.key === "Tab") {
      e.preventDefault();
      
      if (tabCompletions.length === 0) {
        const completions = getCompletions(input, cwd);
        if (completions.length === 0) return;
        
        if (completions.length === 1) {
          // Auto-complete
          const parts = input.split(' ');
          parts[parts.length - 1] = completions[0];
          setInput(parts.join(' '));
        } else {
          // Show options and set up cycling
          setTabCompletions(completions);
          setTabIndex(0);
          setHistory(h => [...h, prompt(cwd) + ' ' + input, completions.join('  ')]);
        }
      } else {
        // Cycle through completions
        const newIndex = (tabIndex + 1) % tabCompletions.length;
        setTabIndex(newIndex);
        const parts = input.split(' ');
        parts[parts.length - 1] = tabCompletions[newIndex];
        setInput(parts.join(' '));
      }
      return;
    }

    // Clear tab completions on any other key
    if (tabCompletions.length > 0) {
      setTabCompletions([]);
      setTabIndex(0);
    }
  };

  if (!bootComplete) {
    return (
      <html lang="en">
        <body className={`${themeConfig.bg} ${themeConfig.text} font-mono min-h-screen`}>
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-4xl p-6">
              {bootMessages.map((msg, i) => (
                <div key={i} className="whitespace-pre-wrap">{msg}</div>
              ))}
              <BlinkingCursor theme={theme} />
            </div>
          </div>
          <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${themeConfig.bg} ${themeConfig.text} font-mono min-h-screen relative antialiased overflow-x-hidden`}>
        <div id="matrix-rain" className="fixed inset-0 z-0 pointer-events-none" aria-hidden></div>
        <div className="flex flex-col items-center min-h-screen">
          <div className={`w-full max-w-4xl mt-8 border ${themeConfig.text} border-opacity-30 ${themeConfig.bg} bg-opacity-95 rounded shadow-lg relative z-10`}>
            <div className="p-6 whitespace-pre-wrap break-words font-mono text-base min-h-[60vh]" onClick={() => inputRef.current && inputRef.current.focus()}>
              {history.map((line, i) => (
                <div key={i} className="break-words whitespace-pre-wrap">{line}</div>
              ))}
              <div className="flex items-center">
                <span className={themeConfig.prompt}>{prompt(cwd)}</span>
                <input
                  ref={inputRef}
                  className={`bg-transparent border-none outline-none ${themeConfig.text} font-mono ml-2 flex-1`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                  spellCheck={false}
                />
                <BlinkingCursor theme={theme} />
              </div>
            </div>
            {showGif && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/60" style={{cursor:'pointer'}} onClick={() => setShowGif(false)}>
                <Image
                  src="/img/you-didnt-say-the-magic-word-ah-ah.gif"
                  alt="You didn't say the magic word!"
                  width={400}
                  height={300}
                  className="max-w-xs md:max-w-md lg:max-w-lg rounded shadow-2xl border-4 border-pink-600"
                />
              </div>
            )}
          </div>
        </div>
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </body>
    </html>
  );
}
