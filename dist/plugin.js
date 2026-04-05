import { NotionApiError } from './api/client.js';
import { validateKey } from './utils/validation.js';
import * as search from './tools/search.js';
import * as getPage from './tools/get-page.js';
import * as createPage from './tools/create-page.js';
import * as updatePage from './tools/update-page.js';
import * as queryDatabase from './tools/query-database.js';
import * as listDatabases from './tools/list-databases.js';
import * as getDatabase from './tools/get-database.js';
import * as createDatabase from './tools/create-database.js';
import * as appendBlocks from './tools/append-blocks.js';
function textResult(text) {
    return { content: [{ type: 'text', text }] };
}
function jsonResult(data) {
    return textResult(JSON.stringify(data, null, 2));
}
const SKILL_GUIDANCE = `## Notion Plugin - Workflow Guide

**Finding content:**
1. notion_search - search across all pages and databases
2. notion_list_databases - see all available databases
3. notion_get_database - inspect a database's schema (columns and types)

**Reading content:**
1. notion_get_page - get a page with its properties and content
2. notion_query_database - query a database with filters and sorting

**Creating content:**
1. notion_create_database - create a new database with custom columns
2. notion_create_page - add a page to a database or as a child of another page
3. notion_append_blocks - add content to an existing page

**Updating content:**
1. notion_update_page - change properties, title, or archive status

**Rules:**
- Always check the database schema with notion_get_database before creating or querying pages.
- Page IDs from URLs need the hyphens removed.
- Rich text content is limited to 2000 chars per block.
- The integration must be connected to pages/databases to access them.
- Property names in filters must match exactly (case-sensitive).`;
const tools = [
    search,
    getPage,
    createPage,
    updatePage,
    queryDatabase,
    listDatabases,
    getDatabase,
    createDatabase,
    appendBlocks,
];
const plugin = {
    id: 'openclaw-notion',
    name: 'Notion',
    description: 'Notion workspace integration. Search, create, and manage pages, databases, and content blocks.',
    register(api) {
        const pluginConfig = api.pluginConfig ?? {};
        const config = {
            apiKey: pluginConfig.apiKey || process.env.NOTION_API_KEY || '',
        };
        const keyError = validateKey(config);
        if (!keyError) {
            api.logger?.info('Notion plugin registered');
        }
        else {
            api.logger?.warn(`Notion plugin: ${keyError}`);
        }
        for (const tool of tools) {
            api.registerTool({
                name: tool.definition.name,
                label: tool.definition.label,
                description: tool.definition.description,
                parameters: tool.definition.parameters,
                async execute(_id, params) {
                    const err = validateKey(config);
                    if (err)
                        return textResult(`Error: ${err}`);
                    try {
                        const result = await tool.execute(config, params);
                        return jsonResult(result);
                    }
                    catch (e) {
                        if (e instanceof NotionApiError) {
                            let msg = `Notion error: ${e.message}`;
                            if (e.code === 'object_not_found') {
                                msg += ' Make sure the integration is connected to this page/database.';
                            }
                            if (e.code === 'validation_error') {
                                msg += ' Check property names and value types against the database schema.';
                            }
                            return textResult(msg);
                        }
                        return textResult(`Error: ${e.message}`);
                    }
                },
            }, { name: tool.definition.name });
        }
        api.on('before_prompt_build', async () => ({
            prependSystemContext: SKILL_GUIDANCE,
        }));
    },
};
export default plugin;
//# sourceMappingURL=plugin.js.map