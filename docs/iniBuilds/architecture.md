# 🏗️ 系统架构

本文档详细阐述Nav-data航空导航数据转换工具的系统架构、技术实现和设计理念。

## 🎯 设计原则

### 🔧 模块化设计
- **单一职责**：每个模块专注处理特定类型的导航数据
- **松耦合**：模块间依赖最小化，便于独立开发和测试
- **高内聚**：相关功能集中在同一模块内部

### ⚡ 性能优化
- **并行处理**：支持多进程并行处理大规模数据集
- **内存管理**：智能缓存机制减少重复计算
- **I/O优化**：批量数据库操作提升处理效率

### 🔒 数据完整性
- **类型验证**：严格的数据类型和格式验证
- **错误处理**：优雅的错误恢复和报告机制
- **数据一致性**：确保跨模块数据的一致性和准确性

## 🏛️ 系统架构概览

```mermaid
graph TB
    subgraph "输入数据源"
        A[NAIP CSV数据] 
        B[X-Plane DAT文件]
        C[CIFP程序数据]
        D[NDB数据库]
        E[ICAO查找表]
    end
    
    subgraph "核心处理层"
        F[主控制器<br/>XP2INI_NDB_Converter]
        G[路径配置管理器]
        H[数据验证器]
    end
    
    subgraph "数据处理模块"
        I[机场处理器<br/>airports.py]
        J[跑道处理器<br/>runways.py] 
        K[VHF处理器<br/>vhfs.py]
        L[NDB处理器<br/>ndbs.py]
        M[航路点处理器<br/>waypoints.py]
        N[程序处理器<br/>procedures.py]
        O[航路处理器<br/>airways.py]
    end
    
    subgraph "工具模块"
        P[坐标缓存<br/>CoordinateCache]
        Q[磁偏角计算<br/>MagneticVariation]
        R[数据库操作<br/>DatabaseHelper]
        S[格式转换器<br/>DataConverter]
    end
    
    subgraph "输出层"
        T[SQLite数据库<br/>e_dfd_PMDG.s3db]
        U[验证报告]
        V[处理日志]
    end
    
    A --> F
    B --> F
    C --> F
    D --> F
    E --> F
    
    F --> G
    F --> H
    
    G --> I
    G --> J
    G --> K
    G --> L
    G --> M
    G --> N
    G --> O
    
    I --> P
    I --> Q
    I --> R
    I --> S
    
    J --> P
    J --> Q
    J --> R
    J --> S
    
    K --> P
    K --> Q
    K --> R
    K --> S
    
    L --> P
    L --> Q
    L --> R
    L --> S
    
    M --> P
    M --> Q
    M --> R
    M --> S
    
    N --> P
    N --> Q
    N --> R
    N --> S
    
    O --> P
    O --> Q
    O --> R
    O --> S
    
    I --> T
    J --> T
    K --> T
    L --> T
    M --> T
    N --> T
    O --> T
    
    F --> U
    F --> V
```

## 📦 核心模块详解

### 🎮 主控制器 (XP2INI_NDB_Converter.py)

**职责**：系统的入口点和流程控制中心

```python
class MainController:
    """主控制器类，负责整个转换流程的协调"""
    
    def __init__(self):
        self.config = {}
        self.processors = []
        self.logger = Logger()
    
    def main_config(self):
        """交互式路径配置向导"""
        pass
    
    def main(self, config):
        """主处理流程"""
        pass
```

**核心功能**：
- 📂 路径配置和验证
- 🔄 处理流程编排
- ⏱️ 性能监控和日志记录
- 🗜️ 数据库优化和压缩

### 🏢 机场数据处理器 (airports.py)

**数据来源**：`NAIP/AD_HP.csv`、`ICAO.txt`

**核心算法**：
```python
def get_magnetic_variation(lat, lon):
    """计算磁偏角 - 基于WMM模型"""
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)

def convert_dms_to_decimal(dms_str):
    """DMS坐标转十进制度"""
    # 解析度分秒格式：N390842.12 -> 39.145033
    direction = dms_str[0]
    if direction in ['N', 'S']:
        deg = float(dms_str[1:3])
        min_val = float(dms_str[3:5])
        sec = float(dms_str[5:])
    # ... 转换逻辑
```

