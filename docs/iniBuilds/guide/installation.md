# iniBuilds 安装指南

本指南将帮助你为 iniBuilds 飞机在 Microsoft Flight Simulator 中安装最新的导航数据包。

---

## 📋 系统要求

### 最低要求
- **操作系统**: Windows 10 (版本 1909 或更高)
- **Microsoft Flight Simulator**: 标准版或豪华版
- **磁盘空间**: 至少 500MB 可用空间
- **内存**: 8GB RAM (推荐 16GB)

### 支持的 iniBuilds 飞机
- A300-600R/F 系列
- A310-200/300 系列
- BelugaXL 
- 其他 iniBuilds 发布的航空器

---

## 🛠️ 安装步骤

### 1. 准备工作

#### 1.1 备份现有数据
在开始安装前，强烈建议备份现有的导航数据：

```
[Community 文件夹]\inibuilds-aircraft-XXX\SimObjects\Airplanes\XXXX\Navdata\
```

将 `Navdata` 文件夹重命名为 `Navdata_backup`。

#### 1.2 获取最新数据包
- 访问 [Nav-data 发布页面](https://github.com/nav-data/inibuilds/releases)
- 下载最新版本的 `iniBuilds-NavData-vX.X.X.zip`
- 解压到临时文件夹

### 2. 定位 iniBuilds 飞机文件夹

#### 2.1 找到 Community 文件夹
Community 文件夹位置因 MSFS 安装方式而异：

**Microsoft Store 版本：**
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam 版本：**
```
C:\Users\[用户名]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

**Xbox Game Pass：**
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### 2.2 定位飞机目录
在 Community 文件夹中找到对应的 iniBuilds 飞机文件夹：
```
inibuilds-aircraft-a300    # A300 系列
inibuilds-aircraft-a310    # A310 系列
inibuilds-aircraft-beluga  # BelugaXL
```

### 3. 安装导航数据

#### 3.1 定位 Navdata 文件夹
进入飞机文件夹的导航数据目录：
```
[iniBuilds 飞机文件夹]\SimObjects\Airplanes\[飞机型号]\Navdata\
```

#### 3.2 复制新数据
1. 删除或重命名现有的 `Navdata` 文件夹
2. 将下载的新 `Navdata` 文件夹复制到此位置
3. 确保文件夹结构正确：
   ```
   Navdata\
   ├── airports\
   ├── airways\
   ├── fixes\
   ├── navaids\
   └── runways\
   ```

### 4. 清除缓存

#### 4.1 清除 MSFS 导航缓存
删除以下目录中的所有内容：
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[inibuilds-aircraft-XXX]\work\NavigationData
```

#### 4.2 清除飞机缓存 (如果存在)
某些 iniBuilds 飞机可能有额外的缓存文件夹：
```
[飞机文件夹]\Cache\
[飞机文件夹]\Work\
```

如果存在这些文件夹，请删除其中的内容。

### 5. 验证安装

#### 5.1 重启 MSFS
完全退出 Microsoft Flight Simulator，然后重新启动。

#### 5.2 检查数据加载
1. 进入 MSFS 并选择你的 iniBuilds 飞机
2. 创建飞行计划或加载现有飞行计划
3. 检查航点、导航台和机场信息是否正确显示

---

## 🔧 故障排除

### 常见问题

#### 问题 1：飞机无法启动或崩溃
**可能原因**：导航数据文件损坏或不兼容
**解决方案**：
1. 恢复备份的 `Navdata_backup` 文件夹
2. 重新下载并安装导航数据包
3. 检查飞机版本与数据包版本的兼容性

#### 问题 2：导航信息显示错误
**可能原因**：缓存未清除或数据包版本不匹配
**解决方案**：
1. 再次清除所有导航缓存
2. 确认使用正确版本的数据包
3. 检查飞机配置文件是否正确

#### 问题 3：找不到 Community 文件夹
**可能原因**：自定义安装路径或权限问题
**解决方案**：
1. 在 MSFS 设置中查看当前 Community 文件夹路径
2. 检查文件夹权限，确保有读写权限
3. 以管理员身份运行文件资源管理器

### 高级故障排除

#### 日志检查
如果遇到问题，可以检查 MSFS 日志文件：
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\Logs\
```

查找包含 "navdata" 或飞机名称的错误信息。

#### 配置文件检查
某些 iniBuilds 飞机有特定的配置文件：
```
[飞机文件夹]\SimObjects\Airplanes\[飞机型号]\aircraft.cfg
```

确保配置文件中的导航数据路径正确。

---

## ⚠️ 注意事项

### 版本兼容性
- 始终使用与你的 iniBuilds 飞机版本匹配的导航数据包
- 在更新飞机时，也需要相应更新导航数据

### 数据更新
- 建议每月检查一次数据包更新
- 订阅我们的 [GitHub 发布通知](https://github.com/nav-data/inibuilds/releases) 获取最新消息

### 性能影响
- 新的导航数据可能会略微影响加载时间
- 在配置较低的系统上，可以选择性安装数据包

---

## 📞 获取帮助

如果在安装过程中遇到问题：

1. **查看常见问题**: [FAQ 页面](../contributing.md#常见问题)
2. **社区支持**: 加入我们的 [QQ 群](../../Introduction/join.md#联系我们)
3. **提交问题**: 在 [GitHub Issues](https://github.com/nav-data/docs/issues) 报告技术问题
4. **邮件支持**: 发送邮件至 support@nav-data.org

---

> 🎉 **安装完成！** 现在你可以享受更准确、更真实的飞行体验了。别忘了查看我们的 [使用指南](./usage.md) 了解更多高级功能！ 