<template>
  <section id="register" class="platform-section" ref="elementRef">
    <div class="platform-bg">
      <img src="/img/background/Music Links.webp" alt="" class="bg-image" />
    </div>
    <div class="platform-content" :class="{ visible: isInView }">
      <h2 class="section-title">🔗 Music Platforms</h2>
      <div class="hex-grid">
        <a
          v-for="(platform, index) in platforms"
          :key="platform.name"
          :href="platform.url"
          target="_blank"
          rel="noopener noreferrer"
          class="hex-item"
          :class="[`hex-${index + 1}`, { visible: isInView }]"
          :style="{ animationDelay: `${0.1 + index * 0.12}s` }"
        >
          <div class="hex-inner glass-card">
            <img :src="platform.icon" :alt="platform.name" class="hex-icon" />
            <span class="hex-name">{{ platform.name }}</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInView } from '../../composables/useInView'

const { elementRef, isInView } = useInView({ threshold: 0.2 })

const platforms = [
  {
    icon: '/img/icons/netease.svg',
    name: '网易云音乐',
    description: 'Official Artist Page',
    url: 'https://music.163.com/#/artist?id=47966143'
  },
  {
    icon: '/img/icons/qq-music.ico',
    name: 'QQ音乐',
    description: 'Listen to My Tracks',
    url: 'https://y.qq.com/n/ryqq/singer/003qWlyY39YXFo'
  },
  {
    icon: '/img/icons/bilibili.svg',
    name: 'BiliBili',
    description: 'Music Content',
    url: 'https://m.bilibili.com/space/412877576'
  },
  {
    icon: '/img/icons/soundcloud.svg',
    name: 'SoundCloud',
    description: 'Releases & Remixes',
    url: 'https://soundcloud.com/akirowww'
  },
  {
    icon: '/img/icons/youtube.svg',
    name: 'YouTube',
    description: 'Music Videos',
    url: 'https://www.youtube.com/@AkiroMusic'
  },
  {
    icon: '/img/icons/github.svg',
    name: 'GitHub',
    description: 'Code & Projects',
    url: 'https://github.com/AkiroMusic'
  },
  {
    icon: '/img/icons/discord.svg',
    name: 'Discord',
    description: 'Connect & Chat',
    url: 'https://discord.com/users/743371092609204294'
  }
]
</script>

<style scoped>
.platform-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.platform-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.bg-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.15;
}

.platform-content {
  position: relative;
  z-index: 2;
  max-width: 700px;
  width: 100%;
  padding: var(--spacing-xl);
  padding-top: 70px;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.platform-content.visible {
  opacity: 1;
}

.section-title {
  text-align: center;
  color: var(--color-accent);
  margin-bottom: var(--spacing-2xl);
  font-size: 2rem;
}

/* 六边形蜂窝布局 */
.hex-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  column-gap: 15px;
  row-gap: 0;
  padding: 20px 0;
}

.hex-item {
  width: 140px;
  height: 160px;
  opacity: 0;
  transform: scale(0.5) rotate(-10deg);
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              z-index 0s;
  cursor: pointer;
  text-decoration: none;
}

.hex-item.visible {
  animation: hexAppear 600ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

.hex-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: 20px;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hex-item:hover {
  z-index: 10;
  transform: scale(1.2) translateY(-10px);
}

.hex-item:hover .hex-inner {
  background: rgba(255, 184, 0, 0.15);
  border-color: rgba(255, 184, 0, 0.5);
  box-shadow: 0 0 40px rgba(255, 184, 0, 0.3);
}

.hex-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.hex-name {
  font-size: 0.75rem;
  color: var(--color-text);
  font-weight: 600;
  text-align: center;
  line-height: 1.2;
}

/* 蜂窝错位布局 */
.hex-1, .hex-3, .hex-5, .hex-7 { margin-top: 0; }
.hex-2, .hex-4, .hex-6 { margin-top: 40px; }

/* 入场动画 */
@keyframes hexAppear {
  0% {
    opacity: 0;
    transform: scale(0.5) rotate(-10deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@media (max-width: 768px) {
  .hex-item {
    width: 100px;
    height: 115px;
  }
  
  .hex-icon {
    width: 28px;
    height: 28px;
  }
  
  .hex-name {
    font-size: 0.6rem;
  }
  
  .hex-grid {
    column-gap: 8px;
  }
  
  .hex-5, .hex-6, .hex-7 { margin-top: -12px; }
}
</style>
