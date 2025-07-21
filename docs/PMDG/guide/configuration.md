# ⚙️ 配置说明

本指南详细介绍如何配置 Nav-data 的数据源、文件路径和处理参数，确保工具能够正确处理您的航空导航数据。

## 📋 配置概览

Nav-data 需要配置以下类型的数据源：
- **NAIP 数据** - 中国民航信息处理系统数据 (CSV格式)
- **X-Plane 数据** - X-Plane 导航数据文件 (DAT格式)
- **CIFP 数据** - 编码仪表飞行程序数据 (DAT格式)
- **输出配置** - 生成的数据库和日志文件位置

## 🗂️ 数据源详解

### 1. NAIP 数据源 (中国民航数据)

NAIP (National Aeronautical Information Processing) 数据包含中国地区的官方航空信息：

#### 必需文件列表
```
data/input/naip/
├── AD_HP.csv              # 机场基础数据 (机场位置、磁差)
├── RWY_DIRECTION.csv      # 跑道方向信息
├── RWY.csv                # 跑道详细信息 (长度、宽度、表面)
└── RTE_SEG.csv            # 航路段数据
```

#### 文件格式要求
- **编码**: Latin-1 (ISO-8859-1)
- **分隔符**: 逗号 (,)
- **换行符**: Windows (CRLF) 或 Unix (LF)

#### 关键字段说明

**AD_HP.csv** - 机场数据:
- `CODE_ID`: 4字母ICAO代码 (如: ZBAA)
- `GEO_LAT_ACCURACY`: 纬度 (DMS格式: N390308.00)
- `GEO_LONG_ACCURACY`: 经度 (DMS格式: E1162930.00)
- `VAL_MAG_VAR`: 磁差值

**RWY.csv** - 跑道数据:
- `CODE_ID`: 机场ICAO代码
- `TXT_DESIG`: 跑道标识符 (如: 18L/36R)
- `VAL_LEN`: 跑道长度 (米)
- `VAL_WID`: 跑道宽度 (米)

