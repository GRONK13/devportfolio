"use client";

import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export function DeveloperTerminal() {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [passwordMode, setPasswordMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "",
      output: (
        <div className="space-y-1">
          <p className="text-primary font-bold">Welcome to Gregg&apos;s Interactive Shell v1.2.0 (Type &apos;help&apos; for commands)</p>
          <p className="text-muted-foreground text-xs">System status: ACTIVE | Location: Mandaue City, PH</p>
        </div>
      ),
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (historyContainerRef.current) {
      historyContainerRef.current.scrollTop = historyContainerRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (passwordMode) {
        handlePasswordSubmit(input);
        setInput("");
        return;
      }
      executeCommand(input.trim());
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      setInput(commandHistory[newIndex]);
      setHistoryIndex(newIndex);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setInput("");
        setHistoryIndex(-1);
      } else {
        setInput(commandHistory[newIndex]);
        setHistoryIndex(newIndex);
      }
    }
  };

  const executeCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase();
    let output: string | React.ReactNode = "";

    if (cmd !== "") {
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    switch (lowerCmd) {
      case "help":
        output = (
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm max-w-md">
            <div><span className="text-primary font-bold">help</span></div>
            <div className="text-muted-foreground">List all available commands</div>
            <div><span className="text-primary font-bold">about</span></div>
            <div className="text-muted-foreground">Print bio and info</div>
            <div><span className="text-primary font-bold">skills</span></div>
            <div className="text-muted-foreground">List core technical skills</div>
            <div><span className="text-primary font-bold">projects</span></div>
            <div className="text-muted-foreground">List portfolio projects</div>
            <div><span className="text-primary font-bold">contact</span></div>
            <div className="text-muted-foreground">Show email and social links</div>
            <div><span className="text-primary font-bold">theme</span></div>
            <div className="text-muted-foreground">Toggle light/dark mode</div>
            <div><span className="text-primary font-bold">game</span></div>
            <div className="text-muted-foreground">Play a quick terminal game</div>
            <div><span className="text-primary font-bold">sudo [cmd]</span></div>
            <div className="text-muted-foreground">Execute admin instructions</div>
            <div><span className="text-primary font-bold">matrix</span></div>
            <div className="text-muted-foreground">Digital code rain simulator</div>
            <div><span className="text-primary font-bold">clear</span></div>
            <div className="text-muted-foreground">Clear screen history</div>
          </div>
        );
        break;
      case "about":
        output = (
          <div className="space-y-2 max-w-2xl">
            <p>
              <span className="font-bold text-primary">Name:</span> Gregg Marayan
            </p>
            <p>
              <span className="font-bold text-primary">Role:</span> Full Stack Developer & Information Technology Graduate
            </p>
            <p className="text-muted-foreground">
              I graduated in Information Technology from the University of San Carlos, Talamban, Cebu. 
              My tech journey started with robotics microcontrollers and expanded into backend APIs, database management, 
              cybersecurity threat modeling, and modern web application development. I love building practical tools that make workflows easier.
            </p>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="space-y-2">
            <p className="font-bold text-primary">Technical Toolkit Matrix:</p>
            <div className="space-y-1 text-sm">
              <p><span className="text-yellow-500 font-bold">[Frontend]:</span> React, Next.js, TypeScript, JavaScript, TailwindCSS, Framer Motion</p>
              <p><span className="text-blue-500 font-bold">[Backend]:</span> Node.js, Express, REST APIs, GraphQL</p>
              <p><span className="text-green-500 font-bold">[Database]:</span> PostgreSQL, Supabase, Prisma ORM</p>
              <p><span className="text-purple-500 font-bold">[DevOps/Tools]:</span> Docker, Git, Vercel, VS Code, Figma, Postman</p>
              <p><span className="text-red-500 font-bold">[Certifications]:</span> Cisco CyberOps Associate, Cisco Intro to Cybersecurity</p>
            </div>
          </div>
        );
        break;
      case "projects":
        output = (
          <div className="space-y-3">
            <p className="font-bold text-primary">Featured Projects:</p>
            <div className="space-y-2">
              <div>
                <p className="font-bold">1. J&A Car Rental System</p>
                <p className="text-muted-foreground text-xs pl-4">Mobile-first full stack booking & booking dashboard system using React, Express, and PostgreSQL.</p>
              </div>
              <div>
                <p className="font-bold">2. USC Lost & Found Portal</p>
                <p className="text-muted-foreground text-xs pl-4">Platform for students to report/recover items built with Next.js, Tailwind, and Supabase.</p>
              </div>
              <div>
                <p className="font-bold">3. DevKwest</p>
                <p className="text-muted-foreground text-xs pl-4">Skill improvement board with Next.js, Framer Motion, and Supabase integration.</p>
              </div>
            </div>
          </div>
        );
        break;
      case "contact":
        output = (
          <div className="space-y-1">
            <p><span className="font-bold text-primary">Email:</span> gregg.marayan@gmail.com</p>
            <p><span className="font-bold text-primary">Phone:</span> +63 (992) 531-5378</p>
            <p><span className="font-bold text-primary">GitHub:</span> https://github.com/GRONK13</p>
            <p><span className="font-bold text-primary">LinkedIn:</span> linkedin.com/in/gregg-marayan</p>
          </div>
        );
        break;
      case "theme":
        const targetTheme = theme === "dark" ? "light" : "dark";
        setTheme(targetTheme);
        output = `System visual theme updated to: ${targetTheme.toUpperCase()}`;
        break;
      case "clear":
        setHistory([]);
        return;
      case "su root":
      case "su":
        setPasswordMode(true);
        setHistory((prev) => [...prev, { command: cmd, output: "Password: " }]);
        return;
      case "sudo":
        output = "Usage: sudo [command]. Try: sudo hacker, sudo clean-room, or sudo coffee";
        break;
      case "sudo hacker":
        output = (
          <div className="text-green-500 font-mono space-y-1 animate-pulse">
            <p>Initializing security penetration sequence...</p>
            <p>[OK] Connected to port 22/SSH...</p>
            <p>[OK] Intercepting network traffic streams...</p>
            <p>[ALERT] Cisco CyberOps Shield Activated. Access Restricted.</p>
          </div>
        );
        break;
      case "sudo clean-room":
        output = "BEEP BOOP. Running automated digital vacuum. Codebase is now pristine!";
        break;
      case "sudo coffee":
        output = "☕ Coffee brewed successfully. Coding speed increased by 45%.";
        break;
      case "game":
        output = (
          <div className="space-y-1">
            <p className="text-yellow-500 font-bold">🎮 Terminal Mini-Game Activated!</p>
            <p>I am thinking of a tech keyword. Can you guess it? Try typing:</p>
            <p className="pl-4 text-xs font-mono text-muted-foreground">`guess [word]` (Hint: options might include react, docker, supabase, nextjs, 42)</p>
          </div>
        );
        break;
      case "matrix":
        output = <MatrixRain />;
        break;
      default:
        if (lowerCmd.startsWith("guess ")) {
          const guessVal = lowerCmd.split(" ")[1];
          const correctGuesses = ["42", "react", "nextjs", "supabase", "docker", "robotics"];
          if (correctGuesses.includes(guessVal)) {
            output = `🎉 YES! "${guessVal}" is correct! You possess true engineering intellect.`;
          } else {
            output = `❌ Negative. "${guessVal}" is incorrect. Type 'game' to see hints.`;
          }
        } else if (lowerCmd.startsWith("sudo ")) {
          output = `Permission denied. guest user is not in the sudoers file. This incident has been logged.`;
        } else {
          output = `Command not found: '${cmd}'. Type 'help' for a list of valid commands.`;
        }
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
  };

  const handlePasswordSubmit = async (password: string) => {
    setPasswordMode(false);
    const masked = "•".repeat(password.length);
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setHistory((prev) => [
          ...prev,
          {
            command: masked,
            output: (
              <div className="text-green-500 font-mono space-y-1">
                <p>[OK] Authentication successful.</p>
                <p>[OK] Elevating privileges to root...</p>
                <p className="animate-pulse">[REDIRECT] Loading control panel...</p>
              </div>
            ),
          },
        ]);
        setTimeout(() => router.push("/cmd"), 1200);
      } else {
        setHistory((prev) => [
          ...prev,
          { command: masked, output: "su: Authentication failure" },
        ]);
      }
    } catch {
      setHistory((prev) => [
        ...prev,
        { command: masked, output: "su: Authentication failure" },
      ]);
    }
  };

  return (
    <div 
      onClick={focusInput}
      className="w-full h-80 rounded-lg bg-black/90 text-green-400 font-mono p-4 flex flex-col border border-primary/30 glow shadow-2xl text-left text-sm cursor-text terminal-container relative"
    >
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3 select-none">
        <div className="flex space-x-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
        </div>
        <div className="text-xs text-zinc-400 font-semibold flex-1 text-center pr-10">
          guest@greggmarayan: ~ (bash)
        </div>
      </div>

      {/* Terminal History */}
      <div 
        ref={historyContainerRef}
        className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-800 pr-1"
      >
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            {item.command && (
              <div className="flex items-center space-x-1">
                <span className="text-primary font-bold">guest@greggmarayan:~$</span>
                <span>{item.command}</span>
              </div>
            )}
            <div className="pl-2 leading-relaxed text-zinc-300 font-mono whitespace-pre-wrap">
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <div className="mt-2 pt-2 border-t border-zinc-800/50 flex items-center space-x-1">
        <span className="text-primary font-bold flex-shrink-0">
          {passwordMode ? "Password:" : "guest@greggmarayan:~$"}
        </span>
        <input
          ref={inputRef}
          type={passwordMode ? "password" : "text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-zinc-200 focus:ring-0 p-0 font-mono text-sm leading-none"
          autoFocus
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>
    </div>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions based on container
    const width = canvas.parentElement?.offsetWidth || 400;
    canvas.width = width;
    canvas.height = 180;

    const columns = Math.floor(width / 12);
    const rainDrops = Array(columns).fill(1);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%&*+-/<>[]{}";

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22c55e"; // emerald green
      ctx.font = "11px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * 12, rainDrops[i] * 12);

        if (rainDrops[i] * 12 > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden my-2 rounded border border-green-500/20">
      <canvas ref={canvasRef} className="w-full block bg-black" />
    </div>
  );
}
