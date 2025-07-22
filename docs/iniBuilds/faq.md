# 🙋 常见问题解答 (FAQ)

## 📥 安装相关

### Q1: 支持哪些操作系统？
**A:** 
- ✅ **Windows 10/11** (推荐)
- ✅ **macOS 10.15+** (Catalina及以上)
- ✅ **Ubuntu 20.04+ / Debian 11+**
- ✅ **其他主流Linux发行版**

### Q2: Python环境要求是什么？
**A:** 
- **最低版本**: Python 3.8
- **推荐版本**: Python 3.9 或 3.10
- **不支持**: Python 3.7 及以下版本
- **虚拟环境**: 强烈推荐使用 venv 或 conda

### Q3: 需要多少存储空间？
**A:** 
- **工具本身**: ~50MB
- **依赖包**: ~200MB
- **临时处理空间**: 1-2GB
- **输出数据**: 500MB-1GB (取决于覆盖区域)
- **总建议**: 至少 4GB 可用空间

### Q4: 内存需求是多少？
**A:** 
- **最低**: 4GB RAM
- **推荐**: 8GB+ RAM
- **大规模转换**: 16GB+ RAM
- **虚拟内存**: 建议设置为物理内存的1.5倍

## ⚙️ 配置相关

### Q5: 如何获取导航数据？
**A:** 推荐数据源：
- **Navigraph** (首选) - 全球覆盖，28天更新周期
- **X-Plane数据** - 免费，但更新频率较低
- **NAIP数据** - 针对亚洲地区优化
- **自定义数据源** - 支持ARINC 424格式

### Q6: AIRAC周期如何理解？
**A:** 
- **周期长度**: 每28天一个周期
- **生效日期**: 每个月的特定日期 (通常是周四)
- **版本格式**: YYYY-CC (如2024-01表示2024年第1个周期)
- **有效期**: 28天，过期后建议更新

### Q7: 支持哪些数据格式？
**A:** 
**输入格式**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**输出格式**:
- ✅ iniBuilds A350 原生格式
- ✅ SQLite数据库
- ✅ JSON配置文件
- ✅ XML导出格式

### Q8: 如何配置数据源优先级？
**A:** 在配置文件中设置：
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 使用相关

### Q9: 转换过程需要多长时间？
**A:** 处理时间估算：
- **单个机场**: 30秒 - 2分钟
- **城市区域** (如北京周边): 5-10分钟
- **省级区域** (如广东省): 15-30分钟
- **国家级别** (如中国全境): 45-90分钟
- **全球数据**: 2-4小时

### Q10: 可以增量更新吗？
**A:** 支持智能增量更新：
```bash
# 仅更新变更的数据
python converter.py --incremental --since-date=2024-01-01

# 基于AIRAC周期更新
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### Q11: 如何验证转换结果？
**A:** 内置多层验证：
```bash
# 快速验证
python validate.py --quick-check

# 全面验证
python validate.py --comprehensive --report=html

# 与参考数据比较
python validate.py --compare-with=reference_data.db
```

### Q12: 支持批量处理吗？
**A:** 支持多种批量模式：
```bash
# 批量处理多个AIRAC周期
python batch_converter.py --airac-range=2024-01:2024-06

# 批量处理多个区域
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ iniBuilds 集成

### Q13: 支持哪些 iniBuilds 飞机？
**A:** 当前支持：
- ✅ **A350-900** - 完整支持所有系统
- ✅ **A350-900ULR** - 超长程版本
- ✅ **A350-1000** - 加长版本
- 🔄 **A320neo系列** - 开发中
- 🔄 **A330系列** - 计划支持

