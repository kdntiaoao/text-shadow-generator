import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Props = {
  defaultValue: string
  options: {
    label: string
    value: string
  }[]
  onChange: (value: string) => void
}

export default function CustomSelect({
  defaultValue,
  options,
  onChange,
}: Props) {
  return (
    <Select onValueChange={onChange} defaultValue={defaultValue}>
      <SelectTrigger>
        <SelectValue placeholder="選択してください" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
