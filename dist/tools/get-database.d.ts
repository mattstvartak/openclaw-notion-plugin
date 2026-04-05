import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        databaseId: import("@sinclair/typebox").TString;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    databaseId: string;
}): Promise<{
    id: any;
    title: string;
    description: string;
    url: any;
    properties: Record<string, any>;
    archived: any;
}>;
//# sourceMappingURL=get-database.d.ts.map