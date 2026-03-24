import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(options = {}) {
  const elementRef = ref(null)
  const isInView = ref(false)
  let observer = null

  onMounted(() => {
    if (!elementRef.value) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            isInView.value = true
          }
        })
      },
      {
        threshold: options.threshold || 0.2,
        rootMargin: options.rootMargin || '0px'
      }
    )

    observer.observe(elementRef.value)
  })

  onUnmounted(() => {
    if (observer && elementRef.value) {
      observer.unobserve(elementRef.value)
      observer.disconnect()
    }
  })

  return {
    elementRef,
    isInView
  }
}
