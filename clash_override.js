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
    apple: false,
    microsoft: true,
    github: true,
    google: true,
    openai: true,
    spotify: false,
    youtube: true,
    bahamut: false,
    netflix: false,
    tiktok: false,
    disney: false,
    pixiv: true,
    hbo: false,
    biliintl: false,
    tvb: false,
    hulu: false,
    primevideo: false,
    telegram: false,
    line: false,
    whatsapp: false,
    games: true,
    japan: true,
    tracker: true,
    ads: true,
}

const regionOptions = {
    excludeHighPercentage: true,
    autoDetect: true,
    defaultIcon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
    regions: [
        {
            name: 'HK香港',
            regex: /港|香港|HONG KONG|HONGKONG|hk|HK|hongkong|hong kong/i,
            ratioLimit: 5,
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png',
        },
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
            regex: /加|加拿大|ca|CA|canada|CANADA|CAN/i,
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

const defaultDNS = ["tls://1.12.12.12", "tls://223.5.5.5"]

const chinaDNS = [
    '223.6.6.6',
    '119.29.29.29',
    '223.5.5.5',
    '1.12.12.12',
    '114.114.114.114'
]

const foreignDNS = [
    'https://120.53.53.53/dns-query',
    'https://223.5.5.5/dns-query'
]

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
    'fake-ip-filter': ['*', '+.lan', '+.local', '+.market.xiaomi.com'],
    nameserver: [...foreignDNS],
    'proxy-server-nameserver': [...foreignDNS],
    'nameserver-policy': {
        'geosite:private': 'system',
        'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
        '+.want-want.com': ['system'],
        '+.local': ['system'],
    },
}

const ruleProviderCommon = {
    type: 'http',
    format: 'yaml',
    interval: 86400,
}

const groupBaseOption = {
    interval: 300,
    timeout: 3000,
    url: 'http://cp.cloudflare.com/generate_204',
    lazy: true,
    'max-failed-times': 3,
    hidden: false,
}

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
}

const FLAG_TO_CODE = {}

const ZH_TO_CODE = {
    '美国': 'US', '香港': 'HK', '日本': 'JP', '韩国': 'KR', '新加坡': 'SG',
    '中国': 'CN', '台湾': 'TW', '英国': 'GB', '德国': 'DE', '马来': 'MY',
    '土耳其': 'TR', '加拿大': 'CA', '法国': 'FR', '希腊': 'GR',
    '立陶宛': 'LT', '北马其顿': 'MK', '马其顿': 'MK', '荷兰': 'NL',
    '波兰': 'PL', '瑞典': 'SE', '阿根廷': 'AR'
}

const CODE_TOKENS = {
    USA: 'US', US: 'US', CAN: 'CA', DEU: 'DE', DE: 'DE',
    FRA: 'FR', FR: 'FR', GBR: 'GB', UK: 'GB', GB: 'GB',
    GRC: 'GR', GR: 'GR', LTU: 'LT', LT: 'LT', MKD: 'MK',
    MK: 'MK', NLD: 'NL', NL: 'NL', POL: 'PL', PL: 'PL',
    SWE: 'SE', SE: 'SE', HKG: 'HK', HK: 'HK', JPN: 'JP',
    JP: 'JP', SGP: 'SG', SG: 'SG', TWN: 'TW', TW: 'TW',
    CHN: 'CN', CN: 'CN', KOR: 'KR', KR: 'KR', TUR: 'TR',
    TR: 'TR', MYS: 'MY', MY: 'MY', ARG: 'AR', AR: 'AR',
    ARGENTINA: 'AR'
}

const CODE_TOKEN_REGEXES = Object.keys(CODE_TOKENS)
    .sort((a, b) => b.length - a.length)
    .map(tk => ({
        regex: new RegExp(`(?:^|[^A-Z])${tk}(?:[^A-Z]|$)`),
        code: CODE_TOKENS[tk]
    }))

function detectCountryCode(name) {
    for (const zh in ZH_TO_CODE) {
        if (name.includes(zh)) return ZH_TO_CODE[zh]
    }

    const upper = name.toUpperCase()

    for (const { regex, code } of CODE_TOKEN_REGEXES) {
        if (regex.test(upper)) return code
    }

    return null
}

const customRuleSets = {
    applications: {
        behavior: 'classical',
        format: 'text',
        url: 'https://fastly.jsdelivr.net/gh/DustinWin/ruleset_geodata@clash-ruleset/applications.list',
        path: './ruleset/DustinWin/applications.list',
    },
}

const ruleProviders = new Map()

