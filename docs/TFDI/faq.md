# ❓ TFDI 导航数据转换器常见问题

## 🔧 安装和配置

### Q: 我需要安装哪些软件才能使用转换器？

**A:** 您需要以下软件环境：
- **Python 3.8+** (推荐 3.9 或更高版本)
- **TFDI MD-11** 已安装在 Microsoft Flight Simulator 中
- **Fenix A320** (用于获取导航数据库文件)
- 必要的 Python 依赖包（通过 requirements.txt 安装）

### Q: 如何获取 Fenix 导航数据库文件？

**A:** Fenix 数据库文件通常位于：
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**注意事项：**
- 确保 Fenix A320 已安装并至少运行过一次
- 数据库文件大小通常为 50-200MB
- 文件必须是完整且未损坏的 SQLite 数据库

### Q: 转换器支持哪些版本的 Fenix 和 TFDI？

**A:** 当前支持版本：
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **数据库格式**: SQLite 3.x

**版本兼容性：**
- ✅ 完全兼容：Fenix v1.1.x + TFDI v1.1.x
- ⚠️ 需要验证：最新版本可能需要等待兼容性更新
- ❌ 不支持：过旧的 Beta 版本

## 📊 数据转换

### Q: 转换过程需要多长时间？

**A:** 转换时间取决于数据库大小：
- **小型数据库** (< 50MB): 2-5 分钟
- **中型数据库** (50-200MB): 5-15 分钟
- **大型数据库** (200-500MB): 15-45 分钟

**影响因素：**
- 硬盘类型（SSD 比 HDD 快 2-3 倍）
- 可用内存（建议 8GB+）
- CPU 性能（多核心有优势）
- 系统负载（关闭不必要程序）

### Q: 什么是终端 ID，如何设置？

**A:** 终端 ID 是 TFDI 系统中用于标识终端程序的唯一编号。

**设置建议：**
```
起始 ID: 1000 (默认)
ID 范围: 1-999999
推荐范围: 1000-9000 (留有扩展空间)
```

**分配策略：**
- 每个机场预留 20-50 个 ID
- 按地区分组分配（如亚洲区域 1000-3000）
- 避免与现有 TFDI 数据冲突

### Q: 转换后的文件保存在哪里？

**A:** 转换器会生成一个 `Primary.7z` 压缩包，包含：

```
Primary.7z
├── AirportLookup.json      # 机场查找数据
├── Airports.json           # 机场信息
├── AirwayLegs.json        # 航路段数据
├── Airways.json           # 航路定义
├── Ilses.json             # ILS 进近数据
├── NavaidLookup.json      # 导航设备查找
├── Navaids.json           # 导航设备数据
├── Runways.json           # 跑道信息
├── Terminals.json         # 终端程序数据
├── WaypointLookup.json    # 航路点查找
├── Waypoints.json         # 航路点定义
└── ProcedureLegs/         # 程序段目录
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: FAF 点检测是什么？为什么重要？

**A:** FAF (Final Approach Fix) 是精密进近程序中的最终进近定位点。

**重要性：**
- 标记精密进近的开始点
- VNAV 计算的关键参考点
- 影响自动驾驶仪的进近模式

**检测标准：**
- VNAV 角度 ≤ 2.5° (可配置)
- 位于进近程序的最后阶段
- 具有高度限制信息

## 🐛 故障排除

### Q: 出现 "数据库文件损坏" 错误怎么办？

**错误信息：**
```
SQLite Error: database disk image is malformed
数据库文件可能已损坏
```

**解决方案：**
1. **重新获取数据库**：
   ```bash
   # 删除可能损坏的文件
   rm path/to/nd.db3
   
   # 重新启动 Fenix A320 让其重新生成
   ```

2. **验证文件完整性**：
   ```python
   import sqlite3
   
   try:
       conn = sqlite3.connect('nd.db3')
       conn.execute('PRAGMA integrity_check')
       print("数据库完整性检查通过")
   except Exception as e:
       print(f"数据库损坏: {e}")
   ```

3. **使用数据库修复工具**：
   ```bash
   # 使用 SQLite 工具尝试修复
   sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
   ```

### Q: 转换器卡在某个步骤不动怎么办？

**常见卡住的步骤：**
- 数据库验证阶段
- 大表数据处理阶段
- JSON 序列化阶段
- 压缩打包阶段

**排查方法：**
```bash
# 1. 检查系统资源
top  # Linux/macOS
# 或任务管理器 (Windows)

# 2. 查看日志文件
tail -f converter.log

# 3. 检查磁盘空间
df -h  # Linux/macOS
# 或在 Windows 中检查驱动器空间
```

**解决方案：**
1. **重启转换器**：完全退出后重新启动
2. **增加内存**：关闭其他程序释放内存
3. **检查权限**：确保有写入权限
4. **分步调试**：使用调试模式查看详细信息

### Q: 转换后的 JSON 文件在 TFDI 中无法识别？

**可能原因：**
1. **版本不兼容**：TFDI 版本与 JSON 格式版本不匹配
2. **文件损坏**：压缩或传输过程中文件损坏
3. **格式错误**：JSON 格式不符合 TFDI 标准
4. **编码问题**：字符编码不正确

**验证步骤：**
```bash
# 1. 验证 JSON 格式
python -m json.tool Primary/Airports.json

# 2. 检查文件大小
ls -lh Primary/

