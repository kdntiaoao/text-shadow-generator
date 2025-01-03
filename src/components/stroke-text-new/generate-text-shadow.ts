type Params = {
  /** 縁取りの色 */
  color: string
  /** 縁取りの幅 */
  width: number
  shadowOffset?: number
}

export const generateTextShadow = ({ color, width, shadowOffset }: Params) => {
  const shadows = []
  for (let x = -width; x <= width; x += 1) {
    for (let y = -width; y <= width; y += 1) {
      const distance = Math.round(Math.sqrt(x * x + y * y) * 100) / 100
      const offsetX = distance <= width ? x : (x * width) / distance
      const offsetY = distance <= width ? y : (y * width) / distance
      const offsetXRounded = Math.round(offsetX * 10) / 10
      const offsetYRounded = Math.round(offsetY * 10) / 10
      shadows.push(`${offsetXRounded}px ${offsetYRounded}px 0 ${color}`)
      if (shadowOffset) {
        const offsetXWithOffset = Math.round((offsetX + shadowOffset) * 10) / 10
        const offsetYWithOffset = Math.round((offsetY + shadowOffset) * 10) / 10
        shadows.push(`${offsetXWithOffset}px ${offsetYWithOffset}px 0 ${color}`)
      }
    }
  }
  const result = [...new Set(shadows)].join(',')
  console.log('size:', new Blob([result]).size, 'bytes')
  return result
}
