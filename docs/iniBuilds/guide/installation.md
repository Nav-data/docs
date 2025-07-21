# 📥 安装指南

本指南将引导您完成Nav-data航空导航数据转换工具的完整安装过程，确保系统环境配置正确。

## 🖥️ 系统要求

### 📋 最低配置要求

| 组件 | 要求 | 推荐配置 |
|------|------|----------|
| **操作系统** | Windows 10 1903+ | Windows 11 22H2+ |
| **Python版本** | Python 3.8+ | Python 3.11+ |
| **内存** | 8GB RAM | 16GB+ RAM |
| **存储空间** | 2GB可用空间 | 5GB+可用空间 |
| **网络** | 宽带互联网连接 | 稳定高速连接 |

### ✈️ 必需软件

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (2020或2024版本)
- [**Python 3.8+**](https://www.python.org/downloads/) 开发环境
- 目标飞机插件：[**iniBuilds A350**](https://www.inibuilds.com/) 或 [**PMDG 737/777**](https://pmdg.com/)

### 📊 数据源订阅（选择其一）

- [**Navigraph**](https://navigraph.com/) - 推荐，数据更新及时
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - 价格实惠的替代方案

## 🐍 Python环境安装

### 步骤1：下载并安装Python

1. 访问 [Python官方网站](https://www.python.org/downloads/)
2. 下载最新的Python 3.11版本（推荐）
3. **重要**：安装时勾选"Add Python to PATH"选项

```powershell
# 验证Python安装
python --version
# 应显示：Python 3.11.x

# 验证pip安装
pip --version
# 应显示pip版本信息
```

### 步骤2：安装项目依赖

```bash
# 克隆或下载项目到本地
cd /path/to/nav-data

# 安装所需依赖包
pip install -r requirements.txt
```

#### 依赖包说明

| 包名 | 版本 | 用途 |
|------|------|------|
| `pandas` | ≥1.3.0 | 数据处理和分析 |
| `requests` | ≥2.26.0 | HTTP请求处理 |
| `tqdm` | ≥4.62.0 | 进度条显示 |
| `chardet` | ≥4.0.0 | 字符编码检测 |
| `ratelimit` | ≥2.2.1 | API请求限制 |
| `pygeomag` | ≥0.9.0 | 地磁偏角计算 |

### 步骤3：验证安装

```python
# 测试关键依赖
python -c "import pandas, sqlite3, pygeomag; print('所有依赖安装成功！')"
```

## 🎮 Microsoft Flight Simulator配置

### 🔍 确认MSFS安装位置

根据您的MSFS版本和购买渠道，Community文件夹位置如下：

#### MSFS 2020

**Microsoft Store版**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam版**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Microsoft Store版**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam版**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ 快速路径检测脚本

创建以下PowerShell脚本来自动检测您的MSFS安装：

```powershell
# 保存为 detect_msfs.ps1
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "找到MSFS Community文件夹: $path" -ForegroundColor Green
    }
}
```

## ✈️ 飞机插件验证

### iniBuilds A350验证

检查以下目录是否存在：

```
[Community文件夹]\inibuilds-aircraft-a350\Config\NavigationData\
```

### PMDG插件验证

检查以下目录是否存在（根据您的PMDG飞机型号）：

```
[Community文件夹]\pmdg-aircraft-737\Config\Navdata\
[Community文件夹]\pmdg-aircraft-738\Config\Navdata\
[Community文件夹]\pmdg-aircraft-77w\Config\Navdata\
[Community文件夹]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 项目目录结构

安装完成后，您的项目目录应该如下所示：

```
nav-data/
├── XP2INI_NDB_Converter.py    # 主转换程序
├── requirements.txt           # Python依赖列表
├── README.md                 # 项目说明
├── LICENSE                   # 许可证文件
│
├── 数据处理模块/
│   ├── airports.py           # 机场数据处理
│   ├── runways.py           # 跑道数据处理
│   ├── vhfs.py              # VHF导航台处理
│   ├── ndbs.py              # NDB导航台处理
│   ├── enroute_waypoints.py # 航路点处理
│   ├── terminal_waypoints.py# 终端点处理
│   ├── sids.py              # SID程序处理
│   ├── stars.py             # STAR程序处理
│   ├── iaps.py              # 进近程序处理
│   ├── airways.py           # 航路处理
│   └── gs.py                # 着陆引导处理
│
└── docs/                    # 文档目录
    ├── guide/               # 使用指南
    └── ...                  # 其他文档
```

## 🔧 环境变量配置（可选）

为了更便捷的使用，您可以设置以下环境变量：

```powershell
# 设置MSFS Community路径
setx MSFS_COMMUNITY_PATH "C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# 设置Nav-data工作目录
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ 安装验证清单

完成安装后，请确认以下项目：

- [ ] Python 3.8+已正确安装并添加到PATH
- [ ] 所有依赖包已成功安装
- [ ] MSFS Community文件夹已定位
- [ ] 目标飞机插件已安装并验证
- [ ] 项目文件已下载到本地目录
- [ ] 具有足够的磁盘空间（至少2GB）

## 🚨 常见安装问题

### Python相关问题

**问题**：`'python' 不是内部或外部命令`
```bash
# 解决方案：重新安装Python并确保勾选"Add to PATH"
# 或手动添加Python到系统PATH
```

**问题**：`ModuleNotFoundError: No module named 'xxx'`
```bash
# 解决方案：重新安装依赖
pip install --upgrade -r requirements.txt
```

### 权限问题

**问题**：无法访问MSFS文件夹
```powershell
# 解决方案：以管理员身份运行PowerShell/命令提示符
# 右键点击 → "以管理员身份运行"
```

### 路径问题

**问题**：找不到飞机插件目录
```bash
# 解决方案：
# 1. 确认飞机插件已正确安装
# 2. 在MSFS中启动飞机一次以创建必要目录
# 3. 检查插件是否在正确的Community文件夹中
```

## 🔄 更新说明

要更新Nav-data到最新版本：

```bash
# 拉取最新代码
git pull origin main

# 更新依赖包
pip install --upgrade -r requirements.txt
```

---

安装完成！接下来请查看 [**配置说明**](./configuration.md) 来设置数据源和AIRAC周期。 