Object.entries(customRuleSets).forEach(([name, config]) => {
    ruleProviders.set(name, {
        ...ruleProviderCommon,
        ...config
    })
})

const customRules = {
    direct: {
        target: 'DIRECT',
        domainSuffix: [
            'warframe.com',
            'prlrr.com',
            'g5air.com',
            'qslk.net',
            'darensoft.com'
        ],
        domainKeyword: [
            'audiences',
            'rlzy',
            'rsxt',
            'g5air',
            'sharepoint.com'
        ],
        domain: [],
        processName: [
            'SunloginClient',
            'SunloginClient.exe',
            'AnyDesk',
            'AnyDesk.exe'
        ],
        ruleSets: []
    },

    defaultProxy: {
        target: '默认节点',
        domainSuffix: [
            'augmentcode.com',
            'javdb.com',
            'jdbstatic.com'
        ],
        domainKeyword: [
            'postman',
            'stripchat',
            'qbittorrent'
        ],
        domain: [],
        processName: ['Windsurf.exe'],
        ruleSets: []
    },

    downloadApps: {
        target: '下载软件',
        domainSuffix: [],
        domainKeyword: [],
        domain: [],
        ruleSets: ['applications']
    },

    japanSites: {
        target: '日本网站',
        domainSuffix: ['mgstage.com', 'dmm.co.jp'],
        domainKeyword: ['dmm.com', 'seesaawiki', 'mgstage'],
        domain: ['dmm.co.jp'],
        ruleSets: []
    }
}

function generateCustomRules() {
    const rules = []

    Object.values(customRules).forEach(ruleConfig => {
        const target = ruleConfig.target

        if (ruleConfig.domainSuffix) {
            ruleConfig.domainSuffix.forEach(domain => {
                rules.push(`DOMAIN-SUFFIX,${domain},${target}`)
            })
        }

        if (ruleConfig.domainKeyword) {
            ruleConfig.domainKeyword.forEach(keyword => {
                rules.push(`DOMAIN-KEYWORD,${keyword},${target}`)
            })
        }

        if (ruleConfig.domain) {
            ruleConfig.domain.forEach(domain => {
                rules.push(`DOMAIN,${domain},${target}`)
            })
        }

        if (ruleConfig.processName) {
            ruleConfig.processName.forEach(process => {
                rules.push(`PROCESS-NAME,${process},${target}`)
            })
        }

        if (ruleConfig.ruleSets) {
            ruleConfig.ruleSets.forEach(ruleSetName => {
                rules.push(`RULE-SET,${ruleSetName},${target}`)
            })
        }
    })

    return rules
}

const additionalDirectRules = [
    'DOMAIN,wantdp-test.want-want.com,DIRECT',
    'DOMAIN,invite.linuxdo.org,DIRECT',
    'DOMAIN-KEYWORD,want,DIRECT',
    'DOMAIN-SUFFIX,local,DIRECT',
    'IP-CIDR,127.0.0.0/8,DIRECT,no-resolve',
    'IP-CIDR,10.0.0.0/8,DIRECT,no-resolve',
    'IP-CIDR,172.16.0.0/12,DIRECT,no-resolve',
    'IP-CIDR,192.168.0.0/16,DIRECT,no-resolve',
    'IP-CIDR,169.254.0.0/16,DIRECT,no-resolve',
]

const rules = [...additionalDirectRules, ...generateCustomRules()]