### Q14: 数据安装到哪里？
**A:** 自动检测安装路径：
- **默认路径**: `MSFS Community文件夹/inibuilds-aircraft-a350/SimObjects/`
- **Steam版**: `C:/Users/[用户]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Microsoft Store版**: 类似Steam版，但包ID不同
- **自定义路径**: 可在配置中指定

### Q15: 如何确认数据已正确加载？
**A:** 检查步骤：
1. **MCDU显示**: 查看AIRAC周期是否正确
2. **航路规划**: 尝试规划已知航路
3. **导航点检索**: 搜索特定导航点
4. **程序加载**: 加载SID/STAR程序

### Q16: 与其他导航数据工具兼容吗？
**A:** 
- ⚠️ **不建议**与其他工具同时使用
- 🔄 **冲突检测**：工具会自动检测并警告冲突
- 🛠️ **清理工具**：提供一键清理其他工具数据的功能
- 📋 **备份恢复**：支持在切换工具前自动备份

## 🌍 地理覆盖

### Q17: 主要覆盖哪些地区？
**A:** 详细覆盖区域：
- 🇨🇳 **中国大陆**: 所有ICAO区域 (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **香港**: VH区域
- 🇲🇴 **澳门**: VM区域  
- 🇹🇼 **台湾**: RC区域
- 🇻🇳 **越南**: VV区域
- 🇰🇷 **韩国**: RK区域 (部分)
- 🌏 **其他亚洲地区**: 数据质量因区域而异

### Q18: 数据精度如何？
**A:** 精度规格：
- **坐标精度**: 8位小数 (约1米精度)
- **高度精度**: 1英尺
- **频率精度**: 0.01 MHz
- **磁偏角**: 实时计算，使用WMM2020模型
- **更新频率**: 跟随AIRAC 28天周期

### Q19: 包含哪些导航数据类型？
**A:** 完整数据类型：
- ✈️ **机场信息**: ICAO代码、坐标、磁偏角、跑道信息
- 📡 **导航设备**: VOR、DME、NDB、TACAN
- 📍 **航路点**: 坐标、区域分类、用途标识
- 🛣️ **航路网络**: 高空/低空航路、连接关系
- 🛫 **离场程序**: SID (标准仪表离场)
- 🛬 **进场程序**: STAR (标准终端到达路线)
- 📐 **进近程序**: ILS、VOR、NDB、RNAV等各类进近
- 📶 **着陆系统**: ILS/GLS引导信息

### Q20: 中文本地化程度如何？
**A:** 
- ✅ **机场名称**: 中英文对照
- ✅ **城市名称**: 完整中文支持
- ✅ **航路点名称**: 拼音和中文标识
- ✅ **程序名称**: 本地化命名规则
- ✅ **用户界面**: 完整中文界面

## 🔧 技术相关

### Q21: 如何启用详细日志？
**A:** 
```bash
# 基本调试模式
python converter.py --debug

# 详细日志模式
python converter.py --verbose --log-level=DEBUG

# 保存日志到文件
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### Q22: 支持多线程处理吗？
**A:** 智能并行处理：
```bash
# 自动检测CPU核心数
python converter.py --parallel=auto

# 指定线程数
python converter.py --parallel=4

# 内存限制下的并行
python converter.py --parallel=2 --memory-limit=4GB
```

### Q23: 如何监控转换进度？
**A:** 多种进度监控方式：
- **控制台进度条**: 实时显示完成百分比
- **Web界面**: 可选的浏览器监控界面
- **日志文件**: 详细的阶段性进度记录
- **状态API**: JSON格式的进度查询接口

### Q24: 支持自动化部署吗？
**A:** 完整自动化支持：
```bash
# 计划任务模式
python scheduler.py --schedule=weekly --auto-update

# CI/CD集成
python converter.py --batch --no-interaction --exit-on-error

# Docker容器部署
docker run nav-data/converter --config=/app/config.json
```

## 🔍 性能优化

### Q25: 如何提高转换速度？
**A:** 性能优化建议：
- 💾 **使用SSD**: 显著提升I/O性能
- 🧠 **增加内存**: 减少磁盘交换
- ⚡ **启用并行**: 利用多核CPU
- 🗜️ **数据压缩**: 减少网络传输时间
- 🎯 **区域筛选**: 只处理需要的区域

