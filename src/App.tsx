import Sidebar from '@/components/sidebar'
import StrokeText from '@/components/stroke-text'
import { useAtomValue } from 'jotai'
import { valuesAtom } from '@/states/values'
import { textShadowAtom } from '@/states/text-shadow'

function App() {
  const values = useAtomValue(valuesAtom)
  const textShadow = useAtomValue(textShadowAtom)

  return (
    <div className="md:flex">
      <div className="min-w-64 overflow-hidden md:sticky md:bottom-0 md:left-0 md:top-0 md:max-h-screen md:w-1/4 md:max-w-96 md:flex-shrink-0">
        <Sidebar />
      </div>

      <div
        className="grid flex-1 gap-10 p-8 text-5xl font-bold"
        style={{ fontWeight: values.fontWeight }}
      >
        <div>
          <StrokeText textColor={values.textColor} textShadow={textShadow}>
            {values.sampleText}
          </StrokeText>
        </div>
      </div>
    </div>
  )
}

export default App
