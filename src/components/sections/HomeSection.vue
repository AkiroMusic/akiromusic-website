<template>
  <section id="home" class="home-section" ref="elementRef">
    <canvas ref="canvasRef" class="particles-canvas"></canvas>
    <div class="home-bg">
      <img src="/img/background/Home.webp" alt="" class="bg-image" />
    </div>
    <div class="geo-decorations" aria-hidden="true">
      <span class="geo geo-diamond"></span>
      <span class="geo geo-dots"><i></i><i></i><i></i></span>
      <span class="geo geo-cross"></span>
      <span class="geo geo-dash"></span>
      <span class="geo geo-triangle"></span>
    </div>
    <div class="home-content" :class="{ visible: isInView }">
      <div class="logo-container">
        <img src="/img/icon/Akiro.jpg" alt="AkiroMusic" class="logo breathe" />
      </div>
      <h1 class="title">
        <span class="typed-text">
          <template v-for="(char, index) in titleChars" :key="index">
            <span 
              class="char"
              :class="{ visible: index < typedCount, current: index === typedCount - 1 }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >{{ char }}</span>
            <span 
              v-if="index === typedCount - 1 || (typedCount === 0 && index === 0)"
              class="cursor"
              :class="{ typing: isTyping, done: !isTyping && typedCount > 0 }"
            >|</span>
          </template>
        </span>
      </h1>
      <p class="subtitle">{{ subtitle }}</p>
      <a href="#about" class="cta-link" @click.prevent="$emit('navigate', 1)">
        Feel the Rhythm & Love the Beat! →
      </a>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useParticles } from '../../composables/useParticles'
import { useInView } from '../../composables/useInView'

defineEmits(['navigate'])

const canvasRef = ref(null)
const { elementRef, isInView } = useInView({ threshold: 0.3 })

const fullTitle = 'AkiroMusic'
const subtitle = 'Creating Musical Moments'
const titleChars = computed(() => fullTitle.split(''))
const typedCount = ref(0)
const isTyping = ref(false)

useParticles(canvasRef)

// 打字速度配置：每个字符的延迟（ms）
const getTypeDelay = (index) => {
  // 开头稍慢，中间快，结尾慢
  if (index === 0) return 200
  if (index < 3) return 120
  if (index < 6) return 80
  return 150
}

const typeWriter = (index = 0) => {
  if (index >= fullTitle.length) {
    isTyping.value = false
    return
  }
  
  isTyping.value = true
  const delay = getTypeDelay(index)
  
  setTimeout(() => {
    typedCount.value = index + 1
    typeWriter(index + 1)
  }, delay)
}

watch(isInView, (visible) => {
  if (visible && typedCount.value === 0) {
    setTimeout(() => typeWriter(0), 2000)
  }
})
</script>

<style scoped>
.home-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.home-bg {
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
  opacity: 0.3;
}

.home-content {
  position: relative;
  z-index: 2;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-xl);
  opacity: 0;
  transition: opacity 0.8s ease;
}

.home-content.visible {
  opacity: 1;
}

.logo-container {
  margin-bottom: var(--spacing-md);
}

.logo {
  width: 120px;
  height: 120px;
  border-radius: var(--radius-full);
  object-fit: cover;
  border: 3px solid rgba(255, 184, 0, 0.3);
}

.title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: var(--font-weight-h1);
  color: var(--color-text);
  min-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.typed-text {
  color: var(--color-accent);
  display: inline-flex;
}

/* 每个字符的样式 */
.char {
  display: inline-block;
  opacity: 0;
  transform: translateY(20px) scale(0.8);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-shadow: none;
}

.char.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  text-shadow: 0 0 20px rgba(255, 184, 0, 0.6);
}

.char.current {
  animation: charPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-shadow: 0 0 30px rgba(255, 184, 0, 0.9), 0 0 60px rgba(255, 184, 0, 0.5);
}

/* 光标样式 */
.cursor {
  color: var(--color-accent);
  font-weight: 100;
  margin-left: 1px;
  animation: cursorBlink 1s infinite;
  display: inline-block;
  text-shadow: 0 0 10px rgba(255, 184, 0, 0.8);
}

