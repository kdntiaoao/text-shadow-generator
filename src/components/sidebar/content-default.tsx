import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

type Props<T extends string> = {
  defaultValue: NoInfer<T>
  onChange: (value: T) => void
}

const DEFAULT_OPTIONS = [
  { label: '2px', value: '2' },
  { label: '4px', value: '4' },
  { label: '6px', value: '6' },
  { label: '8px', value: '8' },
  { label: '12px', value: '12' },
] as const

export default function ContentDefault<T extends string>({
  defaultValue,
  onChange,
}: Props<T>) {
  return (
    <div className="py-4">
      <RadioGroup defaultValue={defaultValue} onValueChange={onChange}>
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
