# Nav-data Documentation 🛩️

[![VitePress](https://img.shields.io/badge/Built%20with-VitePress-646CFF.svg)](https://vitepress.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/nav-data/docs)](https://github.com/nav-data/docs/stargazers)

> 🧭 **高质量飞行模拟导航数据** - 为 PMDG、iniBuilds 等插件提供数据支持

Nav-data 是一个由航空爱好者共同维护的数据转换项目，致力于为飞行模拟器（如 Microsoft Flight Simulator）提供高质量的导航数据支持。

## ✨ 特色功能

- 📦 **多插件支持** - 支持 PMDG、iniBuilds 等主流飞行模拟器插件
- 🛫 **详细指南** - 提供完整的配置、安装与使用指南
- 🗂️ **数据结构清晰** - 易于扩展与维护的数据结构
- 🤝 **社区协作** - 欢迎社区贡献与协作
- 🔍 **全文搜索** - 支持中文全文搜索功能
- 📱 **响应式设计** - 完美适配桌面和移动设备

## 🚀 快速开始

### 在线访问
访问我们的在线文档：[https://docs-ruddy-beta.vercel.app/](https://docs-ruddy-beta.vercel.app/)

### 本地开发

#### 环境要求
- Node.js >= 18.0.0
- npm 或 yarn

#### 安装和运行
```bash
# 克隆仓库
git clone https://github.com/nav-data/docs.git
cd docs

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

开发服务器将在 `http://localhost:5173` 启动。

## 📚 文档内容

### 🛠️ 插件支持

#### PMDG
- [安装指南](/docs/PMDG/guide/installation.md) - 详细的 PMDG 插件安装步骤
- [配置说明](/docs/PMDG/guide/configuration.md) - 配置参数和选项
- [使用说明](/docs/PMDG/guide/usage.md) - 日常使用技巧和最佳实践

#### iniBuilds
- [安装指南](/docs/iniBuilds/guide/installation.md) - iniBuilds 插件安装指南
- [配置说明](/docs/iniBuilds/guide/configuration.md) - 详细配置选项
- [使用说明](/docs/iniBuilds/guide/usage.md) - 使用技巧和故障排除

### 🏗️ 项目信息
- [架构说明](/docs/iniBuilds/architecture.md) - 项目技术架构和模块介绍
- [贡献指南](/docs/iniBuilds/contributing.md) - 如何参与项目贡献
- [更新日志](/docs/iniBuilds/changelog.md) - 版本更新历史

## 🤝 参与贡献

我们欢迎任何形式的贡献！

### 贡献方式

1. **🐛 报告问题** - 发现 Bug 或文档错误
2. **💡 功能建议** - 提出新功能或改进建议
3. **📝 文档贡献** - 改进现有文档或添加新内容
4. **💻 代码贡献** - 修复问题或实现新功能

### 开始贡献

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/amazing-feature`
3. 提交更改：`git commit -m 'Add some amazing feature'`
4. 推送分支：`git push origin feature/amazing-feature`
5. 创建 Pull Request

详细的贡献指南请查看：[如何加入我们](/docs/Introduction/join.md)

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 基于 Vite 和 Vue 3 的静态站点生成器
- **语言**: TypeScript/JavaScript + Markdown
- **部署**: GitHub Pages
- **搜索**: VitePress 内置本地搜索

## 📄 项目结构

```
docs/
├── .vitepress/           # VitePress 配置
│   └── config.mts        # 站点配置文件
├── Introduction/         # 项目介绍
│   ├── about.md         # 关于我们
│   └── join.md          # 如何加入
├── PMDG/                # PMDG 相关文档
│   ├── guide/           # 使用指南
│   ├── architecture.md  # 架构说明
│   └── ...
├── iniBuilds/           # iniBuilds 相关文档
│   ├── guide/           # 使用指南
│   ├── architecture.md  # 架构说明
│   └── ...
└── index.md             # 首页
```

## 📊 数据来源

本项目的导航数据来源包括：

- **官方数据库** - ICAO、FAA 等官方航空数据
- **开源数据集** - OpenStreetMap、OurAirports 等
- **社区贡献** - 飞行模拟器社区验证的数据
- **实时更新** - 定期同步最新的航空信息

## 🔄 更新频率

- **常规更新**: 每月一次
- **紧急修复**: 发现重要问题后 24 小时内
- **功能更新**: 根据社区需求和反馈

## 📞 联系我们

- **GitHub Issues**: [提交问题或建议](https://github.com/nav-data/docs/issues)
- **GitHub Discussions**: [社区讨论](https://github.com/nav-data/docs/discussions)
- **邮箱**: epa6643@gmail.com

## 📜 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

感谢所有为本项目做出贡献的开发者和航空爱好者！

### 主要贡献者
- [@Justin](https://github.com/6639835) - 项目发起人
- [@Yuzuriha](https://github.com/yuzuriha03) - 数据维护

### 特别感谢
- [PMDG Simulations](https://pmdg.com/) - 提供优秀的飞行模拟器插件
- [iniBuilds](https://www.inibuilds.com/) - 提供高质量的航空器模型
- [VitePress](https://vitepress.dev/) - 提供强大的文档生成工具

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给我们一个 Star！**

[![Star History Chart](https://api.star-history.com/svg?repos=nav-data/docs&type=Date)](https://star-history.com/#nav-data/docs&Date)

</div> 