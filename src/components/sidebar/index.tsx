import Header from '@/components/header'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DEFAULT_VALUES } from '@/constants/default-values'
import type { FontWeight } from '@/types/values'
import { generateTextShadow } from '@/utils/generate-text-shadow'
import Codesnippet from './codesnippet'
import ContentCustomize from './content-customize'
import ContentDefault from './content-default'
import CustomizeDialog from './adjust-dialog'

type Props = {
  fontWeight: FontWeight
  textColor: string
  strokeWidth: number
  directionCount: number
  strokeColor: string
  sampleText: string
  onChangeFontWeight: (value: FontWeight) => void
  onChangeTextColor: (value: string) => void
  onChangeStrokeWidth: (value: number) => void
  onChangeDirectionCount: (value: number) => void
  onChangeStrokeColor: (value: string) => void
  onChangeSampleText: (value: string) => void
}

const validateFontWeight = (value: number): value is FontWeight => {
  return [100, 200, 300, 400, 500, 600, 700, 800, 900].includes(value)
}

export default function Sidebar({
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
  const code = `color: ${textColor};
font-weight: ${fontWeight};
text-shadow: ${generateTextShadow({
    width: strokeWidth,
    directionCount,
    color: 'var(--color)',
  })};
--color: ${strokeColor};`

  const defaultStrokeWidth = DEFAULT_VALUES.strokeWidth.toString()

  const handleChangeDefaultStrokeWidth = (value: string) => {
    const num = Number(value)
    if (!Number.isNaN(num)) {
      const directionCount = num < 6 ? 32 : 64
      onChangeFontWeight(DEFAULT_VALUES.fontWeight)
      onChangeTextColor(DEFAULT_VALUES.textColor)
      onChangeStrokeWidth(num)
      onChangeDirectionCount(directionCount)
      onChangeStrokeColor(DEFAULT_VALUES.strokeColor)
      onChangeSampleText(DEFAULT_VALUES.sampleText)
    }
  }

  const handleChangeTabs = (value: string) => {
    if (value === 'default') {
      handleChangeDefaultStrokeWidth(defaultStrokeWidth)
    }
  }

  const handleChangeFontWeight = (value: string) => {
    const num = Number(value)
    if (validateFontWeight(num)) {
      onChangeFontWeight(num)
    }
  }

  return (
    <div className="grid h-full place-content-start gap-10 overflow-y-auto bg-sidebar px-4 pt-8 text-sidebar-foreground md:min-h-screen">
      <Header />

      <div className="relative">
        <Tabs defaultValue="default" onValueChange={handleChangeTabs}>
          <TabsList>
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="customize">Customize</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <ContentDefault
              defaultValue={defaultStrokeWidth}
              onChange={handleChangeDefaultStrokeWidth}
            />
          </TabsContent>
          <TabsContent value="customize">
            <ContentCustomize
              fontWeight={fontWeight}
              textColor={textColor}
              strokeWidth={strokeWidth}
              directionCount={directionCount}
              strokeColor={strokeColor}
              sampleText={sampleText}
              onChangeFontWeight={handleChangeFontWeight}
              onChangeTextColor={onChangeTextColor}
              onChangeStrokeWidth={onChangeStrokeWidth}
              onChangeDirectionCount={onChangeDirectionCount}
              onChangeStrokeColor={onChangeStrokeColor}
              onChangeSampleText={onChangeSampleText}
            />
          </TabsContent>
        </Tabs>

        <div className="pointer-events-none sticky bottom-0 left-0">
          <div className="h-10 bg-gradient-to-b from-transparent to-sidebar" />
          <div className="pointer-events-auto grid gap-2 bg-sidebar pb-8">
            <div className="flex items-center justify-between">
              <p>コード</p>
              <div className="flex-shrink-0">
                <CustomizeDialog
                  fontWeight={fontWeight}
                  textColor={textColor}
                  strokeWidth={strokeWidth}
                  directionCount={directionCount}
                  strokeColor={strokeColor}
                />
              </div>
            </div>
            <Codesnippet code={code} />
          </div>
        </div>
      </div>
    </div>
  )
}
