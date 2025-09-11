# Nav-data Documentation 🛩️

<div align="center">

[![VitePress](https://img.shields.io/badge/Built%20with-VitePress%201.6+-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitepress.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/nav-data/docs?style=flat-square&logo=github)](https://github.com/nav-data/docs/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/nav-data/docs?style=flat-square&logo=github)](https://github.com/nav-data/docs/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/nav-data/docs?style=flat-square&logo=github)](https://github.com/nav-data/docs/pulls)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?style=flat-square&logo=github&logoColor=white)](https://nav-data.github.io/docs)
[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D18.0.0%20%7C%20LTS%2022.x-green?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Version](https://img.shields.io/github/package-json/v/nav-data/docs?style=flat-square&logo=npm)](https://github.com/nav-data/docs)

</div>

> 🧭 **高质量飞行模拟导航数据** - 为 PMDG、iniBuilds、X-Plane、iFly、TFDI 等插件提供数据支持

Nav-data 是一个由航空爱好者共同维护的开源数据转换项目，致力于为各类飞行模拟器（Microsoft Flight Simulator、X-Plane 等）提供高质量、实时更新的导航数据支持。我们专注于确保数据的准确性、时效性和兼容性，为飞行模拟爱好者提供最优质的飞行体验。

<div align="center">

**🎯 支持的主要插件平台**

🚀 **PMDG** • 🏗️ **iniBuilds** • ✈️ **X-Plane** • 🛩️ **iFly** • 🎯 **TFDI**

[📖 阅读文档](https://nav-data.github.io/docs) • [🚀 快速开始](#-快速开始) • [🤝 参与贡献](#-参与贡献)

</div>

## 📋 目录

- [特色功能](#-特色功能)
- [快速开始](#-快速开始)
  - [在线访问](#在线访问)
  - [本地开发](#本地开发)
- [文档内容](#-文档内容)
  - [插件支持](#️-插件支持)
  - [项目信息](#️-项目信息)
- [系统要求](#-系统要求)
- [安装指南](#-安装指南)
- [使用说明](#-使用说明)
- [参与贡献](#-参与贡献)
- [技术栈](#️-技术栈)
- [项目结构](#-项目结构)
- [数据来源](#-数据来源)
- [更新频率](#-更新频率)
- [故障排除](#-故障排除)
- [联系我们](#-联系我们)
- [许可证](#-许可证)
- [致谢](#-致谢)

## ✨ 特色功能

- 📦 **多插件支持** - 支持 PMDG、iniBuilds、X-Plane、iFly、TFDI 等主流飞行模拟器插件
- 🛫 **详细指南** - 提供完整的配置、安装与使用指南，包含故障排除
- 🗂️ **数据结构清晰** - 易于扩展与维护的数据结构，支持自定义配置
- 🤝 **社区协作** - 开源项目，欢迎社区贡献与协作
- 🔍 **全文搜索** - 支持中文全文搜索功能，快速找到所需信息
- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🔄 **定期更新** - 数据源定期同步，确保信息准确性
- 🌐 **多语言支持** - 支持中英文文档
- 📊 **图表支持** - 集成 Mermaid，支持流程图和架构图
- ⚡ **快速部署** - 基于 VitePress，构建和部署速度极快

## 🚀 快速开始

### 在线访问
访问我们的在线文档：[https://docs-ruddy-beta.vercel.app/](https://docs-ruddy-beta.vercel.app/)

### 本地开发

## 💻 系统要求

### 🔧 最低要求
- **操作系统**: Windows 10/11, macOS 11.0+, Ubuntu 20.04+
- **Node.js**: >= 18.0.0 (支持最新 LTS)
- **包管理器**: npm >= 9.0.0, yarn >= 3.0.0, 或 pnpm >= 8.0.0
- **内存**: 最少 4GB RAM
- **磁盘空间**: 至少 1GB 可用空间

### ⚡ 推荐配置
- **Node.js**: 最新 LTS 版本 (22.x)
- **包管理器**: pnpm (最快) 或 npm 最新版本
- **内存**: 8GB+ RAM（更好的构建性能）
- **磁盘空间**: 2GB+ 可用空间（包含缓存）
- **网络**: 稳定的互联网连接（用于依赖下载）

### 🌐 浏览器支持
- **现代浏览器**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **移动浏览器**: iOS Safari 14+, Chrome Mobile 90+

## 📥 安装指南

### 步骤 1: 克隆仓库
```bash
git clone https://github.com/nav-data/docs.git
cd docs
```

### 步骤 2: 安装依赖

#### 🚀 推荐方式 (pnpm)
```bash
# 使用 pnpm（最快、最高效）
pnpm install
```

#### 📦 其他包管理器
```bash
# 使用 npm
npm install

# 使用 yarn
yarn install
```

> 💡 **提示**: 推荐使用 [pnpm](https://pnpm.io/) 获得更快的安装速度和更好的磁盘空间利用率

### 步骤 3: 启动开发服务器

#### 🔥 开发模式
```bash
# 启动开发服务器（支持热重载）
pnpm dev          # 推荐使用 pnpm
# 或
npm run dev
# 或
yarn dev

# 开发服务器将在 http://localhost:5173 启动
```

#### 🌐 自定义端口
```bash
# 使用自定义端口启动
pnpm dev --port 3000
# 或
npm run dev -- --port 3000
```

### 步骤 4: 构建和预览

#### 📦 生产构建
```bash
# 构建生产版本
pnpm build        # 推荐使用 pnpm
# 或
npm run build
# 或  
yarn build
```

#### 👀 预览构建结果
```bash
# 预览构建结果
pnpm preview      # 端口 4173
# 或
npm run preview
# 或
yarn preview

# 使用自定义端口预览
pnpm preview --port 8080
```

### 🔧 常见问题解决

<details>
<summary>📋 点击查看常见安装问题</summary>

#### ⚙️ Node.js 版本问题
```bash
# 检查 Node.js 版本
node --version
npm --version

# 推荐使用 Node 版本管理器
# fnm (快速替代 nvm)
curl -fsSL https://fnm.vercel.app/install | bash
fnm install --lts
fnm use lts-latest

# 或使用传统 nvm (Linux/macOS)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash
nvm install --lts
nvm use --lts

# Windows 用户推荐使用 nvm-windows
# 从 https://github.com/coreybutler/nvm-windows/releases 下载安装
```

#### 📦 依赖安装失败
```bash
# 方案 1: 清理并重新安装 (pnpm)
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install

# 方案 2: 清理并重新安装 (npm)
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# 方案 3: 使用不同的镜像源
npm config set registry https://registry.npmmirror.com
# 或
pnpm config set registry https://registry.npmmirror.com
```

#### 🔌 端口占用问题
```bash
# 查看端口使用情况
# macOS/Linux
lsof -i :5173

# Windows
netstat -ano | findstr :5173

# 终止占用端口的进程或使用不同端口
pnpm dev --port 3000
# 或
npm run dev -- --port 3000
```

#### 🔐 权限问题 (macOS/Linux)
```bash
# 方案 1: 修复 npm 权限（推荐）
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.profile
source ~/.profile

# 方案 2: 使用 pnpm（避免权限问题）
curl -fsSL https://get.pnpm.io/install.sh | sh -

# 方案 3: 临时解决方案
sudo chown -R $(whoami) ~/.npm
```

#### 🐛 构建失败问题
```bash
# 清理构建缓存
rm -rf docs/.vitepress/dist docs/.vitepress/cache

# 检查 Node.js 内存限制
node --max-old-space-size=4096 ./node_modules/.bin/vitepress build docs

# 检查文件权限
chmod -R 755 docs/
```

</details>

## 📖 使用说明

### 开发模式
开发服务器支持热重载，修改文档后会自动刷新页面：
- 📝 编辑 Markdown 文件即可实时预览
- 🎨 修改样式和配置会自动重新构建
- 🔍 内置搜索功能支持中文检索

### 生产构建
生产构建会生成优化后的静态文件：
- 📦 代码分割和压缩
- 🖼️ 图片优化
- 🚀 Service Worker 支持
- 📱 PWA 功能

## 📚 文档内容

### 🛠️ 插件支持

#### 🚀 PMDG
- [📥 安装指南](/docs/PMDG/guide/installation.md) - 详细的 PMDG 插件安装步骤
- [⚙️ 配置说明](/docs/PMDG/guide/configuration.md) - 配置参数和选项
- [📖 使用说明](/docs/PMDG/guide/usage.md) - 日常使用技巧和最佳实践
- [❓ 常见问题](/docs/PMDG/faq.md) - 问题解答和故障排除

#### 🏗️ iniBuilds
- [📥 安装指南](/docs/iniBuilds/guide/installation.md) - iniBuilds 插件安装指南
- [⚙️ 配置说明](/docs/iniBuilds/guide/configuration.md) - 详细配置选项
- [📖 使用说明](/docs/iniBuilds/guide/usage.md) - 使用技巧和故障排除
- [❓ 常见问题](/docs/iniBuilds/faq.md) - 问题解答和故障排除

#### ✈️ X-Plane
- [📥 安装指南](/docs/X-Plane/guide/installation.md) - X-Plane 插件安装指南
- [⚙️ 配置说明](/docs/X-Plane/guide/configuration.md) - 详细配置选项和参数
- [📖 使用说明](/docs/X-Plane/guide/usage.md) - 使用技巧和故障排除
- [❓ 常见问题](/docs/X-Plane/faq.md) - 问题解答和故障排除

#### 🛩️ iFly
- [📥 安装指南](/docs/iFly/guide/installation.md) - iFly 插件安装指南
- [⚙️ 配置说明](/docs/iFly/guide/configuration.md) - 详细配置选项和参数
- [📖 使用说明](/docs/iFly/guide/usage.md) - 使用技巧和最佳实践
- [❓ 常见问题](/docs/iFly/faq.md) - 问题解答和故障排除

#### 🎯 TFDI
- [📥 安装指南](/docs/TFDI/guide/installation.md) - TFDI 插件安装指南
- [⚙️ 配置说明](/docs/TFDI/guide/configuration.md) - 详细配置选项和参数
- [📖 使用说明](/docs/TFDI/guide/usage.md) - 使用技巧和最佳实践
- [❓ 常见问题](/docs/TFDI/faq.md) - 问题解答和故障排除

### 🏗️ 项目信息
- [架构说明](/docs/iniBuilds/architecture.md) - 项目技术架构和模块介绍
- [贡献指南](/docs/iniBuilds/contributing.md) - 如何参与项目贡献
- [更新日志](/docs/iniBuilds/changelog.md) - 版本更新历史

## 🤝 参与贡献

我们欢迎任何形式的贡献！

### 🔄 贡献类型

| 类型 | 说明 | 示例 |
|------|------|------|
| 🐛 **Bug 修复** | 修复文档错误或功能问题 | 修复链接错误、更正信息 |
| 💡 **功能建议** | 提出新功能或改进建议 | 新的插件支持、界面优化 |
| 📝 **文档改进** | 改进现有文档或添加新内容 | 完善安装指南、添加示例 |
| 💻 **代码贡献** | 修复问题或实现新功能 | 新功能开发、性能优化 |
| 🌐 **翻译** | 提供多语言支持 | 英文翻译、其他语言支持 |

### 📋 贡献流程

#### 1. 准备工作
```bash
# Fork 仓库并克隆到本地
git clone https://github.com/Nav-data/docs.git
cd docs

# 添加上游仓库
git remote add upstream https://github.com/nav-data/docs.git

# 创建开发分支
git checkout -b feature/your-feature-name
```

#### 2. 开发和测试
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 进行您的修改...

# 测试构建
npm run build
```

#### 3. 提交代码
```bash
# 添加修改
git add .

# 提交修改（请使用有意义的提交信息）
git commit -m "feat: add X-Plane installation guide"

# 推送到您的 Fork
git push origin feature/your-feature-name
```

#### 4. 创建 Pull Request
- 访问 GitHub 仓库页面
- 点击 "Compare & pull request"
- 填写详细的 PR 描述
- 等待代码审查

### 📝 贡献指南

#### 文档规范
- **语言**: 主要使用中文，重要术语可标注英文
- **格式**: 遵循 Markdown 规范，使用一致的标题层级
- **图片**: 优化图片大小，使用 WebP 格式
- **链接**: 使用相对路径，确保链接有效

#### 代码规范
- **提交信息**: 使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范
- **分支命名**: `feature/功能名称` 或 `fix/问题描述`
- **测试**: 确保所有更改都经过测试

#### PR 要求
- 📋 清晰的标题和描述
- 🔗 相关 Issue 链接（如果有）
- ✅ 通过所有检查
- 📸 必要时提供截图

详细的贡献指南请查看：[如何加入我们](/docs/Introduction/join.md)

## 📚 API 文档和使用指南

### 🔗 快速链接

| 插件 | 安装指南 | 配置文档 | 使用教程 | 常见问题 |
|------|----------|----------|----------|----------|
| **🚀 PMDG** | [📥 安装](/docs/PMDG/guide/installation.md) | [⚙️ 配置](/docs/PMDG/guide/configuration.md) | [📖 使用](/docs/PMDG/guide/usage.md) | [❓ FAQ](/docs/PMDG/faq.md) |
| **🏗️ iniBuilds** | [📥 安装](/docs/iniBuilds/guide/installation.md) | [⚙️ 配置](/docs/iniBuilds/guide/configuration.md) | [📖 使用](/docs/iniBuilds/guide/usage.md) | [❓ FAQ](/docs/iniBuilds/faq.md) |
| **✈️ X-Plane** | [📥 安装](/docs/X-Plane/guide/installation.md) | [⚙️ 配置](/docs/X-Plane/guide/configuration.md) | [📖 使用](/docs/X-Plane/guide/usage.md) | [❓ FAQ](/docs/X-Plane/faq.md) |
| **🛩️ iFly** | [📥 安装](/docs/iFly/guide/installation.md) | [⚙️ 配置](/docs/iFly/guide/configuration.md) | [📖 使用](/docs/iFly/guide/usage.md) | [❓ FAQ](/docs/iFly/faq.md) |
| **🎯 TFDI** | [📥 安装](/docs/TFDI/guide/installation.md) | [⚙️ 配置](/docs/TFDI/guide/configuration.md) | [📖 使用](/docs/TFDI/guide/usage.md) | [❓ FAQ](/docs/TFDI/faq.md) |

### 🛠️ 使用示例

#### 基础配置示例
```json
{
  "navigation": {
    "provider": "nav-data",
    "version": "latest",
    "update_interval": "weekly"
  },
  "plugins": {
    "pmdg": {
      "enabled": true,
      "auto_update": true
    },
    "inibuilds": {
      "enabled": true,
      "custom_config": "/path/to/config"
    },
    "xplane": {
      "enabled": false
    },
    "ifly": {
      "enabled": true,
      "compatibility_mode": "enhanced"
    },
    "tfdi": {
      "enabled": true,
      "advanced_features": true
    }
  }
}
```

#### 高级配置选项
```yaml
# 导航数据配置
nav_data:
  source: "official"
  format: "latest"
  regions:
    - "ASIA"
    - "EUROPE"
    - "AMERICA"
  
# 插件特定配置
plugins:
  pmdg:
    aircraft_support:
      - "737"
      - "777"
      - "747"
    features:
      waypoints: true
      airways: true
      procedures: true
  
  inibuilds:
    compatibility_mode: "enhanced"
    custom_procedures: true
  
  ifly:
    aircraft_support:
      - "737"
      - "787"
    features:
      navigation: true
      performance: true
  
  tfdi:
    precision_mode: true
    real_time_updates: true
    custom_liveries: true
```

### 📊 数据格式

Nav-data 支持多种数据格式：

| 格式 | 描述 | 用途 |
|------|------|------|
| **JSON** | 结构化数据格式 | API 接口、配置文件 |
| **XML** | 标准航空数据格式 | AIRAC 数据交换 |
| **CSV** | 表格数据格式 | 数据分析、导入导出 |
| **Binary** | 二进制格式 | 高性能数据加载 |

## 🛠️ 技术栈

- **📦 框架**: [VitePress](https://vitepress.dev/) ^1.6.3 - 基于 Vite 和 Vue 3 的静态站点生成器
- **💻 语言**: TypeScript/JavaScript + Markdown
- **📊 图表**: [Mermaid](https://mermaid.js.org/) ^11.9.0 - 支持流程图和图表渲染
- **🚀 部署**: GitHub Pages
- **🔍 搜索**: VitePress 内置本地搜索
- **🎨 样式**: CSS3 + 响应式设计
- **⚡ 构建工具**: Vite - 极速构建和热重载
- **🌐 PWA**: 渐进式 Web 应用支持

## 📄 项目结构

```
Nav-data/docs/
├── 📁 docs/                    # 文档根目录
│   ├── 📁 Introduction/        # 项目介绍
│   │   ├── 📄 about.md        # 关于我们
│   │   └── 📄 join.md         # 如何加入
│   ├── 🚀 PMDG/               # PMDG 相关文档
│   │   ├── 📁 guide/          # 使用指南
│   │   │   ├── 📄 installation.md  # 安装指南
│   │   │   ├── 📄 configuration.md # 配置说明
│   │   │   └── 📄 usage.md         # 使用说明
│   │   ├── 📄 architecture.md      # 架构说明
│   │   ├── 📄 changelog.md         # 更新日志
│   │   ├── 📄 contributing.md      # 贡献指南
│   │   ├── 📄 faq.md              # 常见问题
│   │   ├── 📄 license.md          # 许可证
│   │   └── 📄 troubleshooting.md  # 故障排除
│   ├── 🏗️ iniBuilds/           # iniBuilds 相关文档
│   │   ├── 📁 guide/          # 使用指南
│   │   ├── 📄 architecture.md  # 架构说明
│   │   └── 📄 ...             # 其他文档
│   ├── ✈️ X-Plane/             # X-Plane 相关文档
│   │   ├── 📁 guide/          # 使用指南
│   │   ├── 📄 architecture.md  # 架构说明
│   │   └── 📄 ...             # 其他文档
│   ├── 🛩️ iFly/                # iFly 相关文档
│   │   ├── 📁 guide/          # 使用指南
│   │   ├── 📄 architecture.md  # 架构说明
│   │   ├── 📄 changelog.md     # 更新日志
│   │   ├── 📄 faq.md          # 常见问题
│   │   └── 📄 ...             # 其他文档
│   ├── 🎯 TFDI/                # TFDI 相关文档
│   │   ├── 📁 guide/          # 使用指南
│   │   ├── 📄 architecture.md  # 架构说明
│   │   ├── 📄 changelog.md     # 更新日志
│   │   ├── 📄 faq.md          # 常见问题
│   │   └── 📄 ...             # 其他文档
│   ├── 📁 public/              # 静态资源
│   │   ├── 🌐 favicon.svg      # 网站图标
│   │   ├── 📱 manifest.json    # PWA 配置
│   │   └── 🖼️ og-image.png     # 社交媒体预览图
│   └── 📄 index.md            # 首页
├── 📦 package.json            # 项目配置和依赖
├── 🔒 package-lock.json       # 依赖锁定文件
└── 📖 README.md              # 项目说明（本文件）
```

## 📊 数据来源

本项目的导航数据来源包括：

- **官方数据库** - ICAO、FAA 等官方航空数据
- **开源数据集** - OpenStreetMap、OurAirports 等
- **社区贡献** - 飞行模拟器社区验证的数据
- **实时更新** - 定期同步最新的航空信息

## 🔄 更新频率

| 更新类型 | 频率 | 说明 |
|----------|------|------|
| 🗓️ **常规更新** | 每月一次 | 定期同步最新航空数据 |
| 🚨 **紧急修复** | 24小时内 | 重要问题和安全修复 |
| 🚀 **功能更新** | 按需发布 | 根据社区需求和反馈 |
| 📊 **数据同步** | 每周一次 | 同步官方数据库更新 |

## 🔧 故障排除

### 常见问题

<details>
<summary>🚫 页面无法加载</summary>

**问题**: 访问文档网站时页面显示错误

**解决方案**:
1. 检查网络连接
2. 尝试刷新页面 (Ctrl+F5)
3. 清除浏览器缓存
4. 尝试使用其他浏览器

</details>

<details>
<summary>🔍 搜索功能不工作</summary>

**问题**: 搜索框无法正常工作或搜索结果为空

**解决方案**:
1. 确保 JavaScript 已启用
2. 尝试使用不同的关键词
3. 检查浏览器控制台错误信息
4. 刷新页面重新加载搜索索引

</details>

<details>
<summary>📱 移动端显示异常</summary>

**问题**: 在移动设备上页面显示不正确

**解决方案**:
1. 确保使用最新版本的移动浏览器
2. 检查网络连接稳定性
3. 尝试横屏查看
4. 清除移动浏览器缓存

</details>

<details>
<summary>⬇️ 文件下载失败</summary>

**问题**: 无法下载导航数据文件

**解决方案**:
1. 检查文件链接是否有效
2. 尝试右键"另存为"
3. 使用下载管理器
4. 联系维护团队

</details>

### 获取帮助

如果以上方法都无法解决问题：

1. 📧 **邮件联系**: epa6643@gmail.com
2. 🐛 **提交 Issue**: [GitHub Issues](https://github.com/nav-data/docs/issues)
3. 💬 **社区讨论**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
4. 📖 **查看文档**: [故障排除页面](/docs/troubleshooting.md)

## 📞 联系我们

- **GitHub Issues**: [提交问题或建议](https://github.com/nav-data/docs/issues)
- **GitHub Discussions**: [社区讨论](https://github.com/nav-data/docs/discussions)
- **邮箱**: epa6643@gmail.com

## 📜 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 🙏 致谢

感谢所有为本项目做出贡献的开发者和航空爱好者！

### 🏆 主要贡献者

<table>
<tr>
<td align="center">
<a href="https://github.com/6639835">
<img src="https://github.com/6639835.png" width="80" style="border-radius: 50%"/><br/>
<b>Justin</b><br/>
<sub>项目发起人 & 核心开发</sub>
</a>
</td>
<td align="center">
<a href="https://github.com/yuzuriha03">
<img src="https://github.com/yuzuriha03.png" width="80" style="border-radius: 50%"/><br/>
<b>Yuzuriha</b><br/>
<sub>数据维护 & 质量保证</sub>
</a>
</td>
</tr>
</table>

### 🤝 合作伙伴

<div align="center">

| 合作伙伴 | 贡献 | 状态 |
|----------|------|------|
| 🚀 [PMDG Simulations](https://pmdg.com/) | 优秀的飞行模拟器插件 | ✅ 官方支持 |
| 🏗️ [iniBuilds](https://www.inibuilds.com/) | 高质量的航空器模型 | ✅ 官方支持 |
| 🛩️ [iFly](https://www.ifly.com/) | 专业级航空器模拟 | ✅ 合作伙伴 |
| 🎯 [TFDI Design](https://www.tfdidesign.com/) | 精细化航空器开发 | ✅ 合作伙伴 |
| ⚡ [VitePress](https://vitepress.dev/) | 强大的文档生成工具 | ✅ 技术支持 |
| 🌐 [GitHub](https://github.com/) | 代码托管和协作平台 | ✅ 基础设施 |

</div>

### 📈 项目统计

<div align="center">

![Lines of Code](https://img.shields.io/tokei/lines/github/nav-data/docs?style=for-the-badge)
![Files](https://img.shields.io/github/directory-file-count/nav-data/docs?style=for-the-badge)
![Repo Size](https://img.shields.io/github/repo-size/nav-data/docs?style=for-the-badge)

</div>

---

<div align="center">

### 🌟 支持项目

**如果这个项目对你有帮助，请给我们一个 Star！**

[![Star History Chart](https://api.star-history.com/svg?repos=nav-data/docs&type=Date)](https://star-history.com/#nav-data/docs&Date)

<br/>

**关注我们的社交媒体获取最新动态**

[![GitHub followers](https://img.shields.io/github/followers/nav-data?style=social&logo=github)](https://github.com/nav-data)
[![GitHub Organization](https://img.shields.io/badge/GitHub-nav--data-181717?style=social&logo=github)](https://github.com/nav-data)
[![Email Contact](https://img.shields.io/badge/Email-epa6643%40gmail.com-D14836?style=social&logo=gmail)](mailto:epa6643@gmail.com)

<br/>

**🎯 项目路线图**

查看我们的 [项目路线图](https://github.com/nav-data/docs/projects) 了解未来计划

<br/>

**💖 支持项目**

如果您觉得这个项目对您有帮助，可以通过以下方式支持我们：

[![⭐ Star on GitHub](https://img.shields.io/badge/⭐_Star_on-GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nav-data/docs)
[![🐛 Report Issues](https://img.shields.io/badge/🐛_Report-Issues-red?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nav-data/docs/issues)
[![💬 Discussions](https://img.shields.io/badge/💬_Join-Discussions-blue?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nav-data/docs/discussions)
[![📧 Email Us](https://img.shields.io/badge/📧_Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:epa6643@gmail.com)

<br/>

---

**📞 快速联系**

- 🐛 **GitHub Issues**: [提交问题或建议](https://github.com/nav-data/docs/issues)
- 💬 **GitHub Discussions**: [社区讨论](https://github.com/nav-data/docs/discussions)  
- 📧 **邮箱联系**: [epa6643@gmail.com](mailto:epa6643@gmail.com)
- 📚 **在线文档**: [https://nav-data.github.io/docs](https://nav-data.github.io/docs)

---

<sub>Built with ❤️ by the Nav-data team • © 2025 Nav-data Project • Powered by VitePress</sub>

</div> 