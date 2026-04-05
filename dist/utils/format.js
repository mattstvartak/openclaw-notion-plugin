/**
 * Build a Notion rich text array from a plain string.
 */
export function richText(content) {
    // Notion limits each text block to 2000 chars
    const chunks = [];
    for (let i = 0; i < content.length; i += 2000) {
        chunks.push({
            type: 'text',
            text: { content: content.slice(i, i + 2000) },
        });
    }
    return chunks;
}
/**
 * Extract plain text from a Notion rich text array.
 */
export function plainText(rt) {
    if (!rt)
        return '';
    return rt.map((t) => t.plain_text).join('');
}
/**
 * Extract the title from a Notion page's properties.
 */
export function extractPageTitle(properties) {
    for (const prop of Object.values(properties)) {
        if (prop.type === 'title' && prop.title) {
            return plainText(prop.title);
        }
    }
    return '(untitled)';
}
/**
 * Extract plain text content from a block.
 */
export function extractBlockText(block) {
    const type = block.type;
    const data = block[type];
    if (!data)
        return '';
    if (data.rich_text)
        return plainText(data.rich_text);
    if (data.caption)
        return plainText(data.caption);
    if (data.url)
        return data.url;
    return '';
}
/**
 * Build paragraph blocks from markdown-ish text.
 * Splits on double newlines for paragraphs.
 */
export function textToBlocks(text) {
    const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
    return paragraphs.map((p) => ({
        object: 'block',
        type: 'paragraph',
        paragraph: { rich_text: richText(p.trim()) },
    }));
}
//# sourceMappingURL=format.js.map