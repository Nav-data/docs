---
title: 故障排除指南
description: Nav-data 系统性故障诊断和解决方案
---

# 故障排除指南

本文档提供系统性的故障诊断方法和解决方案，帮助用户快速定位和解决 Nav-data 使用过程中遇到的问题。

## 🔍 快速诊断流程

### 第一步：环境检查
```bash
# 1. 检查 Python 版本
python --version
# 应显示 Python 3.6+ 版本

# 2. 检查依赖包安装
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. 检查工作目录
ls -la
# 应显示项目文件结构

# 4. 检查系统资源
df -h          # 磁盘空间
free -h        # 内存（Linux/macOS）
# Windows: 在任务管理器中查看
```

### 第二步：日志分析
```bash
# 启用详细日志
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# 查看最近的错误日志
tail -n 50 logs/nav-data.log
```

### 第三步：数据文件验证
```bash
# 检查输入文件
file -I input_file.csv   # 检查编码
head -n 5 input_file.csv # 查看前几行

# 验证文件完整性
wc -l input_file.csv     # 行数统计
```

## 🚨 常见错误模式

### 错误类型分类

#### A. 环境配置错误
- Python 版本不兼容
- 依赖包缺失或版本冲突
- 路径配置错误
- 权限问题

#### B. 数据格式错误
- CSV 编码问题
- PDF 格式不支持
- 字段缺失或格式错误
- 坐标格式问题

#### C. 系统资源问题
- 内存不足
- 磁盘空间不够
- 文件句柄超限
- 网络连接问题

#### D. 逻辑处理错误
- 数据验证失败
- 转换规则错误
- 输出格式不正确
- 并发处理冲突

## 🔧 详细故障排除

### 1. 安装和环境问题

#### 问题：ModuleNotFoundError
```
错误信息：ModuleNotFoundError: No module named 'pandas'
```

**诊断步骤：**
```bash
# 1. 确认当前 Python 环境
which python
python -c "import sys; print(sys.path)"

# 2. 检查虚拟环境状态
echo $VIRTUAL_ENV  # 应显示虚拟环境路径

# 3. 验证包安装
pip show pandas
```

**解决方案：**
```bash
# 方案1: 重新安装依赖
pip install -r requirements.txt

# 方案2: 创建新的虚拟环境
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# 方案3: 使用 conda 环境
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### 问题：Permission Denied
```
错误信息：PermissionError: [Errno 13] Permission denied
```

**诊断步骤：**
```bash
# 1. 检查文件权限
ls -la target_file

# 2. 检查目录权限
ls -ld target_directory

# 3. 检查当前用户
whoami
groups
```

**解决方案：**
```bash
# 方案1: 修改文件权限
chmod 644 target_file    # 文件权限
chmod 755 target_dir     # 目录权限

# 方案2: 更改所有者（如需要）
sudo chown $USER:$USER target_file

# 方案3: 使用用户目录
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### 问题：Python版本冲突
```
错误信息：SyntaxError: invalid syntax (Python 2.7 detected)
```

**诊断步骤：**
```bash
# 检查所有 Python 版本
python --version
python3 --version
which python
which python3

# 检查默认 Python
ls -la /usr/bin/python*
```

