# 欢迎来到 Nav-data 文档 🚀

Nav-data 是一个由航空爱好者共同维护的数据转换项目，致力于为飞行模拟器（如 Microsoft Flight Simulator）提供高质量的导航数据支持。无论你是开发者、飞行员还是爱好者，这里都能找到你需要的资料和指南。

## 🔄 数据转换流程

```mermaid
graph TD
    A["📊 数据源<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>转换工具"]
    B --> C["🛩️ PMDG<br/>SQLite数据库"]
    B --> D["✈️ iniBuilds<br/>A350数据文件"]
    B --> E["🛫 X-Plane<br/>DAT格式文件"]
    
    F["🗂️ 原始数据"] --> G["📥 数据解析"]
    G --> H["🔧 格式转换"]
    H --> I["✅ 数据验证"]
    I --> J["📤 输出文件"]
    
    style A fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style C fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    style D fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    style F fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style G fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style H fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style I fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style J fill:#f1f8e9,stroke:#689f38,stroke-width:2px
```

---

## ✨ 项目特色

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>多平台支持</h3>
    <p>支持 PMDG、iniBuilds、X-Plane 等主流飞行模拟器平台</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>详细指南</h3>
    <p>提供完整的配置、安装与使用指南，新手也能轻松上手</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>结构清晰</h3>
    <p>数据结构清晰，易于扩展与维护，支持自定义配置</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>开源协作</h3>
    <p>欢迎社区贡献与协作，共同构建更好的导航数据工具</p>
  </div>
</div>

<style>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(30, 64, 175, 0.15);
  border-color: rgba(30, 64, 175, 0.3);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  color: var(--vp-c-brand-1);
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.feature-card p {
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>

---

## 🚀 快速开始
1. 选择你的插件： [PMDG 指南](/PMDG/guide/index) | [iniBuilds 指南](/iniBuilds/guide/index)
2. 按照指南进行配置与安装
3. 享受更真实的飞行体验！

---

## 🧭 快速导航

### 📊 平台支持对比

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>特性</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>支持飞机</strong></td>
        <td>737系列, 777系列</td>
        <td>A350</td>
        <td>所有X-Plane飞机</td>
      </tr>
      <tr>
        <td><strong>数据格式</strong></td>
        <td>SQLite数据库</td>
        <td>专用数据文件</td>
        <td>DAT格式文件</td>
      </tr>
      <tr>
        <td><strong>安装难度</strong></td>
        <td><StatusBadge type="warning" text="中等" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="简单" icon="✅" /></td>
        <td><StatusBadge type="error" text="复杂" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>数据覆盖</strong></td>
        <td><StatusBadge type="success" text="完整" icon="✅" /></td>
        <td><StatusBadge type="success" text="完整" icon="✅" /></td>
        <td><StatusBadge type="warning" text="部分" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>更新频率</strong></td>
        <td>AIRAC周期</td>
        <td>AIRAC周期</td>
        <td>按需更新</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 使用指南
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>PMDG 指南</h3>
      <p>PMDG 飞机导航数据转换完整教程</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>iniBuilds 指南</h3>
      <p>iniBuilds A350 导航数据转换指南</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>X-Plane 指南</h3>
      <p>X-Plane 导航数据处理完整流程</p>
    </div>
  </a>
</div>

### 🆘 获取帮助
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ PMDG 支持</h4>
    <ul>
      <li><a href="/PMDG/faq">常见问题解答</a></li>
      <li><a href="/PMDG/troubleshooting">故障排除指南</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ iniBuilds 支持</h4>
    <ul>
      <li><a href="/iniBuilds/faq">常见问题解答</a></li>
      <li><a href="/iniBuilds/troubleshooting">故障排除指南</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 X-Plane 支持</h4>
    <ul>
      <li><a href="/X-Plane/faq">常见问题解答</a></li>
      <li><a href="/X-Plane/troubleshooting">故障排除指南</a></li>
    </ul>
  </div>
</div>

### 🔧 技术文档
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>项目架构说明</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>贡献指南</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>更新日志</span>
  </a>
</div>

<style>
.comparison-table {
  margin: 2rem 0;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comparison-table th {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--aviation-sky));
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.comparison-table tr:nth-child(even) {
  background: rgba(30, 64, 175, 0.03);
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
}

.difficulty.easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty.hard {
  background: #fee2e2;
  color: #991b1b;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status.complete {
  background: #dcfce7;
  color: #166534;
}

.status.partial {
  background: #fef3c7;
  color: #92400e;
}

.guide-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.guide-link {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  border: 1px solid rgba(30, 64, 175, 0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.guide-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(30, 64, 175, 0.15);
  border-color: rgba(30, 64, 175, 0.3);
}

.guide-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.guide-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
}

.guide-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.help-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.help-category h4 {
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.help-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-category li {
  margin-bottom: 0.5rem;
}

.help-category a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.help-category a:hover {
  color: var(--vp-c-brand-1);
}

.tech-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.tech-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.tech-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tech-icon {
  font-size: 1.1rem;
}
</style>

---

## 🌍 加入我们 & 反馈建议
- GitHub: [nav-data](https://github.com/nav-data)
- 有建议或问题？欢迎通过 [Issue](https://github.com/nav-data/nav-data/issues) 或邮件联系我们！

