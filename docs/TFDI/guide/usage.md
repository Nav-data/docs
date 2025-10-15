# 🚀 TFDI 导航数据转换器使用指南

本指南将详细介绍如何使用 TFDI 导航数据转换器，从基础操作到高级功能，帮助您顺利完成 Fenix 到 TFDI 的导航数据转换。

## 🎯 使用前准备

### 1. 环境检查清单

在开始转换之前，请确认以下环境要求：

- ✅ **Python 环境**: 3.8+ 已安装并配置
- ✅ **依赖包**: rich, pandas, py7zr 已安装
- ✅ **系统资源**: 至少 4GB RAM, 1GB 可用磁盘空间
- ✅ **Fenix 数据库**: nd.db3 文件已准备
- ✅ **TFDI MD-11**: 已安装在 Microsoft Flight Simulator 中

### 2. 文件准备

#### Fenix 数据库位置

```bash
# Windows 常见路径
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 验证文件存在
python -c "import pathlib; print('数据库存在' if pathlib.Path('nd.db3').exists() else '数据库不存在')"
```

#### 文件完整性检查

```python
import sqlite3
import os

def check_database_file(db_path):
    """检查数据库文件完整性"""
    print(f"🔍 检查数据库: {db_path}")

    # 检查文件存在
    if not os.path.exists(db_path):
        print("❌ 文件不存在")
        return False

    # 检查文件大小
    size_mb = os.path.getsize(db_path) / (1024 * 1024)
    print(f"📁 文件大小: {size_mb:.1f} MB")

    if size_mb < 10:
        print("⚠️ 文件可能过小")

    # 检查数据库连接
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()

        print(f"✅ 包含 {len(tables)} 个表")
        return True

    except sqlite3.Error as e:
        print(f"❌ 数据库错误: {e}")
        return False

# 使用示例
check_database_file("path/to/nd.db3")
```

## 🖥️ 交互式使用

### 启动转换器

```bash
# 基本启动
python Fenix2TFDINavDataConverter.py

# 带调试信息启动
python Fenix2TFDINavDataConverter.py --debug

# 查看帮助信息
python Fenix2TFDINavDataConverter.py --help
```

### 欢迎界面

转换器启动后，您将看到专业的欢迎界面：

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 环境检查...
✅ Python 3.9.16
✅ Rich 12.6.0
✅ Pandas 1.5.3
✅ py7zr 0.20.2
✅ 系统内存: 16 GB
✅ 可用磁盘: 128 GB

🚀 准备开始转换...
```

## 📋 转换流程详解

### 第一步: 数据库文件选择

```
╭─────────────────────────────────────── 📂 选择数据库文件 ───────────────────────────────────────╮
│                                                                                                │
│ 请输入 Fenix 导航数据库文件路径:                                                               │
│                                                                                                │
│ 💡 提示: 可以直接拖拽文件到终端，或输入完整路径                                                 │
│                                                                                                │
│ 常见位置:                                                                                      │
│ • %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\...\navdata\nd.db3              │
│                                                                                                │
╰────────────────────────────────────────────────────────────────────────────────────────────────╯

请输入文件路径:
```

**输入方式:**

```bash
# 方式一: 直接输入路径
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 方式二: 拖拽文件到终端窗口
# (系统会自动填入路径)

# 方式三: 使用相对路径 (如果文件在当前目录)
./nd.db3
```

### 第二步: 数据库验证

```
╭─────────────────────────────────────── 🔍 验证数据库 ─────────────────────────────────────────╮
│                                                                                              │
│ 正在验证数据库文件...                                                                        │
│                                                                                              │
│ ✅ 文件存在: nd.db3 (142.5 MB)                                                               │
│ ✅ 数据库格式: SQLite 3.x                                                                    │
│ ✅ 编码格式: UTF-8                                                                           │
│                                                                                              │
│ 🔍 检查数据库表结构...                                                                       │
│ ████████████████████████████████████████ 12/12 (100%)                                      │
│                                                                                              │
│ ✅ 所有必需表都存在                                                                          │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

**验证项目:**

- ✅ 文件存在性和可读性
- ✅ SQLite 数据库格式
- ✅ 必需表结构完整性
- ✅ 数据编码正确性
- ✅ 外键关系完整性

### 第三步: 终端ID配置

