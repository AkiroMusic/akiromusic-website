import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll(sections = 5) {
  const currentSection = ref(0)
  const isScrolling = ref(false)
  let lastScrollTime = 0
  const throttleDelay = 1050

  const scrollToSection = (index) => {
    if (index < 0 || index >= sections || isScrolling.value) return

    isScrolling.value = true
    currentSection.value = index

    const container = document.querySelector('.sections-container')
    if (container) {
      container.style.transform = `translateY(-${index * 100}vh)`
    }

    setTimeout(() => {
      isScrolling.value = false
    }, throttleDelay)
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const now = Date.now()
    if (now - lastScrollTime < throttleDelay) return
    lastScrollTime = now

    if (e.deltaY > 0) {
      scrollToSection(currentSection.value + 1)
    } else if (e.deltaY < 0) {
      scrollToSection(currentSection.value - 1)
    }
  }

  const handleKeydown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      scrollToSection(currentSection.value + 1)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      scrollToSection(currentSection.value - 1)
    }
  }

  // Touch support
  let touchStartY = 0
  const handleTouchStart = (e) => {
    touchStartY = e.touches[0].clientY
  }

  const handleTouchEnd = (e) => {
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY - touchEndY
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        scrollToSection(currentSection.value + 1)
      } else {
        scrollToSection(currentSection.value - 1)
      }
    }
  }

  onMounted(() => {
    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel)
    window.removeEventListener('keydown', handleKeydown)
    window.removeEventListener('touchstart', handleTouchStart)
    window.removeEventListener('touchend', handleTouchEnd)
  })

  return {
    currentSection,
    isScrolling,
    scrollToSection
  }
}