**RTE_SEG.csv** - 航路数据:
- `TXT_DESIG`: 航路标识符 (如: A1, G212)
- `CODE_POINT_START`: 起点标识符
- `CODE_TYPE_START`: 点类型 (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: 磁航向 (度)
- `VAL_LEN`: 航段长度 (公里)

### 2. X-Plane 数据源

X-Plane 提供高质量的导航数据，支持全球范围：

#### 必需文件
```
data/input/xplane/
├── earth_fix.dat          # 全球航路点数据
└── earth_nav.dat          # VOR/DME/NDB/ILS数据
```

#### 数据格式说明

**earth_fix.dat** 格式:
```
纬度 经度 标识符 地区代码 ICAO代码 类型
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** 格式:
```
类型 纬度 经度 高程 频率 航程 磁差 标识符 地区代码 ICAO代码 名称 设备类型
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### 支持的ICAO地区代码
```python
# 目前支持的中国地区代码
VALID_ICAO_CODES = {
    'ZB',  # 华北地区
    'ZG',  # 广州地区  
    'ZS',  # 上海地区
    'ZJ',  # 新疆地区
    'ZY',  # 中南地区
    'ZL',  # 兰州地区
    'ZH',  # 黑龙江地区
    'ZU',  # 乌鲁木齐地区
    'ZP',  # 昆明地区
    'ZW'   # 西藏地区
}
```

### 3. CIFP 数据源 (飞行程序)

CIFP (Coded Instrument Flight Procedures) 包含标准仪表飞行程序：

#### 文件结构
```
data/input/cifp/
├── ZBAA.dat              # 北京首都机场程序
├── ZSPD.dat              # 上海浦东机场程序
├── ZGGG.dat              # 广州白云机场程序
└── [机场ICAO代码].dat     # 其他机场程序文件
```

#### 程序类型
- **SID** - 标准仪表离场程序
- **STAR** - 标准终端到达程序  
- **APPCH** - 仪表进近程序

#### 数据格式示例
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. 参考数据文件

#### 机场名称查找文件
```
data/input/Airport.dat

格式：
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 配置文件设置

### 1. 路径配置

每个Python模块都包含路径配置，需要根据您的实际环境调整：

#### PMDG_APT.py 配置示例
```python
# 机场数据处理配置
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### PMDG_RUNWAY.py 配置示例
```python
# 跑道数据处理配置
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### 程序数据配置示例
```python
# SID/STAR/APPCH 程序配置
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. 创建配置管理脚本

为便于管理，建议创建统一的配置文件：

```python
# config/paths.py
import os

# 基础路径
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# NAIP 数据路径
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# X-Plane 数据路径
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# CIFP 数据路径
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# 输出文件路径
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# 参考文件
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# 日志文件路径
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# MSFS 安装路径 (需要用户自定义)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ 性能配置

### 1. 内存优化设置

对于大型数据集，可以调整批处理大小：

```python
# PMDG_TMA_WAYPOINT.py 中的批处理配置
BATCH_SIZE = 1000  # 默认批大小
MAX_MEMORY_MB = 2048  # 最大内存使用 (MB)

# 根据可用内存调整
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. 并发处理配置

```python
# PMDG_AWY_FINAL.py 中的并发设置
MAX_WORKERS = 50  # 最大并发线程数

# 根据CPU核心数调整
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. 数据库优化设置

```python
# SQLite 性能优化设置
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # 兼容模式
    'synchronous': 'FULL',       # 完全同步
    'foreign_keys': 'ON',        # 启用外键约束
    'cache_size': 10000,         # 缓存页数
    'temp_store': 'MEMORY'       # 临时表存储在内存中
}
```

## 🗺️ 地理坐标系配置

### 1. 坐标格式转换

Nav-data 支持多种坐标格式的转换：

```python
# DMS (度分秒) 格式转换配置
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # 如: N390308.00
    'longitude': 'EDDDMMSS.ss'  # 如: E1162930.00
}

# 精度配置
COORDINATE_PRECISION = 8  # 小数点后位数
```

### 2. 磁差计算配置

```python
# 磁差模型配置
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 数据验证配置

### 1. 数据质量检查

```python
# 数据验证配置
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# ICAO代码验证
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# 坐标范围验证 (中国地区)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 北纬15°-55°
    'longitude': {'min': 70.0, 'max': 140.0}  # 东经70°-140°
}
```

### 2. 错误处理配置

```python
# 错误处理策略
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 调试配置

### 1. 日志级别设置

```python
# 日志配置
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # 单个日志文件大小
    'backup_count': 5,          # 保留的备份文件数
    'encoding': 'utf-8'
}
```

### 2. 进度显示配置

```python
# 进度条配置
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # 更新间隔 (记录数)
    'show_eta': True,           # 显示预计完成时间
    'show_rate': True           # 显示处理速率
}
```

## ✅ 配置验证

创建配置验证脚本来检查配置的正确性：

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """验证配置文件的完整性和正确性"""
    
    print("🔍 验证配置文件...")
    
    # 检查必需目录
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ 缺少目录: {dir_path}")
            return False
        print(f"✅ 目录存在: {dir_path}")
    
    # 检查必需的输入文件
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ 文件存在: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ 缺少必需文件:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ 配置验证通过！")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 配置问题排查

### 常见配置问题

1. **路径分隔符问题**
   - Windows: 使用反斜杠 `\` 或原始字符串 `r'path'`
   - macOS/Linux: 使用正斜杠 `/`

2. **文件编码问题**
   - CSV文件: 确保使用 Latin-1 编码
   - DAT文件: 通常为 UTF-8 编码

3. **权限问题**
   - 确保对所有配置路径有读写权限
   - Windows: 可能需要管理员权限

4. **路径长度限制**
   - Windows: 路径总长度不超过260字符
   - 使用相对路径减少长度

---

**下一步**: 阅读[使用说明](usage.md)了解如何运行数据转换流程。 