import { useAppContext } from "@/context/app-context";
import { generateTextShadow } from "@/utils/generate-text-shadow";
import { useMemo } from "react";

export function Preview() {
  const { state } = useAppContext();
  const { shadowSettings, textSettings } = state;

  const textShadow = useMemo(() => {
    return generateTextShadow({
      width: shadowSettings.strokeWidth,
      color: shadowSettings.color,
      directionCount: shadowSettings.strokeWidth * 10,
      radiusStep: Math.max(1, Math.trunc(textSettings.fontSize / 10)),
      digits: 1,
      shadowOffset: 0,
    });
  }, [shadowSettings, textSettings]);

  return (
    <div className="min-h-[200px] place-content-center grid p-8 rounded-lg bg-gray-100">
      <p className="relative">
        <span
          style={{
            fontSize: `${textSettings.fontSize}px`,
            fontWeight: textSettings.fontWeight,
            color: textSettings.color,
            textShadow,
          }}
        >
          {textSettings.content}
        </span>
        <span
          style={{
            fontSize: `${textSettings.fontSize}px`,
            fontWeight: textSettings.fontWeight,
            color: textSettings.color,
          }}
          className="absolute inset-0 z-10 select-none pointer-events-none"
          aria-hidden
        >
          {textSettings.content}
        </span>
      </p>
    </div>
  );
}
