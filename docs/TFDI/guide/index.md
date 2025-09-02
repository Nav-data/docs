# 🚁 TFDI 导航数据转换器用户指南

TFDI 导航数据转换器是一个专业的航空导航数据转换工具，专门设计用于将 Fenix A320 导航数据库转换为 TFDI MD-11 兼容的 JSON 格式。该工具具有现代化的 CLI 界面和高效的数据处理能力。

## 📖 快速导览

### 🎯 核心功能
- **🎨 Rich CLI 界面** - 现代化彩色终端界面，实时进度显示和状态反馈
- **🔄 完整数据转换** - 支持所有 Fenix 数据库表的全面转换
- **📊 智能数据处理** - 坐标标准化、列名规范化和数据完整性验证
- **🔍 FAF 点检测** - 智能识别 Final Approach Fix 点，优化进近程序
- **📦 JSON 输出** - 生成 TFDI 兼容的标准 JSON 格式文件
- **🗜️ 自动压缩** - 创建便于分发的 7z 压缩包

### ✈️ 支持的飞机型号
- **TFDI MD-11** - Microsoft Flight Simulator 中的高仿真麦道 MD-11
- **数据来源** - Fenix A320 导航数据库 (nd.db3)
- **格式支持** - SQLite 数据库转 JSON 格式

### 📊 数据类型覆盖
- **🏢 机场数据** - 机场信息、跑道数据、通信频率
- **🧭 导航设备** - VOR/DME、NDB、ILS 设备数据
- **🛣️ 航路网络** - 航路定义、航路段、航路点坐标
- **🎯 终端程序** - SID、STAR、进近程序、离场程序
- **🔗 查找表** - 各类数据的索引和关联表

## 🚀 快速开始

### 1️⃣ 系统要求验证
```bash
# 检查 Python 版本 (需要 3.8+)
python --version

# 验证可用内存 (推荐 4GB+)
python -c "import psutil; print(f'可用内存: {psutil.virtual_memory().available//1024**3} GB')"

# 检查磁盘空间 (需要至少 1GB)
python -c "import shutil; print(f'可用空间: {shutil.disk_usage(\".\")[2]//1024**3} GB')"
```

### 2️⃣ 准备必要文件
- ✅ **Fenix 导航数据库** (`nd.db3`)
  ```
  通常位置: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **TFDI MD-11** 已安装在 MSFS 中
- ✅ **转换器源码** 已下载到本地

### 3️⃣ 一键启动转换
```bash
# 1. 安装依赖
pip install rich pandas py7zr

# 2. 运行转换器
python Fenix2TFDINavDataConverter.py

