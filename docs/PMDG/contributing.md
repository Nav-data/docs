# 🤝 贡献指南

欢迎参与 Nav-data 项目的开发！本指南将帮助您了解如何为项目做出贡献，包括代码标准、开发流程和最佳实践。

## 🎯 贡献方式

### 我们欢迎以下类型的贡献：

- **🐛 Bug 报告和修复** - 发现并修复项目中的问题
- **✨ 新功能开发** - 添加新的数据处理功能或优化
- **📚 文档改进** - 完善文档、添加示例、修正错误
- **🔧 性能优化** - 提升数据处理效率和内存使用
- **🧪 测试用例** - 增加测试覆盖率，提高代码质量
- **🌍 国际化支持** - 添加多语言支持或其他地区数据
- **🎨 用户体验改进** - 优化工具的易用性和输出格式

## 🚀 快速开始

### 1. 环境准备

```bash
# Fork 项目到您的 GitHub 账户
# 克隆您的 fork
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# 添加上游仓库
git remote add upstream https://github.com/原作者/Nav-data.git

# 创建虚拟环境
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# 或 nav-data-dev\Scripts\activate  # Windows

# 安装开发依赖
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 开发依赖（如果存在）
```

### 2. 开发环境验证

```bash
# 运行基础测试
python -m pytest tests/ -v

# 检查代码风格
flake8 *.py

# 运行类型检查（如果使用）
mypy *.py
```

## 📋 开发规范

### 代码风格

我们遵循 Python 社区标准和最佳实践：

#### 1. PEP 8 代码风格

```python
# ✅ 好的示例
class AirportDataProcessor:
    """机场数据处理器
    
    处理NAIP格式的机场数据，转换为PMDG兼容格式。
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """处理机场数据的主要方法
        
        Returns:
            ProcessingResult: 包含处理统计信息的结果对象
            
        Raises:
            FileNotFoundError: 当输入文件不存在时
            DatabaseError: 当数据库操作失败时
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="机场数据处理完成"
            )
        except Exception as e:
            logging.error(f"处理机场数据时出错: {e}")
            raise

# ❌ 避免的写法
def processAirports(file,db):  # 函数名不规范，参数类型不明确
    d=pd.read_csv(file)       # 变量名不清晰
    for i in d.iterrows():    # 没有错误处理
        # 处理逻辑...
        pass
```

#### 2. 类型注解

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """处理结果数据类"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """转换DMS格式坐标为十进制度
    
    Args:
        dms_latitude: DMS格式纬度字符串 (如: N390308.00)
        dms_longitude: DMS格式经度字符串 (如: E1162930.00)
    
    Returns:
        (纬度, 经度) 元组，转换失败时返回 (None, None)
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"坐标转换失败: {e}")
        return None, None
```

#### 3. 错误处理和日志

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """数据处理相关错误的基类"""
    pass

class ValidationError(ProcessingError):
    """数据验证错误"""
    pass

class CoordinateError(ValidationError):
    """坐标相关错误"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """带完整错误处理的数据处理示例"""
    try:
        # 数据验证
        if not validate_required_fields(data):
            raise ValidationError("缺少必需字段")
        
        # 坐标处理
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("坐标转换失败")
        
        # 数据保存
        save_to_database(data)
        logging.info(f"成功处理记录: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"数据验证失败: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"坐标处理错误: {e}")
        return False
    except Exception as e:
        logging.critical(f"未预期的错误: {e}")
        raise
```

### 文档标准

#### 1. 函数和类文档

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """解析X-Plane格式的DAT文件
    
    该函数读取X-Plane导航数据文件，解析其中的航路点信息，
    并返回结构化的数据列表。支持大文件的批量处理。
    
    Args:
        file_path: DAT文件的完整路径
        batch_size: 批处理大小，用于内存优化，默认1000
        encoding: 文件编码，默认utf-8
    
    Returns:
        包含航路点信息的字典列表，每个字典包含以下键：
        - waypoint_identifier: 航路点标识符
        - latitude: 纬度（十进制度）
        - longitude: 经度（十进制度）
        - waypoint_type: 航路点类型
        - icao_code: ICAO地区代码
    
    Raises:
        FileNotFoundError: 当指定文件不存在时
        ValueError: 当文件格式不正确时
        MemoryError: 当可用内存不足时
    
    Examples:
        基本用法:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"解析了 {len(waypoints)} 个航路点")
        
        大文件处理:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        该函数会自动跳过文件头部的注释行，只处理有效的数据行。
        对于损坏的数据行，会记录警告日志但不中断处理。
    """
    # 实现...
