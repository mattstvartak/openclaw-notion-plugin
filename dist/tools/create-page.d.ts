import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        parentId: import("@sinclair/typebox").TString;
        parentType: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TUnion<[import("@sinclair/typebox").TLiteral<"database">, import("@sinclair/typebox").TLiteral<"page">]>>;
        title: import("@sinclair/typebox").TString;
        content: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        icon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    parentId: string;
    parentType?: 'database' | 'page';
    title: string;
    content?: string;
    properties?: string;
    icon?: string;
}): Promise<{
    id: any;
    url: any;
    title: string;
    created: any;
}>;
//# sourceMappingURL=create-page.d.ts.map