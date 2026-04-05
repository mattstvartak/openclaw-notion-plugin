import { Type } from '@sinclair/typebox';
import { notionPost } from '../api/client.js';
import type { NotionConfig } from '../api/types.js';
import { plainText } from '../utils/format.js';

export const definition = {
  name: 'notion_list_databases',
  label: 'List Notion Databases',
  description: 'List all databases the integration has access to.',
  parameters: Type.Object({
    limit: Type.Optional(Type.Number({ description: 'Max results (1-100). Default: 20.', minimum: 1, maximum: 100 })),
  }),
};

export async function execute(
  config: NotionConfig,
  params: { limit?: number },
) {
  const result = await notionPost(config, '/v1/search', {
    filter: { value: 'database', property: 'object' },
    page_size: params.limit ?? 20,
  });

  return {
    count: result.results.length,
    databases: result.results.map((db: any) => ({
      id: db.id,
      title: plainText(db.title),
      description: plainText(db.description),
      url: db.url,
      properties: Object.fromEntries(
        Object.entries(db.properties).map(([key, val]: [string, any]) => [key, val.type]),
      ),
      lastEdited: db.last_edited_time,
    })),
  };
}
