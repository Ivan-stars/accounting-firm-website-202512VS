# Raymond C W Tam and Co. - Professional Accounting Firm Website

专业会计服务网站 | Professional Accounting Firm Website

这是一个为Raymond C W Tam and Co.专业会计师事务所构建的响应式网站，提供审计、税务筹划、企业咨询和风险管理服务。该网站采用HTML、CSS和JavaScript构建，具有现代化设计、完整的响应式布局，以及英文和简体中文双语支持。

This is a responsive website for Raymond C W Tam and Co., a professional accounting firm offering audit assurance, tax planning, business consulting, and risk management services. The website is built with HTML, CSS, and JavaScript, featuring modern design, fully responsive layout, and bilingual support in English and Simplified Chinese.

## 主要特点 (Key Features)

- ✅ 响应式设计 - 完美适配桌面、平板和移动设备 (Responsive design for desktop, tablet, and mobile)
- ✅ 双语支持 - 英文和简体中文切换 (Bilingual support: English and Simplified Chinese)
- ✅ 交互式语言选择器 - 实时语言切换功能 (Interactive language selector with real-time switching)
- ✅ 首页幻灯片轮播 - 使用Swiper.js库 (Homepage carousel using Swiper.js)
- ✅ 多页面结构 - 首页、服务、关于、联系页面 (Multi-page structure: Home, Services, About, Contact)
- ✅ 详细的服务展示 - 审计、税务、咨询、风险管理服务详解 (Detailed service descriptions)
- ✅ 响应式导航菜单 - 包含子菜单功能 (Responsive navigation with submenu)
- ✅ 在线联系表单 - 客户端验证 (Contact form with client-side validation)

## 文件结构 (File Structure)

```
accounting-firm-website/
├── index.html                    # 首页 (Homepage)
├── services.html                 # 服务页面 (Services page)
├── about.html                    # 关于我们页面 (About Us page)
├── contact.html                  # 联系我们页面 (Contact page)
├── assets/
│   ├── css/
│   │   ├── style.css             # 主样式文件 (Main stylesheet - 1385 lines)
│   │   └── responsive.css        # 响应式样式 (Responsive styles - 548 lines)
│   ├── js/
│   │   ├── main.js               # 主JavaScript文件 (Main JavaScript - 763 lines)
│   │   └── lang.js               # 翻译系统 (Translation system - 300 lines)
│   └── images/                   # 网站图片素材 (Website images and icons)
├── en/                           # 英文页面副本目录 (English page copies directory)
├── zh-CN/                        # 简体中文页面副本目录 (Simplified Chinese page copies directory)
├── MAINTENANCE_GUIDE.md          # 维护指南 (Maintenance guide)
└── README.md                     # 项目说明文档 (This file)
```

## 设计规格 (Design Specifications)

### 色彩方案 (Color Scheme)

| 颜色用途 | 颜色值 | 中文名称 | English Name |
|---------|-------|---------|--------------|
| 主品牌色 | #1A3E6F | 深海蓝 | Deep Sea Blue |
| 辅助色 | #E3B34C | 香槟金 | Champagne Gold |
| 背景色 | #F8F9FA | 浅灰白 | Light Gray White |
| 强调色 | #4CAF50 | 商务绿 | Business Green |
| 文字深色 | #333333 | 深灰 | Dark Gray |

### 字体 (Fonts)

- 中文标题: Noto Sans SC (Medium 500)
- 中文正文: Noto Sans SC (Light 300 / Regular 400)
- 英文标题: Montserrat (SemiBold 600)
- 英文正文: Lato (Regular 400)

### 响应式设计断点 (Responsive Breakpoints)

| 设备类型 | 屏幕宽度 | CSS类名 |
|--------|---------|---------|
| 桌面 (Desktop) | ≥1200px | 默认样式 |
| 平板 (Tablet) | 768px - 1199px | @media (max-width: 991.98px) |
| 手机 (Mobile) | ≤767px | @media (max-width: 575.98px) |

## 多语言系统 (Multi-Language System)

### 支持的语言 (Supported Languages)

- **英文 (English)** - 默认语言 (Default language)
- **简体中文 (Simplified Chinese)** - zh-CN
- ~~传统中文 (Traditional Chinese)~~ - 已禁用 (Disabled)

### 语言切换工作原理 (How Language Switching Works)

1. 用户在任何页面点击语言选择器 (User clicks language selector on any page)
2. 选择的语言保存到`localStorage`中的`language`键 (Selected language saved to localStorage)
3. 页面加载时读取`localStorage`并应用该语言 (Page load reads localStorage and applies language)
4. 所有带`data-i18n`属性的元素被翻译 (All elements with `data-i18n` attribute are translated)
5. 导航到其他页面时语言设置被保留 (Language setting persists across page navigation)

### 添加新的翻译键 (Adding New Translation Keys)

1. 打开`assets/js/lang.js`文件 (Open `assets/js/lang.js`)
2. 在`translations['en']`对象中添加新的键值对 (Add key-value pair to `translations['en']`)
3. 在对应的`translations['zh-CN']`中添加中文翻译 (Add Chinese translation in `translations['zh-CN']`)
4. 在HTML中使用`data-i18n="key_name"`属性 (Use `data-i18n="key_name"` in HTML)

