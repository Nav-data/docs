# 🔧 iFly 导航数据转换器安装指南

本指南将带您完成 iFly 导航数据转换器的完整安装过程，确保您的系统环境配置正确且所有依赖项都已安装。

## 📋 系统要求

### 💻 硬件要求
| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **处理器** | 双核 2.0GHz | 四核 3.0GHz+ |
| **内存** | 4GB RAM | 8GB+ RAM |
| **存储** | 500MB 可用空间 | 2GB+ 可用空间 |
| **网络** | 无需网络连接 | 下载依赖时需要 |

### 🖥️ 操作系统支持
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina 或更高版本
- **Linux**: Ubuntu 18.04+, CentOS 7+, 或其他主流发行版

### 🐍 Python 环境要求
- **Python 版本**: 3.8.0 或更高版本
- **推荐版本**: Python 3.9.x 或 3.10.x
- **包管理器**: pip 21.0+ (通常随 Python 安装)

## 🚀 快速安装

### Windows 用户

#### 1️⃣ 安装 Python

**方法一：从官网下载 (推荐)**
```bash
# 1. 访问 https://www.python.org/downloads/
# 2. 下载最新的 Python 3.9+ 版本
# 3. 运行安装程序，确保勾选 "Add Python to PATH"
# 4. 验证安装
python --version
pip --version
```

**方法二：使用 Microsoft Store**
```bash
# 1. 打开 Microsoft Store
# 2. 搜索 "Python 3.9" 或 "Python 3.10"
# 3. 点击安装
# 4. 验证安装
python --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 打开命令提示符或 PowerShell
# 安装所有必需依赖
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 验证安装
python -c "import rich, pandas, pygeomag; print('依赖安装成功!')"
```

### macOS 用户

#### 1️⃣ 安装 Python

**方法一：使用 Homebrew (推荐)**
```bash
# 安装 Homebrew (如果尚未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python@3.9

# 验证安装
python3 --version
pip3 --version
```

**方法二：从官网下载**
```bash
# 1. 访问 https://www.python.org/downloads/macos/
# 2. 下载适用于 macOS 的 Python 安装包
# 3. 运行 .pkg 文件进行安装
# 4. 验证安装
python3 --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 使用 pip3 安装依赖
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# 验证安装
python3 -c "import rich, pandas, pygeomag; print('依赖安装成功!')"
```

### Linux 用户

#### 1️⃣ 安装 Python

**Ubuntu/Debian:**
```bash
# 更新包列表
sudo apt update

# 安装 Python 3.9 和 pip
sudo apt install python3.9 python3.9-pip python3.9-dev

# 创建符号链接 (可选)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# 验证安装
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# 安装 EPEL 仓库
sudo yum install epel-release

# 安装 Python 3.9
sudo yum install python39 python39-pip

# 验证安装
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# 安装 Python 和 pip
sudo pacman -S python python-pip

# 验证安装
python --version
pip --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 安装依赖包
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 如果遇到权限问题，使用用户安装
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# 验证安装
python -c "import rich, pandas, pygeomag; print('依赖安装成功!')"
```

## 📦 详细依赖说明

### 核心依赖包

| 包名 | 版本要求 | 用途 | 许可证 |
|------|----------|------|--------|
| **rich** | ≥ 12.0.0 | 现代化 CLI 界面 | MIT |
| **pandas** | ≥ 1.3.0 | 数据处理和分析 | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | 磁偏角计算 | MIT |
| **tqdm** | ≥ 4.60.0 | 进度条显示 | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | 地理坐标计算 | MIT |

### 标准库依赖 (无需安装)

| 模块 | 用途 |
|------|------|
| **pathlib** | 文件路径处理 |
| **typing** | 类型提示支持 |
| **sqlite3** | SQLite 数据库访问 |
| **csv** | CSV 文件处理 |
| **datetime** | 日期时间处理 |
| **logging** | 日志记录 |

