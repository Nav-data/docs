# 架构说明

## 总览

PMDG 导航数据包为 PMDG 737 和 777 飞机在 Microsoft Flight Simulator 提供最新的导航信息。数据按功能分为多个文件。

## 文件说明

| 文件名 | 说明 |
|--------|------|
| `PMDG_VHF` | VHF 无线电频率（ATC、VOR 等） |
| `PMDG_TMA_WAYPOINT` | 终端区航路点（起降阶段） |
| `PMDG_RUNWAY` | 跑道信息（编号、长度、材质） |
| `PMDG_ENRT_WAYPOINT` | 航路航点（巡航阶段） |
| `PMDG_ENRT_NDB` | NDB（无定向信标）数据 |
| `PMDG_AWY_DB3_FINAL` | 航路数据库（高/低空航路） |
| `PMDG_AWY_FIX` | 航路修正数据 |
| `PMDG_APT` | 机场信息（ICAO 代码、名称） |
| `PMDG_APPCH` | 仪表进场程序（IAP） |
| `PMDG_SID` | 标准仪表离场程序（SID） |
| `PMDG_STAR` | 标准到达程序（STAR） |
| `PMDG_ILS` | 仪表着陆系统（ILS）数据 |

## 数据流

1. 将数据文件放入对应飞机的 Config 文件夹。
2. 模拟器读取这些文件，填充 FMC 和导航系统。
3. 每个 AIRAC 周期发布新数据包进行更新。 