import type { NotionConfig } from '../api/types.js';
export declare const definition: {
    name: string;
    label: string;
    description: string;
    parameters: import("@sinclair/typebox").TObject<{
        blockId: import("@sinclair/typebox").TString;
        content: import("@sinclair/typebox").TString;
    }>;
};
export declare function execute(config: NotionConfig, params: {
    blockId: string;
    content: string;
}): Promise<{
    blocksAdded: any;
    parentId: string;
}>;
//# sourceMappingURL=append-blocks.d.ts.map