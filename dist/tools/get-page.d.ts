import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        pageId: import("@sinclair/typebox").TString;
        includeContent: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    pageId: string;
    includeContent?: boolean;
}): Promise<Record<string, any>>;
//# sourceMappingURL=get-page.d.ts.map