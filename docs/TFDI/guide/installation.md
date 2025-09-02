# 🔧 TFDI 导航数据转换器安装指南

本指南将详细介绍如何安装和配置 TFDI 导航数据转换器，确保您的系统环境能够顺利运行转换器。

## 📋 系统要求

### 💻 硬件要求
| 组件 | 最低要求 | 推荐配置 |
|------|----------|----------|
| **处理器** | 双核 2.0GHz | 四核 3.0GHz+ |
| **内存** | 4GB RAM | 8GB+ RAM |
| **存储** | 1GB 可用空间 | 5GB+ 可用空间 |
| **网络** | 仅下载时需要 | 稳定网络连接 |

### 🖥️ 操作系统支持
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina 或更高版本
- **Linux**: Ubuntu 18.04+, CentOS 8+, 或其他主流发行版

### 🐍 Python 环境要求
- **Python 版本**: 3.8.0 或更高版本
- **推荐版本**: Python 3.9.x 或 3.10.x
- **包管理器**: pip 21.0+ (通常随 Python 安装)

## 🚀 快速安装

### Windows 用户

#### 1️⃣ 安装 Python

**方法一：Microsoft Store (推荐)**
```bash
# 1. 打开 Microsoft Store
# 2. 搜索 "Python 3.10"
# 3. 点击安装 Python 3.10
# 4. 验证安装
python --version
pip --version
```

**方法二：官网下载**
```bash
# 1. 访问 https://www.python.org/downloads/windows/
# 2. 下载 Python 3.10.x (64-bit)
# 3. 运行安装程序
#    ✅ 勾选 "Add Python to PATH"
#    ✅ 勾选 "Install pip"
# 4. 验证安装
python --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 打开命令提示符或 PowerShell
# 升级 pip
python -m pip install --upgrade pip

# 安装必需依赖
pip install rich pandas py7zr

# 验证安装
python -c "import rich, pandas, py7zr; print('✅ 所有依赖安装成功!')"
```

#### 3️⃣ 下载转换器

```bash
# 方法一：下载发布包
# 访问 GitHub Releases 页面下载最新版本

# 方法二：克隆源码 (需要 Git)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 验证转换器
python Fenix2TFDINavDataConverter.py --help
```

### macOS 用户

#### 1️⃣ 安装 Python

**方法一：Homebrew (推荐)**
```bash
# 安装 Homebrew (如果尚未安装)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python@3.10

# 验证安装
python3 --version
pip3 --version

# 创建符号链接 (可选)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**方法二：官网下载**
```bash
# 1. 访问 https://www.python.org/downloads/macos/
# 2. 下载 Python 3.10.x for macOS
# 3. 安装 .pkg 文件
# 4. 验证安装
python3 --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 升级 pip
python3 -m pip install --upgrade pip

# 安装依赖
pip3 install rich pandas py7zr

# 验证安装
python3 -c "import rich, pandas, py7zr; print('✅ 依赖安装完成!')"
```

#### 3️⃣ 下载和设置转换器

```bash
# 下载转换器
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# 或使用 Git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 验证安装
python3 Fenix2TFDINavDataConverter.py --version
```

### Linux 用户

#### 1️⃣ 安装 Python

**Ubuntu/Debian:**
```bash
# 更新包列表
sudo apt update

# 安装 Python 3.10 和相关工具
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# 安装 build-essential (某些包需要编译)
sudo apt install build-essential

# 创建符号链接
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# 验证安装
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# 启用 PowerTools 仓库
sudo dnf config-manager --set-enabled powertools

# 安装 Python 3.10
sudo dnf install python3.10 python3.10-pip python3.10-devel

# 安装开发工具
sudo dnf groupinstall "Development Tools"

# 验证安装
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# 安装 Python
sudo pacman -S python python-pip

# 安装开发工具
sudo pacman -S base-devel

# 验证安装
python --version
pip --version
```

#### 2️⃣ 安装转换器依赖

```bash
# 升级 pip
python -m pip install --upgrade pip

# 安装依赖
pip install rich pandas py7zr

# 如果遇到权限问题，使用用户安装
pip install --user rich pandas py7zr

# 验证安装
python -c "import rich, pandas, py7zr; print('✅ 依赖安装成功!')"
```

#### 3️⃣ 下载转换器

```bash
# 使用 wget 下载
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# 或使用 git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 设置执行权限
chmod +x Fenix2TFDINavDataConverter.py

