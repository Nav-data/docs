# 配置说明

本文档详细说明了 Nav-data 各个模块的配置选项和参数设置。

## 📋 配置文件概览

### 主要配置文件
```
config/
├── main.conf           # 主配置文件
├── airway.conf         # 航路处理配置
├── pdf_extract.conf    # PDF提取配置
├── terminal.conf       # 终端程序配置
└── paths.conf          # 路径配置
```

### 环境变量配置
```bash
# .env 文件示例
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ 航路模块配置 (Airway)

### 配置文件：`config/airway.conf`

```ini
[General]
# 启用详细日志
verbose_logging = true

# 进度条显示
show_progress = true

# 批处理大小
batch_size = 1000

[Input]
# CSV 输入文件路径
csv_file = RTE_SEG.csv

# X-Plane 参考数据文件
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# 输出文件编码
output_encoding = utf-8

# 备份原始文件
create_backup = true

# 备份文件后缀
backup_suffix = .backup

[Filtering]
# 排除的空域区域代码（逗号分隔）
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# 最小航路段长度（海里）
min_segment_length = 0.1

# 最大航路段长度（海里）
max_segment_length = 999.9

[Validation]
# 启用数据验证
enable_validation = true

# 导航点容差（度）
coordinate_tolerance = 0.001

# 区域代码验证
validate_area_codes = true

[AIRAC]
# 自动计算 AIRAC 周期
auto_calculate_cycle = true

# 手动指定 AIRAC 周期（格式：YYMM）
manual_cycle = 

# AIRAC 基准日期（ISO格式）
reference_date = 2025-01-23

# 基准周期
reference_cycle = 2501
```

### 代码中的配置选项

#### 航路处理主脚本配置
```python
# Airway/airway.py 配置示例

# 中国空域代码配置
CHINA_AREAS = {
    'ZB',  # 北京飞行情报区
    'ZG',  # 广州飞行情报区
    'ZY',  # 沈阳飞行情报区
    'ZS',  # 上海飞行情报区
    'ZW',  # 乌鲁木齐飞行情报区
    'ZJ',  # 三亚飞行情报区
    'ZP',  # 兰州飞行情报区
    'ZL',  # 昆明飞行情报区
    'ZH',  # 武汉飞行情报区
    'ZU'   # 成都飞行情报区
}

# 文件路径配置
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# 导航点类型映射
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 PDF 提取模块配置

### 配置文件：`config/pdf_extract.conf`

```ini
[General]
# 处理模式：auto（自动）、manual（手动）
processing_mode = auto

# 输出格式：txt、json、csv
output_format = txt

# 字符编码
encoding = utf-8

[PDF_Processing]
# PDF 解析引擎：pdfplumber、pypdf2
pdf_engine = pdfplumber

# 页面裁剪边距（像素）
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# 文本提取阈值
text_confidence_threshold = 0.8

# 线条检测阈值
line_detection_threshold = 5

[Coordinate_Extraction]
# 坐标格式验证
coordinate_format_strict = true

# 坐标精度（小数位数）
coordinate_precision = 8

# 坐标范围验证（中国区域）
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# 遇到错误时继续处理
continue_on_error = true

# 错误日志详细程度
error_detail_level = high

# 自动修复常见错误
auto_fix_common_errors = true

[Output]
# 输出文件命名模式
# 变量：{airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# 创建输出目录
create_output_dirs = true

# 覆盖现有文件
overwrite_existing = false
```

### 代码配置示例

#### PDF 处理配置
```python
# PDF extract/utils.py 配置

# 航路点类别定义
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # 航路点
    'VHF': 2,       # VHF 导航台
    'NDB': 3,       # NDB 导航台
    'TERMINAL': 4   # 终端区航路点
}

# 坐标处理精度
COORDINATE_PRECISION = 8

# 区域代码转换表
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # 特殊区域代码转换
}

# 错误信息颜色配置（使用 colorama）
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### 坐标提取配置
```python
# PDF extract/waypoint_1_pdf.py 配置

# 页面处理设置
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# 坐标计算设置
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# 字符处理设置
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 终端程序配置 (Terminal Patch)

