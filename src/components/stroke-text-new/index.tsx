import { generateTextShadow } from '@/components/stroke-text-new/generate-text-shadow'
import { useRef, type CSSProperties } from 'react'

type Props = {
  children: string
  textColor: string
  strokeColor: string
  width: number
}

export default function StrokeTextNew({
  children,
  textColor,
  strokeColor,
  width,
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
                color: strokeColor,
                width,
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
            color: strokeColor,
            width,
          }),
        ]).size.toLocaleString()}
        bytes
      </p>
    </>
  )
}