# 验证安装
python Fenix2TFDINavDataConverter.py --version
```

## 📦 详细依赖说明

### 核心依赖包

| 包名 | 版本要求 | 用途 | 安装命令 |
|------|----------|------|----------|
| **rich** | ≥ 12.0.0 | 现代化 CLI 界面 | `pip install rich` |
| **pandas** | ≥ 1.3.0 | 数据处理和分析 | `pip install pandas` |
| **py7zr** | ≥ 0.18.0 | 7z 压缩文件处理 | `pip install py7zr` |

### 标准库依赖 (无需额外安装)

| 模块 | 用途 |
|------|------|
| **sqlite3** | SQLite 数据库访问 |
| **json** | JSON 数据序列化 |
| **pathlib** | 文件路径处理 |
| **logging** | 日志记录 |
| **dataclasses** | 数据类支持 |
| **concurrent.futures** | 并发处理 |

### 可选依赖

```bash
# 开发相关依赖 (仅开发者需要)
pip install pytest flake8 mypy black pre-commit

# 性能监控依赖
pip install psutil

# 进度条增强
pip install tqdm
```

## 🔍 安装验证

### 完整验证脚本

创建验证脚本 `verify_tfdi_installation.py`：

```python
#!/usr/bin/env python3
"""
TFDI 导航数据转换器安装验证脚本
检查系统环境、依赖包和转换器功能
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """检查 Python 版本"""
    version = sys.version_info
    print(f"🐍 Python 版本: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python 版本符合要求 (>= 3.8)")
        return True
    else:
        print("❌ Python 版本过低，需要 3.8 或更高版本")
        print("   请升级 Python 后重试")
        return False

def check_dependencies():
    """检查必需依赖包"""
    required_packages = {
        'rich': '现代化 CLI 界面',
        'pandas': '数据处理库',
        'py7zr': '7z 压缩处理'
    }
    
    print("\n📦 检查依赖包:")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} 未安装        ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} 错误: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """检查可选依赖"""
    optional_packages = {
        'psutil': '系统监控',
        'tqdm': '进度条增强'
    }
    
    print("\n🔧 检查可选依赖:")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} 未安装        ({description}) - 可选")

def check_system_resources():
    """检查系统资源"""
    print("\n💾 检查系统资源:")
    
    try:
        import psutil
        
        # 检查内存
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 总内存: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ 内存充足 (>= 4GB)")
        else:
            print("⚠️ 内存可能不足，推荐 4GB+")
        
        # 检查磁盘空间
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 可用磁盘空间: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ 磁盘空间充足 (>= 1GB)")
        else:
            print("⚠️ 磁盘空间不足，需要至少 1GB")
            
    except ImportError:
        print("⚪ 无法检查系统资源 (psutil 未安装)")

def check_converter_accessibility():
    """检查转换器文件可访问性"""
    print("\n🔧 检查转换器文件:")
    
    converter_files = [
        'Fenix2TFDINavDataConverter.py',
        'README.md'
    ]
    
    for file_name in converter_files:
        file_path = Path(file_name)
        if file_path.exists():
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file_name:<35} ({size_kb} KB)")
        else:
            print(f"⚠️ {file_name:<35} 文件不存在")

def test_basic_functionality():
    """测试基本功能"""
    print("\n🧪 测试基本功能:")
    
    try:
        # 测试 Rich 界面
        from rich.console import Console
        console = Console()
        console.print("✅ Rich 界面测试", style="green")
        
        # 测试 Pandas 数据处理
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Pandas 数据处理测试通过")
        
        # 测试 py7zr 压缩功能
        import py7zr
        print("✅ py7zr 压缩功能可用")
        
        # 测试 SQLite 连接
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ SQLite 数据库连接测试通过")
        
        return True
        
    except Exception as e:
        print(f"❌ 功能测试失败: {e}")
        return False

def main():
    """主验证函数"""
    print("🔍 TFDI 导航数据转换器安装验证")
    print("=" * 60)
    
    # 检查项目列表
    checks = [
        ("Python 版本", check_python_version),
        ("必需依赖", check_dependencies),
        ("可选依赖", check_optional_dependencies),
        ("系统资源", check_system_resources),
        ("转换器文件", check_converter_accessibility),
        ("基本功能", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Python 版本", "必需依赖", "基本功能"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} 检查失败: {e}")
            if name in ["Python 版本", "必需依赖"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 所有检查通过！转换器可以正常使用。")
            print("\n📝 下一步:")
            print("   1. 准备 Fenix 导航数据库文件 (nd.db3)")
            print("   2. 运行转换器: python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ 核心功能可用，部分可选功能可能受限。")
            print("   转换器可以正常使用，建议安装缺失的可选依赖。")
            return 0
    else:
        print("❌ 关键检查未通过，请解决上述问题后重试。")
        print("\n🔧 常见解决方案:")
        print("   • 升级 Python 版本: https://python.org/downloads")
        print("   • 安装依赖: pip install rich pandas py7zr")
        print("   • 检查网络连接和权限设置")
        return 1

if __name__ == "__main__":
    exit(main())
```

运行验证脚本：
```bash
python verify_tfdi_installation.py
```

### 快速验证命令

```bash
# 1. 检查 Python 版本
python --version

# 2. 检查 pip 版本  
pip --version

# 3. 验证核心依赖
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. 测试 Rich 界面
python -c "from rich.console import Console; Console().print('🎉 Rich 测试成功!', style='bold green')"

# 5. 测试转换器启动
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 常见安装问题

### 问题 1: Python 版本过低

**症状:**
```
SyntaxError: invalid syntax (使用了新语法特性)
TypeError: 'type' object is not subscriptable
```

**解决方案:**
```bash
# 检查当前版本
python --version

# 如果版本 < 3.8，需要升级
# Windows: 从 python.org 下载新版本
# macOS: brew upgrade python  
# Linux: 参考上述安装指南更新
```

### 问题 2: pip 安装失败

**症状:**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**解决方案:**
```bash
# 升级 pip
python -m pip install --upgrade pip

# 使用国内镜像源
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# 清除缓存重试
pip cache purge
pip install rich pandas py7zr

# 检查网络连接
ping pypi.org
```

### 问题 3: 权限错误

**症状:**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**解决方案:**
```bash
# Windows: 以管理员身份运行
# 右键命令提示符 → "以管理员身份运行"

# macOS/Linux: 使用用户安装
pip install --user rich pandas py7zr

# 或使用 sudo (不推荐)
sudo pip install rich pandas py7zr
```

### 问题 4: 编译错误

**症状:**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**解决方案:**

**Windows:**
```bash
# 安装 Microsoft C++ Build Tools
# 访问: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# 下载并安装 "Build Tools for Visual Studio"

# 或使用预编译包
pip install --only-binary=all rich pandas py7zr
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install build-essential python3-dev

# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### 问题 5: 依赖冲突

**症状:**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**解决方案:**
```bash
# 创建虚拟环境
python -m venv tfdi_env

# 激活虚拟环境
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# 在虚拟环境中安装
pip install rich pandas py7zr

# 验证安装
python -c "import rich, pandas, py7zr; print('安装成功!')"
```

## 🎯 安装后续步骤

### 1. 环境配置

#### Windows 环境变量 (可选)
```batch
# 添加 Python Scripts 目录到 PATH
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# 设置转换器目录
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### macOS/Linux 环境变量 (可选)
```bash
# 添加到 ~/.bashrc 或 ~/.zshrc
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# 重载配置
source ~/.bashrc  # 或 source ~/.zshrc
```

### 2. 准备数据文件

```bash
# 检查 Fenix 数据库位置
# Windows 常见路径:
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. 创建工作目录

```bash
# 创建专用工作目录
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# 创建子目录
mkdir input output logs backups

# 复制转换器到工作目录 (可选)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. 首次运行测试

```bash
# 运行转换器帮助
python Fenix2TFDINavDataConverter.py --help

# 运行基本测试 (如果有测试数据)
python Fenix2TFDINavDataConverter.py --test

# 查看版本信息
python Fenix2TFDINavDataConverter.py --version
```

## 📚 下一步

安装完成后，请继续阅读：

1. **[配置说明](configuration.md)** - 了解转换器配置选项
2. **[使用说明](usage.md)** - 开始您的第一次数据转换
3. **[故障排除](../troubleshooting.md)** - 如果遇到问题时查看

### 快速开始清单

- [ ] ✅ Python 3.8+ 已安装
- [ ] ✅ 必需依赖已安装 (rich, pandas, py7zr)
- [ ] ✅ 转换器文件已下载
- [ ] ✅ 安装验证通过
- [ ] ✅ Fenix 数据库文件已准备
- [ ] ✅ TFDI MD-11 已安装在 MSFS 中

---

**安装完成！** 🎉 

现在您可以开始使用 TFDI 导航数据转换器了。如果遇到任何问题，请查看 [故障排除指南](../troubleshooting.md) 或在 GitHub Issues 中寻求帮助。🚁✨
