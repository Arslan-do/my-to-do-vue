import { ref, onMounted, onUnmounted } from 'vue'

export function useMinWidth(breakpointPx: number) {
  const isAbove = ref(false)
  const query = `(min-width: ${breakpointPx + 1}px)`
  let mql: MediaQueryList | undefined

  const sync = (): void => {
    if (mql) isAbove.value = mql.matches
  }

  onMounted(() => {
    mql = window.matchMedia(query)
    sync()
    mql.addEventListener('change', sync)
  })

  onUnmounted(() => {
    mql?.removeEventListener('change', sync)
  })

  return { isAbove }
}