<template>
  <section id="about-us" class="about-section" ref="elementRef">
    <div class="about-bg">
      <img src="/img/background/About.webp" alt="" class="bg-image" />
    </div>
    <div class="about-content" :class="{ visible: isInView }">
      <h2 class="section-title">🍬 About AkiroMusic</h2>
      <div class="about-grid">
        <div class="bubbles-column">
          <div class="bubble bubble-left" :style="{ animationDelay: '0.2s' }">
            <p>I'm AkiroMusic, a Software Engineer and EDM Producer specializing in House music, and also Academic Admin Head at <a href="https://b23.tv/LShWUAF" target="_blank" rel="noopener noreferrer">Trackform</a>. I focus on refining my sound—blending deep, warm melodic vibes with bright, upbeat energy and catchy hooks.</p>
          </div>
          <div class="bubble bubble-right" :style="{ animationDelay: '0.5s' }">
            <p>Driven by the power of rhythm, music is my passion. I constantly explore new sounds and techniques to craft unique electronic music experiences that resonate with listeners worldwide.</p>
          </div>
        </div>
        <div class="profile-column">
          <div class="avatar-container">
            <img src="/img/icon/Akiro.jpg" alt="AkiroMusic" class="avatar" />
          </div>
          <div class="inspiration-card glass-card">
            <p class="inspiration-q">What inspires your music production?</p>
            <p class="inspiration-a">power of rhythm</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useInView } from '../../composables/useInView'

const { elementRef, isInView } = useInView({ threshold: 0.2 })
</script>

<style scoped>
.about-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-bg {
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

.about-content {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  width: 100%;
  padding: var(--spacing-xl);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-content.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  text-align: center;
  color: var(--color-accent);
  margin-bottom: var(--spacing-3xl);
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
}

.bubbles-column {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.bubble {
  padding: var(--spacing-xl);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  position: relative;
  opacity: 0;
  cursor: default;
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
              border-color 0.3s ease;
}

.bubble:hover {
  transform: translateY(-12px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.35), 0 0 25px rgba(255, 184, 0, 0.15);
  border-color: rgba(255, 184, 0, 0.4);
}

.about-content.visible .bubble {
  animation: slideInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

.bubble-left {
  border-bottom-left-radius: var(--radius-sm);
}

.bubble-right {
  border-bottom-right-radius: var(--radius-sm);
  align-self: flex-end;
}

.bubble p {
  color: var(--color-text-secondary);
  line-height: 1.7;
  font-size: var(--font-size-body);
}

.profile-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
}

.avatar-container {
  position: relative;
}

.avatar {
  width: 150px;
  height: 150px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 3px solid rgba(255, 184, 0, 0.3);
  transition: transform var(--transition-slow);
}

.avatar:hover {
  transform: scale(1.1);
}

.inspiration-card {
  text-align: center;
  padding: var(--spacing-xl);
  opacity: 0;
}

.about-content.visible .inspiration-card {
  animation: slideInUp 600ms cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.6s;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
}

.inspiration-q {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-sm);
  font-size: var(--font-size-small);
}

.inspiration-a {
  color: var(--color-accent);
  font-weight: var(--font-weight-h2);
  font-size: var(--font-size-h3);
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }

  .avatar {
    width: 100px;
    height: 100px;
  }

  .profile-column {
    order: -1;
  }
}
</style>
