# Add fn/7 to your tools

One small file per tool, each holding the exact setting that tool reads to reach fn/7's remote MCP server.

**Not live yet.** The server at `https://fn7.ai/mcp` ships in milestone M5. Every snippet here is checked against the tool's own documentation, and connects once the server is live. Until then a tool that tries the URL will report that it could not connect. JSON cannot hold a comment, so this note stands for every `.json` file in this folder.

The server speaks MCP over Streamable HTTP and signs agents in with OAuth 2.1. No snippet contains a key, and none needs one.

Everything below was read on **24 November 2026**. The same data, typed, is in [`lib/install.ts`](../lib/install.ts), which the `/install` page reads.

## The tools

| Tool | How to add fn/7 | File here | Where it goes | Checked against |
| --- | --- | --- | --- | --- |
| Claude Code | The fn/7 plugin: `/plugin marketplace add erickdronski/fn7`, then `/plugin install fn7@fn7`. Or the server alone: `claude mcp add --transport http fn7 https://fn7.ai/mcp`. Sign in with `/mcp`. | [`claude-code/mcp.json`](claude-code/mcp.json), and the plugin in [`../plugins/fn7`](../plugins/fn7) | `.mcp.json` at the project root, for the server alone | [Create a marketplace](https://code.claude.com/docs/en/plugin-marketplaces), [Install plugins](https://code.claude.com/docs/en/plugins/install), [Manifest reference](https://code.claude.com/docs/en/plugins-reference), [MCP](https://code.claude.com/docs/en/mcp). Also `claude plugin validate`, Claude Code 2.1.310: passed. |
| Claude (desktop and claude.ai) | **Customize > Connectors > + Add > Add custom connector**. Name it, paste the URL, pick how to sign in, **Add**. On Team and Enterprise an Owner adds it under **Organization settings > Connectors**. In a chat: **+ > Connectors**. | None. The only value is the URL. | The Remote MCP server URL field | [Custom connectors using remote MCP](https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp), [Plugin structure](https://claude.com/docs/plugins/build) |
| Codex CLI | `codex mcp add fn7 --url https://fn7.ai/mcp`, then `codex mcp login fn7`. Or paste the table. | [`codex/config.toml`](codex/config.toml) | `~/.codex/config.toml`, or `.codex/config.toml` in a trusted project | [Codex: Model Context Protocol](https://developers.openai.com/codex/mcp). Also `codex mcp add --help`, codex-cli 0.156.1. |
| ChatGPT | **chatgpt.com/plugins > + > Add custom MCP server**. Name and describe it, paste the URL under **Connection**, set up sign-in, accept the risk notice, **Create as a plugin**. In a chat: type `@` and pick it. Account and workspace policies apply. | None. The only value is the URL. | The MCP server URL field | [Connect and test your plugin](https://developers.openai.com/apps-sdk/deploy/connect-chatgpt) |
| Cursor | Paste the JSON, or open the install link below. Cursor signs in with OAuth. | [`cursor/mcp.json`](cursor/mcp.json) | `.cursor/mcp.json` in a project, or `~/.cursor/mcp.json` for every project | [Cursor: MCP](https://cursor.com/docs/context/mcp), [MCP install links](https://cursor.com/docs/context/mcp/install-links) |
| Visual Studio Code with GitHub Copilot | Run **MCP: Add Server**, choose **HTTP**, enter the URL and the ID `fn7`. Or paste the JSON. | [`vscode/mcp-config.json`](vscode/mcp-config.json) (current), [`vscode/mcp.json`](vscode/mcp.json) (older) | Current: `~/.copilot/mcp-config.json` (the **Copilot Global** destination), key `mcpServers`. Older: `.vscode/mcp.json`, key `servers`. | [MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration), [Use MCP servers](https://code.visualstudio.com/docs/copilot/customization/mcp-servers) |
| Windsurf (Devin Desktop since 2 June 2026) | In Cascade's MCP menu choose **Open MCP config file**, paste the JSON, then refresh. | [`windsurf/mcp_config.json`](windsurf/mcp_config.json) | The file that action opens: `~/.config/devin/mcp_config.json` on macOS and Linux | [Windsurf Cascade MCP configuration](https://docs.devin.ai/windsurf/plugins/cascade/mcp), [Devin Desktop FAQ](https://docs.devin.ai/desktop/devin-desktop-faq) |
| Gemini CLI | `gemini mcp add --transport http fn7 https://fn7.ai/mcp`, then `/mcp auth fn7`. Or paste the JSON. | [`gemini/settings.json`](gemini/settings.json) | `~/.gemini/settings.json`, or `.gemini/settings.json` in a project | [Gemini CLI: MCP servers](https://geminicli.com/docs/tools/mcp-server/) |
| Antigravity CLI | Paste the JSON, then type `/mcp` to see the server. | [`antigravity/mcp_config.json`](antigravity/mcp_config.json) | `~/.gemini/config/mcp_config.json`, or `.agents/mcp_config.json` in a workspace | [Antigravity: MCP](https://antigravity.google/docs/mcp), [Moving from Gemini CLI](https://antigravity.google/docs/cli/gcli-migration) |
| Any other MCP client | Give the client the URL. If it reads an `mcpServers` file, this is the usual shape. | [`generic/mcp.json`](generic/mcp.json) | Wherever the client keeps its MCP settings | [Connect to remote MCP servers](https://modelcontextprotocol.io/docs/develop/connect-remote-servers) |

### Notes that matter

- **Cursor install link.** `cursor://anysphere.cursor-deeplink/mcp/install?name=fn7&config=eyJ1cmwiOiJodHRwczovL2ZuNy5haS9tY3AifQ==`. The `config` value is the Base64 of `{"url":"https://fn7.ai/mcp"}`, as Cursor's install-link page describes. The site shows it as text to copy, not as a button, until the server is live.
- **VS Code is mid-change.** Its docs, dated 18 November 2026, say the Local harness that reads `.vscode/mcp.json` "is deprecated and will be removed in February 2027", and to use the Copilot destinations for new setups. Both files are here. The `tools` line in the current format means "make every tool on this server available". It does not skip approvals.
- **Windsurf was renamed.** The app has been Devin Desktop since 2 June 2026. The Cascade docs still give the `serverUrl` format used here, and say a `url` field is accepted too.
- **Gemini CLI is limited.** On 18 June 2026 it stopped serving Google AI Pro and Ultra subscribers and free individual users, who were moved to Antigravity CLI. Google says it still works with paid Gemini API keys and enterprise Gemini Code Assist licenses. Antigravity CLI reads a different file and the `serverUrl` key. `httpUrl` is not accepted there. Source: [Google's notice](https://developers.googleblog.com/an-important-update-transitioning-gemini-cli-to-antigravity-cli).
- **There is no standard MCP settings file.** The `mcpServers` shape with `"type": "http"` and `"url"` is what Claude Code's `.mcp.json` and Copilot's `mcp-config.json` both read. Other clients use other key names, as the files above show. Check the client's own guide.

## Directories

Adding fn/7 by URL needs no listing anywhere. Being listed in a tool's own directory is a separate step, and two directories have rules fn/7 cannot fully meet as a market:

| Directory | The rule | The plan |
| --- | --- | --- |
| Claude's connector directory | Connectors that "transfer money, cryptocurrency, or other financial assets" are not accepted. Source: [connector pre-submission checklist](https://claude.com/docs/connectors/building/review-criteria). | A read-only connector there: search, listings and the library. Buying stays on fn7.ai, or on the full server added by URL. Whether a `checkout` from a capped balance would pass is not verified. |
| ChatGPT's plugin directory | "Currently, plugins may conduct commerce only for physical goods." Selling digital content is not allowed. Users may reach what they already own. Source: [plugin guidelines](https://developers.openai.com/apps-sdk/app-submission-guidelines). | A read-only plugin there: search, the library, and installing what you already own. Buying happens on fn7.ai. |

Both listings come after M5, once the server is stable.

## Logo rules, one line each

The site shows a tool's mark only where its owner's published rule allows that without asking first. Otherwise it shows the name as text. Each mark belongs to its owner, and none of them endorses fn/7.

| Owner | Rule | On the site |
| --- | --- | --- |
| Anthropic (Claude, Claude Code) | Marks may be used "only as specifically permitted by us and only in materials we approve beforehand", unaltered, with no implied endorsement. [Trademark guidelines](https://www.anthropic.com/legal/trademark-guidelines) | Name as text until Anthropic approves (marketing@anthropic.com). |
| OpenAI (ChatGPT, Codex) | The logo only where it relates directly to OpenAI services, exactly as provided, never more prominent than your own marks, with no implied endorsement. [Brand guidelines](https://openai.com/brand/) | Name as text. The icon set this site uses carries no OpenAI mark. |
| Cursor | The brand page offers the assets and one naming rule: "Refer to us as Cursor. Not Cursor AI or Cursor Code." It publishes no approval step. [Brand](https://cursor.com/brand) | Mark shown, unaltered. |
| Microsoft (Visual Studio Code) | The icon may point to VS Code in a tutorial or a link, but not "identify or promote your own product". Write "Visual Studio Code" on first mention. [Brand guidelines](https://code.visualstudio.com/brand) | Name as text. |
| GitHub (Copilot) | A permitted GitHub logo may tell others your project integrates with GitHub, unaltered and less prominent than your own. Whether the Copilot icon is a permitted logo: not verified. [Logo](https://brand.github.com/foundations/logo) | Name as text. |
| Cognition (Windsurf, Devin Desktop) | The Windsurf brand page lists ways not to alter the logo, and asks for contact "with a visual mockup" for any use it does not cover. [Brand](https://windsurf.com/brand) | Name as text until asked. |
| Google (Gemini, Antigravity) | Naming a product in plain text is fine. Brand elements may not imply affiliation, endorsement or sponsorship, and partner uses need a request first. A Gemini-specific logo rule: not verified. [Brand guidance](https://about.google/brand-resource-center/guidance/) | Name as text. |
| Model Context Protocol | No published logo policy found. Not verified. | Name as text. |

## Left out because it could not be verified

- A web install link for Cursor (only the `cursor://` link is documented).
- A `vscode:` install link, and `code --add-mcp` for an HTTP server (the docs show it for a stdio server only).
- An add command for Antigravity CLI (none is documented).
- Which ChatGPT plans can add a custom MCP server (the page says only that account and workspace policies apply).
- A way to add a custom MCP server to the Gemini app.
- Whether a ChatGPT plugin kept private, outside the directory, may run a purchase.
