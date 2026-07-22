# Mihomo / Clash Verge Rev JavaScript 覆写脚本

这是一个适用于 Mihomo Party、Clash Verge Rev 等支持 JavaScript 覆写脚本的配置增强脚本。

脚本会接收原订阅生成的配置对象，在不修改订阅节点本身的前提下，自动补充和调整：

* 代理策略组
* 地区节点分组
* AI、Google、YouTube、GitHub、微软等服务分流
* 国内网站、私有地址、广告和追踪规则
* DNS 覆写和本地域名直连策略
* 美国节点优先的 AI 节点故障切换
* 代理提供商节点自动纳入
* 流量、到期、订阅信息节点过滤

> 注意：本项目是 JavaScript 覆写脚本，不是完整的 Clash YAML 配置，也不是代理订阅链接。需要先导入到软件的“覆写 / 脚本”页面，再绑定到具体订阅。

---

## 一、文件说明

当前融合版文件名：

```text
clash_override_us_ai_fallback.js
```

上传到 GitHub 后，如果希望继续使用原来的 Raw URL，可以将文件重命名为：

```text
clash_override.js
```

如果上传到 GitHub 仓库 cmy8027/clash-config 的 main 分支，Raw 地址为：

```text
https://raw.githubusercontent.com/cmy8027/clash-config/main/clash_override.js
```

如果实际文件名不同，需要同步修改 URL 最后的文件名。

打开 Raw 地址时，浏览器应该直接显示 JavaScript 源码，而不是 GitHub 的网页代码查看页面。

---

## 二、核心功能

### 1. 美国节点优先的 AI 故障切换

脚本会创建两个 AI 策略组：

```text
国外AI
└── AI默认节点
    ├── US美国
    ├── JP日本 / SG新加坡 / GB英国等其他海外地区
    ├── 其他节点
    └── DIRECT
```

AI 服务的默认访问顺序为：

```text
美国节点 → 其他海外节点 → 其他节点 → DIRECT
```

具体行为如下：

1. 如果存在 US美国 节点组，优先使用美国节点。
2. 美国节点全部不可用时，自动尝试日本、新加坡、英国、德国、加拿大等其他海外节点。
3. 如果已识别的地区组都不可用，再尝试 其他节点。
4. 最后保留 DIRECT 作为兜底选项。

AI默认节点 使用 Mihomo 的 fallback 类型，并使用以下地址进行健康检查：

```text
https://chat.openai.com/cdn-cgi/trace
```

这比使用普通网络测速地址更接近 GPT 实际访问场景。

当前脚本默认不把中国大陆和香港节点加入 AI 默认线路，这是为了避免 GPT 默认选择不稳定或不可用的线路。如果需要加入香港节点，可以在 AI 节点过滤逻辑中移除 HK香港。

### 2. 代理提供商节点自动纳入

脚本支持 proxy-providers 中的节点，通过以下配置自动纳入策略组：

```javascript
'include-all': true
```

地区策略组会通过 filter 自动匹配节点名称，例如：

```text
美国 / US / USA / 🇺🇸 → US美国
日本 / JP / Japan / 🇯🇵 → JP日本
新加坡 / SG / Singapore / 🇸🇬 → SG新加坡
```

即使节点来自代理提供商，而不是直接出现在 config.proxies 中，也可以被地区组识别和使用。

### 3. 自动过滤订阅信息节点

以下类型的节点通常不是实际代理节点，会从自动策略组中排除：

```text
GB
Traffic
Expire
Premium
频道
订阅
ISP
流量
到期
重置
```

对应配置为：

```javascript
const nodeExcludeFilter =
    '(?i)GB|Traffic|Expire|Premium|频道|订阅|ISP|流量|到期|重置'
```

如果你的节点名称中包含上述关键词但确实是可用节点，可以修改或删除这个过滤器。

### 4. AI 服务细分规则

脚本额外加载以下规则集，并统一交给 国外AI 策略组：

| 服务                      | 规则集     |
| ----------------------- | ------- |
| OpenAI 及其他 AI           | ai      |
| Bing                    | bing    |
| Microsoft Copilot       | copilot |
| Claude                  | claude  |
| Google Bard / Gemini 相关 | bard    |

对应规则包括：

```text
RULE-SET,ai,国外AI
RULE-SET,bing,国外AI
RULE-SET,copilot,国外AI
RULE-SET,claude,国外AI
RULE-SET,bard,国外AI
```

---

## 三、策略组说明

### 基础策略组

