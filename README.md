# openclaw-notion-plugin

Notion workspace integration for OpenClaw and Finch. Search, create, and manage pages, databases, and content blocks via the Notion API.

## Tools

| Tool | Description |
|------|-------------|
| `notion_search` | Search across all pages and databases |
| `notion_get_page` | Get page with properties and content blocks |
| `notion_create_page` | Create page in a database or under another page |
| `notion_update_page` | Update properties, title, or archive status |
| `notion_query_database` | Query with filters and sorting |
| `notion_list_databases` | List all accessible databases |
| `notion_get_database` | Get schema (columns, types, select options) |
| `notion_create_database` | Create database with custom columns |
| `notion_append_blocks` | Append content to an existing page |

## Prerequisites

1. Create a Notion integration at https://www.notion.so/my-integrations
2. Copy the API key (starts with `secret_` or `ntn_`)
3. Connect the integration to your Notion pages/databases (Share > Invite > select your integration)

## Install

### Finch

```bash
cp -r . ~/.finch/plugins/openclaw-notion-plugin/
# Add to ~/.finch/config.env:
# NOTION_API_KEY=secret_xxxxx
finch gateway restart
```

### OpenClaw

Place in your plugins directory. Set `NOTION_API_KEY` in your environment or config.

## Build

```bash
npm install
npm run build
```

## Compatibility

- Finch (OpenClaw plugin format with `register(api)`)
- OpenClaw (plugin API v2026.3.0+)

## License

MIT