```

#### 2. 模块级文档

```python
"""
PMDG机场数据处理模块

该模块负责处理NAIP格式的机场数据，将其转换为PMDG兼容的
SQLite数据库格式。主要功能包括：

- CSV文件读取和解析
- DMS坐标格式转换
- 机场名称查找和匹配
- 数据验证和清理
- SQLite数据库写入

支持的输入文件格式：
- AD_HP.csv: 机场基础数据（NAIP格式）
- Airport.dat: 机场名称查找表

输出格式：
- SQLite数据库，包含 tbl_airports 表

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    命令行使用:
    $ python PMDG_APT.py
    
    编程接口:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"处理完成: {result.processed_count} 个机场")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# 模块级常量
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... 其余代码
```

### 测试标准

#### 1. 单元测试

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """坐标转换功能测试"""
    
    def test_valid_north_latitude(self):
        """测试有效的北纬坐标转换"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """测试有效的东经坐标转换"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """测试无效的坐标格式"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("无效的DMS格式", error)
    
    def test_boundary_coordinates(self):
        """测试边界坐标"""
        # 测试北极点
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """机场数据处理器测试"""
    
    def setUp(self):
        """测试初始化"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """测试CSV文件加载"""
        # 模拟CSV数据
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """测试数据库创建"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # 验证表创建SQL被执行
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. 集成测试

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """集成测试"""
    
    def setUp(self):
        """创建临时测试环境"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # 创建测试数据文件
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """清理测试环境"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """创建测试CSV文件"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """创建测试查找文件"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """端到端处理测试"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # 验证处理结果
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # 验证数据库内容
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 开发流程

### Git 工作流

我们使用 **Git Flow** 工作流：

```bash
# 1. 从最新的 main 分支创建功能分支
git checkout main
git pull upstream main
git checkout -b feature/航路处理优化

# 2. 进行开发工作
# 编写代码、添加测试、更新文档

# 3. 提交更改
git add .
git commit -m "feat: 优化航路数据处理性能

- 实现批量处理以减少内存使用
- 添加进度条显示处理状态
- 优化数据库写入操作

Closes #123"

# 4. 推送到您的 fork
git push origin feature/航路处理优化

# 5. 创建 Pull Request
```

### 提交信息规范

我们使用 **Conventional Commits** 规范：

```bash
# 格式: <类型>(<范围>): <描述>
#
# <可选的正文>
#
# <可选的脚注>

# 示例:
git commit -m "feat(airport): 添加机场名称自动查找功能

实现了基于ICAO代码的机场名称自动查找，
支持从多个数据源获取机场名称信息。

- 添加了AirportNameResolver类
- 支持缓存以提高查找性能
- 添加了相应的单元测试

Closes #45"

# 类型说明:
# feat: 新功能
# fix: Bug修复
# docs: 文档更新
# style: 代码格式调整（不影响功能）
# refactor: 代码重构
# perf: 性能优化
# test: 添加或修改测试
# chore: 构建过程或辅助工具的变动
```

### Pull Request 流程

#### 1. PR 检查清单

在提交 PR 之前，请确保：

- [ ] 代码遵循项目的编码规范
- [ ] 添加了必要的测试用例
- [ ] 测试全部通过
- [ ] 更新了相关文档
- [ ] 提交信息符合规范
- [ ] 没有引入新的依赖（如有，需要在PR中说明）

#### 2. PR 模板

```markdown
## 📝 变更描述
简要描述这个PR做了什么改动。

## 🔧 变更类型
- [ ] Bug修复
- [ ] 新功能
- [ ] 性能优化
- [ ] 代码重构
- [ ] 文档更新
- [ ] 测试改进

## 🧪 测试
描述如何测试这些更改：
- [ ] 添加了新的单元测试
- [ ] 添加了集成测试
- [ ] 手动测试步骤：
  1. 步骤1
  2. 步骤2

## 📸 截图（如适用）
如果有UI变更或输出格式变更，请添加截图。

## 🔗 相关Issue
Fixes #123
Related to #456

## 📋 检查清单
- [ ] 我的代码遵循项目的代码规范
- [ ] 我已经对我的代码进行了自我审查
- [ ] 我已经添加了相应的测试
- [ ] 所有新增和现有测试都通过了
- [ ] 我已经更新了相关文档

## 💬 额外说明
添加任何其他需要说明的内容。
```

## 🐛 问题报告

