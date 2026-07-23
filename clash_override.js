/***
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * 基于二开: https://github.com/dahaha-365/YaNet/
 */

/**
 * 整个脚本的总开关，在Mihomo Party使用的话，请保持为true
 * true = 启用
 * false = 禁用
 */
const enable = true

/**
 * urltest自动选择开关
 * true = 使用urltest自动选择最低延迟节点
 * false = 使用select手动选择节点
 */
const enableUrltest = true

/**
 * DNS覆写总开关
 * true = 启用
 * false = 禁用
 */
const enableDnsOverride = true

// ===== 性能优化：预编译正则表达式 =====
const RATIO_REGEX = /[xX✕✖⨉倍率](\d+(?:\.\d+)?)[xX✕✖⨉倍率]?/i

/**
 * 分流规则配置，会自动生成对应的策略组
 * 设置的时候可遵循“最小，可用”原则，把自己不需要的规则全禁用掉，提高效率
 * true = 启用
 * false = 禁用
 */
const ruleOptions = {
    apple: false, // 苹果服务
    microsoft: true, // 微软服务
    github: true, // Github服务
    google: true, // Google服务
    openai: true, // 国外AI和GPT
    spotify: false, // Spotify
    youtube: true, // YouTube
    bahamut: false, // 巴哈姆特/动画疯
    netflix: false, // Netflix网飞
    tiktok: false, // 国际版抖音
    disney: false, // 迪士尼
    pixiv: true, // Pixiv
    hbo: false, // HBO
    biliintl: false, // 哔哩哔哩东南亚
    tvb: false, // TVB
    hulu: false, // Hulu
    primevideo: false, // 亚马逊prime video
    telegram: false, // Telegram通讯软件
    line: false, // Line通讯软件
    whatsapp: false, // Whatsapp
    games: true, // 游戏策略组
    japan: true, // 日本网站策略组
    tracker: true, // 网络分析和跟踪服务
    ads: true, // 常见的网络广告
}

/**
 * 地区配置，通过regex匹配代理节点名称
 * regex会有一定概率误判，自己调整一下吧
 * excludeHighPercentage是排除高倍率节点的开关，只对地区分组有效
 * 倍率大于regions里的ratioLimit值的代理节点会被排除
 */
const regionOptions = {
    excludeHighPercentage: true,
    autoDetect: true,
    defaultIcon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
    regions: [
        {
            name: 'US美国',
            regex: /美|🇺🇸|us|USA|usa|US|united state|UNITED STATE|america|America|AMERICA/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png',
        },
        {
            name: 'JP日本',
            regex: /日|日本|JP|Jp|🇯🇵|jp|japan|JAPAN|iij/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png',
        },
        {
            name: 'KR韩国',
            regex: /韩|韩国|kr|KR|korea|KOREA/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png',
        },
        {
            name: 'SG新加坡',
            regex: /新加坡|🇸🇬|sg|SG|singapore|SINGAPORE/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png',
        },
        {
            name: 'HK香港',
            regex: /港|香港|HONG KONG|HONGKONG|hk|HK|hongkong|hong kong/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png',
        },
        {
            name: 'CN中国大陆',
            regex: /中国|🇨🇳|cn|CN|china|CHINA/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China_Map.png',
        },
        {
            name: 'TW台湾省',
            regex: /台湾|🇹🇼|tw|TW|taiwan|tai wan|TAIWAN|TAI WAN/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png',
        },
        {
            name: 'GB英国',
            regex: /英|uk|UK|united kingdom|great britain/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png',
        },
        {
            name: 'DE德国',
            regex: /德国|de|DE|germany/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png',
        },
        {
            name: 'MY马来西亚',
            regex: /马来|my|MY|malaysia/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Malaysia.png',
        },
        {
            name: 'TK土耳其',
            regex: /土耳其|tk|TK|tr|TR|turkey/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png',
        },
        {
            name: 'CA加拿大',
            regex: /加拿大|🇨🇦|ca|CA|canada|CANADA|CAN/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Canada.png',
        },
        {
            name: 'FR法国',
            regex: /法|法国|fr|FR|france|FRANCE|FRA/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/France.png',
        },
        {
            name: 'GR希腊',
            regex: /希|希腊|gr|GR|greece|GREECE|GRC/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Greece.png',
        },
        {
            name: 'LT立陶宛',
            regex: /立陶宛|lt|LT|lithuania|LITHUANIA|LTU/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Lithuania.png',
        },
        {
            name: 'MK北马其顿',
            regex: /北马其顿|马其顿|mk|MK|macedonia|MACEDONIA|MKD/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/North_Macedonia.png',
        },
        {
            name: 'NL荷兰',
            regex: /荷|荷兰|nl|NL|netherlands|NETHERLANDS|holland|HOLLAND|NLD/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netherlands.png',
        },
        {
            name: 'PL波兰',
            regex: /波|波兰|pl|PL|poland|POLAND|POL/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Poland.png',
        },
        {
            name: 'SE瑞典',
            regex: /瑞典|sweden|stockholm|🇸🇪/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Sweden.png',
        },
        {
            name: 'AR阿根廷',
            regex: /阿根廷|🇦🇷|argentina/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Argentina.png',
        },
    ],
}

