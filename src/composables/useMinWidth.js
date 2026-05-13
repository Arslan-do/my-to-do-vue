import { ref, onMounted, onUnmounted } from 'vue'

export function useMinWidth(breakpointPx) {
  const isAbove = ref(false)
  const query = `(min-width: ${breakpointPx + 1}px)`
  let mql
  const sync = () => {
    isAbove.value = mql.matches
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