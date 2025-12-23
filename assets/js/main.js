document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper carousel (only if Swiper library is loaded)
    if (typeof Swiper !== 'undefined') {
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // 设置当前语言
    let currentLang = localStorage.getItem('language');
    if (!currentLang || (currentLang !== 'en' && currentLang !== 'zh-CN' && currentLang !== 'zh-HK')) {
        currentLang = 'en';
        localStorage.setItem('language', 'en');
    }
    
    // 更新页面上的所有文本
    applyLanguage(currentLang);
    
    // 语言切换
    const languageSwitcher = document.querySelector('.language-switcher');
    const currentLangEl = document.querySelector('.current-lang');
    
    // Always remove Traditional Chinese
    const traditionalChineseLink = document.querySelector('.lang-dropdown li[data-lang="zh-HK"]');
    if (traditionalChineseLink) {
        traditionalChineseLink.remove();
    }
    
    // 设置当前语言显示
    updateCurrentLanguageDisplay(currentLang);
    
    // Add event listener to language links - reselect after removing Traditional Chinese
    const langSwitcherLinks = document.querySelectorAll('.lang-dropdown li');
    langSwitcherLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            currentLang = lang;
            localStorage.setItem('language', lang);
            applyLanguage(lang);
            updateCurrentLanguageDisplay(lang);
            
            // 隐藏下拉菜单
            const langDropdown = document.querySelector('.lang-dropdown');
            langDropdown.classList.remove('show');
        });
    });
    
    // 更新当前语言显示
    function updateCurrentLanguageDisplay(lang) {
        const flag = currentLangEl.querySelector('img');
        const text = currentLangEl.querySelector('span');
        
        // Ensure flag and text exist before trying to modify them
        if (!flag || !text) return;
        
        if (lang === 'zh-HK') {
            flag.src = 'assets/images/flag-hk.svg';
            flag.alt = '繁體中文';
            text.textContent = window.getTranslation('lang_zh_hk', lang);
        } else if (lang === 'zh-CN') {
            flag.src = 'assets/images/flag-cn.svg';
            flag.alt = '简体中文';
            text.textContent = window.getTranslation('lang_zh_cn', lang);
        } else {
            // Default to English for any other language or if lang is not set
            flag.src = 'assets/images/flag-en.svg';
            flag.alt = 'English';
            text.textContent = window.getTranslation('lang_en', 'en');
        }
        
        // 确保国旗和文本紧密结合
        currentLangEl.innerHTML = '';
        currentLangEl.appendChild(flag);
        currentLangEl.appendChild(text);
    }
    
    // 应用语言翻译
    function applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (window.getTranslation) {
                el.textContent = window.getTranslation(key, lang);
            }
        });
        
        // 更新 HTML 标签的 lang 属性
        document.documentElement.lang = lang;
        
        // 翻译服务页面内容
        translateServicesContent(lang);
    }
    
    // 翻译服务页面的硬编码内容
    function translateServicesContent(lang) {
        // 检查是否是服务页面
        if (window.location.pathname.includes('services.html')) {
            // 服务页面标题翻译
            const serviceHeaders = {
                'audit': {
                    'zh-CN': '审计鉴证',
                    'zh-HK': '審計鑒證',
                    'en': 'Audit & Assurance'
                },
                'tax': {
                    'zh-CN': '税务筹划',
                    'zh-HK': '稅務籌劃',
                    'en': 'Tax Planning'
                },
                'consulting': {
                    'zh-CN': '企业咨询',
                    'zh-HK': '企業諮詢',
                    'en': 'Business Consulting'
                },
                'risk': {
                    'zh-CN': '风险管理',
                    'zh-HK': '風險管理',
                    'en': 'Risk Management'
                }
            };
            
            // 服务介绍段落翻译
            const serviceIntros = {
                'audit': {
                    'zh-CN': '作为专业的审计鉴证服务提供者，我们致力于帮助企业提升财务信息的透明度和可信度。在香港，审计鉴证不仅是法律的要求，更是企业赢得投资者信任、稳健发展的关键。我们严格遵循香港会计师公会（HKICPA）制定的《香港审计及鉴证准则》，确保每一份审计报告都符合国际标准，体现最高的独立性和专业水准。<br><br>无论是法定财务审计，还是内部控制审核、财务预测鉴证等多样化服务，我们都以严谨细致的态度，获取充分的审计证据，帮助客户准确反映财务状况，满足监管和市场的多重需求。我们的团队深谙香港公司条例及相关法规，确保审计流程合规高效，助力企业稳健运营。',
                    'zh-HK': '作為專業的審計鑒證服務提供者，我們致力於幫助企業提升財務信息的透明度和可信度。在香港，審計鑒證不僅是法律的要求，更是企業贏得投資者信任、穩健發展的關鍵。我們嚴格遵循香港會計師公會（HKICPA）制定的《香港審計及鑒證準則》，確保每一份審計報告都符合國際標準，體現最高的獨立性和專業水準。<br><br>無論是法定財務審計，還是內部控制審核、財務預測鑒證等多樣化服務，我們都以嚴謹細緻的態度，獲取充分的審計證據，幫助客戶準確反映財務狀況，滿足監管和市場的多重需求。我們的團隊深諳香港公司條例及相關法規，確保審計流程合規高效，助力企業穩健運營。',
                    'en': 'As a professional audit assurance service provider, we are committed to helping businesses enhance the transparency and credibility of their financial information. In Hong Kong, audit assurance is not only a legal requirement but also key to winning investor trust and sustainable development. We strictly adhere to the Hong Kong Standards on Auditing and Assurance established by the Hong Kong Institute of Certified Public Accountants (HKICPA), ensuring that every audit report meets international standards with the highest level of independence and professionalism.<br><br>Whether it\'s statutory financial audits, internal control reviews, or financial forecast assurance, we approach each service with rigorous attention to detail, gathering sufficient audit evidence to help clients accurately reflect their financial position and meet various regulatory and market requirements. Our team is well-versed in the Hong Kong Companies Ordinance and related regulations, ensuring efficient and compliant audit processes that support stable business operations.'
                },
                'tax': {
                    'zh-CN': '我们的税务团队由在本地与国际税法领域具有丰富经验的专业人士组成，能够为您提供全面的税务筹划与遵从服务。了解当地与全球不断变化的税收环境，是优化企业税务架构、减轻税务负担的关键。<br><br>无论您是本地企业还是跨国集团，我们都能根据您的具体情况，提供量身定制的税务解决方案，帮助您在遵守法规的同时，合理规划税务，最大化企业利益。我们的专业知识涵盖企业所得税、个人税、跨境税务以及转让定价等多个领域，确保为您提供全方位的税务支持。',
                    'zh-HK': '我們的稅務團隊由在本地與國際稅法領域具有豐富經驗的專業人士組成，能夠為您提供全面的稅務籌劃與遵從服務。了解當地與全球不斷變化的稅收環境，是優化企業稅務架構、減輕稅務負擔的關鍵。<br><br>無論您是本地企業還是跨國集團，我們都能根據您的具體情況，提供量身定制的稅務解決方案，幫助您在遵守法規的同時，合理規劃稅務，最大化企業利益。我們的專業知識涵蓋企業所得稅、個人稅、跨境稅務以及轉讓定價等多個領域，確保為您提供全方位的稅務支持。',
                    'en': 'Our tax team consists of professionals with extensive experience in both local and international tax law, providing comprehensive tax planning and compliance services. Understanding the constantly changing tax environment locally and globally is key to optimizing corporate tax structures and reducing tax burdens.<br><br>Whether you are a local business or a multinational group, we can provide tailored tax solutions based on your specific circumstances, helping you to plan your taxes reasonably while complying with regulations to maximize business benefits. Our expertise covers corporate income tax, personal tax, cross-border taxation, transfer pricing, and many other areas, ensuring all-round tax support for you.'
                },
                'consulting': {
                    'zh-CN': '在瞬息万变的商业环境中，企业需要专业的商业咨询服务，以保持竞争优势并实现可持续发展。我们的咨询团队提供全面的企业咨询服务，从公司成立、商业模式优化到业务拓展策略，助力企业在各个发展阶段取得成功。<br><br>我们深入了解不同行业的特点与挑战，能够为客户提供符合行业特性的解决方案。通过与客户紧密合作，我们帮助他们制定明确的发展路径，识别潜在的业务机会，并克服成长过程中的障碍，实现业务目标。',
                    'zh-HK': '在瞬息萬變的商業環境中，企業需要專業的商業諮詢服務，以保持競爭優勢並實現可持續發展。我們的諮詢團隊提供全面的企業諮詢服務，從公司成立、商業模式優化到業務拓展策略，助力企業在各個發展階段取得成功。<br><br>我們深入了解不同行業的特點與挑戰，能夠為客戶提供符合行業特性的解決方案。通過與客戶緊密合作，我們幫助他們制定明確的發展路徑，識別潛在的業務機會，並克服成長過程中的障礙，實現業務目標。',
                    'en': 'In a rapidly changing business environment, companies need professional business consulting services to maintain a competitive edge and achieve sustainable development. Our consulting team provides comprehensive enterprise consulting services, from company establishment and business model optimization to business expansion strategies, helping businesses succeed at every stage of development.<br><br>We have a deep understanding of the characteristics and challenges of different industries and can provide solutions that match industry-specific needs. By working closely with our clients, we help them establish clear development paths, identify potential business opportunities, and overcome obstacles in the growth process to achieve their business goals.'
                },
                'risk': {
                    'zh-CN': '有效的风险管理是企业稳健运营的基石。我们提供全方位的风险管理服务，帮助企业识别、评估和管理各类风险，包括战略风险、运营风险、财务风险以及合规风险。<br><br>通过建立健全的风险管理框架与内控系统，我们协助企业预防潜在风险，减少损失，并在发生意外情况时能够迅速响应。我们的专业团队具备丰富的行业经验，熟悉香港及国际的监管要求，能够为企业提供切实可行的风险管理方案，助力企业长期稳健发展。',
                    'zh-HK': '有效的風險管理是企業穩健運營的基石。我們提供全方位的風險管理服務，幫助企業識別、評估和管理各類風險，包括戰略風險、運營風險、財務風險以及合規風險。<br><br>通過建立健全的風險管理框架與內控系統，我們協助企業預防潛在風險，減少損失，並在發生意外情況時能夠迅速響應。我們的專業團隊具備豐富的行業經驗，熟悉香港及國際的監管要求，能夠為企業提供切實可行的風險管理方案，助力企業長期穩健發展。',
                    'en': 'Effective risk management is the cornerstone of stable business operations. We provide comprehensive risk management services to help businesses identify, assess, and manage various risks, including strategic, operational, financial, and compliance risks.<br><br>By establishing sound risk management frameworks and internal control systems, we assist businesses in preventing potential risks, reducing losses, and responding quickly when unexpected situations occur. Our professional team has rich industry experience and is familiar with Hong Kong and international regulatory requirements, enabling us to provide practical risk management solutions that support long-term stable business development.'
                }
            };
            
            // 审计服务内容翻译
            const auditServiceItems = {
                0: { // 法定审计
                    'zh-CN': '法定审计',
                    'zh-HK': '法定審計',
                    'en': 'Statutory Audit'
                },
                1: { // 内部审计
                    'zh-CN': '内部审计',
                    'zh-HK': '內部審計',
                    'en': 'Internal Audit'
                },
                2: { // 特殊目的审计
                    'zh-CN': '特殊目的审计',
                    'zh-HK': '特殊目的審計',
                    'en': 'Special Purpose Audit'
                },
                3: { // IPO准备审计
                    'zh-CN': 'IPO准备审计',
                    'zh-HK': 'IPO準備審計',
                    'en': 'IPO Preparation Audit'
                }
            };
            
            // 税务服务内容翻译
            const taxServiceItems = {
                0: { // 企业所得税筹划
                    'zh-CN': '企业所得税筹划',
                    'zh-HK': '企業所得稅籌劃',
                    'en': 'Corporate Income Tax Planning'
                },
                1: { // 跨境税务规划
                    'zh-CN': '跨境税务规划',
                    'zh-HK': '跨境稅務規劃',
                    'en': 'Cross-border Tax Planning'
                },
                2: { // 个人税务顾问
                    'zh-CN': '个人税务顾问',
                    'zh-HK': '個人稅務顧問',
                    'en': 'Personal Tax Advisory'
                },
                3: { // 税务合规服务
                    'zh-CN': '税务合规服务',
                    'zh-HK': '稅務合規服務',
                    'en': 'Tax Compliance Services'
                }
            };
            
            // 咨询服务内容翻译
            const consultingServiceItems = {
                0: { // 企业架构规划
                    'zh-CN': '企业架构规划',
                    'zh-HK': '企業架構規劃',
                    'en': 'Corporate Structure Planning'
                },
                1: { // 商业计划书撰写
                    'zh-CN': '商业计划书撰写',
                    'zh-HK': '商業計劃書撰寫',
                    'en': 'Business Plan Writing'
                },
                2: { // 财务管理优化
                    'zh-CN': '财务管理优化',
                    'zh-HK': '財務管理優化',
                    'en': 'Financial Management Optimization'
                },
                3: { // 业务流程重组
                    'zh-CN': '业务流程重组',
                    'zh-HK': '業務流程重組',
                    'en': 'Business Process Restructuring'
                }
            };
            
            // 风险管理服务内容翻译
            const riskServiceItems = {
                0: { // 企业风险评估
                    'zh-CN': '企业风险评估',
                    'zh-HK': '企業風險評估',
                    'en': 'Enterprise Risk Assessment'
                },
                1: { // 内控体系设计
                    'zh-CN': '内控体系设计',
                    'zh-HK': '內控體系設計',
                    'en': 'Internal Control System Design'
                },
                2: { // 合规咨询
                    'zh-CN': '合规咨询',
                    'zh-HK': '合規諮詢',
                    'en': 'Compliance Consulting'
                },
                3: { // 危机管理
                    'zh-CN': '危机管理',
                    'zh-HK': '危機管理',
                    'en': 'Crisis Management'
                }
            };
            
            // 翻译服务标题
            const serviceSections = document.querySelectorAll('.service-section');
            serviceSections.forEach(section => {
                const sectionId = section.id;
                const headerTitle = section.querySelector('h2');
                
                if (headerTitle && serviceHeaders[sectionId] && serviceHeaders[sectionId][lang]) {
                    headerTitle.textContent = serviceHeaders[sectionId][lang];
                }
                
                // 翻译服务介绍段落
                const introText = section.querySelector('.service-intro');
                if (introText && serviceIntros[sectionId] && serviceIntros[sectionId][lang]) {
                    introText.innerHTML = serviceIntros[sectionId][lang];
                }
                
                // 根据服务类型翻译对应的服务项目
                let serviceItems;
                switch(sectionId) {
                    case 'audit':
                        serviceItems = auditServiceItems;
                        break;
                    case 'tax':
                        serviceItems = taxServiceItems;
                        break;
                    case 'consulting':
                        serviceItems = consultingServiceItems;
                        break;
                    case 'risk':
                        serviceItems = riskServiceItems;
                        break;
                }
                
                if (serviceItems) {
                    const items = section.querySelectorAll('.service-item h3');
                    items.forEach((item, index) => {
                        if (serviceItems[index] && serviceItems[index][lang]) {
                            item.textContent = serviceItems[index][lang];
                        }
                    });
                    
                    // Also translate the service item descriptions (paragraphs)
                    if (lang === 'en' || lang === 'zh-HK') {
                        const paragraphs = section.querySelectorAll('.service-item p');
                        paragraphs.forEach((paragraph, index) => {
                            // For now, create placeholder English/Traditional content
                            // In a real implementation, you would have full translations
                            if (lang === 'en') {
                                // More detailed translations based on the section and item index
                                if (sectionId === 'audit') {
                                    switch(index) {
                                        case 0: // Statutory Audit
                                            if (lang === 'en') {
                                                paragraph.innerHTML = `Our statutory audit services strictly adhere to the Hong Kong Standards on Auditing and Assurance established by the HKICPA, combined with International Financial Reporting Standards to ensure audit quality and independence. Through a systematic audit process, including audit planning, internal control assessment, substantive testing, and audit report issuance, we help clients accurately reflect their financial position and meet regulatory and tax filing requirements.<br><br>Additionally, we are familiar with the timing requirements for audits under the Hong Kong Companies Ordinance to ensure audits are completed on schedule, avoiding compliance risks. Whether for startups or established companies, we provide tailored audit solutions that enhance financial transparency and strengthen the confidence of investors and business partners.`;
                                            } else if (lang === 'zh-CN') {
                                                paragraph.innerHTML = `我们的法定审计服务严格遵守香港会计师公会（HKICPA）制定的《香港审计及鉴证准则》，结合国际财务报告标准，保障审计质量与独立性。通过系统的审计流程，包括审计计划制定、内部控制评估、实质性测试及审计报告出具，我们帮助客户准确反映财务状况，满足监管和税务申报要求。<br><br>此外，我们熟悉香港公司条例中关于审计时间节点的规定，确保审计工作按期完成，避免合规风险。无论是初创企业还是成熟公司，我们都提供量身定制的审计方案，助力企业提升财务透明度，增强投资者和合作伙伴信心。`;
                                            } else if (lang === 'zh-HK') {
                                                paragraph.innerHTML = `我們的法定審計服務嚴格遵守香港會計師公會（HKICPA）制定的《香港審計及鑒證準則》，結合國際財務報告標準，保障審計質量與獨立性。通過系統的審計流程，包括審計計劃制定、內部控制評估、實質性測試及審計報告出具，我們幫助客戶準確反映財務狀況，滿足監管和稅務申報要求。<br><br>此外，我們熟悉香港公司條例中關於審計時間節點的規定，確保審計工作按期完成，避免合規風險。無論是初創企業還是成熟公司，我們都提供量身定制的審計方案，助力企業提升財務透明度，增強投資者和合作夥伴信心。`;
                                            }
                                            break;
                                        case 1: // Internal Audit
                                            if (lang === 'en') {
                                                paragraph.innerHTML = `Our internal audit team leverages deep knowledge of Hong Kong's regulatory environment and extensive industry experience to provide comprehensive internal control evaluation and risk management services. We adopt standards from the Institute of Internal Auditors (IIA) combined with Hong Kong-specific regulatory requirements to design internal audit solutions that match the size and industry characteristics of each business.<br><br>We focus not only on financial risks but also comprehensively assess operational, compliance, information technology, and strategic risks, helping enterprises build robust risk prevention systems. Through systematic internal control testing, process reviews, and risk assessments, we can promptly identify control deficiencies and provide practical improvement recommendations, enhancing overall corporate governance. As an independent third party, our internal audit services provide objective risk assurance to boards and management teams, supporting sustainable long-term business development.`;
                                            } else if (lang === 'zh-CN') {
                                                paragraph.innerHTML = `我们的内部审计团队凭借对香港监管环境的深入了解和丰富的行业经验，为企业提供全面的内控评估与风险管理服务。我们采用国际内部审计师协会(IIA)标准结合香港特定监管要求，设计符合企业规模和行业特点的内部审计方案。<br><br>我们不仅关注财务风险，更全面评估运营、合规、信息技术和战略风险，帮助企业构建健全的风险防范体系。通过系统性的内控测试、流程审查和风险评估，我们能够及时识别控制缺陷，并提供切实可行的改进建议，提升企业整体治理水平。作为独立的第三方，我们的内部审计服务能够为董事会和管理层提供客观的风险保证，助力企业实现长期可持续发展。`;
                                            } else if (lang === 'zh-HK') {
                                                paragraph.innerHTML = `我們的內部審計團隊憑藉對香港監管環境的深入了解和豐富的行業經驗，為企業提供全面的內控評估與風險管理服務。我們採用國際內部審計師協會(IIA)標準結合香港特定監管要求，設計符合企業規模和行業特點的內部審計方案。<br><br>我們不僅關注財務風險，更全面評估運營、合規、信息技術和戰略風險，幫助企業構建健全的風險防範體系。通過系統性的內控測試、流程審查和風險評估，我們能夠及時識別控制缺陷，並提供切實可行的改進建議，提升企業整體治理水平。作為獨立的第三方，我們的內部審計服務能夠為董事會和管理層提供客觀的風險保證，助力企業實現長期可持續發展。`;
                                            }
                                            break;
                                        case 2: // Special Purpose Audit
                                            if (lang === 'en') {
                                                paragraph.innerHTML = `In Hong Kong's complex and dynamic business environment, enterprises often require special purpose audits to provide professional support during key transaction phases such as mergers and acquisitions, restructuring, and financing. Our special purpose audit services embody the concept of "tailored solutions," designing personalized audit plans based on different business scenarios and client needs.<br><br>Our professional team possesses rich industry knowledge and transaction experience, capable of providing precise and reliable audit reports for specific purposes such as bank loans, government subsidy applications, and due diligence. We strictly follow the relevant standards of the Hong Kong Institute of Certified Public Accountants, ensuring audit quality while fully considering efficiency requirements to complete audit work as quickly as possible. Through our professional services, clients can obtain reliable financial bases for important business decisions, reduce transaction risks, and seize market opportunities.`;
                                            } else if (lang === 'zh-CN') {
                                                paragraph.innerHTML = `在香港复杂多变的商业环境中，企业在并购、重组、融资等关键交易环节往往需要特殊目的审计提供专业支持。我们的特殊目的审计服务贯彻"量体裁衣"的理念，根据不同业务场景和客户需求，设计个性化的审计方案。<br><br>我们的专业团队具备丰富的行业知识和交易经验，能够为银行贷款、政府补贴申请、尽职调查等特定目的提供精准、可靠的审计报告。我们严格遵循香港会计师公会相关准则，确保审计质量的同时，充分考虑时效性要求，以最快速度完成审计工作。通过我们的专业服务，客户能够在重要商业决策中获得可靠的财务依据，降低交易风险，把握市场机遇。`;
                                            } else if (lang === 'zh-HK') {
                                                paragraph.innerHTML = `在香港複雜多變的商業環境中，企業在併購、重組、融資等關鍵交易環節往往需要特殊目的審計提供專業支持。我們的特殊目的審計服務貫徹"量體裁衣"的理念，根據不同業務場景和客戶需求，設計個性化的審計方案。<br><br>我們的專業團隊具備豐富的行業知識和交易經驗，能夠為銀行貸款、政府補貼申請、盡職調查等特定目的提供精準、可靠的審計報告。我們嚴格遵循香港會計師公會相關準則，確保審計質量的同時，充分考慮時效性要求，以最快速度完成審計工作。通過我們的專業服務，客戶能夠在重要商業決策中獲得可靠的財務依據，降低交易風險，把握市場機遇。`;
                                            }
                                            break;
                                        case 3: // IPO Preparation Audit
                                            if (lang === 'en') {
                                                paragraph.innerHTML = `As a core advantage of Hong Kong as an international financial center, the capital market provides valuable financing opportunities for businesses. Our IPO preparation audit team has extensive listing experience, is familiar with Hong Kong Stock Exchange (HKEX) listing rules and regulatory requirements, and can provide one-stop audit and consulting services for companies planning to go public.<br><br>Our IPO audit focuses not only on the accuracy of historical financial information but also on the ability to maintain ongoing compliance after listing. From preliminary financial due diligence, internal control system assessment, to financial information review of listing application documents, we provide full-process professional support to help enterprises smoothly pass the scrutiny of sponsors, exchanges, and regulatory authorities. We maintain close cooperation with various participants in the Hong Kong capital market and can promptly grasp regulatory dynamics and review focuses, helping clients effectively address financial challenges in the listing process, enhance investor confidence, and achieve successful listings.`;
                                            } else if (lang === 'zh-CN') {
                                                paragraph.innerHTML = `作为香港国际金融中心的核心优势，资本市场为企业提供了宝贵的融资机会。我们的IPO准备审计团队拥有丰富的上市经验，熟悉香港联交所(HKEX)的上市规则和监管要求，能够为拟上市企业提供一站式的审计与咨询服务。<br><br>我们的IPO审计不仅关注历史财务信息的准确性，更注重上市后持续合规的能力建设。从前期财务尽职调查、内控体系评估到上市申请文件的财务信息审核，我们提供全流程的专业支持，协助企业顺利通过保荐人、交易所及监管机构的各项审查。我们与香港资本市场各参与方保持密切合作，能够及时把握监管动态和审查重点，帮助客户有效应对上市过程中的财务挑战，增强投资者信心，实现成功上市。`;
                                            } else if (lang === 'zh-HK') {
                                                paragraph.innerHTML = `作為香港國際金融中心的核心優勢，資本市場為企業提供了寶貴的融資機會。我們的IPO準備審計團隊擁有豐富的上市經驗，熟悉香港聯交所(HKEX)的上市規則和監管要求，能夠為擬上市企業提供一站式的審計與諮詢服務。<br><br>我們的IPO審計不僅關注歷史財務信息的準確性，更注重上市後持續合規的能力建設。從前期財務盡職調查、內控體系評估到上市申請文件的財務信息審核，我們提供全流程的專業支持，協助企業順利通過保薦人、交易所及監管機構的各項審查。我們與香港資本市場各參與方保持密切合作，能夠及時把握監管動態和審查重點，幫助客戶有效應對上市過程中的財務挑戰，增強投資者信心，實現成功上市。`;
                                            }
                                            break;
                                    }
                                } else if (sectionId === 'tax') {
                                    switch(index) {
                                        case 0: // Corporate Income Tax Planning
                                            paragraph.innerHTML = `Our corporate income tax planning services are based on precise understanding of Hong Kong tax laws and international tax regulations, designed to create optimal tax structures for clients. As a low-tax jurisdiction, Hong Kong offers significant tax advantages. We assist businesses in fully utilizing various deductions and tax exemptions under Hong Kong's Inland Revenue Ordinance, strategically timing income recognition and expense deductions, and optimizing transfer pricing for intra-group transactions.<br><br>We pay special attention to the recent coordination between Hong Kong, mainland China, and international tax regulations, helping enterprises achieve tax optimization through scientific tax planning while ensuring compliance, thereby enhancing overall profitability and cash flow.`;
                                            break;
                                        case 1: // Cross-border Tax Planning
                                            paragraph.innerHTML = `As a bridge connecting mainland China with international markets, Hong Kong possesses unique advantages in cross-border tax planning. Our team is well-versed in nearly 40 comprehensive double taxation agreements signed by Hong Kong and can design efficient tax structures for multinational corporations. We help clients optimize their cross-border investment routes, trading models, and intellectual property arrangements, while reasonably applying transfer pricing strategies to ensure compliance with international tax rules such as the BEPS Action Plan.<br><br>Through our close collaboration with the Hong Kong Inland Revenue Department and international tax advisors, we can provide clients with the latest cross-border tax solutions, reducing tax costs and compliance risks in international business operations.`;
                                            break;
                                        case 2: // Personal Tax Advisory
                                            paragraph.innerHTML = `As an important financial center in the Asia-Pacific region, Hong Kong attracts numerous high-net-worth individuals and corporate executives. Our personal tax team is familiar with Hong Kong tax regulations and international personal tax arrangements, providing comprehensive personal tax planning services. Our services cover Hong Kong salaries tax optimization, personal offshore structure design, asset inheritance planning, and tax advisory for Hong Kong investment immigration.<br><br>For expatriates and mainland executives working in Hong Kong, we pay special attention to the tax implications of different residency statuses, helping design reasonable salary structures and benefit plans to legally optimize personal tax burdens while ensuring global tax compliance.`;
                                            break;
                                        case 3: // Tax Compliance Services
                                            paragraph.innerHTML = `In the context of increasing global tax transparency, Hong Kong's tax compliance requirements are becoming increasingly stringent. Our tax compliance team keeps up with the latest policies from the Hong Kong Inland Revenue Department, providing professional tax filing and compliance services for businesses. From profits tax, salaries tax to stamp duty filing, we ensure clients fulfill their tax obligations in a timely and accurate manner.<br><br>We regularly conduct "tax health checks" for clients, assessing potential tax risks and preventing tax disputes. When clients face inquiries from the tax authorities or tax audits, we provide professional support, assisting in preparing relevant documents and explanations to maximize the protection of client rights, reduce tax risks, and potential penalties.`;
                                            break;
                                    }
                                } else if (sectionId === 'consulting') {
                                    switch(index) {
                                        case 0: // Corporate Structure Planning
                                            paragraph.innerHTML = `Hong Kong, as a major business center in Asia, offers flexible and diverse corporate structure options. Our professional team is familiar with Hong Kong company regulations and various forms of business entities, designing optimal corporate and legal structures for clients. We consider business nature, industry characteristics, tax benefits, and regulatory requirements to help clients plan group structures, shareholding arrangements, and business separation schemes.<br><br>For mainland companies implementing "going global" strategies and international enterprises entering the Asian market, we particularly focus on Hong Kong's advantages as a regional headquarters and investment financing platform, helping clients reduce operational costs, enhance management efficiency, and increase corporate value through reasonable corporate structure planning.`;
                                            break;
                                        case 1: // Business Plan Writing
                                            paragraph.innerHTML = `In Hong Kong's competitive business environment, a professional business plan is crucial for enterprise financing and business expansion. Our team combines deep insights into Hong Kong and Asia-Pacific markets to customize persuasive business plans for clients. From market analysis, competitive landscape, and financial forecasts to risk assessment, we comprehensively showcase project value and business potential, emphasizing Hong Kong's unique market opportunities and competitive advantages.<br><br>We particularly excel at writing business plans for startups, technological innovation projects, and cross-border businesses, helping clients secure angel investment, venture capital, or bank loans to accelerate business growth and market expansion.`;
                                            break;
                                        case 2: // Financial Management Optimization
                                            paragraph.innerHTML = `Our financial management optimization services use the high standards of Hong Kong as an international financial center as a benchmark to help enterprises build sound financial management systems. Our professional team is familiar with Hong Kong Financial Reporting Standards and International Accounting Standards, capable of designing financial reporting frameworks that comply with regulatory requirements and business characteristics.<br><br>We assist clients in optimizing financial processes, implementing advanced financial management systems, and establishing scientific budgeting and cost control mechanisms. For listed companies in Hong Kong and multinational enterprises, we particularly focus on financial compliance and information transparency, enhancing financial team capabilities through professional training and process improvements to ensure financial management meets both Hong Kong regulatory requirements and supports enterprise strategic decisions.`;
                                            break;
                                        case 3: // Business Process Restructuring
                                            paragraph.innerHTML = `In Hong Kong's efficiency-focused business environment, optimizing business processes is key to maintaining competitiveness. Our business process restructuring services start from the actual operational environment of Hong Kong enterprises, combining international best practices to provide systematic process optimization solutions for clients. We use advanced process analysis tools to identify efficiency bottlenecks and improvement opportunities, redesigning key business processes.<br><br>For multinational corporations establishing regional headquarters in Hong Kong, we particularly focus on cross-border process coordination and localization adjustments, ensuring processes both conform to Hong Kong's business culture and regulatory environment while maintaining consistency with global standards, helping clients achieve operational efficiency improvements and cost-effective control.`;
                                            break;
                                    }
                                } else if (sectionId === 'risk') {
                                    switch(index) {
                                        case 0: // Enterprise Risk Assessment
                                            paragraph.innerHTML = `In Hong Kong, an international financial center, enterprises face increasingly complex risk environments. Our risk assessment team employs globally leading risk assessment methodologies combined with deep understanding of Hong Kong markets and regulatory environments to provide comprehensive risk identification and assessment services for clients. We systematically analyze various risks including strategic, financial, operational, and compliance risks, establishing scientific risk rating systems and creating intuitive risk heat maps.<br><br>For the regulatory characteristics and industry risks specific to the Hong Kong Special Administrative Region, we provide targeted risk response strategies for clients, helping management and boards comprehensively understand risk situations and providing reliable foundations for strategic decisions and resource allocation.`;
                                            break;
                                        case 1: // Internal Control System Design
                                            if (lang === 'en') {
                                                paragraph.innerHTML = `Our internal control system design services are based on the international COSO framework, combined with the regulatory requirements and business practices of the Hong Kong Special Administrative Region, to customize internal control systems for enterprises. Our professional team is familiar with the internal control requirements of regulatory bodies such as the Hong Kong Stock Exchange and Securities and Futures Commission, capable of designing internal control frameworks that both meet regulatory standards and have practical operability.<br><br>We assist clients in identifying key control points, designing effective control activities, and preparing professional internal control manuals and operational guidelines. For Hong Kong listed companies and regulated institutions, we particularly emphasize the integration of internal controls with corporate governance, ensuring the internal control system can both prevent risks and support business development and value creation.`;
                                            } else if (lang === 'zh-CN') {
                                                paragraph.innerHTML = `我们的内部控制系统设计服务基于国际COSO框架，结合香港特别行政区的监管要求和商业实践，为企业量身定制内部控制体系。我们的专业团队熟悉香港交易所、证券及期货事务监察委员会等监管机构的内控要求，能够设计既符合监管标准又具有实际操作性的内控框架。<br><br>我们协助客户识别关键控制点，设计有效的控制活动，并编制专业的内控手册和操作指引。对于香港上市公司和受监管机构，我们特别强调内部控制与公司治理的融合，确保内控体系既能防范风险，又能支持业务发展和价值创造。`;
                                            } else if (lang === 'zh-HK') {
                                                paragraph.innerHTML = `我們的內部控制系統設計服務基於國際COSO框架，結合香港特別行政區的監管要求和商業實踐，為企業量身定制內部控制體系。我們的專業團隊熟悉香港交易所、證券及期貨事務監察委員會等監管機構的內控要求，能夠設計既符合監管標準又具有實際操作性的內控框架。<br><br>我們協助客戶識別關鍵控制點，設計有效的控制活動，並編制專業的內控手冊和操作指引。對於香港上市公司和受監管機構，我們特別強調內部控制與公司治理的融合，確保內控體系既能防範風險，又能支持業務發展和價值創造。`;
                                            }
                                            break;
                                        case 2: // Compliance Consulting
                                            paragraph.innerHTML = `As an international financial center, Hong Kong has a sound and strict regulatory system. Our compliance consulting team is well-versed in the regulatory requirements across various industries in Hong Kong, from securities, banking, and insurance to data privacy and anti-money laundering, providing comprehensive compliance support for clients. We closely monitor Hong Kong regulatory dynamics, helping clients identify compliance risks in a timely manner and establish effective compliance management systems.<br><br>We provide professional compliance training for clients to enhance employee compliance awareness, conduct regular compliance reviews to ensure business operations meet regulatory requirements. For mainland companies and international corporations entering the Hong Kong market, we particularly focus on cross-border compliance challenges, providing practical solutions to reduce compliance risks and potential penalties.`;
                                            break;
                                        case 3: // Crisis Management
                                            paragraph.innerHTML = `In Hong Kong's highly transparent business environment, effective crisis management is crucial for corporate reputation and business continuity. Our crisis management team combines international best practices with Hong Kong's special cultural and media environment to customize crisis prevention and response solutions for clients. We assist clients in identifying potential crisis events, developing detailed crisis response plans, and establishing efficient crisis communication mechanisms.<br><br>We regularly organize crisis drills to enhance team response capabilities. When crises occur, we provide professional support to assist clients in managing media relations and protecting corporate reputation. For the Hong Kong market, we particularly focus on social media crises and reputational risks, helping clients respond quickly and effectively to challenges and achieve post-crisis business recovery.`;
                                            break;
                                    }
                                } else {
                                    // Default English placeholder for other sections
                                    paragraph.innerHTML = `This is the English version of this service description. In a production environment, 
                                    this would contain a proper translation of the original Chinese content, maintaining all 
                                    the details and professional terminology.<br><br>The second paragraph would continue with 
                                    additional information about this specific service, explaining the benefits and approach.`;
                                }
                            } else if (lang === 'zh-HK') {
                                // Convert simplified to traditional (basic implementation)
                                // For real implementation, you would have proper translations
                                let content = paragraph.innerHTML;
                                content = content.replace(/简体/g, '簡體')
                                               .replace(/专业/g, '專業')
                                               .replace(/为/g, '為')
                                               .replace(/规划/g, '規劃')
                                               .replace(/发展/g, '發展')
                                               .replace(/风险/g, '風險')
                                               .replace(/服务/g, '服務')
                                               .replace(/财务/g, '財務')
                                               .replace(/项目/g, '項目')
                                               .replace(/实现/g, '實現')
                                               .replace(/统一/g, '統一')
                                               .replace(/经验/g, '經驗')
                                               .replace(/团队/g, '團隊')
                                               .replace(/业务/g, '業務')
                                               .replace(/资产/g, '資產')
                                               .replace(/设计/g, '設計')
                                               .replace(/优化/g, '優化')
                                               .replace(/对/g, '對')
                                               .replace(/验证/g, '驗證')
                                               .replace(/关键/g, '關鍵')
                                               .replace(/务/g, '務')
                                               .replace(/价值/g, '價值')
                                               .replace(/责任/g, '責任')
                                               .replace(/报告/g, '報告')
                                               .replace(/标准/g, '標準')
                                               .replace(/运营/g, '運營')
                                               .replace(/访问/g, '訪問')
                                               .replace(/评估/g, '評估')
                                               .replace(/协助/g, '協助')
                                               .replace(/证据/g, '證據')
                                               .replace(/预防/g, '預防')
                                               .replace(/确保/g, '確保')
                                               .replace(/监管/g, '監管')
                                               .replace(/企业/g, '企業')
                                               .replace(/帮助/g, '幫助')
                                               .replace(/选择/g, '選擇')
                                               .replace(/体现/g, '體現')
                                               .replace(/观/g, '觀')
                                               .replace(/综合/g, '綜合')
                                               .replace(/风/g, '風')
                                               .replace(/执行/g, '執行')
                                               .replace(/现代/g, '現代')
                                               .replace(/传统/g, '傳統')
                                               .replace(/调整/g, '調整')
                                               .replace(/资质/g, '資質')
                                               .replace(/专注/g, '專注')
                                               .replace(/编制/g, '編制')
                                               .replace(/账务/g, '賬務')
                                               .replace(/审计/g, '審計')
                                               .replace(/鉴证/g, '鑒證')
                                               .replace(/咨询/g, '諮詢')
                                               .replace(/税务/g, '稅務')
                                               .replace(/沟通/g, '溝通')
                                               .replace(/个人/g, '個人')
                                               .replace(/预测/g, '預測');
                                paragraph.innerHTML = content;
                            }
                        });
                    }
                }
            });
        }
    }
    
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Submenu Toggle for Mobile
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        // Create toggle element for mobile view
        const submenuToggle = document.createElement('span');
        submenuToggle.className = 'submenu-toggle';
        item.appendChild(submenuToggle);
        
        // Handle toggle click
        submenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const parent = this.parentElement;
            parent.classList.toggle('show-submenu');
        });
    });
    
    // Language Switcher Toggle
    const langSwitcher = document.querySelector('.current-lang');
    const langDropdown = document.querySelector('.lang-dropdown');
    
    if (langSwitcher) {
        langSwitcher.addEventListener('click', function() {
            langDropdown.classList.toggle('show');
        });
        
        // Close language dropdown when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.language-switcher')) {
                langDropdown.classList.remove('show');
            }
        });
    }
    
    // Header Scroll Effect
    const siteHeader = document.getElementById('site-header');
    
    if (siteHeader) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    }
    
    // Hero Carousel Initialization (if exists)
    const swiperElement = document.querySelector('.swiper');
    
    if (swiperElement && typeof Swiper !== 'undefined') {
        const heroSwiper = new Swiper('.swiper', {
            slidesPerView: 1,
            speed: 1000,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
    
    // Service Cards Toggle
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const serviceCard = this.closest('.service-card');
            serviceCard.classList.toggle('show-details');
            
            // Change text
            if (serviceCard.classList.contains('show-details')) {
                this.textContent = window.getTranslation('collapse', currentLang);
            } else {
                this.textContent = window.getTranslation('learn_more', currentLang);
            }
        });
    });
    
    // Service Tabs (for services.html)
    const tabLinks = document.querySelectorAll('.tab-link');
    
    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all tabs
            tabLinks.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Scroll to the target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = siteHeader.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation & Submission
    const contactForm = document.querySelector('.contact-form');
    const successMessage = document.querySelector('.form-success-message');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic Form Validation
            const requiredFields = contactForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // If email field exists, validate email format
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            // Form submission (in a real project, you would send data to server here)
            if (isValid) {
                // Simulate form submission with a delay
                contactForm.classList.add('submitting');
                
                setTimeout(() => {
                    contactForm.classList.remove('submitting');
                    contactForm.style.display = 'none';
                    
                    if (successMessage) {
                        successMessage.style.display = 'block';
                    }
                    
                    // Reset form
                    contactForm.reset();
                }, 1500);
            }
        });
        
        // Clear error state on input
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
            });
        });
    }
    
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.tab-link)');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const headerHeight = siteHeader.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Initialize Service Circles
    initServiceCircles();
});

