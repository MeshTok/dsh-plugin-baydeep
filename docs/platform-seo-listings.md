# BayDeep 分发矩阵——各市场提交文案（照源头淘 dsh-plugin-yuantoutao 模式）

> **定位铁律**：①BayDeep 不做消费者返利；②标准定位=「电商插件/MCP——一个入口给 AI agent 加上
> 速卖通联盟电商能力（1.2 亿商品实时搜索/热销/归因购买链接/佣金订单）」；③变现点=「零注册接入，
> 成交拿 3% 分成（佣金率>3% 商品）」，只对开发者场景提；④英文为主（海外市场）。
> 状态标记：🟢可提交（物料齐，等公网 URL）｜🟡需先做某事。最后更新 2026-11-09。

## 标准一句话定位（通用）

- **EN**: One MCP gives your AI agent full AliExpress affiliate commerce — 100M+ item live
  search, hot products, attributed s.click buy links and commission orders, shipping to
  200+ countries. Zero signup: the agent self-serves its free key in-session.
- **EN 短版**: AliExpress affiliate commerce for your AI agent — live search, attributed
  buy links, 3% commission share. No signup.
- **CN**: 一个 MCP 给你的 agent 加上速卖通联盟电商能力——1.2 亿商品实时搜索、热销榜、
  带归因购买链接、佣金订单。零注册：agent 会话内自助领 key。

---

## 1. 🟢 DSH Market / awesome-dsh-plugins（DeepSeek Harness；开发者）

**Name**: BayDeep — AliExpress Commerce MCP (电商插件)
**Description**:
> AliExpress affiliate commerce MCP for your AI agent: live search across a 100M+ item
> pool, hot products, batched product detail, attributed s.click buy links with automatic
> per-developer tracking, and commission orders with per-order settlement preview
> (`share_eligible` / `share_amount` / `share_summary`). Ships to 200+ countries.
> Monetize your agent: 3% developer share on eligible purchases. Zero signup — the
> plugin self-serves a free key on first run (or the agent calls `mint_free_key` in-session).
**Tags**: e-commerce, shopping, mcp-server, aliexpress, affiliate, commerce, monetization, cross-border
**物料**：本仓库（dsh-plugin-baydeep）即提交物；awesome-entry.yml 已备。

## 2. 🟢 awesome-remote-mcp-servers（GitHub PR；流量最大的目录）

**Entry（照 PR 表格式）**:
- Name: BayDeep
- URL: https://mcp.baydeep.com/mcp
- Description: AliExpress affiliate commerce for AI agents — 100M+ item live search, hot
  products, attributed s.click buy links, commission orders. Zero signup: agents self-serve
  a free key via the `mint_free_key` tool (read-only shelf tools work keyless).
- Categories: e-commerce, shopping, affiliate
**备注**：等 mcp.baydeep.com 公网可访问后提 PR（维护者要求 URL 可达+tools/list 可用）。

## 3. 🟢 Smithery / Glama / mcp.so / PulseMCP / MCPServers.org（MCP 目录群）

**统一 listing**：docs/mcp-listing.md（逐字段 copy-paste）。
- Smithery: remote server 类型，transport=streamable-http，url=mcp.baydeep.com/mcp
- Glama: MCP server 目录 + tools 自动抓取
- PulseMCP: 同上
**备注**：全部等公网 URL 上线后提交；listing 文案已按各目录字段备好。

## 4. 🟢 npm（dsh-plugin-baydeep 包）

**包名**: `dsh-plugin-baydeep`
**description**: E-commerce plugin/MCP server for DeepSeek Harness (BayDeep) — live AliExpress affiliate search across 100M+ items, attributed buy links, commission orders. Zero signup.
**keywords**: dsh-plugin, deepseek-harness, mcp, mcp-server, e-commerce, aliexpress, affiliate, monetization, shopping-agent
**备注**：npm publish 需 npm 账号（用户侧 `npm login`）；发布前把 repository url 换成实际 GitHub repo。

## 5. 🟡 GitHub（baydeep/dsh-plugin-baydeep 仓库）

**内容**：本仓库全部（README/README.zh/index.js/awesome-entry.yml/icon.svg/docs）。
**步骤**：用户建 GitHub repo（baydeep org 或个人）→ push → 仓库 README 即市场落地页。
**SEO 仓库描述**：AliExpress affiliate commerce MCP for AI agents — 100M+ items, attributed buy links, 3% commission. Zero signup, one-line install.

## 6. 🟢 llms.txt / 官网 GEO（已就绪）

website/llms.txt 已含 MCP/REST 能力描述；baydeep.com 官网已上（硅谷静态）。
**待办**：llms.txt 加 mint_free_key 零注册自助领 key 一句 + mcp.baydeep.com 端点转正（从 Planned 改 Live）。

## 7. 🟡 后续平台（源头上未覆盖、海外特有）

- **mcp.market / Cursor directory / Cline MCP marketplace / Windsurf**:同 mcp-listing.md 文案
- **Reddit**: r/mcp, r/SideProject, r/AI_Agents — 发「Monetize your AI agent」主题帖（ README 英文版直贴）
- **Hacker News Show HN**: 等 mcp.baydeep.com 上线 + 首个真实 commission 支付流水后再发（有数据才有传播）
- **Twitter/X**: @baydeep 账号 + build in public 线（每里程碑一条）

---

## 提交前置条件（阻塞项，一处列全）

1. **网关公网部署**：硅谷服务器 49.51.201.95 需 SSH 授权（本机无 key）→ 装 node>=18 + pm2 →
   跑 `src/index.js`（.env 真实凭据已就位）→ nginx 反代 mcp.baydeep.com/api.baydeep.com → certbot HTTPS
2. **GitHub repo**：baydeep 主仓 + dsh-plugin-baydeep 插件仓（用户建号授权或手动 push）
3. **npm 账号**：`npm login` 后 `npm publish`

以上三件完成后，第 1/2/3/4/6 节全部转为 🟢 直接提交（物料均已备好于本仓库）。
