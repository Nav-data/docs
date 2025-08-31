# 贡献指南

欢迎参与 Nav-data 开源项目！我们非常感谢您对航空导航数据转换工具的贡献。

## 🤝 参与方式

### 报告问题 (Issues)
- **Bug 报告**：发现程序错误或异常行为
- **功能请求**：建议新功能或改进现有功能
- **文档改进**：指出文档中的错误或不清楚的地方
- **性能问题**：报告性能瓶颈或优化建议

### 代码贡献 (Pull Requests)
- **修复 Bug**：修复已知问题
- **新功能开发**：实现新的数据处理功能
- **性能优化**：提升代码执行效率
- **代码重构**：改进代码结构和可维护性

### 文档贡献
- **技术文档**：完善 API 文档和架构说明
- **用户指南**：改进使用说明和教程
- **示例代码**：提供更多使用示例
- **多语言翻译**：翻译文档到其他语言

## 📋 开始之前

### 1. 了解项目
在开始贡献之前，请：
- 查看 [架构说明](./architecture.md)
- 了解 [使用说明](./guide/usage.md)
- 浏览现有的 [Issues](https://github.com/your-repo/nav-data/issues)

### 2. 环境准备
确保您的开发环境符合要求：
- Python 3.6+
- Git
- 必要的依赖包（见 [安装指南](./guide/installation.md)）

### 3. Fork 项目
1. 访问 [Nav-data GitHub 页面](https://github.com/your-repo/nav-data)
2. 点击右上角的 "Fork" 按钮
3. 克隆您的 Fork 到本地：
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 报告问题

### Bug 报告模板

当报告 Bug 时，请提供以下信息：

```markdown
**Bug 描述**
简要描述遇到的问题。

**重现步骤**
1. 执行 '...' 命令
2. 使用 '...' 数据文件
3. 观察到 '...' 错误

**预期行为**
描述您期望发生的情况。

**实际行为**
描述实际发生的情况。

**环境信息**
- 操作系统: [如 macOS 12.0]
- Python 版本: [如 3.9.7]
- Nav-data 版本: [如 v1.2.0]

**附加信息**
- 错误日志
- 相关截图
- 示例数据文件（如适用）
```

### 功能请求模板

```markdown
**功能描述**
简要描述您希望添加的功能。

**使用场景**
描述此功能解决的具体问题或使用场景。

**建议实现方案**
如果您有具体的实现想法，请详细描述。

**替代方案**
描述您考虑过的其他替代方案。

**附加信息**
任何其他相关信息或参考资料。
```

## 💻 代码贡献流程

### 1. 创建分支
为您的贡献创建一个新分支：

```bash
# 确保 main 分支是最新的
git checkout main
git pull upstream main

# 创建新分支
git checkout -b feature/your-feature-name
# 或对于 bug 修复
git checkout -b fix/issue-number-description
```

### 2. 开发和测试
在开发过程中：

```bash
# 频繁提交更改
git add .
git commit -m "feat: add waypoint validation function"

# 运行测试确保代码质量
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. 提交 Pull Request
完成开发后：

```bash
# 推送分支到您的 Fork
git push origin feature/your-feature-name
```

然后在 GitHub 上创建 Pull Request。

### Pull Request 模板

```markdown
**更改类型**
- [ ] Bug 修复
- [ ] 新功能
- [ ] 代码重构
- [ ] 文档更新
- [ ] 性能优化

**更改描述**
简要描述此 PR 的更改内容。

**相关 Issue**
- Fixes #(issue number)
- Related to #(issue number)

**测试**
- [ ] 添加了新的测试用例
- [ ] 所有现有测试通过
- [ ] 手动测试验证

**检查清单**
- [ ] 代码遵循项目编码规范
- [ ] 添加了必要的文档
- [ ] 更新了相关的 README 或配置
- [ ] 考虑了向后兼容性
```

## 📝 代码规范

### Python 编码标准

#### 1. 代码风格
使用 [PEP 8](https://pep8.org/) 作为基础，并遵循以下补充规范：

```python
# 导入顺序
import os  # 标准库
import sys

import pandas as pd  # 第三方库
import numpy as np

from .utils import helper_function  # 本地导入

# 类定义
class NavigationDataProcessor:
    """
    导航数据处理器
    
    处理各种格式的航空导航数据，包括CSV、PDF等格式的转换。
    
    Attributes:
        input_format (str): 输入数据格式
        output_format (str): 输出数据格式
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        初始化处理器
        
        Args:
            input_format: 输入数据格式 ('csv', 'pdf', 'dat')
            output_format: 输出数据格式 ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        处理数据的主要方法
        
        Args:
            data: 输入数据
            
        Returns:
            处理后的数据
            
        Raises:
            ValueError: 输入数据格式不支持时抛出
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. 命名规范
```python
# 常量：全大写，下划线分隔
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# 变量和函数：小写，下划线分隔
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# 类名：帕斯卡命名法
class CSVDataProcessor:
    pass

# 私有方法：单下划线前缀
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# 内部使用：双下划线前缀
def __internal_helper(self) -> None:
    pass
```

#### 3. 类型注解
所有公共函数必须包含类型注解：

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    转换坐标格式
    
    Args:
        input_coords: 输入坐标，支持字符串或元组格式
        output_format: 输出格式，支持 'decimal' 或 'dms'
        
    Returns:
        转换后的坐标字典，失败时返回 None
    """
    pass
```

#### 4. 文档字符串
使用 Google 风格的文档字符串：

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    处理航路 CSV 数据文件
    
    从 CSV 文件中读取航路数据，进行验证和转换，然后输出为
    X-Plane DAT 格式。支持区域过滤功能。
    
    Args:
        csv_file: 输入 CSV 文件路径
        output_file: 输出 DAT 文件路径  
        excluded_areas: 需要排除的区域代码集合，默认为 None
        
    Returns:
        处理成功返回 True，失败返回 False
        
    Raises:
        FileNotFoundError: 输入文件不存在时抛出
        ValueError: CSV 格式错误时抛出
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        处理过程中会自动备份原始输出文件。
    """
    pass
```

### 代码质量工具

#### 1. 代码格式化
使用 [Black](https://black.readthedocs.io/) 进行代码格式化：

```bash
# 安装
pip install black

# 格式化整个项目
black .

# 检查格式但不修改
black . --check

# 格式化单个文件
black script.py
```

#### 2. 代码检查
使用 [flake8](https://flake8.pycqa.org/) 进行代码检查：

```bash
# 安装
pip install flake8

# 检查整个项目
flake8 .

# 配置文件 .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. 类型检查
使用 [mypy](http://mypy-lang.org/) 进行类型检查：

```bash
# 安装
pip install mypy

# 检查类型
mypy .

# 配置文件 mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Git 提交规范

#### 提交信息格式
使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 提交类型
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式（不影响代码运行的变动）
- `refactor`: 重构（既不是新增功能，也不是修改bug的代码变动）
- `perf`: 性能优化
- `test`: 增加测试
- `chore`: 构建过程或辅助工具的变动

#### 示例
```bash
# 新功能
git commit -m "feat(airway): add AIRAC cycle validation"

# Bug 修复
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# 文档更新
git commit -m "docs: update installation guide for macOS"

# 重构
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 测试指南

### 测试结构
```
tests/
├── unit/                   # 单元测试
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # 集成测试
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # 测试数据
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # pytest 配置
```

### 编写测试

#### 单元测试示例
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """导航点测试类"""
    
    def test_navigation_point_creation(self):
        """测试导航点创建"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """测试无效导航点类型"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """参数化测试导航点验证"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### 集成测试示例
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """数据管道集成测试"""
    
    @pytest.fixture
    def temp_directory(self):
        """临时目录 fixture"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """示例 CSV 数据"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """测试完整数据处理管道"""
        # 准备测试数据
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # 执行管道
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # 验证结果
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### 运行测试
```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/unit/test_airway.py

# 运行特定测试方法
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# 生成覆盖率报告
pytest --cov=nav_data tests/

# 详细输出
pytest -v

# 停止在第一个失败处
pytest -x
```

## 📚 文档贡献

### 文档结构
```
docs/
├── guide/                  # 用户指南
│   ├── index.md           # 指南首页
│   ├── installation.md    # 安装指南
│   ├── configuration.md   # 配置说明
│   └── usage.md           # 使用说明
├── api/                    # API 文档
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # 架构说明
├── contributing.md         # 贡献指南
├── changelog.md           # 更新日志
└── license.md             # 许可证
```

### 文档编写规范

#### Markdown 格式
```markdown
---
title: 文档标题
description: 文档描述
---

# 一级标题

简要介绍文档内容。

## 二级标题

### 三级标题

正文内容使用清晰的中文表述。

#### 代码示例
使用代码块展示示例：

```python
def example_function():
    """示例函数"""
    return "Hello, Nav-data!"
```

#### 注意事项
> **注意**: 重要提示使用引用格式。

**警告**: 警告信息使用粗体。

#### 链接和引用
- 内部链接：[安装指南](./guide/installation.md)
- 外部链接：[Python 官网](https://python.org)
- 代码引用：使用 `code` 格式引用代码
```

#### 技术写作指南
1. **清晰简洁**：使用简洁明了的语言
2. **结构化**：使用标题、列表、表格组织内容
3. **示例丰富**：提供足够的代码示例
4. **用户友好**：从用户角度编写文档
5. **及时更新**：保持文档与代码同步

### API 文档
为所有公共 API 编写详细文档：

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    处理 CSV 格式的导航数据
    
    该函数读取 CSV 格式的航路数据，进行验证和转换，
    输出为指定格式的导航数据文件。
    
    Args:
        csv_file (str): 输入 CSV 文件路径
        output_format (str, optional): 输出格式，支持 'dat', 'json', 'xml'。
                                     默认为 'dat'。
    
    Returns:
        Dict[str, Any]: 处理结果信息，包含以下键：
            - 'success' (bool): 处理是否成功
            - 'processed_count' (int): 成功处理的记录数
            - 'error_count' (int): 错误记录数
            - 'output_file' (str): 输出文件路径
    
    Raises:
        FileNotFoundError: 当输入文件不存在时抛出
        ValueError: 当 CSV 格式不正确时抛出
        PermissionError: 当无法写入输出文件时抛出
    
    Example:
        基本使用：
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        指定输出格式：
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - 输入 CSV 文件必须包含标准的航路数据字段
        - 处理过程中会自动验证数据完整性
        - 支持中断后的断点续传功能
    
    See Also:
        :func:`validate_csv_format`: CSV 格式验证
        :func:`convert_coordinate_format`: 坐标格式转换
    """
    pass
```

## 🔍 代码审查

### 审查检查清单

#### 功能性
- [ ] 代码实现了预期功能
- [ ] 处理了所有边界情况
- [ ] 错误处理适当
- [ ] 性能满足要求

#### 代码质量
- [ ] 代码结构清晰
- [ ] 命名具有描述性
- [ ] 函数职责单一
- [ ] 避免代码重复

#### 安全性
- [ ] 输入验证充分
- [ ] 无安全漏洞
- [ ] 敏感信息处理得当
- [ ] 权限控制适当

#### 测试
- [ ] 测试覆盖率充分
- [ ] 测试用例全面
- [ ] 集成测试通过
- [ ] 性能测试满足要求

#### 文档
- [ ] 代码注释充分
- [ ] API 文档完整
- [ ] 用户文档更新
- [ ] 变更日志更新

### 审查反馈
提供建设性的反馈：

```markdown
**整体评价**
代码实现了预期功能，结构清晰，测试覆盖充分。

**具体意见**
1. **代码结构**: `process_data` 函数过长，建议拆分为多个小函数
2. **性能优化**: 第 45 行的循环可以考虑使用列表推导式优化
3. **错误处理**: 建议在第 78 行添加具体的异常类型

**建议修改**
```python
# 建议将这段代码
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# 改为
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**其他**
文档需要补充使用示例。
```

## 🚀 发布流程

### 版本号规范
使用 [语义化版本](https://semver.org/lang/zh-CN/) (Semantic Versioning)：

- **主版本号**：不兼容的 API 修改
- **次版本号**：向后兼容的功能性新增
- **修订号**：向后兼容的问题修正

示例：`1.2.3`

### 发布检查清单
发布前确保：
- [ ] 所有测试通过
- [ ] 文档已更新
- [ ] 变更日志已更新
- [ ] 版本号已更新
- [ ] 依赖关系正确
- [ ] 安全审查通过

## 🏆 贡献者奖励

### 认可机制
- **代码贡献者**：在 README 中列出所有贡献者
- **文档贡献者**：在文档中标注贡献者信息
- **问题报告者**：在 Issue 解决后表示感谢
- **长期贡献者**：邀请成为项目维护者

### 成为维护者
长期活跃的贡献者可能被邀请成为项目维护者，获得：
- 直接推送权限
- 审查 Pull Request 的权限
- 参与项目决策的权利
- 在项目介绍中的特别感谢

## 📞 联系方式

### 获取帮助
- **GitHub Issues**: 报告问题或请求功能
- **GitHub Discussions**: 一般讨论和问答
- **文档**: 查看详细的使用指南
- **代码注释**: 查看源代码中的详细注释

### 社区准则
参与项目时请遵循以下原则：
- **尊重他人**：保持友善和专业的态度
- **建设性讨论**：提供有价值的反馈和建议
- **包容性**：欢迎不同背景的贡献者
- **学习导向**：帮助他人学习和成长

## 🙏 致谢

感谢所有为 Nav-data 项目做出贡献的开发者、测试者、文档贡献者和用户！

### 特别感谢
- 核心维护团队
- 长期贡献者
- 问题报告者
- 文档翻译者
- 社区支持者

---

**再次感谢您的贡献！** 🎉 您的参与让 Nav-data 变得更好，为航空模拟社区提供了更优质的导航数据工具。 