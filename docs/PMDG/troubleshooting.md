# 🔧 故障排除指南

本指南涵盖了使用 Nav-data PMDG 转换工具时可能遇到的常见问题及其解决方案。按问题类型分类，便于快速定位和解决。

---

## 🚨 安装问题

### ❌ Python 环境问题

#### **问题**: `python: command not found` 或 `'python' 不是内部或外部命令`
**症状**: 
```bash
'python' is not recognized as an internal or external command
```

**解决方案**:
```bash
# 1. 验证Python安装
python --version
# 或
python3 --version

# 2. 检查PATH环境变量
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. 重新安装Python (推荐从官网下载)
# https://www.python.org/downloads/
```

#### **问题**: 依赖包安装失败
**症状**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**解决方案**:
```bash
# 1. 更新pip
python -m pip install --upgrade pip

# 2. 使用国内镜像源 (中国用户)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. 清理pip缓存
pip cache purge

# 4. 使用虚拟环境
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ 权限问题

#### **问题**: 访问 MSFS 目录被拒绝
**症状**:
```
PermissionError: [Errno 13] Permission denied
```

**解决方案**:
```bash
# Windows用户
# 1. 以管理员身份运行命令提示符
# 2. 或者修改目录权限
icacls "C:\Users\[用户名]\AppData\Local\Packages" /grant Users:F /T

# 检查MSFS目录权限
# 右键目录 -> 属性 -> 安全 -> 编辑 -> 添加完全控制权限
```

---

## 🔄 转换问题

### ❌ 数据文件问题

#### **问题**: 无法找到AIRAC数据文件
**症状**:
```
FileNotFoundError: AIRAC data file not found
```

**诊断步骤**:
```bash
# 1. 验证文件路径
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. 检查文件权限
ls -la *.dat *.txt *.xml      # 检查数据文件
```

**解决方案**:
```bash
# 1. 确认数据文件格式和位置
mkdir -p ./input/AIRAC2024-01
# 将AIRAC数据文件放入正确目录

# 2. 验证文件完整性
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **问题**: 数据格式不兼容
**症状**:
```
ValueError: Unsupported data format or corrupted file
```

**解决方案**:
```bash
# 1. 检查支持的格式
python converter.py --list-supported-formats

# 2. 转换数据格式
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. 使用调试模式获取详细信息
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ 转换过程错误

#### **问题**: 内存不足错误
**症状**:
```
MemoryError: Unable to allocate array
```

**解决方案**:
```bash
# 1. 分块处理大型数据集
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. 启用数据流处理
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. 增加虚拟内存 (Windows)
# 控制面板 -> 系统 -> 高级系统设置 -> 虚拟内存

# 4. 优化系统资源
# 关闭不必要的程序
# 清理临时文件
```

#### **问题**: 坐标转换错误
**症状**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**解决方案**:
```bash
# 1. 验证坐标系统设置
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. 使用备用转换方法
python converter.py --coordinate-method=alternative --precision=8

# 3. 检查磁偏角设置
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ 配置问题

### ❌ PMDG 集成问题

#### **问题**: PMDG 飞机无法识别导航数据
**症状**: FMC显示"NAV DATA NOT FOUND"或导航点无法加载

**诊断步骤**:
```bash
# 1. 检查PMDG数据目录
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. 验证数据库文件
python verify_pmdg_db.py --check-tables --check-indexes
```

**解决方案**:
```bash
# 1. 确认PMDG数据路径
python converter.py --pmdg-path="C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. 重新生成数据库索引
python rebuild_indexes.py --database=pmdg_nav.db

# 3. 检查文件权限
icacls "PMDG数据目录" /grant Users:F /T

# 4. 重启MSFS和PMDG飞机
```

#### **问题**: 数据版本不匹配
**症状**: PMDG显示旧的AIRAC周期或数据不更新

**解决方案**:
```bash
# 1. 强制更新AIRAC标识
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. 清除缓存
python clear_cache.py --pmdg-cache --nav-cache

# 3. 验证AIRAC周期
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 性能问题

### ❌ 转换速度慢

#### **问题**: 转换过程异常缓慢
**可能原因**:
- 硬盘I/O瓶颈
- 内存不足
- CPU使用率低
- 网络延迟（在线验证）

**优化方案**:
```bash
# 1. 启用多进程处理
python converter.py --parallel=4 --workers=auto

