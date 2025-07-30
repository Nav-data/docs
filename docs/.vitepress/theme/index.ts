import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './custom.css'

// Import custom components
import FeatureCard from '../components/FeatureCard.vue'
import StatusBadge from '../components/StatusBadge.vue'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Register global components
    app.component('FeatureCard', FeatureCard)
    app.component('StatusBadge', StatusBadge)
  }
}