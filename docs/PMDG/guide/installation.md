# 📥 安装指南

本指南将详细介绍如何在不同操作系统上安装和配置 Nav-data 导航数据转换工具。

## 🔧 系统要求

### 最低配置
- **Python**: 3.8 或更高版本
- **内存**: 4GB RAM
- **存储**: 2GB 可用空间
- **网络**: 稳定的互联网连接（用于下载依赖）

### 推荐配置
- **Python**: 3.9+ (推荐 3.11)
- **内存**: 8GB RAM 或更多
- **存储**: 5GB 可用空间
- **处理器**: 多核心 CPU（用于并行处理）

### 支持的操作系统
- **Windows**: Windows 10/11 (64位)
- **macOS**: macOS 10.15 Catalina 或更高版本
- **Linux**: Ubuntu 18.04+, CentOS 7+, 或其他兼容发行版

## 📋 预备工作

### 1. 安装 Python

#### Windows
1. 访问 [Python 官网](https://www.python.org/downloads/windows/)
2. 下载最新的 Python 3.11.x 版本
3. 运行安装程序，确保勾选 "Add Python to PATH"
4. 验证安装：
```cmd
python --version
pip --version
```

#### macOS
使用 Homebrew（推荐）：
```bash
# 安装 Homebrew（如果尚未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python@3.11

# 验证安装
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# 更新包管理器
sudo apt update

# 安装 Python 和 pip
sudo apt install python3.11 python3.11-pip python3.11-venv

# 验证安装
python3.11 --version
pip3.11 --version
```

### 2. 获取项目代码

#### 方法 A: 使用 Git (推荐)
```bash
# 克隆仓库
git clone https://github.com/Nav-data/docs.git

# 进入项目目录
cd docs
```

#### 方法 B: 下载压缩包
1. 访问 GitHub 仓库页面
2. 点击 "Code" > "Download ZIP"
3. 解压到目标目录

## 🐍 Python 环境配置

### 1. 创建虚拟环境

#### Windows
```cmd
# 进入项目目录
cd Nav-data

# 创建虚拟环境
python -m venv nav-data-env

# 激活虚拟环境
nav-data-env\Scripts\activate

# 验证虚拟环境
where python
```

#### macOS/Linux
```bash
# 进入项目目录
cd Nav-data

# 创建虚拟环境
python3 -m venv nav-data-env

# 激活虚拟环境
source nav-data-env/bin/activate

# 验证虚拟环境
which python
```

### 2. 安装项目依赖

```bash
# 确保虚拟环境已激活
# 升级 pip
pip install --upgrade pip

# 安装项目依赖
pip install -r requirements.txt
```

### 3. 验证依赖安装

```python
# 运行 Python 并测试导入
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('所有依赖包安装成功！')
"
```

## 📁 数据源配置

### 1. 创建数据目录结构

```bash
# 创建数据目录
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

目录结构应如下：
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # NAIP CSV 数据文件
│   │   ├── xplane/        # X-Plane DAT 文件
│   │   └── cifp/          # CIFP 程序数据文件
│   └── output/            # 生成的数据库文件
├── logs/                  # 日志文件
└── ...
```

### 2. 配置文件路径

复制并编辑配置文件（可选）：
```bash
# 复制示例配置文件
cp config/paths.example.py config/paths.py

# 编辑配置文件
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Microsoft Flight Simulator 配置

### 1. 定位 MSFS Community 文件夹

#### Microsoft Store 版本
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Steam 版本
```
C:\Users\[用户名]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Xbox Game Pass 版本
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. 验证 PMDG 飞机安装

确认以下目录存在：
```
[Community文件夹]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. 备份原有导航数据

```bash
# 为每架 PMDG 飞机备份原有数据
# 示例：PMDG 737-800
cd "C:\Users\[用户名]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ 安装验证

### 1. 运行基础测试

```bash
# 激活虚拟环境
source nav-data-env/bin/activate  # macOS/Linux
# 或 nav-data-env\Scripts\activate  # Windows

# 运行基础测试
python -c "
import sys
print(f'Python版本: {sys.version}')

# 测试关键依赖
import pandas as pd
print(f'Pandas版本: {pd.__version__}')

import sqlite3
print('SQLite3: 可用')

import pygeomag
print('PyGeoMag: 可用')

print('✅ 所有组件安装成功！')
"
```

### 2. 验证数据库创建

```bash
# 测试数据库创建功能
python -c "
import sqlite3
import os

# 创建测试数据库
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ 数据库创建功能正常')
os.remove(test_db)
"
```

### 3. 检查文件权限

#### Windows
确保有以下目录的写入权限：
- 项目目录及子目录
- MSFS Community 文件夹
- MSFS 缓存目录

#### macOS/Linux
```bash
# 检查项目目录权限
ls -la Nav-data/

# 如需修改权限
chmod -R 755 Nav-data/
```

## 🔍 故障排除

### 常见问题及解决方案

#### 1. Python 版本不兼容
**问题**: "python: command not found" 或版本过低
**解决**: 
- 确认 Python 3.8+ 正确安装
- 在某些系统上使用 `python3` 而非 `python`

#### 2. pip 安装依赖失败
**问题**: 依赖安装时出现编译错误
**解决**:
```bash
# 升级构建工具
pip install --upgrade pip setuptools wheel

# 对于特定包的问题
pip install --no-cache-dir --force-reinstall [包名]
```

#### 3. pygeomag 安装问题
**问题**: pygeomag 编译失败
**解决**:
```bash
# Windows: 安装 Microsoft C++ Build Tools
# macOS: 安装 Xcode Command Line Tools
xcode-select --install

# Linux: 安装编译依赖
sudo apt install build-essential python3-dev
```

#### 4. 权限问题
**问题**: 无法写入 MSFS 目录
**解决**:
- 以管理员身份运行 (Windows)
- 检查目录权限 (macOS/Linux)
- 暂时关闭防病毒软件实时保护

#### 5. 内存不足
**问题**: 处理大数据文件时内存不足
**解决**:
- 增加虚拟内存/交换空间
- 关闭其他应用程序
- 分批处理数据文件

### 日志文件位置

如遇问题，请检查以下日志：
- `logs/PMDG_*.log` - 各模块处理日志
- `logs/db_validation.log` - 数据库验证日志
- `data/output/missing_airports_data.txt` - 缺失数据记录

## 📞 获取帮助

如果安装过程中遇到问题：

1. **查看错误信息** - 仔细阅读终端输出的错误信息
2. **检查系统要求** - 确认系统满足最低要求
3. **查阅文档** - 参考本指南的故障排除部分
4. **提交 Issue** - 在 GitHub 仓库中提交详细的问题报告

---

**下一步**: 继续阅读[配置说明](configuration.md)了解如何配置数据源。 