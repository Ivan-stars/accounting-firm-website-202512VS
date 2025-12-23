# Raymond C W Tam and Co. - 维护和开发指南 (Maintenance & Development Guide)

本文档提供了网站维护、开发和故障排除的完整指南。

This document provides comprehensive guidance for website maintenance, development, and troubleshooting.

---

## 目录 (Table of Contents)

1. [项目结构](#项目结构)
2. [翻译系统](#翻译系统)
3. [语言切换功能](#语言切换功能)
4. [导出脚本](#导出脚本)
5. [常见问题](#常见问题)
6. [新增页面和功能](#新增页面和功能)
7. [已知问题和修复](#已知问题和修复)

---

## 项目结构 (Project Structure)

### 核心文件 (Core Files)

| 文件名 | 用途 | 描述 |
|-------|------|------|
| `index.html` | 首页 | 包含英雄轮播、核心服务和行动呼吁 |
| `services.html` | 服务页面 | 四大服务详解：审计、税务、咨询、风险管理 |
| `about.html` | 关于页面 | 公司简介、使命、核心价值观 |
| `contact.html` | 联系页面 | 联系信息、联系表单 |

### 样式文件 (Style Files)

| 文件名 | 行数 | 用途 |
|-------|------|------|
| `assets/css/style.css` | 1385 | 主样式表，包含所有组件和布局 |
| `assets/css/responsive.css` | 548 | 响应式设计，处理不同屏幕尺寸 |

### JavaScript文件 (JavaScript Files)

| 文件名 | 行数 | 用途 | 关键功能 |
|-------|------|------|---------|
| `assets/js/main.js` | 769 | 主应用逻辑 | 语言切换、表单验证、导航、轮播初始化 |
| `assets/js/lang.js` | 300 | 翻译数据库 | 存储所有语言翻译键值对 |

### 图片资源 (Image Assets)

```
assets/images/
├── logo.png              # 公司标志
├── favicon.png           # 网站图标
├── flag-en.svg           # 英文国旗
├── flag-cn.svg           # 中文国旗
├── company-profile-meeting.jpg    # 关于页面图片
└── [其他图片文件]
```

### 导出脚本 (Export Scripts)

| 文件名 | 用途 |
|-------|------|
| `export_home_to_main_docx.py` | 将首页内容导出为DOCX |
| `export_services_to_main_docx.py` | 将服务页面导出为DOCX |
| `export_about_to_main_docx.py` | 将关于页面导出为DOCX |
| `export_contact_to_main_docx.py` | 将联系页面导出为DOCX |
| `export_website_content_for_client.py` | 通用导出脚本 |

---

## 翻译系统 (Translation System)

### 系统架构 (System Architecture)

翻译系统采用以下流程:

```
HTML文件
  ↓
data-i18n属性 (标记需要翻译的元素)
  ↓
JavaScript applyLanguage()函数
  ↓
window.getTranslation()查询
  ↓
lang.js中的translations对象
  ↓
返回翻译文本
  ↓
更新HTML元素textContent
```

### 支持的语言 (Supported Languages)

| 语言代码 | 语言名称 | 状态 |
|---------|---------|------|
| `en` | English (英文) | ✅ 完全支持 |
| `zh-CN` | Simplified Chinese (简体中文) | ✅ 完全支持 |
| `zh-HK` | Traditional Chinese (繁體中文) | ❌ 已禁用 |

### 翻译键结构 (Translation Key Structure)

在`lang.js`中，翻译被组织为嵌套对象:

```javascript
const translations = {
    'en': {
        // 语言名称
        'lang_en': 'English',
        'lang_zh_cn': '简体中文',
        
        // 导航
        'nav_home': 'Home',
        'nav_services': 'Services',
        
        // 服务描述
        'service_audit': 'Audit & Assurance',
        
        // ... 更多键值对
    },
    'zh-CN': {
        'lang_en': 'English',
        'lang_zh_cn': '简体中文',
        'nav_home': '首页',
        'nav_services': '服务',
        'service_audit': '审计与鉴证',
        
        // ... 对应的中文翻译
    }
};
```

### 添加新的翻译 (Adding New Translations)

#### 步骤1: 在HTML中标记元素
```html
<h2 data-i18n="my_new_key">Default English Text</h2>
```

#### 步骤2: 在lang.js中添加翻译键
```javascript
'en': {
    'my_new_key': 'My Default English Text',
    ...
},
'zh-CN': {
    'my_new_key': '我的默认中文文本',
    ...
}
```

#### 步骤3: 重新加载页面并测试

### 常见翻译键 (Common Translation Keys)

| 类别 | 键名示例 | 用途 |
|-----|---------|------|
| 导航 | `nav_home`, `nav_services`, `nav_about`, `nav_contact` | 主导航菜单 |
| 服务 | `service_audit`, `service_tax`, `service_consulting`, `service_risk` | 服务卡片标题 |
| 关于 | `company_title`, `about_our_story`, `about_core_values` | 关于页面内容 |
| 按钮 | `learn_more`, `contact_us`, `submit` | 行动按钮 |

---

## 语言切换功能 (Language Switching Feature)

### 工作原理 (How It Works)

1. **初始化** (Initialization):
   ```javascript
   let currentLang = localStorage.getItem('language');
   if (!currentLang || (currentLang !== 'en' && currentLang !== 'zh-CN' && currentLang !== 'zh-HK')) {
       currentLang = 'en';
       localStorage.setItem('language', 'en');
   }
   ```

2. **应用语言** (Apply Language):
   ```javascript
   function applyLanguage(lang) {
       const elements = document.querySelectorAll('[data-i18n]');
       elements.forEach(el => {
           el.textContent = window.getTranslation(el.getAttribute('data-i18n'), lang);
       });
   }
   ```

3. **语言持久化** (Language Persistence):
   - 用户选择的语言保存到`localStorage`中的`language`键
   - 导航到其他页面时，新页面从`localStorage`读取并应用相同的语言

### 已修复的问题 (Fixed Issues)

#### 问题1: 非主页的语言下拉菜单不显示简体中文选项
- **原因**: 选择语言链接的NodeList是在删除Traditional Chinese之前获取的
- **修复**: 在删除Traditional Chinese后重新选择语言链接
- **代码**: `main.js` 第44行

#### 问题2: 在英文页面上导航时内容变为中文
- **原因**: 语言初始化不够健壮，无法验证localStorage中的有效值
- **修复**: 添加了严格的语言验证和默认值设置
- **代码**: `main.js` 第24-28行

#### 问题3: 语言显示（标志和文本）在某些情况下不更新
- **原因**: 缺少null检查和默认值处理
- **修复**: 添加了null安全检查和else子句
- **代码**: `main.js` 第67-89行

---

## 导出脚本 (Export Scripts)

### 用途 (Purpose)

导出脚本用于将HTML网站内容导出为Word文档（.docx）格式，用于客户交付或存档。

### 依赖 (Dependencies)

```bash
pip install beautifulsoup4
pip install python-docx
```

### 使用方法 (Usage)

```bash
# 导出首页
python3 export_home_to_main_docx.py

# 导出服务页面
python3 export_services_to_main_docx.py

# 导出关于页面
python3 export_about_to_main_docx.py

# 导出联系页面
python3 export_contact_to_main_docx.py
```

### 脚本工作流 (Script Workflow)

1. **读取HTML文件** (Read HTML)
2. **提取相关翻译** (Extract Translations)
3. **解析HTML内容** (Parse Content)
4. **验证必需文本** (Validate Required Texts)
5. **生成DOCX文档** (Generate DOCX)

### 修复导出错误 (Fixing Export Errors)

#### 错误: "Required texts not found"

**症状**: 脚本显示找不到特定的文本

**解决方案**:
1. 检查脚本中的`required_texts`列表
2. 确保所有文本都存在于HTML文件中
3. 验证所有翻译键都在`lang.js`中定义
4. 更新`required_texts`列表以匹配实际内容

#### 错误: "KeyError in translations"

**症状**: 脚本因缺失翻译键而崩溃

**解决方案**:
1. 打开`lang.js`
2. 找到缺失的键
3. 在`translations['en']`和`translations['zh-CN']`中添加它
4. 重新运行脚本

---

## 常见问题 (Frequently Asked Questions)

### Q1: 如何添加新页面？
**A:** 
1. 创建新的HTML文件（例如`partners.html`）
2. 复制现有页面的基本结构（例如from `about.html`）
3. 更新所有导航链接以包含新页面
4. 在`lang.js`中添加所有需要的翻译键
5. 测试所有语言的链接和翻译

### Q2: 如何修改主颜色？
**A:** 编辑`assets/css/style.css`中的CSS变量（大约在第5-16行）:
```css
:root {
    --primary-color: #1A3E6F;      /* 修改这个值 */
    --secondary-color: #E3B34C;
    ...
}
```

### Q3: 为什么Swiper轮播不工作？
**A:** 
- 检查Swiper库是否正确加载（仅在首页加载）
- `main.js`已处理缺失的Swiper库的情况
- 确保`.swiper`元素存在于HTML中
- 检查浏览器控制台是否有错误

### Q4: 联系表单如何发送邮件？
**A:** 当前实现的是客户端验证。要发送电子邮件，需要:
- 集成后端API端点，或
- 使用第三方服务如Formspree、Netlify Forms或EmailJS

### Q5: 如何禁用Traditional Chinese？
**A:** 已自动禁用。在`main.js`第39行的代码会自动删除Traditional Chinese选项：
```javascript
const traditionalChineseLink = document.querySelector('.lang-dropdown li[data-lang="zh-HK"]');
if (traditionalChineseLink) {
    traditionalChineseLink.remove();
}
```

---

## 新增页面和功能 (Adding New Pages & Features)

### 添加新服务 (Adding a New Service)

#### 第1步: 在services.html中添加HTML
```html
<div id="newsection" class="service-section">
    <div class="service-header">
        <div class="service-icon"><!-- SVG图标 --></div>
        <h2 data-i18n="nav_newsection">New Service</h2>
        <p class="service-intro" data-i18n="newsection_intro">Service introduction</p>
    </div>
    <div class="service-content">
        <div class="service-grid">
            <div class="service-item">
                <h3 data-i18n="newsection_item1">Item 1</h3>
                <p data-i18n="newsection_item1_desc">Description</p>
            </div>
            <!-- 更多项目 -->
        </div>
    </div>
</div>
```

#### 第2步: 在lang.js中添加翻译
```javascript
'en': {
    'nav_newsection': 'New Service',
    'newsection_intro': 'Service introduction text',
    'newsection_item1': 'First Item',
    'newsection_item1_desc': 'Item description',
    ...
},
'zh-CN': {
    'nav_newsection': '新服务',
    'newsection_intro': '服务介绍文本',
    'newsection_item1': '第一项',
    'newsection_item1_desc': '项目描述',
    ...
}
```

#### 第3步: 在main.js中添加动态翻译（如果需要）
如果服务有动态内容，在`translateServicesContent`函数中添加相应的处理。

---

## 已知问题和修复 (Known Issues & Fixes)

### 已修复的问题 (Fixed Issues)

| 问题 | 原因 | 修复方法 | 修复日期 |
|-----|------|---------|---------|
| 非主页语言下拉菜单缺少简体中文 | 在删除Traditional Chinese之前获取节点列表 | 重新选择节点 | 2025-12-23 |
| 页面导航时语言重置为中文 | 不够健壮的语言初始化 | 添加严格的语言验证 | 2025-12-23 |
| 关于和服务页面缺少英文翻译 | 翻译键不完整 | 添加所有缺失的翻译 | 2025-12-23 |
| Swiper初始化错误（非主页） | 所有页面都尝试初始化Swiper | 添加typeof检查 | 2025-12-23 |

### 当前已知限制 (Current Limitations)

1. **联系表单**: 只进行客户端验证，不发送电子邮件（需要后端）
2. **移动菜单**: 在极小屏幕上可能需要进一步优化
3. **浏览器支持**: 不支持IE 11

---

## 性能优化 (Performance Optimization)

### 建议 (Recommendations)

1. **图片优化**:
   - 压缩所有图像文件
   - 考虑使用WebP格式
   - 对大图像使用懒加载

2. **代码优化**:
   - 最小化CSS和JavaScript文件
   - 使用CDN加载库

3. **缓存**:
   - 启用浏览器缓存
   - 使用Service Worker进行离线支持

4. **监控**:
   - 定期测试页面加载速度
   - 监控用户交互性能

---

## 版本更新日志 (Changelog)

### v2.0 - 2025年12月23日
- ✅ 修复语言下拉菜单在非主页上的显示问题
- ✅ 添加所有缺失的英文翻译
- ✅ 改进语言初始化和持久化逻辑
- ✅ 增强Swiper库错误处理
- ✅ 更新文档

### v1.0 - 初始发布
- ✅ 完整的双语网站实现
- ✅ 响应式设计
- ✅ 四个主要页面
- ✅ 导出功能

---

## 联系与支持 (Contact & Support)

如有任何问题或需要技术支持，请与开发团队联系。

For technical support or questions, please contact the development team.

---

最后更新 (Last Updated): 2025年12月23日

Website is compatible with all modern browsers (Chrome, Firefox, Safari, Edge)

## Performance
- Optimize images in `assets/images/` to reduce load times
- Minify CSS and JS files for production
- Use lazy loading for images when appropriate