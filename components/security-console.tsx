"use client";

import { useState, useEffect, useRef } from "react";
import { Shield, ShieldAlert, ShieldCheck, Terminal as TermIcon, RefreshCw, Key, Lock } from "lucide-react";

interface LogEntry {
  timestamp: string;
  level: "INFO" | "WARN" | "ALERT" | "SUCCESS";
  source: string;
  message: string;
}

const mockLogTemplates = [
  { level: "INFO", source: "IPS-FIREWALL", message: "Decrypted incoming SSL payload on Port 443" },
  { level: "SUCCESS", source: "AUTH-SERVICE", message: "JWT token verified for session client_user_78b" },
  { level: "WARN", source: "API-GATEWAY", message: "Rate limit threshold reached for IP 198.51.100.45" },
  { level: "INFO", source: "END-DEFENSE", message: "Signature database updated (2,450 new threat definitions)" },
  { level: "ALERT", source: "SOC-MONITOR", message: "Brute-force SSH attempt detected from 203.0.113.88" },
  { level: "SUCCESS", source: "SEC-COMPLIANCE", message: "Periodic credential rotation validated successfully" },
  { level: "WARN", source: "NET-MONITOR", message: "Unusual egress traffic volume detected on VLAN 12" },
  { level: "ALERT", source: "IPS-FIREWALL", message: "SQL Injection attack signature matched on query parameters" }
];