# 2. 使用SSD临时目录
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. 禁用不必要的验证
python converter.py --skip-validation --no-online-check

# 4. 优化I/O操作
python converter.py --buffer-size=64MB --async-io
```

### ❌ 内存使用过高

#### **问题**: 转换过程消耗大量内存
**监控内存使用**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**解决方案**:
```bash
# 1. 启用流式处理
python converter.py --streaming --chunk-size=10MB

# 2. 限制内存使用
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. 分阶段处理
python converter.py --process-by-region --region-size=small
```

---

## 🔍 数据验证问题

### ❌ 数据完整性检查失败

#### **问题**: 验证工具报告数据不完整
**症状**:
```
ValidationError: Missing required navigation points
```

**诊断工具**:
```bash
# 1. 运行完整验证
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. 检查特定数据类型
python validate_data.py --check-airports --check-navaids --check-airways

# 3. 比较与参考数据
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**修复方案**:
```bash
# 1. 重新下载源数据
# 确保AIRAC数据完整和最新

# 2. 使用修复工具
python repair_data.py --fix-missing --interpolate-gaps

# 3. 手动补充缺失数据
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ 坐标精度问题

#### **问题**: 导航点位置不准确
**检查方法**:
```bash
# 1. 验证特定航点坐标
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. 对比多个数据源
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. 生成偏差报告
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 日志分析

### 🔍 理解日志文件

#### **日志级别说明**:
- **DEBUG**: 详细调试信息
- **INFO**: 一般处理信息
- **WARNING**: 警告信息，不影响功能
- **ERROR**: 错误信息，需要关注
- **CRITICAL**: 严重错误，处理中断

#### **常见日志模式**:
```bash
# 查找错误日志
grep "ERROR\|CRITICAL" converter.log

# 统计警告数量
grep -c "WARNING" converter.log

# 分析处理时间
grep "Processing time" converter.log | tail -10
```

### 🔧 日志配置

#### **增加日志详细程度**:
```bash
# 启用详细日志
python converter.py --log-level=DEBUG --log-format=detailed

# 分离不同类型日志
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 紧急修复

### 🚨 数据损坏恢复

#### **步骤1**: 立即备份
```bash
# 备份当前状态
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **步骤2**: 从备份恢复
```bash
# 恢复最近的有效备份
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **步骤3**: 验证恢复
```bash
# 验证恢复的数据
python validate_data.py --quick-check --report-only-errors
```

### 🚨 重置为默认状态

#### **完全重置**:
```bash
# 警告：这将删除所有转换的数据
python reset_tool.py --full-reset --confirm

# 重新下载默认配置
python setup.py --download-config --reset-settings

# 重新运行初始化
python init.py --first-time-setup
```

---

## 📞 获取进一步帮助

### 📝 报告问题时请提供

1. **系统信息**:
   ```bash
   python --version
   python system_info.py --full-report
   ```

2. **错误日志**:
   - 完整的错误堆栈跟踪
   - 相关的警告信息
   - 处理前后的日志片段

3. **环境信息**:
   - 操作系统版本
   - MSFS版本和安装方式
   - PMDG飞机版本
   - 数据源和AIRAC周期

4. **重现步骤**:
   - 详细的操作步骤
   - 输入的命令和参数
   - 预期结果 vs 实际结果

### 🔗 联系方式

- **GitHub Issues**: [提交问题报告](https://github.com/nav-data/docs/issues/new)
- **社区论坛**: [参与讨论](https://github.com/nav-data/docs/discussions)
- **紧急支持**: support@nav-data.org

---

## 🔄 预防措施

### ✅ 最佳实践清单

- [ ] **定期备份**数据和配置
- [ ] **使用最新版本**的转换工具
- [ ] **验证数据**在每次转换后
- [ ] **监控日志**了解潜在问题
- [ ] **保持环境**清洁和更新
- [ ] **文档记录**自定义配置

### 📅 维护计划

- **每周**: 检查日志文件，清理临时文件
- **每月**: 更新AIRAC数据，验证工具版本
- **每季度**: 完整系统检查，性能优化
- **重要更新时**: 完整备份，谨慎升级

记住：预防胜于治疗！定期维护可以避免大部分问题的发生。 