# 🙋 常见问题解答 (FAQ)

## 📥 安装相关

### Q1: 系统最低要求是什么？
**A:** 
- **操作系统**: Windows 10/11, macOS 10.15+, Linux
- **Python版本**: 3.8+ (推荐 3.9 或更高版本)
- **内存**: 至少 4GB RAM (推荐 8GB+)
- **存储空间**: 至少 2GB 可用空间
- **MSFS版本**: Microsoft Flight Simulator 2020 或 2024

### Q2: 支持哪些 Python 版本？
**A:** 支持 Python 3.8 及以上版本。推荐使用 Python 3.9 或 3.10 以获得最佳性能和兼容性。

### Q3: 是否需要管理员权限？
**A:** 是的，在Windows系统上需要管理员权限来访问MSFS安装目录和写入数据文件。

### Q4: 可以在虚拟环境中安装吗？
**A:** 强烈推荐使用虚拟环境（如 venv 或 conda）来隔离依赖，避免与其他Python项目冲突。

## ⚙️ 配置相关

### Q5: 如何获取有效的 AIRAC 数据？
**A:** 您需要订阅以下服务之一：
- **Navigraph**: 提供全球完整的导航数据 (推荐)
- **Aerosoft NavDataPro**: 针对欧洲和部分区域
- **Jeppesen**: 商业级导航数据服务

### Q6: AIRAC 周期是什么？多久需要更新一次？
**A:** AIRAC（Aeronautical Information Regulation and Control）是国际标准的航空信息更新周期，每28天更新一次。建议与现实世界的AIRAC周期保持同步。

### Q7: 数据文件应该放在哪里？
**A:** 
```
推荐目录结构：
C:/Nav-data/
├── input/          # 输入的原始数据文件
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # 转换后的PMDG格式文件
└── backup/         # 数据备份
```

### Q8: 如何验证配置是否正确？
**A:** 运行内置的配置验证命令：
```bash
python verify_config.py --check-all
```

## 🔄 使用相关

### Q9: 转换过程需要多长时间？
**A:** 根据数据量和系统性能：
- **小型数据集** (单个机场): 1-2分钟
- **区域数据集**: 5-15分钟  
- **全球数据集**: 30-60分钟

### Q10: 可以只转换特定区域的数据吗？
**A:** 是的，支持区域过滤：
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: 如何备份现有数据？
**A:** 转换前会自动创建备份，也可以手动备份：
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: 转换后的数据存储在哪里？
**A:** 
- **默认位置**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **Steam版 MSFS**: `C:/Users/[用户名]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **Microsoft Store版**: 类似Steam版，但ID不同

## ✈️ 兼容性相关

### Q13: 支持哪些 PMDG 飞机？
**A:** 
- ✅ **PMDG 737-600/700/800/900** (全系列)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (货机版本)
- 🔄 **PMDG 747-8** (计划支持)

### Q14: 与 MSFS 2024 兼容吗？
**A:** 是的，完全兼容 Microsoft Flight Simulator 2024。确保使用最新版本的转换工具。

### Q15: 可以与其他导航数据工具同时使用吗？
**A:** 不推荐同时使用多个导航数据工具，可能会导致数据冲突。使用前请备份并移除其他工具的数据。

### Q16: 支持第三方机场插件吗？
**A:** 支持，但需要确保：
- 第三方机场使用标准ICAO代码
- 导航数据包含该机场的信息
- 机场插件与PMDG飞机兼容

## 🌍 数据相关

### Q17: 支持哪些地区的数据？
**A:** 主要覆盖区域：
- ✅ **中国大陆全境** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **香港、澳门** (VH, VM)
- ✅ **台湾地区** (RC)
- ✅ **东南亚部分** (VT, VH, WS)
- ⚠️ **其他区域** (数据质量可能有限)

### Q18: 数据准确性如何？
**A:** 
- **AIRAC标准**: 严格遵循国际民航组织标准
- **精度等级**: 支持8位小数精度坐标
- **验证机制**: 内置多层数据验证和完整性检查
- **更新频率**: 跟随官方AIRAC周期更新

### Q19: 如何验证数据完整性？
**A:** 使用内置验证工具：
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: 数据是否包含中文内容？
**A:** 是的，支持中文：
- 机场中英文名称
- 导航点中英文标识
- 程序名称本地化

## 🔧 技术相关

### Q21: 如何启用调试模式？
**A:** 
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: 日志文件在哪里？
**A:** 
- **默认位置**: `./logs/converter_[日期].log`
- **调试日志**: `./logs/debug_[日期].log`
- **错误日志**: `./logs/error_[日期].log`

### Q23: 如何优化转换性能？
**A:** 
- 使用SSD存储
- 增加内存到8GB以上
- 启用多进程处理：`--parallel=4`
- 关闭不必要的后台程序

### Q24: 支持命令行批处理吗？
**A:** 是的，支持完整的命令行界面：
```bash
# 批量转换
python converter.py --batch --config-file=batch_config.json

# 定时任务
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 获取帮助

### Q25: 遇到问题如何获取支持？
**A:** 
1. **查看日志文件** - 了解具体错误信息
2. **检查文档** - 阅读相关章节说明
3. **搜索已知问题** - 查看 [GitHub Issues](https://github.com/nav-data/docs/issues)
4. **提交新问题** - 包含完整的日志和系统信息
5. **社区讨论** - 参与 [GitHub Discussions](https://github.com/nav-data/docs/discussions)

### Q26: 如何报告Bug？
**A:** 请在GitHub Issues中报告，包含：
- 详细的错误描述
- 完整的错误日志
- 系统环境信息
- 重现步骤
- 预期结果 vs 实际结果

### Q27: 可以贡献代码吗？
**A:** 当然欢迎！请参考：
- [贡献指南](contributing.md)
- [代码规范](contributing.md#代码规范)
- [提交流程](contributing.md#提交流程)

---

## 🔍 找不到答案？

如果您的问题未在此列表中，请：

1. 📖 查看 [故障排除指南](troubleshooting.md)
2. 🔍 使用页面顶部的搜索功能
3. 💬 在 [GitHub Discussions](https://github.com/nav-data/docs/discussions) 提问
4. 📧 发送邮件至：support@nav-data.org

我们会持续更新此FAQ，感谢您的反馈和建议！ 