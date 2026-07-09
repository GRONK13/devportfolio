"use client";

import { useState, useMemo } from "react";
import { GitBranch, GitCommit, GitPullRequest, Award, Activity } from "lucide-react";

interface CommitMsg {
  repo: string;
  msg: string;
  time: string;
}

const mockCommits: CommitMsg[] = [
  { repo: "devkwest", msg: "feat: add framer motion page transition layout tags", time: "2 hours ago" },
  { repo: "ja-car-rental-system", msg: "fix: resolve prisma postgresql ssl connection pooling pool-leak", time: "1 day ago" },
  { repo: "lost-and-found", msg: "refactor: optimize supabase real-time listener subscriptions", time: "3 days ago" },
  { repo: "devportfolio", msg: "feat: inject interactive developer terminal and SOC cyberops dashboard", time: "4 days ago" },
  { repo: "ja-car-rental-system", msg: "docs: add comprehensive readme instructions for environment setup", time: "1 week ago" }
];

export function GitHubStats() {
  const [selectedDay, setSelectedDay] = useState<{ day: number; commits: number } | null>(null);

  // Generate 52 weeks * 7 days of mock commit activity data
  const gridData = useMemo(() => {
    const data = [];
    // Seed random commits with some pattern (more commits on weekdays, fewer on weekends)
    for (let i = 0; i < 364; i++) {
      const dayOfWeek = i % 7;
      let weight = Math.random();
      if (dayOfWeek === 0 || dayOfWeek === 6) weight *= 0.3; // weekend dip
      
      let commits = 0;
      if (weight > 0.85) commits = Math.floor(Math.random() * 8) + 5;
      else if (weight > 0.5) commits = Math.floor(Math.random() * 4) + 1;
      else if (weight > 0.2) commits = 0;
      
      data.push(commits);
    }
    return data;
  }, []);

  const totalCommits = useMemo(() => gridData.reduce((a, b) => a + b, 0), [gridData]);

  const getIntensityClass = (commits: number) => {
    if (commits === 0) return "bg-zinc-100 dark:bg-zinc-900 border-zinc-200/20";
    if (commits < 3) return "bg-emerald-900/30 text-emerald-100 border-emerald-950/20";
    if (commits < 6) return "bg-emerald-700/50 text-emerald-100 border-emerald-800/20";
    if (commits < 9) return "bg-emerald-500/75 text-emerald-500 border-emerald-600/20";
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
              <p className="text-xs text-muted-foreground font-mono">Mock activity tracking for Gregg&apos;s active repositories</p>
            </div>
          </div>

          <div className="flex gap-6 font-mono text-sm">
            <div className="flex items-center gap-1.5">
              <GitCommit className="h-4 w-4 text-primary" />
              <span><strong className="text-primary">{totalCommits}</strong> Commits</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitPullRequest className="h-4 w-4 text-emerald-500" />
              <span><strong className="text-emerald-500">47</strong> Pull Requests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-4 w-4 text-sky-500" />
              <span><strong className="text-sky-500">12</strong> active branches</span>
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
                {gridData.map((commits, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedDay({ day: idx, commits })}
                    className={`w-[11px] h-[11px] rounded-sm border focus:ring-1 focus:ring-primary/50 transition-all cursor-pointer ${getIntensityClass(commits)}`}
                    title={`${commits} commits`}
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
              {mockCommits.map((item, idx) => (
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