// Service Circles Highlighting
function initServiceCircles() {
    const serviceCircles = document.querySelectorAll('.circle-link');
    if (serviceCircles.length === 0) return;
    
    // Highlight initial circle based on URL hash
    const hash = window.location.hash;
    if (hash) {
        serviceCircles.forEach(circle => {
            if (circle.getAttribute('href') === hash) {
                circle.querySelector('.circle-icon').style.borderColor = 'var(--primary-color)';
                circle.querySelector('.circle-icon').style.backgroundColor = 'rgba(26, 62, 111, 0.05)';
                circle.querySelector('h3').style.color = 'var(--accent-color)';
            }
        });
    } else {
        // If no hash, highlight the first one
        const firstCircle = serviceCircles[0];
        firstCircle.querySelector('.circle-icon').style.borderColor = 'var(--primary-color)';
        firstCircle.querySelector('.circle-icon').style.backgroundColor = 'rgba(26, 62, 111, 0.05)';
        firstCircle.querySelector('h3').style.color = 'var(--accent-color)';
    }
    
    // Add scroll event to highlight the current section
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.service-section');
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (currentSectionId) {
            serviceCircles.forEach(circle => {
                // Reset all
                circle.querySelector('.circle-icon').style.borderColor = 'transparent';
                circle.querySelector('.circle-icon').style.backgroundColor = 'var(--white)';
                circle.querySelector('h3').style.color = 'var(--primary-color)';
                
                // Highlight current
                if (circle.getAttribute('href') === `#${currentSectionId}`) {
                    circle.querySelector('.circle-icon').style.borderColor = 'var(--primary-color)';
                    circle.querySelector('.circle-icon').style.backgroundColor = 'rgba(26, 62, 111, 0.05)';
                    circle.querySelector('h3').style.color = 'var(--accent-color)';
                }
            });
        }
    });
    
    // Add smooth scrolling for service circles
    serviceCircles.forEach(circle => {
        circle.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(circle.getAttribute('href'));
            if (!target) return;
            
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Update URL hash without scrolling
            history.pushState(null, null, circle.getAttribute('href'));
        });
    });
}
