# openclaw-notion-plugin

Notion workspace integration for AI agents. Search, create, and manage pages, databases, and content blocks via the Notion API.

Compatible with [Finch](https://github.com/mattstvartak/finch-core) and [OpenClaw](https://github.com/openclaw).

## Tools

| Tool | Description |
|------|-------------|
| `notion_search` | Search across all pages and databases the integration can access |
| `notion_get_page` | Get a page by ID with all properties and content blocks |
| `notion_create_page` | Create a new page in a database or as a child of another page |
| `notion_update_page` | Update page properties, title, icon, or archive/unarchive |
| `notion_query_database` | Query a database with filters, sorting, and pagination |
| `notion_list_databases` | List all databases the integration has access to |
| `notion_get_database` | Get a database's schema -- column names, types, select options |
| `notion_create_database` | Create a new database with custom columns under a page |
| `notion_append_blocks` | Append text content to an existing page or block |

## Setup

### 1. Create a Notion Integration

1. Go to [notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Click "New integration"
3. Name it (e.g., "Finch" or "AI Agent")
4. Select the workspace
5. Copy the API key (starts with `secret_` or `ntn_`)

### 2. Connect Pages and Databases

The integration can only access pages you explicitly share with it:

1. Open a page or database in Notion
2. Click "Share" (top right)
3. Click "Invite"
4. Select your integration from the list

Repeat for every page/database you want the agent to access. Child pages inherit access from their parent.

### 3. Set the API Key

**Finch:**
Add to `~/.finch/config.env`:
```
NOTION_API_KEY=secret_xxxxx
```

**OpenClaw:**
Set as an environment variable or in your config:
```
NOTION_API_KEY=secret_xxxxx
```

### 4. Install the Plugin

**Finch:**
```bash
git clone https://github.com/mattstvartak/openclaw-notion-plugin.git
cp -r openclaw-notion-plugin ~/.finch/plugins/
finch gateway restart
```

**OpenClaw:**
Place in your plugins directory.

## Build from Source

```bash
git clone https://github.com/mattstvartak/openclaw-notion-plugin.git
cd openclaw-notion-plugin
npm install
npm run build
```

## Usage Examples

### Search for a page
The agent calls `notion_search` with a query string. Results include page IDs, titles, and URLs.

### Create a task in a database
1. Agent calls `notion_get_database` to inspect the schema (column names and types)
2. Agent calls `notion_create_page` with the database ID and matching properties

### Add content to a page
Agent calls `notion_append_blocks` with the page ID and text content. Double newlines in the content create separate paragraph blocks.

### Query a project tracker
Agent calls `notion_query_database` with a filter like `{"property":"Status","status":{"equals":"In Progress"}}` to get all active tasks.

## API Reference

### Filters (for notion_query_database)

Filters follow the [Notion filter format](https://developers.notion.com/reference/post-database-query-filter):

```json
{"property": "Status", "status": {"equals": "Done"}}
{"property": "Priority", "number": {"greater_than": 3}}
{"property": "Tags", "multi_select": {"contains": "urgent"}}
{"and": [{"property": "Status", "status": {"equals": "In Progress"}}, {"property": "Assignee", "people": {"is_not_empty": true}}]}
```

### Properties (for notion_create_page)

Properties JSON maps column names to Notion property values:

```json
{
  "Status": {"status": {"name": "In Progress"}},
  "Priority": {"number": 5},
  "Tags": {"multi_select": [{"name": "feature"}, {"name": "v2"}]},
  "Due Date": {"date": {"start": "2026-04-15"}}
}
```

### Page IDs

You can pass either:
- A raw page ID: `abc123def456`
- A full Notion URL: `https://notion.so/My-Page-abc123def456` (the ID is extracted automatically)

## Architecture

```
src/
  api/
    client.ts       -- HTTP client for Notion API (GET, POST, PATCH, DELETE)
    types.ts        -- TypeScript interfaces for Notion objects
  tools/
    search.ts       -- notion_search
    get-page.ts     -- notion_get_page
    create-page.ts  -- notion_create_page
    update-page.ts  -- notion_update_page
    query-database.ts   -- notion_query_database
    list-databases.ts   -- notion_list_databases
    get-database.ts     -- notion_get_database
    create-database.ts  -- notion_create_database
    append-blocks.ts    -- notion_append_blocks
  utils/
    format.ts       -- Rich text builders, plain text extractors, block helpers
    validation.ts   -- API key validation
  plugin.ts         -- Plugin entry point, tool registration, skill guidance
  index.ts          -- Re-export
```

## Limitations

- The integration can only access pages/databases explicitly shared with it
- Rich text blocks are limited to 2000 characters each (automatically chunked)
- Notion API rate limit: 3 requests per second
- File uploads and embeds are not supported (Notion API limitation)
- Comments API is not included (can be added)

## License

MIT
