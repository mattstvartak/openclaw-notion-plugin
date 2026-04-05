import { Type } from '@sinclair/typebox';
import { notionGet } from '../api/client.js';
import { extractPageTitle, extractBlockText } from '../utils/format.js';
export const definition = {
    name: 'notion_get_page',
    label: 'Get Notion Page',
    description: 'Get a page by ID, including its properties and content blocks.',
    parameters: Type.Object({
        pageId: Type.String({ description: 'The Notion page ID or URL.' }),
        includeContent: Type.Optional(Type.Boolean({ description: 'Also fetch page content blocks. Default: true.' })),
    }),
};
function extractId(input) {
    // Handle full URLs: https://notion.so/Page-Title-abc123def456...
    const urlMatch = input.match(/([a-f0-9]{32}|[a-f0-9-]{36})(?:\?|$)/);
    if (urlMatch)
        return urlMatch[1];
    // Already an ID
    return input.replace(/-/g, '');
}
export async function execute(config, params) {
    const id = extractId(params.pageId);
    const page = await notionGet(config, `/v1/pages/${id}`);
    const result = {
        id: page.id,
        title: extractPageTitle(page.properties),
        url: page.url,
        created: page.created_time,
        lastEdited: page.last_edited_time,
        archived: page.archived,
        properties: Object.fromEntries(Object.entries(page.properties).map(([key, prop]) => {
            const val = prop;
            if (val.type === 'title')
                return [key, { type: 'title', value: val.title?.map((t) => t.plain_text).join('') }];
            if (val.type === 'rich_text')
                return [key, { type: 'rich_text', value: val.rich_text?.map((t) => t.plain_text).join('') }];
            if (val.type === 'number')
                return [key, { type: 'number', value: val.number }];
            if (val.type === 'select')
                return [key, { type: 'select', value: val.select?.name }];
            if (val.type === 'multi_select')
                return [key, { type: 'multi_select', value: val.multi_select?.map((s) => s.name) }];
            if (val.type === 'date')
                return [key, { type: 'date', value: val.date }];
            if (val.type === 'checkbox')
                return [key, { type: 'checkbox', value: val.checkbox }];
            if (val.type === 'url')
                return [key, { type: 'url', value: val.url }];
            if (val.type === 'email')
                return [key, { type: 'email', value: val.email }];
            if (val.type === 'phone_number')
                return [key, { type: 'phone', value: val.phone_number }];
            if (val.type === 'status')
                return [key, { type: 'status', value: val.status?.name }];
            return [key, { type: val.type }];
        })),
    };
    if (params.includeContent !== false) {
        const blocks = await notionGet(config, `/v1/blocks/${id}/children`, { page_size: 100 });
        result.content = blocks.results.map((b) => ({
            id: b.id,
            type: b.type,
            text: extractBlockText(b),
            hasChildren: b.has_children,
        }));
    }
    return result;
}
//# sourceMappingURL=get-page.js.map