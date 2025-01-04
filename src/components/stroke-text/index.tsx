import { useRef, type CSSProperties } from 'react'
import { generateTextShadow } from './generate-text-shadow'

type Props = {
  children: string
  textColor: string
  strokeColor: string
  strokeWidth: number
  directionCount?: number
  shadowInterval?: number
}

export default function StrokeText({
  children,
  textColor,
  strokeColor,
  strokeWidth,
  directionCount = Math.max(50, Math.min(500, strokeWidth * 10)),
  shadowInterval = Math.max(1, strokeWidth / 10),
}: Props) {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <>
      <div
        ref={ref}
        className="relative whitespace-pre-wrap leading-normal tracking-wide"
        style={{ color: textColor }}
      >
        <div
          style={
            {
              textShadow: generateTextShadow(
                strokeWidth,
                directionCount,
                shadowInterval,
              ),
              '--stroke-color': strokeColor,
            } as CSSProperties
          }
        >
          {children}
        </div>
        <div className="absolute inset-0 z-10">{children}</div>
      </div>
      <p className="text-lg font-normal">
        size:{' '}
        {new Blob([
          generateTextShadow(strokeWidth, directionCount, shadowInterval),
        ]).size.toLocaleString()}
        bytes
      </p>
    </>
  )
}
