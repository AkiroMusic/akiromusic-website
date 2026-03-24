<template>
  <section id="album" class="album-section" ref="elementRef">
    <div class="album-bg">
      <img src="/img/background/album.webp" alt="" class="bg-image" />
    </div>
    <div class="album-content" :class="{ visible: isInView }">
      <h2 class="section-title">💿 My Albums</h2>
      <div class="albums-grid">
        <a
          v-for="(album, index) in albums"
          :key="album.title"
          :href="album.url"
          target="_blank"
          rel="noopener noreferrer"
          class="album-card glass-card"
          :style="{ animationDelay: `${0.2 + index * 0.3}s` }"
        >
          <div class="album-cover">
            <img :src="album.cover" :alt="album.title" />
          </div>
          <div class="album-info">
            <h3 class="album-title">{{ album.title }}</h3>
            <p class="album-label">📀 {{ album.label }}</p>
            <p class="album-description">{{ album.description }}</p>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInView } from '../../composables/useInView'

const { elementRef, isInView } = useInView({ threshold: 0.2 })

const albums = [
  {
    title: 'Memories in Motion',
    label: 'Soul Notes Records',
    cover: '/img/My Music/Memories in Motion.webp',
    url: 'https://music.163.com/album?id=355750612&uct2=U2FsdGVkX1879tMWiAiQm9k1+BS1vziqRul/anrulfc=',
    description: 'To hold your letter is to hold you near—how fares your days in that distant land? Tonight, I lie awake tossing and turning, my thoughts drifting unbidden back to that embrace we shared beneath the Ferris wheel all those days ago.'
  },
  {
    title: 'Nothing but You and Me',
    label: 'Hilarity Leap Records',
    cover: '/img/My Music/Nothing but You and Me.webp',
    url: 'https://music.163.com/album?id=354565990&uct2=U2FsdGVkX182+/JJKSp0TiwZqaShRK1oJCFsu5yTiGg=',
    description: 'The scarlet wilderness stretches to the horizon; wheel tracks carve winding trails through the crimson ears of grain, like threads weaving hearts together. Beneath the ashen sky, a neon-shattered beam of light pierces the silence. All the world\'s clamor is swallowed by the open field, leaving only the soft rustle of wind brushing grass tips—and you, by my side. The universe is vast beyond measure, yet it holds nothing but you and me.'
  }
]
</script>

<style scoped>
.album-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-bg {
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
  opacity: 0.2;
}

.album-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: var(--spacing-xl);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.album-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  text-align: center;
  color: var(--color-accent);
  margin-bottom: var(--spacing-3xl);
}

.albums-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-xl);
}

.album-card {
  display: flex;
  gap: var(--spacing-xl);
  padding: var(--spacing-xl);
  opacity: 0;
  transition: transform var(--transition-slow), box-shadow var(--transition-slow);
  text-decoration: none;
  color: inherit;
}

.album-content.visible .album-card {
  animation: slideInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.album-card:hover {
  /* hover 效果由全局 .glass-card 统一控制 */
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.album-cover {
  flex-shrink: 0;
  width: 160px;
  height: 160px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.album-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-slow);
}

.album-card:hover .album-cover img {
  transform: scale(1.05);
}

.album-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.album-title {
  color: var(--color-accent);
  font-size: var(--font-size-h3);
}

.album-label {
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
}

.album-description {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  line-height: 1.7;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
}

@media (max-width: 768px) {
  .albums-grid {
    grid-template-columns: 1fr;
  }

  .album-card {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .album-cover {
    width: 140px;
    height: 140px;
  }
}
</style>
