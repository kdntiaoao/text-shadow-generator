import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import CustomSelect from './custom-select'
import { valuesAtom } from '@/states/values'
import { useAtom } from 'jotai'
import { validateFontWeight } from '@/utils/validate-font-weight'

export default function ContentCustomize() {
  const [values, setValues] = useAtom(valuesAtom)

  const handleChangeStrokeWidth = (value: number) => {
    setValues((prev) => ({ ...prev, strokeWidth: value }))
  }

  const handleChangeDirectionCount = (value: number) => {
    setValues((prev) => ({ ...prev, directionCount: value }))
  }

  const handleChangeShadowOffset = (value: number) => {
    setValues((prev) => ({ ...prev, shadowOffset: value }))
  }

  const handleChangeStrokeColor = (value: string) => {
    setValues((prev) => ({ ...prev, strokeColor: value }))
  }

  const handleChangeTextColor = (value: string) => {
    setValues((prev) => ({ ...prev, textColor: value }))
  }

  const handleChangeFontWeight = (value: string) => {
    const fontWeight = Number(value)
    if (validateFontWeight(fontWeight)) {
      setValues((prev) => ({ ...prev, fontWeight }))
    }
  }

  const handleChangeSampleText = (value: string) => {
    setValues((prev) => ({ ...prev, sampleText: value }))
  }

  return (
    <div className="grid gap-8 py-8">
      <div className="grid gap-2">
        <label htmlFor="stroke-width-slider">
          枠線の太さ: <code>{values.strokeWidth}px</code>
        </label>
        <Slider
          id="stroke-width-slider"
          defaultValue={[values.strokeWidth]}
          min={1}
          max={40}
          step={1}
          onValueChange={([value]) => handleChangeStrokeWidth(value)}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="direction-count-slider">
          <code>text-shadow</code>の方向の数:{' '}
          <code>{values.directionCount}</code>
        </label>
        <Slider
          id="direction-count-slider"
          defaultValue={[values.directionCount]}
          min={4}
          max={200}
          step={1}
          onValueChange={([value]) => handleChangeDirectionCount(value)}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="shadow-offset-slider">
          影をずらす距離: <code>{values.shadowOffset}px</code>
        </label>
        <Slider
          id="shadow-offset-slider"
          defaultValue={[values.shadowOffset]}
          min={0}
          max={20}
          step={1}
          onValueChange={([value]) => handleChangeShadowOffset(value)}
        />
      </div>

      <label
        htmlFor="stroke-color-input"
        className="relative grid cursor-pointer gap-2"
      >
        <span>
          枠線の色: <code>{values.strokeColor}</code>
        </span>
        <span
          aria-hidden="true"
          className="block h-6 rounded border border-input"
          style={{ backgroundColor: values.strokeColor }}
        />
        <input
          id="stroke-color-input"
          type="color"
          value={values.strokeColor}
          className="sr-only bottom-0"
          onChange={(e) => handleChangeStrokeColor(e.target.value)}
        />
      </label>

      <label
        htmlFor="text-color-input"
        className="relative grid cursor-pointer gap-2"
      >
        <span>
          文字の色: <code>{values.textColor}</code>
        </span>
        <span
          aria-hidden="true"
          className="block h-6 rounded border border-input"
          style={{ backgroundColor: values.textColor }}
        />
        <input
          id="text-color-input"
          type="color"
          value={values.textColor}
          className="sr-only bottom-0"
          onChange={(e) => handleChangeTextColor(e.target.value)}
        />
      </label>

      <div className="grid gap-2">
        <label htmlFor="font-weight-select">
          文字の太さ: <code>{values.fontWeight}</code>
        </label>
        <CustomSelect
          defaultValue={values.fontWeight.toString()}
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
          onChange={handleChangeFontWeight}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="sample-text-input">サンプルテキスト</label>
        <Textarea
          id="sample-text-input"
          value={values.sampleText}
          rows={10}
          onChange={(e) => handleChangeSampleText(e.target.value)}
        />
      </div>
    </div>
  )
}