### Q26: 内存使用过高怎么办？
**A:** 内存优化策略：
```bash
# 启用流式处理
python converter.py --streaming --chunk-size=1MB

# 限制内存使用
python converter.py --max-memory=2GB

# 临时文件优化
python converter.py --temp-dir=/tmp --cleanup-temp
```

### Q27: 网络问题如何处理？
**A:** 网络优化方案：
- 🌐 **离线模式**: 预下载所有数据
- 🔄 **断点续传**: 网络中断后自动恢复
- 🚀 **CDN加速**: 使用就近服务器
- 📦 **数据缓存**: 减少重复下载

## 🛡️ 数据安全

### Q28: 数据是否安全？
**A:** 多重安全保障：
- 🔒 **传输加密**: HTTPS/TLS 1.3
- 🔐 **存储加密**: AES-256文件加密
- ✅ **完整性校验**: SHA-256哈希验证
- 🔍 **来源验证**: 数字签名验证
- 🚫 **隐私保护**: 不收集个人信息

### Q29: 如何备份和恢复？
**A:** 完整备份方案：
```bash
# 创建完整备份
python backup.py --full --compress --encrypt

# 增量备份
python backup.py --incremental --since-date=2024-01-01

# 恢复备份
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 获取帮助

### Q30: 遇到问题怎么办？
**A:** 完整支持体系：

**1. 自助诊断**:
```bash
# 运行系统诊断
python diagnostic.py --comprehensive --report=html

# 检查常见问题
python health_check.py --fix-common-issues
```

**2. 社区支持**:
- 📖 [用户手册](guide/index.md)
- 🔧 [故障排除指南](troubleshooting.md)
- 💬 [GitHub讨论](https://github.com/nav-data/docs/discussions)
- 🐛 [问题报告](https://github.com/nav-data/docs/issues)

**3. 直接联系**:
- 📧 **技术支持**: technical@nav-data.org
- 🚨 **紧急问题**: urgent@nav-data.org
- 💬 **一般咨询**: info@nav-data.org

### Q31: 如何贡献和反馈？
**A:** 多种参与方式：
- 🐛 **Bug报告**: GitHub Issues
- 💡 **功能建议**: GitHub Discussions
- 📝 **文档改进**: Pull Request
- 💻 **代码贡献**: 查看[贡献指南](contributing.md)
- 🌐 **本地化**: 帮助翻译文档

### Q32: 有培训资料吗？
**A:** 丰富的学习资源：
- 📹 **视频教程**: YouTube频道和B站
- 📚 **用户手册**: PDF和在线版本
- 🎓 **在线课程**: 分步骤互动教程
- 📋 **快速指南**: 5分钟快速上手
- 🔬 **高级技巧**: 专家级使用技巧

---

## 🔍 找不到答案？

如果您的问题未在此FAQ中找到答案，请：

1. 🔍 **使用搜索**: 页面顶部的搜索功能
2. 📖 **查看文档**: [完整用户指南](guide/index.md)
3. 🛠️ **故障排除**: [问题解决指南](troubleshooting.md)
4. 💬 **社区讨论**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
5. 📧 **直接联系**: support@nav-data.org

我们承诺在24小时内回复所有技术咨询，感谢您选择Nav-data！

---

## 📊 使用统计

**常见问题排名** (基于用户反馈):
1. **安装配置问题** - 35%
2. **数据格式相关** - 22%  
3. **性能优化** - 18%
4. **iniBuilds集成** - 15%
5. **故障排除** - 10%

**用户满意度**: ⭐⭐⭐⭐⭐ 4.8/5.0 (基于1,200+用户评价)

**持续改进**: 我们每月更新FAQ内容，确保信息的时效性和准确性。 