# 3. 验证压缩包完整性
7z t Primary.7z
```

**修复方法：**
1. **重新转换**：删除输出文件夹后重新转换
2. **手动解压**：解压 7z 文件检查内容
3. **版本更新**：确保使用最新版本的转换器
4. **联系支持**：如问题持续存在，请报告 Bug

## 📈 性能优化

### Q: 如何提高转换速度？

**硬件优化：**
- **使用 SSD**：固态硬盘比机械硬盘快 3-5 倍
- **增加内存**：推荐 8GB+ RAM
- **多核 CPU**：支持并行处理
- **关闭杀毒**：临时关闭实时扫描

**软件优化：**
```python
# 调整配置参数
config = ConverterConfig(
    coordinate_precision=6,    # 降低精度提升速度
    batch_size=2000,          # 增加批处理大小
    enable_compression=False,  # 禁用实时压缩
    max_workers=4             # 设置并行线程数
)
```

**环境优化：**
```bash
# 设置环境变量
export PYTHONOPTIMIZE=1       # 启用字节码优化
export SQLITE_TEMP_STORE=3    # 使用内存临时存储
```

### Q: 内存使用过高怎么办？

**监控内存使用：**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"内存使用率: {memory.percent}%")
    print(f"可用内存: {memory.available // 1024**2} MB")
```

**优化策略：**
1. **减少批处理大小**：
   ```python
   config.batch_size = 500  # 从默认 1000 减少到 500
   ```

2. **分步处理**：
   ```python
   # 分批处理大表
   tables = ['Airports', 'Runways', 'Waypoints']
   for table in tables:
       converter.process_table(table)
       gc.collect()  # 强制垃圾回收
   ```

3. **流式处理**：启用流式处理模式处理大文件

### Q: 可以同时运行多个转换器实例吗？

**技术上可行，但有限制：**
- **数据库锁定**：SQLite 不支持多个写入连接
- **资源竞争**：多实例会竞争 CPU 和内存
- **磁盘 I/O**：可能导致磁盘瓶颈

**推荐做法：**
```bash
# 串行处理多个数据库
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# 或使用批处理脚本
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 数据验证

### Q: 如何验证转换结果的正确性？

**自动验证工具：**
```python
# 使用内置验证器
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ 验证通过")
else:
    print("❌ 验证失败:")
    for error in result.errors:
        print(f"  - {error}")
```

**手动验证清单：**
- [ ] **文件完整性**：所有必需的 JSON 文件都存在
- [ ] **数据数量**：记录数量合理且无异常减少
- [ ] **坐标范围**：纬度 [-90, 90]，经度 [-180, 180]
- [ ] **引用完整性**：外键关系保持完整
- [ ] **特殊字符**：UTF-8 编码正确处理

**TFDI 中验证：**
1. 安装转换后的数据包
2. 创建飞行计划测试航路
3. 检查 FMC 中的程序显示
4. 验证导航设备频率和位置

### Q: 转换后数据量明显减少是什么原因？

**可能原因：**
1. **数据过滤**：转换器过滤了不兼容或无效的数据
2. **区域限制**：可能只转换了特定区域的数据
3. **格式限制**：某些 Fenix 特有格式无法转换
4. **版本差异**：不同版本的数据结构差异

**检查方法：**
```python
# 比较转换前后的记录数量
def compare_record_counts(fenix_db, tfdi_json_dir):
    # 统计 Fenix 数据库记录
    fenix_counts = count_fenix_records(fenix_db)
    
    # 统计 TFDI JSON 记录
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # 对比结果
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 获取帮助

### Q: 在哪里可以获得技术支持？

**官方支持渠道：**
- **GitHub Issues**: 报告 Bug 和功能请求
- **GitHub Discussions**: 使用问题和一般讨论
- **项目文档**: 查阅完整的用户指南
- **示例代码**: 参考项目中的示例

**社区支持：**
- **飞行模拟论坛**: 相关飞行模拟社区
- **Discord 群组**: 实时交流和互助
- **QQ/微信群**: 中文用户交流群

### Q: 如何报告问题或建议新功能？

**问题报告流程：**
1. **搜索现有问题**：避免重复报告
2. **收集信息**：
   - 详细的错误描述
   - 完整的错误日志
   - 系统环境信息
   - 重现步骤
3. **创建 Issue**：使用提供的模板
4. **提供示例**：如果可能，提供最小重现示例

**功能建议：**
- 详细描述新功能的用途
- 说明功能的预期行为
- 考虑对现有用户的影响
- 提供实现建议（如果有的话）

### Q: 可以贡献代码吗？如何参与开发？

**贡献方式：**
- **Bug 修复**：修复已知问题
- **新功能开发**：实现新的转换功能
- **性能优化**：提升转换速度和效率
- **文档改进**：完善用户文档和 API 文档
- **测试增强**：增加测试用例和覆盖率

**参与步骤：**
1. **Fork 项目**：创建自己的项目分支
2. **设置开发环境**：按照贡献指南配置
3. **选择任务**：从 Issues 中选择适合的任务
4. **开发和测试**：编写代码并确保测试通过
5. **提交 PR**：创建 Pull Request 并等待审查

**贡献要求：**
- 遵循项目的编码规范
- 提供充分的测试覆盖
- 更新相关文档
- 使用清晰的提交信息

---

**找不到答案？** 

请在 [GitHub Issues](https://github.com/your-org/tfdi-converter/issues) 中搜索或创建新问题，我们会尽快回复！🚁✨