```
╭─────────────────────────────────────── ⚙️ 配置转换参数 ───────────────────────────────────────╮
│                                                                                              │
│ 终端程序起始 ID 设置                                                                          │
│                                                                                              │
│ 💡 说明: 终端 ID 用于标识 TFDI 系统中的终端程序                                               │
│                                                                                              │
│ 📊 建议值:                                                                                   │
│ • 小型数据集 (< 50 机场): 1000                                                               │
│ • 中型数据集 (50-200 机场): 2000                                                             │
│ • 大型数据集 (> 200 机场): 5000                                                              │
│                                                                                              │
│ ⚠️ 注意: 避免与现有 TFDI 数据冲突                                                            │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯

请输入起始终端 ID [默认: 1000]:
```

**配置考虑因素:**

```python
def calculate_terminal_id_range(airport_count, start_id=1000):
    """计算终端ID范围"""
    # 每个机场预留ID数量
    ids_per_airport = 20

    # 计算所需ID总数
    total_ids_needed = airport_count * ids_per_airport

    # 添加缓冲区 (20%)
    buffer = int(total_ids_needed * 0.2)
    total_with_buffer = total_ids_needed + buffer

    end_id = start_id + total_with_buffer

    print(f"📊 ID 分配预估:")
    print(f"   机场数量: {airport_count}")
    print(f"   起始 ID: {start_id}")
    print(f"   结束 ID: {end_id}")
    print(f"   可用范围: {total_with_buffer} 个 ID")

    return start_id, end_id
```

### 第四步: 转换确认

```
┌─────────────────────────────────────── ✅ 转换配置确认 ───────────────────────────────────────┐
│                                                                                             │
│ 📂 输入文件                                                                                  │
│ └─ 数据库: nd.db3 (142.5 MB)                                                                │
│                                                                                             │
│ 📁 输出配置                                                                                  │
│ ├─ 输出目录: Primary/                                                                        │
│ ├─ 程序段目录: Primary/ProcedureLegs/                                                        │
│ └─ 压缩包: Primary.7z                                                                       │
│                                                                                             │
│ ⚙️ 转换参数                                                                                  │
│ ├─ 起始终端 ID: 1000                                                                        │
│ ├─ 坐标精度: 8 位小数                                                                        │
│ ├─ VNAV 阈值: 2.5°                                                                          │
│ └─ FAF 检测: 启用                                                                           │
│                                                                                             │
│ 📊 预估处理                                                                                  │
│ ├─ 表格数量: 12 个                                                                          │
│ ├─ 预估记录: ~156,000 条                                                                    │
│ ├─ 预估时间: 5-8 分钟                                                                       │
│ └─ 输出大小: ~15-25 MB                                                                      │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

确认开始转换? [Y/n]:
```

## 🔄 转换过程监控

### 数据库连接和优化

```
╭─────────────────────────────────────── 🔗 数据库连接 ─────────────────────────────────────────╮
│                                                                                              │
│ 正在连接数据库...                                                                            │
│                                                                                              │
│ 🔧 应用 SQLite 优化设置:                                                                     │
│ ├─ journal_mode = WAL                                                                        │
│ ├─ synchronous = NORMAL                                                                      │
│ ├─ cache_size = 10000                                                                        │
│ ├─ temp_store = MEMORY                                                                       │
│ └─ mmap_size = 256MB                                                                         │
│                                                                                              │
│ ✅ 数据库连接成功，性能优化已启用                                                            │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 标准数据表处理

```
╭─────────────────────────────────────── 📊 导出标准数据表 ────────────────────────────────────────╮
│                                                                                               │
│ 正在处理标准数据表...                                                                         │
│                                                                                               │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                             │
│                                                                                               │
│ 📋 已完成:                                                                                    │
│ ✅ AirportLookup     (2,456 条记录) → AirportLookup.json     (156 KB)                       │
│ ✅ Airports          (15,234 条记录) → Airports.json          (2.3 MB)                       │
│ ✅ Runways          (28,456 条记录) → Runways.json           (3.1 MB)                        │
│ ✅ Waypoints        (89,123 条记录) → Waypoints.json         (8.7 MB)                        │
│ ✅ WaypointLookup   (89,123 条记录) → WaypointLookup.json    (4.2 MB)                       │
│ ✅ Navaids         (12,345 条记录) → Navaids.json           (1.8 MB)                         │
│ ✅ NavaidLookup     (12,345 条记录) → NavaidLookup.json     (685 KB)                         │
│ ✅ Airways          (1,234 条记录) → Airways.json            (145 KB)                        │
│                                                                                               │
│ 🔄 当前处理: AirwayLegs → 转换航路段数据                                                      │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 终端程序处理

