# 🤝 TFDI 导航数据转换器贡献指南

欢迎加入 TFDI 导航数据转换器项目！我们感谢每一位贡献者的参与，无论是代码贡献、文档完善、错误报告还是功能建议。

## 🌟 贡献方式

### 💻 代码贡献
- 🐛 **修复 Bug** - 解决已知问题和缺陷
- ✨ **新功能开发** - 添加新的转换功能或改进
- 📈 **性能优化** - 提升转换速度和内存使用效率
- 🧪 **测试增强** - 增加测试用例和覆盖率
- 📚 **文档改进** - 完善 API 文档和用户指南

### 📝 非代码贡献
- 🐛 **问题报告** - 报告 Bug 和兼容性问题
- 💡 **功能建议** - 提出新功能和改进建议
- 📖 **文档撰写** - 编写教程、指南和示例
- 🌐 **本地化** - 翻译界面和文档
- 🎓 **社区支持** - 帮助其他用户解决问题

## 🚀 开发环境设置

### 环境要求

```bash
# Python 版本要求
Python 3.8+ (推荐 3.9 或 3.10)

# 操作系统支持
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# 内存要求
最低 4GB RAM (推荐 8GB+)
```

### 快速开始

#### 1. 克隆项目
```bash
# 克隆主仓库
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 或者克隆你的 Fork
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. 设置开发环境
```bash
# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 安装开发依赖
pip install -r requirements-dev.txt
pip install -e .  # 可编辑安装
```

#### 3. 验证安装
```bash
# 运行测试套件
pytest

# 运行代码质量检查
flake8 src/
mypy src/
black --check src/

# 运行转换器
python -m tfdi_converter --help
```

### 开发工具配置

#### IDE 设置 (VS Code 推荐)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### 预提交钩子
```bash
# 安装 pre-commit
pip install pre-commit

# 安装钩子
pre-commit install

# 手动运行所有钩子
pre-commit run --all-files
```

## 📋 开发流程

### 1. 创建功能分支

```bash
# 确保主分支是最新的
git checkout main
git pull origin main

# 创建新的功能分支
git checkout -b feature/add-new-format-support

# 或修复分支
git checkout -b fix/memory-leak-in-processor
```

### 2. 开发和测试

#### 代码开发
```bash
# 编写代码
# ... 进行开发 ...

# 添加测试
# tests/test_new_feature.py

# 更新文档
# docs/api/new_feature.md
```

#### 运行测试
```bash
# 运行所有测试
pytest

# 运行特定测试文件
pytest tests/test_converter.py

# 运行并生成覆盖率报告
pytest --cov=tfdi_converter --cov-report=html

# 运行性能测试
pytest tests/performance/ -m performance
```

#### 代码质量检查
```bash
# 格式化代码
black src/ tests/

# 排序导入
isort src/ tests/

# 静态分析
flake8 src/ tests/
mypy src/

# 安全检查
bandit -r src/
```

### 3. 提交代码

#### 提交信息规范
使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**提交类型：**
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建过程或辅助工具变动
- `perf`: 性能改进

**提交示例：**
```bash
# 新功能
git commit -m "feat(converter): add support for MSFS native format"

# Bug 修复
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# 文档更新
git commit -m "docs(api): add examples for batch processing"

# 性能改进
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. 推送和创建 PR

```bash
# 推送分支到远程
git push origin feature/add-new-format-support

# 在 GitHub 上创建 Pull Request
# 填写 PR 模板
# 等待代码审查
```

## 📝 代码规范

### Python 编码规范

