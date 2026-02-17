// Modularized terminal layout
"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "./globals.css";
import { THEMES, ThemeKey } from "../themes";
import { PAGE_OUTPUT, FILE_CONTENT, FS, resolvePath, isFile, isDirectory } from "../filesystem";
import { COMMANDS, EASTER_EGGS, getCompletions } from "../commands";
import { GAME_LIST, Game } from "../games";

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
  const themeConfig = THEMES[theme as ThemeKey] || THEMES.matrix;
  return (
    <span
      className={`inline-block w-2 h-5 ${themeConfig.cursor} align-bottom animate-blink ml-1`}
      style={{ animation: "blink 1s steps(2, start) infinite" }}
    />
  );
}

export default function RootLayout() {
  const [bootComplete, setBootComplete] = useState(false);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [tabs, setTabs] = useState<TerminalTab[]>([
    { id: 1, title: "Terminal 1", history: [], cwd: "/home/axjns", input: "" },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState<string>("amber");
  const [notes, setNotes] = useState<Note[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [tabCompletions, setTabCompletions] = useState<string[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [showTerminalMenu, setShowTerminalMenu] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const initialPath = React.useRef(pathname);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const history = activeTab.history;
  const input = activeTab.input;
  const cwd = activeTab.cwd;

  const themeConfig = THEMES[theme as ThemeKey] || THEMES.matrix;

  const setHistory = (updater: string[] | ((prev: string[]) => string[])) => {
    setTabs((tabs) =>
      tabs.map((tab) =>
        tab.id === activeTabId
          ? { ...tab, history: typeof updater === "function" ? updater(tab.history) : updater }
          : tab
      )
    );
  };

  const setInput = (value: string) => {
    setTabs((tabs) =>
      tabs.map((tab) => (tab.id === activeTabId ? { ...tab, input: value } : tab))
    );
  };

  const setCwd = (newCwd: string) => {
    setTabs((tabs) =>
      tabs.map((tab) => (tab.id === activeTabId ? { ...tab, cwd: newCwd } : tab))
    );
  };

  // Load persisted data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("axjns-theme");
      if (savedTheme) setTheme(savedTheme);

      const savedNotes = localStorage.getItem("axjns-notes");
      if (savedNotes) setNotes(JSON.parse(savedNotes));

      const savedGuestbook = localStorage.getItem("axjns-guestbook");
      if (savedGuestbook) setGuestbook(JSON.parse(savedGuestbook));

      const savedHistory = localStorage.getItem("axjns-history");
      if (savedHistory) setCommandHistory(JSON.parse(savedHistory));

      const savedTabs = localStorage.getItem("axjns-tabs");
      if (savedTabs) {
        const parsed = JSON.parse(savedTabs);
        setTabs(parsed.tabs);
        setActiveTabId(parsed.activeTabId);
      }
    }
  }, []);

  // Save tabs
  useEffect(() => {
    if (typeof window !== "undefined" && bootComplete) {
      localStorage.setItem("axjns-tabs", JSON.stringify({ tabs, activeTabId }));
    }
  }, [tabs, activeTabId, bootComplete]);

  // Save theme
  useEffect(() => {
    if (typeof window !== "undefined" && bootComplete) {
      localStorage.setItem("axjns-theme", theme);
    }
  }, [theme, bootComplete]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Boot sequence
  useEffect(() => {
    const bootSeq = [
      "BIOS v69.420 (C) 2024 axjns Corp.",
      "",
      "Booting axjns.dev...",
      "[ OK ] Started Matrix Rain Service",
      "[ OK ] Mounted /home/axjns",
      "[ OK ] Started Note Manager",
      "[ OK ] Reached target Multi-User System",
      "",
      "axjns.dev login: axjns",
      "Password: ",
      "Last login: " + new Date().toLocaleString(),
      "",
      FILE_CONTENT["/etc/motd"],
      "",
      PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"],
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < bootSeq.length) {
        setBootMessages((prev) => [...prev, bootSeq[i]]);
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
    if (theme !== "matrix" && theme !== "hacker") return;

    const matrixRain = document.getElementById("matrix-rain");
    if (!matrixRain) return;

    const oldCanvas = document.getElementById("matrix-canvas");
    if (oldCanvas) oldCanvas.remove();

    const canvas = document.createElement("canvas");
    canvas.id = "matrix-canvas";
    canvas.style.cssText =
      "position:absolute;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:0";
    matrixRain.appendChild(canvas);

    const ctx = canvas.getContext("2d");
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
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = fontSize + "px monospace";
      ctx.fillStyle = theme === "hacker" ? "#CCFF00" : "#39FF14";
      for (let i = 0; i < drops.length; i++) {
        const text = String.fromCharCode(0x30a0 + Math.random() * 96);
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
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      canvas.remove();
    };
  }, [theme, bootComplete]);

  const addTab = () => {
    const newId = Math.max(...tabs.map((t) => t.id)) + 1;
    const newTab: TerminalTab = {
      id: newId,
      title: `Terminal ${newId}`,
      history: [PAGE_OUTPUT[initialPath.current] || PAGE_OUTPUT["/"]],
      cwd: "/home/axjns",
      input: "",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (id: number) => {
    if (tabs.length === 1) return;
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  function prompt(dir: string) {
    return `axjns@dev:${dir}$`;
  }

  const handleCommand = (cmd: string) => {
    setTabCompletions([]);
    setTabIndex(0);

    const command = cmd.trim();
    if (!command) return;

    // Save to command history
    const newCmdHistory = [...commandHistory, command];
    setCommandHistory(newCmdHistory);
    setHistoryIndex(-1);
    if (typeof window !== "undefined") {
      localStorage.setItem("axjns-history", JSON.stringify(newCmdHistory));
    }

    const [base, ...args] = command.split(/\s+/);
    const arg = args.join(" ");

    // Active game mode - route input to game
    if (activeGame) {
      if (command === 'q' || command === 'quit') {
        setActiveGame(null);
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Game exited."]);
        return;
      }
      const result = activeGame.handleInput(command);
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, ...result.output]);
      if (result.done) {
        setActiveGame(null);
        setHistory((h) => [...h, "", "Type 'games' to play again."]);
      }
      return;
    }

    // Games command
    if (base === "games") {
      const list = GAME_LIST.map(g => `  ${g.id.padEnd(14)} ${g.description}`);
      setHistory((h) => [
        ...h,
        prompt(cwd) + " " + cmd,
        "Available games:",
        ...list,
        "",
        "Usage: play <game>",
      ]);
      return;
    }

    if (base === "play") {
      if (!arg) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Usage: play <game>. Type 'games' to see available games."]);
        return;
      }
      const entry = GAME_LIST.find(g => g.id === arg.toLowerCase());
      if (!entry) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `Unknown game: ${arg}. Type 'games' to see available games.`]);
        return;
      }
      entry.factory().then(game => {
        const initOutput = game.init();
        setActiveGame(game);
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, ...initOutput]);
      });
      return;
    }

    // Theme command
    if (base === "theme") {
      if (!arg) {
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          "Available themes: " + Object.keys(THEMES).join(", "),
          "Current: " + theme,
        ]);
        return;
      }
      if (THEMES[arg as ThemeKey]) {
        setTheme(arg);
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          `Theme changed to: ${THEMES[arg as ThemeKey].name}`,
        ]);
        return;
      }
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Unknown theme. Try: theme"]);
      return;
    }

    // Note system
    if (base === "note") {
      const subcmd = args[0];
      if (subcmd === "add") {
        const text = args.slice(1).join(" ");
        if (!text) {
          setHistory((h) => [...h, prompt(cwd) + " " + cmd, 'Usage: note add "your note text"']);
          return;
        }
        const note: Note = { id: Date.now(), text, timestamp: new Date().toLocaleString() };
        const newNotes = [...notes, note];
        setNotes(newNotes);
        if (typeof window !== "undefined") {
          localStorage.setItem("axjns-notes", JSON.stringify(newNotes));
        }
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `Note added (id: ${note.id})`]);
        return;
      }
      if (subcmd === "list" || !subcmd) {
        if (notes.length === 0) {
          setHistory((h) => [...h, prompt(cwd) + " " + cmd, 'No notes yet. Use: note add "text"']);
        } else {
          const noteList = notes.map((n) => `[${n.id}] ${n.timestamp}\n${n.text}`).join("\n\n");
          setHistory((h) => [...h, prompt(cwd) + " " + cmd, noteList]);
        }
        return;
      }
      if (subcmd === "rm") {
        const id = parseInt(args[1]);
        if (!id) {
          setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Usage: note rm <id>"]);
          return;
        }
        const newNotes = notes.filter((n) => n.id !== id);
        setNotes(newNotes);
        if (typeof window !== "undefined") {
          localStorage.setItem("axjns-notes", JSON.stringify(newNotes));
        }
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `Note ${id} deleted`]);
        return;
      }
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Usage: note [add|list|rm]"]);
      return;
    }

    // Guestbook
    if (base === "guestbook") {
      const subcmd = args[0];
      if (subcmd === "sign") {
        const name = args[1];
        const message = args.slice(2).join(" ");
        if (!name || !message) {
          setHistory((h) => [
            ...h,
            prompt(cwd) + " " + cmd,
            "Usage: guestbook sign <your-name> <message>",
          ]);
          return;
        }
        const entry: GuestbookEntry = {
          id: Date.now(),
          name,
          message,
          timestamp: new Date().toLocaleString(),
        };
        const newGuestbook = [...guestbook, entry];
        setGuestbook(newGuestbook);
        if (typeof window !== "undefined") {
          localStorage.setItem("axjns-guestbook", JSON.stringify(newGuestbook));
        }
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          `Thank you for signing, ${name}!`,
        ]);
        return;
      }
      if (subcmd === "read" || !subcmd) {
        if (guestbook.length === 0) {
          setHistory((h) => [
            ...h,
            prompt(cwd) + " " + cmd,
            "Guestbook is empty. Be the first!\nUsage: guestbook sign <name> <message>",
          ]);
        } else {
          const entries = guestbook
            .map((e) => `[${e.timestamp}] ${e.name}:\n${e.message}`)
            .join("\n\n");
          setHistory((h) => [
            ...h,
            prompt(cwd) + " " + cmd,
            `=== Guestbook (${guestbook.length} entries) ===\n\n${entries}`,
          ]);
        }
        return;
      }
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Usage: guestbook [sign|read]"]);
      return;
    }

    // History command
    if (base === "history") {
      if (commandHistory.length === 0) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, "No history yet"]);
      } else {
        const histList = commandHistory.map((c, i) => `${i + 1}  ${c}`).join("\n");
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, histList]);
      }
      return;
    }

    // Commands with arguments that need function calls
    if (base === "figlet" || base === "banner") {
      const fn = EASTER_EGGS[base === "banner" ? "banner" : "figlet"];
      const output = typeof fn === "function" ? fn(arg) : fn;
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, output]);
      return;
    }

    if (base === "ping" || base === "curl" || base === "wget" || base === "ssh" || base === "kill" || base === "man" || base === "echo") {
      const fn = EASTER_EGGS[base];
      if (fn) {
        const output = typeof fn === "function" ? fn(arg) : fn;
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, output]);
      }
      return;
    }

    // Filesystem commands
    if (base === "ls") {
      const target = resolvePath(cwd, arg || ".");
      if (isDirectory(target)) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, FS[target].join("  ") || ""]);
      } else if (isFile(target)) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `ls: ${arg}: Not a directory`]);
      } else {
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          `ls: cannot access '${arg}': No such file or directory`,
        ]);
      }
      return;
    }

    if (base === "cd") {
      if (!arg) {
        setCwd("/home/axjns");
        setHistory((h) => [...h, prompt(cwd) + " " + cmd]);
        return;
      }
      const target = resolvePath(cwd, arg);
      if (isDirectory(target)) {
        setCwd(target);
        setHistory((h) => [...h, prompt(cwd) + " " + cmd]);
      } else if (isFile(target)) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `cd: ${arg}: Not a directory`]);
      } else {
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          `cd: no such file or directory: ${arg}`,
        ]);
      }
      return;
    }

    if (base === "pwd") {
      setHistory((h) => [...h, prompt(cwd) + " " + cmd, cwd]);
      return;
    }

    if (base === "cat") {
      if (!arg) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, "Usage: cat <file>"]);
        return;
      }
      const target = arg.startsWith("/") ? arg : (cwd === "/" ? "/" + arg : cwd + "/" + arg);
      if (isFile(target)) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, FILE_CONTENT[target]]);
      } else if (isDirectory(target)) {
        setHistory((h) => [...h, prompt(cwd) + " " + cmd, `cat: ${arg}: Is a directory`]);
      } else {
        setHistory((h) => [
          ...h,
          prompt(cwd) + " " + cmd,
          `cat: ${arg}: No such file or directory`,
        ]);
      }
      return;
    }

    // Easter eggs (exact match first, then base command)
    const lower = command.toLowerCase();
    if (EASTER_EGGS[lower]) {
      const egg = EASTER_EGGS[lower];
      setHistory((h) => [
        ...h,
        prompt(cwd) + " " + cmd,
        typeof egg === "function" ? egg() : egg,
      ]);
      return;
    }
    if (EASTER_EGGS[base]) {
      const egg = EASTER_EGGS[base];
      setHistory((h) => [
        ...h,
        prompt(cwd) + " " + cmd,
        typeof egg === "function" ? egg(arg) : egg,
      ]);
      return;
    }

    // Navigation commands
    if (COMMANDS[lower as keyof typeof COMMANDS] && typeof COMMANDS[lower as keyof typeof COMMANDS] === "string") {
      router.push(COMMANDS[lower as keyof typeof COMMANDS]!);
      setHistory((h) => [...h, prompt(cwd) + " " + cmd]);
      return;
    }

    if (lower === "help") {
      setHistory((h) => [
        ...h,
        prompt(cwd) + " " + cmd,
        "Available commands:",
        "  Navigation:  home, about, speaking, blog, cv",
        "  Files:       ls, cd, pwd, cat, tree",
        "  System:      neofetch, whoami, uname, hostname, uptime, top, htop, ps, free, df, du",
        "  Network:     ping, curl, wget, ssh",
        "  Dev tools:   git [status|blame|push|commit], docker [ps|run], kubectl [get pods|nodes]",
        "  Tools:       note [add|list|rm], guestbook [sign|read], theme, history, man, echo, date",
        "  Fun:         cowsay, fortune, sl, figlet, banner",
        "  Games:       games, play <game>",
        "  clear        Clear the terminal",
      ]);
      return;
    }

    if (lower === "clear") {
      setHistory([]);
      return;
    }

    setHistory((h) => [...h, prompt(cwd) + " " + cmd, `command not found: ${cmd}`]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
      setTabCompletions([]);
      setTabIndex(0);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
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

    if (e.key === "Tab") {
      e.preventDefault();
      if (tabCompletions.length === 0) {
        const completions = getCompletions(input, cwd);
        if (completions.length === 0) return;
        if (completions.length === 1) {
          const parts = input.split(" ");
          parts[parts.length - 1] = completions[0];
          setInput(parts.join(" ") + " ");
        } else {
          setTabCompletions(completions);
          setTabIndex(0);
          setHistory((h) => [...h, prompt(cwd) + " " + input, completions.join("  ")]);
        }
      } else {
        const newIndex = (tabIndex + 1) % tabCompletions.length;
        setTabIndex(newIndex);
        const parts = input.split(" ");
        parts[parts.length - 1] = tabCompletions[newIndex];
        setInput(parts.join(" "));
      }
      return;
    }

    if (tabCompletions.length > 0) {
      setTabCompletions([]);
      setTabIndex(0);
    }
  };

  // Boot screen
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
      <body
        className={`${themeConfig.bg} ${themeConfig.text} font-mono min-h-screen relative antialiased overflow-x-hidden`}
      >
        <div id="matrix-rain" className="fixed inset-0 z-0 pointer-events-none" aria-hidden />
        <div className="flex flex-col items-center min-h-screen">
          <div
            className={`w-full max-w-4xl mt-8 border ${themeConfig.text} border-opacity-30 ${themeConfig.bg} bg-opacity-95 rounded shadow-lg relative z-10`}
          >
            {/* Menu Bar */}
            <div
              className={`flex items-center justify-between px-4 py-2 border-b ${themeConfig.text} border-opacity-30`}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold">axjns.dev</span>
                <div className="relative">
                  <button
                    onClick={() => setShowTerminalMenu(!showTerminalMenu)}
                    className="px-2 py-1 text-sm hover:opacity-70 transition-opacity"
                  >
                    Terminal
                  </button>
                  {showTerminalMenu && (
                    <div
                      className={`absolute top-full left-0 mt-1 ${themeConfig.bg} border ${themeConfig.text} border-opacity-50 rounded shadow-lg z-20 min-w-[200px]`}
                    >
                      <div className="px-4 py-2 text-xs opacity-60 border-b border-opacity-20">
                        Theme
                      </div>
                      {Object.entries(THEMES).map(([key, themeOption]) => (
                        <button
                          key={key}
                          onClick={() => {
                            setTheme(key);
                            setShowTerminalMenu(false);
                          }}
                          className={`block w-full text-left px-4 py-2 text-sm hover:opacity-70 transition-opacity ${
                            key === theme ? "font-bold" : ""
                          }`}
                        >
                          {key === theme ? "✓ " : "  "}
                          {themeOption.name}
                        </button>
                      ))}
                      <div className="border-t border-opacity-20 my-1" />
                      <button
                        onClick={() => {
                          addTab();
                          setShowTerminalMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm hover:opacity-70 transition-opacity"
                      >
                        New Terminal
                      </button>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowHelpModal(true)}
                  className="px-2 py-1 text-sm hover:opacity-70 transition-opacity"
                >
                  Help
                </button>
              </div>
              <button
                onClick={addTab}
                className={`px-3 py-1 text-sm border ${themeConfig.text} border-opacity-50 rounded hover:opacity-70 transition-opacity`}
                title="New Terminal Tab"
              >
                + New Tab
              </button>
            </div>

            {/* Tab Bar */}
            <div
              className={`flex items-center gap-1 px-2 py-1 border-b ${themeConfig.text} border-opacity-20 overflow-x-auto`}
            >
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`flex items-center gap-2 px-3 py-1 text-sm rounded-t cursor-pointer transition-opacity ${
                    tab.id === activeTabId ? "opacity-100 font-bold" : "opacity-60 hover:opacity-100"
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

            {/* Terminal */}
            <div
              ref={terminalRef}
              className="p-6 whitespace-pre-wrap break-words font-mono text-base min-h-[60vh] max-h-[80vh] overflow-y-auto"
              onClick={() => inputRef.current && inputRef.current.focus()}
            >
              {history.map((line, i) => (
                <div key={i} className="break-words whitespace-pre-wrap">
                  {line}
                </div>
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

            {/* Help Modal */}
            {showHelpModal && (
              <div
                className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
                onClick={() => setShowHelpModal(false)}
              >
                <div
                  className={`${themeConfig.bg} ${themeConfig.text} border ${themeConfig.text} border-opacity-50 rounded-lg shadow-2xl max-w-md w-full mx-4 p-6`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">About axjns.dev</h2>
                    <button
                      onClick={() => setShowHelpModal(false)}
                      className="text-2xl hover:opacity-70 transition-opacity leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <div className="space-y-4">
                    <p>
                      This is the personal website of{" "}
                      <span className="font-bold">Alex Jones</span>.
                    </p>
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
                    <div
                      className={`mt-6 pt-4 border-t ${themeConfig.text} border-opacity-30 text-sm opacity-70`}
                    >
                      <p>
                        Type{" "}
                        <span className={`${themeConfig.prompt} font-bold`}>help</span> in the
                        terminal for available commands.
                      </p>
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
