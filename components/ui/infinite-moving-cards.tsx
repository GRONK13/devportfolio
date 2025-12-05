"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    category: string;
    skills: {
      icon: React.ComponentType<{ className?: string; size?: number; stroke?: number }>;
      name: string;
      color?: string;
    }[];
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-6 py-4 w-max flex-nowrap",
          start && "animate-scroll"
        )}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className={cn(
              "w-[300px] max-w-full relative rounded-2xl border border-border/50 flex-shrink-0 p-6 md:w-[350px] bg-card hover:bg-accent/50 transition-all hover:shadow-lg hover:shadow-primary/10",
              pauseOnHover && "hover:pause-animation"
            )}
            onMouseEnter={(e) => {
              if (pauseOnHover && scrollerRef.current) {
                scrollerRef.current.style.animationPlayState = 'paused';
              }
            }}
            onMouseLeave={(e) => {
              if (pauseOnHover && scrollerRef.current) {
                scrollerRef.current.style.animationPlayState = 'running';
              }
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="mb-2">
                <h3 className="text-xl font-bold tracking-tight mb-1">{item.category}</h3>
                <div className="h-1 w-16 bg-gradient-to-r from-primary to-primary/50 rounded-full"></div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {item.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    className="flex flex-col items-center justify-center p-2 rounded-lg border border-border/30 hover:border-primary/50 transition-all group"
                  >
                    <skill.icon
                      className={cn(
                        "mb-1 transition-transform group-hover:scale-110",
                        skill.color || "text-foreground"
                      )}
                      size={32}
                      stroke={1.5}
                    />
                    <span className="text-[10px] font-medium text-center text-muted-foreground group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