/**
 * 其实两组DNS就够了，一组国内，一组国外
 * defaultDNS是用来解析DNS的，必须为IP
 * DNS最好不要超过两个，从业界某知名APP的文档里学的
 */
const defaultDNS = ["tls://1.12.12.12", "tls://223.5.5.5"]

const chinaDNS = [
        '223.6.6.6',
        '119.29.29.29',                    // Tencent Dnspod
        '223.5.5.5',                       // Ali DNS
        '1.12.12.12',                      // China Telecom
        "114.114.114.114"
        ]

const foreignDNS = ['https://120.53.53.53/dns-query', 'https://223.5.5.5/dns-query']

// 公司内网 DNS：用于解析 want-want.com 内部域名
const corporateDNS = ['10.0.0.67', '10.0.0.68']

/**
 * DNS相关配置
 * true = 启用
 * false = 禁用
 */
const dnsConfig = {
    enable: true,
    listen: ':1053',
    ipv6: true,
    'prefer-h3': true,
    'use-hosts': true,
    'use-system-hosts': true,
    'respect-rules': true,
    'direct-nameserver': ['system'],
    'direct-nameserver-follow-policy': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': [
        '*',
        '+.lan',
        '+.local',
        '+.want-want.com',
        '+.market.xiaomi.com',
    ],
    nameserver: [...foreignDNS],
    'proxy-server-nameserver': [...foreignDNS],
    /**
     * 这里对域名解析进行分流
     * 由于默认dns是国外的了，只需要把国内ip和域名分流到国内dns
     */
    'nameserver-policy': {
        'geosite:private': 'system',
        'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
        '+.want-want.com': corporateDNS,
        '+.local': ['system'],
    },
}

// 规则集通用配置
const ruleProviderCommon = {
    type: 'http',
    format: 'yaml',
    interval: 86400,
}

// 代理组通用配置
const groupBaseOption = {
    interval: 300,
    timeout: 3000,
    url: 'http://cp.cloudflare.com/generate_204',
    lazy: true,
    'max-failed-times': 3,
    hidden: false,
}

// 规则模式和各选择器中的策略组优先展示顺序。
// 地区组会动态插入到最前面，服务组按此顺序跟随其后。
const priorityServiceGroupNames = [
    '国外AI',
    'YouTube',
    'Pixiv',
    '游戏专用',
    '跟踪分析',
    '广告过滤',
    '谷歌服务',
    '微软服务',
    'Github',
    '日本网站',
    '下载软件',
    '其他外网',
]

const priorityCandidateContainerNames = new Set([
    'GLOBAL',
    'PROXY',
    '全部节点',
    '默认节点',
])

// 代理提供商中常见的流量、到期、订阅信息节点不加入策略组
const nodeExcludeFilter =
    '(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置'