| 策略组    | 类型       | 用途              |
| ------ | -------- | --------------- |
| 全部节点   | url-test | 包含所有节点并自动测试延迟   |
| 默认节点   | select   | 普通海外网站默认使用的策略组  |
| AI默认节点 | fallback | 美国优先、其他海外自动故障切换 |
| 国外AI   | select   | AI 服务使用的总策略组    |
| 其他外网   | select   | 未被其他规则匹配的海外网站   |
| 国内网站   | select   | 中国大陆网站，默认优先直连   |
| 下载软件   | select   | 下载工具及应用下载相关流量   |
| 其他节点   | select   | 无法识别地区的节点       |

### 按地区自动生成的策略组

脚本会根据节点名称自动创建以下地区组。只有检测到对应节点时，才会创建对应组；使用代理提供商时，也会根据 filter 自动匹配：

```text
HK香港
US美国
JP日本
KR韩国
SG新加坡
CN中国大陆
TW台湾省
GB英国
DE德国
MY马来西亚
TK土耳其
CA加拿大
FR法国
GR希腊
LT立陶宛
MK北马其顿
NL荷兰
PL波兰
SE瑞典
AR阿根廷
```

### 按服务生成的策略组

是否生成由 ruleOptions 控制，当前可能生成：

```text
国外AI
YouTube
游戏专用
跟踪分析
广告过滤
谷歌服务
微软服务
Github
日本网站
```

其他服务组也保留在脚本中，可以通过修改 ruleOptions 开启。

---

## 四、安装方式

### 方式一：通过 GitHub Raw URL 导入

这是最适合长期使用和自动更新的方式。

#### 第一步：上传文件

1. 打开 GitHub 仓库。

2. 点击 Add file。

3. 选择 Upload files，或者点击 creating a new file。

4. 文件名建议使用：

   ```text
   clash_override.js
   ```

5. 粘贴或上传脚本内容。

6. 点击页面底部的 Commit changes。

#### 第二步：获取 Raw 地址

打开脚本文件页面，点击右上角的 Raw，然后复制浏览器地址栏地址。

正确的地址类似：

```text
https://raw.githubusercontent.com/cmy8027/clash-config/main/clash_override.js
```

不要复制以下类型的地址：

```text
https://github.com/用户名/仓库/blob/main/clash_override.js
```

blob 地址是网页查看地址，不能作为覆写脚本地址使用。

#### 第三步：在 Mihomo Party 中导入

1. 打开 Mihomo Party。
2. 左侧进入“覆写”页面。
3. 粘贴 Raw URL。
4. 点击导入。
5. 进入“订阅管理”。
6. 找到需要使用该脚本的订阅，点击右侧三个点。
7. 选择“编辑信息”。
8. 在“覆写”选项中选择刚才导入的脚本。
9. 保存并更新订阅。

### 方式二：本地文件导入

如果软件支持本地覆写脚本：

1. 下载 clash_override.js。
2. 打开软件的“覆写 / 脚本”页面。
3. 选择“导入本地文件”。
4. 选择该 JavaScript 文件。
5. 将脚本绑定到对应订阅。

---

## 五、主要配置项

### 1. 总开关

```javascript
const enable = true
```

| 值     | 含义                |
| ----- | ----------------- |
| true  | 启用完整覆写逻辑          |
| false | 不生成策略组和规则，直接返回原配置 |

在 Mihomo Party 中建议保持为 true。

### 2. 地区组自动测速

```javascript
const enableUrltest = true
```

| 值     | 含义                           |
| ----- | ---------------------------- |
| true  | 地区策略组使用 url-test 自动选择延迟较低的节点 |
| false | 地区策略组使用 select 手动选择          |

注意：AI默认节点 始终使用 fallback，因为它需要实现“美国优先、故障后自动切换”的逻辑。

### 3. DNS 覆写

```javascript
const enableDnsOverride = true
```

设置为 true 时，脚本会覆盖原订阅中的 DNS 配置。

如果你希望继续使用订阅原本的 DNS，可以改成：

```javascript
const enableDnsOverride = false
```

但这样脚本中的以下配置也不会生效：

* use-system-hosts
* direct-nameserver
* direct-nameserver-follow-policy
* +.want-want.com 的系统 DNS 策略
* +.local 的系统 DNS 策略

### 4. 服务开关

```javascript
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
```

例如，想启用 Telegram：

```javascript
telegram: true,
```

想关闭广告过滤：

```javascript
ads: false,
```

关闭不需要的服务可以减少规则集下载和策略组数量。

---

## 六、DNS 配置说明

脚本当前使用两类 DNS。

### 默认 DNS

```javascript
const foreignDNS = [
    'https://120.53.53.53/dns-query',
    'https://223.5.5.5/dns-query'
]
```

### 直连 DNS

```javascript
'direct-nameserver': ['system'],
'direct-nameserver-follow-policy': true,
```

这表示直连域名优先使用系统 DNS，并遵守 nameserver-policy。

### 特殊域名策略

