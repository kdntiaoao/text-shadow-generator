import { CSSProperties, useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { RotateCcw, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import AdjustDialogCodesnippet from './adjust-dialog-codesnippet'
import { valuesAtom } from '@/states/values'
import { useAtomValue } from 'jotai'
import { textShadowAtom } from '@/states/text-shadow'

export default function AdjustDialog() {
  const ref = useRef<HTMLDivElement>(null)
  const [target, setTarget] = useState<string | null>(null)
  const [disabledValues, setDisabledValues] = useState<Set<string> | null>(null)
  const values = useAtomValue(valuesAtom)
  const textShadow = useAtomValue(textShadowAtom)

  const textShadowValues = textShadow
    .replace(values.strokeColor, 'var(--color)')
    .split(/,\s*/)

  const getTextShadowResult = () => {
    const result = textShadowValues
      .filter((t) => !disabledValues?.has(t))
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
    setDisabledValues((prev) => {
      const newDisabledValues = new Set(prev)
      if (prev?.has(value)) {
        newDisabledValues.delete(value)
      } else {
        newDisabledValues.add(value)
      }
      return newDisabledValues
    })
  }

  const reset = () => {
    setDisabledValues(null)
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
        <div
          className="text-center text-9xl"
          style={{ fontWeight: values.fontWeight }}
        >
          <div
            style={
              {
                color: values.textColor,
                textShadow: textShadowResult,
                '--color': values.strokeColor,
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
