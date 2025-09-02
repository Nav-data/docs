# 🛠️ TFDI 导航数据转换器故障排除

## 🚨 常见错误及解决方案

### 1. 环境和安装问题

#### ❌ Python 环境问题

**错误信息：**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**解决方案：**
```bash
# 1. 验证 Python 版本
python --version  # 确保 ≥ 3.8

# 2. 升级 pip
python -m pip install --upgrade pip

# 3. 安装依赖
pip install -r requirements.txt

# 4. 验证安装
python -c "import rich, pandas; print('依赖安装成功')"
```

#### ❌ 权限错误

**错误信息：**
```
PermissionError: [Errno 13] Permission denied
无法创建输出目录
```

**解决方案：**
```bash
# Windows - 以管理员身份运行
# 右键命令提示符 → "以管理员身份运行"

# macOS/Linux - 使用 sudo 或修改权限
sudo python converter.py
# 或
chmod 755 /path/to/output/directory
```

### 2. 数据库访问问题

#### ❌ 数据库文件不存在

**错误信息：**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
无法找到 Fenix 数据库文件
```

**解决方案：**
1. **检查 Fenix 安装**：
   ```bash
   # 常见路径
   %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
   ```

2. **手动定位文件**：
   ```bash
   # Windows
   dir /s nd.db3
   
   # macOS/Linux
   find ~ -name "nd.db3" 2>/dev/null
   ```

3. **重新生成数据库**：
   - 启动 MSFS
   - 加载 Fenix A320
   - 等待导航数据加载完成

#### ❌ 数据库损坏

**错误信息：**
```
sqlite3.DatabaseError: database disk image is malformed
数据库文件已损坏
```

**诊断方法：**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ 数据库完整性正常")
        else:
            print(f"❌ 数据库损坏: {result[0]}")
    except Exception as e:
        print(f"❌ 无法访问数据库: {e}")
    finally:
        conn.close()
```

**修复方案：**
```bash
# 1. 备份损坏的数据库
cp nd.db3 nd.db3.backup

# 2. 尝试 SQLite 修复
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. 如果修复失败，重新获取数据库
# 删除文件并重新启动 Fenix
```

#### ❌ 数据库表结构不兼容

**错误信息：**
```
sqlite3.OperationalError: no such table: Terminals
数据库缺少必要的表
```

**验证脚本：**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ 缺少表: {missing_tables}")
        return False
    
    print("✅ 数据库结构验证通过")
    return True
```

### 3. 内存和性能问题

#### ❌ 内存不足

**错误信息：**
```
MemoryError: Unable to allocate array
内存不足，无法处理数据
```

**监控内存使用：**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"总内存: {memory.total // 1024**3} GB")
    print(f"已用内存: {memory.used // 1024**3} GB")
    print(f"可用内存: {memory.available // 1024**3} GB")
    print(f"使用率: {memory.percent}%")

def optimize_memory():
    # 强制垃圾回收
    gc.collect()
    
    # 清理 pandas 缓存
    import pandas as pd
    pd.reset_option('all')
```

**解决方案：**
```python
# 1. 减少批处理大小
config = ConverterConfig(
    batch_size=500,  # 从默认 1000 减少
    coordinate_precision=6  # 降低精度
)

# 2. 启用流式处理
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # 释放内存
        gc.collect()
        
        offset += chunk_size
```

#### ❌ 处理速度过慢

**症状：** 转换过程长时间停留在某个步骤

**性能诊断：**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # 执行转换
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# 分析性能瓶颈
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**优化建议：**
```python
# 1. SQLite 性能优化
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. 并行处理
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # 等待所有任务完成
        for future in futures:
            future.result()
```

### 4. 数据转换问题

#### ❌ 坐标数据异常

**错误信息：**
```
ValueError: Invalid coordinate value: latitude=91.5
坐标超出有效范围
```

**验证和修复：**
```python
def validate_and_fix_coordinates(df):
    """验证和修复坐标数据"""
    initial_count = len(df)
    
    # 检查纬度范围 [-90, 90]
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"发现 {invalid_lat.sum()} 个无效纬度值")
        df = df[~invalid_lat]
    
    # 检查经度范围 [-180, 180]
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"发现 {invalid_lon.sum()} 个无效经度值")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ 移除了 {removed_count} 个无效坐标记录")
    
    return df
```

#### ❌ JSON 序列化失败

**错误信息：**
```
TypeError: Object of type 'datetime' is not JSON serializable
JSON 序列化错误
```

