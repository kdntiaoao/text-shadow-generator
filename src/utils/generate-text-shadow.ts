type Params = {
  /** 縁取りの幅 */
  baseWidth: number;
  /** text-shadowを生成する方向の数 */
  directionCount?: number;
  /** 縁取りの色 */
  color: string;
  /** ぼかし */
  blur?: number;
  /** 幅の間隔 */
  radiusStep?: number;
  /** 一番外側の text-shadow の値の小数点の桁数 */
  digits?: number;
  /** 影のオフセット */
  shadowOffset?: number;
  /** 影の色 */
  shadowColor?: string;
  /** 追加する縁取り */
  addShadows?: {
    width: number;
    color: string;
  }[];
};

export function generateTextShadow({
  baseWidth,
  directionCount = 8,
  color,
  blur = 0,
  radiusStep = baseWidth,
  digits = 0,
  shadowOffset = 0,
  shadowColor = color,
  addShadows,
}: Params): string {
  if (
    baseWidth <= 0 ||
    directionCount <= 0 ||
    blur < 0 ||
    radiusStep <= 0 ||
    digits < 0
  ) {
    throw new Error("generateTextShadow: invalid parameters");
  }

  const factor = 10 ** digits;
  const blurValue = `${blur}px`;
  const shadows: Set<string> = new Set();
  const shadowOffsets: Set<string> = new Set();

  let radius = 0;
  let currentMaxRadius = baseWidth;
  while (radius < currentMaxRadius) {
    radius = Math.min(radius + radiusStep, currentMaxRadius);
    for (
      let angle = 0;
      angle < 2 * Math.PI;
      angle += (2 * Math.PI) / directionCount
    ) {
      const x =
        radius === currentMaxRadius
          ? Math.round(radius * Math.cos(angle) * factor) / factor
          : Math.round(radius * Math.cos(angle));
      const y =
        radius === currentMaxRadius
          ? Math.round(radius * Math.sin(angle) * factor) / factor
          : Math.round(radius * Math.sin(angle));
      const valueX = `${x}px`;
      const valueY = `${y}px`;
      shadows.add(`${valueX} ${valueY} ${blurValue} ${color}`);
      if (shadowOffset) {
        const shadowX = Math.round((x + shadowOffset) * factor) / factor;
        const shadowY = Math.round((y + shadowOffset) * factor) / factor;
        const valueShadowX = `${shadowX}px`;
        const valueShadowY = `${shadowY}px`;
        shadowOffsets.add(
          `${valueShadowX} ${valueShadowY} ${blurValue} ${shadowColor}`,
        );
      }
    }
  }

  if (addShadows) {
    for (const addShadow of addShadows) {
      currentMaxRadius += addShadow.width;
      while (radius < currentMaxRadius) {
        radius = Math.min(radius + radiusStep, currentMaxRadius);
        for (
          let angle = 0;
          angle < 2 * Math.PI;
          angle += (2 * Math.PI) / directionCount
        ) {
          const x =
            radius === currentMaxRadius
              ? Math.round(radius * Math.cos(angle) * factor) / factor
              : Math.round(radius * Math.cos(angle));
          const y =
            radius === currentMaxRadius
              ? Math.round(radius * Math.sin(angle) * factor) / factor
              : Math.round(radius * Math.sin(angle));
          const valueX = `${x}px`;
          const valueY = `${y}px`;
          shadows.add(`${valueX} ${valueY} ${blurValue} ${addShadow.color}`);
          if (shadowOffset) {
            const shadowX = Math.round((x + shadowOffset) * factor) / factor;
            const shadowY = Math.round((y + shadowOffset) * factor) / factor;
            const valueShadowX = `${shadowX}px`;
            const valueShadowY = `${shadowY}px`;
            shadowOffsets.add(
              `${valueShadowX} ${valueShadowY} ${blurValue} ${shadowColor}`,
            );
          }
        }
      }
    }
  }

  const result = [...shadows, ...shadowOffsets].join(", ");
  return result;
}
