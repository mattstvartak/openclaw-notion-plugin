export function validateKey(config) {
    if (!config.apiKey) {
        return 'NOTION_API_KEY is not set. Create an integration at https://www.notion.so/my-integrations';
    }
    if (!config.apiKey.startsWith('secret_') && !config.apiKey.startsWith('ntn_')) {
        return 'NOTION_API_KEY looks invalid. Should start with "secret_" or "ntn_".';
    }
    return null;
}
//# sourceMappingURL=validation.js.map