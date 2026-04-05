import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        query: import("@sinclair/typebox").TString;
        filter: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"page">, import("@sinclair/typebox").TLiteral<"database">]>>;
        limit: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TNumber>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    query: string;
    filter?: 'page' | 'database';
    limit?: number;
}): Promise<{
    count: any;
    has_more: any;
    results: any;
}>;
//# sourceMappingURL=search.d.ts.map