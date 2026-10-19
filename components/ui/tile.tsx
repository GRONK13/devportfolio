import type { CSSProperties, ComponentProps } from "react";
import { cn } from "@/lib/utils";

type TileProps = ComponentProps<"div"> & {
  /** Color used for the hover spotlight; defaults to the site accent. */
  tint?: string;
  spotlight?: boolean;
};

export function Tile({ tint, spotlight = true, className, style, ...props }: TileProps) {
  return (
    <div
      data-spotlight={spotlight ? "" : undefined}
      className={cn("tile", className)}
      style={tint ? ({ ...style, "--tint": tint } as CSSProperties) : style}
      {...props}
    />
  );
}
