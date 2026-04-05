import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        databaseId: import("@sinclair/typebox").TString;
        filter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        sort: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    databaseId: string;
    filter?: string;
    sort?: string;
    limit?: number;
}): Promise<{
    count: any;
    has_more: any;
    pages: any;
}>;
//# sourceMappingURL=query-database.d.ts.map