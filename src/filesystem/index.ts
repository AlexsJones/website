export const PAGE_OUTPUT: Record<string, string> = {
  "/": `Welcome to axjns.dev\nType a command or use the menu above.`,
  "/about": `About Me\n--------\nPrincipal Engineer @ AWS\nCloud Native Advocate, Speaker, Open Source Contributor.\nLondon, United Kingdom.`,
  "/speaking": `Speaking Events\n--------------\n- Beyond the Clouds: Charting the course for AI in the CloudNative world\n- K8sGPT: Balancing AI's Productivity Boost with Ethical Considerations in Cloud-Native\n- Rust Operators For Kubernetes\n- Crowdsourcing a Kubernetes distribution: What we learnt with MicroK8s\n- SLO's don't matter: A nihilist's guide to reliability\nSee more: https://sessionize.com/jonesax/`,
  "/blog": `Blog\n----\nNo posts yet. Stay tuned!`,
  "/cv": `Alex Jones - CV\n----------------\nPrincipal Engineer @ AWS\nLondon, United Kingdom\nEmail: alexsimonjones@gmail.com\nLinkedIn: www.linkedin.com/in/jonesax\n\nSummary:\nI am an individual contributor. My work is mysterious and important.\nOutside of work I contribute to open-source.\nExpertise: Distributed systems, Kubernetes, Systems Design, AI in Cloud.\n\nExperience:\n- AWS: Principal Engineer (Aug 2023 - Present)\n- k8sgpt.ai: Founder (Mar 2023 - Present)\n- Canonical: Engineering Director, Kubernetes (Jan 2022 - Aug 2023)\n- JPMorgan Chase: VP SRE (Dec 2020 - May 2021)\n- American Express: Engineering Director, SRE (May 2019 - Dec 2020)\n- Beamery: Head of Platform & Infrastructure (May 2017 - May 2019)\n- Sky: Lead DevOps Engineer (Apr 2016 - May 2017)\n- Microsoft: Senior Software Engineer (Oct 2014 - Apr 2015)\n...and more\n\nCertifications:\n- Speaker: KubeCon + CloudNativeCon North America 2021, 2022\n- Speaker: KubeCon + CloudNativeCon Europe 2023, 2025\n\nSkills:\nLong-term Vision, Communication, AWS, Distributed Systems, Kubernetes, Systems Design,\nAI in Cloud, DevOps, Observability, Go, Rust, Linux, Open Source, Platform Engineering\n\nEducation:\nKingston University — First class BsC with Honors, Computer Science (2007 - 2010)`
};