.cursor.typing {
  animation: cursorTyping 0.4s infinite;
  text-shadow: 0 0 20px rgba(255, 184, 0, 0.8);
}

.cursor.done {
  animation: cursorDone 2s ease-out forwards;
}

.subtitle {
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 1.8s;
}

.home-content.visible .subtitle {
  opacity: 1;
  transform: translateY(0);
}

.cta-link {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-xl);
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  color: var(--color-accent);
  font-size: var(--font-size-body);
  transition: all var(--transition-normal);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 2.2s;
}

.home-content.visible .cta-link {
  opacity: 1;
  transform: translateY(0);
}

.cta-link:hover {
  background: rgba(255, 184, 0, 0.15);
  border-color: var(--color-accent);
  transform: translateY(-12px);
  box-shadow: var(--shadow-glow), 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 184, 0, 0.25);
}

/* 字符弹出动画 */
@keyframes charPop {
  0% {
    transform: translateY(10px) scale(1.3);
  }
  50% {
    transform: translateY(-5px) scale(0.95);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

/* 光标闪烁 - 打字中 */
@keyframes cursorTyping {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* 光标闪烁 - 默认 */
@keyframes cursorBlink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* 打字完成后的光标 */
@keyframes cursorDone {
  0% { opacity: 1; }
  50% { opacity: 1; }
  100% { opacity: 0; }
}

@media (max-width: 768px) {
  .logo {
    width: 80px;
    height: 80px;
  }
  
  .char {
    transform: translateY(10px) scale(0.8);
  }
  
  .char.visible {
    transform: translateY(0) scale(1);
  }

  .geo-dots,
  .geo-cross,
  .geo-dash,
  .geo-triangle {
    display: none;
  }

  .geo-diamond {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 480px) {
  .geo-decorations {
    display: none;
  }
}

/* ====== Geometric Decorations ====== */

.geo-decorations {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  overflow: hidden;
}

.geo {
  position: absolute;
  will-change: transform;
}

/* 1. Diamond — top-left */
.geo-diamond {
  top: 12%;
  left: 8%;
  width: 60px;
  height: 60px;
  border: 1px solid rgba(255, 184, 0, 0.12);
  transform: rotate(45deg);
  animation: geoSpin 25s linear infinite;
}

/* 2. Dot cluster — bottom-left */
.geo-dots {
  bottom: 18%;
  left: 10%;
  width: 30px;
  height: 26px;
  animation: geoBreath 6s ease-in-out infinite;
}

.geo-dots i {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255, 184, 0, 0.15);
  display: block;
}

.geo-dots i:nth-child(1) {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.geo-dots i:nth-child(2) {
  bottom: 0;
  left: 0;
}

.geo-dots i:nth-child(3) {
  bottom: 0;
  right: 0;
}

/* 4. Cross — bottom-right */
.geo-cross {
  bottom: 20%;
  right: 8%;
  width: 40px;
  height: 40px;
  animation: geoSpin 30s linear infinite;
}

.geo-cross::before,
.geo-cross::after {
  content: '';
  position: absolute;
  background: rgba(255, 184, 0, 0.10);
}

.geo-cross::before {
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  transform: translateY(-50%);
}

.geo-cross::after {
  left: 50%;
  top: 0;
  width: 1px;
  height: 100%;
  transform: translateX(-50%);
}

/* 5. Dash — left-center */
.geo-dash {
  top: 50%;
  left: 5%;
  width: 40px;
  height: 1.5px;
  background: rgba(255, 184, 0, 0.12);
  animation: geoDriftX 10s ease-in-out infinite;
}

/* 6. Triangle — right-center */
.geo-triangle {
  top: 45%;
  right: 6%;
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-bottom: 12px solid rgba(255, 184, 0, 0.10);
  animation: geoFloat 12s ease-in-out infinite;
}

/* ====== Geometric Animation Keyframes ====== */

@keyframes geoSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes geoBreath {
  0%, 100% { opacity: 0.08; }
  50% { opacity: 0.18; }
}

@keyframes geoDriftX {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

@keyframes geoFloat {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(5deg); }
}
</style>
