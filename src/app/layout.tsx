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

interface TerminalTab {
  id: number;
  title: string;
  history: string[];
  cwd: string;
  input: string;
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
  wget: (url?: string) => {
    const target = url || "https://axjns.dev";
    return `--2026-02-15 21:00:00--  ${target}\nResolving axjns.dev (axjns.dev)... 127.0.0.1\nConnecting to axjns.dev (axjns.dev)|127.0.0.1|:443... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 1337 (1.3K) [text/html]\nSaving to: 'index.html'\n\nindex.html     100%[========>]   1.31K  --.-KB/s    in 0s\n\n2026-02-15 21:00:00 (42.0 MB/s) - 'index.html' saved [1337/1337]`;
  },
  // Editor jokes
  vim: `Starting vim... 
Type :q! to exit. 
Just kidding, you can't. You're trapped forever.

Actually, you're not in vim. This is just a fake terminal.
Phew, that was close!`,
  emacs: `GNU Emacs 29.4 (build 1, x86_64-pc-linux-gnu)

Emacs: A great operating system, lacking only a decent editor.

Press C-x C-c to exit. But you're not actually in Emacs, so...

"The reasonable man adapts himself to the world: the unreasonable one persists
in trying to adapt the world to himself." - George Bernard Shaw

(Also applies to Emacs users)`,
  nano: `GNU nano 8.0                   fake-file.txt

nano: For people who can't handle vim or emacs.
Also the only sensible choice.

^X Exit  ^O Write Out  ^R Read File  ^Y Prev Page  ^K Cut Text  ^C Cur Pos
^W Where Is  ^V Next Page  ^U Paste Text  ^T To Spell  ^_ Go To Line

Just kidding, you're not actually in nano.
Type 'help' for available commands.`,
  vi: `Starting vi...

For vi help, type  :help<Enter>  or  <F1>
For on-line help, type  :help<Enter> or visit https://www.vim.org

                       (you're not actually in vi)

Type  :q!<Enter>  to abandon all hope of ever exiting.`,
  // System info
  neofetch: `                   -\`                 axjns@axjns.dev
                  .o+\`                 ----------------
                 \`ooo/                 OS: AxjnsOS™ x86_64
                \`+oooo:                Host: The Cloud
               \`+oooooo:               Kernel: 6.14.11-300.fc42.x86_64
               -+oooooo+:              Uptime: 42 days, 13 hours, 37 mins
             \`/:-:++oooo+:             Packages: 1337 (npm), 42 (cargo)
            \`/++++/+++++++:            Shell: bash 5.2.21
           \`/++++++++++++++:           Resolution: 3840x2160
          \`/+++ooooooooooooo/\`         DE: Terminal 
         ./ooosssso++osssssso+\`        WM: tmux
        .oossssso-\`\`\`\`/ossssss+\`       Theme: Matrix [GTK3]
       -osssssso.      :ssssssso.      Icons: Nerd Fonts
      :osssssss/        osssso+++.     Terminal: fake-terminal.tsx
     /ossssssss/        +ssssooo/-     CPU: Intel Hacker i9-1337K (8) @ 4.2GHz
   \`/ossssso+/:-        -:/+osssso+-   GPU: Nvidia RTX 9090 Ti SUPER ULTRA
  \`+sso+:-\`                 \`.-/+oso:  Memory: 2048MiB / 16384MiB`,
  screenfetch: `                          ./+o+-       axjns@axjns.dev
                  yyyyy- -yyyyyy+      OS: AxjnsOS (Based on Hacker)
               ://+//////-yo+/+oo/     Kernel: x86_64 Linux 6.14.11
           .++ .:/++++++/-.+sss/\`      Uptime: 42d 13h 37m
         .:++o:  /++++++++/:--:/-      Packages: 1337
        o:+o+:++.\`...\`\`\`.-/oo+++++/    Shell: bash
       .:+o:+o/.          \`+sssoo+/   Resolution: 3840x2160
  .++/+:+oo+o:\`             /sssooo.   DE: Terminal.tsx
 /+++//+:\`oo+o               /::--:.   WM: Screen
 \\+/+o+++\`o++o               ++////.   GTK Theme: Matrix [GTK3]
  .++.o+++oo+:\`             /dddhhh.   Icon Theme: Nerd Fonts
       .+.o+oo:.          \`oddhhhh+    Font: JetBrains Mono
        \\+.++o+o\`\`-\`\`\`\`.:ohdhhhhh+     CPU: Intel i9-1337K @ 8x 4.2GHz
         \`:o+++ \`ohhhhhhhhyo++os:      GPU: Nvidia RTX 9090 Ti SUPER
           .o:\`.syhhhhhhh/.oo++o\`      RAM: 2048MB / 16384MB`,
  w: `USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
axjns    pts/0    127.0.0.1        19:42    0.00s  0.01s  0.00s w
root     tty1     -                00:00   42days  0.00s  0.00s /bin/login`,
  who: `axjns    pts/0        2026-02-15 19:42 (127.0.0.1)
root     tty1         2026-01-04 00:00`,
  last: `axjns    pts/0        127.0.0.1        Sat Feb 15 19:42   still logged in
axjns    pts/0        127.0.0.1        Fri Feb 14 10:30 - 18:45  (08:15)
root     tty1                          Sat Jan  4 00:00   still logged in

wtmp begins Sat Jan  4 00:00:00 2026`,
  htop: `  1  [||||||||||||||||||||||||||||||||100.0%]   Tasks: 137, 420 thr; 1 running
  2  [||||||||||                           42.0%]   Load average: 0.00 0.01 0.05
  3  [||||||||                             13.7%]   Uptime: 42 days, 13:37:00
  4  [||                                    4.2%]
  5  [|                                     1.3%]   Mem[||||||||||||||    14.2G/16.0G]
  6  [                                      0.0%]   Swp[                  0K/2.00G]
  7  [                                      0.0%]
  8  [                                      0.0%]
  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
    1 axjns      20   0 10.0M  3.0M  2.0M R  0.7  0.1  0:00.01 axjns.dev
   42 axjns      20   0 42.4M  1.3M  1.3M S  0.0  0.0  0:00.00 cowsay
  420 axjns      20   0  1.3G  420M  69M S  0.0  2.5  4:20.00 firefox
 1337 axjns      20   0  2.4G  1.3G 800M S  0.0  8.0 13:37.00 chrome
 9001 axjns      20   0  100M   42M  10M S  0.0  0.3  0:42.00 ollama

F1Help F2Setup F3Search F4Filter F5Tree F6SortBy F7Nice F8Nice+ F9Kill F10Quit`,
  // Dangerous commands
  'rm -rf /': `⚠️  DANGER DETECTED ⚠️

You just tried to run:  rm -rf /

This would delete your entire system.

Fortunately, this is just a fake terminal in a web browser.
Nothing was harmed in the making of this joke.

Pro tip: Never run this command for real. Ever.

(Also, use 'trash' instead of 'rm' for safety.)`,
  ':(){ :|:& };:': `⚠️  FORK BOMB DETECTED ⚠️

This is a fork bomb. It would:
1. Define a function called ":"
2. That calls itself twice
3. In the background
4. Infinitely

Result: System crash due to process exhaustion.

Fortunately, this is a fake terminal.
Your browser tabs are safe... for now.`,
  'dd if=/dev/random of=/dev/sda': `⚠️  DISK DESTROYER DETECTED ⚠️

Command: dd if=/dev/random of=/dev/sda

This would overwrite your entire hard drive with random data.
Everything would be gone. Forever. No recovery.

Good thing this is just a web page!

Remember kids: With great power comes great responsibility.
(And dd has A LOT of power)`,
  // Package managers
  apt: `Reading package lists... Done
Building dependency tree... Done
Reading state information... Done

apt 2.7.14 (amd64)

Usage: apt [options] command

apt is the command-line package manager for Debian/Ubuntu.

Most used commands:
  list - list packages
  search - search in package descriptions
  show - show package details
  install - install packages
  remove - remove packages
  update - update list of available packages
  upgrade - upgrade the system by installing/upgrading packages
  full-upgrade - upgrade the system by removing/installing/upgrading packages

Try: apt moo`,
  'apt moo': `                 (__) 
                 (oo) 
           /------\\/ 
          / |    ||   
         *  /\\---/\\ 
            ~~   ~~   
..."Have you mooed today?"...`,
  yum: `Loaded plugins: fastestmirror, security

yum: To boldly install packages where no package manager has installed before.

Usage: yum [options] COMMAND

       install, update, remove, list packages, etc.

Have you tried 'dnf' instead? (You know, the NEXT generation package manager?)`,
  dnf: `DNF: The package manager so nice, they built it twice!

(Replacing yum since 2015... some people still use yum anyway)

Fedora/RHEL package manager. Like apt, but red instead of debian-shaped.

Usage: dnf [options] COMMAND

Most common: dnf install firefox (to read the documentation you should have read)`,
  brew: `Homebrew: The missing package manager for macOS (or Linux)!

🍺  brew: Because compiling from source is so 2005

Usage: brew [options] command

Common commands:
  install    Install formula
  uninstall  Uninstall formula  
  update     Fetch newest version of Homebrew
  upgrade    Upgrade outdated formulae
  search     Search for formulae
  info       Display information about a formula
  doctor     Check system for potential problems

Pro tip: Run 'brew doctor' and feel judged by your computer.
It always finds something wrong. Always.`,
  npm: `npm: Node Package Manager (or: Node's Probably Mad)

Current workspace has 1,337 packages with 42,000 dependencies.
(Mostly left-pad and is-odd)

Usage: npm <command>

Commands:
  install      Install a package
  uninstall    Remove a package
  update       Update packages
  run          Run a script
  test         Run tests (lol, tests)
  publish      Publish a package

Warning: npm install may cause:
- 300MB node_modules folder
- Existential crisis
- Security vulnerabilities  
- Success (rare)`,
  'npm install': `npm WARN deprecated everyone@1.0.0: Every package you've ever used
npm WARN deprecated left-pad@0.0.1: Please use left-pad2 instead
npm WARN deprecated is-odd@1.0.0: This package is no longer maintained

added 42000 packages, and audited 42001 packages in 5m

420 packages are looking for funding
  run \`npm fund\` for details

69 vulnerabilities (31 low, 20 moderate, 18 high, critical: over 9000)

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (breaking your app), run:
  npm audit fix --force

Good luck with that! 🦊`,
  // Development tools
  git: `usage: git [--version] [--help] [-C <path>] [--exec-path[=<path>]]
           [--html-path] [--man-path] [--info-path]
           [-p | --paginate | -P | --no-pager] [--no-replace-objects]
           [--bare] [--git-dir=<path>] [--work-tree=<path>]
           [--namespace=<name>] [--super-prefix=<path>]
           [--config-env=<name>=<envvar>] <command> [<args>]

Working tree clean, nothing to commit... wait, you're on a website.
There is no git repo here.

Try: git status, git push, git blame`,
  'git status': `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean

(This is a lie. There are always uncommitted changes.
 You just haven't found them yet.)`,
  'git push': `Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
Delta compression using up to 8 threads
Compressing objects: 100% (13/13), done.
Writing objects: 100% (37/37), 1.21 MiB | 420.00 KiB/s, done.
Total 37 (delta 7), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (7/7), done.
To github.com:axjns/fake-repo.git
   abc1234..def5678  main -> main

Push successful! Your code is now someone else's problem. 🚀`,
  'git commit': `Please tell me who you are.

Run
  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

Actually, there's no repo here. This is just a website.
But you get the idea!`,
  'git blame': `^abc1234 (Alex Jones 2024-01-15 13:37:00 +0000  1) // TODO: Fix this later
^abc1234 (Alex Jones 2024-01-15 13:37:01 +0000  2) // HACK: Don't judge me
def5678  (Alex Jones 2024-02-15 19:42:00 +0000  3) // I have no idea why this works
1337c0de (Alex Jones 2024-02-15 19:43:00 +0000  4) console.log("It just works™");

git blame: Making developers feel bad about their code since 2005.`,
  docker: `Docker: Because "works on my machine" is not good enough anymore.

Usage:  docker [OPTIONS] COMMAND

Commands:
  run         Run a command in a new container
  ps          List containers
  images      List images
  pull        Pull an image from a registry
  build       Build an image from a Dockerfile
  stop        Stop running containers
  rm          Remove containers
  rmi         Remove images

Try: docker ps, docker run, docker compose`,
  'docker ps': `CONTAINER ID   IMAGE               COMMAND                  CREATED        STATUS        PORTS      NAMES
1337beef       nginx:latest        "/docker-entrypoint.…"   2 days ago     Up 2 days     80/tcp     webserver
420cafe        postgres:14         "docker-entrypoint.s…"   2 days ago     Up 2 days     5432/tcp   database
deadc0de       redis:alpine        "docker-entrypoint.s…"   2 days ago     Up 2 days     6379/tcp   cache
baadf00d       node:18             "docker-entrypoint.s…"   42 hours ago   Up 42 hours   3000/tcp   api

All containers running smoothly. (Unlike your production environment)`,
  'docker run': `Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
2db29710123e: Pull complete
Digest: sha256:1234567890abcdef
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

Just kidding, this is a fake terminal. No containers were harmed.`,
  kubectl: `kubectl: Kubernetes control tool (k8s for short, because typing is hard)

Usage:
  kubectl [flags] [options]

Available Commands:
  get         Display resources
  describe    Show details of a resource
  create      Create a resource
  delete      Delete resources
  apply       Apply a configuration
  logs        Print container logs
  exec        Execute command in a container

Try: kubectl get pods, kubectl get nodes`,
  'kubectl get pods': `NAME                          READY   STATUS    RESTARTS   AGE
k8sgpt-operator-578f9d-x7k2p  1/1     Running   0          42d
frontend-deployment-abc123    1/1     Running   0          13d
backend-deployment-def456     1/1     Running   0          13d
database-statefulset-0        1/1     Running   0          69d
cache-deployment-789xyz       1/1     Running   42         7d

All pods running. No crashloops. This is fine. 🔥☕`,
  'kubectl get nodes': `NAME            STATUS   ROLES           AGE   VERSION
control-plane   Ready    control-plane   42d   v1.30.0
worker-1        Ready    <none>          42d   v1.30.0
worker-2        Ready    <none>          42d   v1.30.0
worker-3        Ready    <none>          13d   v1.30.0

3 nodes, 0 problems. (For now.)`,
  python: `Python 3.12.0 (main, Feb 15 2026, 19:42:00)
[GCC 13.2.1 20230801] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
...
>>> exit()

(Not actually a Python REPL, but you get the idea)`,
  python3: `Python 3.12.0 (main, Feb 15 2026, 19:42:00)
[GCC 13.2.1 20230801] on linux
Type "help", "copyright" or "license" for more information.
>>> print("Hello, World!")
Hello, World!
>>> import antigravity
# Browser opens xkcd.com/353/
>>> exit()`,
  node: `Welcome to Node.js v20.11.0.
Type ".help" for more information.
> console.log("Hello, World!")
Hello, World!
undefined
> 0.1 + 0.2
0.30000000000000004
> 0.1 + 0.2 === 0.3
false
> // JavaScript is a gift that keeps on giving
undefined
> .exit

(Not a real Node REPL, but the bugs are accurate)`,
  go: `go: The Go programming language toolchain

Usage:
  go <command> [arguments]

Commands:
  run         compile and run Go program
  build       compile packages and dependencies
  test        test packages
  fmt         gofmt (reformat) package sources
  mod         module maintenance
  get         add dependencies to current module

Go: Because sometimes you need a garbage collector AND performance.`,
  'go run': `# command-line-arguments
./main.go:1:1: expected 'package', found 'EOF'

(You need to write some Go code first!)`,
  java: `Error: Could not find or load main class Main
Caused by: java.lang.ClassNotFoundException: Main

Java: Where every exception has a stack trace longer than your codebase.`,
  // Fun commands
  lolcat: `🌈  Sorry, this terminal doesn't support ANSI color codes.  🌈
🌈  But imagine this text in beautiful rainbow colors!      🌈
🌈  Red, orange, yellow, green, blue, indigo, violet...     🌈
🌈  Over and over again, like a majestic rainbow cat.       🌈

    /\\_/\\  
   ( o.o ) 
    > ^ <
   /|   |\\
  (_|   |_)

lolcat: Making everything fabulous since 2011`,
  cowthink: ` _______________________________
( I wonder if humans know       )
( I'm just ASCII art...         )
 -------------------------------
        o   ^__^
         o  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`,
  yes: `y
y
y
y
y
y
y
y
... (output continues forever)
...
...
y
y
y

(yes: print 'y' forever. Stopped for your sanity.)`,
  tree: `/home/axjns
├── about
├── blog
├── cv
├── speaking
├── README.md
├── contact
├── .bash_history
├── .ssh/
│   ├── id_rsa
│   ├── id_rsa.pub
│   ├── known_hosts
│   └── config
└── projects/
    ├── llmfit/          [Rust] ★72 - Right-size LLMs to your hardware
    ├── website/         [TypeScript] - Personal terminal website
    ├── hearthglow/      [Rust] - Rust project
    ├── kube-microcosm/  [Makefile] ★59 - K8s cluster for startups
    ├── kflow/           [Rust] ★57 - Like top for K8s networking
    ├── joblin/          [Rust] ★4 - Rust based job manager
    ├── lsrmod/          [Rust] ★1 - lsmod in Rust
    ├── py2rs/           [TypeScript] ★5 - Python to Rust converter
    ├── k8sgpt/          [Go] - AI-powered K8s troubleshooting
    └── secret-project/
        ├── DO_NOT_READ.txt
        └── todo.txt

14 directories, 30+ files`,
  man: (cmd?: string) => {
    const command = cmd || "intro";
    return `MAN(1)                    Manual pager utils                    MAN(1)

NAME
       man - an interface to the system reference manuals

SYNOPSIS
       man [man options] [[section] page ...] ...

DESCRIPTION
       man is the system's manual pager.

       You're reading the fake man page for: ${command}

       To exit man, press q (but you're not actually in man).

       Fun fact: RTFM stands for "Read The Friendly Manual" 😊

MAN(1)                        February 2026                       MAN(1)`;
  },
  kill: (pid?: string) => {
    const process = pid || "42";
    return `kill: sending signal to process ${process}
Process ${process} terminated.

kill: The most metal Unix command.

(No actual processes were harmed. This is a fake terminal.)`;
  },
  alias: `alias l='ls -lah'
alias la='ls -lAh'
alias ll='ls -lh'
alias ls='ls --color=auto'
alias grep='grep --color=auto'
alias rm='rm -i'  # Safety first!
alias cp='cp -i'
alias mv='mv -i'
alias please='sudo'
alias fucking='sudo'
alias wtf='git status'
alias yolo='git push --force'
alias oops='git reset --hard HEAD'

(These aliases don't actually work here. But they're fun!)`,
  export: `export PATH=/usr/local/bin:/usr/bin:/bin
export EDITOR=vim
export SHELL=/bin/bash
export USER=axjns
export HOME=/home/axjns
export TERMINAL_EMULATOR=fake-browser-terminal.tsx

Environment variables: Because global variables weren't bad enough.`,
  source: `bash: source: filename argument required
source: file

Usage: source filename [arguments]

source: Running a script in the current shell, because sometimes
        forking a new process is just too much work.

(Also: the '.' command does the same thing. TMYK 🌈⭐)`,
  chmod: (mode?: string) => {
    return `chmod: changing file permissions to ${mode || '755'}

Permissions changed! Now the file is executable.
(Just kidding, there is no file. This is a fake terminal.)

chmod cheat sheet:
  4 = read    (r--)
  2 = write   (-w-)
  1 = execute (--x)

  chmod 755 = rwxr-xr-x  (most common)
  chmod 777 = rwxrwxrwx  (most dangerous)
  chmod 000 = ---------  (most useless)`;
  },
  chown: (args?: string) => {
    return `chown: changing ownership of file to ${args || 'axjns:axjns'}

Ownership changed! You now own the file.
(Which is weird, because there is no file.)

chown: When you need to tell Linux who the boss is.

Pro tip: Use sudo for extra power. Or explosions. Both are likely.`;
  },
  // Network tools
  ssh: (host?: string) => {
    const target = host || "github.com";
    return `ssh: connect to host ${target} port 22: Connection refused

Reasons why SSH doesn't work:
1. Host is down
2. Wrong port
3. Firewall blocking connection
4. You forgot to start sshd
5. This is a fake terminal in a web browser

(It's #5)`;
  },
  telnet: `telnet: command not found

Good! Telnet is insecure and deprecated.

Use SSH instead. It's like telnet, but:
- Encrypted
- Secure
- Won't get you fired

The 1990s called. They want their protocol back.`,
  nc: `nc (netcat) - the TCP/IP swiss army knife

Usage: nc [options] [hostname] [port]

Netcat: Like a cat, but for networks.
Can do anything. Probably shouldn't do most things.

Common uses:
- Port scanning
- File transfers
- Chat server (yes, really)
- Backdoors (don't)
- Debugging (yes!)`,
  netcat: `See: nc

(netcat and nc are the same thing)`,
  nmap: `Nmap: The Network Mapper

Scanning 65535 ports... this might take a while.

Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for axjns.dev (127.0.0.1)
Host is up (0.00042s latency).
Not shown: 65533 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https

Nmap done: 1 IP address scanned in 0.01 seconds

(Disclaimer: No actual network scanning occurred)`,
  wireshark: `Wireshark: The world's foremost network protocol analyzer

Cannot run GUI application in terminal mode.

Wireshark: For when you need to see EVERY. SINGLE. PACKET.

Fun fact: 99% of network traffic is cat videos and memes.
The other 1% is people trying to fix their network.`,
  // Compression
  tar: `tar: GNU tar

Usage: tar [OPTION...] [FILE]...

tar xvf file.tar.gz  # Extract (most common)
tar czf file.tar.gz  # Create compressed archive
tar tzf file.tar.gz  # List contents

tar: Tape Archive (from when tapes were a thing)

Helpful mnemonics:
- eXtract Ze Files  (xzf)
- Create Ze Files   (czf)
- Totally Zealous Formatting (tzf)

(These aren't official. But they should be.)`,
  gzip: `gzip: compression utility

Usage: gzip [OPTIONS] [FILE ...]

gzip file.txt → file.txt.gz

gzip: Making files smaller since 1992.

Fun fact: .tar.gz is also called a "tarball"
because UNIX people hate normal names for things.`,
  zip: `zip: package and compress files

Usage: zip [options] zipfile files ...

zip archive.zip file1.txt file2.txt

Fun fact: ZIP format was created in 1989 and is still going strong.

Unlike WinRAR. (Which you definitely paid for. Right? Right??)`,
  // System commands
  reboot: `Broadcast message from axjns@axjns.dev (pts/0) (Sun Feb 15 21:00:00 2026):

The system is going down for reboot NOW!

Just kidding! This is a web page.
Refreshing the browser will have the same effect though! 🦊`,
  shutdown: `Shutdown scheduled for Sun Feb 15 21:01:00 2026, use 'shutdown -c' to cancel.

(Just kidding. This is a fake terminal. Nothing will shut down.)

Remember: Never shutdown a production server.
Especially on Friday. Especially at 5pm.`,
  init: `init: The mother of all processes (PID 1)

Not that you can run it. You're not root.
And this is a fake terminal.

init: Starting the system since 1983.

(Now mostly replaced by systemd. RIP init, you had a good run.)`,
  systemctl: `systemctl: Control the systemd system and service manager

Usage: systemctl [OPTIONS...] COMMAND ...

systemctl status nginx   # Check service status
systemctl start nginx    # Start service
systemctl stop nginx     # Stop service
systemctl restart nginx  # Restart service

systemd: The init system everyone loves to hate.
(But secretly can't live without)`,
  banner: (text?: string) => {
    const msg = text || "AXJNS";
    // Simple banner - in real implementation would do proper ASCII art
    return `
#     #  #     #  #     #   #####
 #   #    #   #    #   #   #     #
  # #      # #      # #      #
   #        #        #         #####
  # #      # #      # #             #
 #   #    #   #    #   #    #     #
#     #  #     #  #     #    #####

         ${msg.toUpperCase()}
`;
  },
  echo: (args?: string) => args || "",
};

