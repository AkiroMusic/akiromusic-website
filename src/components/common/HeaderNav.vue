<template>
  <header class="header-nav">
    <div class="header-content">
      <div class="logo" @click="scrollToHome">
        <img src="/img/icon/Akiro.jpg" alt="AkiroMusic" class="logo-img" />
        <span class="logo-text">AkiroMusic</span>
      </div>

    </div>
  </header>
</template>

<script setup>
const emit = defineEmits(['navigate'])

const scrollToHome = () => {
  emit('navigate', 0)
}
</script>

<style scoped>
.header-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  z-index: var(--z-header);
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
  border-bottom: 1px solid var(--glass-border);
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
  height: 100%;
  padding: 0 var(--spacing-xl);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  cursor: url('/fonts/cursors/pointer.cur'), pointer;
  transition: transform var(--transition-fast);
}

.logo:hover {
  transform: scale(1.05);
}

.logo-img {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  object-fit: cover;
}

.logo-text {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-h3);
  color: var(--color-accent);
  letter-spacing: 1px;
}

.header-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
}

.header-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  transition: all var(--transition-fast);
}

.header-links a:hover {
  background: rgba(255, 184, 0, 0.1);
  border-color: var(--color-accent);
  transform: translateY(-2px);
}

.link-icon {
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .logo-text {
    display: none;
  }
}
</style>
