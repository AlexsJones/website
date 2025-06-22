"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

const asciiArt = `
    _      _            _       _                      
   / \\    | | __ _  ___| | __  | |      ___   ___  ___ 
  / _ \\   | |/ _\` |/ __| |/ /  | |     / _ \\ / _ \\/ __|
 / ___ \\  | | (_| | (__|   <   | |___ | (_) |  __/\\__ \\
/_/   \\_\\ |_|\\__,_|\\___|_|\\_\\  |____(_)\\___/ \\___||___/

              Alex Jones
`;

function BlinkingCursor() {
  return <span className="inline-block w-2 h-5 bg-green-400 align-bottom animate-blink ml-1" style={{animation: 'blink 1s steps(2, start) infinite'}}></span>;
}

const COMMANDS = {
  about: "/about",
  speaking: "/speaking",
  blog: "/blog",
  cv: "/cv",
  help: null,
  clear: null,
};

export default function Home() {
  const [history, setHistory] = useState([
    asciiArt,
    "Welcome to axjns.dev",
    "Type a command or use the menu above.",
  ]);
  const [input, setInput] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const inputRef = useRef(null);
  const router = useRouter();

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase() as keyof typeof COMMANDS;
    if (COMMANDS[command] && typeof COMMANDS[command] === "string") {
      router.push(COMMANDS[command]!);
      return;
    }
    if (command === "help") {
      setHistory((h) => [
        ...h,
        `axjns@dev:~$ ${cmd}`,
        "Available commands: about, speaking, blog, cv, help, clear",
      ]);
      return;
    }
    if (command === "clear") {
      setHistory([]);
      return;
    }
    setHistory((h) => [
      ...h,
      `axjns@dev:~$ ${cmd}`,
      `command not found: ${cmd}`,
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  return (
    <div
      className="whitespace-pre text-green-400 font-mono text-base min-h-[60vh]"
      onClick={() => inputRef.current && (inputRef.current as any).focus()}
    >
      {history.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
      <div className="flex items-center">
        <span className="text-green-300">axjns@dev:~$</span>
        <input
          ref={inputRef}
          className="bg-transparent border-none outline-none text-green-400 font-mono ml-2 w-48"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
        {showCursor && <BlinkingCursor />}
      </div>
    </div>
  );
}
