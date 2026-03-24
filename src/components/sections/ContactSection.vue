<template>
  <section id="contact" class="contact-section" ref="elementRef">
    <div class="contact-bg">
      <img src="/img/background/Contact.webp" alt="" class="bg-image" />
    </div>
    <div class="contact-content" :class="{ visible: isInView }">
      <h2 class="section-title">📬 Contact Me</h2>
      <div class="contact-grid">
        <div
          v-for="(item, index) in contacts"
          :key="item.type"
          class="contact-card glass-card"
          :style="{ animationDelay: `${0.15 + index * 0.15}s` }"
        >
          <img v-if="item.iconType === 'img'" :src="item.icon" :alt="item.type" class="contact-icon" />
          <span v-else class="contact-icon">{{ item.icon }}</span>
          <div class="contact-info">
            <h3 class="contact-type">{{ item.type }}</h3>
            <p class="contact-value">{{ item.value }}</p>
          </div>
        </div>
      </div>
      <p class="footer-text">© 2026 AkiroMusic. All rights reserved.</p>
    </div>
  </section>
</template>

<script setup>
import { useInView } from '../../composables/useInView'

const { elementRef, isInView } = useInView({ threshold: 0.2 })

const contacts = [
  {
    icon: '📧',
    type: 'Email',
    value: 'akiromusic@qq.com\nakiromusic33@gmail.com'
  },
  {
    icon: '/img/icons/qq.svg',
    iconType: 'img',
    type: 'QQ',
    value: '1284969540'
  },
  {
    icon: '/img/icons/wechat.svg',
    iconType: 'img',
    type: 'WeChat',
    value: 'AkiroMusic'
  },
  {
    icon: '📱',
    type: 'Phone',
    value: '+86 180 3617 2522'
  }
]
</script>

<style scoped>
.contact-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-bg {
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

.contact-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  width: 100%;
  padding: var(--spacing-xl);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.contact-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  text-align: center;
  color: var(--color-accent);
  margin-bottom: var(--spacing-2xl);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
  padding: var(--spacing-xl);
  opacity: 0;
  transition: all var(--transition-normal);
}

.contact-content.visible .contact-card {
  animation: slideInUp 500ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.contact-card:hover {
  /* hover 效果由全局 .glass-card 统一控制 */
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.contact-icon {
  font-size: 2rem;
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}

.contact-info {
  flex: 1;
}

.contact-type {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  font-weight: var(--font-weight-body);
  margin-bottom: var(--spacing-xs);
}

.contact-value {
  color: var(--color-text);
  font-size: var(--font-size-body);
  font-weight: var(--font-weight-h3);
  word-break: break-all;
  white-space: pre-line;
}

.footer-text {
  text-align: center;
  color: var(--color-text-muted);
  font-size: var(--font-size-small);
  margin-top: 6rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-card {
    padding: var(--spacing-md);
  }
}
</style>
