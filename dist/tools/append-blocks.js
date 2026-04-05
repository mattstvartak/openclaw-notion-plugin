import { Type } from '@sinclair/typebox';
import { notionPatch } from '../api/client.js';
import { textToBlocks } from '../utils/format.js';
export const definition = {
    name: 'notion_append_blocks',
    label: 'Append to Notion Page',
    description: 'Append content blocks to an existing page or block.',
    parameters: Type.Object({
        blockId: Type.String({ description: 'The page ID or block ID to append to.' }),
        content: Type.String({ description: 'Text content to append. Double newlines create separate paragraphs.' }),
    }),
};
export async function execute(config, params) {
    const id = params.blockId.replace(/-/g, '');
    const children = textToBlocks(params.content);
    const result = await notionPatch(config, `/v1/blocks/${id}/children`, { children });
    return {
        blocksAdded: result.results?.length ?? children.length,
        parentId: id,
    };
}
//# sourceMappingURL=append-blocks.js.map