import { generateTextShadow } from '@/components/stroke-text-updated/generate-text-shadow'
import { useRef, type CSSProperties } from 'react'

type Props = {
  children: string
  width: number
  directionCount?: number
  strokeColor?: string
  textColor?: string
}

export default function StrokeTextUpdated({
  children,
  width,
  directionCount,
  textColor = '#fff',
  strokeColor = '#000',
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
              textShadow: generateTextShadow({
                width,
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
      <p className="text-lg font-normal">
        size:{' '}
        {new Blob([
          generateTextShadow({
            width,
            directionCount,
            color: strokeColor,
          }),
        ]).size.toLocaleString()}
        bytes
      </p>
    </>
  )
}