**解决方案：**
```bash
# 方案1: 使用 python3 显式调用
python3 script.py

# 方案2: 创建别名
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# 方案3: 更新系统默认（小心操作）
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. 数据处理问题

#### 问题：CSV编码错误
```
错误信息：UnicodeDecodeError: 'utf-8' codec can't decode
```

**诊断脚本：**
```python
#!/usr/bin/env python3
"""
CSV 编码诊断工具
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """诊断 CSV 文件编码"""
    file_path = Path(file_path)
    
    print(f"🔍 诊断文件: {file_path}")
    
    # 1. 文件基本信息
    print(f"文件大小: {file_path.stat().st_size} bytes")
    
    # 2. 自动检测编码
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # 读取前10KB
        encoding_info = chardet.detect(raw_data)
        print(f"检测到的编码: {encoding_info}")
    
    # 3. 尝试不同编码
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: 成功读取 {len(df)} 行")
            print(f"   列名: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# 使用示例
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 建议使用编码: {diagnosed_encoding}")
```

**解决方案：**
```python
# 方案1: 指定正确编码
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# 方案2: 转换文件编码
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# 方案3: 自动检测编码
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### 问题：PDF解析失败
```
错误信息：PDFSyntaxError: No /Root object found
```

**诊断工具：**
```python
#!/usr/bin/env python3
"""
PDF 文件诊断工具
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """诊断 PDF 文件问题"""
    file_path = Path(file_path)
    
    print(f"🔍 诊断 PDF 文件: {file_path}")
    
    # 1. 文件基本信息
    print(f"文件大小: {file_path.stat().st_size} bytes")
    
    # 2. 尝试打开 PDF
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ PDF 打开成功")
            print(f"页数: {len(pdf.pages)}")
            
            # 检查第一页
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"第一页尺寸: {first_page.width} x {first_page.height}")
                
                # 提取文本测试
                text = first_page.extract_text()
                if text:
                    print(f"文本提取成功，前100字符: {text[:100]}...")
                else:
                    print("⚠️  无法提取文本，可能是扫描版PDF")
                
                # 检查表格
                tables = first_page.extract_tables()
                print(f"检测到 {len(tables)} 个表格")
                
                # 检查图像
                images = first_page.images
                print(f"检测到 {len(images)} 个图像")
                
    except Exception as e:
        print(f"❌ PDF 打开失败: {e}")
        
        # 尝试修复建议
        print("\n💡 修复建议:")
        print("1. 检查PDF文件是否损坏")
        print("2. 尝试用Adobe Reader打开验证")
        print("3. 使用PDF修复工具")
        print("4. 重新下载或获取PDF文件")

# 使用示例
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**解决方案：**
```python
# 方案1: 使用更宽松的解析选项
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # 处理逻辑
        pass
except Exception as e:
    print(f"PDF解析失败: {e}")

# 方案2: 尝试其他PDF库
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # 处理逻辑
except Exception as e:
    print(f"备用PDF库也失败: {e}")

# 方案3: 预处理PDF
# 使用外部工具如 pdftk 修复PDF
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### 问题：坐标转换错误
```
错误信息：ValueError: invalid literal for float()
```

**诊断工具：**
```python
#!/usr/bin/env python3
"""
坐标数据诊断工具
"""
import re

