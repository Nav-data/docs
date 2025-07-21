# ⚙️ 配置说明

本指南将详细介绍如何配置Nav-data转换工具的数据源、路径设置和AIRAC周期管理。

## 📊 数据源概述

Nav-data工具支持多种业界标准的航空导航数据源，确保数据的权威性和准确性。

### 🔄 支持的数据格式

| 数据格式 | 来源 | 用途 | 标准 |
|---------|------|------|------|
| **NAIP CSV** | Navigraph/Aerosoft | 机场、跑道、航路 | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | 航路点、导航台 | X-Plane格式 |
| **CIFP** | 官方程序数据 | SID/STAR/进近 | ARINC 424 |
| **SQLite DB** | Fenix A320 | NDB参考数据 | 自定义格式 |

## 🗃️ 必需的数据文件

### 📁 基础目录结构

创建以下目录结构来组织您的导航数据：

```
NavData_Workspace/
├── NAIP/                    # NAIP CSV文件目录
│   ├── AD_HP.csv           # 机场基础数据
│   ├── RWY.csv             # 跑道信息
│   ├── RWY_DIRECTION.csv   # 跑道方向数据
│   └── RTE_SEG.csv         # 航路段数据
│
├── X-Plane/                 # X-Plane数据文件
│   ├── earth_fix.dat       # 航路点数据
│   └── earth_nav.dat       # 导航台数据
│
├── CIFP/                    # CIFP程序数据目录
│   ├── ZBAA.dat            # 北京首都机场
│   ├── ZSSS.dat            # 上海浦东机场
│   └── [其他机场].dat      # 各机场程序文件
│
├── NDBs/                    # NDB数据库
│   └── nd.db3              # Fenix导航数据库
│
└── Output/                  # 输出目录
    └── e_dfd_PMDG.s3db     # 转换后的数据库
```

## 🌐 数据源获取指南

### 1️⃣ Navigraph数据（推荐）

