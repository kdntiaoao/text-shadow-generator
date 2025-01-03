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
}: Params): string => {
  const shadows: string[] = []

  let radius = 0
  while (radius < width) {
    radius = Math.min(radius + 1, width)
    for (
      let angle = 0;
      angle < 2 * Math.PI;
      angle += (2 * Math.PI) / directionCount
    ) {
      const x = Math.round(radius * Math.cos(angle) * 10) / 10
      const y = Math.round(radius * Math.sin(angle) * 10) / 10
      shadows.push(`${x}px ${y}px 0 ${color}`)
    }
  }

  const result = [...new Set(shadows)].join(',')
  console.log('size:', new Blob([result]).size, 'bytes')
  return result
}