## 🔍 安装验证

### 完整验证脚本

创建一个验证脚本 `verify_installation.py`：

```python
#!/usr/bin/env python3
"""
iFly 导航数据转换器安装验证脚本
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """检查 Python 版本"""
    version = sys.version_info
    print(f"🐍 Python 版本: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python 版本符合要求")
        return True
    else:
        print("❌ Python 版本过低，需要 3.8 或更高版本")
        return False

def check_dependencies():
    """检查依赖包"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 检查依赖包:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: 未安装")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """检查系统资源"""
    import shutil
    
    print("\n💾 检查系统资源:")
    
    # 检查磁盘空间
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 可用磁盘空间: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ 磁盘空间充足")
        disk_ok = True
    else:
        print("⚠️ 磁盘空间不足，建议至少 1GB")
        disk_ok = False
    
    return disk_ok

def main():
    """主验证函数"""
    print("🔍 iFly 导航数据转换器安装验证")
    print("=" * 50)
    
    # 检查项目
    checks = [
        ("Python 版本", check_python_version),
        ("依赖包", check_dependencies),
        ("系统资源", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} 检查失败: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 所有检查通过！您可以开始使用转换器了。")
        return 0
    else:
        print("⚠️ 部分检查未通过，请根据上述提示解决问题。")
        return 1

if __name__ == "__main__":
    exit(main())
```

运行验证脚本：
```bash
python verify_installation.py
```

### 手动验证步骤

```bash
# 1. 检查 Python 版本
python --version

# 2. 检查 pip 版本
pip --version

# 3. 验证核心依赖
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. 测试 Rich 界面
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. 测试磁偏角计算
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'磁偏角计算 OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 常见安装问题

### 问题 1: Python 版本过低

**症状:**
```
SyntaxError: invalid syntax
```

**解决方案:**
```bash
# 检查当前版本
python --version

# 如果版本 < 3.8，请升级
# Windows: 从 python.org 下载新版本
# macOS: brew upgrade python
# Linux: 参考上述安装指南
```

### 问题 2: pip 安装失败

**症状:**
```
ERROR: Could not find a version that satisfies the requirement
```

**解决方案:**
```bash
# 升级 pip
python -m pip install --upgrade pip

# 使用国内镜像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# 清除缓存重试
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### 问题 3: 权限错误

**症状:**
```
PermissionError: [Errno 13] Permission denied
```

**解决方案:**
```bash
# Windows: 以管理员身份运行命令提示符
# macOS/Linux: 使用用户安装
pip install --user rich pandas pygeomag tqdm geographiclib

# 或者使用 sudo (不推荐)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### 问题 4: 网络连接问题

**症状:**
```
WARNING: Retrying... Connection broken
```

**解决方案:**
```bash
# 使用国内镜像源
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# 或清华源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# 配置永久镜像源
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 安装后续步骤

### 1. 准备必要文件
- **Fenix 数据库**: 获取 `nd.db3` 文件
- **NAIP 数据**: 下载 `RTE_SEG.csv` 航路数据
- **iFly 安装**: 确认 iFly 737 MAX 8 已安装

### 2. 创建工作目录
```bash
# 创建专用目录
mkdir ~/ifly-converter
cd ~/ifly-converter

# 下载转换器脚本
# (从项目仓库获取 main.py)
```

### 3. 进行首次测试
```bash
# 运行转换器
python main.py

# 按照界面提示操作
```

## 📚 下一步

安装完成后，请继续阅读：

1. **[配置说明](configuration.md)** - 了解详细的配置选项
2. **[使用说明](usage.md)** - 开始您的第一次数据转换
3. **[故障排除](../troubleshooting.md)** - 如果遇到问题时查看

---

**安装完成！** 🎉 现在您可以开始使用 iFly 导航数据转换器了。如果遇到任何问题，请查看 [故障排除指南](../troubleshooting.md) 或在 GitHub Issues 中寻求帮助。