**获取步骤：**
1. 访问 [Navigraph官网](https://navigraph.com/) 并注册账户
2. 订阅Navigraph Unlimited或Charts + Data服务
3. 下载Navigraph FMS Data Manager
4. 在FMS Data Manager中选择"Generic"格式
5. 下载并解压NAIP数据包

**NAIP文件获取：**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
下载当前AIRAC周期
```

### 2️⃣ Aerosoft NavDataPro

**获取步骤：**
1. 购买 [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/)
2. 下载NavDataPro应用程序
3. 登录并下载NAIP格式数据
4. 解压到NAIP目录

### 3️⃣ X-Plane数据文件

**来源选项：**
- **选项A**：从X-Plane 11/12安装目录复制
  ```
  [X-Plane安装目录]/Resources/default data/earth_fix.dat
  [X-Plane安装目录]/Resources/default data/earth_nav.dat
  ```

- **选项B**：从本项目的样本数据中获取
  ```
  [项目目录]/sample_data/earth_fix.dat
  [项目目录]/sample_data/earth_nav.dat
  ```

### 4️⃣ CIFP程序数据

**获取方式：**
- **官方渠道**：FAA官网免费下载
- **第三方**：Navigraph包含的CIFP数据
- **项目提供**：预处理的中国区域CIFP文件

### 5️⃣ NDB数据库

**获取途径：**
```bash
# 从Fenix A320安装目录复制
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ 路径配置向导

### 自动配置模式

运行转换工具时，程序将引导您完成路径配置：

```bash
python XP2INI_NDB_Converter.py
```

**配置流程：**
1. **基础目录选择**：选择包含所有数据文件的根目录
2. **自动检测**：程序自动扫描并验证各类数据文件
3. **路径确认**：显示检测到的文件路径供您确认
4. **手动补充**：对于未找到的文件，手动指定路径

### 🔍 路径验证清单

| 数据类型 | 文件路径 | 验证状态 |
|---------|---------|---------|
| NAIP机场数据 | `NAIP/AD_HP.csv` | ✅ |
| NAIP跑道数据 | `NAIP/RWY.csv` | ✅ |
| NAIP跑道方向 | `NAIP/RWY_DIRECTION.csv` | ✅ |
| NAIP航路数据 | `NAIP/RTE_SEG.csv` | ✅ |
| X-Plane航路点 | `X-Plane/earth_fix.dat` | ✅ |
| X-Plane导航台 | `X-Plane/earth_nav.dat` | ✅ |
| CIFP程序目录 | `CIFP/` | ✅ |
| NDB数据库 | `NDBs/nd.db3` | ✅ |
| ICAO查找表 | `ICAO.txt` | ✅ |

## 📅 AIRAC周期管理

### 🗓️ AIRAC周期说明

**AIRAC（Aeronautical Information Regulation And Control）**是国际民航组织制定的28天航空信息更新周期。

- **更新频率**：每28天
- **全球同步**：全世界统一更新时间
- **重要性**：确保飞行员和管制员使用相同的导航数据

### 📊 当前周期查询

```python
# 查询当前AIRAC周期
import datetime

def get_current_airac():
    # AIRAC 2023年参考日期：2023年1月5日
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"当前周期：{get_current_airac()}")
```

### 🔄 数据更新策略

#### 实时更新用户
- **更新频率**：每个AIRAC周期
- **建议来源**：Navigraph（自动更新）
- **适用场景**：在线飞行、专业用途

#### 普通用户
- **更新频率**：3-6个月
- **建议来源**：Aerosoft NavDataPro
- **适用场景**：离线飞行、娱乐用途

## 🎛️ 高级配置选项

### 📍 区域过滤配置

针对不同地区定制数据处理范围：

```python
# 配置处理的ICAO区域代码
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # 中国北部地区
    'ZS',  # 中国东部地区  
    'ZG',  # 中国南部地区
    'ZJ',  # 中国华东地区
    'ZY',  # 中国中部地区
    'ZL',  # 中国西南地区
    'ZU',  # 中国西部地区
    'ZW',  # 中国西北地区
    'ZP',  # 中国华北地区
    'ZH',  # 中国华南地区
    'VM',  # 越南地区
    'VH',  # 香港地区
    'RK'   # 韩国地区
}
```

### 🎯 精度配置

设置坐标和计算精度：

```python
# 坐标精度配置
COORDINATE_PRECISION = 8  # 小数位数
MAGNETIC_VARIATION_PRECISION = 1  # 磁偏角精度

# 距离单位转换
NM_TO_KM = 1.852  # 海里到公里
KM_TO_NM = 0.539957  # 公里到海里
```

### ⚡ 性能优化配置

```python
# 并行处理配置
MULTIPROCESS_WORKERS = 4  # 并行进程数
BATCH_SIZE = 1000  # 批处理大小
DATABASE_TIMEOUT = 30  # 数据库超时（秒）

# 内存优化
ENABLE_CACHE = True  # 启用坐标缓存
CACHE_SIZE_LIMIT = 10000  # 缓存大小限制
```

## 🔧 配置文件模板

创建 `config.json` 文件来保存常用配置：

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ 配置验证

### 🔍 配置检查脚本

```python
#!/usr/bin/env python3
"""配置验证脚本"""

import os
import json
from pathlib import Path

def validate_config():
    """验证配置文件的完整性"""
    
    required_files = {
        'NAIP/AD_HP.csv': '机场数据',
        'NAIP/RWY.csv': '跑道数据', 
        'NAIP/RWY_DIRECTION.csv': '跑道方向',
        'NAIP/RTE_SEG.csv': '航路数据',
        'X-Plane/earth_fix.dat': '航路点',
        'X-Plane/earth_nav.dat': '导航台',
        'NDBs/nd.db3': 'NDB数据库'
    }
    
    print("🔍 开始验证配置...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (文件不存在)")
    
    print("🔍 验证完成！")

if __name__ == "__main__":
    validate_config()
```

## 🚨 常见配置问题

### 路径问题
```bash
# 问题：路径包含中文字符导致编码错误
# 解决：使用英文路径，避免特殊字符

# 错误路径示例
C:/导航数据/NAIP/

# 正确路径示例  
C:/NavData/NAIP/
```

### 文件权限问题
```powershell
# 问题：无读取权限
# 解决：以管理员身份运行或修改文件权限
icacls "C:\NavData" /grant Everyone:F /T
```

### 数据完整性问题
```bash
# 问题：NAIP文件不完整
# 解决：重新下载完整的AIRAC数据包
# 确保所有CSV文件都存在且非空
```

---

配置完成！下一步请查看 [**使用说明**](./usage.md) 来执行数据转换流程。 