import { valuesAtom } from '@/states/values'
import { generateTextShadow } from '@/utils/generate-text-shadow'
import { atom } from 'jotai'

export const textShadowAtom = atom((get) => {
  const values = get(valuesAtom)
  return generateTextShadow({
    width: values.strokeWidth,
    directionCount: values.directionCount,
    color: values.strokeColor,
    shadowOffset: values.shadowOffset,
  })
})
