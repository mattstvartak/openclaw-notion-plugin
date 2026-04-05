import type { NotionConfig } from '../api/types.js';

export function validateKey(config: NotionConfig): string | null {
  if (!config.apiKey) {
    return 'NOTION_API_KEY is not set. Create an integration at https://www.notion.so/my-integrations';
  }
  if (!config.apiKey.startsWith('secret_') && !config.apiKey.startsWith('ntn_')) {
    return 'NOTION_API_KEY looks invalid. Should start with "secret_" or "ntn_".';
  }
  return null;
}
