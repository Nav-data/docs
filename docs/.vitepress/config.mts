import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Nav-data",
  description: "高质量飞行模拟导航数据 - 专业的航空导航数据转换工具",
  lang: 'zh-CN',
  head: [
    ['meta', { name: 'theme-color', content: '#1e40af' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: 'Nav-data | 航空导航数据转换工具' }],
    ['meta', { property: 'og:site_name', content: 'Nav-data' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // Enhanced favicon configuration
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=3' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.svg?v=3' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // Custom fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }]
  ],
  
  // 主题外观配置
  appearance: 'dark', // 支持深色模式切换
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // 添加logo到头部
    logo: '/favicon.svg',
    
    nav: [
      { text: '🏠 首页', link: '/' },
      { text: '🛩️ PMDG', link: '/PMDG/guide/index' },
      { text: '✈️ iniBuilds', link: '/iniBuilds/guide/index' },
      { text: '🛫 X-Plane', link: '/X-Plane/guide/index' },
      { 
        text: '📖 关于', 
        items: [
          { text: '🎯 关于我们', link: '/Introduction/about' },
          { text: '🤝 如何加入', link: '/Introduction/join' }
        ]
      }
    ],

    sidebar: {
      '/Introduction/': [
        {
          text: '简介',
          items: [
            { text: '关于我们', link: '/Introduction/about' },
            { text: '如何加入', link: '/Introduction/join' },
          ],
        },
      ],
      '/PMDG/': [
        {
          text: 'PMDG',
          items: [
            {
              text: '指南',
              link: '/PMDG/guide/index',
              collapsed: false,
              items: [
                { text: '安装指南', link: '/PMDG/guide/installation' },
                { text: '配置说明', link: '/PMDG/guide/configuration' },
                { text: '使用说明', link: '/PMDG/guide/usage' },
              ],
            },
            { text: '常见问题', link: '/PMDG/faq' },
            { text: '故障排除', link: '/PMDG/troubleshooting' },
            { text: '架构说明', link: '/PMDG/architecture' },
            { text: '贡献指南', link: '/PMDG/contributing' },
            { text: '更新日志', link: '/PMDG/changelog' },
            { text: '许可证', link: '/PMDG/license' },
          ],
        },
      ],
      '/iniBuilds/': [
        {
          text: 'iniBuilds',
          items: [
            {
              text: '指南',
              link: '/iniBuilds/guide/index',
              collapsed: false,
              items: [
                { text: '安装指南', link: '/iniBuilds/guide/installation' },
                { text: '配置说明', link: '/iniBuilds/guide/configuration' },
                { text: '使用说明', link: '/iniBuilds/guide/usage' },
              ]
            },
            { text: '常见问题', link: '/iniBuilds/faq' },
            { text: '故障排除', link: '/iniBuilds/troubleshooting' },
            { text: '架构说明', link: '/iniBuilds/architecture' },
            { text: '贡献指南', link: '/iniBuilds/contributing' },
            { text: '更新日志', link: '/iniBuilds/changelog' },
            { text: '许可证', link: '/iniBuilds/license' },
          ],
        },
      ],
      '/X-Plane/': [
        {
          text: 'X-Plane',
          items: [
            { text: '指南', link: '/X-Plane/guide/index', 
              collapsed: false, items: [
              { text: '安装指南', link: '/X-Plane/guide/installation' },
              { text: '配置说明', link: '/X-Plane/guide/configuration' },
              { text: '使用说明', link: '/X-Plane/guide/usage' },
            ] },
            { text: '常见问题', link: '/X-Plane/faq' },
            { text: '故障排除', link: '/X-Plane/troubleshooting' },
            { text: '架构说明', link: '/X-Plane/architecture' },
            { text: '贡献指南', link: '/X-Plane/contributing' },
            { text: '更新日志', link: '/X-Plane/changelog' },
            { text: '许可证', link: '/X-Plane/license' },
          ],
        },
      ],
    },

    // 搜索功能
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '返回搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nav-data' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 Nav-data Team'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/nav-data/docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 文档页面导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲标题
    outline: {
      label: '页面导航'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',

    // 深色模式切换标签
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // 构建配置
  cleanUrls: true,
  metaChunk: true,
  
  // 开发服务器配置
  vite: {
    server: {
      host: true,
      port: 5173
    }
  },

  // Mermaid configuration
  mermaid: {
    theme: 'default',
    themeVariables: {
      primaryColor: '#1e40af',
      primaryTextColor: '#fff',
      primaryBorderColor: '#3b82f6',
      lineColor: '#374151',
      secondaryColor: '#e5e7eb',
      tertiaryColor: '#f3f4f6'
    }
  }
}))