export function SecurityConsole() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanResult, setScanResult] = useState<"clean" | "warning" | null>(null);
  
  // Crypto Sandbox States
  const [plainText, setPlainText] = useState("Cisco CyberOps Associate");
  const [hashedText, setHashedText] = useState("");

  const logsContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Initial logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [];
    for (let i = 0; i < 6; i++) {
      const template = mockLogTemplates[Math.floor(Math.random() * mockLogTemplates.length)];
      const now = new Date();
      initialLogs.push({
        timestamp: now.toLocaleTimeString(),
        level: template.level as LogEntry["level"],
        source: template.source,
        message: template.message
      });
    }
    setLogs(initialLogs);
  }, []);

  // Stream logs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (isScanning) return; // Freeze normal stream during scanning
      
      const template = mockLogTemplates[Math.floor(Math.random() * mockLogTemplates.length)];
      const now = new Date();
      setLogs((prev) => {
        const nextLogs = [...prev, {
          timestamp: now.toLocaleTimeString(),
          level: template.level as LogEntry["level"],
          source: template.source,
          message: template.message
        }];
        return nextLogs.slice(-20); // Keep last 20 logs
      });
    }, 4500);

    return () => clearInterval(interval);
  }, [isScanning]);

  // Handle Mock Scan
  const startSecurityScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setScanResult(null);

    // Rapidly inject scan logs
    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setIsScanning(false);
          setScanResult(Math.random() > 0.3 ? "clean" : "warning");
          return 100;
        }
        return prev + 10;
      });

      // Add a scan specific log
      const now = new Date();
      setLogs((prev) => {
        const scanSteps = [
          "Verifying package.json dependency integrity...",
          "Checking database indexing & PostgreSQL vulnerabilities...",
          "Reviewing open ports and firewall ACL configurations...",
          "Validating cryptographic hashing methods and salt configurations...",
          "Parsing web app CORS policies and CSRF tokens...",
          "Assessing threat vector footprints and endpoint logs..."
        ];
        const step = scanSteps[Math.floor(Math.random() * scanSteps.length)];
        return [...prev, {
          timestamp: now.toLocaleTimeString(),
          level: "INFO" as const,
          source: "VULN-SCANNER",
          message: `[SCANNING] ${step}`
        }].slice(-20);
      });
    }, 400);
  };

  // Basic mock SHA-256 function (returns a deterministic hex string for visual feedback)
  useEffect(() => {
    if (!plainText) {
      setHashedText("");
      return;
    }
    
    // Simple mock hash generation (Fowler-Noll-Vo hash variant or similar for display)
    let hash = 0x811c9dc5;
    for (let i = 0; i < plainText.length; i++) {
      hash ^= plainText.charCodeAt(i);
      hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
    }
    const hex = (hash >>> 0).toString(16).padStart(8, "0") + 
                (hash * 3 >>> 0).toString(16).padStart(8, "0") + 
                (hash * 7 >>> 0).toString(16).padStart(8, "0") + 
                (hash * 13 >>> 0).toString(16).padStart(8, "0");
    setHashedText(hex.slice(0, 32).toUpperCase());
  }, [plainText]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20 border-t border-b border-border/40 relative overflow-hidden">
      {/* Visual cyber mesh background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            Security & Operations Simulator
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-2">
            Showcasing Cisco CyberOps threat intelligence and cryptographic fundamentals with interactive simulation modules.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main SOC Monitor */}
          <div className="lg:col-span-2 flex flex-col h-[420px] rounded-lg border bg-card/60 backdrop-blur-sm shadow-xl overflow-hidden relative">
            
            {/* Console Scan Line Effect */}
            {isScanning && (
              <div className="absolute inset-x-0 h-1 bg-primary/45 shadow-[0_0_8px_oklch(0.7_0.18_260)] z-20 animate-scanning" />
            )}

            <div className="bg-muted px-4 py-3 flex items-center justify-between border-b select-none">
              <div className="flex items-center space-x-2">
                <TermIcon className="h-4 w-4 text-primary" />
                <span className="font-mono text-xs font-bold">Threat Detection Feed & Log Stream</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] text-muted-foreground font-mono">SOC_MONITOR: ACTIVE</span>
              </div>
            </div>

            {/* Logs Area */}
            <div 
              ref={logsContainerRef}
              className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 bg-black/5 dark:bg-black/40"
            >
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-start space-x-2 leading-relaxed">
                  <span className="text-muted-foreground select-none flex-shrink-0">[{log.timestamp}]</span>
                  <span className={`font-semibold flex-shrink-0 select-none ${
                    log.level === "ALERT" ? "text-rose-500" :
                    log.level === "WARN" ? "text-amber-500" :
                    log.level === "SUCCESS" ? "text-emerald-500" : "text-sky-500"
                  }`}>
                    [{log.level}]
                  </span>
                  <span className="text-primary font-semibold select-none flex-shrink-0">[{log.source}]:</span>
                  <span className="text-zinc-700 dark:text-zinc-300">{log.message}</span>
                </div>
              ))}
            </div>

            {/* Console Control Bar */}
            <div className="p-3 border-t bg-muted/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={startSecurityScan}
                  disabled={isScanning}
                  className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold rounded bg-primary text-primary-foreground hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  <RefreshCw className={`h-3 w-3 ${isScanning ? 'animate-spin' : ''}`} />
                  {isScanning ? `SCANNING (${scanProgress}%)` : "RUN COMPLIANCE SCAN"}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2">
                {isScanning ? (
                  <span className="text-xs text-amber-500 font-semibold font-mono">SecOps inspection underway...</span>
                ) : scanResult === "clean" ? (
                  <div className="flex items-center gap-1.5 text-emerald-500 text-xs font-semibold font-mono">
                    <ShieldCheck className="h-4 w-4" /> COMPLIANCE STATUS: VERIFIED CLEAN
                  </div>
                ) : scanResult === "warning" ? (
                  <div className="flex items-center gap-1.5 text-rose-500 text-xs font-semibold font-mono">
                    <ShieldAlert className="h-4 w-4" /> AUDIT ALERT: CVE PATCH NEEDED
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground font-mono">System idle. Ready for audit scan.</span>
                )}
              </div>
            </div>
          </div>

          {/* Cryptography Sandbox */}
          <div className="flex flex-col rounded-lg border bg-card/60 backdrop-blur-sm shadow-xl p-5 relative overflow-hidden h-[420px]">
            <div className="flex items-center gap-2 mb-4 border-b pb-3">
              <Key className="h-5 w-5 text-primary" />
              <div>
                <h3 className="font-bold text-sm">Crypto Sandboxing</h3>
                <p className="text-[10px] text-muted-foreground font-mono">Cisco Certified Cryptographic Basics</p>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-muted-foreground block">
                  Plaintext Input
                </label>
                <textarea
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  placeholder="Enter message to encrypt/hash..."
                  rows={3}
                  className="w-full text-sm p-3 rounded-md bg-muted border border-border outline-none focus:ring-1 focus:ring-primary/45 resize-none font-mono"
                />
              </div>

              <div className="space-y-2 flex-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-muted-foreground block">
                    Cryptographic Digest (SHA-256 Demo)
                  </label>
                  <Lock className="h-3 w-3 text-emerald-500" />
                </div>
                <div className="w-full bg-black/10 dark:bg-black/50 p-4 rounded-md border border-border/50 break-all font-mono text-xs text-emerald-500 dark:text-emerald-400 min-h-[96px]">
                  {hashedText || "Waiting for input..."}
                </div>
              </div>

              <div className="text-[10px] text-muted-foreground leading-normal border-t pt-3 flex items-start gap-1.5 font-mono">
                <ShieldCheck className="h-3.5 w-3.5 text-primary mt-0.5 flex-shrink-0" />
                <span>
                  Hashing provides data integrity. Any minor change in the input produces a completely different, unpredictable signature (Avalanche Effect).
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
