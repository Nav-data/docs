# ⚙️ TFDI 导航数据转换器配置指南

本指南详细介绍了 TFDI 导航数据转换器的各种配置选项，帮助您根据需求优化转换过程和输出结果。

## 🎯 配置概览

TFDI 转换器采用灵活的配置系统，支持：
- **📁 输出配置** - 自定义输出目录和文件格式
- **📊 数据处理参数** - 调整坐标精度和数据过滤
- **⚡ 性能优化** - 内存管理和处理速度调优
- **🔍 验证选项** - 数据完整性和质量控制设置

## 📋 配置方式

### 1. 默认配置 (推荐新手)
```python
# 使用默认配置运行
python Fenix2TFDINavDataConverter.py
# 转换器将使用预设的最佳配置
```

### 2. 代码内配置
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """转换器配置类"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. 交互式配置
```python
# 转换器运行时的交互式配置
# 用户可以在运行过程中设置关键参数
```

## 🔧 核心配置选项

### 输出路径配置

#### 输出目录设置
**参数名**: `output_dir`  
**默认值**: `"Primary"`  
**描述**: 所有 JSON 文件的输出目录

**使用示例:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # 自定义输出目录名
)
```

**目录结构:**
```
TFDI_NavData/           # 主输出目录
├── Airports.json       # 机场数据
├── Runways.json        # 跑道数据
├── Waypoints.json      # 航路点数据
├── ...                 # 其他 JSON 文件
└── ProcedureLegs/      # 程序段子目录
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### 程序段目录
**参数名**: `procedure_legs_dir`  
**默认值**: `"Primary/ProcedureLegs"`  
**描述**: 终端程序段文件的输出目录

**配置示例:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # 自定义程序段目录
)
```

#### 压缩包名称
**参数名**: `archive_name`  
**默认值**: `"Primary.7z"`  
**描述**: 最终生成的压缩包文件名

**命名规范:**
```python
# 包含时间戳的命名
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# 包含版本信息的命名
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### 数据处理配置

#### 坐标精度设置
**参数名**: `coordinate_precision`  
**默认值**: `8`  
**范围**: `4 - 12`  
**描述**: 地理坐标的小数点位数

**精度对比表:**
| 精度 | 误差范围 | 适用场景 | 文件大小影响 |
|------|----------|----------|--------------|
| 4 位 | ~11 米 | 基础导航 | 最小 |
| 6 位 | ~1.1 米 | 标准导航 | 小 |
| 8 位 | ~1.1 厘米 | 高精度导航 | 默认 |
| 10 位 | ~1.1 毫米 | 极高精度 | 大 |
| 12 位 | ~0.1 毫米 | 测量级精度 | 最大 |

**配置示例:**
```python
# 高精度配置 (推荐)
config = ConverterConfig(coordinate_precision=8)

# 平衡配置 (文件更小)
config = ConverterConfig(coordinate_precision=6)

# 极高精度配置 (文件更大)
config = ConverterConfig(coordinate_precision=10)
```

#### VNAV 阈值设置
**参数名**: `vnav_threshold`  
**默认值**: `2.5`  
**单位**: 度  
**描述**: FAF 点检测的 VNAV 角度阈值

**阈值含义:**
```python
# 严格的 FAF 检测 (更少但更准确的 FAF 点)
config = ConverterConfig(vnav_threshold=2.0)

# 标准 FAF 检测 (平衡准确性和覆盖率)
config = ConverterConfig(vnav_threshold=2.5)

# 宽松的 FAF 检测 (更多 FAF 点，可能包含误检)
config = ConverterConfig(vnav_threshold=3.0)
```

**FAF 检测逻辑:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """判断是否为 FAF 点"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 性能配置

### SQLite 数据库优化

#### 数据库连接设置
```python
# SQLite 性能优化配置
sqlite_pragmas = {
    "journal_mode": "WAL",          # 写前日志模式
    "synchronous": "NORMAL",        # 平衡性能和安全性
    "cache_size": "10000",          # 缓存页数 (约 40MB)
    "temp_store": "MEMORY",         # 临时数据存储在内存
    "mmap_size": "268435456",       # 内存映射大小 (256MB)
}

def optimize_database_connection(conn):
    """优化数据库连接"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### 批处理设置
**参数**: 批处理大小  
**默认值**: `1000`  
**描述**: 单次处理的记录数量

**配置策略:**
```python
import psutil

