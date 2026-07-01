import { buildSearchIndex } from './search'

let cachedIndex: ReturnType<typeof buildSearchIndex> | null = null

export function getSearchIndex() {
  if (!cachedIndex) {
    cachedIndex = buildSearchIndex()
  }
  return cachedIndex
}
