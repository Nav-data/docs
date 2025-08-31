# 🤝 贡献指南

欢迎您为Nav-data项目做出贡献！本指南将帮助您了解如何参与项目开发、提交代码和改进建议。

## 🎯 贡献方式

### 📝 您可以通过以下方式做出贡献：

- **🐛 报告Bug**：发现问题并提供详细的重现步骤
- **💡 功能建议**：提出新功能或改进现有功能的想法
- **📖 文档改进**：完善文档、修正错误、添加示例
- **🔧 代码贡献**：修复Bug、实现新功能、性能优化
- **🧪 测试支持**：添加测试用例、改进测试覆盖率
- **🌐 本地化**：翻译文档、支持更多语言和地区

## 🚀 快速开始

### 📋 开发环境设置

1. **Fork 项目仓库**
   ```bash
   # 在 GitHub 上 Fork 项目
   # 然后克隆到本地
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

2. **设置开发环境**
   ```bash
   # 创建虚拟环境
   python -m venv venv
   
   # 激活虚拟环境
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # 安装依赖
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # 开发依赖
   ```

3. **安装Git钩子**
   ```bash
   # 安装pre-commit钩子
   pre-commit install
   ```

### 🔄 开发工作流

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或者
   git checkout -b fix/bug-description
   ```

2. **进行开发**
   - 编写代码
   - 添加测试
   - 更新文档
   - 运行测试确保通过

3. **提交代码**
   ```bash
   git add .
   git commit -m "feat: add new navigation data processor"
   ```

4. **推送并创建PR**
   ```bash
   git push origin feature/your-feature-name
   # 在GitHub上创建Pull Request
   ```

## 📋 代码规范

### 🐍 Python代码风格