export const FS: Record<string, string[]> = {
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

export const FILE_CONTENT: Record<string, string> = {
  '/home/axjns/speaking': PAGE_OUTPUT['/speaking'],
  '/home/axjns/about': PAGE_OUTPUT['/about'],
  '/home/axjns/blog': PAGE_OUTPUT['/blog'],
  '/home/axjns/cv': PAGE_OUTPUT['/cv'],
  '/home/axjns/README.md': 'Welcome to the home directory of axjns!\n\nTry these commands:\n- cat about\n- cat cv\n- cat blog\n- cat speaking\n- cd projects\n- ls -la\n\nHave fun exploring!',
  '/home/axjns/contact': 'Contact Alex Jones (axjns)\n--------------------------\nEmail: (see LinkedIn or GitHub)\nGitHub: https://github.com/AlexsJones\nLinkedIn: https://www.linkedin.com/in/jonesax/\nSessionize: https://sessionize.com/jonesax/\nYouTube: https://www.youtube.com/cloudnativeskunkworks',
  '/home/axjns/.bash_history': 'ls -la\ncd projects\ngit status\nkubectl get pods -A\nhistory | grep oops\nvim important-config.yaml\nping google.com\ncurl https://axjns.dev\nexit',
  '/home/axjns/projects/llmfit/README.md': '# llmfit\n\nA way to justify buying a more powerful laptop (and see what LLMs will run).\nRight-sizes LLM models to your system\'s RAM, CPU, and GPU.\n\nLanguage: Rust | Stars: 72\n\nGitHub: https://github.com/AlexsJones/llmfit',
  '/home/axjns/projects/llmfit/main.rs': '// llmfit - Right-size LLMs to your hardware\nuse std::io;\n\nfn main() {\n    println!("llmfit - LLM Hardware Compatibility");\n}',
  '/home/axjns/projects/llmfit/Cargo.toml': '[package]\nname = "llmfit"\nversion = "0.1.0"\nedition = "2021"\n\n[dependencies]\nsysinfo = "0.30"\ntermion = "3.0"',
  '/home/axjns/projects/website/README.md': '# website\n\nPersonal terminal-style website for axjns.dev.\nBuilt with Next.js and TypeScript.\n\nGitHub: https://github.com/AlexsJones/website',
  '/home/axjns/projects/website/package.json': '{\n  "name": "axjns-website",\n  "version": "1.0.0",\n  "scripts": { "dev": "next dev" }\n}',
  '/home/axjns/projects/hearthglow/README.md': '# hearthglow\n\nA Rust project.\n\nGitHub: https://github.com/AlexsJones/hearthglow',
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
  '/home/axjns/projects/k8sgpt/main.go': '// k8sgpt main entry point\npackage main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("k8sgpt - AI-powered K8s SRE")\n}',
  '/home/axjns/projects/k8sgpt/go.mod': 'module github.com/k8sgpt-ai/k8sgpt\n\ngo 1.24\n\nrequire (\n\tk8s.io/client-go v0.31.0\n)',
  '/home/axjns/projects/secret-project/DO_NOT_READ.txt': '⚠️  TOP SECRET ⚠️\n\nThis is the secret project.\nIt will change everything.\n\n...\n\nJust kidding. It\'s a todo app.',
  '/home/axjns/projects/secret-project/todo.txt': 'TODO:\n- Deploy to production on a Friday ✅\n- Write unit tests (someday)\n- Fix that one bug\n- Refactor everything',
  '/home/axjns/.ssh/id_rsa': '-----BEGIN OPENSSH PRIVATE KEY-----\n(This is a fake SSH key. Nice try though!)\n-----END OPENSSH PRIVATE KEY-----',
  '/home/axjns/.ssh/id_rsa.pub': 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFaKeY axjns@axjns.dev',
  '/home/axjns/.ssh/known_hosts': 'github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl',
  '/home/axjns/.ssh/config': 'Host github.com\n\tHostName github.com\n\tUser git\n\tIdentityFile ~/.ssh/id_rsa\n\nHost *\n\tServerAliveInterval 60',
  '/tmp/testfile.txt': 'This is a test file in /tmp.',
  '/opt/coolapp': '#!/bin/bash\necho "CoolApp v1.0 - Does nothing, but looks good doing it"',
  '/opt/README.md': '# /opt Directory\n\nWelcome to /opt! Optional software lives here.',
  '/var/log/syslog': '[  0.000000] Booting axjns.dev kernel...\n[  0.000001] All systems nominal.\n[  0.420000] Starting network services...\n[  0.690000] Mounted /home/axjns\n[ 42.000000] System ready.',
  '/var/log/dmesg': '[    0.000000] Linux version 6.14.11-300.fc42.x86_64\n[    0.000001] Command line: BOOT_IMAGE=/vmlinuz root=/dev/sda1 ro',
  '/var/log/auth.log': 'Feb 15 19:42:00 axjns sshd[1337]: Accepted password for axjns from 127.0.0.1 port 1337 ssh2',
  '/var/log/kern.log': '[  0.000000] Kernel logging started\n[  0.001000] Memory: 16384M\n[  0.420000] CPU: Intel(R) Core i9-1337K',
  '/var/www/index.html': '<!DOCTYPE html>\n<html>\n<head><title>axjns.dev</title></head>\n<body>\n<h1>Welcome to axjns.dev</h1>\n<p>The real site is a terminal interface!</p>\n</body>\n</html>',
  '/etc/motd': 'Welcome to axjns.dev!\n\nHack the planet. Deploy on Fridays.\n\n"The cloud is just someone else\'s computer."',
  '/etc/passwd': 'root:x:0:0:root:/root:/bin/bash\naxjns:x:1000:1000:Alex Jones:/home/axjns:/bin/bash\nnobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin',
  '/etc/hosts': '127.0.0.1\tlocalhost\n127.0.1.1\taxjns.dev\n::1\t\tlocalhost ip6-localhost ip6-loopback',
  '/etc/hostname': 'axjns.dev',
  '/etc/fstab': '# /etc/fstab: static file system information\n/dev/sda1  /      ext4  defaults  0  1\ntmpfs      /tmp   tmpfs defaults  0  0',
  '/etc/resolv.conf': 'nameserver 1.1.1.1\nnameserver 8.8.8.8\nsearch axjns.dev',
  '/proc/cpuinfo': 'processor\t: 0\nvendor_id\t: GenuineIntel\ncpu family\t: 6\nmodel name\t: Intel(R) Core i9-1337K CPU @ 4.20GHz\ncpu cores\t: 8',
  '/proc/meminfo': 'MemTotal:       16777216 kB\nMemFree:        12582912 kB\nMemAvailable:   14155776 kB\nBuffers:          524288 kB\nCached:          1048576 kB',
  '/proc/uptime': '3704640.00 14745600.00',
  '/proc/version': 'Linux version 6.14.11-300.fc42.x86_64 (axjns@axjns.dev) (gcc (GCC) 13.2.1) #1 SMP PREEMPT_DYNAMIC',
};

export function resolvePath(cwd: string, arg: string): string {
  if (!arg || arg === '.') return cwd;
  if (arg === '/') return '/';
  if (arg === '..') {
    if (cwd === '/') return '/';
    return cwd.slice(0, cwd.lastIndexOf('/')) || '/';
  }
  if (arg.startsWith('/')) return arg;
  return (cwd === '/' ? '' : cwd) + '/' + arg;
}

export function isFile(path: string): boolean {
  return FILE_CONTENT.hasOwnProperty(path);
}

export function isDirectory(path: string): boolean {
  return FS.hasOwnProperty(path);
}
