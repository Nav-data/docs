<template>
  <span class="status-badge" :class="[type, size]">
    <span v-if="icon" class="badge-icon">{{ icon }}</span>
    <span class="badge-text">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
interface Props {
  type: 'success' | 'warning' | 'error' | 'info' | 'primary'
  text: string
  icon?: string
  size?: 'small' | 'medium' | 'large'
}

withDefaults(defineProps<Props>(), {
  size: 'medium'
})
</script>

<style scoped>
.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: all 0.2s ease;
}

.status-badge.small {
  padding: 0.125rem 0.5rem;
  font-size: 0.6875rem;
}

.status-badge.large {
  padding: 0.375rem 1rem;
  font-size: 0.875rem;
}

.status-badge.success {
  background: linear-gradient(135deg, #dcfce7, #bbf7d0);
  color: #166534;
  border: 1px solid #86efac;
}

.status-badge.warning {
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  color: #92400e;
  border: 1px solid #fcd34d;
}

.status-badge.error {
  background: linear-gradient(135deg, #fee2e2, #fecaca);
  color: #991b1b;
  border: 1px solid #f87171;
}

.status-badge.info {
  background: linear-gradient(135deg, #dbeafe, #bfdbfe);
  color: #1e40af;
  border: 1px solid #60a5fa;
}

.status-badge.primary {
  background: var(--gradient-primary);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.badge-icon {
  font-size: 1em;
}

.badge-text {
  font-weight: 600;
}

/* Dark mode styles */
.dark .status-badge.success {
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
  color: #4ade80;
  border-color: rgba(34, 197, 94, 0.3);
}

.dark .status-badge.warning {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1));
  color: #fbbf24;
  border-color: rgba(245, 158, 11, 0.3);
}

.dark .status-badge.error {
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1));
  color: #f87171;
  border-color: rgba(239, 68, 68, 0.3);
}

.dark .status-badge.info {
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.1));
  color: #60a5fa;
  border-color: rgba(59, 130, 246, 0.3);
}
</style>