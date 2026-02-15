// Enhanced layout with fixed filesystem consistency and more features
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

const EASTER_EGGS: Record<string, string | ((arg?: string) => string)> = {
  ls: "about  blog  cv  speaking  README.md",
  top: `top - 00:00:01 up 1 day,  1 user,  load average: 0.00, 0.01, 0.05\nTasks: 1 total, 1 running, 0 sleeping, 0 stopped, 0 zombie\n%Cpu(s): 0.7 us, 0.3 sy, 0.0 ni, 99.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st\nMiB Mem :  16384.0 total,  12000.0 free,   2048.0 used,   1336.0 buff/cache\nPID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n  1 axjns     20   0   10000   3000   2000 R   0.7   0.1   0:00.01 axjns.dev\n 42 axjns     20   0   42424   1337   1337 S   0.0   0.0   0:00.00 cowsay\n 99 axjns     20   0   99999   4040   4040 S   0.0   0.0   0:00.00 fortune`,
  du: `4.0K    ./blog\n8.0K    ./cv\n16.0K   ./about\n32.0K   ./speaking\n42G     ./README.md\n1337G   .\nWow, that's a lot of disk usage!`,
  whoami: "axjns",
  uname: "Linux axjns.dev 6.14.11-300.fc42.x86_64 #1 SMP PREEMPT_DYNAMIC",
  hostname: "axjns.dev",
  uptime: " 19:42:00 up 42 days, 13:37,  1 user,  load average: 0.00, 0.01, 0.05",
  ps: `  PID TTY          TIME CMD\n    1 pts/0    00:00:01 axjns.dev\n  222 pts/0    00:00:00 bash\n  333 pts/0    00:00:00 cowsay\n  444 pts/0    00:00:00 fortune`,
  pwd: "/home/axjns",
  date: () => new Date().toString(),
  fortune: "You will deploy to production on a Friday.",
  cowsay: ` ____________\n< axjns.dev >\n ------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`,
  make: "make: *** No targets specified and no makefile found.  Stop.",
  sudo: "We trust you have received the usual lecture from the local System Administrator.",
  finger: "Login: axjns\t\t\t\tName: Alex Jones\nDirectory: /home/axjns\t\t\tShell: /bin/bash\nLast login: " + new Date().toLocaleString() + "\nNo mail.\nNo Plan.",
  figlet: (text?: string) => {
    // Simple ASCII art - in a real implementation this would generate art from text
    // For now, just show the text with some ASCII styling
    const msg = text || "axjns.dev";
    return `\n  __ ___  __(_)_ __  ___   __| | _____   __\n / _\` \\ \\/ / | '_ \\/ __| / _\` |/ _ \\ \\ / /\n| (_| |>  <| | | | \\__ \\| (_| |  __/\\ V / \n \\__,_/_/\\_\\_|_| |_|___(_)__,_|\\___| \\_/  \n\n        ${msg}\n`;
  },
  sl: `                    (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O\n               (@@@)\n           (    )\n        (@@@@)\n     (   )\n\n   ====        ________                ___________\n_D _|  |_______/        \\__I_I_____===__|_________|\n |(_)---  |   H\\________/ |   |        =|___ ___|      _________________\n /     |  |   H  |  |     |   |         ||_| |_||     _|                \\_____A\n|      |  |   H  |__--------------------| [___] |   =|                        |\n| ________|___H__/__|_____/[][]~\\_______|       |   -|                        |\n|/ |   |-----------I_____I [][] []  D   |=======|____|________________________|_\n__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y___________|__|__________________________|_\n |/-=|___|=O=====O=====O=====O   |_____/~\\___/          |_D__D__D_|  |_D__D__D_|\n  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/               \\_/   \\_/    \\_/   \\_/\n\nYou typed 'sl' instead of 'ls'! Here's a train.`,
  ping: (host?: string) => {
    const target = host || "google.com";
    return `PING ${target} (142.250.185.78) 56(84) bytes of data.\n64 bytes from lhr25s34-in-f14.1e100.net (142.250.185.78): icmp_seq=1 ttl=118 time=13.7 ms\n64 bytes from lhr25s34-in-f14.1e100.net (142.250.185.78): icmp_seq=2 ttl=118 time=12.3 ms\n64 bytes from lhr25s34-in-f14.1e100.net (142.250.185.78): icmp_seq=3 ttl=118 time=13.1 ms\n\n--- ${target} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 2003ms\nrtt min/avg/max/mdev = 12.3/13.0/13.7/0.6 ms`;
  },
  curl: (url?: string) => {
    const target = url || "https://axjns.dev";
    return `<!DOCTYPE html>\n<html>\n<head><title>axjns.dev</title></head>\n<body>\n<h1>Welcome to the fake web response!</h1>\n<p>This is not a real curl, but it feels real.</p>\n<p>Requested: ${target}</p>\n</body>\n</html>`;
  },
  free: `              total        used        free      shared  buff/cache   available\nMem:       16384Mi      2048Mi     12000Mi        64Mi      1336Mi     13800Mi\nSwap:       2048Mi         0Mi      2048Mi`,
  df: `Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1       1.3T  420G  900G  32% /\ntmpfs           8.0G  1.2M  8.0G   1% /tmp\n/dev/loop0      1.4M  1.4M     0 100% /mnt/floppy`,
};

