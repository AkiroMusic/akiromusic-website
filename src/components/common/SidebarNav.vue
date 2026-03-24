<template>
  <aside class="sidebar-nav">
    <nav class="sidebar-links">
      <button
        v-for="(section, index) in sections"
        :key="section.id"
        :class="['sidebar-dot', { active: activeSection === index }]"
        :title="section.label"
        @click="$emit('navigate', index)"
        :aria-label="`Navigate to ${section.label}`"
      >
        <span class="dot"></span>
        <span class="dot-label">{{ section.label }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
defineProps({
  activeSection: {
    type: Number,
    default: 0
  }
})

defineEmits(['navigate'])

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'album', label: 'Album' },
  { id: 'platforms', label: 'Links' },
  { id: 'contact', label: 'Contact' }
]
</script>

<style scoped>
.sidebar-nav {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: var(--z-sidebar);
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.sidebar-dot {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  background: none;
  border: none;
  padding: var(--spacing-xs);
  flex-direction: row-reverse;
  cursor: url('/fonts/cursors/pointer.cur'), pointer;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: var(--radius-full);
  background: rgba(255, 255, 255, 0.3);
  transition: all var(--transition-normal);
}

.sidebar-dot.active .dot {
  background: var(--color-accent);
  box-shadow: 0 0 10px rgba(255, 184, 0, 0.5);
  transform: scale(1.3);
}

.sidebar-dot:hover .dot {
  background: var(--color-accent);
  transform: scale(1.5);
  box-shadow: 0 0 15px rgba(255, 184, 0, 0.6);
}

.dot-label {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  opacity: 0;
  transform: translateX(10px);
  transition: all var(--transition-normal);
  white-space: nowrap;
}

.sidebar-dot:hover .dot-label,
.sidebar-dot.active .dot-label {
  opacity: 1;
  transform: translateX(0);
}

.sidebar-dot.active .dot-label {
  color: var(--color-accent);
}

@media (max-width: 768px) {
  .sidebar-nav {
    display: none;
  }
}
</style>
