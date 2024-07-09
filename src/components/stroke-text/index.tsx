import type { CSSProperties } from "react";
import { generateTextShadow } from "./generate-text-shadow";

type Props = {
  children: string;
  strokeColor: string;
  strokeWidth: number;
  directionCount?: number;
  shadowInterval?: number;
};

export default function StrokeText({
  children,
  strokeColor,
  strokeWidth,
  directionCount = Math.max(50, Math.min(500, strokeWidth * 10)),
  shadowInterval = Math.max(1, strokeWidth / 10),
}: Props) {
  return (
    <span
      style={
        {
          textShadow: generateTextShadow(
            strokeWidth,
            directionCount,
            shadowInterval,
          ),
          "--stroke-color": strokeColor,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
