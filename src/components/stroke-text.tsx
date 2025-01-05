type Props = {
  children: string
  textColor: string
  textShadow: string
}

export default function StrokeText({ children, textColor, textShadow }: Props) {
  return (
    <div
      className="relative whitespace-pre-wrap leading-normal tracking-wide"
      style={{ color: textColor }}
    >
      <div
        style={{
          textShadow,
        }}
      >
        {children}
      </div>
      <div className="absolute inset-0 z-10">{children}</div>
    </div>
  )
}