def get_optimal_batch_size():
    """根据系统内存自动调整批处理大小"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # 低内存系统
    elif available_memory_gb < 8:
        return 1000     # 标准配置
    else:
        return 2000     # 高内存系统

# 使用示例
batch_size = get_optimal_batch_size()
```

### 内存管理配置

#### 内存监控设置
```python
class MemoryMonitor:
    """内存监控配置"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # 内存使用限制
        self.warning_threshold = 0.8    # 警告阈值 (80%)
        self.critical_threshold = 0.9   # 危险阈值 (90%)
    
    def check_memory_usage(self):
        """检查内存使用情况"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### 垃圾回收配置
```python
import gc

def configure_garbage_collection():
    """配置垃圾回收"""
    # 设置垃圾回收阈值
    gc.set_threshold(700, 10, 10)
    
    # 启用垃圾回收调试 (仅调试时使用)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """强制清理内存"""
    gc.collect()
    gc.collect()  # 运行两次确保彻底清理
    gc.collect()
```

## 🔍 验证和质量控制

### 数据验证配置

#### 验证级别设置
```python
class ValidationConfig:
    """数据验证配置"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """根据级别获取检查项目"""
        base_checks = [
            "file_exists",
            "database_format", 
            "required_tables"
        ]
        
        if level == "basic":
            return base_checks
        
        elif level == "standard":
            return base_checks + [
                "coordinate_ranges",
                "data_types",
                "foreign_keys"
            ]
        
        elif level == "strict":
            return base_checks + [
                "coordinate_ranges",
                "data_types", 
                "foreign_keys",
                "data_consistency",
                "duplicate_detection",
                "business_rules"
            ]
```

#### 坐标验证配置
```python
class CoordinateValidator:
    """坐标验证配置"""
    
    def __init__(self):
        # 有效坐标范围
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # 可疑坐标范围 (可能是错误数据)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # 原点坐标可能是错误
            {"lat": (90, 90), "lon": (0, 0)},    # 极点坐标需要特别检查
        ]
    
    def validate_coordinate(self, lat, lon):
        """验证单个坐标"""
        # 检查基本范围
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"纬度超出范围: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"经度超出范围: {lon}"
        
        # 检查可疑坐标
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"可疑坐标: ({lat}, {lon})"
        
        return True, "坐标有效"
```

### 输出质量控制

#### 文件格式验证
```python
import json

class OutputValidator:
    """输出文件验证配置"""
    
    def __init__(self):
        self.required_files = [
            "Airports.json",
            "Runways.json", 
            "Waypoints.json",
            "Navaids.json",
            "Airways.json",
            "AirwayLegs.json",
            "Terminals.json",
            "ILSes.json"
        ]
        
        self.min_file_sizes = {
            "Airports.json": 1024,      # 至少 1KB
            "Waypoints.json": 10240,    # 至少 10KB
        }
    
    def validate_json_file(self, file_path):
        """验证 JSON 文件格式"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "JSON 根对象必须是字典或列表"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "JSON 对象为空"
            
            return True, "JSON 格式有效"
            
        except json.JSONDecodeError as e:
            return False, f"JSON 格式错误: {e}"
        except Exception as e:
            return False, f"文件读取错误: {e}"
```

## 🎛️ 高级配置

### 日志配置

#### 日志级别和格式
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """日志配置类"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """设置日志系统"""
        # 创建 logger
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Rich 控制台处理器
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # 文件处理器
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler(
            self.file_name, 
            maxBytes=self.max_file_size,
            backupCount=self.backup_count,
            encoding='utf-8'
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(self.format)
        file_handler.setFormatter(file_formatter)
        
        # 添加处理器
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### 压缩配置

#### 压缩级别设置
```python
import py7zr

class CompressionConfig:
    """压缩配置类"""
    
    def __init__(self):
        self.compression_level = 5      # 压缩级别 (1-9)
        self.method = "LZMA2"          # 压缩算法
        self.solid = True              # 固实压缩
        self.multi_threading = True    # 多线程压缩
    
    def create_archive(self, source_dir, archive_path):
        """创建压缩包"""
        filters = [
            {"id": py7zr.FILTER_LZMA2, "preset": self.compression_level}
        ]
        
        with py7zr.SevenZipFile(
            archive_path, 
            'w', 
            filters=filters,
            mp=self.multi_threading
        ) as archive:
            archive.writeall(source_dir, ".")
```

### 调试配置

#### 调试模式设置
```python
class DebugConfig:
    """调试配置类"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """启用调试功能"""
        if self.debug_mode:
            # 启用详细日志
            logging.getLogger().setLevel(logging.DEBUG)
            
            # 启用性能分析
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # 启用内存跟踪
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 完整配置示例

### 基础配置示例
```python
# 适合新手的简单配置
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### 高性能配置示例
```python
# 适合高端硬件的性能优化配置
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# 配合性能优化设置
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### 高质量配置示例
```python
# 适合对数据质量要求极高的场景
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # 更高精度
    vnav_threshold=2.0             # 更严格的 FAF 检测
)

# 配合严格验证
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### 调试配置示例
```python
# 开发和调试用配置
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # 降低精度以加快处理
    vnav_threshold=3.0             # 宽松阈值便于调试
)

# 调试选项
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 配置文件管理

### 配置文件格式
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """TFDI 转换器完整配置"""
    # 输出配置
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # 数据处理配置
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # 性能配置
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # 验证配置
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # 日志配置
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """保存配置到文件"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """从文件加载配置"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### 配置模板
```python
# 创建配置模板
def create_config_templates():
    """创建各种配置模板"""
    
    # 默认配置
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # 高性能配置
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # 高质量配置
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# 使用配置
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**下一步**: 配置完成后，请查看 [使用说明](usage.md) 开始您的 TFDI 数据转换！🚁✨