### Bug 报告模板

当您发现问题时，请使用以下模板创建 Issue：

```markdown
**🐛 Bug 描述**
简洁清晰地描述发生的问题。

**🔄 复现步骤**
1. 进入 '...'
2. 点击 '...'
3. 滚动到 '...'
4. 观察错误

**✅ 期望行为**
描述您期望发生什么。

**💻 环境信息**
- 操作系统: [例如 Windows 10, macOS 11.6, Ubuntu 20.04]
- Python版本: [例如 3.9.7]
- Nav-data版本: [例如 2.1.0]
- 其他相关软件版本:

**📄 错误日志**
如果适用，请添加错误日志或截图。

```
[在此粘贴日志内容]
```

**📁 输入数据**
如果问题与特定输入数据相关，请提供示例数据（去除敏感信息）。

**🔍 额外信息**
添加其他有助于诊断问题的信息。
```

### 功能请求模板

```markdown
**🚀 功能描述**
简洁清晰地描述您希望添加的功能。

**💡 使用场景**
描述这个功能解决什么问题或改进什么流程。

**📋 详细需求**
- [ ] 需求1: 描述
- [ ] 需求2: 描述
- [ ] 需求3: 描述

**🎨 可能的实现方案**
如果您有实现思路，请简要描述。

**📚 参考资料**
提供相关的文档、标准或参考资料链接。

**📊 优先级**
- [ ] 低 - 有时间的时候做
- [ ] 中 - 重要但不紧急
- [ ] 高 - 需要尽快实现
- [ ] 紧急 - 阻塞其他工作

**💬 额外说明**
其他需要说明的内容。
```

## 📚 开发环境配置

### IDE 配置建议

#### Visual Studio Code

推荐的扩展：
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

工作区设置 (`.vscode/settings.json`)：
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1. 配置代码风格：
   - File → Settings → Editor → Code Style → Python
   - 选择 "Black" 预设

2. 配置测试运行器：
   - File → Settings → Tools → Python Integrated Tools
   - 默认测试运行器：pytest

### 开发工具配置

#### pre-commit 钩子

创建 `.pre-commit-config.yaml`：
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

安装和启用：
```bash
pip install pre-commit
pre-commit install
```

## 🏆 最佳实践

### 性能优化

1. **内存管理**
   ```python
   # ✅ 好的做法：使用生成器处理大文件
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ 避免：一次性加载整个文件到内存
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # 可能消耗大量内存
       return [process_line(line) for line in lines]
   ```

2. **数据库操作优化**
   ```python
   # ✅ 好的做法：批量插入
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ 避免：逐条插入
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # 每次都提交，影响性能
   ```

### 错误处理

```python
# ✅ 好的错误处理
def process_coordinate(dms_string: str) -> float:
    """处理坐标字符串，返回十进制度数"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"坐标格式错误: {dms_string}, 错误: {e}")
        raise CoordinateError(f"无法解析坐标: {dms_string}") from e
    except Exception as e:
        logging.error(f"坐标处理时发生未知错误: {e}")
        raise

# ❌ 避免的错误处理
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # 捕获所有异常，难以调试
        return None  # 丢失错误信息
```

### 测试编写

```python
# ✅ 好的测试
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """测试有效北纬坐标转换"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """测试无效格式抛出适当错误"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("无法解析坐标", str(context.exception))

# ❌ 避免的测试
def test_coordinate():  # 测试名称不清晰
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # 浮点数精确比较可能失败
```

## 📞 获得帮助

如果您在贡献过程中遇到问题：

1. **查阅文档** - 首先查看项目文档和这个贡献指南
2. **搜索已有Issues** - 检查是否有人遇到过类似问题
3. **参加讨论** - 在GitHub Discussions中提问
4. **联系维护者** - 通过GitHub Issues联系项目维护者

### 社区准则

我们致力于创建一个开放、友好的社区环境：

- **尊重他人** - 对所有参与者保持礼貌和尊重
- **建设性反馈** - 提供有用的、建设性的意见和建议
- **耐心学习** - 帮助新手学习，分享知识和经验
- **协作精神** - 共同努力改进项目

## 🎉 认可贡献者

我们会在以下地方认可贡献者：
- README.md 的贡献者部分
- CHANGELOG.md 中的版本更新记录
- GitHub Releases 的感谢名单

感谢您考虑为 Nav-data 项目做出贡献！每一个贡献都让这个项目变得更好。

---

**记住**: 好的代码是写给人看的，机器只是恰好能执行它。 