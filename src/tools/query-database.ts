import { Type } from '@sinclair/typebox';
import { notionPost } from '../api/client.js';
import type { NotionConfig } from '../api/types.js';
import { extractPageTitle } from '../utils/format.js';

export const definition = {
  name: 'notion_query_database',
  label: 'Query Notion Database',
  description: 'Query a database with optional filters and sorting. Returns matching pages.',
  parameters: Type.Object({
    databaseId: Type.String({ description: 'The database ID to query.' }),
    filter: Type.Optional(Type.String({ description: 'Filter as JSON string (Notion filter object). Example: {"property":"Status","status":{"equals":"In Progress"}}' })),
    sort: Type.Optional(Type.String({ description: 'Sort as JSON string. Example: {"property":"Created","direction":"descending"}' })),
    limit: Type.Optional(Type.Number({ description: 'Max results (1-100). Default: 20.', minimum: 1, maximum: 100 })),
  }),
};

export async function execute(
  config: NotionConfig,
  params: { databaseId: string; filter?: string; sort?: string; limit?: number },
) {
  const body: Record<string, any> = {
    page_size: params.limit ?? 20,
  };

  if (params.filter) {
    try { body.filter = JSON.parse(params.filter); } catch {}
  }
  if (params.sort) {
    try {
      const sortObj = JSON.parse(params.sort);
      body.sorts = Array.isArray(sortObj) ? sortObj : [sortObj];
    } catch {}
  }

  const id = params.databaseId.replace(/-/g, '');
  const result = await notionPost(config, `/v1/databases/${id}/query`, body);

  return {
    count: result.results.length,
    has_more: result.has_more,
    pages: result.results.map((p: any) => {
      const props: Record<string, any> = {};
      for (const [key, val] of Object.entries(p.properties) as [string, any][]) {
        if (val.type === 'title') props[key] = val.title?.map((t: any) => t.plain_text).join('');
        else if (val.type === 'rich_text') props[key] = val.rich_text?.map((t: any) => t.plain_text).join('');
        else if (val.type === 'number') props[key] = val.number;
        else if (val.type === 'select') props[key] = val.select?.name;
        else if (val.type === 'multi_select') props[key] = val.multi_select?.map((s: any) => s.name);
        else if (val.type === 'date') props[key] = val.date;
        else if (val.type === 'checkbox') props[key] = val.checkbox;
        else if (val.type === 'status') props[key] = val.status?.name;
        else if (val.type === 'url') props[key] = val.url;
        else props[key] = `(${val.type})`;
      }
      return {
        id: p.id,
        url: p.url,
        title: extractPageTitle(p.properties),
        properties: props,
        lastEdited: p.last_edited_time,
      };
    }),
  };
}
