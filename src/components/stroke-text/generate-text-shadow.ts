/**
 * 指定された幅の縁取り用のtext-shadowの値を生成する
 * @param width - 縁取りの幅
 * @param directionCount - text-shadowを生成する方向の数 (値を小さくすると縁取りが粗くなる)
 * @param interval - 各段階での縁取りの増加幅
 * @returns 生成されたtext-shadowの値
 */
export const generateTextShadow = (
  width: number,
  directionCount: number = Math.max(50, Math.min(500, width * 10)),
  interval: number = Math.max(1, width / 10),
): string => {
  /** text-shadowのoffsetの小数点以下の桁数。 */
  const DIGITS = 2;
  /** text-shadowの色 */
  const SHADOW_COLOR = "var(--stroke-color)";

  const shadows: string[] = [];
  let currentWidth: number = 0;

  const roundToDigits = (value: number): number => {
    return Math.round(value * 10 ** DIGITS) / 10 ** DIGITS;
  };

  while (currentWidth < width) {
    currentWidth = Math.min(width, currentWidth + interval);
    for (let j = 0; j < directionCount; j++) {
      const angle = (j * Math.PI) / (directionCount / 2);
      const x = currentWidth * Math.cos(angle);
      const y = currentWidth * Math.sin(angle);
      const distance = Math.sqrt(x * x + y * y);
      let resultX: number, resultY: number;
      if (distance <= currentWidth) {
        resultX = roundToDigits(x);
        resultY = roundToDigits(y);
      } else {
        resultX = roundToDigits((x * currentWidth) / distance);
        resultY = roundToDigits((y * currentWidth) / distance);
      }
      shadows.push(`${resultX}px ${resultY}px 0 ${SHADOW_COLOR}`);
    }
  }

  return shadows.join(",");
};