### 配置文件：`config/terminal.conf`

```ini
[Encoder]
# 默认输入路径
default_input_path = PDF extract/public

# 默认输出路径
default_output_path = PDF extract/output

# 文件编码
file_encoding = utf-8

# 启用编码验证
enable_encoding_validation = true

[Processing_Rules]
# IF 点识别规则
if_point_markers = c

# 编码规则
encoding_rules = {
    'if_line': 'E  A',
    'transition_middle': 'E   ',
    'transition_end': 'EE B',
    'main_approach_if': 'E  B',
    'faf_point': 'E  F',
    'missed_approach': 'E M ',
    'procedure_end': 'EE  ',
    'holding_end': 'EE H'
}

[ReEncoder]
# 支持的机场代码前缀
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# 文件编码检测
auto_detect_encoding = true

# 编码修复规则
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# 格式验证
validate_format = true

# 跑道标识符验证
validate_runway_identifiers = true

# 程序类型验证
validate_procedure_types = true
```

### 编码器配置示例

```python
# Terminal Patch/terminal_encoder.py 配置

# 程序类型标识
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# 编码映射
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B', 
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}

# 文件处理设置
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ X-Plane CIFP 模块配置

### 配置文件：`config/cifp.conf`

```ini
[General]
# X-Plane 版本兼容性
xplane_version = 12

# CIFP 数据格式版本
cifp_format_version = 1101

[Paths]
# 输入数据路径
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# 输出文件夹
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# X-Plane 安装路径
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# CSV 数据文件夹
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# 处理程序类型
process_departures = true
process_arrivals = true
process_approaches = true

# 跑道信息处理
generate_runway_info = true

# 程序混合模式
enable_procedure_mixing = true

[NavAid_Processing]
# VOR 数据文件
vor_data_file = VOR.csv

# NDB 数据文件  
ndb_data_file = NDB.csv

# 频率处理
frequency_conversion = true

# 高度单位转换（米转英尺）
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# 航路点类型编码
waypoint_type_coding = true

# ARINC 424 兼容性
arinc424_compatibility = true

# 区域代码处理
process_area_codes = true

[Validation]
# 坐标验证容差
coordinate_tolerance = 0.2

# 航路点标识符验证
validate_identifiers = true

# 程序完整性检查
validate_procedure_integrity = true
```

### 航路点系统配置

```python
# X-Plane CIFP/utils.py 配置

# 航路点类别定义
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # 状态不可用
    'WAYPOINT': 1,      # 航路点
    'VHF_NAVAID': 2,    # VHF 导航设备
    'NDB_NAVAID': 3     # NDB 导航设备
}

# 坐标比较容差（度）
COORDINATE_TOLERANCE = 0.2

# 区域代码映射
AREA_CODE_MAPPING = {
    # 中国飞行情报区代码
    'ZBPE': 'ZB',  # 北京
    'ZGZU': 'ZG',  # 广州
    'ZYSH': 'ZY',  # 沈阳
    'ZSHA': 'ZS',  # 上海
    'ZWUQ': 'ZW',  # 乌鲁木齐
    'ZJSA': 'ZJ',  # 三亚
    'ZLHW': 'ZL',  # 兰州
    'ZUCK': 'ZU',  # 成都
    'ZHWH': 'ZH'   # 武汉
}
```

## 📊 数据处理配置

### CSV 数据配置

```python
# 通用 CSV 处理配置
CSV_CONFIG = {
    'encoding': 'gbk',          # 中文 CSV 通常使用 GBK 编码
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# 必需的 CSV 字段
REQUIRED_CSV_FIELDS = {
    'airway': [
        'CODE_POINT_START', 'CODE_TYPE_START',
        'CODE_POINT_END', 'CODE_TYPE_END', 
        'CODE_DIR', 'TXT_DESIG'
    ],
    'airport': [
        'CODE_AIRPORT', 'GEO_LAT', 'GEO_LONG', 
        'ELEVATION', 'TXT_NAME'
    ],
    'runway': [
        'CODE_AIRPORT', 'TXT_DESIG', 'GEO_LAT_START',
        'GEO_LONG_START', 'GEO_LAT_END', 'GEO_LONG_END'
    ]
}
```

### 数据库配置
```python
# X-Plane CIFP/数据库.py 配置

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # SQLite 优化
    'synchronous': 'NORMAL'
}

