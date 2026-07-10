"use client";

import { useState, useEffect } from "react";
import { Globe } from "lucide-react";

interface ProjectImageProps {
  title: string;
  imageSrc: string;
  liveUrl: string;
}

export function ProjectImage({ title, imageSrc, liveUrl }: ProjectImageProps) {
  const [src, setSrc] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryCount, setRetryCount] = useState<number>(0);

  useEffect(() => {
    // If there is no live URL, use the static image directly
    if (!liveUrl || liveUrl.trim() === "" || liveUrl === "development") {
      setSrc(imageSrc);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    // Using Microlink screenshot API (highly reliable, free, public, returns actual image redirect)
    // Adding retryCount parameter to cache-bust and force reload on retry
    const screenshotApiUrl = `https://api.microlink.io?url=${encodeURIComponent(
      liveUrl
    )}&screenshot=true&embed=screenshot.url&retry=${retryCount}`;
    
    setSrc(screenshotApiUrl);
  }, [liveUrl, imageSrc, retryCount]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    // If the screenshot fails to load, try retrying twice after a delay
    if (src !== imageSrc) {
      if (retryCount < 2) {
        setTimeout(() => {
          setRetryCount((prev) => prev + 1);
        }, 3000);
      } else {
        // Exceeded retries, gracefully fall back to the static uploaded image
        setSrc(imageSrc);
        setHasError(true);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center overflow-hidden group">
      
      {/* Main Image */}
      {src && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt={`${title} screenshot`}
          className={`w-full h-full object-cover transition-all duration-700 ${
            isLoading ? "blur-md scale-105 opacity-50" : "blur-0 scale-100 opacity-100"
          } group-hover:scale-105`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {/* Animated Shimmer Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-[length:200%_100%] animate-shimmer flex flex-col items-center justify-center select-none text-zinc-500 font-mono text-[10px]">
          <Globe className="h-5 w-5 text-primary/40 animate-spin mb-2" />
          <span>fetching live screenshot...</span>
        </div>
      )}

      {/* Badge indicating live screenshot source (shown on hover/load) */}
      {!isLoading && src !== imageSrc && (
        <div className="absolute bottom-2.5 right-2.5 z-20 px-2 py-0.5 bg-black/75 dark:bg-zinc-900/90 text-emerald-400 border border-emerald-500/20 text-[9px] font-mono rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity select-none duration-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Site Screenshot</span>
        </div>
      )}

      {/* Fallback indicator badge when the API fails */}
      {hasError && (
        <div className="absolute bottom-2.5 right-2.5 z-20 px-2 py-0.5 bg-black/75 dark:bg-zinc-900/90 text-amber-400 border border-amber-500/20 text-[9px] font-mono rounded flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity select-none duration-300">
          <span>Fallback Image</span>
        </div>
      )}
    </div>
  );
}
