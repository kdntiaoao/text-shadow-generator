import type { CSSProperties } from 'react'
import { generateTextShadow } from './generate-text-shadow'

type Props = {
  children: string
  strokeWidth: number
  directionCount: number
  strokeColor: string
  textColor: string
}

export default function StrokeText({
  children,
  strokeWidth,
  directionCount,
  strokeColor,
  textColor,
}: Props) {
  return (
    <div
      className="relative whitespace-pre-wrap leading-normal tracking-wide"
      style={{ color: textColor }}
    >
      <div
        style={
          {
            textShadow: generateTextShadow({
              width: strokeWidth,
              directionCount,
              color: strokeColor,
            }),
          } as CSSProperties
        }
      >
        {children}
      </div>
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  )
}
