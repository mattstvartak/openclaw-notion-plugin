const BASE_URL = 'https://api.notion.com';
const API_VERSION = '2022-06-28';
const USER_AGENT = 'openclaw-notion/1.0.0';
export class NotionApiError extends Error {
    code;
    status;
    constructor(err) {
        super(err.message);
        this.name = 'NotionApiError';
        this.code = err.code;
        this.status = err.status;
    }
}
function buildHeaders(config) {
    return {
        'Authorization': `Bearer ${config.apiKey}`,
        'Notion-Version': API_VERSION,
        'Content-Type': 'application/json',
        'User-Agent': USER_AGENT,
    };
}
export async function notionGet(config, path, params) {
    let url = `${BASE_URL}${path}`;
    if (params) {
        const qs = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null)
                qs.set(key, String(value));
        }
        const qsStr = qs.toString();
        if (qsStr)
            url += `?${qsStr}`;
    }
    const res = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(config),
    });
    return handleResponse(res);
}
export async function notionPost(config, path, data) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'POST',
        headers: buildHeaders(config),
        body: data ? JSON.stringify(data) : '{}',
    });
    return handleResponse(res);
}
export async function notionPatch(config, path, data) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'PATCH',
        headers: buildHeaders(config),
        body: data ? JSON.stringify(data) : '{}',
    });
    return handleResponse(res);
}
export async function notionDelete(config, path) {
    const res = await fetch(`${BASE_URL}${path}`, {
        method: 'DELETE',
        headers: buildHeaders(config),
    });
    return handleResponse(res);
}
async function handleResponse(res) {
    const body = await res.json();
    if (!res.ok) {
        const err = body;
        if (err?.code) {
            throw new NotionApiError(err);
        }
        throw new Error(`Notion API returned ${res.status}: ${JSON.stringify(body)}`);
    }
    return body;
}
//# sourceMappingURL=client.js.map