def diagnose_coordinate_data(text):
    """诊断坐标数据格式"""
    print(f"🔍 诊断坐标数据: {text[:50]}...")
    
    # 常见坐标格式模式
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # 显示前3个匹配
    
    print("检测到的坐标格式:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # 提取可能的坐标
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"坐标候选: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """测试坐标转换"""
    print(f"\n🧪 测试转换: {coord_string}")
    
    try:
        # 尝试不同的转换方法
        
        # 方法1: 直接转换为浮点数
        try:
            result = float(coord_string)
            print(f"  直接转换: {result}")
            return result
        except ValueError:
            pass
        
        # 方法2: 度分秒转换
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  度分秒转换: {decimal}")
            return decimal
        
        # 方法3: 清理特殊字符后转换
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  清理后转换: {result}")
            return result
            
        print(f"  ❌ 转换失败")
        return None
        
    except Exception as e:
        print(f"  ❌ 转换异常: {e}")
        return None

# 使用示例
if __name__ == "__main__":
    test_data = "北纬39°48'35.6\" 东经116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. 系统资源问题

#### 问题：内存不足
```
错误信息：MemoryError: Unable to allocate array
```

**内存监控脚本：**
```python
#!/usr/bin/env python3
"""
内存使用监控工具
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """内存监控装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 获取初始内存状态
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 执行前内存: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 强制垃圾回收
            gc.collect()
            
            # 获取最终内存状态
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 执行后内存: {final_memory:.2f} MB")
            print(f"🔍 内存变化: {memory_delta:+.2f} MB")
            
            # 内存警告
            if final_memory > 1000:  # 超过1GB
                print("⚠️  内存使用较高，建议优化")
    
    return wrapper

def check_system_memory():
    """检查系统内存状态"""
    memory = psutil.virtual_memory()
    
    print("💾 系统内存状态:")
    print(f"  总内存: {memory.total / 1024**3:.2f} GB")
    print(f"  可用内存: {memory.available / 1024**3:.2f} GB")
    print(f"  使用率: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  系统内存使用率过高")
        return False
    return True

# 内存优化的数据处理函数
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """内存友好的CSV处理"""
    import pandas as pd
    
    results = []
    
    # 分块读取大文件
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # 处理数据块
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # 清理内存
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """处理单个数据块"""
    # 实际的数据处理逻辑
    return chunk  # 简化示例
```

**解决方案：**
```python
# 方案1: 分块处理
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # 处理单个块
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # 释放内存
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# 方案2: 使用生成器
def data_generator(file_path):
    """数据生成器，节省内存"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# 方案3: 增加虚拟内存
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### 问题：磁盘空间不足
```
错误信息：OSError: [Errno 28] No space left on device
```

**磁盘空间检查脚本：**
```python
#!/usr/bin/env python3
"""
磁盘空间监控工具
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """检查磁盘空间"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 磁盘空间状态 ({path}):")
    print(f"  总空间: {total / 1024**3:.2f} GB")
    print(f"  已使用: {used / 1024**3:.2f} GB")
    print(f"  可用空间: {free / 1024**3:.2f} GB")
    print(f"  使用率: {used/total*100:.1f}%")
    
    # 空间不足警告
    if free < 1024**3:  # 小于1GB
        print("⚠️  磁盘空间不足！")
        return False
    
    return True

def cleanup_temp_files():
    """清理临时文件"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"删除文件: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"删除目录: {file_path}")
            except Exception as e:
                print(f"无法删除 {file_path}: {e}")
    
    print(f"💾 总共清理了 {total_cleaned / 1024**2:.2f} MB")

def estimate_output_size(input_file):
    """估算输出文件大小"""
    input_size = Path(input_file).stat().st_size
    
    # 根据处理类型估算（这里是简化的估算）
    estimated_multiplier = {
        '.csv': 1.2,    # CSV转DAT通常略大
        '.pdf': 0.1,    # PDF提取文本通常小很多
        '.dat': 1.0,    # DAT格式修复大小不变
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 预估输出大小: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. 性能优化故障排除

#### 问题：处理速度过慢

**性能分析工具：**
```python
#!/usr/bin/env python3
"""
性能分析工具
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """性能分析装饰器"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 创建性能分析器
        pr = cProfile.Profile()
        
        # 开始分析
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 停止分析
            end_time = time.time()
            pr.disable()
            
            # 输出性能报告
            print(f"⏱️  执行时间: {end_time - start_time:.2f} 秒")
            
            # 保存详细报告
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 性能热点 (前10个函数):")
            stats.print_stats(10)
            
            # 保存报告到文件
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# 使用示例
@profile_performance
def slow_function():
    """示例慢函数"""
    import pandas as pd
    
    # 模拟慢操作
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """对比不同实现方法的性能"""
    import pandas as pd
    
    # 测试数据
    test_data = list(range(10000))
    
    # 方法1: 普通循环
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # 方法2: 列表推导
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # 方法3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 性能对比:")
    print(f"  普通循环: {time1:.4f} 秒")
    print(f"  列表推导: {time2:.4f} 秒")
    print(f"  NumPy: {time3:.4f} 秒")
    
    # 找出最快的方法
    times = {'普通循环': time1, '列表推导': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 最快方法: {fastest}")
```

## 🔬 高级诊断工具

### 综合诊断脚本

创建 `diagnose_nav_data.py`：

```python
#!/usr/bin/env python3
"""
Nav-data 综合诊断工具
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Nav-data 诊断工具类"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """记录问题"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """记录警告"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """记录信息"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """检查Python环境"""
        print("\n🐍 Python环境检查:")
        
        # Python版本
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Python版本: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Python版本过低 ({version_str})，需要3.6+")
        else:
            self.log_info(f"Python版本符合要求 ({version_str})")
        
        # 虚拟环境
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("正在使用虚拟环境")
        else:
            self.log_warning("未使用虚拟环境，建议使用虚拟环境")
        
        # Python路径
        print(f"  Python路径: {sys.executable}")
        print(f"  包搜索路径: {len(sys.path)} 个路径")
    
    def check_dependencies(self):
        """检查依赖包"""
        print("\n📦 依赖包检查:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', '未知')
                print(f"  ✅ {package}: {version}")
                
                # TODO: 版本比较逻辑
                
            except ImportError:
                self.log_issue(f"缺少依赖包: {package}")
    
    def check_system_resources(self):
        """检查系统资源"""
        print("\n💻 系统资源检查:")
        
        # 操作系统
        system_info = platform.system()
        print(f"  操作系统: {system_info} {platform.release()}")
        
        # 内存检查
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  总内存: {memory.total / 1024**3:.2f} GB")
            print(f"  可用内存: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # 小于2GB
                self.log_warning("可用内存较少，可能影响大文件处理")
        except ImportError:
            self.log_warning("无法检查内存状态（缺少psutil）")
        
        # 磁盘空间
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  磁盘空间: {free / 1024**3:.2f} GB 可用")
            
            if free < 1024**3:  # 小于1GB
                self.log_warning("磁盘空间不足")
        except Exception as e:
            self.log_warning(f"无法检查磁盘空间: {e}")
    
    def check_project_structure(self):
        """检查项目结构"""
        print("\n📁 项目结构检查:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"缺少目录: {dirname}/")
        
        # 检查关键文件
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"缺少文件: {filepath}")
    
    def check_common_issues(self):
        """检查常见问题"""
        print("\n🔍 常见问题检查:")
        
        # 检查文件编码
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  发现 {len(csv_files)} 个CSV文件")
            # TODO: 编码检查
        
        # 检查日志文件
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  发现 {len(log_files)} 个日志文件")
            
            # 检查最近的错误
            for log_file in log_files[-3:]:  # 检查最近3个日志
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  {log_file} 中发现 {len(error_lines)} 个错误")
                except Exception as e:
                    print(f"    无法读取 {log_file}: {e}")
    
    def generate_report(self):
        """生成诊断报告"""
        print("\n" + "="*50)
        print("📋 诊断报告摘要")
        print("="*50)
        
        print(f"严重问题: {len(self.issues)} 个")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\n警告信息: {len(self.warnings)} 个")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\n信息提示: {len(self.info)} 个")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # 总体状态
        if not self.issues:
            if not self.warnings:
                print("\n🎉 系统状态良好！")
            else:
                print("\n✅ 系统基本正常，建议关注警告信息")
        else:
            print("\n🚨 发现严重问题，需要修复后才能正常使用")
        
        # 保存报告
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Nav-data 诊断报告\n")
            f.write("="*50 + "\n\n")
            
            f.write("严重问题:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\n警告信息:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\n信息提示:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 详细报告已保存到: {report_file}")
    
    def run_full_diagnostic(self):
        """运行完整诊断"""
        print("🔬 Nav-data 系统诊断")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """主函数"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\n诊断被用户中断")
    except Exception as e:
        print(f"\n\n诊断过程出现异常: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### 使用诊断工具

```bash
# 运行完整诊断
python diagnose_nav_data.py

# 查看诊断报告
cat diagnostic_report_*.txt

# 基于诊断结果采取行动
# 如果有严重问题，按照报告建议进行修复
# 如果只有警告，可以继续使用但建议优化
```

## 📞 寻求帮助

### 报告问题时请提供：

1. **完整的错误信息**
2. **系统环境信息**（运行诊断工具获取）
3. **重现步骤**
4. **输入数据样例**（如可分享）
5. **预期结果 vs 实际结果**

### 联系渠道：
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [FAQ文档](./faq.md)
- [社区讨论](https://github.com/your-repo/nav-data/discussions)

---

**记住：大多数问题都有解决方案！** 🛠️ 

通过系统性的诊断和故障排除，您可以快速解决 Nav-data 使用中遇到的问题。如果问题仍然存在，请不要犹豫向社区寻求帮助。 