示例 (Example):
```javascript
'new_service': 'New Service',  // English
...
'new_service': '新服务',       // Simplified Chinese
```

HTML使用 (Usage):
```html
<h3 data-i18n="new_service">New Service</h3>
```

## JavaScript库和依赖 (JavaScript Libraries & Dependencies)

| 库名 | 用途 | CDN链接 |
|-----|------|--------|
| Swiper | 幻灯片轮播 (Carousel) | https://unpkg.com/swiper@8/swiper-bundle.min.js |
| Font Awesome | 图标库 (Icon library) | 本地SVG (Local SVG) |

## 功能详解 (Feature Details)

### 首页 (Homepage)
- Swiper轮播展示三个主要幻灯片
- 核心服务卡片展示
- 企业信息统计
- 行动呼吁 (CTA) 部分

### 服务页面 (Services Page)
- 四大服务板块: 审计、税务、咨询、风险管理
- 每个服务有详细的4个子服务项目
- 动态内容翻译系统

### 关于页面 (About Page)
- 公司简介和历史
- 企业使命说明
- 核心价值观展示

### 联系页面 (Contact Page)
- 联系信息卡片
- 客户端表单验证

## 浏览器兼容性 (Browser Compatibility)

| 浏览器 | 最低版本 | 支持状态 |
|-------|---------|--------|
| Chrome | 最新版 | ✅ 完全支持 |
| Firefox | 最新版 | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 最新版 | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

## 使用方法 (How to Use)

### 本地开发 (Local Development)

1. 克隆或下载项目到本地
   ```bash
   git clone <repository-url>
   cd accounting-firm-website
   ```

2. 在浏览器中打开任意HTML文件
   ```bash
   open index.html
   ```
   或直接双击HTML文件打开

3. 可选:使用本地Web服务器运行
   ```bash
   python3 -m http.server 8000
   # 然后访问 http://localhost:8000
   ```

### 生产部署 (Production Deployment)

1. 将所有文件上传到Web服务器
2. 确保目录结构保持一致
3. 所有文件都可在任何支持HTML/CSS/JS的Web服务器上运行
4. 无需后端配置或数据库

## 自定义指南 (Customization Guide)

### 修改公司信息 (Update Company Information)

编辑以下文件中的文本:
- HTML文件中的内容
- `assets/js/lang.js`中对应的中英文翻译

示例 (Example):
```html
<!-- 在HTML中 -->
<h2 data-i18n="company_name">Raymond C W Tam and Co.</h2>
```

```javascript
// 在lang.js中
'company_name': 'Your Company Name',  // English
...
'company_name': '您的公司名称',       // Chinese
```

### 修改样式 (Change Styles)

- **全局样式**: 修改`assets/css/style.css`中的CSS变量
- **响应式调整**: 修改`assets/css/responsive.css`
- **颜色更改**: 编辑style.css中`:root`的CSS变量

```css
:root {
    --primary-color: #1A3E6F;      /* 修改主品牌色 */
    --secondary-color: #E3B34C;    /* 修改辅助色 */
}
```

### 添加新页面 (Add New Pages)

1. 创建新的HTML文件 (Create new HTML file)
2. 复制现有页面的基本结构 (Copy basic structure from existing page)
3. 更新`<title>`和`<meta>`标签
4. 在所有HTML文件中更新导航链接
5. 在`lang.js`中添加新的翻译键
6. 使用`data-i18n`属性标记所有需要翻译的内容

## 常见问题 (Frequently Asked Questions)

### Q: 如何更改语言默认值？
**A:** 修改`main.js`中的语言初始化代码:
```javascript
let currentLang = localStorage.getItem('language') || 'en'; // 修改'en'为其他语言
```

### Q: 为什么页面导航后语言会改变？
**A:** 这是已修复的问题。确保您使用最新版本的`main.js`，其中包含语言持久化逻辑。

### Q: 如何禁用Traditional Chinese？
**A:** 这已在代码中自动处理。传统中文选项会在JavaScript初始化时被移除。

### Q: 联系表单如何工作？
**A:** 当前实现的是客户端表单验证。要发送电子邮件，需要配置后端服务或使用第三方服务如Formspree或Netlify Forms。

## 性能优化 (Performance Tips)

- 所有图像应该优化和压缩
- 考虑使用CDN加载字体和库
- 启用浏览器缓存
- 最小化CSS和JavaScript（对于生产环境）

## 维护和支持 (Maintenance & Support)

详见`MAINTENANCE_GUIDE.md`文件了解:
- 导出脚本的使用
- 翻译系统的维护
- 常见问题的解决方案

## 版本历史 (Version History)

### v2.0 (2025年12月)
- ✅ 修复了非主页上的语言下拉菜单问题
- ✅ 添加了缺失的英文翻译（服务页面和关于页面）
- ✅ 改进了语言初始化和持久化逻辑
- ✅ 增强了Swiper库的错误处理

### v1.0 (初始版本)
- 完整的双语网站实现
- 响应式设计
- 四个主要页面

## 许可证 (License)

© 2024 Raymond C W Tam and Co. 版权所有。保留所有权利。
© 2024 Raymond C W Tam and Co. All rights reserved.

## 相关文档 (Related Documentation)

- `MAINTENANCE_GUIDE.md` - 维护指南和故障排除
- 无其他文档

---

最后更新 (Last Updated): 2025年12月23日
 