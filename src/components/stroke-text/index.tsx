import { useEffect, useRef, type CSSProperties } from "react";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  return (
    <div ref={ref} className="relative">
      <div
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
      </div>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
