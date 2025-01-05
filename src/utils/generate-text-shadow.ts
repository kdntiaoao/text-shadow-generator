type Params = {
  /** 縁取りの幅 */
  width: number
  /** text-shadowを生成する方向の数 (値を小さくすると縁取りが粗くなる) */
  directionCount?: number
  /** 縁取りの色 */
  color?: string
  shadowOffset?: number
}

export const generateTextShadow = ({
  width,
  directionCount = Math.max(50, Math.min(500, width * 10)),
  color = '#000',
  shadowOffset = 0,
}: Params): string => {
  const shadows: Set<string> = new Set()

  let radius = 0
  while (radius < width) {
    radius = Math.min(radius + 1, width)
    for (
      let angle = 0;
      angle < 2 * Math.PI;
      angle += (2 * Math.PI) / directionCount
    ) {
      const x =
        radius === width
          ? Math.round(radius * Math.cos(angle) * 10) / 10
          : Math.round(radius * Math.cos(angle))
      const y =
        radius === width
          ? Math.round(radius * Math.sin(angle) * 10) / 10
          : Math.round(radius * Math.sin(angle))
      const valueX = x === 0 ? '0' : `${x}px`
      const valueY = y === 0 ? '0' : `${y}px`
      shadows.add(`${valueX} ${valueY} 0 ${color}`)
      if (shadowOffset) {
        const shadowX = x + shadowOffset
        const shadowY = y + shadowOffset
        const valueShadowX = shadowX === 0 ? '0' : `${shadowX}px`
        const valueShadowY = shadowY === 0 ? '0' : `${shadowY}px`
        shadows.add(`${valueShadowX} ${valueShadowY} 0 ${color}`)
      }
    }
  }

  const result = [...shadows].join(',')
  console.log('size:', new Blob([result]).size.toLocaleString(), 'bytes')
  return result
}
