type Params = {
  /** 縁取りの幅 */
  width: number;
  /** text-shadowを生成する方向の数 (値を小さくすると縁取りが粗くなる) */
  directionCount?: number;
  /** 縁取りの色 */
  color: string;
  /** 幅の間隔 (細い文字で縁取りの幅が広いと空白が発生することがあるので、その対策) */
  radiusStep?: number;
  /** 一番外側の text-shadow の値の小数点の桁数 (設定するとジャギー軽減になる) */
  digits?: number;
  /** 影のオフセット (影をつけたいときに設定する、縁取りのみの場合は 0 ) */
  shadowOffset?: number;
};

export function generateTextShadow({
  width,
  directionCount = width * 10,
  color,
  radiusStep = 0,
  digits = 0,
  shadowOffset = 0,
}: Params): string {
  const shadows: Set<string> = new Set();

  let radius = 0;
  // let radius = width;
  while (radius < width) {
    radius = Math.min(radius + radiusStep, width);
    for (
      let angle = 0;
      angle < 2 * Math.PI;
      angle += (2 * Math.PI) / directionCount
    ) {
      const x =
        radius === width
          ? Math.round(radius * Math.cos(angle) * 10 ** digits) / 10 ** digits
          : Math.round(radius * Math.cos(angle));
      const y =
        radius === width
          ? Math.round(radius * Math.sin(angle) * 10 ** digits) / 10 ** digits
          : Math.round(radius * Math.sin(angle));
      const valueX = x === 0 ? "0" : `${x}px`;
      const valueY = y === 0 ? "0" : `${y}px`;
      shadows.add(`${valueX} ${valueY} 0 ${color}`);
      if (shadowOffset) {
        const shadowX = x + shadowOffset;
        const shadowY = y + shadowOffset;
        const valueShadowX = shadowX === 0 ? "0" : `${shadowX}px`;
        const valueShadowY = shadowY === 0 ? "0" : `${shadowY}px`;
        shadows.add(`${valueShadowX} ${valueShadowY} 0 ${color}`);
      }
    }
  }

  const result = [...shadows].join(", ");
  return result;
}
