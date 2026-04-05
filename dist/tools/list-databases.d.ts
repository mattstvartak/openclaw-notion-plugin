import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    limit?: number;
}): Promise<{
    count: any;
    databases: any;
}>;
//# sourceMappingURL=list-databases.d.ts.map