# 3. 按界面提示操作
# → 输入 Fenix 数据库路径
# → 设置终端程序起始 ID
# → 等待转换完成
```

## 📚 文档导航

### 🚀 基础使用
1. **[安装指南](installation.md)** - 详细的环境配置和依赖安装
   - Python 环境设置
   - 依赖包安装
   - 系统兼容性检查
   - 常见安装问题解决

2. **[配置说明](configuration.md)** - 转换器配置选项详解
   - ConverterConfig 参数
   - 数据库连接设置
   - 输出格式配置
   - 性能调优参数

3. **[使用说明](usage.md)** - 完整的操作流程和示例
   - 交互式转换流程
   - 编程方式调用
   - 批量处理方法
   - 结果验证步骤

### 🆘 帮助与支持
- **[常见问题](../faq.md)** - 用户常遇问题和解答
- **[故障排除](../troubleshooting.md)** - 问题诊断和解决方案

### 🔧 进阶内容
- **[技术架构](../architecture.md)** - 系统设计和工作原理
- **[贡献指南](../contributing.md)** - 开发参与和代码规范
- **[更新日志](../changelog.md)** - 版本历史和新功能
- **[许可证信息](../license.md)** - 使用条款和法律说明

## 🎨 界面预览

### 启动界面
```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 环境检查...
✅ Python 3.9.16
✅ 依赖包完整
✅ 内存充足
✅ 磁盘空间足够
```

### 转换进度
```
╭─────────────────────────────────────────── 📊 导出标准数据表 ───────────────────────────────────────────╮
│                                                                                                         │
│ 正在导出表格数据...                                                                                     │
│                                                                                                         │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                                       │
│                                                                                                         │
│ 当前处理: Terminals 表 → 转换终端程序数据                                                              │
│ 已完成: Airports, Runways, Waypoints, Navaids, Airways, AirwayLegs, ILSes                             │
│                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 完成摘要
```
╔══════════════════════════════════════════════════════════════╗
║                          转换成功                           ║
║                                                              ║
║  ✓ 数据转换成功完成！                                        ║
║                                                              ║
║  📊 处理统计:                                                ║
║  • 导出表格: 11 个                                          ║
║  • 处理记录: 156,789 条                                      ║
║  • 终端程序: 8,945 个                                        ║
║  • 航路点: 45,234 个                                         ║
║                                                              ║
║  📁 输出文件: Primary.7z (15.6 MB)                          ║
║  🕒 总耗时: 4 分 23 秒                                       ║
║                                                              ║
║  可以在 TFDI MD-11 中使用此文件进行导航。                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## ⚠️ 重要提醒

### 数据使用规范
本工具仅用于模拟飞行目的，请确保您的使用符合相关规定：
- **🎯 仅限模拟** - 严禁用于实际航空导航
- **📋 遵守协议** - 确认 Fenix 和 TFDI 数据使用条款
- **🔒 非商业用途** - 个人学习和娱乐使用

### 技术要求
- **🐍 Python 3.8+** - 推荐使用 Python 3.9 或更高版本
- **💾 内存要求** - 至少 4GB RAM（推荐 8GB）
- **💿 存储空间** - 至少 1GB 可用空间
- **🖥️ 操作系统** - Windows 10/11, macOS 10.15+, Linux

### 数据安全
- **💾 备份数据** - 转换前请备份重要数据
- **🔍 验证结果** - 转换后验证数据完整性
- **📅 版本管理** - 使用稳定版本进行重要转换
- **🔒 文件权限** - 确保有足够的文件读写权限

## 🎯 适用场景

### 🎮 飞行模拟爱好者
- **✈️ 增强体验** - 在 TFDI MD-11 中使用高质量导航数据
- **🌍 全球覆盖** - 获得全球机场和航路信息
- **📊 真实数据** - 基于专业航空数据库的精确信息

### 👨‍🏫 航空教学
- **🎓 培训用途** - 为航空教学提供标准化数据
- **📚 学习工具** - 理解现代航空导航系统
- **🔄 数据更新** - 定期更新保持数据时效性

### 👨‍💻 开发者
- **🔧 数据处理** - 学习航空数据转换技术
- **📝 格式研究** - 了解不同导航数据格式
- **🧩 系统集成** - 将转换器集成到其他系统

## 📊 数据输出说明

### JSON 文件结构
转换完成后，将生成以下 JSON 文件：

```
Primary.7z 内容:
├── 📄 AirportLookup.json      # 机场查找索引 (~500KB)
├── 📄 Airports.json           # 机场基本信息 (~2MB)
├── 📄 AirwayLegs.json        # 航路段详细数据 (~3MB)
├── 📄 Airways.json           # 航路定义 (~800KB)
├── 📄 Ilses.json             # ILS 进近数据 (~1.5MB)
├── 📄 NavaidLookup.json      # 导航设备索引 (~300KB)
├── 📄 Navaids.json           # 导航设备数据 (~1.2MB)
├── 📄 Runways.json           # 跑道信息 (~2.5MB)
├── 📄 Terminals.json         # 终端程序定义 (~800KB)
├── 📄 WaypointLookup.json    # 航路点索引 (~1MB)
├── 📄 Waypoints.json         # 航路点数据 (~4MB)
└── 📁 ProcedureLegs/         # 程序段目录
    ├── TermID_1.json         # 终端程序段
    ├── TermID_2.json
    └── ...
```

### 数据格式示例
```json
// Airports.json 示例
{
  "ZBAA": {
    "AirportID": "ZBAA",
    "AirportName": "Beijing Capital International Airport",
    "Latitude": 40.080111,
    "Longitude": 116.584556,
    "Elevation": 116,
    "MagneticVariation": -6.2
  }
}

// Waypoints.json 示例
{
  "ELMAG": {
    "WaypointID": "ELMAG",
    "Latitude": 39.832222,
    "Longitude": 116.298611,
    "Type": "DESIGNATED_POINT"
  }
}
```

## 🔄 更新和维护

### 数据更新频率
- **定期更新**: 建议每 28 天更新一次（AIRAC 周期）
- **版本跟踪**: 关注 Fenix 和 TFDI 的版本更新
- **兼容性检查**: 更新前验证版本兼容性

### 转换器更新
- **GitHub Releases**: 关注项目发布页面
- **自动检查**: 定期检查转换器版本更新
- **功能改进**: 参与社区反馈和功能建议

## 🆘 获取帮助

如果在使用过程中遇到问题：

1. **📚 查阅文档** - 首先查看相关章节的详细说明
2. **🔍 检查日志** - 查看生成的日志文件了解错误详情
3. **🧪 运行诊断** - 使用内置诊断工具检查系统状态
4. **💬 社区支持** - 在 GitHub Issues 中报告问题

### 快速诊断命令
```bash
# 检查转换器版本
python Fenix2TFDINavDataConverter.py --version

# 验证环境
python -c "import rich, pandas, py7zr; print('环境正常')"

# 测试数据库连接
python -c "import sqlite3; sqlite3.connect('nd.db3').close(); print('数据库可访问')"
```

### 性能监控
```python
# 监控系统资源
import psutil
print(f"CPU: {psutil.cpu_percent()}%")
print(f"内存: {psutil.virtual_memory().percent}%")
print(f"磁盘: {psutil.disk_usage('.').percent}%")
```

---

**下一步**: 前往 [安装指南](installation.md) 开始配置您的环境，或直接查看 [使用说明](usage.md) 快速上手转换过程！🚁✨
