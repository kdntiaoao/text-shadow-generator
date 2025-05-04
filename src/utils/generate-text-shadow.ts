import type { ShadowSettings } from "@/types";

export function generateTextShadow(settings: ShadowSettings): string {
  const { strokeWidth, color } = settings;
  const shadows: string[] = [];

  for (let x = -strokeWidth; x <= strokeWidth; x++) {
    for (let y = -strokeWidth; y <= strokeWidth; y++) {
      if (x === 0 && y === 0) continue;

      if (Math.abs(x) === strokeWidth || Math.abs(y) === strokeWidth) {
        shadows.push(`${x}px ${y}px 0 ${color}`);
      }
    }
  }

  return shadows.join(", ");
}
