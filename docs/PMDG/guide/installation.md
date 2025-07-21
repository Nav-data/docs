# 安装指南

请按照以下步骤为你的 PMDG 737 & 777 飞机在 Microsoft Flight Simulator 中安装最新导航数据。

## 1. 找到 MSFS 的 Community 文件夹

Community 文件夹位置因安装方式不同而异：

- **Microsoft Store 版本：**
  ```
  C:\Users\[你的用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
  ```
- **Steam 版本：**
  ```
  C:\Users\[你的用户名]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
  ```
- **自定义路径：**
  设置 > 常规 > 用户体验 > 开发者 > 自定义包路径

## 2. 定位飞机的 Config 文件夹

进入对应 PMDG 飞机的 Config 文件夹：
```
[Community 文件夹]\pmdg-aircraft-XXX\Config\
```
将 `XXX` 替换为你的飞机代码（如 738、77w 等）。

## 3. 备份原有 Navdata

将原有 Navdata 文件夹重命名以备份：
```
[Config 文件夹]\Navdata\ → [Config 文件夹]\Navdata_backup\
```

## 4. 安装新导航数据

将本项目中的 `Navdata` 文件夹复制到飞机的 Config 文件夹下。此时应同时存在 `Navdata_backup` 和新的 `Navdata` 文件夹。

## 5. 清除导航缓存

删除以下路径下的所有内容：
```
C:\Users\[你的用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[pmdg-aircraft-XXX]\work\NavigationData
```
此步骤确保 MSFS 读取新数据。

## 6. 重启 MSFS

完全退出并重启 Microsoft Flight Simulator，选择你的 PMDG 飞机以验证数据更新。 