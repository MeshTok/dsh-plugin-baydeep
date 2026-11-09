# ChatGPT 接入 BayDeep —— 两条通道物料（用户粘贴即用）

> ChatGPT 旧版 Plugins 已下线（2024）。现行两条路：**A. 自定义 GPT + Actions**（走 api.baydeep.com 的 OpenAPI）；
> **B. Remote MCP connector**（ChatGPT 设置 → Developer mode → 直接加 MCP 地址，Plus 账号可用）。

---

## 通道 A：自定义 GPT + Actions（ChatGPT Plus → Explore GPTs → Create）

**GPT Name**: BayDeep Shopping
**Description**: Live AliExpress deals with attributed buy links — search products, compare prices, get commission-tracked checkout URLs. Ships to 200+ countries.

**Instructions**（粘贴到 GPT 的 Instructions 框）:
```
You are BayDeep Shopping, a deal-hunting assistant for AliExpress products.

How to work:
1. ALWAYS call the searchProducts action first when the user asks for any product.
2. Present 3-5 best matches as a compact list: title, price, discount %, rating.
3. When the user picks one, call getProductDetail for full info, then ALWAYS give the
   buy link returned by convertLink (it is an attributed AliExpress checkout URL).
4. Never invent prices or products — only use action results. If a call fails, say so.
5. Prices are in USD; mention "ships to 200+ countries, checkout on AliExpress".
6. Do not recommend medicine/health products. You never handle payments — the user
   always checks out on AliExpress directly.

Tone: concise, deal-focused, friendly. English default; mirror the user's language.
```

**Action OpenAPI schema**（粘贴到 Actions → Create new action → Schema）:
```yaml
openapi: 3.1.0
info:
  title: BayDeep Affiliate Commerce API
  version: 1.0.0
  description: Live AliExpress affiliate product search, detail and attributed buy links.
servers:
  - url: https://api.baydeep.com/v1
components:
  securitySchemes:
    ApiKeyAuth:
      type: apiKey
      in: header
      name: X-API-Key
security:
  - ApiKeyAuth: []
paths:
  /search:
    get:
      operationId: searchProducts
      summary: Search AliExpress products by keyword
      parameters:
        - { name: q, in: query, required: true, schema: { type: string }, description: keyword }
        - { name: limit, in: query, schema: { type: integer, default: 10, maximum: 40 } }
        - { name: sort, in: query, schema: { type: string, enum: [SALE_PRICE_ASC, SALE_PRICE_DESC, ORDINAL_DESC] } }
      responses:
        "200": { description: product list }
  /item/{goodsId}:
    get:
      operationId: getProductDetail
      summary: Batch product detail (up to 10 ids) or single item
      parameters:
        - { name: goodsId, in: path, required: true, schema: { type: string } }
      responses:
        "200": { description: product detail }
  /convert:
    post:
      operationId: convertLink
      summary: Convert AliExpress item URL(s) into attributed affiliate buy link(s)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                urls: { type: array, items: { type: string } }
      responses:
        "200": { description: attributed links (s.click) }
  /trial:
    post:
      operationId: getFreeKey
      summary: Self-serve a free API key (no signup, never expires)
      responses:
        "200": { description: api key }
```

**API Key 获取**（Actions 鉴权一栏）:
- 类型选 API Key → Header `X-API-Key`
- Key 值：先 `curl -X POST https://api.baydeep.com/v1/trial` 领一个免费 key 粘进去（或找站长拿正式 key）

---

## 通道 B：Remote MCP connector（最简单）

ChatGPT → Settings → **Connectors** / Developer mode → Add MCP server:
- **URL**: `https://mcp.baydeep.com/mcp`
- 协议自动识别（Streamable HTTP）
- 无需鉴权即可浏览只读货架工具；完整工具在会话内调 `mint_free_key` 自助领 key

> 说明：通道 B 需要 ChatGPT Plus 且账号已开启 developer/connectors 功能；不可用时走通道 A（Actions 兼容所有 Plus 账号）。
