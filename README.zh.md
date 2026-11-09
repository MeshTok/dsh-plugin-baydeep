# dsh-plugin-baydeep

**DeepSeek Harness 电商插件 / MCP server** —— 给你的 AI agent 加上速卖通（AliExpress）联盟电商能力：1.2 亿+ 商品实时搜索、热销榜、带归因的 s.click 购买链接、佣金订单查询。发货覆盖 200+ 国家地区。**零注册**：首次运行自动领取免费 API key（免注册、永不过期）。

> 给 agent 开发者：接入即获变现能力——符合条件的成交，开发者拿 3% 分成（商品佣金率 >3%）。

## 快速开始

通过 DSH Market / awesome-dsh-plugins 安装，或手动：

```bash
npm install dsh-plugin-baydeep
```

无需任何配置。首次运行时插件会：

1. **自动领取免费 API key**（`POST https://mcp.baydeep.com/v1/trial`，免注册、永不过期），缓存在 `~/.dsh-baydeep-key.json`
2. 连接 BayDeep MCP 网关（`https://mcp.baydeep.com/mcp`，MCP Streamable HTTP）
3. 向你的 agent 暴露 **9 个工具**：

| 工具 | 需要 key? | 能力 |
|---|---|---|
| `mint_free_key` | **不需要** | 在 MCP 会话内直接自助领 key（agent 不出协议通道） |
| `shelf_search` / `shelf_item` | 不需要 | 搜索本地精选货架（不烧平台配额） |
| `search_products` | 需要 | 速卖通实时搜索（1.2 亿商品池，排序/币种/目的国） |
| `hot_products` | 需要 | 速卖通热销榜（Advanced API） |
| `product_detail` | 需要 | 批量商品详情（一次最多 10 个） |
| `convert_link` | 需要 | 把任意 aliexpress.com 链接转成**带你归因的 s.click 购买链接** |
| `affiliate_orders` | 需要 | 你的归因订单 + 每笔 `share_eligible`/`share_amount` + 页级 `share_summary` |
| `categories` | 需要 | 速卖通类目树 |

## 佣金怎么算

1. `mint_free_key` 给你 key + 一个**专属 tracking_id**（按开发者归因）
2. `convert_link` 生成的每条购买链接都带你的 tracking_id
3. `affiliate_orders` 返回按你 key 回滤的订单，每笔带 `share_eligible`/`share_amount`，页尾 `share_summary`——月结数据源
4. 无 key 也可用（只读货架搜索），但链接不带归因（无佣金）

## 配置（全部可选）

| 字段 | 环境变量 | 默认 | 说明 |
|---|---|---|---|
| `apiKey` | `BAYDEEP_API_KEY` | 自动领取 | 固定使用自己的 key（跳过本地缓存） |
| `url` | — | `https://mcp.baydeep.com/mcp` | 网关地址（本地开发指向 `http://127.0.0.1:8787/mcp`） |
| `serverName` | — | `baydeep` | 暴露给 harness 的 MCP server 名 |
| `toolCallTimeoutMs` | — | `30000` | 单次工具调用超时 |
| `failOnStartupError` | — | `false` | 网关不可达时是否阻塞启动 |

## 硬性政策

- 永不推荐药品/提供用药建议
- 永不向消费者出现"返现/返利"话术——分成是开发者的经营收入
- 用户始终在速卖通直接付款；agent 永不碰钱

## License

MIT
