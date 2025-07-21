import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nav-data",
  description: "Just a group of people who love aviation",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'PMDG', link: '/PMDG/guide/index' },
      { text: 'iniBuilds', link: '/iniBuilds/guide/index' },
    ],

    sidebar: [
      {
          text: 'PMDG',
          items: [
              {
                  text: '指南',
                  link: '/PMDG/guide/index',
                  items: [
                    {
                      text: '配置',
                      link: '/PMDG/guide/configuration',
                    },
                    {
                      text: '安装',
                      link: '/PMDG/guide/installation',
                    },
                    
                    {
                      text: '使用',
                      link: '/PMDG/guide/usage',
                    },
                  ],
              },
              {
                  text: '架构',
                  link: '/PMDG/architecture',
              },
              {
                  text: '更新日志',
                  link: '/PMDG/changelog',
              },
              {
                  text: '贡献',
                  link: '/PMDG/contributing',
              },
              {
                  text: '许可证',
                  link: '/PMDG/license',
              },
          ],
      },
      {
          text: 'iniBuilds',
          items: [
              {
                  text: '指南',
                  link: '/iniBuilds/guide',
                  items: [
                      {
                          text: '配置',
                          link: '/iniBuilds/guide/configuration',
                      },
                      {
                          text: '安装',
                          link: '/iniBuilds/guide/installation',
                      },
                      {
                          text: '使用',
                          link: '/iniBuilds/guide/usage',
                      },
                  ]
              },
              {
                  text: '架构',
                  link: '/iniBuilds/architecture',
              },
              {
                  text: '更新日志',
                  link: '/iniBuilds/changelog',
              },
              {
                  text: '贡献',
                  link: '/iniBuilds/contributing',
              },
              {
                  text: '许可证',
                  link: '/iniBuilds/license',
              },
          ],
      },
  ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nav-data' }
    ]
  }
})
