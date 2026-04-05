import { Type } from '@sinclair/typebox';
import { notionPatch } from '../api/client.js';
import type { NotionConfig } from '../api/types.js';
import { richText } from '../utils/format.js';

export const definition = {
  name: 'notion_update_page',
  label: 'Update Notion Page',
  description: 'Update a page\'s properties (title, status, etc.) or archive/unarchive it.',
  parameters: Type.Object({
    pageId: Type.String({ description: 'The page ID to update.' }),
    title: Type.Optional(Type.String({ description: 'New title.' })),
    properties: Type.Optional(Type.String({ description: 'Properties to update as JSON string.' })),
    archived: Type.Optional(Type.Boolean({ description: 'Set to true to archive, false to unarchive.' })),
    icon: Type.Optional(Type.String({ description: 'New emoji icon.' })),
  }),
};

export async function execute(
  config: NotionConfig,
  params: {
    pageId: string;
    title?: string;
    properties?: string;
    archived?: boolean;
    icon?: string;
  },
) {
  const body: Record<string, any> = {};

  const props: Record<string, any> = {};
  if (params.title) {
    props.title = { title: richText(params.title) };
  }
  if (params.properties) {
    try {
      Object.assign(props, JSON.parse(params.properties));
    } catch {}
  }
  if (Object.keys(props).length > 0) body.properties = props;
  if (params.archived !== undefined) body.archived = params.archived;
  if (params.icon) body.icon = { type: 'emoji', emoji: params.icon };

  const page = await notionPatch(config, `/v1/pages/${params.pageId.replace(/-/g, '')}`, body);

  return {
    id: page.id,
    url: page.url,
    lastEdited: page.last_edited_time,
    archived: page.archived,
  };
}
