import { FS } from '../filesystem';

export const COMMANDS: Record<string, string | null> = {
  home: "/",
  about: "/about",
  speaking: "/speaking",
  blog: "/blog",
  cv: "/cv",
  help: null,
  clear: null,
};

export const EASTER_EGGS: Record<string, string | ((arg?: string) => string)> = {
  top: `top - 00:00:01 up 1 day,  1 user,  load average: 0.00, 0.01, 0.05
Tasks: 1 total, 1 running, 0 sleeping, 0 stopped, 0 zombie
%Cpu(s): 0.7 us, 0.3 sy, 0.0 ni, 99.0 id, 0.0 wa, 0.0 hi, 0.0 si, 0.0 st
MiB Mem :  16384.0 total,  12000.0 free,   2048.0 used,   1336.0 buff/cache
PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
  1 axjns     20   0   10000   3000   2000 R   0.7   0.1   0:00.01 axjns.dev`,
  du: `4.0K    ./blog\n8.0K    ./cv\n16.0K   ./about\n32.0K   ./speaking\n60.0K   .`,
  whoami: "axjns",
  uname: "Linux axjns.dev 6.14.11-300.fc42.x86_64 #1 SMP PREEMPT_DYNAMIC",
  hostname: "axjns.dev",
  uptime: " 19:42:00 up 42 days, 13:37,  1 user,  load average: 0.00, 0.01, 0.05",
  ps: `  PID TTY          TIME CMD\n    1 pts/0    00:00:01 axjns.dev\n  222 pts/0    00:00:00 bash`,
  pwd: "/home/axjns",
  date: () => new Date().toString(),
  fortune: "You will deploy to production on a Friday.",
  cowsay: ` ____________\n< axjns.dev >\n ------------\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`,
  sudo: "We trust you have received the usual lecture from the local System Administrator.",
  finger: `Login: axjns\t\t\t\tName: Alex Jones\nDirectory: /home/axjns\t\t\tShell: /bin/bash\nNo mail.\nNo Plan.`,
  figlet: (text?: string) => {
    const msg = text || "axjns.dev";
    return `\n  __ ___  __(_)_ __  ___   __| | _____   __\n / _\` \\ \\/ / | '_ \\/ __| / _\` |/ _ \\ \\ / /\n| (_| |>  <| | | | \\__ \\| (_| |  __/\\ V / \n \\__,_/_/\\_\\_|_| |_|___(_)__,_|\\___| \\_/  \n\n        ${msg}\n`;
  },
  sl: `                    (  ) (@@) ( )  (@)  ()    @@    O     @     O     @      O
               (@@@)
           (    )
        (@@@@)
     (   )

   ====        ________                ___________
_D _|  |_______/        \\__I_I_____===__|_________|
 |(_)---  |   H\\________/ |   |        =|___ ___|
 /     |  |   H  |  |     |   |         ||_| |_||
|      |  |   H  |__--------------------| [___] |
| ________|___H__/__|_____/[][]~\\_______|       |
|/ |   |-----------I_____I [][] []  D   |=======|__
__/ =| o |=-~~\\  /~~\\  /~~\\  /~~\\ ____Y_________|_
 |/-=|___|=O=====O=====O=====O   |_____/~\\___/
  \\_/      \\__/  \\__/  \\__/  \\__/      \\_/

You typed 'sl' instead of 'ls'! Here's a train.`,
  ping: (host?: string) => {
    const target = host || "google.com";
    return `PING ${target} (142.250.185.78) 56(84) bytes of data.
64 bytes from ${target}: icmp_seq=1 ttl=118 time=13.7 ms
64 bytes from ${target}: icmp_seq=2 ttl=118 time=12.3 ms
64 bytes from ${target}: icmp_seq=3 ttl=118 time=13.1 ms

--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 12.3/13.0/13.7/0.6 ms`;
  },
  curl: (url?: string) => {
    const target = url || "https://axjns.dev";
    return `<!DOCTYPE html>\n<html>\n<head><title>axjns.dev</title></head>\n<body>\n<h1>axjns.dev</h1>\n<p>Requested: ${target}</p>\n</body>\n</html>`;
  },
  free: `              total        used        free      shared  buff/cache   available
Mem:       16384Mi      2048Mi     12000Mi        64Mi      1336Mi     13800Mi
Swap:       2048Mi         0Mi      2048Mi`,
  df: `Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1       1.3T  420G  900G  32% /
tmpfs           8.0G  1.2M  8.0G   1% /tmp`,
  wget: (url?: string) => {
    const target = url || "https://axjns.dev";
    return `--2026-02-15 21:00:00--  ${target}\nResolving ${target}... 127.0.0.1\nConnecting... connected.\nHTTP request sent, awaiting response... 200 OK\nLength: 1337 (1.3K) [text/html]\nSaving to: 'index.html'\n\nindex.html     100%[========>]   1.31K  --.-KB/s    in 0s\n\n'index.html' saved [1337/1337]`;
  },
  neofetch: `                   -\`                 axjns@axjns.dev
                  .o+\`                 ----------------
                 \`ooo/                 OS: Fedora Linux x86_64
                \`+oooo:                Host: The Cloud
               \`+oooooo:               Kernel: 6.14.11-300.fc42.x86_64
               -+oooooo+:              Uptime: 42 days, 13 hours
             \`/:-:++oooo+:             Shell: bash 5.2.21
            \`/++++/+++++++:            Terminal: axjns.dev
           \`/++++++++++++++:           CPU: Intel Core i9 (8) @ 4.2GHz
          \`/+++ooooooooooooo/\`         GPU: Nvidia RTX 4090
         ./ooosssso++osssssso+\`        Memory: 2048MiB / 16384MiB
        .oossssso-\`\`\`\`/ossssss+\`
       -osssssso.      :ssssssso.
      :osssssss/        osssso+++.
     /ossssssss/        +ssssooo/-
   \`/ossssso+/:-        -:/+osssso+-
  \`+sso+:-\`                 \`.-/+oso:`,
  w: `USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
axjns    pts/0    127.0.0.1        19:42    0.00s  0.01s  0.00s w`,
  who: `axjns    pts/0        2026-02-15 19:42 (127.0.0.1)`,
  last: `axjns    pts/0        127.0.0.1        Sat Feb 15 19:42   still logged in

wtmp begins Sat Jan  4 00:00:00 2026`,
  htop: `  1  [||||||||||||||||||||||||||||||||100.0%]   Tasks: 42, 137 thr; 1 running
  2  [||||||||||                           42.0%]   Load average: 0.00 0.01 0.05
  3  [||||||||                             13.7%]   Uptime: 42 days, 13:37:00
  4  [||                                    4.2%]
  Mem[||||||||||||||    14.2G/16.0G]
  Swp[                  0K/2.00G]
  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
    1 axjns      20   0 10.0M  3.0M  2.0M R  0.7  0.1  0:00.01 axjns.dev

F1Help F2Setup F3Search F4Filter F5Tree F6SortBy F7Nice F9Kill F10Quit`,
  git: `usage: git [--version] [--help] [-C <path>] <command> [<args>]

These are common Git commands:
   clone      Clone a repository
   status     Show the working tree status
   add        Add file contents to the index
   commit     Record changes to the repository
   push       Update remote refs
   pull       Fetch from and integrate with another repository`,
  'git status': `On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean`,
  'git push': `Enumerating objects: 42, done.
Counting objects: 100% (42/42), done.
Writing objects: 100% (37/37), 1.21 MiB | 420.00 KiB/s, done.
To github.com:axjns/repo.git
   abc1234..def5678  main -> main`,
  'git commit': `[main abc1234] Update configuration
 1 file changed, 42 insertions(+), 13 deletions(-)`,
  'git blame': `^abc1234 (Alex Jones 2024-01-15 13:37:00 +0000  1) // TODO: Fix this later
^abc1234 (Alex Jones 2024-01-15 13:37:01 +0000  2) // HACK: Don't judge me
def5678  (Alex Jones 2024-02-15 19:42:00 +0000  3) console.log("It just works™");`,
  docker: `Usage:  docker [OPTIONS] COMMAND

A self-sufficient runtime for containers

Common Commands:
  run         Create and run a new container
  ps          List containers
  build       Build an image from a Dockerfile
  pull        Download an image from a registry
  images      List images
  logs        Fetch the logs of a container
  exec        Execute a command in a running container`,
  'docker ps': `CONTAINER ID   IMAGE               COMMAND                  STATUS        PORTS      NAMES
1337beef       nginx:latest        "/docker-entrypoint.…"   Up 2 days     80/tcp     webserver
420cafe        postgres:16         "docker-entrypoint.s…"   Up 2 days     5432/tcp   database
deadc0de       redis:alpine        "docker-entrypoint.s…"   Up 2 days     6379/tcp   cache`,
  'docker run': `Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
Digest: sha256:1234567890abcdef
Status: Downloaded newer image for hello-world:latest

Hello from Docker!`,
  kubectl: `kubectl controls the Kubernetes cluster manager.

Usage:
  kubectl [flags] [options]

Basic Commands:
  get         Display one or many resources
  describe    Show details of a specific resource
  create      Create a resource from a file or stdin
  apply       Apply a configuration to a resource
  delete      Delete resources
  logs        Print the logs for a container
  exec        Execute a command in a container`,
  'kubectl get pods': `NAME                              READY   STATUS    RESTARTS   AGE
k8sgpt-operator-578f9d-x7k2p      1/1     Running   0          42d
frontend-deployment-abc123        1/1     Running   0          13d
backend-deployment-def456         1/1     Running   0          13d
database-statefulset-0            1/1     Running   0          69d`,
  'kubectl get nodes': `NAME            STATUS   ROLES           AGE   VERSION
control-plane   Ready    control-plane   42d   v1.30.0
worker-1        Ready    <none>          42d   v1.30.0
worker-2        Ready    <none>          42d   v1.30.0`,
  banner: (text?: string) => {
    const msg = text || "AXJNS";
    return `\n#     #  #     #  #     #   #####\n #   #    #   #    #   #   #     #\n  # #      # #      # #      #\n   #        #        #         #####\n  # #      # #      # #             #\n #   #    #   #    #   #    #     #\n#     #  #     #  #     #    #####\n\n         ${msg.toUpperCase()}\n`;
  },
  echo: (args?: string) => args || "",
  ssh: (host?: string) => {
    const target = host || "github.com";
    return `ssh: connect to host ${target} port 22: Connection refused`;
  },
  kill: (pid?: string) => {
    return `kill: sending signal to process ${pid || "42"}\nProcess ${pid || "42"} terminated.`;
  },
  man: (cmd?: string) => {
    const command = cmd || "intro";
    return `MAN(1)                    Manual pager utils                    MAN(1)

NAME
       ${command} - system reference manual entry

SYNOPSIS
       man [section] page

DESCRIPTION
       man is the system's manual pager. Each page argument given to man
       is normally the name of a program, utility or function.

       You requested: ${command}

SEE ALSO
       info(1), help(1)

MAN(1)                        February 2026                       MAN(1)`;
  },
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
    ├── llmfit/          [Rust] ★72
    ├── website/         [TypeScript]
    ├── hearthglow/      [Rust]
    ├── kube-microcosm/  [Makefile] ★59
    ├── kflow/           [Rust] ★57
    ├── joblin/          [Rust] ★4
    ├── lsrmod/          [Rust] ★1
    ├── py2rs/           [TypeScript] ★5
    ├── k8sgpt/          [Go]
    └── secret-project/`,
  make: "make: *** No targets specified and no makefile found.  Stop.",
};

export function getCompletions(input: string, cwd: string): string[] {
  const parts = input.split(' ');
  const lastPart = parts[parts.length - 1];

  if (parts.length === 1) {
    const allCommands = [
      ...Object.keys(COMMANDS),
      ...Object.keys(EASTER_EGGS),
      'cd', 'ls', 'pwd', 'cat', 'note', 'guestbook', 'theme', 'history', 'clear', 'help'
    ];
    const unique = [...new Set(allCommands)];
    return unique.filter(cmd => cmd.startsWith(lastPart)).sort();
  }

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