**解决方案：**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """自定义 JSON 编码器"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# 使用自定义编码器
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ 字符编码问题

**错误信息：**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
字符编码错误
```

**解决方案：**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """检测并转换文件编码"""
    # 检测编码
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"检测到编码: {encoding}")
    
    # 转换为 UTF-8
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """安全的字符串处理"""
    if isinstance(text, bytes):
        # 尝试多种编码
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # 如果都失败，使用错误处理
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. 输出文件问题

#### ❌ 压缩包创建失败

**错误信息：**
```
py7zr.exceptions.Bad7zFile: not a 7z file
压缩包创建失败
```

**解决方案：**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """安全创建压缩包"""
    try:
        # 确保源目录存在
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"源目录不存在: {source_dir}")
        
        # 删除已存在的压缩包
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # 创建压缩包
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ 压缩包创建成功: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ 压缩包创建失败: {e}")
        
        # 回退方案：创建 ZIP 文件
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ 已创建 ZIP 格式备用文件")
            return True
        except Exception as zip_error:
            print(f"❌ ZIP 创建也失败: {zip_error}")
            return False
```

#### ❌ 文件大小异常

**症状：** 输出文件过小或过大

**检查方法：**
```python
def validate_output_files(output_dir):
    """验证输出文件"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # 打印文件信息
    print("📁 输出文件检查:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: 空文件")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: 文件缺失")
    
    return file_info
```

## 🔍 诊断工具

### 1. 系统环境检查

```python
def system_diagnostics():
    """系统环境诊断"""
    import platform
    import sys
    import psutil
    
    print("🔍 系统环境诊断")
    print("=" * 50)
    
    # 操作系统信息
    print(f"操作系统: {platform.system()} {platform.release()}")
    print(f"架构: {platform.machine()}")
    
    # Python 环境
    print(f"Python 版本: {sys.version}")
    print(f"Python 路径: {sys.executable}")
    
    # 硬件信息
    print(f"CPU 核心数: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"总内存: {memory.total // 1024**3} GB")
    print(f"可用内存: {memory.available // 1024**3} GB")
    
    # 磁盘空间
    disk = psutil.disk_usage('.')
    print(f"磁盘总空间: {disk.total // 1024**3} GB")
    print(f"磁盘可用空间: {disk.free // 1024**3} GB")
```

### 2. 依赖包验证

```python
def verify_dependencies():
    """验证依赖包"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 依赖包验证")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: 未安装")
        except Exception as e:
            print(f"⚠️ {package}: 错误 - {e}")
```

### 3. 性能监控工具

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """性能监控器"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """测量操作耗时"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """开始实时监控"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"内存: {memory.percent:5.1f}% | "
                      f"可用: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """停止监控"""
        self.monitoring = False
        print()  # 换行
    
    def print_summary(self):
        """打印性能摘要"""
        print("\n📊 性能摘要:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# 使用示例
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("数据库验证"):
    validate_database(db_path)

with monitor.measure("数据转换"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 故障排除清单

### 🔧 预转换检查
- [ ] Python 版本 ≥ 3.8
- [ ] 所有依赖包已安装且版本正确
- [ ] Fenix 数据库文件存在且完整
- [ ] 足够的可用内存 (推荐 4GB+)
- [ ] 足够的磁盘空间 (推荐 1GB+)
- [ ] 输出目录有写入权限

### 📊 转换过程检查
- [ ] 数据库连接成功
- [ ] 所有必需表都存在
- [ ] 坐标数据在有效范围内
- [ ] 内存使用在合理范围内
- [ ] 没有出现权限错误
- [ ] 临时文件正常创建

### 📁 后转换验证
- [ ] 所有 JSON 文件已生成
- [ ] 文件大小合理（不为空或异常大）
- [ ] JSON 格式有效
- [ ] 压缩包创建成功
- [ ] 临时文件已清理
- [ ] 日志无严重错误

## 🆘 获取帮助

### 自助诊断
1. **运行诊断工具**：
   ```python
   from tfdi_converter.diagnostics import run_full_diagnostics
   run_full_diagnostics()
   ```

2. **查看详细日志**：
   ```bash
   tail -f converter.log
   grep -i error converter.log
   ```

3. **检查系统资源**：
   ```bash
   # Windows
   taskmgr
   
   # macOS
   activity monitor
   
   # Linux
   top
   htop
   ```

### 社区支持
- **GitHub Issues**: 报告 Bug 和技术问题
- **GitHub Discussions**: 使用问题和经验分享
- **项目文档**: 查阅完整使用指南

### 报告问题时请提供：
- **完整错误日志**
- **系统环境信息**
- **转换器版本**
- **数据库信息**（大小、AIRAC 等）
- **重现步骤**
- **相关配置文件**

---

**遇到未解决的问题？** 

请在 [GitHub Issues](https://github.com/your-org/tfdi-converter/issues) 中创建新问题，我们会尽快协助解决！🚁✨