#### 1. 代码风格
```python
# 使用 Black 格式化器的默认设置
# 行长度: 88 字符
# 使用双引号
# 函数间空两行

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """转换配置类。
    
    用于管理 TFDI 转换器的各种配置参数。
    
    Attributes:
        output_dir: 输出目录路径
        coordinate_precision: 坐标精度
        enable_validation: 是否启用数据验证
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Fenix 数据处理器。
    
    负责从 Fenix 数据库读取和处理导航数据。
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """初始化处理器。
        
        Args:
            config: 转换配置对象
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """处理航路点数据。
        
        Args:
            waypoint_data: 原始航路点数据列表
            
        Returns:
            处理后的航路点数据列表
            
        Raises:
            DataProcessingError: 数据处理过程中发生错误
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"成功处理 {len(processed_data)} 个航路点")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"航路点处理失败: {e}")
            raise DataProcessingError(f"无法处理航路点数据: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """标准化单个航路点数据。"""
        # 实现标准化逻辑
        normalized = waypoint.copy()
        
        # 标准化坐标精度
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. 类型提示
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# 类型别名
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# 泛型类型
T = TypeVar('T')

class DataCache(Generic[T]):
    """泛型数据缓存类"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """获取缓存数据"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """设置缓存数据"""
        self._cache[key] = value
```

#### 3. 错误处理
```python
class TFDIConverterError(Exception):
    """转换器基础异常类"""
    pass


class DataValidationError(TFDIConverterError):
    """数据验证异常"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """数据库连接异常"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """安全的数据库操作包装器"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"数据库操作失败: {e}")
        raise DatabaseConnectionError(f"数据库操作失败: {e}") from e
    except Exception as e:
        logger.error(f"未知错误: {e}")
        return None
```

### 测试规范

#### 1. 测试结构
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Fenix 到 TFDI 转换器测试类"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """创建示例配置"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """创建示例数据库"""
        db_path = tmp_path / "test.db3"
        # 创建测试数据库的逻辑
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """测试转换器初始化"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """测试数据库验证成功情况"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """测试数据库验证失败情况"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """测试数据库连接错误"""
        mock_connect.side_effect = sqlite3.Error("连接失败")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """测试大型数据库性能"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # 应在 5 分钟内完成
```

#### 2. 测试数据管理
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """测试数据目录"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """创建示例 Fenix 数据库"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 创建测试表结构
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # 插入测试数据
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### 文档规范

#### 1. API 文档
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """转换 Fenix 数据库到 TFDI 格式。
    
    此函数接收 Fenix A320 导航数据库文件，将其转换为
    TFDI MD-11 兼容的 JSON 格式文件集合。
    
    Args:
        database_path: Fenix 数据库文件路径 (.db3 文件)
        output_dir: 输出目录路径，转换后的文件将保存在此目录
        config: 可选的转换配置对象，如果不提供则使用默认配置
    
    Returns:
        ConversionResult: 包含转换结果和统计信息的对象
        
    Raises:
        FileNotFoundError: 当数据库文件不存在时
        DataValidationError: 当数据库格式不正确时
        PermissionError: 当没有输出目录写入权限时
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"转换完成，处理了 {result.processed_records} 条记录")
        
    Note:
        转换过程可能需要几分钟时间，具体取决于数据库大小。
        建议在转换前备份原始数据。
        
    See Also:
        - :class:`ConverterConfig`: 转换配置选项
        - :class:`ConversionResult`: 转换结果详情
    """
    pass
```

#### 2. 用户文档
```markdown
# 使用示例

## 基础转换

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# 创建配置
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# 初始化转换器
converter = FenixToTFDIConverter(config)

# 执行转换
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"转换完成！输出文件: {result.output_archive}")
```

## 高级配置

```python
# 自定义配置
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```
```

## 🧪 测试指南

### 测试策略

#### 1. 单元测试
- **覆盖率目标**: 90%+
- **测试范围**: 所有公共方法和关键私有方法
- **Mock 策略**: 隔离外部依赖（数据库、文件系统）

#### 2. 集成测试  
- **数据库集成**: 使用真实的测试数据库
- **文件系统集成**: 测试实际的文件读写操作
- **端到端测试**: 完整的转换流程测试

#### 3. 性能测试
- **基准测试**: 记录不同数据集大小的处理时间
- **内存测试**: 监控内存使用和泄漏
- **并发测试**: 测试多线程和并发安全性

### 运行测试

```bash
# 快速测试（排除性能测试）
pytest -m "not performance"

