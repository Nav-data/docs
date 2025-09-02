# ⚙️ iFly 导航数据转换器配置指南

本指南详细介绍了 iFly 导航数据转换器的各种配置选项，帮助您根据需求优化转换过程。

## 🎯 配置概览

转换器提供了灵活的配置系统，支持：
- **📁 路径配置** - 自定义输入和输出路径
- **📊 处理参数** - 调整数据处理精度和范围
- **⚡ 性能优化** - 内存和处理速度优化
- **🔍 验证选项** - 数据完整性验证设置

## 📋 配置方式

### 1. 交互式配置 (推荐)
```bash
# 运行转换器，按提示配置
python main.py
```

### 2. 配置文件
创建 `config.json` 文件：
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "ifly_path": "/path/to/ifly-aircraft-737max8",
    "terminal_id_start": 1000,
    "coordinate_precision": 8,
    "enable_validation": true
}
```

### 3. 环境变量
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 核心配置选项

### 文件路径配置

#### Fenix 数据库路径
**参数名**: `fenix_db_path`  
**描述**: Fenix A320 导航数据库文件位置  
**默认值**: 自动检测  

**常见位置:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 自定义路径示例
/Users/username/Documents/Fenix/navdata/nd.db3
```

**验证方法:**
```python
import sqlite3
def validate_fenix_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        required_tables = ['Airports', 'Runways', 'Waypoints', 'Terminals']
        return all(table in tables for table in required_tables)
    except Exception as e:
        print(f"数据库验证失败: {e}")
        return False
```

#### NAIP CSV 文件路径
**参数名**: `csv_file_path`  
**描述**: 中国民航航路段数据文件  
**格式要求**: UTF-8 编码的 CSV 文件  

**文件结构示例:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**必需列:**
- `WAYPOINT_ID`: 航路点标识符
- `LATITUDE`: 纬度 (十进制度)
- `LONGITUDE`: 经度 (十进制度)
- `ROUTE_ID`: 航路标识符

#### iFly 安装路径
**参数名**: `ifly_path`  
**描述**: iFly 737 MAX 8 安装目录  
**自动检测**: 支持  

**检测顺序:**
1. Community 包: `Community\ifly-aircraft-737max8\`
2. Official 包: `Official\asobo-aircraft-ifly-737max8\`
3. 手动指定路径

## ⚙️ 处理参数配置

### 终端程序 ID 范围

#### 起始 ID 设置
**参数名**: `terminal_id_start`  
**描述**: 终端程序起始 ID 编号  
**默认值**: `1000`  
**范围**: `1 - 9999`  

**设置建议:**
```python
# 根据机场数量设置
small_airports = 1000   # < 50 个机场
medium_airports = 2000  # 50-200 个机场  
large_airports = 5000   # > 200 个机场
```

#### ID 分配策略
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """计算终端程序 ID 分配"""
    # 每个机场预留 20 个 ID
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ 警告: ID 范围可能不足")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### 坐标精度配置

#### 精度设置
**参数名**: `coordinate_precision`  
**描述**: 坐标小数点位数  
**默认值**: `8`  
**范围**: `4 - 12`  

**精度对比:**
| 精度 | 误差范围 | 适用场景 |
|------|----------|----------|
| 4 位 | ~11 米 | 基础导航 |
| 6 位 | ~1.1 米 | 标准导航 |
| 8 位 | ~1.1 厘米 | 高精度导航 |
| 10 位 | ~1.1 毫米 | 极高精度 |

**设置示例:**
```python
# 不同精度的坐标示例
coord_4 = 39.9167  # 4 位精度
coord_6 = 39.916667  # 6 位精度  
coord_8 = 39.91666700  # 8 位精度
```

### 磁偏角计算配置

#### WMM 模型参数
**模型版本**: WMM-2025  
**更新频率**: 每 5 年  
**计算精度**: 0.1 度  

**计算参数:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # 海平面高度 (米)
    "calculation_date": "auto",  # 自动使用当前日期
    "use_local_time": true  # 使用本地时间
}
```

#### 磁偏角验证
```python
def validate_magnetic_declination(declination):
    """验证磁偏角值合理性"""
    # 全球磁偏角范围约为 -30° 到 +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ 异常磁偏角值: {declination}°")
        return False
```

## 🚀 性能优化配置

### 内存管理

#### 批处理大小
**参数名**: `batch_size`  
**描述**: 单批处理的记录数量  
**默认值**: `1000`  
**建议设置:**

```python
# 根据可用内存调整
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # 4GB 以下
    elif memory_gb < 8:
        return 1000  # 4-8GB
    else:
        return 2000  # 8GB 以上
```

#### 内存监控
```python
def monitor_memory_usage():
    """监控内存使用情况"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"内存使用率: {memory.percent}%")
    print(f"可用内存: {memory.available / (1024**2):.1f} MB")
```

### 并发处理配置

#### 线程数设置
**参数名**: `max_workers`  
**描述**: 最大并发线程数  
**默认值**: CPU 核心数  