```
╭─────────────────────────────────────── 🎯 处理终端程序 ───────────────────────────────────────╮
│                                                                                              │
│ 正在处理终端程序数据...                                                                      │
│                                                                                              │
│ ████████████████████████████████████████ 245/350 (70%) ⏱️ 0:02:18                         │
│                                                                                              │
│ 📊 处理统计:                                                                                 │
│ ├─ 机场数量: 145 个                                                                          │
│ ├─ 终端程序: 245 个                                                                          │
│ ├─ SID 程序: 89 个                                                                           │
│ ├─ STAR 程序: 76 个                                                                          │
│ ├─ APP 程序: 80 个                                                                           │
│ └─ FAF 点检测: 234 个                                                                        │
│                                                                                              │
│ 🔄 当前处理: ZBAA (北京首都) → SHUAY1A SID                                                   │
│ 📁 输出: ProcedureLegs/TermID_1245.json                                                     │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 数据验证

```
╭─────────────────────────────────────── 🔍 数据验证 ───────────────────────────────────────────╮
│                                                                                              │
│ 正在验证转换结果...                                                                          │
│                                                                                              │
│ ████████████████████████████████████████ 11/11 (100%) ⏱️ 0:00:45                          │
│                                                                                              │
│ ✅ JSON 格式验证                                                                             │
│ ├─ 所有文件格式正确                                                                          │
│ ├─ 字符编码: UTF-8                                                                          │
│ └─ 语法检查通过                                                                              │
│                                                                                              │
│ ✅ 数据完整性验证                                                                            │
│ ├─ 坐标范围检查: 通过                                                                        │
│ ├─ 外键关系检查: 通过                                                                        │
│ ├─ 重复数据检查: 发现 3 个重复项 (已移除)                                                    │
│ └─ 业务规则检查: 通过                                                                        │
│                                                                                              │
│ ✅ FAF 点验证                                                                                │
│ ├─ 检测到 234 个 FAF 点                                                                     │
│ ├─ VNAV 角度验证: 通过                                                                       │
│ └─ 进近程序关联: 通过                                                                        │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 文件压缩和打包

```
╭─────────────────────────────────────── 📦 创建压缩包 ─────────────────────────────────────────╮
│                                                                                              │
│ 正在创建 7z 压缩包...                                                                        │
│                                                                                              │
│ 🗜️ 压缩设置:                                                                                │
│ ├─ 算法: LZMA2                                                                              │
│ ├─ 级别: 5 (标准)                                                                           │
│ ├─ 固实: 启用                                                                               │
│ └─ 多线程: 启用                                                                             │
│                                                                                              │
│ ████████████████████████████████████████ 22.4/22.4 MB (100%) ⏱️ 0:01:23                   │
│                                                                                              │
│ ✅ 压缩完成: Primary.7z                                                                     │
│ 📊 压缩统计:                                                                                │
│ ├─ 原始大小: 22.4 MB                                                                        │
│ ├─ 压缩后: 15.6 MB                                                                          │
│ ├─ 压缩率: 69.6%                                                                            │
│ └─ 文件数量: 145 个                                                                         │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

## ✅ 转换完成

### 成功总结

```
╔══════════════════════════════════════════════════════════════╗
║                          转换成功                           ║
║                                                              ║
║  ✓ 数据转换成功完成！                                        ║
║                                                              ║
║  📊 处理统计:                                                ║
║  • 导出表格: 11 个                                          ║
║  • 处理记录: 156,789 条                                      ║
║  • 终端程序: 350 个                                         ║
║  • FAF 点: 234 个                                           ║
║  • 机场数量: 145 个                                         ║
║                                                              ║
║  📁 输出文件: Primary.7z (15.6 MB)                          ║
║  🕒 总耗时: 6 分 32 秒                                       ║
║                                                              ║
║  可以在 TFDI MD-11 中使用此文件进行导航。                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📋 生成的文件清单:
┌─────────────────────────────────────────┬─────────────┬─────────────┐
│ 文件名                                  │ 大小        │ 记录数      │
├─────────────────────────────────────────┼─────────────┼─────────────┤
│ Primary.7z                              │ 15.6 MB     │ -           │
│ ├─ AirportLookup.json                   │ 156 KB      │ 2,456       │
│ ├─ Airports.json                        │ 2.3 MB      │ 15,234      │
│ ├─ AirwayLegs.json                      │ 4.2 MB      │ 23,456      │
│ ├─ Airways.json                         │ 145 KB      │ 1,234       │
│ ├─ Ilses.json                           │ 892 KB      │ 5,678       │
│ ├─ NavaidLookup.json                    │ 685 KB      │ 12,345      │
│ ├─ Navaids.json                         │ 1.8 MB      │ 12,345      │
│ ├─ Runways.json                         │ 3.1 MB      │ 28,456      │
│ ├─ Terminals.json                       │ 1.2 MB      │ 8,945       │
│ ├─ WaypointLookup.json                  │ 4.2 MB      │ 89,123      │
│ ├─ Waypoints.json                       │ 8.7 MB      │ 89,123      │
│ └─ ProcedureLegs/ (145 个程序文件)       │ 2.1 MB      │ 12,340      │
└─────────────────────────────────────────┴─────────────┴─────────────┘