function main(config) {
    const proxyCount = config?.proxies?.length ?? 0
    const proxyProviderCount =
        typeof config?.['proxy-providers'] === 'object'
            ? Object.keys(config['proxy-providers']).length
            : 0

    if (proxyCount === 0 && proxyProviderCount === 0) {
        throw new Error('配置文件中未找到任何代理')
    }

    let regionProxyGroups = []
    let otherProxyGroups = config.proxies.map(b => b.name)

    config['allow-lan'] = true
    config['bind-address'] = '*'
    config['mode'] = 'rule'

    if (enableDnsOverride) {
        config['dns'] = dnsConfig
    }

    config['profile'] = {
        'store-selected': true,
        'store-fake-ip': true,
    }

    config['unified-delay'] = true
    config['tcp-concurrent'] = true
    config['keep-alive-interval'] = 1800
    config['find-process-mode'] = 'strict'
    config['geodata-mode'] = true
    config['geodata-loader'] = 'memconservative'
    config['geo-auto-update'] = true
    config['geo-update-interval'] = 24

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
        mmdb:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
        asn:
            'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
    }

    if (!enable) {
        return config
    }

    const usedProxies = new Set()
    regionOptions.regions.forEach(region => {
        const proxies = []

        for (const proxy of config.proxies) {
            const name = proxy.name

            if (!region.regex.test(name)) continue

            if (regionOptions.excludeHighPercentage) {
                const match = RATIO_REGEX.exec(name)
                const multiplier = match ? Number(match[1]) : 0

                if (multiplier > region.ratioLimit) continue
            }

            proxies.push(name)
            usedProxies.add(name)
        }

        if (proxies.length > 0) {
            regionProxyGroups.push({
                ...groupBaseOption,
                name: region.name,
                type: enableUrltest ? 'url-test' : 'select',
                tolerance: enableUrltest ? 50 : undefined,
                icon: region.icon,
                proxies: proxies,
            })
        }
    })

    otherProxyGroups = otherProxyGroups.filter(x => !usedProxies.has(x))

    if (regionOptions.autoDetect) {
        const existingGroupsMap = new Map(
            regionProxyGroups.map(g => [g.name, g])
        )
        const detected = new Map()
        const addedProxySet = new Set()

        for (const n of otherProxyGroups) {
            const code = detectCountryCode(n)
            if (!code) continue

            const info = CODE_TO_REGION[code] || {
                name: code,
                icon: regionOptions.defaultIcon
            }

            const rname = info.name
            const existingGroup = existingGroupsMap.get(rname)

            if (existingGroup) {
                if (!existingGroup.proxies.includes(n)) {
                    existingGroup.proxies.push(n)
                    addedProxySet.add(n)
                }
            } else {
                if (!detected.has(rname)) {
                    detected.set(rname, {
                        proxies: [],
                        icon: info.icon
                    })
                }

                detected.get(rname).proxies.push(n)
                addedProxySet.add(n)
            }
        }

        for (const [rname, data] of detected.entries()) {
            if (data.proxies.length === 0) continue

            regionProxyGroups.push({
                ...groupBaseOption,
                name: rname,
                type: enableUrltest ? 'url-test' : 'select',
                tolerance: enableUrltest ? 50 : undefined,
                icon: data.icon,
                proxies: data.proxies,
            })
        }

        if (addedProxySet.size > 0) {
            otherProxyGroups = otherProxyGroups.filter(
                x => !addedProxySet.has(x)
            )
        }
    }

    const proxyGroupsRegionNames = regionProxyGroups.map(g => g.name)

    if (otherProxyGroups.length > 0) {
        proxyGroupsRegionNames.push('其他节点')
    }

    const allNodeNames = config.proxies.map(p => p.name)

    config['proxy-groups'] = [
        {
            ...groupBaseOption,
            name: '全部节点',
            type: 'url-test',
            tolerance: 50,
            proxies: [...allNodeNames],
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

    config.proxies = config?.proxies || []

    if (ruleOptions.openai) {
        rules.push(
            'DOMAIN-SUFFIX,grazie.ai,国外AI',
            'DOMAIN-SUFFIX,grazie.aws.intellij.net,国外AI',
            'RULE-SET,ai,国外AI',
        )

        ruleProviders.set('ai', {
            ...ruleProviderCommon,
            behavior: 'classical',
            format: 'text',
            url: 'https://github.com/dahaha-365/YaNet/raw/refs/heads/dist/rulesets/mihomo/ai.list',
            path: './ruleset/YaNet/ai.list',
        })

        const aiProxyRegions = proxyGroupsRegionNames.filter(
            n => n !== 'HK香港'
        )

        config['proxy-groups'].push({
            ...groupBaseOption,
            name: 'AI默认节点',
            type: enableUrltest ? 'url-test' : 'select',
            tolerance: enableUrltest ? 50 : undefined,
            proxies: [...aiProxyRegions, 'DIRECT'],
            url: 'https://chat.openai.com/cdn-cgi/trace',
            icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
        })

        config['proxy-groups'].push({
            ...groupBaseOption,
            name: '国外AI',
            type: 'select',
            proxies: ['AI默认节点', ...aiProxyRegions, 'DIRECT'],
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
            url: 'https://m-media-amazon.com/images/G/01/digital/video/web/logo-min-remaster.png',
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
        rules.push(
            'GEOSITE,microsoft@cn,国内网站',
            'GEOSITE,microsoft,微软服务'
        )

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

        const jpGroupName = 'JP日本'
        const otherRegionNames = proxyGroupsRegionNames.filter(
            name => name !== jpGroupName
        )

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
            proxies: [
                '默认节点',
                'DIRECT',
                '国内网站',
                ...proxyGroupsRegionNames
            ],
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

    return config
}
