# 🤝 贡献指南

感谢您对 iFly 导航数据转换器项目的关注！我们欢迎并感谢所有形式的贡献。

## 🌟 贡献方式

### 💻 代码贡献
- 🐛 修复 Bug
- ✨ 添加新功能
- 📈 性能优化
- 🧪 增加测试用例
- 📚 改进文档

### 📝 非代码贡献
- 🐛 报告问题
- 💡 提出功能建议
- 📖 完善文档
- 🌐 翻译支持
- 🎓 教程制作

## 🚀 快速开始

### 1. 环境准备

```bash
# 克隆仓库
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# 创建虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 安装依赖
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 开发依赖
```

### 2. 开发环境配置

```bash
# 安装预提交钩子
pre-commit install

# 运行测试
pytest

# 代码质量检查
flake8 .
mypy .
black . --check
```

## 📋 开发流程

### 1. 创建功能分支

```bash
# 从主分支创建新分支
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 或修复分支
git checkout -b fix/issue-description
```

### 2. 开发和测试

```bash
# 进行开发
# ... 编写代码 ...

# 运行测试
pytest tests/

# 检查代码质量
black .
flake8 .
mypy .
```

### 3. 提交代码

```bash
# 添加文件
git add .

# 提交（遵循提交信息规范）
git commit -m "feat: add new feature description"

# 推送到远程分支
git push origin feature/your-feature-name
```

### 4. 创建 Pull Request

1. 在 GitHub 上创建 Pull Request
2. 填写详细的 PR 描述
3. 确保所有检查通过
4. 等待代码审查

## 📝 代码规范

### Python 代码风格

我们使用以下工具确保代码质量：

- **Black**：代码格式化
- **Flake8**：代码风格检查
- **MyPy**：类型检查
- **isort**：导入排序

### 代码示例

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """导航数据转换器主类。
    
    这个类负责将 Fenix 导航数据转换为 iFly 格式。
    
    Attributes:
        config: 转换器配置
        logger: 日志记录器
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """初始化转换器。
        
        Args:
            config: 转换器配置对象
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """转换导航数据。
        
        Args:
            source_path: 源数据路径
            target_path: 目标数据路径  
            options: 可选的转换选项
            
        Returns:
            转换是否成功
            
        Raises:
            ConversionError: 转换过程中出现错误
        """
        try:
            # 实现转换逻辑
            return True
        except Exception as e:
            self.logger.error(f"转换失败: {e}")
            raise ConversionError(f"数据转换失败: {e}") from e
```

### 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**类型标识：**
- `feat`: 新功能
- `fix`: 修复 Bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试用例
- `chore`: 构建过程或辅助工具的变动

**示例：**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 测试指南

### 测试结构

```
tests/
├── unit/           # 单元测试
├── integration/    # 集成测试
├── fixtures/       # 测试数据
└── conftest.py     # 测试配置
```

### 编写测试

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """导航数据转换器测试类。"""
    
    @pytest.fixture
    def converter(self):
        """创建测试用的转换器实例。"""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """测试数据转换成功情况。"""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # 创建测试数据
        source.touch()
        
        # 执行转换
        result = converter.convert_data(source, target)
        
        # 验证结果
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """测试数据转换失败情况。"""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### 运行测试

```bash
# 运行所有测试
pytest

# 运行指定测试文件
pytest tests/unit/test_converter.py

# 运行并生成覆盖率报告
pytest --cov=ifly_converter --cov-report=html

# 运行性能测试
pytest tests/performance/ -m performance
```

## 📚 文档贡献

### 文档结构

```
docs/
├── guide/          # 用户指南
├── api/            # API 文档
├── examples/       # 示例代码
└── deployment/     # 部署指南
```

### 文档规范

- 使用 **Markdown** 格式
- 包含代码示例
- 提供多语言支持
- 保持文档更新

### 文档示例

```markdown
## 🔧 配置管理

### 基本配置

转换器使用 `ConverterConfig` 类管理配置：

```python
from ifly_converter.config import ConverterConfig

# 创建默认配置
config = ConverterConfig()

# 自定义配置
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `output_dir` | str | "output" | 输出目录 |
| `coordinate_precision` | int | 8 | 坐标精度 |
| `enable_validation` | bool | True | 启用验证 |
```

## 🐛 报告问题

### 问题报告模板

在报告问题时，请提供以下信息：

```markdown
**问题描述**
清晰简洁地描述遇到的问题。

**重现步骤**
1. 第一步 '...'
2. 第二步 '...'
3. 第三步 '...'
4. 看到错误

**预期行为**
描述您期望发生的情况。

**实际行为**
描述实际发生的情况。

**环境信息**
- OS: [如 Windows 10]
- Python 版本: [如 3.9.0]
- 项目版本: [如 v2.0.0]

**日志信息**
```
粘贴相关的日志信息
```

**截图**
如果适用，添加截图帮助解释问题。

**补充信息**
添加任何其他相关的上下文信息。
```

### 问题分类

使用以下标签分类问题：

- 🐛 `bug` - 错误报告
- ✨ `enhancement` - 功能请求
- 📚 `documentation` - 文档相关
- ❓ `question` - 使用问题
- 🔥 `priority: high` - 高优先级
- 🧹 `good first issue` - 适合新手

## 📋 功能请求

### 功能请求模板

```markdown
**功能概述**
简要描述您希望添加的功能。

**解决的问题**
这个功能解决了什么问题？

**详细描述**
详细描述功能的工作方式。

**替代方案**
您是否考虑过其他解决方案？

**附加信息**
添加任何其他相关信息、截图或示例。
```

## 🎯 开发路线图

### 近期目标（1-3个月）
- [ ] GUI 界面开发
- [ ] 批量处理功能
- [ ] 数据验证工具增强
- [ ] 性能优化

### 中期目标（3-6个月）
- [ ] 多格式支持
- [ ] 云端处理
- [ ] REST API 接口
- [ ] 插件系统

### 长期目标（6-12个月）
- [ ] 机器学习优化
- [ ] 实时数据更新
- [ ] 移动端支持
- [ ] 企业级功能

## 🏆 贡献者

感谢所有为项目做出贡献的开发者！

<!-- 贡献者列表将自动更新 -->

## 📞 联系我们

- 📧 **邮件**：project@example.com
- 💬 **讨论**：GitHub Discussions
- 🐛 **问题**：GitHub Issues
- 🌐 **官网**：https://ifly-converter.org

---

再次感谢您的贡献！让我们一起打造更好的 iFly 导航数据转换器！🚀
