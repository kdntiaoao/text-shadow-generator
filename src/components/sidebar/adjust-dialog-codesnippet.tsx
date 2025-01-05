import { Fragment, useRef, useState } from 'react'
import { Clipboard, ClipboardCheck } from 'lucide-react'

type Props = {
  textShadowValues: string[]
  textShadowResult: string
  target: string | null
  disabledValues: string[]
  onMouseEnter: (value: string) => void
  onMouseLeave: (value: string) => void
  onFocus: (value: string) => void
  onBlur: (value: string) => void
  onClick: (value: string) => void
}

export default function AdjustDialogCodesnippet({
  textShadowValues,
  textShadowResult,
  target,
  disabledValues,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const copyedTimerId = useRef<number>(0)
  const [copyed, setCopyed] = useState(false)

  const copyTextShadow = () => {
    clearTimeout(copyedTimerId.current)
    navigator.clipboard.writeText(`text-shadow: ${textShadowResult};`)
    setCopyed(true)
    copyedTimerId.current = window.setTimeout(() => {
      setCopyed(false)
    }, 1000)
  }

  return (
    <div className="relative rounded border border-input">
      <button
        data-clipboard
        className="absolute right-0 top-0 rounded bg-gray-300 p-1 hover:opacity-80"
        aria-label="クリップボードにコピーする"
        onClick={copyTextShadow}
      >
        {copyed ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
      </button>
      <code className="block max-h-64 overflow-auto p-4">
        text-shadow:
        <br />
        <span ref={ref} className="block pl-4 text-justify">
          {textShadowValues.map((textItem, i) => (
            <Fragment key={i}>
              {i !== 0 && ', '}
              <span
                tabIndex={0}
                className="cursor-pointer transition-colors"
                style={{
                  opacity: disabledValues.includes(textItem) ? 0.5 : undefined,
                  backgroundColor:
                    target === textItem ? 'rgb(254, 202, 202)' : undefined,
                }}
                onMouseEnter={() => onMouseEnter(textItem)}
                onMouseLeave={() => onMouseLeave(textItem)}
                onFocus={() => onFocus(textItem)}
                onBlur={() => onBlur(textItem)}
                onClick={() => onClick(textItem)}
              >
                {textItem}
              </span>
            </Fragment>
          ))}
          ;
        </span>
      </code>
      <div className="absolute bottom-0 left-0 h-4 w-full bg-gradient-to-t from-background to-transparent"></div>
    </div>
  )
}
