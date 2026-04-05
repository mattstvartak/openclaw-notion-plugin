import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        parentPageId: import("@sinclair/typebox").TString;
        title: import("@sinclair/typebox").TString;
        properties: import("@sinclair/typebox").TString;
        icon: import("@sinclair/typebox").TOptional<import("@sinclair/typebox").TString>;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    parentPageId: string;
    title: string;
    properties: string;
    icon?: string;
}): Promise<{
    id: any;
    title: string;
    url: any;
    properties: {
        [k: string]: any;
    };
}>;
//# sourceMappingURL=create-database.d.ts.map