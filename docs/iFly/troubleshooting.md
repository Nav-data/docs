# 🛠️ iFly 导航数据转换器故障排除

## 🚨 常见错误及解决方案

### 1. 安装和环境问题

#### ❌ Python 版本不兼容

**错误信息：**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**解决方案：**
1. **检查 Python 版本**：
   ```bash
   python --version
   ```
2. **升级到 Python 3.8+**：
   - Windows: 从 python.org 下载最新版本
   - macOS: `brew install python`
   - Linux: `sudo apt-get install python3.9`

#### ❌ 依赖包安装失败

**错误信息：**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**解决方案：**
1. **升级 pip**：
   ```bash
   python -m pip install --upgrade pip
   ```
2. **清除缓存重新安装**：
   ```bash
   pip cache purge
   pip install -r requirements.txt --no-cache-dir
   ```
3. **使用国内镜像源**：
   ```bash
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
   ```

### 2. 文件和路径问题

#### ❌ 找不到 Fenix 数据库文件

**错误信息：**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
数据库文件不存在或路径错误
```

**解决方案：**
1. **确认文件位置**：
   ```bash
   # 常见位置
   %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
   ```
2. **使用绝对路径**：输入完整的文件路径
3. **检查文件权限**：确保文件可读

#### ❌ iFly 安装路径检测失败

**错误信息：**
```
未找到 iFly 737 MAX 8 安装路径
请手动指定 iFly 安装目录
```

**解决方案：**
1. **手动输入路径**：
   ```
   # Community 版本
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
   
   # Marketplace 版本
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
   ```
2. **验证路径结构**：确认包含 `Data\navdata\` 目录

#### ❌ 文件写入权限不足

**错误信息：**
```
PermissionError: [Errno 13] Permission denied
无法写入文件
```

**解决方案：**
1. **以管理员身份运行**：
   - Windows: 右键 → "以管理员身份运行"
   - macOS/Linux: `sudo python main.py`
2. **修改文件权限**：
   ```bash
   chmod 755 /path/to/ifly/directory
   ```
3. **检查文件是否被占用**：关闭 MSFS 和其他相关程序

### 3. 数据处理问题

#### ❌ CSV 文件格式错误

**错误信息：**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**解决方案：**
1. **检查文件编码**：
   ```python
   # 转换为 UTF-8
   import chardet
   with open('file.csv', 'rb') as f:
       encoding = chardet.detect(f.read())['encoding']
   ```
2. **验证 CSV 格式**：确保包含必要的列
3. **重新下载数据**：获取新的 NAIP 数据文件

#### ❌ 磁偏角计算失败

**错误信息：**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
磁偏角计算出现异常
```

**解决方案：**
1. **检查坐标范围**：
   - 纬度: -90° 到 +90°
   - 经度: -180° 到 +180°
2. **更新 pygeomag**：
   ```bash
   pip install --upgrade pygeomag
   ```
3. **验证日期有效性**：确保 AIRAC 日期在合理范围内

#### ❌ AIRAC 周期计算错误

**错误信息：**
```
ValueError: Invalid AIRAC cycle calculation
AIRAC 周期计算失败
```

**解决方案：**
1. **检查系统时间**：确保系统时间正确
2. **手动设置周期**：
   ```python
   # 手动指定 AIRAC 周期
   airac_cycle = "2508"
   ```
3. **更新时区信息**：确保正确的时区设置

### 4. 内存和性能问题

#### ❌ 内存不足

**错误信息：**
```
MemoryError: Unable to allocate array
内存不足，无法处理大型数据文件
```

**解决方案：**
1. **增加虚拟内存**：
   - Windows: 控制面板 → 系统 → 高级系统设置 → 性能设置 → 虚拟内存
2. **分批处理**：
   ```python
   # 分批读取数据
   chunk_size = 1000
   for chunk in pd.read_csv(file, chunksize=chunk_size):
       process_chunk(chunk)
   ```
3. **关闭其他程序**：释放系统内存

#### ❌ 处理速度过慢

**现象：** 磁偏角计算耗时过长

**优化方案：**
1. **硬件优化**：
   - 使用 SSD 硬盘
   - 增加 RAM 到 8GB+
   - 使用多核 CPU
