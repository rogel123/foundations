import { ReduxState } from '@/types/core'
import { WebComponentConfigResult } from '@/services/web-component'

export const selectWebComponentData = (state: ReduxState): WebComponentConfigResult => {
  return state?.webComponent?.detail?.data
}

export const selectWebComponentLoading = (state: ReduxState): boolean => {
  return state?.webComponent?.detail?.isLoading
}

export const selectWebComponentUpdating = (state: ReduxState): boolean => {
  return state?.webComponent?.update?.isLoading
}
