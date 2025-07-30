<template>
  <div class="feature-card" :class="variant">
    <div class="feature-icon">
      <component :is="iconComponent" v-if="iconComponent" />
      <span v-else class="emoji-icon">{{ icon }}</span>
    </div>
    <div class="feature-content">
      <h3 class="feature-title">{{ title }}</h3>
      <p class="feature-description">{{ description }}</p>
      <a v-if="link" :href="link" class="feature-link">
        了解更多 →
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  icon?: string
  iconComponent?: any
  title: string
  description: string
  link?: string
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
}

withDefaults(defineProps<Props>(), {
  variant: 'default'
})
</script>

<style scoped>
.feature-card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7));
  border: 1px solid rgba(30, 64, 175, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(30, 64, 175, 0.15);
  border-color: rgba(30, 64, 175, 0.3);
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-card.primary {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05));
  border-color: rgba(30, 64, 175, 0.2);
}

.feature-card.secondary {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.05), rgba(6, 182, 212, 0.05));
  border-color: rgba(14, 165, 233, 0.2);
}

.feature-card.accent {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.05), rgba(251, 191, 36, 0.05));
  border-color: rgba(245, 158, 11, 0.2);
}

.feature-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  margin-bottom: 1.5rem;
  background: var(--gradient-primary);
  border-radius: 16px;
  color: white;
}

.emoji-icon {
  font-size: 2rem;
}

.feature-content {
  flex: 1;
}

.feature-title {
  color: var(--vp-c-brand-1);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.feature-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.feature-link {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
}

.feature-link:hover {
  color: var(--vp-c-brand-2);
}

/* Dark mode styles */
.dark .feature-card {
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.7));
  border-color: rgba(96, 165, 250, 0.2);
}

.dark .feature-card.primary {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.1));
}

.dark .feature-card.secondary {
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.1), rgba(6, 182, 212, 0.1));
}

.dark .feature-card.accent {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1));
}
</style>