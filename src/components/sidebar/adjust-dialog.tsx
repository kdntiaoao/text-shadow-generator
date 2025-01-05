import { CSSProperties, useRef, useState } from 'react'
import { generateTextShadow } from '@/utils/generate-text-shadow'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FontWeight } from '@/types/values'
import { RotateCcw, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdjustDialogCodesnippet from './adjust-dialog-codesnippet'

type Props = {
  fontWeight: FontWeight
  textColor: string
  strokeWidth: number
  directionCount: number
  strokeColor: string
  shadowOffset: number
}

export default function AdjustDialog({
  fontWeight,
  textColor,
  strokeWidth,
  directionCount,
  strokeColor,
  shadowOffset,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<string | null>(null)
  const [disabledValues, setDisabledValues] = useState<string[]>([])

  const textShadowValues = generateTextShadow({
    width: strokeWidth,
    directionCount,
    color: 'var(--color)',
    shadowOffset,
  }).split(/,\s*/)

  const getTextShadowResult = () => {
    const result = textShadowValues
      .filter((t) => !disabledValues.includes(t))
      .filter((t) => t !== target)
    if (target) {
      result.unshift(target.split(' ').slice(0, 3).join(' ') + ' red')
    }
    return result.join(',')
  }
  const textShadowResult = getTextShadowResult()

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

  const toggleState = (value: string) => {
    setDisabledValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    )
  }

  const reset = () => {
    setDisabledValues([])
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
        <div className="text-center text-9xl" style={{ fontWeight }}>
          <div
            style={
              {
                color: textColor,
                textShadow: textShadowResult,
                '--color': strokeColor,
              } as CSSProperties
            }
          >
            A
          </div>
        </div>
        <div>
          <AdjustDialogCodesnippet
            textShadowValues={textShadowValues}
            textShadowResult={textShadowResult}
            target={target}
            disabledValues={disabledValues}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={toggleState}
          />
          <p className="text-right">
            {new Blob([textShadowResult]).size.toLocaleString()} bytes
          </p>
        </div>
        <div className="ml-auto">
          <Button variant="neutral" size="sm" onClick={reset}>
            <RotateCcw size={16} /> Reset
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