我们遵循[PEP 8](https://pep8.org/)标准，并使用以下工具：

#### **代码格式化**
```bash
# 使用 black 进行代码格式化
black *.py

# 使用 isort 整理import
isort *.py
```

#### **代码检查**
```bash
# 使用 flake8 进行代码检查
flake8 *.py

# 使用 pylint 进行静态分析
pylint *.py
```

### 📝 代码规范要求

#### **1. 函数和类命名**
```python
# ✅ 正确的命名
def process_airports(csv_file_path: str, db_path: str) -> None:
    """处理机场数据"""
    pass

class CoordinateCache:
    """坐标缓存类"""
    pass

# ❌ 错误的命名
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. 文档字符串**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    计算指定坐标的磁偏角
    
    参数:
        lat (float): 纬度（十进制度）
        lon (float): 经度（十进制度）
    
    返回:
        float: 磁偏角（度），保留1位小数
    
    示例:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. 类型注解**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """解析DAT文件并返回记录列表"""
    records = []
    # 处理逻辑
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """查找坐标，返回经纬度元组"""
    return lat, lon
```

#### **4. 错误处理**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    处理数据文件
    
    返回:
        bool: 处理是否成功
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # 处理逻辑
            data = file.read()
            
        logger.info(f"成功处理文件: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"文件未找到: {file_path}")
        return False
    except PermissionError:
        logger.error(f"文件权限不足: {file_path}")
        return False
    except Exception as e:
        logger.error(f"处理文件时发生未知错误: {e}")
        return False
```

#### **5. 常量定义**
```python
# 在模块顶部定义常量
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# 在函数中使用
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"不支持的ICAO区域: {icao_code}")
        return False
    # 处理逻辑
```

## 🧪 测试要求

### 📊 测试覆盖率

- **最低要求**：新代码测试覆盖率 ≥ 80%
- **目标**：整体项目测试覆盖率 ≥ 90%

### 🛠️ 测试工具

```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_airports.py

# 生成覆盖率报告
pytest --cov=. --cov-report=html

# 查看覆盖率报告
open htmlcov/index.html
```

### ✅ 测试示例

#### **单元测试**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """测试北纬DMS转换"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """测试南纬DMS转换"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """测试磁偏角计算"""
        # 设置模拟返回值
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **集成测试**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """测试前设置"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """测试后清理"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """测试机场数据处理集成"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # 执行处理
        process_airports(csv_file, lookup_file, self.db_path)
        
        # 验证结果
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # 验证数据质量
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "不应存在空坐标")
        
        conn.close()
```

### 📝 测试数据

测试数据应放在`tests/test_data/`目录下：

```
tests/
├── test_data/
│   ├── sample_airports.csv      # 样本机场数据
│   ├── sample_runways.csv       # 样本跑道数据
│   ├── sample_earth_fix.dat     # 样本航路点数据
│   ├── sample_earth_nav.dat     # 样本导航台数据
│   └── sample_icao.txt          # 样本ICAO查找表
├── test_airports.py             # 机场模块测试
├── test_runways.py              # 跑道模块测试
├── test_waypoints.py            # 航路点模块测试
└── conftest.py                  # pytest配置
```

## 🐛 Bug报告

### 📋 Bug报告模板

使用以下模板报告Bug：

```markdown
## Bug描述
简明扼要地描述问题

## 重现步骤
1. 运行命令 `python XP2INI_NDB_Converter.py`
2. 选择配置 '...'
3. 观察到错误 '...'

## 预期行为
描述您预期应该发生什么

## 实际行为
描述实际发生了什么

## 环境信息
- 操作系统: Windows 11 22H2
- Python版本: 3.11.5
- MSFS版本: 2024
- 飞机插件: PMDG 777

## 错误日志
```
粘贴相关的错误信息和日志
```

## 其他信息
任何其他有助于诊断问题的信息
```

### 🔍 Bug分类

| 优先级 | 标签 | 描述 |
|--------|------|------|
| 🔴 Critical | `priority:critical` | 导致程序崩溃或数据损坏 |
| 🟠 High | `priority:high` | 影响主要功能，有变通方案 |
| 🟡 Medium | `priority:medium` | 影响次要功能或用户体验 |
| 🟢 Low | `priority:low` | 小问题，不影响核心功能 |

## 💡 功能建议

### 📋 功能建议模板

```markdown
## 功能概述
简要描述建议的功能

## 使用场景
描述什么情况下需要这个功能

## 详细描述
详细说明功能的实现方式和预期效果

## 替代方案
是否考虑过其他解决方案？

## 额外信息
任何有助于理解建议的其他信息
```

### 🎯 功能分类

| 类型 | 标签 | 描述 |
|------|------|------|
| ✨ Enhancement | `type:enhancement` | 改进现有功能 |
| 🚀 Feature | `type:feature` | 全新功能 |
| 📊 Performance | `type:performance` | 性能优化 |
| 📖 Documentation | `type:documentation` | 文档改进 |

## 📖 文档贡献

### 📝 文档规范

1. **Markdown格式**：使用标准Markdown语法
2. **VitePress兼容**：确保front matter正确
3. **中英文混合**：技术术语保留英文，说明使用中文
4. **代码示例**：提供完整、可运行的代码示例

### 🎨 文档风格指南

```markdown
---
title: 页面标题
description: 页面描述
---

# 🎯 主标题

简介段落，说明本文档的目的和范围。

## 📋 二级标题

### 三级标题

使用合适的表情符号和层次结构。

#### 代码示例

```python
# 提供完整的代码示例
def example_function():
    return "示例"
```

#### 注意事项

> ⚠️ **重要提示**：重要信息使用引用块突出显示

#### 列表格式

- ✅ 使用表情符号增强可读性
- 📝 保持列表项简洁明了
- 🔗 适当添加内部链接
```

## 🔄 Pull Request流程

### 📋 PR检查清单

提交PR前请确认：

- [ ] 🧪 **所有测试通过**：`pytest`
- [ ] 📊 **测试覆盖率达标**：新代码覆盖率 ≥ 80%
- [ ] 🎨 **代码格式正确**：`black`、`isort`、`flake8`
- [ ] 📖 **文档已更新**：API变更需更新文档
- [ ] 🏷️ **提交信息规范**：遵循Conventional Commits
- [ ] 🔗 **链接相关Issue**：在PR描述中引用

### 📝 PR模板

```markdown
## 变更概述
简要描述本次PR的目的和主要变更

## 变更类型
- [ ] 🐛 Bug修复
- [ ] ✨ 新功能
- [ ] 📖 文档更新
- [ ] 🎨 代码重构
- [ ] ⚡ 性能优化
- [ ] 🧪 测试改进

## 详细说明
详细描述实现方式和技术细节

## 测试
说明如何测试这些变更

## 相关Issue
关闭 #123

## 检查清单
- [ ] 测试通过
- [ ] 代码格式正确
- [ ] 文档已更新
- [ ] 变更日志已更新
```

### 🏷️ 提交信息规范

遵循[Conventional Commits](https://www.conventionalcommits.org/)规范：

```bash
# 功能添加
feat: add support for AIRAC 2024 data format

# Bug修复
fix: resolve coordinate conversion precision issue

# 文档更新
docs: update installation guide for Windows 11

# 性能优化
perf: optimize magnetic variation calculation

# 代码重构
refactor: restructure database connection handling

# 测试添加
test: add unit tests for waypoint processing

# 构建相关
build: update dependencies to latest versions
```

## 🌟 认可贡献者

### 🏆 贡献者等级

| 等级 | 要求 | 权限 |
|------|------|------|
| 👋 Contributor | 1+ 有效PR | 基本贡献者 |
| 🎖️ Regular Contributor | 5+ 有效PR | 优先code review |
| 🌟 Core Contributor | 10+ 有效PR + 长期参与 | Issue triage权限 |
| 👑 Maintainer | 核心开发者 | 完整仓库权限 |

### 📜 贡献者名录

我们在README中维护贡献者名录，感谢每一位贡献者的努力！

```markdown
## 🙏 感谢贡献者

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 获取帮助

### 💬 交流渠道

- **📧 邮件**：project@nav-data.org
- **💬 讨论区**：GitHub Discussions
- **🐛 问题报告**：GitHub Issues
- **📖 文档问题**：直接提PR修改

### 📚 学习资源

- [Python官方文档](https://docs.python.org/)
- [SQLite文档](https://sqlite.org/docs.html)
- [航空导航原理](https://www.faa.gov/air_traffic/publications/)
- [ARINC 424标准](https://www.arinc.com/)

### 🎓 新手指南

如果您是第一次参与开源项目：

1. 📖 **阅读代码**：先理解项目结构和核心功能
2. 🐛 **从小做起**：从修复文档错误或小bug开始
3. 🤝 **积极交流**：不要害怕提问和寻求帮助
4. 📈 **持续学习**：关注项目动态，学习最佳实践

## 📄 行为准则

### 🤝 我们的承诺

为了营造开放和欢迎的环境，我们承诺：

- **🌈 包容性**：欢迎不同背景和观点的参与者
- **🤝 尊重**：尊重不同意见和经验
- **📚 学习导向**：帮助新手成长和学习
- **🎯 专业性**：专注于技术讨论和项目改进

### ❌ 不可接受的行为

- 人身攻击或侮辱性言论
- 骚扰或歧视行为
- 发布他人私人信息
- 其他不专业或不合适的行为

### 📞 举报机制

如遇到违反行为准则的情况，请联系项目维护者：
- 📧 邮件：conduct@nav-data.org
- 📱 私信：GitHub私信联系维护者

---

感谢您考虑为Nav-data项目做出贡献！每一个贡献都让航空模拟社区变得更好。🛫 