```javascript
'nameserver-policy': {
    'geosite:private': 'system',
    'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
    '+.want-want.com': ['system'],
    '+.local': ['system'],
}
```

作用：

* want-want.com 使用系统 DNS
* .local 域名使用系统 DNS
* 私有域名使用系统 DNS
* 国内、Steam 国内、国内游戏、微软国内、苹果国内域名使用国内 DNS
* 其他域名使用默认 DNS

### Fake-IP

当前配置：

```javascript
'enhanced-mode': 'fake-ip',
'fake-ip-range': '198.18.0.1/16',
'fake-ip-filter': ['*', '+.lan', '+.local', '+.market.xiaomi.com'],
```

如果某些局域网设备访问异常，可以把对应域名加入 fake-ip-filter。

---

## 七、直连规则

脚本会把以下规则放在最终规则数组最前面，确保优先匹配：

```text
DOMAIN,wantdp-test.want-want.com,DIRECT
DOMAIN,invite.linuxdo.org,DIRECT
DOMAIN-KEYWORD,want,DIRECT
DOMAIN-SUFFIX,local,DIRECT
IP-CIDR,127.0.0.0/8,DIRECT,no-resolve
IP-CIDR,10.0.0.0/8,DIRECT,no-resolve
IP-CIDR,172.16.0.0/12,DIRECT,no-resolve
IP-CIDR,192.168.0.0/16,DIRECT,no-resolve
IP-CIDR,169.254.0.0/16,DIRECT,no-resolve
```

其中 `DOMAIN-KEYWORD,want,DIRECT` 表示：只要请求的域名中包含连续字符串 `want`，就直接连接，不经过代理节点。例如 `iww.want-want.com`、`endpoint.want-want.com` 都会直连。只有 URL 路径包含 `want`、但域名本身不包含 `want` 的情况，不会命中这条域名规则。

另外还保留了原脚本中的直连项目：

```text
warframe.com
prlrr.com
g5air.com
qslk.net
darensoft.com
```

以及 Sunlogin、AnyDesk 等进程直连规则。

---

## 八、规则匹配顺序

脚本最终规则大致按照以下顺序生成：

```text
1. 自定义直连规则
2. 自定义默认节点规则
3. AI、YouTube、游戏、广告等服务规则
4. 苹果、Google、微软、GitHub 等服务规则
5. 日本网站规则
6. private 私有地址直连
7. cn 国内域名和 IP 走国内网站组
8. MATCH 其他外网
```

Clash/Mihomo 规则通常是从上到下匹配，命中后停止继续匹配。因此自定义直连规则放在前面非常重要。

---

## 九、规则集来源

脚本会按需下载以下规则集：

| 规则集              | 用途                     |
| ---------------- | ---------------------- |
| applications     | 下载软件和应用规则              |
| ai               | AI 和 GPT 相关规则          |
| bing             | Bing 相关域名              |
| copilot          | Microsoft Copilot 相关域名 |
| claude           | Claude 相关域名            |
| bard             | Bard / Gemini 相关域名     |
| adblockmihomo    | 广告过滤                   |
| category-bank-jp | 日本网站相关规则               |

如果规则集下载失败，通常不会导致脚本语法错误，但对应规则可能无法匹配，最终会落到后面的默认规则。

---

## 十、节点命名建议

为了让地区自动识别准确，建议节点名称包含明确地区标识，例如：

```text
美国-US-01
US Los Angeles 01
🇺🇸 美国高速节点
日本-JP-01
Singapore SG 01
香港-HK-01
```

推荐使用以下关键词：

| 地区  | 推荐关键词                        |
| --- | ---------------------------- |
| 美国  | 美国、US、USA、United States、🇺🇸 |
| 日本  | 日本、JP、Japan、🇯🇵             |
| 新加坡 | 新加坡、SG、Singapore、🇸🇬        |
| 香港  | 香港、HK、Hong Kong              |
| 英国  | 英国、UK、United Kingdom         |
| 德国  | 德国、DE、Germany                |
| 加拿大 | 加拿大、CA、Canada、🇨🇦           |

如果美国节点名称没有包含 美国、US、USA 等关键词，就不会进入 US美国 组，AI 线路也无法实现美国优先。

---

## 十一、美国节点优先不生效时的排查

### 1. 检查是否存在 US美国 组

打开软件的策略组页面，确认能看到：

```text
US美国
```

如果没有，检查节点名称是否包含美国识别关键词。

### 2. 检查 AI 规则是否指向 国外AI

以下规则应该存在：

```text
RULE-SET,ai,国外AI
RULE-SET,bing,国外AI
RULE-SET,copilot,国外AI
RULE-SET,claude,国外AI
RULE-SET,bard,国外AI
```

### 3. 检查当前选择的策略组

AI 服务不能手动选择其他策略组，否则可能绕过美国优先逻辑。建议在 国外AI 中选择：