// Complete filesystem structure
const FS: Record<string, string[]> = {
  '/': ['home', 'tmp', 'opt', 'bin', 'var', 'etc', 'proc'],
  '/home': ['axjns'],
  '/home/axjns': ['speaking', 'about', 'blog', 'cv', 'README.md', 'contact', 'projects', '.bash_history', '.ssh'],
  '/home/axjns/projects': ['k8sgpt', 'llmfit', 'secret-project'],
  '/home/axjns/projects/k8sgpt': ['README.md', 'main.go', 'go.mod'],
  '/home/axjns/projects/llmfit': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/secret-project': ['DO_NOT_READ.txt', 'todo.txt'],
  '/home/axjns/.ssh': ['id_rsa', 'id_rsa.pub', 'known_hosts', 'config'],
  '/tmp': ['.X11-unix', 'testfile.txt'],
  '/opt': ['coolapp', 'README.md'],
  '/bin': ['ls', 'cat', 'bash', 'sh', 'echo', 'top', 'ps', 'curl', 'ping'],
  '/var': ['log', 'tmp', 'www'],
  '/var/log': ['syslog', 'dmesg', 'auth.log', 'kern.log'],
  '/var/tmp': [],
  '/var/www': ['index.html'],
  '/etc': ['passwd', 'hosts', 'hostname', 'motd', 'fstab', 'resolv.conf'],
  '/proc': ['cpuinfo', 'meminfo', 'uptime', 'version'],
};

