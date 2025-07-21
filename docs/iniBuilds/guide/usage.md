# 🔄 使用说明

本指南将带您完成Nav-data工具的完整使用流程，从数据转换到最终部署到飞机插件。

## 🚀 快速开始

### ⚡ 一键转换

如果您已经完成配置，可以直接运行主程序：

```bash
python XP2INI_NDB_Converter.py
```

程序将自动引导您完成整个转换过程。

## 📝 详细操作流程

### 🎯 第一步：数据准备验证

在开始转换前，确保所有必需的数据文件已就位：

```bash
# 验证数据文件完整性
python -c "
import os
files = [
    'NAIP/AD_HP.csv',
    'NAIP/RWY.csv', 
    'NAIP/RWY_DIRECTION.csv',
    'NAIP/RTE_SEG.csv',
    'X-Plane/earth_fix.dat',
    'X-Plane/earth_nav.dat',
    'NDBs/nd.db3'
]
for f in files:
    print(f'✅ {f}' if os.path.exists(f) else f'❌ {f}')
"
```

### 🔧 第二步：启动转换程序

运行主转换程序并按照提示操作：

```bash
python XP2INI_NDB_Converter.py
```

### 📂 第三步：路径配置向导

程序将引导您完成路径配置：

#### 3.1 基础目录设置
```
请输入基础目录路径（包含NAIP, NDBs和XP_Data文件夹）: 
> C:\NavData\Workspace
```

#### 3.2 自动路径检测
程序会自动扫描并显示检测到的文件：

```
================= 开始路径配置 =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 路径确认
```
是否确认以上路径全部正确？(Y/N): Y
```

### ⚙️ 第四步：数据处理流程

转换程序将按以下顺序处理各类数据：

#### 4.1 机场数据处理
```
开始处理机场数据...
📍 正在解析机场基础信息
🧭 计算机场磁偏角数据
✅ 机场数据处理完成 (处理了 156 个机场)
```

#### 4.2 跑道数据处理
```
开始处理跑道数据...
🛬 正在处理跑道信息
📐 计算跑道方向和坐标
✅ 跑道数据处理完成 (处理了 312 条跑道)
```

#### 4.3 VHF导航台处理
```
开始处理VHF数据...
📡 正在处理VOR/DME导航台
🔢 计算导航台频率和覆盖范围
✅ VHF数据处理完成 (处理了 89 个导航台)
```

#### 4.4 GS着陆引导系统
```
开始处理GS数据...
🛬 正在处理ILS着陆系统
📐 计算滑行坡度和位置
✅ GS数据处理完成
```

#### 4.5 NDB导航台处理
```
开始处理NDB数据...
📻 正在处理非定向信标台
🧭 计算NDB磁偏角
✅ NDB数据处理完成 (处理了 45 个NDB)
```

#### 4.6 航路点数据处理
```
开始处理航路点数据...
🗺️ 正在处理航路航路点
✅ 航路点数据处理完成 (处理了 2,453 个点)
```

#### 4.7 终端区域点处理
```
开始处理终端点数据...
🏢 正在处理终端区域航路点
✅ 终端点数据处理完成 (处理了 876 个点)
```

#### 4.8 SID离场程序处理
```
开始处理离场程序...
🛫 正在处理SID程序
📋 解析程序航路点和限制
✅ 离场程序处理完成 (处理了 234 个程序)
```

#### 4.9 STAR进场程序处理
```
开始处理进场程序...
🛬 正在处理STAR程序
📋 解析程序航路点和限制
✅ 进场程序处理完成 (处理了 198 个程序)
```

#### 4.10 IAP进近程序处理
```
开始处理进近程序...
🎯 正在处理进近程序
📋 解析进近航路点和限制
✅ 进近程序处理完成 (处理了 445 个程序)
```

#### 4.11 航路数据处理
```
开始处理航路数据...
🛣️ 正在处理高低空航路
🔗 建立航路点连接关系
✅ 航路数据处理完成 (处理了 167 条航路)
```

#### 4.12 数据库优化
```
🗜️ 正在压缩数据库...
📊 删除临时索引...
✅ 数据库优化完成
```

### ⏱️ 第五步：处理完成

```
=====================================
🎉 数据处理完成，用时 127.3 秒
📄 输出文件：C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 数据库大小：15.6 MB
📈 处理统计：
   - 机场: 156 个
   - 跑道: 312 条
   - VHF导航台: 89 个
   - NDB导航台: 45 个
   - 航路点: 3,329 个
   - SID程序: 234 个
   - STAR程序: 198 个
   - 进近程序: 445 个
   - 航路: 167 条
=====================================
按Enter键退出...
```

## 🚁 数据部署指南

### 📁 目标飞机识别

根据您使用的飞机插件选择对应的部署路径：

#### iniBuilds A350系列
```
[MSFS Community文件夹]\inibuilds-aircraft-a350\work\NavigationData\
```

#### PMDG 737系列
```
[MSFS Community文件夹]\pmdg-aircraft-737\Config\Navdata\
[MSFS Community文件夹]\pmdg-aircraft-738\Config\Navdata\
[MSFS Community文件夹]\pmdg-aircraft-739\Config\Navdata\
```

#### PMDG 777系列
```
[MSFS Community文件夹]\pmdg-aircraft-77w\Config\Navdata\
[MSFS Community文件夹]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 部署流程

