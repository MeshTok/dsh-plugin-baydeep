# BayDeep MCP — 提交物料包（2026-11-09 实时状态，全部字段直接复制）

> mcp.baydeep.com 已公网上线，以下内容为最终态。逐表单粘贴即可。

## 一句话（EN 短）
One MCP gives your AI agent full AliExpress affiliate commerce — 5,000+ curated live deals (scaling daily), attributed s.click buy links, commission orders. Zero signup: agents self-serve a free key in-session via `mint_free_key`.

## 一句话（EN 长）
BayDeep is a live e-commerce MCP server (Streamable HTTP) backed by the official AliExpress Affiliate API. Your agent gets keyword/category search across millions of items, product detail batching, attributed affiliate buy links (automatic per-key tracking), commission orders with settlement preview, and a zero-signup open tier — the agent calls `mint_free_key` in-session and never leaves the protocol. Read-only shelf tools work keyless.

## 一句话（CN）
BayDeep 电商 MCP：速卖通官方联盟 API 驱动——实时搜索/商品详情/带归因 s.click 购买链接/佣金订单。零注册：agent 会话内直接调 `mint_free_key` 自助领 key。

## 连接信息（所有目录通用）
- **MCP endpoint**: `https://mcp.baydeep.com/mcp` (Streamable HTTP / JSON-RPC)
- **Auth**: optional — keyless read-only tier works without a key; free key via `mint_free_key` tool or `POST https://api.baydeep.com/v1/trial`
- **Transport**: streamable-http
- **Tools (9)**: `mint_free_key`, `shelf_search`, `shelf_item`, `search_products`, `hot_products`, `product_detail`, `convert_link`, `affiliate_orders`, `categories`
- **Categories**: e-commerce, shopping, affiliate, monetization, aliexpress, cross-border
- **Site**: https://baydeep.com (developer-facing) · https://leapbest.com (consumer deals)
- **Contact**: unly1130@gmail.com
- **Health**: https://mcp.baydeep.com/healthz
- **Remote**: 100% remote-hosted (no local install, no stdio)

## 差异化卖点（选填字段用）
1. Zero-signup open tier — unique `mint_free_key` tool lets agents self-serve keys in-protocol
2. Real settlement preview per order (`share_eligible` / `share_amount`) — developers earn 3% on commission-eligible purchases
3. Official AliExpress Affiliate API (no scraping) — compliant attribution via Portals tracking IDs
4. Ships to 200+ countries; consumer storefront live at leapbest.com proving the funnel
5. Zero-dependency Node 16+ server — deployable anywhere

## npm / GitHub
- npm: `dsh-plugin-baydeep`（发布待 npm login）
- GitHub: 待建仓 baydeep/dsh-plugin-baydeep

## 提交渠道清单
| 渠道 | 方式 | 状态 |
|---|---|---|
| PulseMCP | pulsemcp.com 表单（邮箱） | 本轮提交 |
| mcp.so | 站内提交 | 本轮提交 |
| Smithery | GitHub 登录后 add | 本轮尝试（GitHub 凭据在 credentials） |
| Glama | glama.ai MCP 目录 | 本轮尝试 |
| MCPServers.org | 表单/GitHub | 本轮提交 |
| awesome-remote-mcp-servers | GitHub PR（网页 fork+edit 可完成） | 本轮尝试 |
| Cursor directory | cursor.com 集成 | 需 Cursor 账号（用户侧） |
| Cline MCP Marketplace | GitHub PR | 需 GitHub（可顺） |
| DSH Market | dsh-plugin-baydeep 物料已齐 | 需 GitHub 仓/npm |
| ChatGPT (custom GPT + Actions) | OpenAPI schema 已备 docs/chatgpt-gpt-kit.md | 用户粘贴创建（需 ChatGPT 账号） |
| ChatGPT (remote MCP connector) | ChatGPT 设置里直接加 https://mcp.baydeep.com/mcp | 用户侧（需 developer mode） |