2. **软件优化**：
   ```python
   # 并行处理
   from concurrent.futures import ThreadPoolExecutor
   with ThreadPoolExecutor(max_workers=4) as executor:
       results = executor.map(calculate_declination, coordinates)
   ```
3. **减少数据量**：过滤不必要的航路点

### 5. 输出和验证问题

#### ❌ 转换后数据在 iFly 中不显示

**可能原因：**
- 文件格式不正确
- 数据覆盖规则问题
- iFly 缓存未清除

**解决方案：**
1. **验证文件格式**：
   ```bash
   # 检查文件内容
   head -n 10 WPNAVRTE.txt
   ```
2. **清除 iFly 缓存**：
   ```bash
   # 删除缓存文件
   rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
   ```
3. **重启模拟器**：完全退出并重新启动 MSFS

#### ❌ FMC 中航路点显示异常

**现象：** 航路点坐标偏移或类型错误

**检查步骤：**
1. **验证坐标格式**：
   ```
   # 正确格式
   123.45678  # 经度 (°)
   -12.34567  # 纬度 (°)
   ```
2. **检查航路点类型**：
   ```
   11 - DESIGNATED_POINT (指定点)
   3  - VOR/DME
   2  - NDB
   ```
3. **验证磁偏角值**：
   ```
   # 合理范围
   -30.0 到 +30.0 度
   ```

## 🔍 诊断工具

### 1. 日志分析

**查看详细日志：**
```bash
# 查看最新日志
tail -f converter.log

# 搜索错误信息
grep "ERROR" converter.log
grep "Exception" converter.log
```

**日志级别说明：**
- `DEBUG`: 详细调试信息
- `INFO`: 一般信息
- `WARNING`: 警告信息
- `ERROR`: 错误信息
- `CRITICAL`: 严重错误

### 2. 数据验证脚本

**创建验证脚本：**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """验证数据库完整性"""
    conn = sqlite3.connect(db_path)
    
    # 检查必要的表
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"缺失表格: {missing_tables}")
        return False
    
    print("数据库验证通过")
    return True

# 使用示例
validate_database("path/to/nd.db3")
```

### 3. 系统信息收集

**创建系统信息报告：**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """生成系统信息报告"""
    report = []
    
    # 系统信息
    report.append("=== 系统信息 ===")
    report.append(f"操作系统: {platform.system()} {platform.release()}")
    report.append(f"架构: {platform.machine()}")
    report.append(f"Python 版本: {sys.version}")
    
    # 已安装包
    report.append("\n=== 已安装包 ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# 生成报告
print(generate_system_report())
```

## 📋 故障排除清单

### 🔧 基础检查
- [ ] Python 版本 ≥ 3.8
- [ ] 所有依赖包已安装
- [ ] Fenix 数据库文件存在且可读
- [ ] iFly 737 MAX 8 已正确安装
- [ ] 足够的磁盘空间 (≥ 100MB)
- [ ] 足够的内存 (≥ 4GB)

### 📁 路径验证
- [ ] Fenix 数据库路径正确
- [ ] iFly 安装路径正确
- [ ] CSV 数据文件路径正确
- [ ] 输出目录有写入权限

### 📊 数据检查
- [ ] CSV 文件格式正确 (UTF-8 编码)
- [ ] 数据库表结构完整
- [ ] 坐标数据在有效范围内
- [ ] AIRAC 周期计算正确

### 🔄 处理验证
- [ ] 日志文件无 ERROR 级别信息
- [ ] 输出文件已生成
- [ ] 文件大小合理 (不为 0)
- [ ] iFly 中数据正确显示

## 🆘 获取帮助

### 自助解决
1. **查阅文档**：阅读完整的用户指南
2. **搜索日志**：查找具体错误信息
3. **检查 FAQ**：查看常见问题解答
4. **重现问题**：确认问题可重现

### 社区支持
1. **GitHub Issues**：报告技术问题
2. **讨论论坛**：参与社区讨论
3. **QQ 群/微信群**：实时交流解答

### 报告问题时请提供：
- **错误日志**：完整的错误信息
- **系统信息**：OS、Python 版本等
- **重现步骤**：详细的操作步骤
- **文件信息**：相关文件的大小和路径
- **截图**：必要时提供界面截图

---

**记住：大多数问题都有解决方案！** 

遇到困难时，先深呼吸，然后按照这个指南逐步排查。🔧✨
