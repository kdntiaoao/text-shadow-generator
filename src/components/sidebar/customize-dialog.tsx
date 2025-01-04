import { CSSProperties, Fragment, useRef, useState } from 'react'
import { generateTextShadow } from '@/components/stroke-text/generate-text-shadow'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FontWeight } from '@/types/values'
import { Settings } from 'lucide-react'

type Props = {
  fontWeight: FontWeight
  textColor: string
  strokeWidth: number
  directionCount: number
  strokeColor: string
}

export default function CustomizeDialog({
  fontWeight,
  textColor,
  strokeWidth,
  directionCount,
  strokeColor,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<string | null>(null)
  const [disabledValues, setDisabledValues] = useState<string[]>([])

  const textShadowValues = generateTextShadow({
    width: strokeWidth,
    directionCount,
    color: strokeColor,
  }).split(', ')

  const getTextShadowResult = () => {
    const result = textShadowValues
      .filter((t) => !disabledValues.includes(t))
      .filter((t) => t !== target)
    if (target) {
      result.unshift(target.split(' ').slice(0, 3).join(' ') + ' red')
    }
    return result.join(', ')
  }

  const handleMouseEnter = (value: string) => {
    const textShadowValueElements = ref.current?.querySelectorAll('span')
    textShadowValueElements?.forEach((el) => {
      el.blur()
    })
    setTarget(value)
  }

  const handleMouseLeave = (value: string) => {
    setTarget((prev) => (prev === value ? null : prev))
  }

  const handleFocus = (value: string) => {
    setTarget(value)
  }

  const handleBlur = (value: string) => {
    setTarget((prev) => (prev === value ? null : prev))
  }

  const handleClick = (value: string) => {
    setDisabledValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  return (
    <Dialog>
      <DialogTrigger>
        <Settings size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="sr-only">細かい調整をする</DialogTitle>
        <DialogDescription className="sr-only">
          text-shadowの値で不要なものを非表示にしてください。
        </DialogDescription>
        <div className="text-center text-8xl" style={{ fontWeight }}>
          <div
            style={
              {
                color: textColor,
                textShadow: getTextShadowResult(),
              } as CSSProperties
            }
          >
            hello
          </div>
        </div>
        <div className="relative rounded border border-input">
          <code className="block max-h-64 overflow-auto p-4">
            text-shadow:
            <br />
            <span ref={ref} className="block pl-4 text-justify">
              {textShadowValues.map((textItem, i) => (
                <Fragment key={i}>
                  {i !== 0 && ', '}
                  <span
                    tabIndex={0}
                    className="cursor-pointer transition-colors focus-within:bg-red-200 hover:bg-red-200"
                    style={
                      disabledValues.includes(textItem)
                        ? { opacity: 0.5 }
                        : undefined
                    }
                    onMouseEnter={() => handleMouseEnter(textItem)}
                    onMouseLeave={() => handleMouseLeave(textItem)}
                    onFocus={() => handleFocus(textItem)}
                    onBlur={() => handleBlur(textItem)}
                    onClick={() => handleClick(textItem)}
                  >
                    {textItem}
                  </span>
                </Fragment>
              ))}
            </span>
          </code>
          <div className="absolute bottom-0 left-0 h-4 w-full bg-gradient-to-t from-background to-transparent"></div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
