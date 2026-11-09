import * as McpClient from '@deepseek-ai/dsh-mcp-client'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import crypto from 'node:crypto'

const VERSION = '0.1.0'
// Channel UA: the gateway records mcp_calls per UA so the BayDeep console can attribute
// installs coming from the DSH plugin distribution channel.
const UA = `dsh-plugin-baydeep/${VERSION} (+https://github.com/baydeep/dsh-plugin-baydeep; DeepSeek-Harness)`
const TRIAL_URL = 'https://mcp.baydeep.com/v1/trial'
const MCP_URL = 'https://mcp.baydeep.com/mcp'
const KEY_FILE = path.join(os.homedir() || os.tmpdir(), '.dsh-baydeep-key.json')
// Install-level anonymous id (default_client_ref): stored with the key at mint time, then
// echoed back on your attributed orders so you can reward your own end-users. Only a hash
// is kept locally; no personal information is uploaded.
const machineRef = 'dsh-' + crypto.createHash('sha256')
  .update(`${os.hostname() || 'host'}|${(function () { try { return os.userInfo().username } catch { return '' } })()}`)
  .digest('hex').slice(0, 12)

/**
 * Zero-config: auto-mint a free API key (POST /v1/trial — no signup, never expires,
 * unlocks ALL tools) and cache it locally. With a key you get live AliExpress fan-out
 * (100M+ items), attributed s.click buy links and per-install commission tracking.
 * Without a key the plugin still works keyless (local shelf search, no attribution).
 * Pin your own key via config.apiKey or env BAYDEEP_API_KEY to skip local caching.
 */
async function ensureApiKey(config) {
  const configured = config.apiKey || process.env.BAYDEEP_API_KEY || ''
  if (configured) return { key: configured, source: 'config' }
  try {
    const j = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))
    if (j && typeof j.key === 'string' && j.key.startsWith('ak_')) return { key: j.key, source: 'cache' }
  } catch { /* no cache → mint a new one */ }
  try {
    const r = await fetch(TRIAL_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'user-agent': UA },
      body: JSON.stringify({ client_ref: machineRef }),
      signal: AbortSignal.timeout(6000),
    })
    if (r.ok) {
      const j = await r.json().catch(() => null)
      if (j && typeof j.key === 'string' && j.key.startsWith('ak_')) {
        try { fs.writeFileSync(KEY_FILE, JSON.stringify({ key: j.key, agent_id: j.agent_id, minted_at: new Date().toISOString() })) } catch { /* cache failure is non-fatal */ }
        return { key: j.key, source: 'minted' }
      }
    }
  } catch { /* network/gateway unavailable → keyless fallback (read-only shelf still works) */ }
  return { key: '', source: 'keyless' }
}

/**
 * BayDeep commerce plugin for DeepSeek Harness.
 *
 * Works OUT OF THE BOX: if no apiKey is configured, the plugin auto-mints a free key
 * (no signup, never expires) and caches it at ~/.dsh-baydeep-key.json — unlocking live
 * AliExpress search (100M+ items, 200+ ship-to countries), attributed s.click buy links
 * and per-install commission tracking (3% developer share on eligible purchases).
 * Pin your own key via config.apiKey or env BAYDEEP_API_KEY to skip local caching.
 * Alternatively call the `mint_free_key` MCP tool in-session — same effect, no HTTP.
 *
 * Config (all optional): apiKey, url, serverName, toolCallTimeoutMs, failOnStartupError
 */
export async function apply(ctx, config = {}) {
  const { key, source } = await ensureApiKey(config)
  const headers = {
    'user-agent': UA,
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  }
  const clientConfig = McpClient.Config({
    transport: 'streamable-http',
    serverName: config.serverName || 'baydeep',
    url: config.url || MCP_URL,
    headers,
    toolCallTimeoutMs: config.toolCallTimeoutMs ?? 30000,
    failOnStartupError: config.failOnStartupError ?? false,
  })
  const p = ctx.plugin(McpClient, clientConfig)
  if (!key) {
    console.log('[dsh-plugin-baydeep] running KEYLESS (read-only shelf search, no commission). ' +
      'Call the mint_free_key MCP tool in-session (no signup, never expires) or set env BAYDEEP_API_KEY — ' +
      'unlocks live AliExpress search, attributed buy links & 3% commission. Pass client_ref to tag your end-users and reward them yourself.')
  } else if (source === 'minted') {
    console.log(`[dsh-plugin-baydeep/${VERSION}] auto-minted a free API key (cached at ${KEY_FILE}). ` +
      'Commissions earned by this install are tracked per tracking_id — bind a developer account when the settlement console ships to withdraw.')
  }
  return p
}
