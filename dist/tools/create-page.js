import { Type } from '@sinclair/typebox';
import { notionPost } from '../api/client.js';
import { richText, textToBlocks } from '../utils/format.js';
export const definition = {
    name: 'notion_create_page',
    label: 'Create Notion Page',
    description: 'Create a new page in a database or as a child of another page.',
    parameters: Type.Object({
        parentId: Type.String({ description: 'Parent database ID or page ID.' }),
        parentType: Type.Optional(Type.Union([
            Type.Literal('database'),
            Type.Literal('page'),
        ], { description: 'Parent type. Default: database.' })),
        title: Type.String({ description: 'Page title.' }),
        content: Type.Optional(Type.String({ description: 'Page body content (plain text, split into paragraphs on double newlines).' })),
        properties: Type.Optional(Type.String({ description: 'Additional properties as JSON string. Keys are property names, values depend on type.' })),
        icon: Type.Optional(Type.String({ description: 'Emoji icon for the page (e.g., "📋").' })),
    }),
};
export async function execute(config, params) {
    const parentType = params.parentType ?? 'database';
    const parent = parentType === 'database'
        ? { database_id: params.parentId.replace(/-/g, '') }
        : { page_id: params.parentId.replace(/-/g, '') };
    const body = {
        parent,
        properties: {
            title: { title: richText(params.title) },
        },
    };
    // Merge additional properties
    if (params.properties) {
        try {
            const extra = JSON.parse(params.properties);
            Object.assign(body.properties, extra);
        }
        catch { }
    }
    if (params.icon) {
        body.icon = { type: 'emoji', emoji: params.icon };
    }
    if (params.content) {
        body.children = textToBlocks(params.content);
    }
    const page = await notionPost(config, '/v1/pages', body);
    return {
        id: page.id,
        url: page.url,
        title: params.title,
        created: page.created_time,
    };
}
//# sourceMappingURL=create-page.js.map