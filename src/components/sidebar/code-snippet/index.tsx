import { Clipboard, ClipboardCheck } from 'lucide-react'
import { useRef, useState } from 'react'

type Props = {
  code: string
}

export default function CodeSnippet({ code }: Props) {
  const [copyed, setCopyed] = useState(false)
  const copyedTimerId = useRef<number>(0)

  const copyTextShadow = () => {
    clearTimeout(copyedTimerId.current)
    navigator.clipboard.writeText(code)
    setCopyed(true)
    copyedTimerId.current = window.setTimeout(() => {
      setCopyed(false)
    }, 1000)
  }

  return (
    <div className="relative">
      <button
        data-clipboard
        className="absolute right-1 top-1 rounded bg-sidebar p-1 hover:opacity-80"
        aria-label="クリップボードにコピーする"
        onClick={copyTextShadow}
      >
        {copyed ? <ClipboardCheck size={20} /> : <Clipboard size={20} />}
      </button>
      <pre className="grid">
        <code className="block overflow-auto rounded border border-input bg-gray-800 p-4 pr-8">
          {code}
        </code>
      </pre>
    </div>
  )
}
