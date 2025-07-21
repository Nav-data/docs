# 架构说明

本项目包含以下主要模块：

- `airports.py`：机场数据处理
- `airways.py`：航路数据处理
- `enroute_waypoints.py`：航路航点处理
- `gs.py`：地面站数据处理
- `iaps.py`：进近程序数据处理
- `ndbs.py`：无方向信标数据处理
- `runways.py`：跑道数据处理
- `sids.py`：离场程序数据处理
- `terminal_waypoints.py`：终端航点处理
- `vhfs.py`：甚高频电台数据处理

各模块相互独立，按需调用。 