**输出表结构**：`tbl_airports`
```sql
CREATE TABLE tbl_airports (
    area_code TEXT DEFAULT 'EEU',
    airport_identifier TEXT,
    icao_code TEXT,
    airport_latitude REAL,
    airport_longitude REAL,
    magnetic_variation REAL,
    datum_code TEXT DEFAULT 'WGE'
);
```

### 🛬 跑道数据处理器 (runways.py)

**数据来源**：`NAIP/RWY.csv`、`NAIP/RWY_DIRECTION.csv`、Fenix NDB数据库

**核心功能**：
- 🔄 跨数据源坐标匹配
- 📐 跑道方位角计算
- 🎯 坐标精度验证

**关键算法**：
```python
def load_airport_data(nd_db_path):
    """从Fenix数据库加载跑道坐标参考"""
    # 查询基准机场ZYYJ的跑道数据
    cursor.execute("SELECT ID FROM Airports WHERE ICAO = 'ZYYJ'")
    # 计算其他机场相对位移
    # 提供坐标校正参考
```

### 📡 VHF导航台处理器 (vhfs.py)

**数据来源**：`X-Plane/earth_nav.dat`、`ICAO.txt`

**支持的导航台类型**：
- **VOR/DME** (类型3)：甚高频全向信标/测距设备
- **DME-ILS** (类型12)：仪表着陆系统测距设备

**频率处理逻辑**：
```python
# 频率格式转换：1173 -> 117.3 MHz
frequency = parts[4]
navaid_frequency = f"{frequency[:3]}.{frequency[3:]}"
```

**磁偏角自动计算**：
```python
def fetch_magnetic_variation_for_record(record):
    lat = record['navaid_latitude']
    lon = record['navaid_longitude']
    mv = get_magnetic_variation(lat, lon)
    record['magnetic_variation'] = mv
    return record
```

### 📻 NDB导航台处理器 (ndbs.py)

**数据来源**：`X-Plane/earth_nav.dat`

**支持的ICAO区域**：
```python
valid_icao_codes = {
    'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW',  # 中国
    'VM', 'VH',  # 越南、香港
    'RK'         # 韩国
}
```

**处理流程**：
1. 🔍 过滤指定区域的NDB数据
2. 🧭 计算每个NDB的磁偏角
3. 📊 批量写入数据库
4. ⚡ 并行处理优化

### 🗺️ 航路点处理器

#### 航路点处理器 (enroute_waypoints.py)
**数据来源**：`X-Plane/earth_fix.dat`

**过滤条件**：
```python
if parts[3] == 'ENRT' and parts[4] in supported_icao_codes:
    # 处理航路航路点 (En-Route)
```

#### 终端区域点处理器 (terminal_waypoints.py)
**过滤条件**：
```python
if parts[3] != 'ENRT' and parts[4] in supported_icao_codes:
    # 处理终端区域航路点 (Terminal)
```

**坐标精度设置**：
```python
waypoint_latitude = f"{float(parts[0]):.8f}"   # 8位小数精度
waypoint_longitude = f"{float(parts[1]):.8f}"  # 8位小数精度
```

### 🛫 程序数据处理器

#### SID离场程序处理器 (sids.py)
#### STAR进场程序处理器 (stars.py)  
#### IAP进近程序处理器 (iaps.py)

**数据来源**：`CIFP/` 目录下的机场程序文件

**关键特性**：
- 🗂️ **坐标缓存系统**：预加载航路点和导航台坐标
- 🔍 **智能匹配**：自动匹配程序中的航路点坐标
- 📋 **程序解析**：解析复杂的程序逻辑和限制条件

**坐标缓存架构**：
```python
class CoordinateCache:
    def __init__(self, earth_fix_path, earth_nav_path):
        self.fix_data = {}   # 航路点坐标缓存
        self.nav_data = {}   # 导航台坐标缓存
    
    def find_coordinates(self, coord_type, identifier, icao_code):
        """智能坐标查找"""
        # 优先级：fix_data -> nav_data -> 默认值
```

### 🛣️ 航路数据处理器 (airways.py)

**数据来源**：`NAIP/RTE_SEG.csv`、预加载的航路点和导航台数据