#### 步骤1：备份现有数据

**重要**：始终在部署新数据前创建备份！

```powershell
# 备份现有导航数据
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "备份创建完成: $backupDir"
```

#### 步骤2：清空缓存目录

清空MSFS的导航数据缓存：

**MSFS 2020 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2020 (Steam)** 
```
%APPDATA%\Microsoft Flight Simulator\Packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalState\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator 2024\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

#### 步骤3：部署新数据

将转换后的数据库文件复制到目标位置：

```bash
# 复制数据库文件
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[目标导航数据目录]\"
```

#### 步骤4：验证部署

启动MSFS并加载飞机，检查以下项目：

- [ ] FMC正常启动且无数据库错误
- [ ] 能够查询机场信息（ICAO代码）
- [ ] 能够规划航路（起点到终点）
- [ ] SID/STAR程序可用且完整
- [ ] 进近程序可选择且数据正确

## 🔧 高级使用技巧

### 📊 批量处理脚本

创建批处理脚本实现自动化操作：

```batch
@echo off
echo ======================================
echo     Nav-data 自动转换脚本
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. 开始数据转换...
python XP2INI_NDB_Converter.py

echo 2. 备份现有数据...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. 清空缓存...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. 部署新数据...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. 完成！
pause
```

### 🔄 定期更新工作流

设置自动更新流程：

```python
#!/usr/bin/env python3
"""自动更新工作流"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """执行导航数据更新"""
    print(f"🔄 开始更新导航数据 - {datetime.now()}")
    
    try:
        # 运行转换程序
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ 导航数据更新成功！")
            # 这里可以添加自动部署逻辑
        else:
            print("❌ 更新失败：", result.stderr)
            
    except Exception as e:
        print(f"❌ 更新异常：{e}")

# 每28天运行一次（AIRAC周期）
schedule.every(28).days.do(update_navdata)

# 保持脚本运行
print("📅 导航数据自动更新调度器已启动")
while True:
    schedule.run_pending()
    time.sleep(3600)  # 每小时检查一次
```

### 🔍 数据质量验证

创建验证脚本检查输出数据质量：

```python
#!/usr/bin/env python3
"""数据质量验证脚本"""

import sqlite3
import os

def validate_database(db_path):
    """验证数据库完整性和数据质量"""
    
    if not os.path.exists(db_path):
        print(f"❌ 数据库文件不存在: {db_path}")
        return False
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 检查表结构
    tables = [
        'tbl_airports',
        'tbl_runways', 
        'tbl_d_vhfnavaids',
        'tbl_db_enroute_ndbnavaids',
        'tbl_ea_enroute_waypoints',
        'tbl_pc_terminal_waypoints',
        'tbl_pd_sids',
        'tbl_er_enroute_airways'
    ]
    
    print("🔍 数据库验证报告")
    print("=" * 40)
    
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count} 条记录")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: 表不存在或查询失败")
    
    # 检查数据质量
    print("\n📊 数据质量检查")
    print("=" * 40)
    
    # 检查空坐标
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports 
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]
    
    if null_coords == 0:
        print("✅ 机场坐标: 无空值")
    else:
        print(f"⚠️ 机场坐标: {null_coords} 个空值")
    
    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 常见使用问题

### 转换过程问题

#### 问题：程序中途停止
```bash
# 原因：数据文件损坏或路径错误
# 解决：检查所有输入文件的完整性
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: 文件不存在')
"
```

#### 问题：内存不足错误
```python
# 解决：减少批处理大小
# 在配置中设置较小的BATCH_SIZE
BATCH_SIZE = 500  # 减少到500
```

#### 问题：数据库锁定错误
```bash
# 原因：其他程序正在使用数据库
# 解决：关闭所有相关程序后重新运行
taskkill /f /im "FlightSimulator.exe"
```

### 部署问题

#### 问题：FMC显示"DB OUT OF DATE"
```bash
# 原因：
# 1. 数据库文件未正确复制
# 2. MSFS缓存未清空
# 3. AIRAC周期不匹配

# 解决步骤：
# 1. 确认数据库文件存在于正确位置
# 2. 完全删除NavigationData缓存文件夹内容
# 3. 重启MSFS
```

#### 问题：部分航路点或程序缺失
```bash
# 原因：CIFP数据不完整
# 解决：
# 1. 重新下载完整的CIFP数据包
# 2. 确认目标机场的程序文件存在
# 3. 检查ICAO区域码是否在支持范围内
```

## 📈 性能优化

### 🚀 提升转换速度

```python
# 启用多进程处理
MULTIPROCESS_WORKERS = 8  # 根据CPU核心数调整

# 使用SSD存储
# 将工作目录设置在SSD上可显著提升I/O性能

# 增加可用内存
# 关闭不必要的程序，确保至少8GB可用内存
```

### 📊 监控资源使用

```python
import psutil
import time

def monitor_performance():
    """监控系统资源使用情况"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent
        
        print(f"CPU: {cpu}% | 内存: {memory}% | 磁盘: {disk}%")
        time.sleep(5)

# 在转换过程中运行监控
monitor_performance()
```

---

恭喜！您已经掌握了Nav-data工具的完整使用流程。 