🔄 下一步建议:
1. 解压 Primary.7z 文件
2. 将 JSON 文件安装到 TFDI MD-11 导航数据目录
3. 在模拟器中测试导航功能
4. 备份原始文件以便恢复

📝 使用说明:
• 将压缩包内容复制到 TFDI MD-11 导航数据目录
• 重启 Microsoft Flight Simulator
• 在 TFDI MD-11 中验证新的导航数据
```

## 💻 编程方式使用

### 基本使用示例

```python
from Fenix2TFDINavDataConverter import FenixToTFDIConverter, ConverterConfig

# 创建配置
config = ConverterConfig(
    output_dir="TFDI_NavData",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# 初始化转换器
converter = FenixToTFDIConverter(config)

# 执行转换
try:
    result = converter.convert(
        database_path="path/to/fenix_navdata.db3",
        start_terminal_id=1000
    )

    if result.success:
        print(f"✅ 转换成功!")
        print(f"📁 输出文件: {result.output_archive}")
        print(f"📊 处理记录: {result.total_records}")
        print(f"⏱️ 耗时: {result.duration:.2f} 秒")
    else:
        print(f"❌ 转换失败: {result.error_message}")

except Exception as e:
    print(f"💥 转换过程发生异常: {e}")
```

### 高级配置示例

```python
# 自定义配置
custom_config = ConverterConfig(
    output_dir="Custom_Output",
    procedure_legs_dir="Custom_Output/Procedures",
    archive_name="TFDI_MD11_NavData_20241224.7z",
    coordinate_precision=10,        # 高精度坐标
    vnav_threshold=2.0              # 严格的 FAF 检测
)

# 带回调的转换
def progress_callback(step, progress, message):
    """转换进度回调函数"""
    print(f"[{step}] {progress:.1f}% - {message}")

def validation_callback(validation_type, result, details):
    """验证结果回调函数"""
    status = "✅" if result else "❌"
    print(f"{status} {validation_type}: {details}")

converter = FenixToTFDIConverter(
    config=custom_config,
    progress_callback=progress_callback,
    validation_callback=validation_callback
)

result = converter.convert(
    database_path="fenix_navdata.db3",
    start_terminal_id=2000,
    validate_output=True,          # 启用输出验证
    cleanup_temp_files=True        # 清理临时文件
)
```

### 批量处理示例

```python
import os
from pathlib import Path

def batch_convert_databases():
    """批量转换多个数据库"""

    database_files = [
        "fenix_navdata_2508.db3",
        "fenix_navdata_2509.db3",
        "fenix_navdata_2510.db3"
    ]

    base_config = ConverterConfig(coordinate_precision=8)

    for i, db_file in enumerate(database_files):
        print(f"\n🔄 处理数据库 {i+1}/{len(database_files)}: {db_file}")

        # 为每个数据库创建独立的输出目录
        airac_cycle = db_file.split('_')[-1].replace('.db3', '')
        output_config = ConverterConfig(
            output_dir=f"TFDI_NavData_{airac_cycle}",
            archive_name=f"TFDI_MD11_{airac_cycle}.7z",
            coordinate_precision=base_config.coordinate_precision,
            vnav_threshold=base_config.vnav_threshold
        )

        converter = FenixToTFDIConverter(output_config)

        try:
            result = converter.convert(
                database_path=db_file,
                start_terminal_id=1000 + (i * 1000)  # 避免 ID 冲突
            )

            if result.success:
                print(f"✅ {db_file} 转换成功")
            else:
                print(f"❌ {db_file} 转换失败: {result.error_message}")

        except Exception as e:
            print(f"💥 处理 {db_file} 时发生异常: {e}")

# 执行批量转换
batch_convert_databases()
```

## 🧪 验证和测试

### 输出文件验证

```python
def verify_conversion_output(archive_path):
    """验证转换输出"""
    import py7zr
    import json

    print(f"🔍 验证压缩包: {archive_path}")

    try:
        # 验证压缩包完整性
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            file_list = archive.getnames()

        print(f"✅ 压缩包包含 {len(file_list)} 个文件")

        # 验证必需文件
        required_files = [
            "Airports.json", "Runways.json", "Waypoints.json",
            "Navaids.json", "Airways.json", "AirwayLegs.json",
            "Terminals.json", "ILSes.json"
        ]

        missing_files = []
        for required_file in required_files:
            if required_file not in file_list:
                missing_files.append(required_file)

        if missing_files:
            print(f"❌ 缺失必需文件: {missing_files}")
            return False
        else:
            print("✅ 所有必需文件都存在")

        # 验证 JSON 格式
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            for file_name in required_files:
                try:
                    file_data = archive.read([file_name])
                    json_content = json.loads(file_data[file_name].read())
                    print(f"✅ {file_name}: JSON 格式有效")
                except json.JSONDecodeError as e:
                    print(f"❌ {file_name}: JSON 格式错误 - {e}")
                    return False

        print("🎉 输出文件验证通过!")
        return True

    except Exception as e:
        print(f"❌ 验证失败: {e}")
        return False

# 使用示例
verify_conversion_output("Primary.7z")
```

### TFDI 兼容性测试

```python
def test_tfdi_compatibility(json_file_path):
    """测试 TFDI 兼容性"""
    import json

    print(f"🧪 测试 TFDI 兼容性: {json_file_path}")

    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        # 检查数据结构
        if isinstance(data, dict):
            print(f"✅ 数据结构: 字典 ({len(data)} 个条目)")

            # 检查坐标格式 (以 Waypoints 为例)
            if "Waypoints" in json_file_path or any(key for key in data.keys() if "latitude" in str(data[key]).lower()):
                coord_issues = []
                for key, value in list(data.items())[:5]:  # 检查前5个条目
                    if isinstance(value, dict):
                        if "Latitude" in value and "Longitude" in value:
                            lat = value["Latitude"]
                            lon = value["Longitude"]

                            if not (-90 <= lat <= 90):
                                coord_issues.append(f"{key}: 纬度超出范围 ({lat})")
                            if not (-180 <= lon <= 180):
                                coord_issues.append(f"{key}: 经度超出范围 ({lon})")

                if coord_issues:
                    print(f"⚠️ 坐标问题: {coord_issues}")
                else:
                    print("✅ 坐标格式检查通过")

        elif isinstance(data, list):
            print(f"✅ 数据结构: 列表 ({len(data)} 个元素)")

        else:
            print(f"⚠️ 未知数据结构: {type(data)}")

        print("✅ TFDI 兼容性测试通过")
        return True

    except Exception as e:
        print(f"❌ 兼容性测试失败: {e}")
        return False

# 测试所有输出文件
output_files = [
    "Primary/Airports.json",
    "Primary/Waypoints.json",
    "Primary/Navaids.json"
]

for file_path in output_files:
    test_tfdi_compatibility(file_path)
```

## ⚠️ 注意事项和最佳实践

### 重要提醒

1. **数据备份**: 转换前备份原始 Fenix 数据和 TFDI 数据
2. **版本兼容**: 确保 Fenix、TFDI 和转换器版本兼容
3. **系统资源**: 大型数据库转换需要充足的内存和磁盘空间
4. **权限检查**: 确保有足够的文件读写权限

### 性能优化建议

```python
# 系统优化检查
def check_system_optimization():
    """检查系统优化状态"""
    import psutil

    print("🔧 系统优化检查:")

    # 检查内存
    memory = psutil.virtual_memory()
    if memory.available < 4 * 1024**3:  # 4GB
        print("⚠️ 可用内存不足，建议关闭其他程序")
    else:
        print("✅ 内存充足")

    # 检查磁盘类型
    disk_info = psutil.disk_usage('.')
    print(f"💿 磁盘可用空间: {disk_info.free // 1024**3} GB")

    # 检查 CPU
    cpu_count = psutil.cpu_count()
    print(f"🖥️ CPU 核心数: {cpu_count}")

    if cpu_count >= 4:
        print("✅ 建议启用多线程处理")
    else:
        print("⚠️ 单核处理，转换可能较慢")

check_system_optimization()
```

### 故障排除清单

- [ ] ✅ Python 版本 ≥ 3.8
- [ ] ✅ 所有依赖包已安装
- [ ] ✅ Fenix 数据库文件完整且可读
- [ ] ✅ 足够的可用内存 (4GB+)
- [ ] ✅ 足够的磁盘空间 (1GB+)
- [ ] ✅ 输出目录有写入权限
- [ ] ✅ TFDI MD-11 已正确安装

---

**恭喜您完成学习！** 🎉

现在您已经掌握了 TFDI 导航数据转换器的完整使用方法。如果遇到问题，请查看 [故障排除指南](../troubleshooting.md) 或 [常见问题](../faq.md)。

祝您飞行愉快！🚁✨