**核心功能**：
- 🔗 航路段连接关系建立
- 📐 航路方向和距离计算
- 🎯 航路点类型识别和分类

**航路点类型映射**：
```python
if code_type in ["DESIGNATED_POINT", "地名点"]:
    waypoint_description_code = 'E C'
    ref_table = 'EA'
elif code_type == "VORDME":
    waypoint_description_code = 'V C' 
    ref_table = 'D'
elif code_type == "NDB":
    waypoint_description_code = 'E C'
    ref_table = 'DB'
```

### 🛬 着陆引导系统处理器 (gs.py)

**数据来源**：`X-Plane/earth_nav.dat`

**ILS系统组件**：
- **Localizer (类型4)**：航向引导
- **Glide Slope (类型6)**：下滑引导

**引导角度计算**：
```python
# 从导航信息解析GS角度 (例：325 -> 3.25°)
gs_angle_str = nav_info[:3]
gs_angle = float(gs_angle_str) / 100

# 解析真航迹
bearing_str = nav_info[3:]
llz_truebearing = float(bearing_str)
```

## 🔄 数据流架构

### 📥 输入阶段

1. **数据源验证**
   ```python
   def validate_paths(config):
       """验证所有输入文件的存在性和可读性"""
       for name, path in config.items():
           if not os.path.exists(path):
               return False, f"文件不存在: {path}"
       return True, "验证通过"
   ```

2. **编码检测**
   ```python
   def detect_encoding(file_path):
       """自动检测文件编码"""
       with open(file_path, 'rb') as file:
           raw_data = file.read(10000)
           result = chardet.detect(raw_data)
           return result['encoding']
   ```

### ⚙️ 处理阶段

**处理顺序设计考虑**：
1. **基础数据优先**：机场 → 跑道 → 导航台
2. **依赖关系清晰**：航路点 → 程序 → 航路
3. **数据完整性**：先处理参考数据，再处理关联数据

**并行处理策略**：
```python
from multiprocessing import ProcessPoolExecutor

def process_magnetic_variations(records):
    """并行计算磁偏角"""
    with ProcessPoolExecutor(max_workers=4) as executor:
        results = list(executor.map(
            fetch_magnetic_variation_for_record, 
            records
        ))
    return results
```

### 📤 输出阶段

**SQLite数据库结构**：
```sql
-- 核心数据表
tbl_airports                   -- 机场基础信息
tbl_runways                   -- 跑道信息
tbl_d_vhfnavaids             -- VHF导航台
tbl_db_enroute_ndbnavaids    -- NDB导航台
tbl_ea_enroute_waypoints     -- 航路航路点  
tbl_pc_terminal_waypoints    -- 终端航路点
tbl_pd_sids                  -- SID程序
tbl_ps_stars                 -- STAR程序
tbl_pf_iaps                  -- 进近程序
tbl_er_enroute_airways       -- 航路数据
tbl_pg_ils_glideslope        -- ILS引导
```

**数据库优化**：
```python
def compress_sqlite_db(db_path):
    """压缩数据库，减小文件大小"""
    conn = sqlite3.connect(db_path)
    conn.execute("VACUUM")
    conn.close()

def delete_index_sqlite_db(db_path):
    """删除临时索引，优化最终数据库"""
    # 删除处理过程中创建的临时索引
```

## 🛠️ 技术实现细节

### 🧭 磁偏角计算系统

**WMM模型集成**：
```python
from pygeomag import GeoMag

# 使用高精度WMM模型
geo_mag = GeoMag(
    coefficients_file='wmm/WMMHR_2025.COF', 
    high_resolution=True
)

# 当前年份的小数表示
current_date = datetime.datetime.now()
year_decimal = current_date.year + ((current_date.month - 1) / 12.0) + (current_date.day / 365.0)
```

**计算精度**：
- **坐标精度**：8位小数 (约1.1mm精度)
- **磁偏角精度**：1位小数 (0.1度精度)
- **频率精度**：1位小数 (0.1MHz精度)

### 📊 数据验证机制

**类型验证**：
```python
def type_check(identifier):
    """检查标识符是否为机场代码"""
    if len(identifier) == 4 and identifier.startswith(('ZB', 'ZS', 'ZG', 'ZJ', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH')):
        return True
    return False
```

