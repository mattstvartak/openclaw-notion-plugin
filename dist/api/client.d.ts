import type { NotionConfig, NotionError } from './types.js';
export declare class NotionApiError extends Error {
    code: string;
    status: number;
    constructor(err: NotionError);
}
export declare function notionGet(config: NotionConfig, path: string, params?: Record<string, any>): Promise<any>;
export declare function notionPost(config: NotionConfig, path: string, data?: Record<string, any>): Promise<any>;
export declare function notionPatch(config: NotionConfig, path: string, data?: Record<string, any>): Promise<any>;
export declare function notionDelete(config: NotionConfig, path: string): Promise<any>;
//# sourceMappingURL=client.d.ts.map