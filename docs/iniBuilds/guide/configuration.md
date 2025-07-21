# iniBuilds 配置指南

本指南详细介绍了 iniBuilds 导航数据的配置选项和自定义设置，帮助你优化飞行体验。

---

## 📋 配置文件概述

iniBuilds 导航数据包含多个配置文件，用于控制数据的加载、显示和行为：

```
Navdata\
├── config\
│   ├── global.cfg          # 全局配置
│   ├── display.cfg         # 显示设置
│   ├── performance.cfg     # 性能选项
│   └── aircraft_specific\  # 飞机特定配置
│       ├── a300.cfg
│       ├── a310.cfg
│       └── beluga.cfg
├── data\                   # 数据文件
└── cache\                  # 缓存文件
```

---

## ⚙️ 全局配置

### global.cfg

全局配置文件控制整个导航数据系统的基本行为：

```ini
[General]
# 数据版本
NavDataVersion=2024.03
# 更新检查
AutoUpdateCheck=true
# 语言设置
Language=zh-CN
# 调试模式
DebugMode=false

[DataSources]
# 启用的数据源
Airports=true
Airways=true
Fixes=true
Navaids=true
Runways=true
Procedures=true

[Compatibility]
# MSFS 版本兼容性
MinMSFSVersion=1.36.0
# iniBuilds 插件版本
MinIniBuildsVersion=1.2.0
```

#### 主要配置项说明

| 配置项 | 描述 | 默认值 | 选项 |
|--------|------|--------|------|
| `NavDataVersion` | 导航数据版本标识 | `2024.03` | 自动设置 |
| `AutoUpdateCheck` | 自动检查更新 | `true` | `true`/`false` |
| `Language` | 界面语言 | `zh-CN` | `zh-CN`/`en-US`/`fr-FR` |
| `DebugMode` | 调试模式 | `false` | `true`/`false` |

---

## 🎨 显示配置

### display.cfg

控制导航信息在飞机系统中的显示方式：

```ini
[Display]
# 显示精度
CoordinatePrecision=3
# 距离单位
DistanceUnit=NM
# 高度单位
AltitudeUnit=FT
# 速度单位
SpeedUnit=KT

[Colors]
# 航路颜色
AirwayColor=0x00FF00
# 航点颜色
WaypointColor=0x0000FF
# 机场颜色
AirportColor=0xFF0000

[FontSettings]
# 字体大小
FontSize=12
# 字体样式
FontWeight=Normal
# 字体族
FontFamily=Arial
```

#### 显示选项详解

##### 精度设置
- `CoordinatePrecision`: 坐标显示小数位数 (1-6)
- `DistancePrecision`: 距离显示小数位数 (0-3)

##### 单位设置
- `DistanceUnit`: `NM` (海里) / `KM` (公里) / `MI` (英里)
- `AltitudeUnit`: `FT` (英尺) / `M` (米)
- `SpeedUnit`: `KT` (节) / `KMH` (公里/小时) / `MPH` (英里/小时)

---

## 🚀 性能配置

### performance.cfg

优化数据加载和处理性能：

```ini
[Loading]
# 预加载半径 (海里)
PreloadRadius=100
# 最大缓存大小 (MB)
MaxCacheSize=512
# 并行加载线程数
LoadingThreads=4

[Memory]
# 内存使用限制 (MB)
MemoryLimit=1024
# 垃圾回收间隔 (秒)
GCInterval=60

[Network]
# 网络超时 (秒)
NetworkTimeout=30
# 重试次数
RetryCount=3
```

#### 性能调优建议

##### 根据系统配置调整

**高性能系统**:
```ini
PreloadRadius=200
MaxCacheSize=1024
LoadingThreads=8
MemoryLimit=2048
```

**中等性能系统**:
```ini
PreloadRadius=100
MaxCacheSize=512
LoadingThreads=4
MemoryLimit=1024
```

**低性能系统**:
```ini
PreloadRadius=50
MaxCacheSize=256
LoadingThreads=2
MemoryLimit=512
```

---

## ✈️ 飞机特定配置

### A300 配置 (a300.cfg)

```ini
[Aircraft]
# 飞机类型
AircraftType=A300-600R
# ICAO 代码
ICAOCode=A306

[Navigation]
# FMS 数据库版本
FMSDatabase=AIRAC2403
# 导航精度
NavigationAccuracy=HIGH
# SID/STAR 支持
SIDSTARSupport=true

[Systems]
# TCAS 集成
TCASIntegration=true
# 气象雷达集成
WeatherRadarIntegration=true
```