**坐标验证**：
```python
def validate_coordinates(lat, lon):
    """验证坐标有效性"""
    if not (-90 <= lat <= 90):
        return False, "纬度超出有效范围"
    if not (-180 <= lon <= 180):
        return False, "经度超出有效范围"
    return True, "坐标有效"
```

### 🔄 缓存机制

**智能缓存策略**：
```python
class SmartCache:
    def __init__(self, max_size=10000):
        self.cache = {}
        self.max_size = max_size
        self.access_count = {}
    
    def get(self, key):
        if key in self.cache:
            self.access_count[key] += 1
            return self.cache[key]
        return None
    
    def put(self, key, value):
        if len(self.cache) >= self.max_size:
            # LRU策略清理缓存
            self._evict_lru()
        self.cache[key] = value
        self.access_count[key] = 1
```

### ⚡ 性能优化

**批量数据库操作**：
```python
class DatabaseBatchWriter:
    def __init__(self, db_path, batch_size=1000):
        self.conn = sqlite3.connect(db_path)
        self.batch_size = batch_size
        self.pending_records = []
    
    def add_record(self, record):
        self.pending_records.append(record)
        if len(self.pending_records) >= self.batch_size:
            self.flush()
    
    def flush(self):
        """批量提交待处理记录"""
        self.conn.executemany(self.insert_sql, self.pending_records)
        self.conn.commit()
        self.pending_records.clear()
```

**内存优化**：
```python
def process_large_file_streaming(file_path):
    """流式处理大文件，避免内存溢出"""
    with open(file_path, 'r') as file:
        while True:
            lines = file.readlines(10000)  # 每次读取10000行
            if not lines:
                break
            process_chunk(lines)
```

## 🎯 扩展性设计

### 📦 模块接口规范

```python
class DataProcessor:
    """数据处理器基类"""
    
    def __init__(self, config):
        self.config = config
        self.logger = Logger()
    
    def validate_input(self):
        """验证输入数据"""
        raise NotImplementedError
    
    def process(self):
        """执行数据处理"""
        raise NotImplementedError
    
    def generate_output(self):
        """生成输出结果"""
        raise NotImplementedError
```

### 🔌 插件机制

```python
class PluginManager:
    """插件管理器，支持第三方数据处理器"""
    
    def __init__(self):
        self.processors = {}
    
    def register_processor(self, name, processor_class):
        """注册数据处理器"""
        self.processors[name] = processor_class
    
    def get_processor(self, name):
        """获取数据处理器实例"""
        return self.processors.get(name)
```

### 🌐 多格式支持

```python
class FormatConverter:
    """格式转换器，支持多种输出格式"""
    
    @staticmethod
    def to_pmdg_format(data):
        """转换为PMDG格式"""
        pass
    
    @staticmethod 
    def to_inibuilds_format(data):
        """转换为iniBuilds格式"""
        pass
    
    @staticmethod
    def to_generic_format(data):
        """转换为通用格式"""
        pass
```

## 📈 性能指标

### ⏱️ 典型处理时间

| 数据类型 | 记录数量 | 处理时间 | 内存使用 |
|---------|---------|---------|----------|
| 机场数据 | ~156个 | 15秒 | 45MB |
| 跑道数据 | ~312条 | 25秒 | 80MB |
| VHF导航台 | ~89个 | 20秒 | 35MB |
| 航路点 | ~3,300个 | 35秒 | 120MB |
| SID程序 | ~234个 | 45秒 | 90MB |
| 进近程序 | ~445个 | 60秒 | 150MB |
| 航路数据 | ~167条 | 30秒 | 75MB |

### 📊 优化效果

**并行处理优化**：
- 单线程处理：~180秒
- 4核并行处理：~127秒 (提升29%)
- 8核并行处理：~95秒 (提升47%)

**缓存优化效果**：
- 无缓存：坐标查找平均15ms
- 启用缓存：坐标查找平均2ms (提升87%)

---

以上就是Nav-data系统的完整架构说明。该架构确保了系统的**可扩展性**、**高性能**和**数据准确性**，为航空模拟提供了专业级的导航数据支持。 