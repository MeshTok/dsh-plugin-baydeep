# MCP Directory Listing — BayDeep

Standard listing materials for MCP directories (Smithery / Glama / PulseMCP / mcp.so /
MCPServers.org / awesome-remote-mcp-servers etc). Copy-paste per field.
Last updated: 2026-11-09.

---

## Name

BayDeep — E-commerce MCP for AI Agents

## One-line description (EN)

Live AliExpress affiliate commerce MCP: 100M+ item search, hot products, attributed
s.click buy links and commission orders — 200+ ship-to countries. Zero signup: your
agent self-serves a free key via the `mint_free_key` tool.

## One-line description (CN)

BayDeep 电商 MCP：速卖通 1.2 亿商品实时搜索、热销榜、带归因 s.click 购买链接、佣金订单，
发货覆盖 200+ 国家。零注册：agent 调 `mint_free_key` 工具即可自助领 key。

## Full description (EN)

BayDeep is an affiliate-commerce MCP server (Streamable HTTP) backed by the official
AliExpress Affiliate API. Your AI agent gets:

- **Live product search** — 100M+ item pool, natural-language queries, sorting
  (price/rating/orders), target currency & ship-to country, category filters.
- **Hot products** — trending items feed for deal/campaign agents (Advanced API).
- **Product detail** — batched detail (up to 10 ids): final price, discount, coupon,
  sales volume, rating, commission rate, shop & video URLs.
- **Attributed buy links** — convert any aliexpress.com URL into an s.click affiliate
  short link carrying YOUR tracking id. Attribution is how commission is tracked.
- **Commission orders & settlement preview** — orders filtered to your tracking id,
  each with `commission_rate_pct`, `share_eligible` (3% share applies only when the
  product commission rate > 3%), `share_amount`, and a page-level `share_summary`.
- **Zero-signup open tier** — read-only shelf tools work without a key (30 req/min per
  IP); `mint_free_key` lets the agent self-serve a permanent free key inside the MCP
  session (no HTTP, no registration form, 5 keys/day/IP, never expires).

**Auth**: `Authorization: Bearer ak_...` or `X-API-Key` — free key, self-served via the
`mint_free_key` tool (or `POST https://mcp.baydeep.com/v1/trial`).
**Protocol**: MCP Streamable HTTP (JSON-RPC), 9 tools.
**Rate limits**: keyed 30 req/min; keyless 30 req/min per IP (read-only tier).
**Category**: e-commerce, shopping, affiliate, monetization, aliexpress, cross-border.

## install (Smithery-style)

```yaml
command: n/a (remote MCP, Streamable HTTP)
url: https://mcp.baydeep.com/mcp
transport: streamable-http
auth: optional — tools/call mint_free_key to self-serve a key, or https://mcp.baydeep.com/v1/trial
```

## Local development

```bash
git clone https://github.com/baydeep/baydeep.git && cd baydeep
node src/index.js            # gateway on http://127.0.0.1:8787 (MOCK if no .env)
node scripts/seed-shelf.js   # optional: seed the demo shelf
```

Then point any MCP client at `http://127.0.0.1:8787/mcp`.