### A310 配置 (a310.cfg)

```ini
[Aircraft]
AircraftType=A310-300
ICAOCode=A310

[Navigation]
FMSDatabase=AIRAC2403
NavigationAccuracy=HIGH
SIDSTARSupport=true

[Cockpit]
# MCDU 显示设置
MCDUDisplayMode=DETAILED
# 导航显示格式
NDDisplayFormat=ROSE_NAV
```

---

## 🔧 高级配置

### 自定义数据过滤

创建 `filters.cfg` 文件来自定义数据过滤规则：

```ini
[AirportFilter]
# 最小跑道长度 (米)
MinRunwayLength=1000
# 包含的机场类型
AirportTypes=LARGE,MEDIUM,SMALL
# 排除军用机场
ExcludeMilitary=false

[NavaidFilter]
# VOR 最大范围 (海里)
VORMaxRange=200
# NDB 最大范围 (海里)
NDBMaxRange=50
# 包含 DME
IncludeDME=true
```

### 区域设置

为特定地理区域配置不同的设置：

```ini
[Regions]
# 欧洲设置
Europe.Frequency=8.33KHz
Europe.Procedures=ICAO_PANS_OPS

# 北美设置
NorthAmerica.Frequency=25KHz
NorthAmerica.Procedures=FAA_TERPS

# 亚太设置
AsiaPacific.Frequency=25KHz
AsiaPacific.Procedures=ICAO_PANS_OPS
```

---

## 🛠️ 配置工具

### 配置验证器

使用内置的配置验证工具检查配置文件：

```bash
# 验证所有配置文件
.\tools\ConfigValidator.exe --all

# 验证特定配置文件
.\tools\ConfigValidator.exe --file=global.cfg

# 生成配置报告
.\tools\ConfigValidator.exe --report
```

### 配置备份与恢复

```bash
# 备份当前配置
.\tools\ConfigBackup.exe --backup --name=my_config

# 恢复配置
.\tools\ConfigBackup.exe --restore --name=my_config

# 列出所有备份
.\tools\ConfigBackup.exe --list
```

---

## 📊 配置模板

### 现实主义配置

适合追求高度现实主义的用户：

```ini
[global.cfg]
DebugMode=false
Language=zh-CN

[display.cfg]
CoordinatePrecision=4
DistanceUnit=NM
AltitudeUnit=FT

[performance.cfg]
PreloadRadius=150
MaxCacheSize=1024
LoadingThreads=6
```

### 性能优先配置

适合配置较低的系统：

```ini
[global.cfg]
DebugMode=false

[display.cfg]
CoordinatePrecision=2
FontSize=10

[performance.cfg]
PreloadRadius=50
MaxCacheSize=256
LoadingThreads=2
MemoryLimit=512
```

---

## 🚨 故障排除

### 常见配置问题

#### 问题 1：配置文件损坏
**症状**：导航数据无法加载
**解决方案**：
1. 删除损坏的配置文件
2. 重新生成默认配置
3. 从备份恢复配置

#### 问题 2：性能问题
**症状**：数据加载缓慢或卡顿
**解决方案**：
1. 降低 `PreloadRadius` 值
2. 减少 `LoadingThreads` 数量
3. 清理缓存文件

#### 问题 3：显示异常
**症状**：导航信息显示错误
**解决方案**：
1. 检查 `display.cfg` 设置
2. 重置字体设置
3. 验证颜色配置

---

## 📞 获取帮助

### 配置支持

如果在配置过程中遇到问题：

1. **配置文档**: 查看详细的配置参数说明
2. **社区论坛**: 在我们的 [论坛](https://nav-data.org/forum) 寻求帮助
3. **技术支持**: 发送邮件至 config-support@nav-data.org
4. **GitHub Issues**: 报告配置相关的 Bug

### 配置示例

更多配置示例和模板可以在以下位置找到：

- [官方配置库](https://github.com/nav-data/configs)
- [社区配置分享](https://nav-data.org/configs)
- [配置向导工具](https://nav-data.org/config-wizard)

---

> 💡 **提示**: 修改配置后，记得重启 MSFS 以使更改生效。建议在修改前备份原始配置文件！ 