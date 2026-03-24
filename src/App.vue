<template>
  <div id="app" class="app" :class="{ scrolling: isScrolling }">
    <PageLoader @loaded="onLoaded" />
    <HeaderNav @navigate="scrollToSection" />
    <SidebarNav :activeSection="currentSection" @navigate="scrollToSection" />

    <main class="sections-container" :class="{ loaded: isLoaded }">
      <HomeSection @navigate="scrollToSection" />
      <AboutSection />
      <AlbumSection />
      <PlatformSection />
      <ContactSection />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from './composables/useScroll'
import PageLoader from './components/common/PageLoader.vue'
import HeaderNav from './components/common/HeaderNav.vue'
import SidebarNav from './components/common/SidebarNav.vue'
import HomeSection from './components/sections/HomeSection.vue'
import AboutSection from './components/sections/AboutSection.vue'
import AlbumSection from './components/sections/AlbumSection.vue'
import PlatformSection from './components/sections/PlatformSection.vue'
import ContactSection from './components/sections/ContactSection.vue'

const isLoaded = ref(false)
const { currentSection, isScrolling, scrollToSection } = useScroll(5)

const onLoaded = () => {
  isLoaded.value = true
}
</script>

<style>
@import './styles/global.css';
@import './styles/animations.css';
</style>

<style scoped>
.app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.sections-container {
  width: 100%;
  opacity: 0;
  filter: brightness(0.4);
  transition: transform 1.0s cubic-bezier(0.22, 1, 0.36, 1),
              opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1),
              filter 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.sections-container.loaded {
  opacity: 1;
  filter: brightness(1);
  will-change: transform;
}

/* 滚动过渡暗化遮罩 */
.app::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 50;
  background: black;
  opacity: 0;
  will-change: opacity;
}

.app.scrolling::after {
  animation: scrollDimPulse 1.0s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes scrollDimPulse {
  0% { opacity: 0; }
  20% { opacity: 0.06; }
  100% { opacity: 0; }
}
</style>
