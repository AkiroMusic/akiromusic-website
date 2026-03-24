<template>
  <Transition name="loader-fade">
    <div v-if="visible" class="page-loader">
      <div class="loader-content">
        <div class="loader-logo">
          <img src="/img/icon/Akiro.jpg" alt="AkiroMusic" />
        </div>
        <div class="loader-spinner"></div>
        <p class="loader-text">Loading...</p>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const emit = defineEmits(['loaded'])
const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
    setTimeout(() => {
      emit('loaded')
    }, 500)
  }, 1500)
})
</script>

<style scoped>
.page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--color-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-loader);
}

.loader-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-lg);
}

.loader-logo {
  width: 80px;
  height: 80px;
  border-radius: var(--radius-full);
  overflow: hidden;
  animation: breathe 2s ease-in-out infinite;
}

.loader-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loader-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--glass-border);
  border-top-color: var(--color-accent);
  border-radius: var(--radius-full);
  animation: spin 1s linear infinite;
}

.loader-text {
  color: var(--color-text-secondary);
  font-size: var(--font-size-small);
  animation: pulse 1.5s ease-in-out infinite;
}

.loader-fade-leave-active {
  transition: opacity 0.5s ease;
}

.loader-fade-leave-to {
  opacity: 0;
}
</style>