# 数据表结构
TABLE_SCHEMAS = {
    'waypoints': {
        'id': 'INTEGER PRIMARY KEY',
        'ident': 'TEXT NOT NULL',
        'latitude': 'REAL NOT NULL', 
        'longitude': 'REAL NOT NULL',
        'type': 'INTEGER',
        'airport': 'TEXT',
        'area': 'TEXT'
    }
}
```

## 🔧 日志配置

### 日志配置文件：`config/logging.conf`

```ini
[loggers]
keys=root,airway,pdf_extract,terminal,cifp

[handlers] 
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=standardFormatter,detailedFormatter

[logger_root]
level=INFO
handlers=consoleHandler,rotatingFileHandler

[logger_airway]
level=DEBUG
handlers=fileHandler
qualname=airway
propagate=0

[logger_pdf_extract]
level=INFO
handlers=fileHandler
qualname=pdf_extract
propagate=0

[logger_terminal]
level=INFO
handlers=fileHandler
qualname=terminal
propagate=0

[logger_cifp]
level=DEBUG
handlers=fileHandler
qualname=cifp
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=standardFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=detailedFormatter
args=('logs/nav-data.log', 'a')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=INFO
formatter=standardFormatter
args=('logs/nav-data-rotating.log', 'a', 10485760, 5)

[formatter_standardFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %H:%M:%S

[formatter_detailedFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s() - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
```

### Python 日志配置示例

```python
import logging
import logging.config
from pathlib import Path

# 加载日志配置
def setup_logging(config_path='config/logging.conf'):
    """设置日志配置"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # 默认配置
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# 各模块日志器
def get_logger(name):
    """获取模块专用日志器"""
    return logging.getLogger(name)

# 使用示例
logger = get_logger('airway')
logger.info('航路处理开始')
```

## ⚙️ 性能优化配置

### 内存管理配置
```python
# 内存使用优化
MEMORY_CONFIG = {
    'chunk_size': 10000,        # 分块处理大小
    'max_memory_usage': '2GB',  # 最大内存使用
    'garbage_collection': True, # 启用垃圾回收
    'buffer_size': 8192        # 文件读取缓冲区
}

# 并发处理配置
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # 最大工作线程数
    'enable_multiprocessing': False, # 多进程处理
    'thread_pool_size': 2       # 线程池大小
}
```

### 缓存配置
```python
# 缓存设置
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # 缓存生存时间（秒）
    'cache_directory': 'cache/'
}
```

## 🔍 配置验证

### 配置验证脚本

创建 `validate_config.py`：

```python
#!/usr/bin/env python3
"""
配置文件验证脚本
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """验证航路模块配置"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # 检查必需的节
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"缺失配置节: [{section}]")
    
    # 检查文件路径
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"文件不存在: {file_path}")
    
    return errors

def validate_all_configs():
    """验证所有配置文件"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ 配置目录不存在")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # 可以添加更多配置验证函数
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} 配置错误:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} 配置正确")
        else:
            print(f"⚠️  {config_file} 配置文件不存在（使用默认值）")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 所有配置验证通过！")
        sys.exit(0)
    else:
        print("\n❌ 配置验证失败，请修复上述问题")
        sys.exit(1)
```

## 📚 配置最佳实践

### 1. 配置文件管理
- 使用版本控制管理配置文件
- 为不同环境创建不同的配置文件
- 定期备份重要配置

### 2. 安全考虑
- 不要在配置文件中存储敏感信息
- 使用环境变量存储路径等可变信息
- 设置适当的文件权限

### 3. 性能优化
- 根据系统资源调整批处理大小
- 合理设置内存使用限制
- 启用适当的缓存机制

### 4. 错误处理
- 为所有关键配置项设置默认值
- 实现配置验证机制
- 提供清晰的错误信息

---

**配置完成！** 🎯 现在您可以根据具体需求调整各模块的配置参数。建议在首次使用前运行配置验证脚本确保设置正确。 