# dsh-plugin-baydeep

**E-commerce plugin / MCP server for DeepSeek Harness** — live AliExpress affiliate commerce for your AI agent: 100M+ item search, hot products, attributed s.click buy links and commission orders. Ships to 200+ countries and regions. **Zero signup**: the plugin self-serves a free API key on first run (no registration, never expires).

> Monetize your AI agent — earn a 3% developer share on eligible purchases (product commission rate > 3%).

## Quick start

Install via DSH Market / awesome-dsh-plugins, or manually:

```bash
npm install dsh-plugin-baydeep
```

That's it. On first run the plugin:

1. Auto-mints a **free API key** (`POST https://mcp.baydeep.com/v1/trial` — no signup, never expires) and caches it at `~/.dsh-baydeep-key.json`
2. Connects to the BayDeep MCP gateway (`https://mcp.baydeep.com/mcp`, MCP Streamable HTTP)
3. Exposes **9 tools** to your agent:

| Tool | Key | What it does |
|---|---|---|
| `mint_free_key` | **no key** | Self-serve a free API key in-session (agent never leaves the protocol channel) |
| `shelf_search` / `shelf_item` | **no key** | Search the curated local shelf (quota-free) |
| `search_products` | key | LIVE AliExpress search (100M+ pool, sort/filters, target currency/country) |
| `hot_products` | key | AliExpress hot-selling items (Advanced API) |
| `product_detail` | key | Full detail for up to 10 product ids |
| `convert_link` | key | Convert any aliexpress.com URL into **your attributed s.click buy link** |
| `affiliate_orders` | key | Your attributed orders + per-order `share_eligible`/`share_amount` + page `share_summary` |
| `categories` | key | AliExpress category tree |

## How commission works

1. `mint_free_key` gives you a key + a **dedicated tracking_id** (per-developer attribution)
2. Every buy link you present via `convert_link` carries your tracking_id
3. `affiliate_orders` returns orders filtered to your key, each with `share_eligible` / `share_amount`, plus a page `share_summary` — the monthly settlement dataset
4. Keyless (no key) still works for read-only shelf search — but links are unattributed (no commission)

## Config (all optional)

| Field | Env | Default | Meaning |
|---|---|---|---|
| `apiKey` | `BAYDEEP_API_KEY` | auto-minted | Pin your own key (skip local cache) |
| `url` | — | `https://mcp.baydeep.com/mcp` | Gateway URL (point to `http://127.0.0.1:8787/mcp` for local dev) |
| `serverName` | — | `baydeep` | MCP server name exposed to the harness |
| `toolCallTimeoutMs` | — | `30000` | Per tool-call timeout |
| `failOnStartupError` | — | `false` | Fail harness boot if the gateway is unreachable |

## Policies (hard lines)

- Never recommend medicines / give medical advice
- Never present commissions as consumer "cashback/rebate" — your share is business revenue
- Users always pay on AliExpress directly; agents never touch money

## License

MIT
