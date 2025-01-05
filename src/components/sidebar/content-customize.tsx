import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import CustomSelect from './custom-select'

type Props = {
  fontWeight: number
  textColor: string
  strokeWidth: number
  directionCount: number
  strokeColor: string
  sampleText: string
  onChangeFontWeight: (value: string) => void
  onChangeTextColor: (value: string) => void
  onChangeStrokeWidth: (value: number) => void
  onChangeDirectionCount: (value: number) => void
  onChangeStrokeColor: (value: string) => void
  onChangeSampleText: (value: string) => void
}

export default function ContentCustomize({
  fontWeight,
  textColor,
  strokeWidth,
  directionCount,
  strokeColor,
  sampleText,
  onChangeFontWeight,
  onChangeTextColor,
  onChangeStrokeWidth,
  onChangeDirectionCount,
  onChangeStrokeColor,
  onChangeSampleText,
}: Props) {
  return (
    <div className="grid gap-8 py-4">
      <div className="grid gap-2">
        <label htmlFor="font-weight-select">
          文字の太さ: <code>{fontWeight}</code>
        </label>
        <CustomSelect
          defaultValue={fontWeight.toString()}
          options={[
            { label: '100', value: '100' },
            { label: '200', value: '200' },
            { label: '300', value: '300' },
            { label: '400', value: '400' },
            { label: '500', value: '500' },
            { label: '600', value: '600' },
            { label: '700', value: '700' },
            { label: '800', value: '800' },
            { label: '900', value: '900' },
          ]}
          onChange={onChangeFontWeight}
        />
      </div>

      <label
        htmlFor="text-color-input"
        className="relative grid cursor-pointer gap-2"
      >
        <span>
          文字の色: <code>{textColor}</code>
        </span>
        <span
          aria-hidden="true"
          className="block h-6 rounded border border-input"
          style={{ backgroundColor: textColor }}
        />
        <input
          id="text-color-input"
          type="color"
          value={textColor}
          className="sr-only bottom-0"
          onChange={(e) => onChangeTextColor(e.target.value)}
        />
      </label>

      <div className="grid gap-2">
        <label htmlFor="stroke-width-slider">
          枠線の太さ: <code>{strokeWidth}px</code>
        </label>
        <Slider
          id="stroke-width-slider"
          defaultValue={[strokeWidth]}
          min={1}
          max={40}
          step={1}
          onValueChange={([value]) => onChangeStrokeWidth(value)}
          aria-labelledby="stroke-width-slider"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="direction-count-slider">
          <code>text-shadow</code>の方向の数: <code>{directionCount}</code>
        </label>
        <Slider
          id="direction-count-slider"
          defaultValue={[directionCount]}
          min={4}
          max={200}
          step={1}
          onValueChange={([value]) => onChangeDirectionCount(value)}
          aria-labelledby="direction-count-slider"
        />
      </div>

      <label
        htmlFor="stroke-color-input"
        className="relative grid cursor-pointer gap-2"
      >
        <span>
          枠線の色: <code>{strokeColor}</code>
        </span>
        <span
          aria-hidden="true"
          className="block h-6 rounded border border-input"
          style={{ backgroundColor: strokeColor }}
        />
        <input
          id="stroke-color-input"
          type="color"
          value={strokeColor}
          className="sr-only bottom-0"
          onChange={(e) => onChangeStrokeColor(e.target.value)}
        />
      </label>

      <div className="grid gap-2">
        <label htmlFor="sample-text-input">サンプルテキスト</label>
        <Textarea
          id="sample-text-input"
          value={sampleText}
          rows={10}
          onChange={(e) => onChangeSampleText(e.target.value)}
        />
      </div>
    </div>
  )
}
