import { Type } from '@sinclair/typebox';
import { notionPost } from '../api/client.js';
import { extractPageTitle, plainText } from '../utils/format.js';
export const definition = {
    name: 'notion_search',
    label: 'Search Notion',
    description: 'Search across all pages and databases the integration has access to.',
    parameters: Type.Object({
        query: Type.String({ description: 'Search query text.' }),
        filter: Type.Optional(Type.Union([
            Type.Literal('page'),
            Type.Literal('database'),
        ], { description: 'Filter results by type.' })),
        limit: Type.Optional(Type.Number({ description: 'Max results (1-100). Default: 10.', minimum: 1, maximum: 100 })),
    }),
};
export async function execute(config, params) {
    const body = {
        query: params.query,
        page_size: params.limit ?? 10,
    };
    if (params.filter) {
        body.filter = { value: params.filter, property: 'object' };
    }
    const result = await notionPost(config, '/v1/search', body);
    return {
        count: result.results.length,
        has_more: result.has_more,
        results: result.results.map((r) => ({
            id: r.id,
            type: r.object,
            title: r.object === 'page'
                ? extractPageTitle(r.properties)
                : plainText(r.title),
            url: r.url,
            last_edited: r.last_edited_time,
        })),
    };
}
//# sourceMappingURL=search.js.map