// ===== 自动识别国家映射与工具 =====
const CODE_TO_REGION = {
  US: { name: 'US美国', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png' },
  HK: { name: 'HK香港', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png' },
  JP: { name: 'JP日本', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png' },
  KR: { name: 'KR韩国', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png' },
  SG: { name: 'SG新加坡', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png' },
  CN: { name: 'CN中国大陆', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China_Map.png' },
  TW: { name: 'TW台湾省', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png' },
  GB: { name: 'GB英国', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png' },
  DE: { name: 'DE德国', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png' },
  MY: { name: 'MY马来西亚', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Malaysia.png' },
  TR: { name: 'TK土耳其', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png' },
  CA: { name: 'CA加拿大', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Canada.png' },
  FR: { name: 'FR法国', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/France.png' },
  GR: { name: 'GR希腊', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Greece.png' },
  LT: { name: 'LT立陶宛', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Lithuania.png' },
  MK: { name: 'MK北马其顿', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/North_Macedonia.png' },
  NL: { name: 'NL荷兰', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netherlands.png' },
  PL: { name: 'PL波兰', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Poland.png' },
  SE: { name: 'SE瑞典', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Sweden.png' },
  AR: { name: 'AR阿根廷', icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Argentina.png' },
};

const FLAG_TO_CODE = {};

const ZH_TO_CODE = {
  '美国': 'US', '香港': 'HK', '日本': 'JP', '韩国': 'KR', '新加坡': 'SG', '中国': 'CN', '台湾': 'TW',
  '英国': 'GB', '德国': 'DE', '马来': 'MY', '土耳其': 'TR', '加拿大': 'CA', '法国': 'FR', '希腊': 'GR',
  '立陶宛': 'LT', '北马其顿': 'MK', '马其顿': 'MK', '荷兰': 'NL', '波兰': 'PL', '瑞典': 'SE', '阿根廷': 'AR'
};

const CODE_TOKENS = {
  USA: 'US', US: 'US', CAN: 'CA', DEU: 'DE', DE: 'DE', FRA: 'FR', FR: 'FR', GBR: 'GB', UK: 'GB', GB: 'GB',
  GRC: 'GR', GR: 'GR', LTU: 'LT', LT: 'LT', MKD: 'MK', MK: 'MK', NLD: 'NL', NL: 'NL', POL: 'PL', PL: 'PL',
  SWE: 'SE', SE: 'SE', HKG: 'HK', HK: 'HK', JPN: 'JP', JP: 'JP', SGP: 'SG', SG: 'SG', TWN: 'TW', TW: 'TW',
  CHN: 'CN', CN: 'CN', KOR: 'KR', KR: 'KR', TUR: 'TR', TR: 'TR', MYS: 'MY', MY: 'MY', ARG: 'AR', AR: 'AR', ARGENTINA: 'AR'
};

// ===== 性能优化：预编译国家代码正则 =====
const CODE_TOKEN_REGEXES = Object.keys(CODE_TOKENS)
  .sort((a, b) => b.length - a.length)
  .map(tk => ({ regex: new RegExp(`(?:^|[^A-Z])${tk}(?:[^A-Z]|$)`), code: CODE_TOKENS[tk] }));

function detectCountryCode(name) {
  // FLAG_TO_CODE 为空，跳过
  // for (const [flag, code] of Object.entries(FLAG_TO_CODE)) {
  //   if (name.includes(flag)) return code;
  // }

  // 优化：使用 for...of 代替 Object.entries，减少迭代开销
  for (const zh in ZH_TO_CODE) {
    if (name.includes(zh)) return ZH_TO_CODE[zh];
  }

  const upper = name.toUpperCase();
  // 使用预编译的正则表达式
  for (const { regex, code } of CODE_TOKEN_REGEXES) {
    if (regex.test(upper)) return code;
  }
  return null;
}
// ===== End 自动识别工具 =====
//
// 自定义规则集配置 - 统一管理 RULE-SET 和对应的 rule-providers
// 添加新的规则集时，只需要在这里配置一次即可
//
const customRuleSets = {
    // 下载软件应用规则集
    applications: {
        behavior: 'classical',
        format: 'text',
        url: 'https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@clash-ruleset/applications.list',
        path: './ruleset/DustinWin/applications.list',
    },

    // AI 服务细分规则
    bing: {
        behavior: 'classical',
        format: 'yaml',
        url: 'https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Bing/Bing.yaml',
        path: './ruleset/blackmatrix7/bing.yaml',
    },
    copilot: {
        behavior: 'classical',
        format: 'yaml',
        url: 'https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Copilot/Copilot.yaml',
        path: './ruleset/blackmatrix7/copilot.yaml',
    },
    claude: {
        behavior: 'classical',
        format: 'yaml',
        url: 'https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Claude/Claude.yaml',
        path: './ruleset/blackmatrix7/claude.yaml',
    },
    bard: {
        behavior: 'classical',
        format: 'yaml',
        url: 'https://testingcf.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BardAI/BardAI.yaml',
        path: './ruleset/blackmatrix7/bard.yaml',
    },

    // 示例：可以添加更多自定义规则集
    // customGaming: {
    //     behavior: 'classical',
    //     format: 'text',
    //     url: 'https://example.com/gaming.list',
    //     path: './ruleset/custom/gaming.list',
    // }
}

/**
 * 初始化规则提供者
 */
const ruleProviders = new Map()

// 自动注册自定义规则集
Object.entries(customRuleSets).forEach(([name, config]) => {
    ruleProviders.set(name, {
        ...ruleProviderCommon,
        ...config
    })
})

// 规则列表
/**
 * 自定义规则配置 - 分类管理，便于维护
 * 只需要在对应的数组中添加域名或关键词即可
 *
 * 使用说明：
 * 1. 添加新的策略组：在 customRules 中添加新的对象
 * 2. 添加域名规则：在对应策略的 domainSuffix 数组中添加
 * 3. 添加关键词规则：在对应策略的 domainKeyword 数组中添加
 * 4. 添加精确域名：在对应策略的 domain 数组中添加
 * 5. 添加进程规则：在对应策略的 processName 数组中添加
 * 6. 添加规则集：在对应策略的 ruleSets 数组中添加
 */
const customRules = {
    // 直连规则 - 不走代理的网站和应用
    direct: {
        target: 'DIRECT',
        domainSuffix: ['warframe.com', 'prlrr.com', 'g5air.com', 'qslk.net', 'darensoft.com'],
        domainKeyword: ['audiences', 'rlzy' , 'rsxt', 'g5air', 'sharepoint.com'],
        domain: [],
        processName: ['SunloginClient', 'SunloginClient.exe', 'AnyDesk', 'AnyDesk.exe'],
        ruleSets: [] // 规则集，格式：['规则集名称']
    },

    // 默认节点规则 - 走默认代理的网站
    defaultProxy: {
        target: '默认节点',
        domainSuffix: ['augmentcode.com', 'javdb.com', 'jdbstatic.com'],
        domainKeyword: ['postman', 'stripchat', 'qbittorrent'],
        domain: [],
        processName: ['Windsurf.exe'],
        ruleSets: []
    },

    // 下载软件规则 - 专门的下载工具
    downloadApps: {
        target: '下载软件',
        domainSuffix: [],
        domainKeyword: [],
        domain: [],
        ruleSets: ['applications'] // 使用 applications 规则集
    },

    // 日本网站规则 - 专门走日本节点的网站
    japanSites: {
        target: '日本网站',
        domainSuffix: ['mgstage.com', 'dmm.co.jp'],
        domainKeyword: ['dmm.com', 'seesaawiki', 'mgstage'],
        domain: ['dmm.co.jp'],
        ruleSets: [] // 注意：日本网站的 RULE-SET 在 ruleOptions.japan 中处理
    },

    // 示例：美国网站规则（可以根据需要启用）
    // usSites: {
    //     target: 'US美国',
    //     domainSuffix: ['hulu.com', 'netflix.com'],
    //     domainKeyword: ['disney'],
    //     domain: [],
    //     ruleSets: []
    // },

    // 示例：游戏相关规则（可以根据需要启用）
    // gamingSites: {
    //     target: '游戏专用',
    //     domainSuffix: ['steam.com', 'epicgames.com'],
    //     domainKeyword: ['gaming'],
    //     domain: [],
    //     ruleSets: []
    // }
}

/**
 * 生成规则数组的函数 - 通用化处理
 */
function generateCustomRules() {
    const rules = []

    // 遍历所有自定义规则配置
    Object.values(customRules).forEach(ruleConfig => {
        const target = ruleConfig.target

        // 生成 DOMAIN-SUFFIX 规则
        if (ruleConfig.domainSuffix) {
            ruleConfig.domainSuffix.forEach(domain => {
                rules.push(`DOMAIN-SUFFIX,${domain},${target}`)
            })
        }

        // 生成 DOMAIN-KEYWORD 规则
        if (ruleConfig.domainKeyword) {
            ruleConfig.domainKeyword.forEach(keyword => {
                rules.push(`DOMAIN-KEYWORD,${keyword},${target}`)
            })
        }

        // 生成 DOMAIN 规则
        if (ruleConfig.domain) {
            ruleConfig.domain.forEach(domain => {
                rules.push(`DOMAIN,${domain},${target}`)
            })
        }

        // 生成 PROCESS-NAME 规则
        if (ruleConfig.processName) {
            ruleConfig.processName.forEach(process => {
                rules.push(`PROCESS-NAME,${process},${target}`)
            })
        }

        // 生成 RULE-SET 规则
        if (ruleConfig.ruleSets) {
            ruleConfig.ruleSets.forEach(ruleSetName => {
                rules.push(`RULE-SET,${ruleSetName},${target}`)
            })
        }
    })

    return rules
}

// 将地区组和指定服务组前置，保留其他策略组的原有相对顺序。
function reorderProxyGroups(proxyGroups, regionGroupNames) {
    const priorityNames = [
        '全部节点',
        ...regionGroupNames,
        ...priorityServiceGroupNames,
    ]
    const remaining = [...proxyGroups]
    const priorityGroups = []

    for (const name of priorityNames) {
        const index = remaining.findIndex(group => group.name === name)
        if (index === -1) continue

        priorityGroups.push(remaining[index])
        remaining.splice(index, 1)
    }

    return [...priorityGroups, ...remaining]
}

// 将现有地区组放到指定选择器显式候选列表的最前面。
// 普通节点继续由 include-all 自动补充，保持和 override-hub 的策略组结构一致。
function prependRegionCandidates(proxyGroups, regionGroupNames, allNodeNames) {
    const availableGroupNames = new Set(proxyGroups.map(group => group.name))
    const availableRegionNames = regionGroupNames.filter(name =>
        availableGroupNames.has(name)
    )

    if (availableRegionNames.length === 0) return proxyGroups

    return proxyGroups.map(group => {
        if (!priorityCandidateContainerNames.has(group.name)) {
            return group
        }

        const existingProxies = Array.isArray(group.proxies)
            ? group.proxies
            : []
        const shouldUseIncludeAll =
            group['include-all'] === true ||
            ['GLOBAL', 'PROXY', '全部节点'].includes(group.name)
        const configuredNodeNames = new Set(allNodeNames)
        const retainedExplicitProxies = shouldUseIncludeAll
            ? existingProxies.filter(name => !configuredNodeNames.has(name))
            : existingProxies
        const seen = new Set()
        const proxies = [
            ...availableRegionNames.filter(name => name !== group.name),
            ...retainedExplicitProxies,
        ].filter(name => {
            if (seen.has(name)) return false
            seen.add(name)
            return true
        })

        return {
            ...group,
            proxies,
            ...(shouldUseIncludeAll ? { 'include-all': true } : {}),
        }
    })
}

// 明确重建 GLOBAL/PROXY 选择器，兼容全局页对 GLOBAL 组的读取方式。
// 结构与 override-hub 一致：地区组是显式候选，普通节点由 include-all 追加。
function ensureGlobalSelectorGroups(proxyGroups, regionGroupNames, allNodeNames) {
    const availableGroupNames = new Set(proxyGroups.map(group => group.name))
    const availableRegionNames = regionGroupNames.filter(name =>
        availableGroupNames.has(name)
    )
    const configuredNodeNames = new Set(allNodeNames)
    const result = [...proxyGroups]

    for (const name of ['PROXY', 'GLOBAL']) {
        const index = result.findIndex(group => group.name === name)
        const existingGroup = index >= 0 ? result[index] : null
        const existingProxies = Array.isArray(existingGroup?.proxies)
            ? existingGroup.proxies
            : []
        const retainedExplicitProxies = existingProxies.filter(candidate =>
            !configuredNodeNames.has(candidate)
        )
        const seen = new Set()
        const proxies = [
            ...availableRegionNames,
            ...retainedExplicitProxies,
        ].filter(candidate => {
            if (seen.has(candidate)) return false
            seen.add(candidate)
            return true
        })
        const nextGroup = {
            ...(existingGroup || groupBaseOption),
            name,
            type: 'select',
            'include-all': true,
            'exclude-filter': nodeExcludeFilter,
            proxies,
        }

        if (index >= 0) {
            result[index] = nextGroup
        } else {
            result.push(nextGroup)
        }
    }

    return result
}

// 额外直连规则：放在最终规则数组最前面，确保优先于后续的分流规则和 MATCH
// 只要请求域名中包含连续字符串 want，就直连；例如 iww.want-want.com。
const wantDirectRule = 'DOMAIN-KEYWORD,want,DIRECT'

const additionalDirectRules = [
    'DOMAIN,wantdp-test.want-want.com,DIRECT',
    'DOMAIN,idpl.want-want.com,DIRECT',
    'DOMAIN,invite.linuxdo.org,DIRECT',
    wantDirectRule,
    'DOMAIN-SUFFIX,local,DIRECT',
    'IP-CIDR,127.0.0.0/8,DIRECT,no-resolve',
    'IP-CIDR,10.0.0.0/8,DIRECT,no-resolve',
    'IP-CIDR,172.16.0.0/12,DIRECT,no-resolve',
    'IP-CIDR,192.168.0.0/16,DIRECT,no-resolve',
    'IP-CIDR,169.254.0.0/16,DIRECT,no-resolve',
]

// 生成最终的规则数组
const rules = [...additionalDirectRules, ...generateCustomRules()]

// 程序入口
function main(config) {
    const proxyCount = config?.proxies?.length ?? 0
    const proxyProviderCount =
        typeof config?.['proxy-providers'] === 'object'
            ? Object.keys(config['proxy-providers']).length
            : 0
    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error('配置文件中未找到任何代理')
    }

    const configuredProxies = Array.isArray(config?.proxies)
        ? config.proxies
        : []

    // 保留订阅原有的 GLOBAL、PROXY 等策略组，后续只调整其候选项顺序。
    const originalProxyGroups = Array.isArray(config?.['proxy-groups'])
        ? config['proxy-groups'].map(group => ({
            ...group,
            ...(Array.isArray(group.proxies)
                ? { proxies: [...group.proxies] }
                : {}),
        }))
        : []

    let regionProxyGroups = []
    let otherProxyGroups = configuredProxies.map((b) => {
        return b.name
    })

    config['allow-lan'] = true

    config['bind-address'] = '*'

    config['mode'] = 'rule'

    // 覆盖原配置中DNS配置
    if (enableDnsOverride) {
        config['dns'] = dnsConfig
    }

    config['profile'] = {
        'store-selected': true,
        'store-fake-ip': true,
    }

    config['unified-delay'] = true

    config['tcp-concurrent'] = true

    /**
     * 这个值设置大点能省电，笔记本和手机需要关注一下
     */
    config['keep-alive-interval'] = 1800

    config['find-process-mode'] = 'strict'

    config['geodata-mode'] = true

    /**
     * 适合小内存环境，如果在旁路由里运行可以改成standard
     */
    config['geodata-loader'] = 'memconservative'

    config['geo-auto-update'] = true

    config['geo-update-interval'] = 24

    /**
     * 不开域名嗅探的话，日志里只会记录请求的ip，对查找问题不方便
     * override-destination默认值是true，但是个人建议全局设为false，否则某些应用会出现莫名其妙的问题
     * Mijia Cloud跳过是网上抄的
     */
    config['sniffer'] = {
        enable: true,
        'force-dns-mapping': true,
        'parse-pure-ip': false,
        'override-destination': true,
        sniff: {
            TLS: {
                ports: [443, 8443],
            },
            HTTP: {
                ports: [80, '8080-8880'],
            },
            QUIC: {
                ports: [443, 8443],
            },
        },
        'skip-src-address': [
            '127.0.0.0/8',
            '192.168.0.0/16',
            '10.0.0.0/8',
            '172.16.0.0/12',
        ],
        'force-domain': [
            '+.google.com',
            '+.googleapis.com',
            '+.googleusercontent.com',
            '+.youtube.com',
            '+.facebook.com',
            '+.messenger.com',
            '+.fbcdn.net',
            'fbcdn-a.akamaihd.net',
        ],
        'skip-domain': ['Mijia Cloud', '+.oray.com'],
    }

    /**
     * write-to-system如果设为true的话，有可能出现电脑时间不对的问题
     */
    config['ntp'] = {
        enable: true,
        'write-to-system': false,
        server: 'cn.ntp.org.cn',
    }

    config['geox-url'] = {
        geoip:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
        geosite:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
        mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
        asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
    }

    /**
     * 总开关关闭时不处理策略组
     */
    if (!enable) {
        return config
    }

    // ===== 性能优化：使用 Set 优化节点过滤 =====
    const usedProxies = new Set();

    regionOptions.regions.forEach((region) => {
        /**
         * 提取倍率符合要求的代理节点
         * 优化：使用预编译的正则，减少每次执行的开销
         */
        const proxies = [];

        for (const proxy of configuredProxies) {
            const name = proxy.name;

            // 先检查是否匹配地区
            if (!region.regex.test(name)) continue;

            // 再检查倍率（如果启用了排除高倍率）
            if (regionOptions.excludeHighPercentage) {
                const match = RATIO_REGEX.exec(name);
                const multiplier = match ? Number(match[1]) : 0;
                if (multiplier > region.ratioLimit) continue;
            }

            proxies.push(name);
            usedProxies.add(name);
        }

        /**
         * 必须再判断一下有没有符合要求的代理节点
         * 没有的话，这个策略组就不应该存在
         */
        // 有代理提供商时，即使 config.proxies 为空，也创建带 filter 的地区组
        if (proxies.length > 0 || proxyProviderCount > 0) {
            regionProxyGroups.push({
                ...groupBaseOption,
                name: region.name,
                type: enableUrltest ? 'url-test' : 'select',
                tolerance: enableUrltest ? 50 : undefined,
                icon: region.icon,
                'include-all': true,
                filter: `(?i)${region.regex.source}`,
                'exclude-filter': nodeExcludeFilter,
                proxies: proxies,
            })
        }
    })

    // 优化：使用 Set 一次性过滤，而不是多次 filter
    otherProxyGroups = otherProxyGroups.filter((x) => !usedProxies.has(x))

    // 动态国家识别与分组（对未匹配的节点自动建组）
    if (regionOptions.autoDetect) {
        // ===== 性能优化：使用 Map 优化查找性能 =====
        const existingGroupsMap = new Map(regionProxyGroups.map(g => [g.name, g]));
        const detected = new Map();
        const addedProxySet = new Set();

        for (const n of otherProxyGroups) {
            const code = detectCountryCode(n);
            if (!code) continue;

            const info = CODE_TO_REGION[code] || { name: code, icon: regionOptions.defaultIcon };
            const rname = info.name;

            // 优化：使用 Map.get 代替 find，O(1) vs O(n)
            const existingGroup = existingGroupsMap.get(rname);
            if (existingGroup) {
                // 优化：使用 Set 检查重复，避免 includes 的 O(n) 复杂度
                if (!existingGroup.proxies.includes(n)) {
                    existingGroup.proxies.push(n);
                    addedProxySet.add(n);
                }
            } else {
                if (!detected.has(rname)) {
                    detected.set(rname, { proxies: [], icon: info.icon });
                }
                detected.get(rname).proxies.push(n);
                addedProxySet.add(n);
            }
        }

        for (const [rname, data] of detected.entries()) {
            if (data.proxies.length === 0) continue;

            regionProxyGroups.push({
                ...groupBaseOption,
                name: rname,
                type: enableUrltest ? 'url-test' : 'select',
                tolerance: enableUrltest ? 50 : undefined,
                icon: data.icon,
                'include-all': true,
                'exclude-filter': nodeExcludeFilter,
                proxies: data.proxies,
            });
        }

        // 优化：只在有新增节点时才过滤
        if (addedProxySet.size > 0) {
            otherProxyGroups = otherProxyGroups.filter(x => !addedProxySet.has(x));
        }
    }
    // ===== 性能优化：简化 map 操作 =====
    const proxyGroupsRegionNames = regionProxyGroups.map(g => g.name);

    if (otherProxyGroups.length > 0) {
        proxyGroupsRegionNames.push('其他节点')
    }

    // ===== 全部节点：包含所有代理节点（不含地区过滤） =====
 const allNodeNames = configuredProxies.map((p) => p.name)
 const allNodeCandidates = [
     ...new Set([...proxyGroupsRegionNames, ...allNodeNames]),
 ]

 config['proxy-groups'] = [
 {
 ...groupBaseOption,
 name: '全部节点',
 type: 'url-test',
 tolerance: 50,
 'include-all': true,
 'exclude-filter': nodeExcludeFilter,
 proxies: allNodeCandidates,
 icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png',
 },
 {
 ...groupBaseOption,
 name: '默认节点',
 type: 'select',
 proxies: ['全部节点', ...proxyGroupsRegionNames, 'DIRECT'],
 icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
 },
 ]

    config.proxies = configuredProxies
    if (ruleOptions.openai) {
        rules.push(
            'DOMAIN-SUFFIX,grazie.ai,国外AI',
            'DOMAIN-SUFFIX,grazie.aws.intellij.net,国外AI',
            'RULE-SET,ai,国外AI',
            'RULE-SET,bing,国外AI',
            'RULE-SET,copilot,国外AI',
            'RULE-SET,claude,国外AI',
            'RULE-SET,bard,国外AI',
        )
        ruleProviders.set('ai', {
            ...ruleProviderCommon,
            behavior: 'classical',
            format: 'text',
            url: 'https://github.com/dahaha-365/YaNet/raw/refs/heads/dist/rulesets/mihomo/ai.list',
            path: './ruleset/YaNet/ai.list',
        })

        // ★ AI 节点顺序：美国优先，其次其他海外地区，最后才是 DIRECT
        // ★ 排除中国大陆和香港，避免 GPT 默认走这些地区
        const aiForeignRegions = proxyGroupsRegionNames.filter(
            name => !['US美国', 'CN中国大陆', 'HK香港', '其他节点'].includes(name)
        )
        const aiProxyRegions = [
            ...(proxyGroupsRegionNames.includes('US美国') ? ['US美国'] : []),
            ...aiForeignRegions,
            ...(proxyGroupsRegionNames.includes('其他节点') ? ['其他节点'] : []),
            'DIRECT',
        ]

        // ★ fallback 会按顺序探测：美国节点全部不可用后，再切换其他海外节点
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'AI默认节点',
            type: 'fallback',
            proxies: aiProxyRegions,
            url: 'https://chat.openai.com/cdn-cgi/trace',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '国外AI',
            type: 'select',
            proxies: ['AI默认节点', ...aiProxyRegions],
            url: 'https://chat.openai.com/cdn-cgi/trace',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
        })
    }

    if (ruleOptions.youtube) {
        rules.push('GEOSITE,youtube,YouTube')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'YouTube',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://www.youtube.com/s/desktop/494dd881/img/favicon.ico',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png',
        })
    }

    if (ruleOptions.biliintl) {
        rules.push('GEOSITE,biliintl,哔哩哔哩东南亚')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '哔哩哔哩东南亚',
            type: 'select',
            proxies: ['默认节点', 'DIRECT', ...proxyGroupsRegionNames],
            url: 'https://www.bilibili.tv/',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/bilibili_3.png',
        })
    }

    if (ruleOptions.bahamut) {
        rules.push('GEOSITE,bahamut,巴哈姆特')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '巴哈姆特',
            type: 'select',
            proxies: ['默认节点', 'DIRECT', ...proxyGroupsRegionNames],
            url: 'https://ani.gamer.com.tw/ajax/getdeviceid.php',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bahamut.png',
        })
    }

    if (ruleOptions.disney) {
        rules.push('GEOSITE,disney,Disney+')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Disney+',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://disney.api.edge.bamgrid.com/devices',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Disney+.png',
        })
    }

    if (ruleOptions.netflix) {
        rules.push('GEOSITE,netflix,NETFLIX')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'NETFLIX',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://api.fast.com/netflix/speedtest/v2?https=true',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png',
        })
    }

    if (ruleOptions.tiktok) {
        rules.push('GEOSITE,tiktok,Tiktok')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Tiktok',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://www.tiktok.com/',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TikTok.png',
        })
    }

    if (ruleOptions.spotify) {
        rules.push('GEOSITE,spotify,Spotify')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Spotify',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Spotify.png',
        })
    }

    if (ruleOptions.pixiv) {
        rules.push('GEOSITE,pixiv,Pixiv')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Pixiv',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://spclient.wg.spotify.com/signup/public/v1/account',
            icon: 'https://play-lh.googleusercontent.com/8pFuLOHF62ADcN0ISUAyEueA5G8IF49mX_6Az6pQNtokNVHxIVbS1L2NM62H-k02rLM=w240-h480-rw',
        })
    }

    if (ruleOptions.hbo) {
        rules.push('GEOSITE,hbo,HBO')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'HBO',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://www.hbo.com/favicon.ico',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/HBO.png',
        })
    }

    if (ruleOptions.tvb) {
        rules.push('GEOSITE,tvb,TVB')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'TVB',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://www.tvb.com/logo_b.svg',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/TVB.png',
        })
    }

    if (ruleOptions.primevideo) {
        rules.push('GEOSITE,primevideo,Prime Video')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Prime Video',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://m.media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Prime_Video.png',
        })
    }

    if (ruleOptions.hulu) {
        rules.push('GEOSITE,hulu,Hulu')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Hulu',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://auth.hulu.com/v4/web/password/authenticate',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hulu.png',
        })
    }

    if (ruleOptions.telegram) {
        rules.push('GEOIP,telegram,Telegram')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Telegram',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://www.telegram.org/img/website_icon.svg',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png',
        })
    }

    if (ruleOptions.whatsapp) {
        rules.push('GEOSITE,whatsapp,WhatsApp')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'WhatsApp',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://web.whatsapp.com/data/manifest.json',
            icon: 'https://static.whatsapp.net/rsrc.php/v3/yP/r/rYZqPCBaG70.png',
        })
    }

    if (ruleOptions.line) {
        rules.push('GEOSITE,line,Line')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Line',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://line.me/page-data/app-data.json',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Line.png',
        })
    }

    if (ruleOptions.games) {
        rules.push(
            'GEOSITE,category-games@cn,国内网站',
            'GEOSITE,category-games,游戏专用'
        )
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '游戏专用',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png',
        })
    }

    if (ruleOptions.tracker) {
        rules.push('GEOSITE,tracker,跟踪分析')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '跟踪分析',
            type: 'select',
            proxies: ['REJECT', 'DIRECT', '默认节点'],
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Reject.png',
        })
    }

    if (ruleOptions.ads) {
        rules.push('GEOSITE,category-ads-all,广告过滤')
        rules.push('RULE-SET,adblockmihomo,广告过滤')
        ruleProviders.set('adblockmihomo', {
            ...ruleProviderCommon,
            behavior: 'domain',
            format: 'mrs',
            url: 'https://github.com/217heidai/adblockfilters/raw/refs/heads/main/rules/adblockmihomo.mrs',
            path: './ruleset/adblockfilters/adblockmihomo.mrs',
        })
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '广告过滤',
            type: 'select',
            proxies: ['REJECT', 'DIRECT', '默认节点'],
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png',
        })
    }

    if (ruleOptions.apple) {
        rules.push('GEOSITE,apple-cn,苹果服务')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '苹果服务',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://www.apple.com/library/test/success.html',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple_2.png',
        })
    }

    if (ruleOptions.google) {
        rules.push('GEOSITE,google,谷歌服务')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '谷歌服务',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://www.google.com/generate_204',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google_Search.png',
        })
    }

    if (ruleOptions.microsoft) {
        rules.push('GEOSITE,microsoft@cn,国内网站', 'GEOSITE,microsoft,微软服务')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '微软服务',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'http://www.msftconnecttest.com/connecttest.txt',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Microsoft.png',
        })
    }

    if (ruleOptions.github) {
        rules.push('GEOSITE,github,Github')
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'Github',
            type: 'select',
            proxies: ['默认节点', ...proxyGroupsRegionNames, 'DIRECT'],
            url: 'https://github.com/robots.txt',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png',
        })
    }

    if (ruleOptions.japan) {
        rules.push(
            'RULE-SET,category-bank-jp,日本网站',
            'GEOIP,jp,日本网站,no-resolve'
        )
        ruleProviders.set('category-bank-jp', {
            ...ruleProviderCommon,
            behavior: 'domain',
            format: 'mrs',
            url: 'https://fastly.jsdelivr.net/gh/MetaCubeX/meta-rules-dat@meta/geo/geosite/category-bank-jp.mrs',
            path: './ruleset/MetaCubeX/category-bank-jp.mrs',
        })

        // 找到日本节点组，优先放在第一位
        const jpGroupName = 'JP日本'
        const otherRegionNames = proxyGroupsRegionNames.filter(name => name !== jpGroupName)
        const jpProxies = proxyGroupsRegionNames.includes(jpGroupName)
            ? [jpGroupName, '默认节点', ...otherRegionNames, 'DIRECT']
            : ['默认节点', ...proxyGroupsRegionNames, 'DIRECT']

        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '日本网站',
            type: 'select',
            proxies: jpProxies,
            url: 'https://r.r10s.jp/com/img/home/logo/touch.png',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/JP.png',
        })
    }

    rules.push(
        'GEOSITE,private,DIRECT',
        'GEOIP,private,DIRECT,no-resolve',
        'GEOSITE,cn,国内网站',
        'GEOIP,cn,国内网站,no-resolve',
        'MATCH,其他外网'
    )
    config['proxy-groups'].push(
        {
            ...groupBaseOption,
            name: '下载软件',
            type: 'select',
            proxies: [
                'DIRECT',
                'REJECT',
                '默认节点',
                '国内网站',
                ...proxyGroupsRegionNames,
            ],
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Download.png',
        },
        {
            ...groupBaseOption,
            name: '其他外网',
            type: 'select',
            proxies: ['默认节点', 'DIRECT',  '国内网站', ...proxyGroupsRegionNames],
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming!CN.png',
        },
        {
            ...groupBaseOption,
            name: '国内网站',
            type: 'select',
            proxies: ['DIRECT', '默认节点', ...proxyGroupsRegionNames],
            url: 'http://wifi.vivo.com.cn/generate_204',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png',
        }
    )

    config['proxy-groups'] = config['proxy-groups'].concat(regionProxyGroups)

    // 覆盖原配置中的规则
    config['rules'] = rules
    config['rule-providers'] = Object.fromEntries(ruleProviders)

    if (otherProxyGroups.length > 0) {
        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '其他节点',
            type: 'select',
            proxies: otherProxyGroups,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png',
        })
    }

    // 生成组优先；只有同名的原组才被生成组覆盖，其余原始策略组继续保留。
    const generatedGroupNames = new Set(
        config['proxy-groups'].map(group => group.name)
    )
    config['proxy-groups'].push(
        ...originalProxyGroups.filter(
            group => !generatedGroupNames.has(group.name)
        )
    )

    config['proxy-groups'] = prependRegionCandidates(
        config['proxy-groups'],
        proxyGroupsRegionNames,
        allNodeNames
    )
    config['proxy-groups'] = ensureGlobalSelectorGroups(
        config['proxy-groups'],
        proxyGroupsRegionNames,
        allNodeNames
    )

    // 规则模式和各选择器都按截图要求：现有地区组先置顶，
    // 再展示指定服务组，最后保留其他策略组。
    config['proxy-groups'] = reorderProxyGroups(
        config['proxy-groups'],
        proxyGroupsRegionNames
    )

    // 返回修改后的配置
    return config
}
