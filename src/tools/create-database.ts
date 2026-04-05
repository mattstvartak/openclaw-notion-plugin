import { Type } from '@sinclair/typebox';
import { notionPost } from '../api/client.js';
import type { NotionConfig } from '../api/types.js';
import { richText, plainText } from '../utils/format.js';

export const definition = {
  name: 'notion_create_database',
  label: 'Create Notion Database',
  description: 'Create a new database as a child of a page. Define columns (properties) and their types.',
  parameters: Type.Object({
    parentPageId: Type.String({ description: 'The parent page ID where the database will live.' }),
    title: Type.String({ description: 'Database title.' }),
    properties: Type.String({
      description: 'Database schema as JSON string. Keys are column names, values are type configs. Example: {"Name":{"title":{}},"Status":{"select":{"options":[{"name":"Todo"},{"name":"Done"}]}},"Priority":{"number":{}}}'
    }),
    icon: Type.Optional(Type.String({ description: 'Emoji icon.' })),
  }),
};

export async function execute(
  config: NotionConfig,
  params: { parentPageId: string; title: string; properties: string; icon?: string },
) {
  let properties: Record<string, any>;
  try {
    properties = JSON.parse(params.properties);
  } catch {
    throw new Error('Invalid properties JSON. Must be an object with column names as keys.');
  }

  // Ensure there's a title property
  const hasTitle = Object.values(properties).some((p: any) => p.title !== undefined);
  if (!hasTitle) {
    properties['Name'] = { title: {} };
  }

  const body: Record<string, any> = {
    parent: { page_id: params.parentPageId.replace(/-/g, '') },
    title: [{ type: 'text', text: { content: params.title } }],
    properties,
  };

  if (params.icon) {
    body.icon = { type: 'emoji', emoji: params.icon };
  }

  const db = await notionPost(config, '/v1/databases', body);

  return {
    id: db.id,
    title: plainText(db.title),
    url: db.url,
    properties: Object.fromEntries(
      Object.entries(db.properties).map(([key, val]: [string, any]) => [key, val.type]),
    ),
  };
}
