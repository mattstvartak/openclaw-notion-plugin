import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        pageId: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        properties: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
        archived: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TBoolean>;
        icon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    pageId: string;
    title?: string;
    properties?: string;
    archived?: boolean;
    icon?: string;
}): Promise<{
    id: any;
    url: any;
    lastEdited: any;
    archived: any;
}>;
//# sourceMappingURL=update-page.d.ts.map