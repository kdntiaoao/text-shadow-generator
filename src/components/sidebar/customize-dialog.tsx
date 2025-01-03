import { Fragment } from 'react'
import StrokeText from '@/components/stroke-text'
import { generateTextShadow } from '@/components/stroke-text/generate-text-shadow'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
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
  return (
    <Dialog>
      <DialogTrigger>
        <Settings size={20} />
      </DialogTrigger>
      <DialogContent>
        <div className="text-center text-4xl" style={{ fontWeight }}>
          <StrokeText
            textColor={textColor}
            strokeColor={strokeColor}
            directionCount={directionCount}
            strokeWidth={strokeWidth}
          >
            hello
          </StrokeText>
        </div>
        <code className="block max-h-52 overflow-auto rounded border border-input p-4 pr-8">
          text-shadow:
          <br />
          <span className="block pl-4">
            {generateTextShadow(strokeWidth, directionCount, 2)
              .split(',')
              .map((textItem, i) => (
                <Fragment key={i}>
                  {i !== 0 && ','}
                  <span className="rounded-sm bg-slate-200 px-1 text-justify">
                    {textItem}
                  </span>
                </Fragment>
              ))}
          </span>
        </code>
      </DialogContent>
    </Dialog>
  )
}
