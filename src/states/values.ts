import { DEFAULT_VALUES } from '@/constants/default-values'
import { FontWeight } from '@/types/values'
import { atom } from 'jotai'

type Values = {
  strokeWidth: number
  directionCount: number
  shadowOffset: number
  strokeColor: string
  textColor: string
  fontWeight: FontWeight
  sampleText: string
}

export const valuesAtom = atom<Values>(DEFAULT_VALUES)
