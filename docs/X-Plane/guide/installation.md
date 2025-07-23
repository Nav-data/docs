# 安装指南

本指南将帮助您在不同操作系统上正确安装和配置 Nav-data 工具。

## 📋 系统要求

### 最低系统要求
- **操作系统**：Windows 10/11, macOS 10.15+, Ubuntu 18.04+ 或其他主流 Linux 发行版
- **Python 版本**：Python 3.6 或更高版本
- **内存**：建议 4GB RAM 以上
- **存储空间**：至少 2GB 可用磁盘空间
- **网络**：用于下载依赖包和更新数据

### 推荐系统配置
- **Python 版本**：Python 3.8+ 
- **内存**：8GB RAM 或更高
- **存储空间**：10GB+ SSD 存储
- **处理器**：多核 CPU（用于大文件批量处理）

## 🔧 安装步骤

### 1. Python 环境安装

#### Windows 系统
1. 访问 [Python 官网](https://www.python.org/downloads/) 下载最新版本
2. 运行安装程序，**务必勾选 "Add Python to PATH"**
3. 验证安装：
   ```cmd
   python --version
   pip --version
   ```

#### macOS 系统
使用 Homebrew（推荐）：
```bash
# 安装 Homebrew（如未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python

# 验证安装
python3 --version
pip3 --version
```

#### Linux 系统（Ubuntu/Debian）
```bash
# 更新包管理器
sudo apt update

# 安装 Python 和 pip
sudo apt install python3 python3-pip python3-venv

# 验证安装
python3 --version
pip3 --version
```

### 2. 获取项目源码

#### 方式一：Git 克隆（推荐）
```bash
# 克隆项目仓库
git clone https://github.com/your-repo/nav-data.git

# 进入项目目录
cd nav-data
```

#### 方式二：下载压缩包
1. 访问项目 GitHub 页面
2. 点击 "Code" → "Download ZIP"
3. 解压到目标目录

### 3. 创建虚拟环境（推荐）

创建独立的 Python 虚拟环境，避免依赖冲突：

```bash
# 创建虚拟环境
python -m venv nav-data-env

# 激活虚拟环境
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# 验证虚拟环境
which python  # 应显示虚拟环境路径
```

### 4. 安装依赖包

#### 核心依赖
```bash
# 安装基础依赖
pip install -r requirements.txt
```

#### 手动安装依赖（如无 requirements.txt）
```bash
# 数据处理相关
pip install pandas numpy

# PDF 处理
pip install pdfplumber

# 进度条和用户界面
pip install tqdm colorama

# 地理计算
pip install geopy

# 中文处理（如需要）
pip install pypinyin

# 其他工具包
pip install typing-extensions dataclasses
```

#### 可选依赖
```bash
# Jupyter Notebook 支持（数据分析）
pip install jupyter

# 测试框架
pip install pytest pytest-cov

# 代码格式化
pip install black flake8
```

## 🗂️ 目录结构配置

### 标准目录布局
```
nav-data/
├── Airway/                 # 航路数据处理模块
│   ├── airway.py          # 主要转换脚本
│   └── README.md          # 模块说明
├── PDF extract/           # PDF 数据提取模块
│   ├── 1_terminal_pdf.py  # PDF 原始提取
│   ├── 2_terminal_encode.py # 数据编码
│   ├── 3_terminal_db.py   # 数据库生成
│   ├── waypoint_1_pdf.py  # 航路点提取
│   └── utils.py           # 工具函数
├── Terminal Patch/        # 数据修复模块
│   ├── terminal_encoder.py # 程序编码器
│   └── terminal_reencode.py # 格式修复
├── X-Plane CIFP/         # X-Plane CIFP 处理
│   ├── 1_navaid.py       # 导航设备处理
│   ├── 2_waypoint.py     # 航路点处理
│   ├── 3_terminal.py     # 终端程序处理
│   └── utils.py          # 工具函数
├── docs/                  # 项目文档
├── requirements.txt       # 依赖列表
└── README.md             # 项目说明
```

### 创建工作目录
```bash
# 创建数据输入目录
mkdir -p data/input/{csv,pdf,raw}

# 创建数据输出目录
mkdir -p data/output/{dat,txt,processed}

# 创建日志目录
mkdir -p logs

# 创建配置目录
mkdir -p config
```

## ⚙️ 环境变量配置

### 创建环境配置文件
创建 `.env` 文件（Windows 用户创建 `.env.txt` 然后重命名）：

```bash
# X-Plane 安装路径
XPLANE_PATH=/path/to/X-Plane

# 数据文件路径
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# 日志配置
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# 处理配置
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# 中国空域代码（可自定义）
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Windows 系统环境变量设置
1. 右键 "此电脑" → "属性" → "高级系统设置"
2. 点击 "环境变量"
3. 在 "用户变量" 中添加：
   - 变量名：`NAV_DATA_HOME`
   - 变量值：项目安装路径

### macOS/Linux 环境变量设置
在 `~/.bashrc` 或 `~/.zshrc` 中添加：
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 安装验证

### 1. 基础功能测试
```bash
# 进入项目目录
cd nav-data

# 测试航路模块
python -c "import Airway.airway; print('Airway module loaded successfully')"

# 测试 PDF 处理模块  
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# 测试终端补丁模块
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. 依赖检查脚本
创建 `check_installation.py`：
```python
#!/usr/bin/env python3
"""
Nav-data 安装检查脚本
"""
import sys
import importlib
import os

def check_python_version():
    """检查 Python 版本"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Python 版本过低，需要 3.6+")
        return False
    print(f"✅ Python 版本: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """检查依赖包"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm', 
        'colorama', 'geopy', 'typing_extensions'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - 未安装")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """检查目录结构"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - 目录缺失")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Nav-data 安装检查")
    print("=" * 40)
    
    # 检查 Python 版本
    print("\n📍 Python 版本检查:")
    python_ok = check_python_version()
    
    # 检查依赖
    print("\n📍 依赖包检查:")
    deps_ok, missing_deps = check_dependencies()
    
    # 检查目录
    print("\n📍 目录结构检查:")
    dirs_ok, missing_dirs = check_directories()
    
    # 总结
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 安装检查通过！Nav-data 已就绪。")
        return 0
    else:
        print("⚠️  安装检查发现问题：")
        if missing_deps:
            print(f"   缺失依赖: {', '.join(missing_deps)}")
            print(f"   安装命令: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   缺失目录: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

运行检查：
```bash
python check_installation.py
```

## 🔥 常见安装问题

### 问题 1：Python 版本兼容性
**症状**：运行时出现语法错误或模块导入错误
**解决方案**：
```bash
# 检查 Python 版本
python --version

# 如果版本过低，升级 Python
# Windows: 重新下载安装新版本
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### 问题 2：依赖包安装失败
**症状**：`pip install` 命令失败
**解决方案**：
```bash
# 升级 pip
python -m pip install --upgrade pip

# 使用国内镜像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 清除缓存重试
pip cache purge
pip install package_name
```

### 问题 3：虚拟环境问题
**症状**：虚拟环境无法激活或包找不到
**解决方案**：
```bash
# 删除旧的虚拟环境
rm -rf nav-data-env

# 重新创建
python -m venv nav-data-env

# 激活并安装依赖
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### 问题 4：文件权限问题（Linux/macOS）
**症状**：无法创建文件或目录
**解决方案**：
```bash
# 修改目录权限
chmod -R 755 nav-data/

# 或者使用 sudo（不推荐）
sudo python script.py
```

### 问题 5：PDF 处理模块问题
**症状**：pdfplumber 安装或使用失败
**解决方案**：
```bash
# 安装系统依赖（Ubuntu/Debian）
sudo apt-get install python3-dev libpoppler-cpp-dev

# 重新安装 pdfplumber
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 完成安装

安装完成后，您可以：

1. **运行快速测试**：
   ```bash
   python check_installation.py
   ```

2. **查看帮助信息**：
   ```bash
   python Airway/airway.py --help
   ```

3. **开始数据转换**：
   参考 [使用说明](./usage.md) 进行第一次数据转换

## 🔄 更新升级

### 更新项目代码
```bash
# 如果使用 Git
git pull origin main

# 或重新下载最新版本
```

### 更新依赖包
```bash
# 激活虚拟环境
source nav-data-env/bin/activate

# 更新所有包
pip install --upgrade -r requirements.txt

# 或手动更新特定包
pip install --upgrade package_name
```

### 数据文件更新
定期检查和更新 NAIP 数据源，确保导航数据的时效性。

---

**安装完成！** 🎉 现在可以开始使用 Nav-data 进行导航数据转换了。如遇问题，请查看 [故障排除](#常见安装问题) 或提交 GitHub Issue。 