```text
AI默认节点
```

### 4. 检查健康检查地址

AI 默认组使用：

```text
https://chat.openai.com/cdn-cgi/trace
```

如果该地址在你的网络环境中无法访问，可能导致节点被判断为不可用。可以改成普通测速地址：

```javascript
url: 'https://www.gstatic.com/generate_204',
```

但这样只能检测普通网络连通性，不能保证 GPT 一定可访问。

### 5. 检查规则是否被其他脚本覆盖

如果订阅绑定了多个覆写脚本，后执行的脚本可能覆盖本脚本的 proxy-groups 或 rules。建议先只绑定这一份脚本进行测试。

---

## 十二、更新脚本

### GitHub 更新

修改 GitHub 中的 clash_override.js 后：

1. 提交新的修改。
2. 在软件中刷新覆写列表。
3. 更新对应订阅。
4. 检查策略组是否出现最新配置。

如果软件仍然使用缓存，可以临时在 Raw URL 后面增加版本参数：

```text
https://raw.githubusercontent.com/cmy8027/clash-config/main/clash_override.js?v=2
```

修改版本号即可触发重新请求。

### 本地更新

如果使用本地脚本，修改文件后重新导入，或者删除旧覆写后重新添加。

---

## 十三、常见问题

### Q1：为什么不能在“订阅链接”里直接填这个地址？

因为这个文件是 JavaScript 覆写脚本，不是包含 proxies、proxy-groups、rules 的完整 YAML 配置。

正确流程是：

```text
导入覆写脚本 → 绑定到订阅 → 更新订阅
```

### Q2：Raw 地址打开是网页，不是代码怎么办？

说明复制的是 GitHub blob 地址。必须点击文件页面的 Raw，或者右键 Raw 选择“复制链接地址”。

### Q3：规则集下载失败怎么办？

可能原因包括：

* 当前网络无法访问规则集地址
* jsDelivr 临时不可用
* 规则集 URL 已发生变化
* 软件核心版本过旧

可以先检查软件日志，再尝试更新 Mihomo 核心或更换规则集镜像。

### Q4：脚本提示“配置文件中未找到任何代理”怎么办？

说明原订阅没有成功加载代理节点，也没有可用的 proxy-providers。先确认订阅本身可以正常更新，再检查覆写脚本。

### Q5：为什么修改了 GitHub 文件，软件没有变化？

可能是 Raw 缓存或软件缓存。可以：

1. 重新更新订阅。
2. 删除后重新导入覆写 URL。
3. 在 URL 后增加 ?v=2 等版本参数。
4. 重启软件。

### Q6：为什么有些节点被过滤了？

检查 nodeExcludeFilter。如果节点名称中包含 Traffic、Expire、流量 等关键词，脚本会认为它是订阅信息节点并过滤。

---

## 十四、安全建议

1. 不要把带有用户名、密码、订阅 Token 的完整订阅链接写入公开 GitHub 仓库。
2. 不要把私有节点 URI、机场订阅链接或 API Key 放进公开脚本。
3. 本脚本中的规则集地址是公开地址，不包含你的个人订阅信息。
4. 如果脚本中以后加入了私密配置，建议使用私有仓库或自己的 VPS 托管。
5. GitHub Raw URL 任何拿到链接的人都可以访问，公开仓库尤其需要注意这一点。

---

## 十五、依赖和兼容性

建议使用：

* Mihomo Party
* Clash Verge Rev + Mihomo 核心
* 支持 JavaScript 覆写并执行 main(config) 的 Clash 客户端

脚本使用了以下 JavaScript 特性：

* 可选链 ?.
* 空值合并运算符 ??
* 展开运算符 ...
* Map、Set
* 模板字符串

如果客户端使用非常旧的 JavaScript 运行环境，可能无法执行脚本。

---

## 十六、来源说明

本脚本基于原有 Clash Verge Rev / Mihomo Party 覆写脚本进行整理，并参考了 Mihomo Party Override Hub 中的订阅转换思路，主要借鉴：

* include-all 自动纳入代理提供商节点
* exclude-filter 过滤订阅信息节点
* AI 服务细分规则集

参考项目：

* https://github.com/mihomo-party-org/override-hub
* https://wiki.metacubex.one/en/config/proxy-groups/
* https://wiki.metacubex.one/en/config/dns/

---

## 十七、修改记录

### 当前版本

* 合并自定义直连规则和 DNS 策略
* 增加 want-want.com 和 .local 系统 DNS 解析
* 增加代理提供商节点自动纳入
* 增加无效订阅信息节点过滤
* 增加 Bing、Copilot、Claude、Bard 规则集
* AI 节点调整为美国优先故障切换
* 保留原有地区分组、广告过滤、国内外分流和服务策略组