**设置策略:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # 保留一个核心给系统
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # 最多 8 个线程
```

#### I/O 优化
```python
{
    "use_ssd_optimization": true,    # SSD 优化
    "buffer_size": 8192,            # 缓冲区大小 (字节)
    "enable_compression": false,     # 临时文件压缩
    "temp_dir": "/tmp"              # 临时目录
}
```

## 🔍 验证和质量控制

### 数据验证配置

#### 验证等级
**参数名**: `validation_level`  
**描述**: 数据验证强度  
**选项**: `basic`, `standard`, `strict`  

**验证内容:**
```python
validation_levels = {
    "basic": [
        "file_existence",
        "basic_format_check"
    ],
    "standard": [
        "file_existence", 
        "format_validation",
        "coordinate_range_check",
        "database_integrity"
    ],
    "strict": [
        "file_existence",
        "format_validation", 
        "coordinate_range_check",
        "database_integrity",
        "data_consistency_check",
        "cross_reference_validation"
    ]
}
```

#### 错误处理策略
**参数名**: `error_handling`  
**选项**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "遇到错误立即停止",
    "skip": "跳过错误记录继续处理", 
    "fix": "尝试自动修复错误"
}
```

### 输出质量控制

#### 文件命名规则
```python
output_naming = {
    "use_timestamp": true,          # 使用时间戳
    "include_version": true,        # 包含版本号
    "airac_suffix": true,          # 添加 AIRAC 后缀
    "backup_original": true        # 备份原始文件
}

# 生成的文件名示例:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 AIRAC 周期配置

### 自动计算设置
**参数名**: `airac_auto_calculate`  
**默认值**: `true`  
**时区**: UTC+8 (北京时间)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # AIRAC 2401 起始日期
    "cycle_days": 28,                # 标准周期天数
    "format": "YYWW"                # 格式: 年年周周
}
```

### 手动设置
```python
# 手动指定 AIRAC 周期
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ 高级配置

### 日志配置
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # 日志文件名
    "max_size": "10MB",           # 最大文件大小
    "backup_count": 3,            # 备份文件数量
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### 界面配置
```python
ui_config = {
    "theme": "dark",              # 主题: dark, light, auto
    "progress_style": "bar",      # 进度条样式: bar, spinner
    "color_scheme": "rich",       # 配色方案
    "show_details": true,         # 显示详细信息
    "animation": true            # 启用动画效果
}
```

### 调试配置
```python
debug_config = {
    "enable_debug": false,        # 启用调试模式
    "save_intermediate": false,   # 保存中间结果
    "verbose_logging": false,     # 详细日志
    "performance_profiling": false, # 性能分析
    "memory_tracking": false     # 内存跟踪
}
```

## 📝 配置文件模板

### 完整配置示例
```json
{
    "paths": {
        "fenix_db_path": "auto_detect",
        "csv_file_path": "./data/RTE_SEG.csv",
        "ifly_path": "auto_detect",
        "output_backup_dir": "./backup"
    },
    "processing": {
        "terminal_id_start": 1000,
        "coordinate_precision": 8,
        "batch_size": 1000,
        "max_workers": 4
    },
    "magnetic": {
        "model_year": 2025,
        "altitude": 0,
        "use_local_time": true
    },
    "airac": {
        "auto_calculate": true,
        "timezone": "Asia/Shanghai",
        "format": "YYWW"
    },
    "validation": {
        "validation_level": "standard",
        "error_handling": "skip",
        "enable_validation": true
    },
    "output": {
        "use_timestamp": true,
        "include_version": true,
        "airac_suffix": true,
        "backup_original": true
    },
    "logging": {
        "level": "INFO",
        "file": "converter.log",
        "max_size": "10MB",
        "backup_count": 3
    },
    "ui": {
        "theme": "dark",
        "progress_style": "bar",
        "show_details": true,
        "animation": true
    }
}
```

### 最小配置示例
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ 配置工具

### 配置验证脚本
```python
def validate_config(config_path):
    """验证配置文件有效性"""
    import json
    import jsonschema
    
    # 配置架构
    schema = {
        "type": "object",
        "properties": {
            "fenix_db_path": {"type": "string"},
            "csv_file_path": {"type": "string"},
            "terminal_id_start": {"type": "integer", "minimum": 1, "maximum": 9999}
        },
        "required": ["fenix_db_path", "csv_file_path"]
    }
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        jsonschema.validate(config, schema)
        print("✅ 配置验证通过")
        return True
    except Exception as e:
        print(f"❌ 配置验证失败: {e}")
        return False
```

### 配置生成器
```python
def generate_config_template():
    """生成配置模板"""
    template = {
        "fenix_db_path": "请输入 Fenix 数据库路径",
        "csv_file_path": "请输入 CSV 文件路径", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("配置模板已生成: config_template.json")
```

---

**下一步**: 配置完成后，请查看 [使用说明](usage.md) 开始您的第一次数据转换！🚀