// Complete filesystem structure
const FS: Record<string, string[]> = {
  '/': ['home', 'tmp', 'opt', 'bin', 'var', 'etc', 'proc'],
  '/home': ['axjns'],
  '/home/axjns': ['speaking', 'about', 'blog', 'cv', 'README.md', 'contact', 'projects', '.bash_history', '.ssh'],
  '/home/axjns/projects': ['llmfit', 'website', 'hearthglow', 'kube-microcosm', 'kflow', 'joblin', 'lsrmod', 'py2rs', 'k8sgpt', 'secret-project'],
  '/home/axjns/projects/llmfit': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/website': ['README.md', 'package.json'],
  '/home/axjns/projects/hearthglow': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/kube-microcosm': ['README.md', 'Makefile'],
  '/home/axjns/projects/kflow': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/joblin': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/lsrmod': ['README.md', 'main.rs', 'Cargo.toml'],
  '/home/axjns/projects/py2rs': ['README.md', 'package.json'],
  '/home/axjns/projects/k8sgpt': ['README.md', 'main.go', 'go.mod'],
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
  '/home/axjns/projects/llmfit/README.md': '# llmfit\n\nA way to justify buying a more powerful laptop (and see what LLMs will run).\nRight-sizes LLM models to your system\'s RAM, CPU, and GPU.\n\nLanguage: Rust | Stars: 72\n\nGitHub: https://github.com/AlexsJones/llmfit',
  '/home/axjns/projects/llmfit/main.rs': '// llmfit - Right-size LLMs to your hardware\nuse std::io;\n\nfn main() {\n    println!("llmfit - LLM Hardware Compatibility");\n    // ... implementation\n}',
  '/home/axjns/projects/llmfit/Cargo.toml': '[package]\nname = "llmfit"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nsysinfo = "0.30"\ntermion = "3.0"',
  '/home/axjns/projects/website/README.md': '# website\n\nPersonal terminal-style website for axjns.dev.\nBuilt with Next.js and TypeScript.\n\nLanguage: TypeScript\n\nGitHub: https://github.com/AlexsJones/website',
  '/home/axjns/projects/website/package.json': '{\n  "name": "axjns-website",\n  "version": "1.0.0",\n  "scripts": { "dev": "next dev" }\n}',
  '/home/axjns/projects/hearthglow/README.md': '# hearthglow\n\nA Rust project.\n\nLanguage: Rust\n\nGitHub: https://github.com/AlexsJones/hearthglow',
  '/home/axjns/projects/hearthglow/main.rs': 'fn main() {\n    println!("hearthglow");\n}',
  '/home/axjns/projects/hearthglow/Cargo.toml': '[package]\nname = "hearthglow"\nversion = "0.1.0"\nedition = "2021"',
  '/home/axjns/projects/kube-microcosm/README.md': '# kube-microcosm\n\nAn example of a Kubernetes cluster appropriate for a startup company.\nIncludes cert-manager, Falco, GitOps, Linkerd2, and Slack integration.\n\nLanguage: Makefile | Stars: 59 | Archived\n\nGitHub: https://github.com/AlexsJones/kube-microcosm',
  '/home/axjns/projects/kube-microcosm/Makefile': '.PHONY: all\nall:\n\t@echo "kube-microcosm - K8s starter cluster"',
  '/home/axjns/projects/kflow/README.md': '# kflow\n\nLike top for Kubernetes networking.\nMonitor and visualize network traffic in your K8s cluster.\n\nLanguage: Rust | Stars: 57\n\nGitHub: https://github.com/AlexsJones/kflow',
  '/home/axjns/projects/kflow/main.rs': 'fn main() {\n    println!("kflow - K8s network monitoring");\n}',
  '/home/axjns/projects/kflow/Cargo.toml': '[package]\nname = "kflow"\nversion = "0.1.0"\nedition = "2021"',
  '/home/axjns/projects/joblin/README.md': '# joblin\n\nRust based Job manager, for fun and education.\n\nLanguage: Rust | Stars: 4\n\nGitHub: https://github.com/AlexsJones/joblin',
  '/home/axjns/projects/joblin/main.rs': 'fn main() {\n    println!("joblin - Job Manager");\n}',
  '/home/axjns/projects/joblin/Cargo.toml': '[package]\nname = "joblin"\nversion = "0.1.0"\nedition = "2021"',
  '/home/axjns/projects/lsrmod/README.md': '# lsrmod\n\nlsmod in Rust. Lists loaded kernel modules.\n\nLanguage: Rust | Stars: 1\n\nGitHub: https://github.com/AlexsJones/lsrmod',
  '/home/axjns/projects/lsrmod/main.rs': 'fn main() {\n    println!("lsrmod - lsmod in Rust");\n}',
  '/home/axjns/projects/lsrmod/Cargo.toml': '[package]\nname = "lsrmod"\nversion = "0.1.0"\nedition = "2021"',
  '/home/axjns/projects/py2rs/README.md': '# py2rs\n\nPython to Rust transpiler/converter tool.\n\nLanguage: TypeScript | Stars: 5\n\nGitHub: https://github.com/AlexsJones/py2rs',
  '/home/axjns/projects/py2rs/package.json': '{\n  "name": "py2rs",\n  "version": "1.0.0"\n}',
  '/home/axjns/projects/k8sgpt/README.md': '# k8sgpt\n\nAI-powered Kubernetes cluster analysis and troubleshooting.\nAutomatic issue detection with AI-powered explanations.\n\nLanguage: Go\n\nGitHub: https://github.com/k8sgpt-ai/k8sgpt',
  '/home/axjns/projects/k8sgpt/main.go': '// k8sgpt main entry point\npackage main\n\nimport (\n\t"fmt"\n\t"os"\n)\n\nfunc main() {\n\tfmt.Println("k8sgpt - AI-powered K8s SRE")\n\t// ... implementation\n}',
  '/home/axjns/projects/k8sgpt/go.mod': 'module github.com/k8sgpt-ai/k8sgpt\n\ngo 1.24\n\nrequire (\n\tk8s.io/client-go v0.31.0\n\t// ... more dependencies\n)',
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
    const allCommands = [...Object.keys(COMMANDS), ...Object.keys(EASTER_EGGS), 'cd', 'ls', 'pwd', 'cat', 'note', 'guestbook', 'theme', 'history', 'hack', 'clear', 'help'];
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
  const [tabs, setTabs] = useState<TerminalTab[]>([{
    id: 1,
    title: 'Terminal 1',
    history: [],
    cwd: '/home/axjns',
    input: ''
  }]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showGif, setShowGif] = useState(false);
  const [theme, setTheme] = useState<string>('amber');
  const [notes, setNotes] = useState<Note[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showTerminalMenu, setShowTerminalMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = React.useRef(pathname);
  
  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const history = activeTab.history;
  const input = activeTab.input;
  const cwd = activeTab.cwd;
  
  const setHistory = (updater: string[] | ((prev: string[]) => string[])) => {
    setTabs(tabs => tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, history: typeof updater === 'function' ? updater(tab.history) : updater } : tab
    ));
  };
  
  const setInput = (value: string) => {
    setTabs(tabs => tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, input: value } : tab
    ));
  };
  
  const setCwd = (newCwd: string) => {
    setTabs(tabs => tabs.map(tab => 
      tab.id === activeTabId ? { ...tab, cwd: newCwd } : tab
    ));
  };

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
      
      const savedTabs = localStorage.getItem('axjns-tabs');
      if (savedTabs) {
        const parsed = JSON.parse(savedTabs);
        setTabs(parsed.tabs);
        setActiveTabId(parsed.activeTabId);
      }
    }
  }, []);

  // Save tabs
  useEffect(() => {
    if (typeof window !== 'undefined' && bootComplete) {
      localStorage.setItem('axjns-tabs', JSON.stringify({ tabs, activeTabId }));
    }
  }, [tabs, activeTabId, bootComplete]);

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

  const addTab = () => {
    const newId = Math.max(...tabs.map(t => t.id)) + 1;
    const newTab: TerminalTab = {
      id: newId,
      title: `Terminal ${newId}`,
      history: [PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"]],
      cwd: '/home/axjns',
      input: ''
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id: number) => {
    if (tabs.length === 1) return; // Don't close the last tab
    const newTabs = tabs.filter(t => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

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
        setHistory(h => [...h, prompt(cwd) + ' ' + cmd]);
        return;
      }
      const target = resolvePath(cwd, arg);
      if (isDirectory(target)) {
        setCwd(target);
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
            {/* Menu Bar */}
            <div className={`flex items-center justify-between px-4 py-2 border-b ${themeConfig.text} border-opacity-30`}>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">axjns.dev</span>
                <button className={`px-2 py-1 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}>File</button>
                <button className={`px-2 py-1 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}>Edit</button>
                <button className={`px-2 py-1 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}>Selection</button>
                <div className="relative">
                  <button
                    onClick={() => setShowTerminalMenu(!showTerminalMenu)}
                    className={`px-2 py-1 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}
                  >
                    Terminal
                  </button>
                  {showTerminalMenu && (
                    <div className={`absolute top-full left-0 mt-1 ${themeConfig.bg} border ${themeConfig.text} border-opacity-50 rounded shadow-lg z-20 min-w-[200px]`}>
                      <div className="px-4 py-2 text-xs opacity-60 border-b border-opacity-20">Theme</div>
                      {Object.entries(THEMES).map(([key, themeOption]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key);
                            setShowTerminalMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:bg-opacity-20 hover:${themeOption.cursor} transition-colors ${
                            key === theme ? 'font-bold' : ''
                          }`}
                        >
                          {key === theme ? '✓ ' : '  '}{themeOption.name}
                        </button>
                      ))}
                      <div className="border-t border-opacity-20 my-1"></div>
                      <button
                        onClick={() => {
                          addTab();
                          setShowTerminalMenu(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}
                      >
                        New Terminal
                      </button>
                    </div>
                  )}
                </div>
                <button 
                  onClick={() => setShowHelpModal(true)}
                  className={`px-2 py-1 text-sm hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}
                >
                  Help
                </button>
              </div>
              <button
                onClick={addTab}
                className={`px-3 py-1 text-sm border ${themeConfig.text} border-opacity-50 rounded hover:bg-opacity-20 hover:${themeConfig.cursor} transition-colors`}
                title="New Terminal Tab"
              >
                + New Tab
              </button>
            </div>
            
            {/* Tab Bar */}
            <div className={`flex items-center gap-1 px-2 py-1 border-b ${themeConfig.text} border-opacity-20 overflow-x-auto`}>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center gap-2 px-3 py-1 text-sm rounded-t cursor-pointer transition-colors ${
                    tab.id === activeTabId
                      ? `${themeConfig.cursor} bg-opacity-20 border-b-2 border-${themeConfig.cursor}`
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  onClick={() => setActiveTabId(tab.id)}
                >
                  <span>{tab.title}</span>
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        closeTab(tab.id);
                      }}
                      className="hover:text-red-400 transition-colors"
                      title="Close tab"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
            
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
            {showHelpModal && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70" onClick={() => setShowHelpModal(false)}>
                <div 
                  className={`${themeConfig.bg} ${themeConfig.text} border ${themeConfig.text} border-opacity-50 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">About axjns.dev</h2>
                    <button 
                      onClick={() => setShowHelpModal(false)}
                      className={`text-2xl hover:${themeConfig.cursor} transition-colors leading-none`}
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p>This is the personal website of <span className="font-bold">Alex Jones</span>.</p>
                    <p>To find out more about me:</p>
                    <div className="space-y-2">
                      <a 
                        href="https://www.linkedin.com/in/jonesax/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block ${themeConfig.prompt} hover:underline`}
                      >
                        → LinkedIn: www.linkedin.com/in/jonesax/
                      </a>
                      <a 
                        href="https://www.github.com/AlexsJones" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`block ${themeConfig.prompt} hover:underline`}
                      >
                        → GitHub: www.github.com/AlexsJones
                      </a>
                    </div>
                    <div className={`mt-6 pt-4 border-t ${themeConfig.text} border-opacity-30 text-sm opacity-70`}>
                      <p>Type <span className={`${themeConfig.prompt} font-bold`}>help</span> in the terminal for available commands.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <style>{`@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }`}</style>
      </body>
    </html>
  );
}
