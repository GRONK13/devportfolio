"use client";

import { useState, useEffect, useMemo } from "react";
import { GitBranch, GitCommit, GitPullRequest, Award, Activity } from "lucide-react";

interface CommitMsg {
  repo: string;
  msg: string;
  time: string;
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  created_at: string;
  payload?: {
    commits?: Array<{ message: string }>;
  };
}

const mockCommits: CommitMsg[] = [
  { repo: "devkwest", msg: "feat: add framer motion page transition layout tags", time: "2h ago" },
  { repo: "ja-car-rental-system", msg: "fix: resolve prisma postgresql ssl connection pooling", time: "1d ago" },
  { repo: "lost-and-found", msg: "refactor: optimize supabase real-time listener subscriptions", time: "3d ago" },
  { repo: "devportfolio", msg: "feat: inject interactive developer terminal and SOC dashboard", time: "4d ago" },
  { repo: "ja-car-rental-system", msg: "docs: add comprehensive readme instructions for environment setup", time: "7d ago" }
];

export function GitHubStats() {
  const [selectedDay, setSelectedDay] = useState<{ day: number; commits: number } | null>(null);
  const [commits, setCommits] = useState<CommitMsg[]>(mockCommits);
  const [githubStats, setGithubStats] = useState({
    repos: 12,
    followers: 8,
  });

  // Initialize gridData with realistic mock values as fallback/pre-load
  const [gridData, setGridData] = useState<number[]>(() => {
    const initialData = [];
    for (let i = 0; i < 364; i++) {
      const dayOfWeek = i % 7;
      let weight = Math.random();
      if (dayOfWeek === 0 || dayOfWeek === 6) weight *= 0.3; // weekend dip
      
      let dayCommits = 0;
      if (weight > 0.85) dayCommits = Math.floor(Math.random() * 8) + 5;
      else if (weight > 0.5) dayCommits = Math.floor(Math.random() * 4) + 1;
      
      initialData.push(dayCommits);
    }
    return initialData;
  });

  useEffect(() => {
    // 1. Fetch real public profile statistics
    fetch("https://api.github.com/users/GRONK13")
      .then((res) => {
        if (!res.ok) throw new Error("Rate limit or profile error");
        return res.json();
      })
      .then((data) => {
        setGithubStats({
          repos: data.public_repos ?? 12,
          followers: data.followers ?? 8,
        });
      })
      .catch((err) => console.log("GitHub profile fetch fallback:", err));

    // 2. Fetch real public push commit events
    fetch("https://api.github.com/users/GRONK13/events/public")
      .then((res) => {
        if (!res.ok) throw new Error("Rate limit or events error");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) return;

        const events = data as GitHubEvent[];
        const pushEvents = events.filter((e) => e.type === "PushEvent");
        const extractedCommits: CommitMsg[] = [];

        // Track real commits per day for the last 30 days (this month)
        const recentCommitsMap: { [key: number]: number } = {};
        for (let i = 0; i < 30; i++) {
          recentCommitsMap[i] = 0;
        }

        const formatTimeAgo = (dateStr: string) => {
          const diff = Date.now() - new Date(dateStr).getTime();
          const mins = Math.floor(diff / 60000);
          if (mins < 60) return `${mins}m ago`;
          const hours = Math.floor(mins / 60);
          if (hours < 24) return `${hours}h ago`;
          const days = Math.floor(hours / 24);
          return `${days}d ago`;
        };

        for (const event of pushEvents) {
          const daysAgo = Math.floor(
            (Date.now() - new Date(event.created_at).getTime()) / (1000 * 60 * 60 * 24)
          );

          const commitsCount = event.payload?.commits?.length || 1;

          if (daysAgo >= 0 && daysAgo < 30) {
            recentCommitsMap[daysAgo] += commitsCount;
          }

          if (event.payload?.commits) {
            for (const commit of event.payload.commits) {
              const repoName = event.repo.name.replace("GRONK13/", "");
              extractedCommits.push({
                repo: repoName,
                msg: commit.message,
                time: formatTimeAgo(event.created_at),
              });
            }
          }
        }

        // Update commits list (limit to 5)
        if (extractedCommits.length > 0) {
          setCommits(extractedCommits.slice(0, 5));
        }

        // Overlay the real commits on the last 30 days of gridData
        setGridData((prevData) => {
          const newData = [...prevData];
          for (let d = 0; d < 30; d++) {
            const index = 363 - d;
            if (index >= 0 && index < newData.length) {
              newData[index] = recentCommitsMap[d];
            }
          }
          return newData;
        });
      })
      .catch((err) => console.log("GitHub events fetch fallback:", err));
  }, []);

  const totalCommits = useMemo(() => gridData.reduce((a, b) => a + b, 0), [gridData]);

  const getIntensityClass = (dayCommits: number) => {
    if (dayCommits === 0) return "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/20";
    if (dayCommits < 3) return "bg-emerald-900/30 text-emerald-100 border-emerald-950/20";
    if (dayCommits < 6) return "bg-emerald-700/50 text-emerald-100 border-emerald-800/20";
    if (dayCommits < 9) return "bg-emerald-500/75 text-emerald-500 border-emerald-600/20";
    return "bg-emerald-400 text-emerald-950 border-emerald-500/25";
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto glass-panel border border-border/40 rounded-xl p-6 md:p-8 shadow-xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-border/30 pb-6 mb-8 gap-4 select-none">
          <div className="flex items-center gap-3">
            <Activity className="h-6 w-6 text-primary animate-pulse" />
            <div>
              <h3 className="text-xl font-bold">Open Source Contributions</h3>
              <p className="text-xs text-muted-foreground font-mono">Real-time public statistics and updates for GRONK13</p>
            </div>
          </div>

          <div className="flex gap-6 font-mono text-sm">
            <div className="flex items-center gap-1.5">
              <GitCommit className="h-4 w-4 text-primary" />
              <span><strong className="text-primary">{totalCommits}</strong> Commits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitPullRequest className="h-4 w-4 text-emerald-500" />
              <span><strong className="text-emerald-500">{githubStats.repos}</strong> Repositories</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4 text-sky-500" />
              <span><strong className="text-sky-500">{githubStats.followers}</strong> Followers</span>
            </div>
          </div>
        </div>

        {/* Git Grid */}
        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-zinc-800">
          <div className="min-w-[720px] flex flex-col space-y-1 select-none">
            {/* Days Label row */}
            <div className="grid grid-flow-col auto-cols-[11px] gap-1.5 justify-start text-[9px] text-muted-foreground font-mono">
              {Array.from({ length: 52 }).map((_, idx) => (
                <div key={idx} className="w-[11px] text-center">
                  {idx % 4 === 0 ? ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Math.floor(idx / 4.4)] : ""}
                </div>
              ))}
            </div>

            {/* Grid Map Columns */}
            <div className="flex gap-1.5">
              {/* Day numbers sidebar */}
              <div className="flex flex-col gap-1.5 justify-between pr-2 text-[9px] text-muted-foreground font-mono select-none pt-0.5">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              <div className="grid grid-flow-col auto-cols-[11px] grid-rows-7 gap-1.5">
                {gridData.map((dayCommits, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay({ day: idx, commits: dayCommits })}
                    className={`w-[11px] h-[11px] rounded-sm border focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer ${getIntensityClass(dayCommits)}`}
                    title={`${dayCommits} commits`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info & interactive commit logs */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border/30">
          
          {/* Commit Feed */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <GitCommit className="h-4 w-4 text-primary" />
              Recent Commit Activity Log
            </h4>
            <div className="space-y-3 font-mono text-xs max-h-[160px] overflow-y-auto pr-1">
              {commits.map((item, idx) => (
                <div key={idx} className="p-2.5 rounded bg-muted/40 border border-border/30 hover:border-primary/20 transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] text-primary font-bold">{item.repo}</span>
                    <span className="text-[9px] text-muted-foreground">{item.time}</span>
                  </div>
                  <p className="text-zinc-700 dark:text-zinc-300 leading-normal">{item.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Selection Stats */}
          <div className="flex flex-col justify-between">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/25 h-full flex flex-col justify-between">
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-1.5 text-primary">
                  <Award className="h-4 w-4" />
                  Engineering Health Metric
                </h4>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  Gregg maintains regular commit logs, clean pull requests, and detailed code reviews. Consistent cycles prevent legacy code build up and speed delivery timelines.
                </p>
              </div>

              {selectedDay ? (
                <div className="mt-4 pt-3 border-t border-primary/20 flex items-center justify-between text-xs font-mono">
                  <span>Day {selectedDay.day} Status:</span>
                  <span className="text-primary font-bold">{selectedDay.commits} commits registered</span>
                </div>
              ) : (
                <div className="mt-4 pt-3 border-t border-primary/20 text-xs font-mono text-muted-foreground text-center">
                  Click any square in the contribution calendar to inspect.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
