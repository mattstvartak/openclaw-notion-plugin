import { Type } from '@sinclair/typebox';
import { notionGet } from '../api/client.js';
import type { NotionConfig } from '../api/types.js';
import { plainText } from '../utils/format.js';

export const definition = {
  name: 'notion_get_database',
  label: 'Get Notion Database',
  description: 'Get a database\'s schema (properties and their types). Useful before creating pages or querying.',
  parameters: Type.Object({
    databaseId: Type.String({ description: 'The database ID.' }),
  }),
};

export async function execute(
  config: NotionConfig,
  params: { databaseId: string },
) {
  const id = params.databaseId.replace(/-/g, '');
  const db = await notionGet(config, `/v1/databases/${id}`);

  const properties: Record<string, any> = {};
  for (const [key, val] of Object.entries(db.properties) as [string, any][]) {
    const prop: Record<string, any> = { type: val.type };
    if (val.type === 'select' && val.select?.options) {
      prop.options = val.select.options.map((o: any) => o.name);
    }
    if (val.type === 'multi_select' && val.multi_select?.options) {
      prop.options = val.multi_select.options.map((o: any) => o.name);
    }
    if (val.type === 'status' && val.status?.options) {
      prop.options = val.status.options.map((o: any) => o.name);
    }
    properties[key] = prop;
  }

  return {
    id: db.id,
    title: plainText(db.title),
    description: plainText(db.description),
    url: db.url,
    properties,
    archived: db.archived,
  };
}
