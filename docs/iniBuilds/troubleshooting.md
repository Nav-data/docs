# 🔧 故障排除指南

本指南涵盖了使用 Nav-data iniBuilds 转换工具时可能遇到的常见问题及其解决方案。按问题严重程度和类型分类，便于快速诊断和解决。

---

## 🚨 紧急问题 (Critical Issues)

### ❌ 转换工具无法启动

#### **问题**: Python环境问题导致工具无法运行
**症状**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**立即解决方案**:
```bash
# 1. 验证Python环境
python --version  # 应该显示3.8+

# 2. 重新安装依赖
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. 检查工作目录
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. 重新克隆仓库(最后手段)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **问题**: 关键文件缺失
**症状**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**立即解决方案**:
```bash
# 1. 验证文件完整性
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. 重新下载缺失文件
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. 检查权限
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ 高优先级问题 (High Priority)

### ❌ A350数据集成失败

#### **问题**: iniBuilds A350无法识别导航数据
**症状**: MCDU显示"NO NAV DATA" 或 AIRAC显示为空

**诊断步骤**:
```bash
# 1. 检查A350安装路径
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. 验证社区文件夹
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. 检查数据文件
ls -la *.db *.sqlite *.json  # 在A350数据目录中
```

**解决方案**:
```bash
# 1. 重新定位A350安装
python converter.py --detect-aircraft --scan-community-folder

# 2. 手动指定路径
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. 修复文件权限
# Windows
icacls "A350数据目录" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. 验证安装
python verify_installation.py --aircraft=a350 --verbose
```

#### **问题**: AIRAC周期不匹配
**症状**: A350显示旧的或错误的AIRAC周期

**解决方案**:
```bash
# 1. 强制更新AIRAC标识
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. 清除A350缓存
# 删除A350缓存文件
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. 重新生成导航数据库
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. 验证AIRAC周期
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 安装和配置问题

### ❌ 依赖包安装失败

#### **问题**: 特定包安装失败
**常见错误**:
```bash
# 数学库依赖问题
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# 编译器问题
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**按平台解决**:

**Windows**:
```bash
# 1. 安装Visual Studio Build Tools
# 下载并安装: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. 使用预编译包
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. 使用conda (推荐)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. 安装Xcode Command Line Tools
xcode-select --install

# 2. 使用Homebrew安装依赖
brew install python@3.9 sqlite3

# 3. 重新安装Python包
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# 重新安装包
pip3 install -r requirements.txt
```

### ❌ 数据源配置问题

#### **问题**: 无法连接到数据源
**症状**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**网络诊断**:
```bash
# 1. 测试网络连接
ping navigraph.com
nslookup navigraph.com

# 2. 检查代理设置
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. 测试端口连通性
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**解决方案**:
```bash
# 1. 配置代理 (如果需要)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. 使用离线模式
python converter.py --offline --local-data=/path/to/airac/data

# 3. 更换数据源
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 数据处理问题

### ❌ 内存相关错误

#### **问题**: 内存不足导致转换失败
**症状**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**内存监控**:
```bash
# 实时监控内存使用
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**优化解决方案**:
```bash
# 1. 启用流式处理模式
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. 分区域处理
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. 优化系统内存
# 关闭不必要的应用程序
# 增加虚拟内存/交换空间

# Linux - 增加交换空间
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. 使用低内存模式
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ 数据格式错误

#### **问题**: 输入数据格式不兼容
**症状**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**数据验证**:
```bash
# 1. 检查文件编码
file input_data.dat
hexdump -C input_data.dat | head

# 2. 验证文件完整性
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. 检查文件格式
python validate_format.py --input=input_data.dat --format=arinc424
```

**修复方案**:
```bash
# 1. 转换文件编码
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. 使用格式转换器
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. 手动修复常见问题
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 性能问题

### ❌ 转换速度过慢

#### **问题**: 转换过程异常缓慢
**可能原因分析**:
- 磁盘I/O瓶颈 (HDD vs SSD)
- CPU使用率低 (单线程处理)
- 内存不足导致频繁交换
- 网络延迟 (在线验证)

**性能诊断**:
```bash
# 1. 监控系统资源
# Linux
iostat -x 1    # I/O统计
top -p $(pgrep python)  # CPU和内存

# macOS
iostat 1       # I/O统计  
top -pid $(pgrep python)  # 进程监控

# Windows
perfmon        # 性能监视器
wmic process get name,processid,percentprocessortime
```

**性能优化**:
```bash
# 1. 启用多进程处理
python converter.py --parallel=auto --workers=$(nproc)

# 2. 使用更快的存储
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. 禁用不必要的检查
python converter.py --skip-validation --no-backup --fast-mode

# 4. 内存映射模式 (大文件)
python converter.py --memory-map --buffer-size=64MB

# 5. 压缩输出 (减少I/O)
python converter.py --compress-output --compression=lz4
```

### ❌ CPU使用率过高

#### **问题**: 转换过程CPU占用率100%，系统响应缓慢
**解决方案**:
```bash
# 1. 限制CPU使用
python converter.py --cpu-limit=75 --nice=10

# 2. 降低并行度
python converter.py --parallel=2 --throttle=1000ms

# 3. 使用优先级控制
# Linux/macOS
nice -n 19 python converter.py  # 最低优先级

