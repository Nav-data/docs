# 🧭 使用指南

欢迎使用Nav-data航空导航数据转换工具！本指南将帮助您完整掌握这个专业的航空导航数据处理系统。

## 📋 快速导航

### 🚀 新手入门
- [**安装指南**](./installation.md) - 系统要求与完整安装流程
- [**配置说明**](./configuration.md) - 数据源配置与AIRAC周期设置
- [**使用说明**](./usage.md) - 数据转换与部署的完整流程

### 🆘 帮助与支持
- [**常见问题**](../faq.md) - 用户最关心的问题解答  
- [**故障排除**](../troubleshooting.md) - 问题诊断和解决方案

### 🔧 高级主题
- [**架构说明**](../architecture.md) - 系统架构与技术实现

## 🎯 项目概述

Nav-data是一个专业的航空导航数据转换工具，专门为Microsoft Flight Simulator的高级插件提供实时、准确的导航数据支持。

### 🏆 核心优势

#### ✈️ 专业级数据精度
- **AIRAC标准兼容**：严格遵循国际民航组织28天AIRAC周期
- **高精度坐标**：支持8位小数精度的地理坐标
- **磁偏角计算**：使用WMM（世界磁偏角模型）进行实时计算
- **多标准支持**：兼容ARINC 424、X-Plane和NAIP数据格式

#### 🔄 智能数据处理
- **多源数据融合**：整合NAIP、X-Plane、CIFP多种数据源
- **智能数据验证**：自动检测和修复数据完整性问题
- **增量更新支持**：高效的差异化数据更新机制
- **并行处理优化**：多进程并行处理大规模数据集

#### 🛫 广泛兼容性
- **MSFS 2020 & 2024**：完全支持两个版本的Microsoft Flight Simulator
- **多发行平台**：兼容Steam版、Microsoft Store版、Xbox版
- **顶级插件支持**：专门优化iniBuilds和PMDG高端插件

### 📊 支持的导航数据类型

| 数据类型 | 英文名称 | 标准代码 | 描述 |
|---------|---------|---------|------|
| 机场信息 | Airports | APT | 机场ICAO代码、坐标、磁偏角 |
| 跑道数据 | Runways | RWY | 跑道标识、方向、长度、表面类型 |
| VHF导航台 | VHF Navaids | VHF | VOR、DME、TACAN导航台频率 |
| NDB导航台 | NDB Navaids | NDB | 非定向信标台频率和覆盖范围 |
| 航路点 | Waypoints | FIX | 航路点坐标和区域分类 |
| 航路系统 | Airways | AWY | 高空、低空航路及连接关系 |
| 离场程序 | SIDs | SID | 标准仪表离场程序 |
| 进场程序 | STARs | STAR | 标准终端到达路线 |
| 进近程序 | Approaches | IAP | 各类仪表进近程序 |
| 着陆系统 | ILS/GLS | GS | 仪表着陆系统引导信息 |

### 🌍 覆盖区域

本工具主要覆盖以下ICAO区域：

- **中国大陆**：ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH
- **东南亚**：VM (越南), VH (香港)
- **东北亚**：RK (韩国部分)

### 🎯 支持的飞机插件

#### iniBuilds 系列
- **Airbus A350-900** - 长程宽体客机
- **Airbus A350-900ULR** - 超长程版本
- **Airbus A350-1000** - 加长版本

#### PMDG 系列
- **Boeing 737-600/700/800/900** - 窄体客机系列
- **Boeing 777-300ER** - 宽体长程客机
- **Boeing 777F** - 货运版本

## 🚦 开始使用

### 前置要求检查

在开始之前，请确保您具备：

- [ ] **Microsoft Flight Simulator 2020或2024**（任意版本）
- [ ] **Python 3.8+** 开发环境
- [ ] **有效的导航数据订阅**（Navigraph或Aerosoft NavDataPro）
- [ ] **目标飞机插件**（iniBuilds A350或PMDG 737/777）
- [ ] **管理员权限**（用于文件系统访问）

### 📖 推荐学习路径

1. **📥 环境准备** → [安装指南](./installation.md)
2. **⚙️ 数据配置** → [配置说明](./configuration.md)  
3. **🔄 执行转换** → [使用说明](./usage.md)
4. **🛠️ 深入理解** → [架构说明](../architecture.md)

## ⚡ 快速开始

如果您已经有经验，可以直接跳转到：

```bash
# 快速安装依赖
pip install -r requirements.txt

# 运行转换工具
python XP2INI_NDB_Converter.py
```

## 📞 获取帮助
- **💡 功能建议**：参考[贡献指南](../contributing.md)

---

准备好了吗？让我们从[安装指南](./installation.md)开始您的Nav-data之旅！ 🚀 