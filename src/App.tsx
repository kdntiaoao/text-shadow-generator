import { useState } from 'react'
import Sidebar from '@/components/sidebar'
import StrokeText from '@/components/stroke-text'
import { DEFAULT_VALUES } from '@/constants/default-values'
import type { FontWeight } from '@/types/values'
import { generateTextShadow } from '@/utils/generate-text-shadow'

function App() {
  const [fontWeight, setFontWeight] = useState<FontWeight>(
    DEFAULT_VALUES.fontWeight,
  )
  const [textColor, setTextColor] = useState<string>(DEFAULT_VALUES.textColor)
  const [strokeWidth, setStrokeWidth] = useState<number>(
    DEFAULT_VALUES.strokeWidth,
  )
  const [directionCount, setDirectionCount] = useState<number>(
    DEFAULT_VALUES.directionCount,
  )
  const [strokeColor, setStrokeColor] = useState<string>(
    DEFAULT_VALUES.strokeColor,
  )
  const [shadowOffset, setShadowOffset] = useState<number>(
    DEFAULT_VALUES.shadowOffset,
  )
  const [sampleText, setSampleText] = useState<string>(
    DEFAULT_VALUES.sampleText,
  )

  const textShadow = generateTextShadow({
    width: strokeWidth,
    directionCount,
    color: strokeColor,
    shadowOffset,
  })

  const handleChangeFontWeight = (value: FontWeight) => {
    setFontWeight(value)
  }

  const handleChangeTextColor = (value: string) => {
    setTextColor(value)
  }

  const handleChangeStrokeWidth = (value: number) => {
    setStrokeWidth(value)
  }

  const handleChangeDirectionCount = (value: number) => {
    setDirectionCount(value)
  }

  const handleChangeStrokeColor = (value: string) => {
    setStrokeColor(value)
  }

  const handleShadowOffsetChange = (value: number) => {
    setShadowOffset(value)
  }

  const handleSampleTextChange = (value: string) => {
    setSampleText(value)
  }

  return (
    <div className="md:flex">
      <div className="min-w-64 overflow-hidden md:sticky md:bottom-0 md:left-0 md:top-0 md:max-h-screen md:w-1/4 md:max-w-96 md:flex-shrink-0">
        <Sidebar
          fontWeight={fontWeight}
          textColor={textColor}
          strokeWidth={strokeWidth}
          directionCount={directionCount}
          strokeColor={strokeColor}
          shadowOffset={shadowOffset}
          sampleText={sampleText}
          textShadow={textShadow}
          onChangeFontWeight={handleChangeFontWeight}
          onChangeTextColor={handleChangeTextColor}
          onChangeStrokeWidth={handleChangeStrokeWidth}
          onChangeDirectionCount={handleChangeDirectionCount}
          onChangeStrokeColor={handleChangeStrokeColor}
          onChangeShadowOffset={handleShadowOffsetChange}
          onChangeSampleText={handleSampleTextChange}
        />
      </div>

      <div
        className="grid flex-1 gap-10 p-8 text-5xl font-bold"
        style={{ fontWeight }}
      >
        <div>
          <StrokeText textColor={textColor} textShadow={textShadow}>
            {sampleText}
          </StrokeText>
        </div>
      </div>
    </div>
  )
}

export default App