// Complete file content mappings
const FILE_CONTENT: Record<string, string> = {
  '/home/axjns/speaking': PAGE_OUTPUT['/speaking'],
  '/home/axjns/about': PAGE_OUTPUT['/about'],
  '/home/axjns/blog': PAGE_OUTPUT['/blog'],
  '/home/axjns/cv': PAGE_OUTPUT['/cv'],
  '/home/axjns/README.md': 'Welcome to the home directory of axjns!\n\nTry these commands:\n- cat about\n- cat cv\n- cat blog\n- cat speaking\n- cd projects\n- ls -la\n\nHave fun exploring!',
  '/home/axjns/contact': `Contact Alex Jones (axjns)\n--------------------------\nEmail: (see LinkedIn or GitHub)\nGitHub: https://github.com/AlexsJones\nLinkedIn: https://www.linkedin.com/in/jonesax/\nSessionize: https://sessionize.com/jonesax/\nYouTube: https://www.youtube.com/cloudnativeskunkworks`,
  '/home/axjns/.bash_history': `ls -la\ncd projects\ngit status\nkubectl get pods -A\nsudo rm -rf / --no-preserve-root\nhistory | grep oops\nmake sandwich\nsudo make sandwich\nvim important-config.yaml\nping google.com\ncurl https://axjns.dev\nexit`,
  '/home/axjns/projects/k8sgpt/README.md': '# k8sgpt\n\nAI-powered Kubernetes cluster analysis and troubleshooting.\n\n## Features\n- Automatic issue detection\n- AI-powered explanations\n- Integration with multiple LLM providers\n- Custom analyzers\n\nGitHub: https://github.com/k8sgpt-ai/k8sgpt',
  '/home/axjns/projects/k8sgpt/main.go': '// k8sgpt main entry point\npackage main\n\nimport (\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\tfmt.Println("k8sgpt - AI-powered K8s SRE")\n\t// ... implementation\n}',
  '/home/axjns/projects/k8sgpt/go.mod': 'module github.com/k8sgpt-ai/k8sgpt\n\ngo 1.24\n\nrequire (\n\tk8s.io/client-go v0.31.0\n\t// ... more dependencies\n)',
  '/home/axjns/projects/llmfit/README.md': '# llmfit\n\nA terminal tool that right-sizes LLM models to your system\'s RAM, CPU, and GPU.\n\n## Features\n- Hardware detection\n- Model compatibility database\n- Interactive TUI\n- CLI mode\n\nGitHub: https://github.com/AlexsJones/llmfit',
  '/home/axjns/projects/llmfit/main.rs': '// llmfit - Right-size LLMs to your hardware\nuse std::io;\n\nfn main() {\n    println!("llmfit - LLM Hardware Compatibility");\n    // ... implementation\n}',
  '/home/axjns/projects/llmfit/Cargo.toml': '[package]\nname = "llmfit"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nsysinfo = "0.30"\ntermion = "3.0"',
  '/home/axjns/projects/secret-project/DO_NOT_READ.txt': '⚠️  TOP SECRET ⚠️\n\nThis is the secret project.\n\nIt will change everything.\n\n...\n\nJust kidding. It\'s a todo app.\n\nFeatures:\n- [ ] Add tasks\n- [ ] Complete tasks\n- [ ] Delete tasks\n- [ ] Procrastinate\n\n(The last feature is done!)',
  '/home/axjns/projects/secret-project/todo.txt': 'TODO:\n- Deploy to production on a Friday ✅\n- Write unit tests (someday)\n- Fix that one bug\n- Refactor everything\n- ???\n- Profit',
  '/home/axjns/.ssh/id_rsa': '-----BEGIN OPENSSH PRIVATE KEY-----\nb3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAA\n(This is a fake SSH key. Nice try though!)\n-----END OPENSSH PRIVATE KEY-----',
  '/home/axjns/.ssh/id_rsa.pub': 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFaKeYrBjAXmHzPqP6tEWdQhR7d2J3BvVqFk4LgH7Vyp axjns@axjns.dev',
  '/home/axjns/.ssh/known_hosts': 'github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl\nbitbucket.org ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIazEu89wgQZ4bqs3d63QSMzYVa0MuJ2e2gKTKqu+UUO',
  '/home/axjns/.ssh/config': 'Host github.com\n\tHostName github.com\n\tUser git\n\tIdentityFile ~/.ssh/id_rsa\n\nHost *\n\tServerAliveInterval 60',
  '/tmp/testfile.txt': 'This is a test file in /tmp.\n\nYou can edit it if you want.\n\nOr not. It\'s just a fake file.',
  '/opt/coolapp': '#!/bin/bash\n# CoolApp v1.0\n\necho "██████╗ ██████╗  ██████╗ ██╗     "\necho "██╔════╝██╔═══██╗██╔═══██╗██║     "\necho "██║     ██║   ██║██║   ██║██║     "\necho "██║     ██║   ██║██║   ██║██║     "\necho "╚██████╗╚██████╔╝╚██████╔╝███████╗"\necho " ╚═════╝ ╚═════╝  ╚═════╝ ╚══════╝"\necho ""\necho "CoolApp v1.0 - Does nothing, but looks good doing it"\necho ""\necho "Usage: coolapp [--awesome]"\necho ""\n[ "$1" = "--awesome" ] && echo "🎉 MAXIMUM COOLNESS ACHIEVED 🎉"',
  '/opt/README.md': '# /opt Directory\n\nWelcome to /opt!\n\nThis is where optional software lives.\n\nTry:\n- cat coolapp\n- bash coolapp\n- bash coolapp --awesome',
  '/var/log/syslog': '[  0.000000] Booting axjns.dev kernel...\n[  0.000001] All systems nominal.\n[  0.420000] Starting network services...\n[  0.690000] Mounted /home/axjns\n[ 42.000000] User tried to cat /var/log/syslog. Success!',
  '/var/log/dmesg': '[    0.000000] Linux version 6.14.11-300.fc42.x86_64\n[    0.000001] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro\n[    0.001000] axjns.dev: The Matrix has you.\n[    1.337000] All your base are belong to us.',
  '/var/log/auth.log': 'Feb 15 19:42:00 axjns sshd[1337]: Accepted password for axjns from 127.0.0.1 port 1337 ssh2\nFeb 15 19:42:01 axjns sudo:    axjns : TTY=pts/0 ; PWD=/home/axjns ; USER=root ; COMMAND=/usr/bin/make sandwich',
  '/var/log/kern.log': '[  0.000000] Kernel logging (proc) started\n[  0.001000] Memory: 16384M\n[  0.420000] CPU: Intel(R) Hacker i9-1337K\n[  1.337000] Entropy: maximum',
  '/var/www/index.html': '<!DOCTYPE html>\n<html>\n<head>\n\t<title>axjns.dev - Alex Jones</title>\n\t<meta charset="utf-8">\n</head>\n<body>\n\t<h1>Welcome to axjns.dev</h1>\n\t<p>This is the fake web root. The real site is a terminal interface!</p>\n</body>\n</html>',
  '/etc/motd': 'Welcome to axjns.dev!\n\nHack the planet. Deploy on Fridays.\n\n"The cloud is just someone else\'s computer."',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\naxjns:x:1000:1000:Alex Jones:/home/axjns:/bin/bash\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin',
  '/etc/hosts': '127.0.0.1\tlocalhost\n127.0.1.1\taxjns.dev\n::1\t\tlocalhost ip6-localhost ip6-loopback',
  '/etc/hostname': 'axjns.dev',
  '/etc/fstab': '# /etc/fstab: static file system information\n/dev/sda1  /      ext4  defaults  0  1\ntmpfs      /tmp   tmpfs defaults  0  0',
  '/etc/resolv.conf': 'nameserver 1.1.1.1\nnameserver 8.8.8.8\nsearch axjns.dev',
  '/proc/cpuinfo': 'processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\nmodel\t\t: 142\nmodel name\t: Intel(R) Hacker i9-1337K CPU @ 4.20GHz\ncore id\t\t: 0\ncpu cores\t: 8',
  '/proc/meminfo': 'MemTotal:       16777216 kB\nMemFree:        12582912 kB\nMemAvailable:   14155776 kB\nBuffers:          524288 kB\nCached:          1048576 kB',
  '/proc/uptime': '3704640.00 14745600.00',
  '/proc/version': 'Linux version 6.14.11-300.fc42.x86_64 (axjns@axjns.dev) (gcc (GCC) 13.2.1) #1 SMP PREEMPT_DYNAMIC',
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

// Check if path is a file (has content) vs directory (in FS)
function isFile(path: string): boolean {
  return FILE_CONTENT.hasOwnProperty(path);
}

function isDirectory(path: string): boolean {
  return FS.hasOwnProperty(path);
}

// Get autocomplete suggestions
function getCompletions(input: string, cwd: string): string[] {
  const parts = input.split(' ');
  const lastPart = parts[parts.length - 1];
  
  // Command completion
  if (parts.length === 1) {
    const allCommands = [...Object.keys(COMMANDS), ...Object.keys(EASTER_EGGS), 'cd', 'ls', 'pwd', 'cat', 'note', 'guestbook', 'theme', 'history', 'hack', 'sudo', 'make', 'sl', 'figlet', 'banner', 'ping', 'curl', 'wget', 'free', 'df', 'finger', 'uptime', 'hostname'];
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

    // New commands with arguments
    if (base === 'figlet' || base === 'banner') {
      const figletFn = EASTER_EGGS.figlet;
      const output = typeof figletFn === 'function' ? figletFn(arg) : figletFn;
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, output]);
      return;
    }

    if (base === 'ping') {
      const pingFn = EASTER_EGGS.ping;
      const output = typeof pingFn === 'function' ? pingFn(arg) : pingFn;
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, output]);
      return;
    }

    if (base === 'curl' || base === 'wget') {
      const curlFn = EASTER_EGGS.curl;
      const output = typeof curlFn === 'function' ? curlFn(arg) : curlFn;
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, output]);
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
      const target = resolvePath(cwd, arg || '.');
      if (isDirectory(target)) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, FS[target].join('  ') || '']);
      } else if (isFile(target)) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `ls: ${arg}: Not a directory`]);
      } else {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `ls: cannot access '${arg}': No such file or directory`]);
      }
      return;
    }

    if (base === 'cd') {
      if (!arg) {
        setCwd('/home/axjns');
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-cwd', '/home/axjns');
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd]);
        return;
      }
      const target = resolvePath(cwd, arg);
      if (isDirectory(target)) {
        setCwd(target);
        if (typeof window !== 'undefined') {
          localStorage.setItem('axjns-cwd', target);
        }
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd]);
      } else if (isFile(target)) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `cd: ${arg}: Not a directory`]);
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
      if (!arg) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, 'Usage: cat <file>']);
        return;
      }
      const target = arg.startsWith('/') ? arg : (cwd === '/' ? '/' + arg : cwd + '/' + arg);
      if (isFile(target)) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, FILE_CONTENT[target]]);
      } else if (isDirectory(target)) {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `cat: ${arg}: Is a directory`]);
      } else {
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd, `cat: ${arg}: No such file or directory`]);
      }
      return;
    }

    // SSH/sudo GIF trigger
    if (base === 'ssh' || (base === 'sudo' && !arg) || (base === 'rm' && /-rf/.test(cmd))) {
      setShowGif(true);
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, String(EASTER_EGGS['ssh'])]);
      return;
    }

    // Easter eggs
    const lower = command.toLowerCase();
    if (EASTER_EGGS[lower]) {
      const egg = EASTER_EGGS[lower];
      setHistory(h => [...h, prompt(cwd) + ' ' + cmd, typeof egg === "function" ? egg() : egg]);
      return;
    }

    // Simple easter eggs that work as base commands
    if (EASTER_EGGS[base]) {
      const egg = EASTER_EGGS[base];
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
        "System: top, ps, free, df, uptime, whoami, uname, finger",
        "Network: ping, curl, wget",
        "Fun: hack, make sandwich, cowsay, fortune, sl, figlet, banner",
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
          setInput(parts.join(' ') + ' ');
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