# Windows  
start /low python converter.py
```

---

## 🔍 iniBuilds A350 专属问题

### ❌ MCDU导航数据显示问题

#### **问题**: MCDU中导航数据显示不正确或不完整
**症状**:
- 航路点无法找到
- SID/STAR程序缺失
- 频率信息错误
- 坐标偏移

**诊断工具**:
```bash
# 1. 检查A350数据库完整性
python check_a350_db.py --comprehensive --report=detailed

# 2. 验证特定导航点
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. 比较数据一致性
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. 生成差异报告
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**修复步骤**:
```bash
# 1. 重新生成导航数据库
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. 手动修复关键航路点
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. 更新频率数据
python update_frequencies.py --aircraft=a350 --source=official

# 4. 验证修复结果
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ FMS航路规划问题

#### **问题**: A350 FMS无法正确规划航路
**症状**:
- "NO ROUTE FOUND"错误
- 航路段连接中断
- 高度限制错误

**解决步骤**:
```bash
# 1. 检查航路连接性
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. 验证航路点连接
python validate_connections.py --airway=A461 --aircraft=a350

# 3. 修复断开的航路
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. 重新构建航路网络
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 日志分析和诊断

### 🔍 理解错误日志

#### **常见错误模式和含义**:

**数据转换错误**:
```bash
# 坐标转换问题
ERROR: CoordinateTransformError: Invalid coordinate format
# -> 检查输入数据的坐标格式

# 数据库写入失败  
ERROR: DatabaseError: database is locked
# -> 关闭其他访问数据库的程序

# 文件权限问题
ERROR: PermissionError: [Errno 13] Permission denied
# -> 使用管理员权限或修改文件权限
```

**网络连接错误**:
```bash
# 连接超时
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> 检查网络连接，增加超时时间

# DNS解析失败
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> 检查DNS设置，使用备用DNS服务器
```

#### **日志级别详解**:
- **CRITICAL**: 程序无法继续执行的严重错误
- **ERROR**: 功能执行失败，但程序可以继续
- **WARNING**: 潜在问题，不影响当前执行
- **INFO**: 一般信息，处理进度等
- **DEBUG**: 详细调试信息，用于问题诊断

### 🛠️ 高级调试技巧

#### **启用详细调试**:
```bash
# 1. 最详细的日志
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. 分离不同类型的日志
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. 实时监控日志
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **性能分析**:
```bash
# 1. 启用性能分析
python -m cProfile -o profile_output.prof converter.py

# 2. 分析性能瓶颈
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. 内存使用分析
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 紧急恢复程序

### 🚨 数据损坏恢复

#### **快速恢复步骤**:
```bash
# 1. 立即停止所有相关进程
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. 创建当前状态快照
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. 从最近备份恢复
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. 验证恢复的数据
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 完全重置程序

#### **当所有方法都失败时**:
```bash
# 警告：这将删除所有转换数据和配置
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. 备份用户配置
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. 完全清理
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. 重新初始化
    python setup.py --fresh-install --default-config
    
    # 4. 恢复用户配置
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 获取专业支持

### 📝 准备支持请求

**在联系支持前，请收集以下信息**:

```bash
# 1. 系统信息报告
python system_report.py --full > system_info.txt

# 2. 错误日志 (最近100行)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. 配置文件
cp config.json config_for_support.json

# 4. 版本信息
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 支持渠道

#### **按紧急程度选择**:

**🚨 紧急 (24小时内影响飞行)**:
- 📧 **紧急邮箱**: emergency@nav-data.org
- 📱 **急切联系**: 微信群 "Nav-data紧急支援"

**⚠️ 重要 (1-3天内回复)**:
- 🐛 **GitHub Issues**: [创建详细问题报告](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **技术支持**: technical@nav-data.org

**💬 一般问题 (1周内回复)**:
- 🗣️ **社区讨论**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **一般支持**: support@nav-data.org

#### **支持请求模板**:
```
标题: [iniBuilds] 简洁描述问题 - 影响级别

环境信息:
- 操作系统: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Python版本: 3.9.7
- 工具版本: v2.1.3
- iniBuilds A350版本: v1.2.0
- MSFS版本: 2024

问题描述:
[详细描述问题现象]

重现步骤:
1. 第一步...
2. 第二步...
3. 问题出现

期望结果:
[描述预期的正确行为]

实际结果:
[描述实际发生的错误行为]

已尝试的解决方案:
- 尝试了方案A，结果...
- 尝试了方案B，结果...

附件:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 预防性维护

### ✅ 定期维护清单

#### **每周检查**:
- [ ] 查看日志文件，识别潜在问题
- [ ] 清理临时文件和缓存
- [ ] 验证A350数据加载正常
- [ ] 检查磁盘空间使用情况

```bash
# 自动化每周检查
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **每月检查**:
- [ ] 更新AIRAC数据
- [ ] 备份重要配置和数据
- [ ] 检查工具版本更新
- [ ] 性能基准测试

```bash
# 自动化每月维护
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **重大更新前**:
- [ ] 完整数据备份
- [ ] 测试环境验证
- [ ] 版本兼容性检查
- [ ] 回滚计划准备

### 📊 监控和告警

#### **设置自动监控**:
```bash
# 1. 创建监控脚本
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. 设置系统服务 (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. 设置任务计划 (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

记住：主动维护和监控可以预防绝大多数问题的发生，比事后修复更加高效！

---

**最后更新**: 2024年1月15日  
**文档版本**: v2.1  
**适用工具版本**: v2.1.0+ 