# 完整测试套件
pytest

# 特定模块测试
pytest tests/test_converter.py

# 覆盖率测试
pytest --cov=tfdi_converter --cov-report=term-missing

# 性能基准测试
pytest tests/performance/ --benchmark-only
```

## 📚 文档贡献

### 文档类型

#### 1. 用户文档
- **安装指南**: 详细的安装步骤
- **使用教程**: 从基础到高级的使用示例
- **故障排除**: 常见问题和解决方案
- **API 参考**: 完整的 API 文档

#### 2. 开发者文档
- **架构设计**: 系统架构和设计理念
- **贡献指南**: 本文档
- **编码规范**: 代码风格和最佳实践
- **发布流程**: 版本发布和维护流程

### 文档构建

```bash
# 安装文档依赖
pip install -r docs/requirements.txt

# 构建文档
cd docs/
make html

# 实时预览
make livehtml
```

## 🐛 问题报告

### 问题报告模板

```markdown
**问题描述**
清晰简洁地描述遇到的问题。

**重现步骤**
1. 执行 '...'
2. 输入 '...'
3. 查看错误 '...'

**期望行为**
描述您期望发生的情况。

**实际行为**
描述实际发生的情况。

**环境信息**
- OS: [如 Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [如 3.9.16]
- 转换器版本: [如 v1.0.0]
- Fenix 版本: [如 v1.2.0]
- TFDI 版本: [如 v1.1.0]

**数据库信息**
- 数据库大小: [如 150MB]
- 记录数量: [如 ~50,000 条]
- AIRAC 周期: [如 2508]

**日志信息**
```
粘贴相关的日志信息或错误堆栈
```

**附加文件**
- 配置文件
- 错误截图
- 示例数据（如果可能）
```

### 问题标签

使用以下标签分类问题：
- 🐛 `bug` - 错误报告
- ✨ `enhancement` - 功能请求
- 📚 `documentation` - 文档相关
- ❓ `question` - 使用问题
- 🔥 `urgent` - 紧急问题
- 🆕 `good first issue` - 适合新贡献者

## 🏆 认可和奖励

### 贡献者认可

#### 1. 代码贡献者
- **提交者列表**: README 和文档中的贡献者名单
- **发布说明**: 在版本发布说明中特别感谢
- **GitHub 统计**: 贡献统计和成就徽章

#### 2. 文档贡献者
- **文档署名**: 在相关文档页面署名
- **翻译认可**: 多语言版本的翻译者名单
- **教程作者**: 社区教程的作者认可

#### 3. 社区贡献者
- **问题报告**: 重要问题发现者的特别感谢
- **测试贡献**: Beta 测试和质量保证贡献者
- **推广贡献**: 社区推广和教育贡献者

### 特殊贡献奖励

#### 月度贡献者
- 每月评选突出贡献者
- 在项目主页和社交媒体上宣传
- 特殊的 GitHub 徽章和头衔

#### 年度贡献者
- 年度最佳贡献者评选
- 特制纪念品和证书
- 项目决策委员会邀请

## 📞 联系方式

### 开发团队联系

- **项目维护者**: @maintainer-username
- **技术负责人**: @tech-lead-username  
- **社区管理**: @community-manager-username

### 沟通渠道

- **GitHub Issues**: 技术问题和功能请求
- **GitHub Discussions**: 一般讨论和问答
- **邮件列表**: dev@tfdi-converter.org
- **Discord**: [邀请链接]

### 响应时间承诺

- **Bug 报告**: 48 小时内响应
- **功能请求**: 1 周内回复
- **Pull Request**: 3 个工作日内审查
- **社区问题**: 24 小时内回复

---

**感谢您考虑为 TFDI 导航数据转换器做出贡献！** 

我们期待与您一起构建更好的飞行模拟工具。🚁✨
