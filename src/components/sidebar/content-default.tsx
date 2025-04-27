import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { DEFAULT_VALUES } from '@/constants/default-values'
import { valuesAtom } from '@/states/values'
import { useAtom } from 'jotai'

const DEFAULT_OPTIONS = [
  { label: '2px', value: '2' },
  { label: '4px', value: '4' },
  { label: '6px', value: '6' },
  { label: '8px', value: '8' },
  { label: '12px', value: '12' },
] as const

export default function ContentDefault() {
  const [values, setValues] = useAtom(valuesAtom)

  const handleChangeDefaultStrokeWidth = (value: string) => {
    const strokeWidth = Number(value)
    if (!Number.isNaN(strokeWidth)) {
      setValues({ ...DEFAULT_VALUES, strokeWidth })
    }
  }

  return (
    <div className="py-4">
      <RadioGroup
        value={values.strokeWidth.toString()}
        onValueChange={handleChangeDefaultStrokeWidth}
      >
        {DEFAULT_OPTIONS.map(({ label, value }) => (
          <label
            key={value}
            className="flex cursor-pointer items-center gap-2 rounded-md border border-input px-3 py-2 has-[[aria-checked='true']]:bg-primary-light/40"
          >
            <RadioGroupItem value={value} id={`option-${value}`} />
            {label}
          </label>
        ))}
      </RadioGroup>
    </div>
  )
}
